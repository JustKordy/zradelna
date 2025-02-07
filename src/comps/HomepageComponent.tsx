"use client"
import { User, UserResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import type IWeek from "~/interfaces/IWeek";
import { signOut } from "~/server/queries/user";


export const HomepageComponent = ({ user }: { user: User }) => {

    const date = new Date();

    const possibleMonths: Array<string> = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];



    const sideBarOptions: Array<{ id: number, name: string, icon: string, onClick: () => void }> = [
        { id: 1, name: "Domů", icon: "fa-solid fa-house", onClick: () => console.log("idk") },
        { id: 2, name: "Odhlásit se", icon: "fa-solid fa-sign-out", onClick: () => signOut() }
    ]

    const [expanded, setExpanded] = useState<boolean>(false);
    const [weeks, setWeeks] = useState<Array<{ week: { monday: string, friday: string }, active: boolean }>>([]);
    const [activeWeek, setActiveWeek] = useState<number>();
    const [activeMonth, setActiveMonth] = useState<number>(date.getMonth());


    function getMondaysAndFridays(year: number, month: string): { monday: string, friday: string }[] {
        const monthIndex = possibleMonths.indexOf(month);
        if (monthIndex === -1) {
            throw new Error("Invalid month name");
        }
        
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const weeks: { monday: string, friday: string }[] = [];
        
        let monday: string | null = null;
        let friday: string | null = null;
        let firstMonday: string | null = null;
        let firstFriday: string | null = null;
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(Date.UTC(year, monthIndex, day));
            date.setHours(date.getHours() + 1); // Adjust for Czech timezone (UTC+1)
            const dayOfWeek = date.getUTCDay();
            
            if (dayOfWeek === 1) { // Monday
                monday = date.toISOString().split('T')[0]!;
                if (!firstMonday) firstMonday = monday;
            }
            if (dayOfWeek === 5) { // Friday
                friday = date.toISOString().split('T')[0]!;
                if (!firstFriday) firstFriday = friday;
            }
            
            if (monday && friday) {
                weeks.push({ monday, friday });
                monday = null;
                friday = null;
            }
        }
        
        if (weeks.length > 0 && (!weeks[0]!.monday || !weeks[0]!.friday)) {
            weeks[0]!.monday = weeks[0]!.monday || firstMonday!;
            weeks[0]!.friday = weeks[0]!.friday || firstFriday!;
        }
        
        return weeks;
    }

    const currentWeek = possibleMonths[activeMonth]!

    
    useEffect(() => {

        const currentYear = new Date().getFullYear();

        const temp: Array<{ week: { monday: string, friday: string }, active: boolean }> = []
        const mondaysAndFridays = getMondaysAndFridays(currentYear, currentWeek);
        mondaysAndFridays.map((day, index) => {
            temp.push({ week: { monday: day.monday, friday: day.friday }, active: activeWeek ? activeWeek == index ? true : false : index == 0 ? true : false })
        }, [])
        setWeeks(temp);

    }, [activeWeek, activeMonth])

    return (
        <>
            <div className="w-screen h-screen bg-orange-400 flex justify-center items-center">
                {/* sidebar */}
                <aside className={expanded ? "w-[15%] h-full transition-all" : "w-[5%] h-full transition-all"}>
                    <div className="w-full h-full flex justify-center items-center flex-col">
                        {
                            sideBarOptions.map((option) => {
                                return (
                                    <div key={option.id} onClick={option.onClick} className={(expanded ? " p-5 justify-start " : "justify-center ") + " w-full h-[80px] bg-orange-400 flex items-center flex-row cursor-pointer transition-all text-white hover:bg-orange-500 gap-1"} >
                                        <i className={option.icon + " text-lg"}></i>
                                        {expanded && <p>{option.name}</p>}
                                    </div>
                                )
                            })
                        }
                    </div>

                </aside>
                {/* main */}
                <main className={(expanded ? "w-[85%] " : "w-[95%] ") + " h-full rounded-l-xl bg-white flex justify-start items-center p-2 transition-all"}>
                    {/* gray pulley */}
                    <div className="h-full w-[10px] flex justify-center items-center">
                        <div className="bg-gray-400 h-[50px] w-[90%] rounded-lg transition-all hover:scale-110 cursor-pointer" onClick={() => setExpanded(!expanded)}></div>
                    </div>
                    <div className="w-full h-full flex justify-center items-start p-5">
                        <div className="w-full h-[150px] bg-gray-100 rounded-lg flex justify-start items-center flex-col p-5 gap-2">
                            <p className="text-xl font-bold text-orange-500">{possibleMonths[activeMonth]}</p>
                            <div className="w-full h-full flex flex-row justify-center items-center gap-3">
                                <div onClick={() => setActiveMonth(activeMonth - 1 < 0 ? activeMonth : activeMonth - 1)} className="w-[30px] h-full flex justify-center items-center cursor-pointer">
                                    <i className="fa-solid fa-angles-left bg-orange-400 text-2xl rounded-full p-2 text-white"></i>
                                </div>
                                    {
                                        weeks.map((week, index) => {
                                            return (
                                                <div onClick={() => setActiveWeek(index)} key={index} className={(week.active ? "bg-orange-400 text-white " : "text-orange-400 border-2 border-orange-400 hover:bg-orange-100 ") + " w-[200px] h-full rounded-lg flex flex-col justify-center items-center bg-gray-100 cursor-pointer gap-1"}>
                                                    <div className="flex flex-row justify-center items-center gap-2">
                                                        <p className="font-bold">{week.week.monday.split("-")[2] + "." + week.week.monday.split("-")[1]}</p>
                                                        <span className="p-0 m-0">-</span>
                                                        <p className="font-bold">{week.week.friday.split("-")[2] + "." + week.week.friday.split("-")[1]}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                <div onClick={() => setActiveMonth(activeMonth + 1 > 11 ? activeMonth : activeMonth + 1)} className="w-[30px] h-full flex justify-center items-center cursor-pointer">
                                    <i className="fa-solid fa-angles-right bg-orange-400 text-2xl rounded-full p-2 text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
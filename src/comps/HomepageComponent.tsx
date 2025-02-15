"use client"
import { User, UserResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { signOut } from "~/server/queries/user";


export const HomepageComponent = ({ user }: { user: User }) => {

    const date = new Date();

    const possibleMonths: Array<string> = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];

    function extractDays(year: number):  Array<{month: number, weeks: Array<{start: string, end: string}>}> {
        
        const temp: Array<{start: string, end: string}> = []
        
        const currentDate = new Date(year, 0, 1)
        while(currentDate.getFullYear() == year){
            
            if(currentDate.getDay() == 1){
                const first = currentDate.getDate() + "." + currentDate.getMonth()
                currentDate.setDate(currentDate.getDate() + 4)
                temp.push({
                    start: first,
                    end: currentDate.getDate() + "." + currentDate.getMonth()
                })
                currentDate.setDate(currentDate.getDate() + 3)
            }
            if(currentDate.getDay() == 2){
                const first = currentDate.getDate() + "." + currentDate.getMonth()
                currentDate.setDate(currentDate.getDate() + 3)
                temp.push({
                    start: first,
                    end: currentDate.getDate() + "." + currentDate.getMonth()
                })
                currentDate.setDate(currentDate.getDate() + 3)
            }
            if(currentDate.getDay() == 3){
                const first = currentDate.getDate() + "." + currentDate.getMonth()
                currentDate.setDate(currentDate.getDate() + 2)
                temp.push({
                    start: first,
                    end: currentDate.getDate() + "." + currentDate.getMonth()
                })
                currentDate.setDate(currentDate.getDate() + 3)
            }
            if(currentDate.getDay() == 4){
                const first = currentDate.getDate() + "." + currentDate.getMonth()
                currentDate.setDate(currentDate.getDate() + 1)
                temp.push({
                    start: first,
                    end: currentDate.getDate() + "." + currentDate.getMonth()
                })
                currentDate.setDate(currentDate.getDate() + 3)
            }
            if(currentDate.getDay() == 5){
                const first = currentDate.getDate() + "." + currentDate.getMonth()
                temp.push({
                    start: first,
                    end: currentDate.getDate() + "." + currentDate.getMonth()
                })
                currentDate.setDate(currentDate.getDate() + 3)
            }
            if(currentDate.getDay() == 6){
                currentDate.setDate(currentDate.getDate() + 2)
            }
            if(currentDate.getDay() == 7){
                currentDate.setDate(currentDate.getDate() + 1)
            }
            
        }

        // console.log(temp    )
        const temp2: Array<{month: number, weeks: Array<{start: string, end: string}>}> = []

        for(let monthIndex = 0; monthIndex < 12; monthIndex++){
            const temp3: Array<{start: string, end: string}> = []

            for (let index = 0; index < temp.length; index++) {

                if(temp[index]!.start.split(".")[1] == (monthIndex).toString())
                {
                    const splittedStart = temp[index]!.start.split(".")
                    const splittedEnd = temp[index]!.end.split(".")
                    temp3.push(
                        {   start: splittedStart[0] + "." + ((+splittedStart[1]!) + 1),
                            end: splittedEnd[0] + "." + ((+splittedEnd[1]!) + 1)
                        });
                }
                
            }
            temp2.push({month: monthIndex, weeks: temp3})
        }

        // temp2.map((tem) => {
        //     for(let i = 0; i < tem.weeks.length; i++){
        //         console.log("Month " + possibleMonths[tem.month] + " has start " + tem.weeks[i]?.start + " and end " + tem.weeks[i]?.end)  
        //     }
        // })

        return temp2;
        
    }


    const sideBarOptions: Array<{ id: number, name: string, icon: string, onClick: () => void }> = [
        { id: 1, name: "Domů", icon: "fa-solid fa-house", onClick: () => console.log("idk") },
        { id: 2, name: "Odhlásit se", icon: "fa-solid fa-sign-out", onClick: () => signOut() }
    ]

    const [expanded, setExpanded] = useState<boolean>(false);
    const [weeks, setWeeks] = useState<Array<{start: string, end: string}>>([]);
    const [activeWeek, setActiveWeek] = useState<number>(0);
    const [activeMonth, setActiveMonth] = useState<number>(date.getMonth());
    const [total, setTotal] = useState< Array<{month: number, weeks: Array<{start: string, end: string}>}>>(extractDays(date.getFullYear()))


    
    
    const currentWeek = possibleMonths[activeMonth]!
    
    
    
   

    
    useEffect(() => {
        
        console.log(total)
        const res = total?.filter((tot) => tot.month == activeMonth)
        const temp: Array<{start: string, end: string}> = []
        res!.map((r) => {
            r.weeks.map((week) => {
                temp.push({start: week.start, end: week.end})
            })
        })
        setWeeks(temp)
    }, [activeMonth])

   

  
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
                                                <div onClick={() => setActiveWeek(index)} key={index} className={(activeWeek == index ? "bg-orange-400 text-white " : "text-orange-400 border-2 border-orange-400 hover:bg-orange-100 ") + " w-[200px] h-full rounded-lg flex flex-col justify-center items-center bg-gray-100 cursor-pointer gap-1"}>
                                                    <div className="flex flex-row justify-center items-center gap-2">
                                                        <p className="font-bold">{week.start}</p>
                                                        <span className="p-0 m-0">-</span>
                                                        <p className="font-bold">{week.end}</p>
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
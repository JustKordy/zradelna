/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/prefer-for-of */
"use client";
import { User, UserResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { signOut } from "~/server/queries/user";
import { makeUserChoice } from "~/server/queries/user";
import { getMenusInRange } from "~/server/queries/menus";

export const HomepageComponent = ({ user }: { user: User }) => {
  const date = new Date();

  const possibleMonths: Array<string> = [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec",
  ];

  const possibleDaysArr: Array<string> = [
    "Pondělí",
    "Úterý",
    "Středa",
    "Čtvrtek",
    "Pátek",
  ];

  function extractDays(
    year: number,
  ): Array<{ month: number; weeks: Array<{ start: string; end: string }> }> {
    const temp: Array<{ start: string; end: string }> = [];

    const currentDate = new Date(year, 0, 1);
    while (currentDate.getFullYear() == year) {
      if (currentDate.getDay() == 1) {
        const first = currentDate.getDate() + "." + currentDate.getMonth();
        currentDate.setDate(currentDate.getDate() + 4);
        temp.push({
          start: first,
          end: currentDate.getDate() + "." + currentDate.getMonth(),
        });
        currentDate.setDate(currentDate.getDate() + 3);
      }
      if (currentDate.getDay() == 2) {
        const first = currentDate.getDate() + "." + currentDate.getMonth();
        currentDate.setDate(currentDate.getDate() + 3);
        temp.push({
          start: first,
          end: currentDate.getDate() + "." + currentDate.getMonth(),
        });
        currentDate.setDate(currentDate.getDate() + 3);
      }
      if (currentDate.getDay() == 3) {
        const first = currentDate.getDate() + "." + currentDate.getMonth();
        currentDate.setDate(currentDate.getDate() + 2);
        temp.push({
          start: first,
          end: currentDate.getDate() + "." + currentDate.getMonth(),
        });
        currentDate.setDate(currentDate.getDate() + 3);
      }
      if (currentDate.getDay() == 4) {
        const first = currentDate.getDate() + "." + currentDate.getMonth();
        currentDate.setDate(currentDate.getDate() + 1);
        temp.push({
          start: first,
          end: currentDate.getDate() + "." + currentDate.getMonth(),
        });
        currentDate.setDate(currentDate.getDate() + 3);
      }
      if (currentDate.getDay() == 5) {
        const first = currentDate.getDate() + "." + currentDate.getMonth();
        temp.push({
          start: first,
          end: currentDate.getDate() + "." + currentDate.getMonth(),
        });
        currentDate.setDate(currentDate.getDate() + 3);
      }
      if (currentDate.getDay() == 6) {
        currentDate.setDate(currentDate.getDate() + 2);
      }
      if (currentDate.getDay() == 7) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    // console.log(temp    )
    const temp2: Array<{
      month: number;
      weeks: Array<{ start: string; end: string }>;
    }> = [];

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const temp3: Array<{ start: string; end: string }> = [];

      for (let index = 0; index < temp.length; index++) {
        if (temp[index]!.start.split(".")[1] == monthIndex.toString()) {
          const splittedStart = temp[index]!.start.split(".");
          const splittedEnd = temp[index]!.end.split(".");
          temp3.push({
            start: splittedStart[0] + "." + (+splittedStart[1]! + 1),
            end: splittedEnd[0] + "." + (+splittedEnd[1]! + 1),
          });
        }
      }
      temp2.push({ month: monthIndex, weeks: temp3 });
    }

    // temp2.map((tem) => {
    //     for(let i = 0; i < tem.weeks.length; i++){
    //         console.log("Month " + possibleMonths[tem.month] + " has start " + tem.weeks[i]?.start + " and end " + tem.weeks[i]?.end)
    //     }
    // })

    return temp2;
  }

  const sideBarOptions: Array<{
    id: number;
    name: string;
    icon: string;
    onClick: () => void;
  }> = [
    {
      id: 1,
      name: "Domů",
      icon: "fa-solid fa-house",
      onClick: () => console.log("idk"),
    },
    {
      id: 2,
      name: "Odhlásit se",
      icon: "fa-solid fa-sign-out",
      onClick: () => signOut(),
    },
  ];

  const [expanded, setExpanded] = useState<boolean>(false);
  const [activeWeek, setActiveWeek] = useState<number>(0);
  const [activeMonth, setActiveMonth] = useState<number>(date.getMonth());
  const [possibleDays, setPossibleDays] = useState<
    Array<{ day: string; date: string }>
  >([]);
  const [total, setTotal] = useState<
    Array<{ month: number; weeks: Array<{ start: string; end: string }> }>
  >(extractDays(date.getFullYear()));
  const [weeks, setWeeks] =
    useState<Array<{ start: string; end: string }>>(funcToSetWeeks());

  function funcToSetWeeks() {
    const res = total?.filter((tot) => tot.month == activeMonth);
    const temp: Array<{ start: string; end: string }> = [];
    res!.map((r) => {
      r.weeks.map((week) => {
        temp.push({ start: week.start, end: week.end });
      });
    });
    return temp;
  }

  function funcToSetDays(weeks: Array<{ start: string; end: string }>) {
    const days: Array<number> = [];
    if (activeWeek >= weeks.length) setActiveWeek(activeWeek - 1);
    const startWeek =
      +weeks[activeWeek >= weeks.length ? 0 : activeWeek]!.start.split(".")[0]!;
    const startMonth =
      +weeks[activeWeek >= weeks.length ? 0 : activeWeek]!.start.split(".")[1]!;
    const endWeek =
      +weeks[activeWeek >= weeks.length ? 0 : activeWeek]!.end.split(".")[0]!;
    const endMonth =
      +weeks[activeWeek >= weeks.length ? 0 : activeWeek]!.start.split(".")[1]!;

      const n = new Date(date.getFullYear(), activeMonth + 1, startWeek)
      

    for (let i = startWeek; i < endWeek + 1; i++) {
      days.push(i);
      console.log("pusshing ", i);
    }

    const temp: Array<{ day: string; date: string }> = [];

    days.map((day) => {
      temp.push({
        day: possibleDaysArr[
          new Date(date.getFullYear(), activeMonth, day).getDay() - 1
        ]!,
        date: day + "." + (+activeMonth + 1),
      });
    });

    setPossibleDays(temp);

    console.log(temp);
  }

  let menus;

  useEffect(() => {
    const res = funcToSetWeeks();
    setWeeks(res);
    funcToSetDays(res);
  }, [activeWeek, activeMonth, activeMonth]);

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-orange-400">
        {/* sidebar */}
        <aside
          className={
            expanded
              ? "h-full w-[15%] transition-all"
              : "h-full w-[5%] transition-all"
          }
        >
          <div className="flex h-full w-full flex-col items-center justify-center">
            {sideBarOptions.map((option) => {
              return (
                <div
                  key={option.id}
                  onClick={option.onClick}
                  className={
                    (expanded ? "justify-start p-5 " : "justify-center ") +
                    " flex h-[80px] w-full cursor-pointer flex-row items-center gap-1 bg-orange-400 text-white transition-all hover:bg-orange-500"
                  }
                >
                  <i className={option.icon + " text-lg"}></i>
                  {expanded && <p>{option.name}</p>}
                </div>
              );
            })}
          </div>
        </aside>
        {/* main */}
        <main
          className={
            (expanded ? "w-[85%] " : "w-[95%] ") +
            " flex h-full items-center justify-start rounded-l-xl bg-white p-2 transition-all"
          }
        >
          {/* gray pulley */}
          <div className="flex h-full w-[10px] items-center justify-center">
            <div
              className="h-[50px] w-[90%] cursor-pointer rounded-lg bg-gray-400 transition-all hover:scale-110"
              onClick={() => setExpanded(!expanded)}
            ></div>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-start gap-3 p-5">
            <div className="flex h-[150px] w-full flex-col items-center justify-start gap-2 rounded-lg bg-gray-100 p-5">
              <p className="text-xl font-bold text-orange-500">
                {possibleMonths[activeMonth]}
              </p>
              <div className="flex h-full w-full flex-row items-center justify-center gap-3">
                <div
                  onClick={() => {
                    setActiveMonth(
                      activeMonth - 1 < 0 ? activeMonth : activeMonth - 1,
                    );
                  }}
                  className="flex h-full w-[30px] cursor-pointer items-center justify-center"
                >
                  <i className="fa-solid fa-angles-left rounded-full bg-orange-400 p-2 text-2xl text-white"></i>
                </div>
                {weeks.map((week, index) => {
                  return (
                    <div
                      onClick={() => setActiveWeek(index)}
                      key={index}
                      className={
                        (activeWeek == index
                          ? "bg-orange-400 text-white "
                          : "border-2 border-orange-400 text-orange-400 hover:bg-orange-100 ") +
                        " flex h-full w-[200px] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg bg-gray-100"
                      }
                    >
                      <div className="flex flex-row items-center justify-center gap-2">
                        <p className="font-bold">{week.start}</p>
                        <span className="m-0 p-0">-</span>
                        <p className="font-bold">{week.end}</p>
                      </div>
                    </div>
                  );
                })}
                <div
                  onClick={() => {
                    setActiveMonth(
                      activeMonth + 1 > 11 ? activeMonth : activeMonth + 1,
                    );
                  }}
                  className="flex h-full w-[30px] cursor-pointer items-center justify-center"
                >
                  <i className="fa-solid fa-angles-right rounded-full bg-orange-400 p-2 text-2xl text-white"></i>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-row flex-wrap items-center justify-center gap-3 overflow-auto p-5">
              <div className="flex w-1/3 flex-col flex-wrap items-center justify-start gap-1 rounded-lg bg-gray-100 p-3">
                <h1 className="text-lg font-semibold">Pondělí</h1>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-400 p-2">
                  <p className="text-white">Jídlo 1</p>
                </div>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-200 p-2">
                  <p>Jídlo 2</p>
                </div>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-200 p-2">
                  <p>Jídlo 3</p>
                </div>
                <p className="text-start">Polévka: Knedlíčková </p>
                <div className="flex w-full items-center justify-center gap-2">
                  <div className="w-1/2 cursor-pointer rounded-lg bg-orange-400 p-5 text-center text-white">
                    Na místě
                  </div>
                  <div className="w-1/2 cursor-pointer rounded-lg bg-orange-200 p-5 text-center text-black">
                    S sebou
                  </div>
                </div>
              </div>
              <div className="flex w-1/3 flex-col flex-wrap items-center justify-start gap-1 rounded-lg bg-gray-100 p-3">
                <h1 className="text-lg font-semibold">Pondělí</h1>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-400 p-2">
                  <p className="text-white">Jídlo 1</p>
                </div>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-200 p-2">
                  <p>Jídlo 2</p>
                </div>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-200 p-2">
                  <p>Jídlo 3</p>
                </div>
                <p className="text-start">Polévka: Knedlíčková </p>
                <div className="flex w-full items-center justify-center gap-2">
                  <div className="w-1/2 cursor-pointer rounded-lg bg-orange-400 p-5 text-center text-white">
                    Na místě
                  </div>
                  <div className="w-1/2 cursor-pointer rounded-lg bg-orange-200 p-5 text-center text-black">
                    S sebou
                  </div>
                </div>
              </div>
              <div className="flex w-1/3 flex-col flex-wrap items-center justify-start gap-1 rounded-lg bg-gray-100 p-3">
                <h1 className="text-lg font-semibold">Pondělí</h1>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-400 p-2">
                  <p className="text-white">Jídlo 1</p>
                </div>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-200 p-2">
                  <p>Jídlo 2</p>
                </div>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-200 p-2">
                  <p>Jídlo 3</p>
                </div>
                <p className="text-start">Polévka: Knedlíčková </p>
                <div className="flex w-full items-center justify-center gap-2">
                  <div className="w-1/2 cursor-pointer rounded-lg bg-orange-400 p-5 text-center text-white">
                    Na místě
                  </div>
                  <div className="w-1/2 cursor-pointer rounded-lg bg-orange-200 p-5 text-center text-black">
                    S sebou
                  </div>
                </div>
              </div>
              <div className="flex w-1/3 flex-col flex-wrap items-center justify-start gap-1 rounded-lg bg-gray-100 p-3">
                <h1 className="text-lg font-semibold">Pondělí</h1>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-400 p-2">
                  <p className="text-white">Jídlo 1</p>
                </div>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-200 p-2">
                  <p>Jídlo 2</p>
                </div>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-200 p-2">
                  <p>Jídlo 3</p>
                </div>
                <p className="text-start">Polévka: Knedlíčková </p>
                <div className="flex w-full items-center justify-center gap-2">
                  <div className="w-1/2 cursor-pointer rounded-lg bg-orange-400 p-5 text-center text-white">
                    Na místě
                  </div>
                  <div className="w-1/2 cursor-pointer rounded-lg bg-orange-200 p-5 text-center text-black">
                    S sebou
                  </div>
                </div>
              </div>
              <div className="flex w-1/3 flex-col flex-wrap items-center justify-start gap-1 rounded-lg bg-gray-100 p-3">
                <h1 className="text-lg font-semibold">Pondělí</h1>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-400 p-2">
                  <p className="text-white">Jídlo 1</p>
                </div>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-200 p-2">
                  <p>Jídlo 2</p>
                </div>
                <div className="h-[50px] w-full cursor-pointer rounded-lg bg-gray-200 p-2">
                  <p>Jídlo 3</p>
                </div>
                <p className="text-start">Polévka: Knedlíčková </p>
                <div className="flex w-full items-center justify-center gap-2">
                  <div className="w-1/2 cursor-pointer rounded-lg bg-orange-400 p-5 text-center text-white">
                    Na místě
                  </div>
                  <div className="w-1/2 cursor-pointer rounded-lg bg-orange-200 p-5 text-center text-black">
                    S sebou
                  </div>
                </div>
              </div>

              <button className="h-[200px] w-1/3 rounded-lg bg-orange-400 text-xl text-white">
                Potvrdit výběr
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

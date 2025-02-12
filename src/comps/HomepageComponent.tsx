"use client";
import { useEffect, useState } from "react";
import { signOut } from "~/server/queries/user";

export function HomepageComponent() {
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

  const sideBarOptions = [
    {
      id: 1,
      name: "Domů",
      icon: "fa-solid fa-house",
      onClick: () => console.log("AAA"),
    },
    {
      id: 2,
      name: "Odhlásit se",
      icon: "fa-solid fa-sign-out",
      onClick: () => signOut(),
    },
  ];

  const [expanded, setExpanded] = useState<boolean>(false);
  const [weeks, setWeeks] = useState<
    Array<{ week: { monday: string; friday: string }; active: boolean }>
  >([]);
  const [activeWeek, setActiveWeek] = useState<number>();
  const [activeMonth, setActiveMonth] = useState<number>(date.getMonth());

  function getMondaysAndFridays(
    year: number,
    month: string,
  ): { monday: string; friday: string }[] {
    const monthIndex = possibleMonths.indexOf(month);
    if (monthIndex === -1) {
      throw new Error("Invalid month name");
    }

    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const weeks: { monday: string; friday: string }[] = [];

    let monday: string | null = null;
    let friday: string | null = null;
    let firstMonday: string | null = null;
    let firstFriday: string | null = null;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(Date.UTC(year, monthIndex, day));
      date.setHours(date.getHours() + 1); // Adjust for Czech timezone (UTC+1)
      const dayOfWeek = date.getUTCDay();

      if (dayOfWeek === 1) {
        // Monday
        monday = date.toISOString().split("T")[0]!;
        if (!firstMonday) firstMonday = monday;
      }
      if (dayOfWeek === 5) {
        // Friday
        friday = date.toISOString().split("T")[0]!;
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

  const currentWeek = possibleMonths[activeMonth]!;

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    const temp: Array<{
      week: { monday: string; friday: string };
      active: boolean;
    }> = [];
    const mondaysAndFridays = getMondaysAndFridays(currentYear, currentWeek);
    mondaysAndFridays.map((day, index) => {
      temp.push({
        week: { monday: day.monday, friday: day.friday },
        active: activeWeek
          ? activeWeek == index
            ? true
            : false
          : index == 0
            ? true
            : false,
      });
    }, []);
    setWeeks(temp);
  }, [activeWeek, activeMonth, currentWeek]);

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
                <button
                  key={option.id}
                  onClick={option.onClick}
                  className={
                    (expanded ? "justify-start p-5 " : "justify-center ") +
                    " flex h-[80px] w-full cursor-pointer flex-row items-center gap-1 bg-orange-400 text-white transition-all hover:bg-orange-500"
                  }
                >
                  <i className={option.icon + " text-lg"}></i>
                  {expanded && <p>{option.name}</p>}
                </button>
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
          <div className="flex h-full w-full items-start justify-center p-5">
            <div className="flex h-[150px] w-full flex-col items-center justify-start gap-2 rounded-lg bg-gray-100 p-5">
              <p className="text-xl font-bold text-orange-500">
                {possibleMonths[activeMonth]}
              </p>
              <div className="flex h-full w-full flex-row items-center justify-center gap-3">
                <div
                  onClick={() =>
                    setActiveMonth(
                      activeMonth - 1 < 0 ? activeMonth : activeMonth - 1,
                    )
                  }
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
                        (week.active
                          ? "bg-orange-400 text-white "
                          : "border-2 border-orange-400 text-orange-400 hover:bg-orange-100 ") +
                        " flex h-full w-[200px] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg bg-gray-100"
                      }
                    >
                      <div className="flex flex-row items-center justify-center gap-2">
                        <p className="font-bold">
                          {week.week.monday.split("-")[2] +
                            "." +
                            week.week.monday.split("-")[1]}
                        </p>
                        <span className="m-0 p-0">-</span>
                        <p className="font-bold">
                          {week.week.friday.split("-")[2] +
                            "." +
                            week.week.friday.split("-")[1]}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div
                  onClick={() =>
                    setActiveMonth(
                      activeMonth + 1 > 11 ? activeMonth : activeMonth + 1,
                    )
                  }
                  className="flex h-full w-[30px] cursor-pointer items-center justify-center"
                >
                  <i className="fa-solid fa-angles-right rounded-full bg-orange-400 p-2 text-2xl text-white"></i>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}


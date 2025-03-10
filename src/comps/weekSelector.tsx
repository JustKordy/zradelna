"use client";

import { useWeekSelector } from "~/lib/hooks/useWeekSelector";
import type { Week } from "~/types/week";

export function WeekSelector() {
  const { week, weeks, month, prevWeek, nextWeek, selectWeek } =
    useWeekSelector();

  return (
    <div className="flex h-[150px] w-full flex-col items-center justify-start gap-2 rounded-lg bg-gray-100 p-5">
      <h3 className="text-xl font-bold text-orange-500">{month}</h3>
      <div className="flex h-full w-full items-center justify-center gap-3">
        <button onClick={prevWeek}>
          <i className="fa-solid fa-angles-left rounded-full bg-orange-400 p-2 text-2xl text-white"></i>
        </button>
        <>
          {weeks.map((x) => (
            <WeekButton
              key={crypto.randomUUID()}
              week={x}
              selected={week.start.getTime() === x.start.getTime()}
              onClick={() => selectWeek(x.start)}
            />
          ))}
        </>
        <button onClick={nextWeek}>
          <i className="fa-solid fa-angles-right rounded-full bg-orange-400 p-2 text-2xl text-white"></i>
        </button>
      </div>
    </div>
  );
}

function WeekButton(props: {
  week: Week;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={props.onClick}
      className={`flex h-full w-[200px] items-center justify-center md:flex-row flex-col gap-0 md:gap-1 rounded-lg ${props.selected ? "bg-orange-400 text-white" : "border-2 border-orange-400 bg-white text-orange-400 hover:bg-orange-100"}`}
    >
      <span className="font-bold text-xs md:text-lg">
        {props.week.start.toLocaleDateString("cs-CZ", {
          day: "numeric",
          month: "numeric",
        })}
      </span>
      -
      <span className="font-bold text-xs md:text-lg">
        {props.week.end.toLocaleDateString("cs-CZ", {
          day: "numeric",
          month: "numeric",
        })}
      </span>
    </button>
  );
}

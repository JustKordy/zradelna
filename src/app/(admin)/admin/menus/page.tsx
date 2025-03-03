"use client";
import React, { useState } from "react";
import { findDish } from "~/server/queries/dish";
import { Spinner } from "~/comps/spinner";
import { MenuSelector } from "~/comps/menuSelctor";
import { WeekSelector } from "~/comps/weekSelector";
import { useWeekContext } from "~/lib/hooks/useWeekContext";

function Page() {
  const weekCtx = useWeekContext();
  const [searchRes, setSearchRes] = useState<
    {
      id: number;
      name: string;
      isSoup: boolean;
      description: string | null;
      imgURL: string | null;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >([]);

  const [searchArr, setSearchArr] = useState<
    {
      id: number;
      name: string;
      isSoup: boolean;
      description: string | null;
      imgURL: string | null;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = React.createRef<HTMLInputElement>();
  const inputRefPol = React.createRef<HTMLInputElement>();
  const daysArr = ["po", "ut", "st", "ct", "pa"];
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };


  const handleInput = async () => {
    if (inputRef.current && inputRefPol.current) {
      try {
        setIsLoading(true);
        const result = await findDish(
          inputRef.current.value,
        );
        setSearchRes(result);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
  };
  const handleInputPol = async () => {
    if (inputRefPol.current) {
      try {
        setIsLoading(true);
        const result = await findDish(inputRefPol.current.value, true);
        setSearchRes(result);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="">
      <div className="w-full gap-4 p-5">
        <div className="flex w-full flex-col justify-center gap-4 bg-slate-100 md:flex-row">
          <WeekSelector />
        </div>
      </div>
      <div className="mx-5 flex w-full flex-row items-center justify-center gap-4 bg-gray-100 py-5">
        {daysArr.map((day) => (
          <button
            key={day}
            onClick={() => handleDayClick(day)}
            className={`rounded-lg border border-2 border-orange-500 p-3 px-10 duration-300 ease-in-out ${selectedDay === day ? "bg-orange-500 text-white" : "bg-white text-orange-500 hover:bg-orange-500 hover:text-white"}`}
          >
            {day.toUpperCase()}
          </button>
        ))}
      </div>

      <button onClick={() => alert(weekCtx.week?.end.toISOString())}>
        dsfebc
      </button>
      <div className="w-full gap-4 p-5">
        <div className="mt-10 flex w-full flex-col justify-center gap-4 md:flex-row">
          <div className="flex w-full flex-col items-center justify-center gap-4 bg-slate-100 text-center md:w-full">
            <h1 className="my-5 text-lg font-bold text-orange-500">
              Přidání menu
            </h1>

            <div className="flex flex-row">
              <div className="flex flex-row justify-center gap-4">
                <input
                  ref={inputRef}
                  onChange={handleInput}
                  className="mb-10 me-2 w-full rounded-lg border-2 border-orange-400 py-2 ps-1 placeholder:text-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400"
                  placeholder="Hledat Jídlo"
                  type="text"
                />
              </div>
              <div className="flex flex-row justify-center gap-4">
                <input
                  ref={inputRefPol}
                  onChange={handleInputPol}
                  className="mb-10 me-2 w-full rounded-lg border-2 border-orange-400 py-2 ps-1 placeholder:text-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400"
                  placeholder="Hledat Polévku"
                  type="text"
                />
              </div>
            </div>

            <div className="w-1/2 justify-center rounded-lg bg-gray-300 p-4">
              <div className={isLoading ? "block" : "hidden"}>
                <Spinner />
              </div>
              {searchRes.map((dish) => (
                <div
                  className={
                    isLoading
                      ? "hidden"
                      : "my-2 block flex flex-row justify-center"
                  }
                  key={dish.id}
                >
                  <h2>{dish.name}</h2>
                  <p>{dish.description}</p>
                  <button
                    onClick={() => {
                      if (!searchArr.some((item) => item.id === dish.id)) {
                        setSearchArr([...searchArr, dish]);
                      }
                    }}
                    className="ms-4 rounded-lg border-2 border-orange-500 p-1 px-3 font-medium text-orange-500 duration-300 ease-in-out hover:bg-orange-500 hover:text-white"
                  >
                    Vybrat
                  </button>
                </div>
              ))}
            </div>

            <div>
              {searchArr.map((dish, i) => (
                <span key={crypto.randomUUID()}>
                  <div className="flex flex-row">
                    <h1 className="text-orange-500">jídlo {i + 1} : </h1>
                    <label className="">{dish.name}</label>
                  </div>
                </span>
              ))}
            </div>
            <div className="mb-5 flex flex-row">
              <button className="ms-4 rounded-lg border-2 border-orange-500 p-1 px-3 font-medium text-orange-500 duration-300 ease-in-out hover:bg-orange-500 hover:text-white">
                Podvrdit
              </button>
              <button
                onClick={() => {
                  setSearchArr([]);
                }}
                className="ms-4 rounded-lg border-2 border-red-500 p-1 px-3 font-medium text-red-500 duration-300 ease-in-out hover:bg-red-500 hover:text-white"
              >
                Smazat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

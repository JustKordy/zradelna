"use client";
import React, { useState, useEffect } from "react";
import { Spinner } from "~/comps/spinner";
import { WeekSelector } from "~/comps/weekSelector";
import { findDish } from "~/server/queries/dish";

function Page() {
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
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const inputRef = React.createRef<HTMLInputElement>();
  const inputRefPol = React.createRef<HTMLInputElement>();

  // Days of the week
  const weekDays = ["Po", "Út", "St", "Čt", "Pá"];

  // Set the initial selected day based on the current day of the week
  useEffect(() => {
    const today = new Date().getDay();
    // Convert to 0-4 index (Monday = 0, Friday = 4)
    // getDay() returns 0 for Sunday, 1 for Monday, etc.
    const todayIndex = today === 0 ? 4 : today - 1;
    
    // Only set the day if it's a weekday (Monday to Friday)
    if (todayIndex >= 0 && todayIndex <= 4) {
      setSelectedDay(todayIndex);
    } else {
      // Default to Monday if weekend
      setSelectedDay(0);
    }
  }, []);

  const handleDayClick = (index: number) => {
    setSelectedDay(index);
  };

  const handleInput = async () => {
    if (inputRef.current && inputRefPol.current) {
      try {
        setIsLoading(true);
        const result = await findDish(
          inputRef.current.value,
          inputRefPol.current.value === "true",
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

  const handleSubmit = async () => alert("Die");

  return (
    <div className="">
      <div className="w-full gap-4 p-5">
        <div className="flex w-full flex-col justify-center gap-4 bg-slate-100 md:flex-row">
          <WeekSelector />
        </div>
        
          <div className="flex max-w-md justify-center gap-2 px-4 mx-auto mt-10">
            {weekDays.map((day, index) => (
              <button
                key={day}
                onClick={() => handleDayClick(index)}
                className={`flex-1 rounded-lg border-2 py-2 font-medium duration-300 ease-in-out ${
                  selectedDay === index
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
      </div>
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
                  className={isLoading ? "hidden" : "block my-2 flex flex-row justify-center"}
                  key={dish.id}
                >
                  <h2>{dish.name}</h2>
                  <button
                    onClick={() => {
                      if (!searchArr.some((item) => item.id === dish.id)) {
                        setSearchArr([...searchArr, dish]);
                        console.log(dish);
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
              <button
                onClick={handleSubmit}
                className="ms-4 rounded-lg border-2 border-orange-500 p-1 px-3 font-medium text-orange-500 duration-300 ease-in-out hover:bg-orange-500 hover:text-white"
              >
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
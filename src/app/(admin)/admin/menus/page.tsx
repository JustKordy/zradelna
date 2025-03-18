"use client";
import React, { useState } from "react";
import { Spinner } from "~/comps/spinner";

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
  const inputRef = React.createRef<HTMLInputElement>();
  const inputRefPol = React.createRef<HTMLInputElement>();

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

  return (
    <div className="">
      <div className="w-full gap-4 p-5">
        <div className="flex w-full flex-col justify-center gap-4 bg-slate-100 md:flex-row">
          <h1>tydny</h1>
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

            <div className=" w-1/2 justify-center rounded-lg bg-gray-300 p-4" >
              <div className={isLoading ? "block" : "hidden"}>
                <Spinner />
              </div>
              {searchRes.map((dish) => (
                <div
                  className={isLoading ? "hidden" : "block my-2 flex flex-row justify-center"}  
                  key={dish.id}
                >
                  <h2>{dish.name}</h2>
                  <p>{dish.description}</p>
                  <button
                    onClick={() => {
                      if (!searchArr.some((item) => item.id === dish.id)) {
                        setSearchArr([...searchArr, dish]);
                        console.log(dish)
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
              <button onClick={handleSubmit} className="ms-4 rounded-lg border-2 border-orange-500 p-1 px-3 font-medium text-orange-500 duration-300 ease-in-out hover:bg-orange-500 hover:text-white">
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

async function fetchMenuId(selectedDay: string, week: Week | undefined): Promise<number | null> {
  if (!week) {
    console.error("Week context is undefined.");
    return null;
  }

  try {
    const response = await fetch(`/api/menus?day=${selectedDay}&weekStart=${week.start.toISOString()}&weekEnd=${week.end.toISOString()}`);
    if (!response.ok) {
      console.error("Failed to fetch menu ID:", response.statusText);
      return null;
    }

    const data = (await response.json()) as { menuId: number | null };
    return data.menuId ?? null;
  } catch (error) {
    console.error("Error fetching menu ID:", error);
    return null;
  }
}

// ✅ Ujisti se, že komponenta je exportována **až na konci**
export default Page;
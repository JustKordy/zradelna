"use client";
import React, { useState } from "react";
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

  const inputRef = React.createRef<HTMLInputElement>();
  const inputRefPol = React.createRef<HTMLInputElement>();

  const handleInput = async () => {
    if (inputRef.current) {
      try {
        const result = await findDish(inputRef.current.value, false);
        setSearchRes(result);
      } catch (e) {
        console.error(e);
      }
    }
  };
  const handleInputPol = async () => {
    if (inputRefPol.current) {
      try {
        const result = await findDish(inputRefPol.current.value, true);
        setSearchRes(result);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="">
      <div className="w-full">
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
              {searchRes.map((dish) => (
                <div
                  className="my-2 flex flex-row justify-center"
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
            <div className="flex flex-row">
              <button className="ms-4 rounded-lg border-2 border-orange-500 p-1 px-3 font-medium text-orange-500 duration-300 ease-in-out hover:bg-orange-500 hover:text-white">
                Podvrdit
              </button>
                <button onClick={() => {setSearchArr([])}} className="ms-4 rounded-lg border-2 border-red-500 p-1 px-3 font-medium text-red-500 duration-300 ease-in-out hover:bg-red-500 hover:text-white">
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
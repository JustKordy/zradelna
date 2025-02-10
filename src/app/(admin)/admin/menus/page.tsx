"use client";
import React, { useState } from "react";

function Page() {
  const [page, setPage] = useState<number>(1);

  const handleClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="">
      <div className=" w-full gap-4 p-5">
        <div className="w-full rounded-lg bg-slate-100">
          <div className="flex w-full flex-row justify-center gap-4 p-4">
            <button
              onClick={() => handleClick(1)}
              className={`${page === 1 ? "bg-orange-500 text-white" : "bg-slate-50"} rounded-lg border-2 border-orange-500 p-4 px-7 font-bold text-orange-500 duration-300 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-slate-50`}
            >
              PO
            </button>
            <button
              onClick={() => handleClick(2)}
              className={`${page === 2 ? "bg-orange-500 text-white" : "bg-slate-50"} rounded-lg border-2 border-orange-500 p-4 px-7 font-bold text-orange-500 duration-300 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-slate-50`}
            >
              ÚT
            </button>
            <button
              onClick={() => handleClick(3)}
              className={`${page === 3 ? "bg-orange-500 text-white" : "bg-slate-50"} rounded-lg border-2 border-orange-500 p-4 px-7 font-bold text-orange-500 duration-300 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-slate-50`}
            >
              ST
            </button>
            <button
              onClick={() => handleClick(4)}
              className={`${page === 4 ? "bg-orange-500 text-white" : "bg-slate-50"} rounded-lg border-2 border-orange-500 p-4 px-7 font-bold text-orange-500 duration-300 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-slate-50`}
            >
              ČT
            </button>
            <button
              onClick={() => handleClick(5)}
              className={`${page === 5 ? "bg-orange-500 text-white" : "bg-slate-50"} rounded-lg border-2 border-orange-500 p-4 px-7 font-bold text-orange-500 duration-300 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-slate-50`}
            >
              PÁ
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col md:flex-row justify-center gap-4 mt-10">
          <div className=" w-full flex-col md:w-1/2 flex justify-center gap-4 text-center bg-slate-100">
            <form action="">
              <h1 className="my-5 font-bold text-orange-500 text-lg">Přidání menu</h1>
              <label htmlFor="jidlo1" className="font-bold text-orange-500 mx-10">Jídlo 1:</label>
              <input name="jidlo1" className="rounded-lg border-2 border-orange-400 py-2 me-2 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400 ps-1 placeholder:text-orange-400" placeholder="Hledat Jídlo" type="text" />
              <button className="rounded-lg bg-white border-2 border-orange-400 px-5 py-2 font-bold text-orange-400 duration-300 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-slate-50 ">Potvrdit</button>
              <div className="flex flex-col">
                <h1 className="my-2">vybrané jídlo</h1>
              </div>
            </form>
            <form action="">
              <label htmlFor="jidlo1" className="font-bold text-orange-500 mx-10">Jídlo 2:</label>
              <input name="jidlo1" className="rounded-lg border-2 border-orange-400 py-2 me-2 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400 ps-1 placeholder:text-orange-400" placeholder="Hledat Jídlo" type="text" />
              <button className="rounded-lg bg-white border-2 border-orange-400 px-5 py-2 font-bold text-orange-400 duration-300 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-slate-50 ">Potvrdit</button>
              <div className="flex flex-col">
                <h1 className="my-2">vybrané jídlo</h1>
              </div>
            </form>
            <form action="">
              <label htmlFor="jidlo1" className="font-bold text-orange-500 mx-10">Jídlo 3:</label>
              <input name="jidlo1" className="rounded-lg border-2 border-orange-400 py-2 me-2 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400 ps-1 placeholder:text-orange-400" placeholder="Hledat Jídlo" type="text" />
              <button className="rounded-lg bg-white border-2 border-orange-400 px-5 py-2 font-bold text-orange-400 duration-300 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-slate-50 ">Potvrdit</button>
              <div className="flex flex-col">
                <h1 className="my-2">vybrané jídlo</h1>
              </div>
            </form>
            <form action="">
              <label htmlFor="jidlo1" className="font-bold text-orange-500 mx-8">Polévka: </label>
              <input name="jidlo1" className="rounded-lg border-2 border-orange-400 py-2 me-2 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400 ps-1 placeholder:text-orange-400" placeholder="Hledat Polévku" type="text" />
              <button className="rounded-lg bg-white border-2 border-orange-400 px-5 py-2 font-bold text-orange-400 duration-300 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-slate-50 ">Potvrdit</button>
              <div className="flex flex-col">
                <h1 className="my-2">vybrané jídlo</h1>
              </div>
            </form>
          </div>
          <div className=" w-full md:w-1/2 flex justify-center text-center bg-slate-100">
            <form action="">
              <h1>Přidání menu</h1>
              <input type="text" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

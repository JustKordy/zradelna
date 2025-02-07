"use client"
import React, { useState } from "react";

//text-slate-50 font-bold p-4 bg-orange-400 px-7 hover:bg-orange-500 ease-in-out duration-300 rounded-xl

function Page() {
    const [page, setPage] = useState<number>();
    
    const handleClick = (pageNumber: number) => {
        setPage(pageNumber);
    }

  return (
    <div className="">
      <div className="grid  grid-cols-5 p-5 grid-rows-5 gap-4">
        <div className="col-span-5 bg-slate-100 rounded-lg row-span-2">
            <div className="flex flex-row p-4 gap-4 justify-center">
                <button onClick={() => handleClick(1)} className={`${page === 1 ? "bg-orange-400" : "bg-slate-50"} text-black border-2 border-orange-400 hover:text-slate-50 hover:border-orange-500 font-bold p-4 px-7 hover:bg-orange-500 ease-in-out duration-300 rounded-lg`}>PO</button>
                <button onClick={() => handleClick(2)} className={`${page === 2 ? "bg-orange-400" : "bg-slate-50"} text-black border-2 border-orange-400 hover:text-slate-50 hover:border-orange-500 font-bold p-4 px-7 hover:bg-orange-500 ease-in-out duration-300 rounded-lg`}>ÚT</button>
                <button onClick={() => handleClick(3)} className={`${page === 3 ? "bg-orange-400" : "bg-slate-50"} text-black border-2 border-orange-400 hover:text-slate-50 hover:border-orange-500 font-bold p-4 px-7 hover:bg-orange-500 ease-in-out duration-300 rounded-lg`}>ST</button>
                <button onClick={() => handleClick(4)} className={`${page === 4 ? "bg-orange-400" : "bg-slate-50"} text-black border-2 border-orange-400 hover:text-slate-50 hover:border-orange-500 font-bold p-4 px-7 hover:bg-orange-500 ease-in-out duration-300 rounded-lg`}>ČT</button>
                <button onClick={() => handleClick(5)} className={`${page === 5 ? "bg-orange-400" : "bg-slate-50"} text-black border-2 border-orange-400 hover:text-slate-50 hover:border-orange-500 font-bold p-4 px-7 hover:bg-orange-500 ease-in-out duration-300 rounded-lg`}>PÁ</button>
            </div>
        </div>
        <div className="col-span-2 bg-slate-100 row-span-3 row-start-3">5</div>
        <div className="col-span-2 bg-slate-100 col-start-3 row-span-3 row-start-3">6</div>
        <div className="col-start-5 bg-slate-100 row-span-3 row-start-3">7</div>
      </div>
    </div>
  );
}

export default Page;

// http://localhost:3000/admin
// 2 velke tlacitka => 1, ktere bude smerovat na pridavani jidel, 2 bude smerovat na pridavani menu na jednotlivy tydny
"use client"
import { redirect } from "next/navigation";
import React from "react";

function page() {
  return (
    <div>
      <div className=" my-3 flex">
        <div className="mt-52 w-96 md:w-1/4 rounded-xl bg-slate-100 flex mx-auto p-3 py-10">
          <div className="flex flex-col mx-auto gap-4">
            <h1 className="flex mx-auto font-bold text-5xl md:text-2xl mb-3">Admin</h1>
            <div className="flex-col md:flex-row flex gap-4">
            <button onClick={() => {redirect("admin/menus/")}} className="bg-orange-400 rounded-lg text-slate-50 hover:bg-orange-300 ease-in-out duration-300 text-4xl md:text-xl  p-5 md:p-4 hover:-translate-y-2">Menu</button>
            <button onClick={() => {redirect("admin/dishes/")}} className="bg-orange-400 rounded-lg text-slate-50 hover:bg-orange-300 ease-in-out duration-300 text-4xl md:text-xl p-5 md:p-4 hover:-translate-y-2 ">Jídla</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

// http://localhost:3000/admin
// 2 velke tlacitka => 1, ktere bude smerovat na pridavani jidel, 2 bude smerovat na pridavani menu na jednotlivy tydny
"use client";
import { redirect } from "next/navigation";
import React from "react";

function page() {
  return (
    <div>
      <div className="my-3 flex">
        <div className="mx-auto mt-52 flex w-96 rounded-xl bg-slate-100 p-3 py-10 md:w-1/4">
          <div className="mx-auto flex flex-col gap-4">
            <h1 className="mx-auto mb-3 flex text-5xl font-bold md:text-2xl">
              Přidat:
            </h1>
            <div className="flex flex-col gap-4 md:flex-row">
              <button
                onClick={() => {
                  redirect("/admin/menus");
                }}
                className="rounded-lg bg-orange-400 p-5 text-4xl text-slate-50 duration-300 ease-in-out hover:-translate-y-2 hover:bg-orange-300 md:p-4 md:text-xl"
              >
                Menu
              </button>
              <button
                onClick={() => {
                  redirect("/admin/dishes");
                }}
                className="rounded-lg bg-orange-400 p-5 text-4xl text-slate-50 duration-300 ease-in-out hover:-translate-y-2 hover:bg-orange-300 md:p-4 md:text-xl"
              >
                Jídla
              </button>
              <button
                onClick={() => {
                  redirect("/admin/export");
                }}
                className="rounded-lg bg-orange-400 p-5 text-4xl text-slate-50 duration-300 ease-in-out hover:-translate-y-2 hover:bg-orange-300 md:p-4 md:text-xl"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

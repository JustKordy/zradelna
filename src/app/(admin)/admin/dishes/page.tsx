"use client";

import React, { useEffect } from 'react';

function Page() {
    const inputRefName = React.createRef<HTMLInputElement>();
    const inputRefDes = React.createRef<HTMLInputElement>();
    const inputRefImg = React.createRef<HTMLInputElement>();

  


  return (
    <div className="">
      <div className="w-full">
      </div>
      <div className="w-full gap-4 p-5">
        <div className="mt-10 flex w-full flex-col justify-center gap-4 md:flex-row">
          <div className="flex w-full flex-col items-center justify-center gap-4 bg-slate-100 text-center md:w-full">
            <h1 className="text-center text-lg font-bold text-orange-500">
              Přidání menu
            </h1>

          <div className="flex flex-row">

            <h1 className=" me-3 text-md font-bold text-orange-500">
              název: 
            </h1>
            <input
                  ref={inputRefName}
                  className="mb-10 me-2 w-full rounded-lg border-2 border-orange-400 py-2 ps-1 placeholder:text-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400"
                  placeholder="Hledat Jídlo"
                  type="text"
                />

          </div>
          <div className="flex flex-row">

            <h1 className=" me-3 text-md font-bold text-orange-500">
              název: 
            </h1>
            <input
                  ref={inputRefDes}
                  className="mb-10 me-2 w-full rounded-lg border-2 border-orange-400 py-2 ps-1 placeholder:text-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400"
                  placeholder="Hledat Jídlo"
                  type="text"
                />

          </div>
          <div className="flex flex-row">

            <h1 className=" me-3 text-md font-bold text-orange-500">
              název: 
            </h1>
            <input
                  ref={inputRefImg}
                  className="mb-10 me-2 w-full rounded-lg border-2 border-orange-400 py-2 ps-1 placeholder:text-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400"
                  placeholder="Hledat Jídlo"
                  type="image"
                />

          </div>

            
            <div className="flex flex-row">
              <button className="ms-4 rounded-lg border-2 border-orange-500 p-1 px-3 font-medium text-orange-500 duration-300 ease-in-out hover:bg-orange-500 hover:text-white">
                Podvrdit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
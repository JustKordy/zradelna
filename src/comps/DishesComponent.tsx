"use client";

import { useState } from "react";
import IDish from "~/interfaces/IDish";

export function DishesComponent({ dishes }: { dishes: IDish[] }) {
  const [showInformationDesc, setShowInformationDesc] = useState<boolean>();
  const [showEditDesc, setShowEditDesc] = useState<boolean>();
  const [showRemoveDesc, setShowRemoveDesc] = useState<boolean>();

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 overflow-scroll bg-gray-100 lg:flex-col xl:flex-row">
        <div className="overflow-auto rounded-lg bg-white p-4 lg:w-[100%] xl:h-[80%] xl:w-[50%]">
          {dishes.map((dish, index) => {
            return (
              <div
                key={index}
                className="mb-3 flex h-32 w-full items-center justify-between rounded-lg bg-gray-100 px-4"
              >
                <div className="flex h-full w-full flex-row items-center justify-start">
                  <img
                    src={
                      dish.imgURL ??
                      "https://e7.pngegg.com/pngimages/946/869/png-clipart-responsive-web-design-http-404-web-template-system-others-miscellaneous-purple.png"
                    }
                    className="w-14 rounded-lg bg-white object-cover md:h-[60%] md:w-20 xl:h-[70%] xl:w-20"
                  />

                  <div className="ml-5 flex w-[60%] flex-col items-start justify-center py-3 pr-5">
                    <h1 className="text-xl font-semibold">{dish.name}</h1>
                    <p className="text-md text-gray-400">{dish.description}</p>
                  </div>
                </div>
                <div className="flex h-full flex-col items-center justify-center gap-1">
                  <div
                    onMouseEnter={() => setShowInformationDesc(true)}
                    onMouseLeave={() => setShowInformationDesc(false)}
                    className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-blue-500 text-xs text-white hover:bg-blue-600"
                  >
                    <i className="fa-solid fa-info"></i>
                    {showInformationDesc && (
                      <div className="absolute right-[2.2rem] top-0 w-32 break-words rounded-lg bg-blue-400 p-3">
                        <p className="text-xs text-white">
                          Zobrazení informací o daném jídle
                        </p>
                      </div>
                    )}
                  </div>
                  <div
                    onMouseEnter={() => setShowEditDesc(true)}
                    onMouseLeave={() => setShowEditDesc(false)}
                    className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-green-500 text-xs text-white hover:bg-green-600"
                  >
                    <i className="fa-solid fa-edit"></i>
                    {showEditDesc && (
                      <div className="top-50 absolute right-[2.2rem] w-32 break-words rounded-lg bg-green-400 p-3">
                        <p className="text-xs text-white">Upravit jídlo</p>
                      </div>
                    )}
                  </div>
                  <div
                    onMouseEnter={() => setShowRemoveDesc(true)}
                    onMouseLeave={() => setShowRemoveDesc(false)}
                    className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-red-500 text-xs text-white hover:bg-red-600"
                  >
                    <i className="fa-solid fa-trash"></i>
                    {showRemoveDesc && (
                      <div className="absolute bottom-0 right-[2.2rem] w-32 break-words rounded-lg bg-red-400 p-3">
                        <p className="text-xs text-white">
                          Smazání jídla (tato akce je nevratná)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="rounded-lg bg-white lg:w-[100%] xl:h-[80%] xl:w-[50%]"></div>
      </div>
    </>
  );
}


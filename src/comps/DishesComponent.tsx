'use client'

import { useState } from "react"
import IDish from "~/interfaces/IDish"

export function DishesComponent({ dishes }: { dishes: IDish[] }) {
    const [showInformationDesc, setShowInformationDesc] = useState<boolean>()
    const [showEditDesc, setShowEditDesc] = useState<boolean>()
    const [showRemoveDesc, setShowRemoveDesc] = useState<boolean>()


    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center xl:flex-row lg:flex-col flex-col gap-5 bg-gray-100 overflow-scroll">
                <div className="xl:w-[50%] lg:w-[100%] xl:h-[80%] bg-white overflow-auto p-4 rounded-lg ">
                    {
                        dishes.map((dish, index) => {
                            return (
                                <div key={index} className="w-full h-32 rounded-lg bg-gray-100 mb-3 flex items-center justify-between px-4">
                                    <div className="w-full h-full flex justify-start items-center flex-row">
                                        <img src={dish.imgURL ? dish.imgURL : "https://e7.pngegg.com/pngimages/946/869/png-clipart-responsive-web-design-http-404-web-template-system-others-miscellaneous-purple.png"}
                                            className="w-14 md:w-20 xl:w-20 md:h-[60%] xl:h-[70%] bg-white rounded-lg object-cover" />

                                        <div className="flex justify-center w-[60%] items-start flex-col ml-5 py-3 pr-5">
                                            <h1 className="text-xl font-semibold ">{dish.name}</h1>
                                            <p className="text-md text-gray-400">{dish.description}</p>
                                        </div>
                                    </div>
                                    <div className="h-full flex justify-center items-center flex-col gap-1">
                                        <div onMouseEnter={() => setShowInformationDesc(true)} onMouseLeave={() => setShowInformationDesc(false)} className="w-8 h-8 cursor-pointer hover:bg-blue-600 bg-blue-500 rounded-lg flex justify-center items-center text-white text-xs relative">
                                            <i className="fa-solid fa-info"></i>
                                            {
                                                showInformationDesc && (<div className="absolute right-[2.2rem] top-0 rounded-lg w-32  bg-blue-400 p-3 break-words">
                                                    <p className="text-white text-xs">Zobrazení informací o daném jídle</p>
                                                </div>)
                                            }
                                        </div>
                                        <div onMouseEnter={() => setShowEditDesc(true)} onMouseLeave={() => setShowEditDesc(false)} className="w-8 h-8 cursor-pointer hover:bg-green-600 bg-green-500 rounded-lg flex justify-center items-center text-white text-xs relative">
                                            <i className="fa-solid fa-edit"></i>
                                            {
                                                showEditDesc && (<div className="absolute right-[2.2rem] top-50 rounded-lg w-32  bg-green-400 p-3 break-words">
                                                    <p className="text-white text-xs">Upravit jídlo</p>
                                                </div>)
                                            }
                                        </div>
                                        <div onMouseEnter={() => setShowRemoveDesc(true)} onMouseLeave={() => setShowRemoveDesc(false)} className="w-8 h-8 cursor-pointer hover:bg-red-600 bg-red-500 rounded-lg flex justify-center items-center text-white text-xs relative">
                                            <i className="fa-solid fa-trash"></i>
                                            {
                                                showRemoveDesc && (<div className="absolute right-[2.2rem] bottom-0 rounded-lg w-32  bg-red-400 p-3 break-words">
                                                    <p className="text-white text-xs">Smazání jídla (tato akce je nevratná)</p>
                                                </div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>
                <div className="xl:w-[50%] lg:w-[100%] xl:h-[80%] bg-white rounded-lg">

                </div>
            </div>
        </>
    )

}
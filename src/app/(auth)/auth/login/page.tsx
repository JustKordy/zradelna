'use client'
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
import { useState } from "react";

export default function Login() {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <>
            <div className="w-screen h-screen bg-white flex justify-center items-center">
                <div className="w-[30%] border-2 transition-all rounded-xl flex justify-start items-center p-5 flex-col gap-4">
                    <h1 className="text-md text-gray-700">Přihlášení pro studenty</h1>
                    <button className="w-full h-16 p-3 rounded-lg bg-gray-100 flex justify-start items-center gap-3 cursor-pointer ring-gray-300 hover:ring-2">
                        <div className="flex justify-center items-center h-12 w-12 bg-white rounded-lg p-3">
                            <img src="https://www.microsoft.com/cs-cz/microsoft-365/blog/wp-content/uploads/sites/6/2022/06/cropped-microsoft_logo_element.webp" alt="" className="w-full h-full" />
                        </div>
                        <span className="text-gray-700">Microsoft přihlášení</span>
                    </button>
                    <div className="w-full h-[1px] bg-gray-300 mt-3 mb-3"></div>
                    <h1 className="text-center text-md text-gray-700">Přihlášení pro správce</h1>
                    <form className="w-full flex justify-center items-start gap-4 flex-col">
                        <input type="text" name="" required className="w-full h-12 bg-gray-100 rounded-lg text-start p-5" placeholder="Uživatelské jméno" id="" />
                        <div className="w-full flex justify-center items-center flex-row">
                            <input type={showPassword ? "text" : "password"} name="" required className="w-[88%] h-12 bg-gray-100 rounded-l-lg text-start p-5 visible" placeholder="Heslo" id="" />
                            <div className="w-[12%] h-12 bg-gray-200 rounded-r-lg flex justify-center items-center cursor-pointer" onClick={() => {setShowPassword(!showPassword); console.log(showPassword)}}>
                                <i className={showPassword ? "fa-solid text-gray-500 fa-eye" : "fa-solid text-gray-500 fa-eye-slash"}></i>
                            </div>
                        </div>
                        <input type="button" className="h-12 w-full bg-blue-500 rounded-lg text-white cursor-pointer hover:bg-blue-600" value="Přihlásit" />
                    </form>
                </div>
            </div>
        </>
    )
}
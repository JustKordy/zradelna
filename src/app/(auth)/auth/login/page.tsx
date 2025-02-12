"use client";
import Image from "next/image";
import msLogo from "~/../public/ms-logo.webp";
import { useActionState, useState } from "react";
import { login, signInWithMicrosoft } from "./actions";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const initialState = {
    message: "",
  };

  const [state, formAction] = useActionState(login, initialState);

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <div className="flex w-[80%] flex-col items-center justify-start gap-4 rounded-xl border-2 p-5 transition-all sm:w-[40%] md:w-[40%]">
          <h1 className="text-md text-gray-700">Přihlášení pro studenty</h1>
          <form action={signInWithMicrosoft} className="w-full">
            <button className="flex h-16 w-full cursor-pointer items-center justify-start gap-3 rounded-lg bg-gray-100 p-3 ring-gray-300 hover:ring-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white p-3">
                <Image
                  src={msLogo}
                  alt="The microsoft logo"
                  className="h-full w-full"
                />
              </div>
              <span className="text-gray-700">Microsoft přihlášení</span>
            </button>
          </form>
          <div className="mb-3 mt-3 h-[1px] w-full bg-gray-300"></div>
          <h1 className="text-md text-center text-gray-700">
            Přihlášení pro správce
          </h1>
          <form
            action={formAction}
            className="flex w-full flex-col items-start justify-center gap-4"
          >
            <input
              type="email"
              name="email"
              required
              className="h-12 w-full rounded-lg bg-gray-100 p-5 text-start"
              placeholder="E-Mail"
              id=""
            />
            <div className="flex w-full flex-row items-center justify-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="visible h-12 w-[88%] rounded-l-lg bg-gray-100 p-5 text-start"
                placeholder="Heslo"
                id=""
              />
              <div
                className="flex h-12 w-[12%] cursor-pointer items-center justify-center rounded-r-lg bg-gray-200"
                onClick={() => {
                  setShowPassword(!showPassword);
                  console.log(showPassword);
                }}
              >
                <i
                  className={
                    showPassword
                      ? "fa-solid fa-eye text-gray-500"
                      : "fa-solid fa-eye-slash text-gray-500"
                  }
                ></i>
              </div>
            </div>
            <input
              type="submit"
              className="h-12 w-full cursor-pointer rounded-lg bg-orange-500 text-white hover:bg-orange-600"
              value="Přihlásit"
            />
            <p className="text-red-500">{state.message ? state.message : ""}</p>
          </form>
        </div>
      </div>
    </>
  );
}

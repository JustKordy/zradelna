"use client";

import React, { useEffect } from "react";
import { Spinner } from "~/comps/spinner";
import { addDish, findDish } from "~/server/queries/dish";

function Page() {
  //refs and usestates
  const inputRefName = React.createRef<HTMLInputElement>();
  const inputRefDes = React.createRef<HTMLInputElement>();
  const inputRefImg = React.createRef<HTMLInputElement>();
  const [dishes, setDishes] = React.useState<
    {
      id: number;
      name: string;
      isSoup: boolean;
      description: string | null;
      imgURL: string | null;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >();

  const [message, setMessage] = React.useState<{
    message: string;
    state: boolean;
  }>();
  const [isSoup, setIsSoup] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  //fetch dishList
  useEffect(() => {
    setIsLoading(true);
    const fetchDishes = async () => {
      const dishesList = await findDish("", isSoup);
      setDishes(dishesList);
      setIsLoading(false);
    };
    fetchDishes().catch(console.error);
  }, [isSoup]);

  //submiting the form
  const submitForm = async () => {
    if (inputRefName.current && inputRefDes.current && inputRefImg.current) {
      try {
        setIsLoading(true);
        const name = inputRefName.current.value;
        const description = inputRefDes.current.value;
        const imgURL = inputRefImg.current.value;
        await addDish(name, description, imgURL, isSoup);
        setMessage({
          message: "vše je v pořádku, přidané jídlo: " + name,
          state: true,
        });
        setIsLoading(false);
      } catch (e) {
        setIsLoading(true);
        console.error(e);
        setMessage({
          message: "něco se pokazilo error: ",
          state: false,
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="">
      <div className="w-full"></div>
      <div className="w-full gap-4 p-5">
        <div className="mt-10 flex w-full flex-col justify-center gap-4 md:flex-row">
          <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 text-center md:w-full">
            <h1 className="my-5 text-center text-lg font-bold text-orange-500">
              Přidání menu
            </h1>

            <div className="flex flex-col md:flex-row">
              <input
                ref={inputRefName}
                className="mb-5 focus:boder- me-2 w-full rounded-lg border-2 border-orange-400 py-2 ps-1 placeholder:text-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400 md:w-1/2"
                placeholder="Název Jídla"
                type="text"
              />
              <input
                ref={inputRefDes}
                className="mb-5 w-full rounded-lg border-2 border-orange-400 py-2 ps-1 placeholder:text-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400 md:w-1/2"
                placeholder="Popis Jídla"
                type="text"
              />
            </div>

            {/* dropzone */}

            {/* <div className="flex w-full items-center justify-center md:w-1/2">
              <label
                htmlFor="dropzone-file"
                className="h-55 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-orange-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-orange-500">
                      Klikni pro nahrání
                    </span>{" "}
                    nebo přesuň soubor
                  </p>
                </div>
                <input
                  ref={inputRefImg}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                />
              </label>
            </div> */}

            <div className="flex flex-row">
              <ul className="w-48 flex rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-900">
                <li className="w-full rounded-t-lg border-gray-200">
                  <div className="flex items-center ps-3">
                    <input
                      onChange={() => setIsSoup(false)}
                      checked={!isSoup}
                      id="list-radio-license"
                      type="radio"
                      value=""
                      name="list-radio"
                      className="h-4 w-4 border-orange-500 bg-slate-300 text-orange-500 focus:ring-1 focus:ring-orange-400"
                    />
                    <label
                      htmlFor="list-radio-license"
                      className="ms-2 w-full py-3 text-sm font-medium text-gray-900 "
                    >
                      Jídlo
                    </label>
                  </div>
                </li>
                <li className="w-full rounded-t-lg border-gray-200">
                  <div className="flex items-center ps-3">
                    <input
                      checked={isSoup}
                      onChange={() => setIsSoup(true)}
                      id="list-radio-id"
                      type="radio"
                      value=""
                      name="list-radio"
                      className="h-4 w-4 border-gray-500 bg-slate-300 text-orange-500 focus:ring-1 focus:ring-orange-400"
                    />
                    <label
                      htmlFor="list-radio-id"
                      className="ms-2 w-full py-3 text-sm font-medium text-gray-900 pe-5"
                    >
                      Polévka
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            <div className="">
              {message && (
                <div>
                  <h1
                    className={
                      message.state ? "text-green-500" : "text-red-500"
                    }
                  >
                    {message.message}
                  </h1>
                </div>
              )}
            </div>

            <div className="flex flex-row">
              <button
                onClick={submitForm}
                className="ms-4 bg-white w-full rounded-lg border-2 border-orange-400 p-1 px-10 font-medium text-orange-400 duration-300 ease-in-out hover:bg-orange-400 hover:text-white"
              >
                Podvrdit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="rouded-lg mx-auto flex flex-col text-center">
        <div className="m-4 rounded-lg bg-gray-100 py-10">
          <div className={isLoading ? "hidden" : "mx-auto block flex flex-col"}>
            {dishes?.map((dish) => (
              <span key={dish.id}>
                <div>{dish.name}</div>
              </span>
            ))}
          </div>
          <div className={isLoading ? "block" : "hidden"}>
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

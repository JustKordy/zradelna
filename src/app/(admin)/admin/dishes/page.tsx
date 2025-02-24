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
          <div className="flex w-full flex-col items-center justify-center gap-4 bg-slate-100 text-center md:w-full">
            <h1 className="text-center my-5 text-lg font-bold text-orange-500">
              Přidání menu
            </h1>

            <div className="flex flex-row">
              <input
                ref={inputRefName}
                className="mb-5 me-2 w-1/2 rounded-lg border-2 border-orange-400 py-2 ps-1 placeholder:text-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400"
                placeholder="Název Jídla"
                type="text"
              />
              <input
                ref={inputRefDes}
                className="mb-5 w-1/2 rounded-lg border-2 border-orange-400 py-2 ps-1 placeholder:text-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400"
                placeholder="Popis Jídla"
                type="text"
              />
            </div>
            <div className="flex flex-row">
              <input
                ref={inputRefImg}
                className="mb-5 me-2 w-full rounded-lg border-2 background-white border-orange-400 py-2 ps-1 placeholder:text-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400"
                placeholder="Obrázek Jídla"
                type="file"
                />
            </div>
            <div className="flex flex-row">
              <input
                onChange={() => setIsSoup(false)}
                checked={!isSoup}
                id="default-radio-1"
                type="radio"
                value=""
                name="default-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="default-radio-1"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Jídlo
              </label>
              <input
                checked={isSoup}
                onChange={() => setIsSoup(true)}
                id="default-radio-2"
                type="radio"
                value=""
                name="default-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="default-radio-2"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Polévka
              </label>
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
                className="ms-4 rounded-lg border-2 w-full border-orange-400 p-1 px-10 font-medium text-orange-400 duration-300 ease-in-out hover:bg-orange-400 hover:text-white"
              >
                Podvrdit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="rouded-lg mx-auto flex flex-col text-center">
        <div className="m-4 rounded-lg bg-gray-200 py-10">
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

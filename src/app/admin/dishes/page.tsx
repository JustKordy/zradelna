"use client";

import React, { useEffect } from "react";
import { Spinner } from "~/comps/spinner";
import { addDish, findDish, deleteDish } from "~/server/queries/dish";

function Page() {
  //refs and usestates
  const inputRefName = React.createRef<HTMLInputElement>();
  const inputRefDes = React.createRef<HTMLInputElement>();
  const [dishes, setDishes] = React.useState<
    {
      id: number;
      name: string;
      isSoup: boolean;
      description: string | null;
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
    if (inputRefName.current && inputRefDes.current) {
      try {
        setIsLoading(true);
        const name = inputRefName.current.value;
        const description = inputRefDes.current.value;
        await addDish(name, description, isSoup);
        setMessage({
          message: "vše je v pořádku, přidané jídlo: " + name,
          state: true,
        });
        const dishesList = await findDish("", isSoup);
        setDishes(dishesList);
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

  const onDelete = async (dishId: number) => {
    try {
      setIsLoading(true);
      await deleteDish(dishId);
      const dishesList = await findDish("", isSoup);
      setDishes(dishesList);
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
  };

  return (
    <div className="">
      <div className="w-full"></div>
      <div className="w-full gap-4 p-5">
        <div className="mt-10 flex w-full flex-col justify-center gap-4 md:flex-row">
          <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 text-center md:w-full">
            <h1 className="my-5 text-center text-lg font-bold text-orange-500">
              Přidání jídla
            </h1>

            <div className="flex flex-col md:flex-row">
              <input
                ref={inputRefName}
                className="focus:boder- mb-5 me-2 w-full rounded-lg border-2 border-orange-400 py-2 ps-1 placeholder:text-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400 md:w-1/2"
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

            <div className="flex flex-row">
              <ul className="flex w-48 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-900">
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
                      className="ms-2 w-full py-3 text-sm font-medium text-gray-900"
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
                      className="ms-2 w-full py-3 pe-5 text-sm font-medium text-gray-900"
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
                className="ms-4 w-full rounded-lg border-2 border-orange-400 bg-white p-1 px-10 font-medium text-orange-400 duration-300 ease-in-out hover:bg-orange-400 hover:text-white"
              >
                Podvrdit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-4xl flex-col rounded-lg p-4 text-center">
        <div className="mx-auto flex max-w-4xl flex-col rounded-lg p-4 text-center">
          <div className="m-4 rounded-lg bg-gray-100 p-6 shadow-lg">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Spinner />
              </div>
            ) : (
              <table className="min-w-full overflow-hidden rounded-lg border border-gray-300 bg-white">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border-b px-6 py-3 text-left">Název</th>
                    <th className="border-b px-6 py-3 text-left">Popis</th>
                    <th className="border-b px-6 py-3 text-left">Akce</th>
                  </tr>
                </thead>
                <tbody>
                  {dishes?.map((dish) => (
                    <tr key={dish.id} className="border-b hover:bg-gray-100">
                      <td className="px-6 py-3">{dish.name}</td>
                      <td className="px-6 py-3 text-gray-600">
                        {dish.description}
                      </td>
                      <td className="px-6 py-3">
                        <button
                          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                          onClick={() => onDelete(dish.id)}
                        >
                          Smazat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

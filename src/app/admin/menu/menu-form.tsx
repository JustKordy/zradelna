"use client";

import { useState, useTransition } from "react";
import { createMenuAction } from "~/server/queries/menus";

export function MenuForm() {
  const [isPending, startTransition] = useTransition();
  const [dishes, setDishes] = useState([""]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleAddDish = () => {
    setDishes([...dishes, ""]);
  };

  const handleRemoveDish = (index: number) => {
    if (dishes.length > 1) {
      setDishes(dishes.filter((_, i) => i !== index));
    }
  };

  const handleDishChange = (index: number, value: string) => {
    const newDishes = [...dishes];
    newDishes[index] = value;
    setDishes(newDishes);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Clear previous dishes and add current ones
    dishes.forEach((dish) => {
      formData.append("dishes[]", dish);
    });

    startTransition(async () => {
      const result = await createMenuAction(formData);

      if (result.success) {
        setMessage({ type: "success", text: result.message });
        setDishes([""]); // Reset form
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage({ type: "error", text: result.message });
      }
    });
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
      {/* <h2 className="mb-6 text-2xl font-bold text-gray-800">Create New Menu</h2> */}

      {message.text && (
        <div
          className={`mb-6 rounded-md p-4 ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="date"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Datum
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="soup"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Polévka
          </label>
          <input
            type="text"
            id="soup"
            name="soup"
            required
            placeholder="Polévka"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Jídla
            </label>
            <button
              type="button"
              onClick={handleAddDish}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + Přidat jídlo
            </button>
          </div>

          <div className="space-y-3">
            {dishes.map((dish, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={dish}
                  onChange={(e) => handleDishChange(index, e.target.value)}
                  placeholder={`Jídlo ${index + 1}`}
                  className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {dishes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDish(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                    aria-label="Remove dish"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isPending}
            className={`w-full rounded-md bg-orange-500 px-4 py-2 font-medium text-white transition hover:bg-orange-600 ${isPending ? "cursor-not-allowed opacity-70" : ""}`}
          >
            {isPending ? "Vytváříme menu..." : "Vytvořit Menu"}
          </button>
        </div>
      </form>
    </div>
  );
}

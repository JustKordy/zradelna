"use client";

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";
import type { Week } from "~/types/week";

type WeekContextType = {
  week: Week | undefined;
  setWeek: Dispatch<SetStateAction<Week | undefined>>;
};
export const WeekContext = createContext<WeekContextType | undefined>(
  undefined,
);
export function WeekContextProvider(
  props: Readonly<{ children: React.ReactNode }>,
) {
  const [week, setWeek] = useState<Week | undefined>(undefined);

  return (
    <>
      <WeekContext.Provider value={{ week, setWeek }}>
        {props.children}
      </WeekContext.Provider>
    </>
  );
}

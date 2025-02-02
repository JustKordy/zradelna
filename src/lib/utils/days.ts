import type { MondayDate } from "~/types/date";

export function getLastMonday(date: Date = new Date()): MondayDate {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - diff);

  return d.toISOString().split("T")[0]! as MondayDate;
}

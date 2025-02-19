import type { Week } from "~/types/week";

// This is AI code, but it appears to work and I'm not gonna deal with dates.
export function getWeeksInYear(year: number): Week[] {
  const weeks: Week[] = [];
  // Create January 1st of the year in UTC
  const jan1 = new Date(Date.UTC(year, 0, 1));
  const jan1Day = jan1.getUTCDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate days to add to reach the first UTC Monday
  const daysToAdd = (1 - jan1Day + 7) % 7;
  const firstMonday = new Date(jan1);
  firstMonday.setUTCDate(jan1.getUTCDate() + daysToAdd);

  let currentMonday = new Date(firstMonday);

  while (currentMonday.getUTCFullYear() <= year) {
    const start = new Date(currentMonday);
    const end = new Date(currentMonday);
    end.setUTCDate(end.getUTCDate() + 4); // Friday is 4 days after Monday

    weeks.push({ start, end });

    // Move to next Monday
    currentMonday.setUTCDate(currentMonday.getUTCDate() + 7);
    currentMonday = new Date(currentMonday); // Prevent mutation
  }

  return weeks;
}

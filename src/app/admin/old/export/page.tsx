import { WeekSelector } from "~/comps/weekSelector";
import { MenuDisplay } from "./menu-display";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <WeekSelector />
      <MenuDisplay />
    </main>
  );
}

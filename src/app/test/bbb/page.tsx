import { MenuSelector } from "~/comps/menuSelctor";
import { WeekSelector } from "~/comps/weekSelector";

export default function Page() {
  return (
    <main>
      <WeekSelector />
      <MenuSelector />
    </main>
  );
}

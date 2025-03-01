import { getWeeksInYear } from "~/lib/weeks";
import { getMenusInRangeWithUserSelect } from "~/server/queries/menus";

export default async function Page() {
  const weeks = getWeeksInYear(2025);
  const aaa = await getMenusInRangeWithUserSelect(
    weeks[4]!.start,
    weeks[4]!.end,
  );
  console.log(aaa);
  return (
    <main className="p-6">
      <div>Hello</div>
      <button className="rounded-xl bg-purple-300 p-3">Click Me</button>
    </main>
  );
}

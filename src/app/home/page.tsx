import { redirect } from "next/navigation";
import { MenuSelector } from "~/comps/menuSelctor";
import { WeekSelector } from "~/comps/weekSelector";
import { getUser } from "~/server/queries/user";

export default async function Page() {
  const user = await getUser();
  if (!user) redirect("/auth/login");

  return (
    <>
      <WeekSelector />
      <MenuSelector />
    </>
  );
}

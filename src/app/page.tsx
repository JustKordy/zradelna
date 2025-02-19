"use server"
import { redirect } from "next/navigation";
import { HomepageComponent } from "~/comps/HomepageComponent";
import type IWeek from "~/interfaces/IWeek";
import { getMenu, getMenusInRange } from "~/server/queries/menus";
import { getUser } from "~/server/queries/user";


export default async function HomePage() {
  const user = await getUser()

  if(!user) redirect("/auth/login")
  
  // const menus = await getMenusInRange(new Date(), new Date())
 
  return (
    <HomepageComponent user={user} />
  );
}

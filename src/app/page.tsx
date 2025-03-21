import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/home");
  return <h2>Tady nemáte být. :(</h2>;
}

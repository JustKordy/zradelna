import { getUser } from "~/server/queries/user";
import { login, signup } from "./actions";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUser();
  if (user) {
    redirect("/");
  }

  return (
    <form className="flex w-[30%] flex-col gap-2 bg-zinc-300">
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
      </div>
      <div>
        <button className="border p-3" formAction={login}>
          Log in
        </button>
        <button className="border p-3" formAction={signup}>
          Sign up
        </button>
      </div>
    </form>
  );
}

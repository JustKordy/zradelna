import { getUser } from "~/server/queries/user";
import { login, signInWithMicrosoft } from "./actions";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUser();
  // if (user) {
  //   redirect("/");
  // }

  return (
    <main className="flex flex-col gap-6 bg-zinc-300 p-6">
      <form className="flex w-[30%] flex-col gap-2">
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
        </div>
      </form>
      <form action={signInWithMicrosoft} className="w-[30%]">
        <button className="flex w-full items-center justify-between rounded-xl border border-black p-3">
          Sign In with
          <span className="w-12">
            <MicrosoftLogo />
          </span>
        </button>
      </form>
      <div className="border border-lime-500 p-3">{user?.id}</div>
    </main>
  );
}

function MicrosoftLogo() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <g clipPath="url(#a)">
          <path fill="#040404" d="M0 0h18v18H0V0Z" />
          <path fill="#F35325" d="M4.5 4.5h4.286v4.286H4.5V4.5Z" />
          <path fill="#81BC06" d="M9.214 4.5H13.5v4.286H9.214V4.5Z" />
          <path fill="#05A6F0" d="M4.5 9.214h4.286V13.5H4.5V9.214Z" />
          <path fill="#FFBA08" d="M9.214 9.214H13.5V13.5H9.214V9.214Z" />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h18v18H0z" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}

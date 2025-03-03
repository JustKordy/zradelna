import { signOut } from "~/server/queries/user";

export default async function Page() {
  return (
    <main>
      <form action={signOut} className="p-12">
        <button className="rounded-xl bg-red-600 p-6 text-white">
          Sign Out
        </button>
      </form>
    </main>
  );
}

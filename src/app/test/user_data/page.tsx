import { getUser } from "~/server/queries/user";

export default async function Page() {
  const user = await getUser();
  return (
    <main>
      <h1>Hello Page</h1>
      <textarea
        className="w-full border"
        value={JSON.stringify(user, null, 2)}
      />
    </main>
  );
}

import Link from "next/link";
import { createClient } from "~/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  return (
    <>
      <Link href="/">
        <h1 className="text-6xl">Hello World</h1>
      </Link>
      <div className="border p-6">
        {user.data.user !== null ? (
          <p>{user.data.user?.id}</p>
        ) : (
          user.error?.message
        )}
      </div>
    </>
  );
}

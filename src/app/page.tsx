import Link from "next/link";
import { createClient } from "~/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  return (
    <div className="flex h-screen min-h-screen flex-row bg-neutral-50">
      {/* SIDEBAR */}
      <aside className="flex h-full w-[250px] flex-col gap-4 border-r border-neutral-600 bg-neutral-800 p-2">
        <div className="flex flex-row items-center justify-center gap-4 p-4">
          <span className="text-xl font-semibold uppercase tracking-widest text-neutral-100">
            Žrádelna
          </span>
        </div>
      </aside>
      {/* MAIN CONTENT */}
      <main className="flex h-screen w-full flex-col">
        {/* Navbar */}
        <nav className="flex w-full flex-row items-center justify-between border-b border-neutral-600 bg-neutral-800 p-4">
          {/* User Profile */}
          <div className="flex flex-row items-center gap-4">
            <span className="font-semibold text-white">
              {user?.data.user?.email ?? "Unknown"}
            </span>
          </div>
        </nav>
        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-neutral-200 p-4"></div>
      </main>
    </div>
  );
}

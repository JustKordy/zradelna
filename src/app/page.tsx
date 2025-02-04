import Link from "next/link";
import { createClient } from "~/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const truncate = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
  };

  return (
    <div className="flex h-full min-h-screen flex-row">
      <aside className="flex w-[250px] flex-col items-center border-r border-neutral-200 bg-white">
        <h2 className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text p-8 text-2xl font-semibold uppercase text-transparent">
          Žrádelna
        </h2>
        <div className="mt-2 flex w-full flex-col gap-4">
          <Link
            href="/"
            className="flex w-full flex-row items-center justify-center gap-4 border-r-2 border-transparent py-3 text-sm text-neutral-700 hover:border-orange-500 hover:bg-zinc-100 hover:text-orange-500"
          >
            <i className="fas fa-home text-lg"></i>
            Domovská stránka
          </Link>
          <Link
            href="/"
            className="flex w-full flex-row items-center justify-center gap-4 border-r-2 border-transparent py-3 text-sm text-neutral-700 hover:border-orange-500 hover:bg-zinc-100 hover:text-orange-500"
          >
            <i className="fas fa-home text-lg"></i>
            Domovská stránka
          </Link>
          <Link
            href="/"
            className="flex w-full flex-row items-center justify-center gap-4 border-r-2 border-transparent py-3 text-sm text-neutral-700 hover:border-orange-500 hover:bg-zinc-100 hover:text-orange-500"
          >
            <i className="fas fa-home text-lg"></i>
            Domovská stránka
          </Link>
          <hr className="w-full border-t border-neutral-200" />
        </div>
      </aside>
      {/* content */}
      <div className="flex w-full flex-1 flex-col bg-zinc-100">
        <nav className="flex h-20 flex-row items-center justify-between border-b border-neutral-200 bg-white p-4"></nav>
      </div>
      {/* basket */}
      <aside className="flex w-[300px] flex-col border-l border-neutral-200 bg-white">
        {/* user profile */}
        <div className="flex h-20 w-full flex-row items-center justify-between gap-4 border-b border-neutral-200 px-4">
          <div className="flex flex-row items-center gap-2">
            <img
              src="https://picsum.photos/200"
              alt="user"
              className="h-12 w-12 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm text-neutral-700">
                {user?.data.user?.user_metadata.full_name}
              </span>
              <span className="text-xs text-neutral-500">
                {truncate(user?.data.user?.email ?? "", 20)}
              </span>
            </div>
          </div>
          <button className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700">
            <i className="fas fa-ellipsis-v text-xl"></i>
          </button>
        </div>
        <div className="px-6 py-10">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-xl font-semibold text-neutral-700">Košík</h3>
            <span className="text-xs text-neutral-500">3 položky</span>
          </div>
          <div className="mt-2 flex w-full flex-row gap-4 overflow-x-auto overflow-y-hidden">
            {/* takeaway or at the place buttons */}
            <button className="flex flex-row items-center justify-center gap-2 whitespace-nowrap rounded-full bg-neutral-100 px-3 py-2 text-xs font-semibold uppercase text-neutral-700 hover:bg-neutral-200">
              <i className="fas fa-shopping-bag text-xs text-neutral-500"></i>S
              sebou
            </button>
            <button className="flex flex-row items-center justify-center gap-2 whitespace-nowrap rounded-full bg-neutral-100 px-3 py-2 text-xs font-semibold uppercase text-neutral-700 hover:bg-neutral-200">
              <i className="fas fa-utensils text-xs text-neutral-500"></i>
              Na místě
            </button>
          </div>
          <div className="mt-4 border-t border-neutral-200"></div>
          <div className="mt-4 flex flex-col">
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-2">
                <div className="rounded-md bg-zinc-100 p-2">
                  <img
                    className="h-20 w-20 rounded-md object-contain"
                    src="https://www.angusfarm.cz/wp-content/uploads/2018/11/Angusfarm_229-600x600.jpg"
                    alt="dish"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <span className="text-md text-neutral-700">Hovězí polévka</span>
                <span className="text-xs text-neutral-500">Malý * 150g</span>
                <div className="mt-2 flex flex-row items-center gap-2">
                  <span className="text-sm text-neutral-700">99 Kč</span>
                  <button className="flex items-center justify-center rounded-full bg-neutral-100 p-2 text-xs text-neutral-500 hover:bg-neutral-200">
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="text-md text-neutral-700">1</span>
                  <button className="flex items-center justify-center rounded-full bg-neutral-100 p-2 text-xs text-neutral-500 hover:bg-neutral-200">
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-4 border-t border-neutral-200" />
            <div className="flex flex-row items-center justify-between">
              <span className="text-sm text-neutral-400">Celkem</span>
              <span className="text-sm text-neutral-600">99 Kč</span>
            </div>
            <div className="flex flex-row items-center justify-between">
              <span className="text-sm text-neutral-400">Celkem</span>
              <span className="text-sm text-neutral-600">99 Kč</span>
            </div>
            <hr className="my-4 border-t border-neutral-200" />
            <div className="flex flex-row items-center justify-between">
              <span className="text-sm text-neutral-400">Celkem</span>
              <span className="text-sm text-orange-600">99 Kč</span>
            </div>
            <button className="mt-4 w-full rounded-md bg-orange-500 p-2 text-sm font-semibold text-white hover:bg-orange-600">
              Objednat
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

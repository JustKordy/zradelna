import { WeekContextProvider } from "~/lib/providers/weekStoreProvider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <WeekContextProvider>
        <main className="flex min-h-screen flex-col">{children}</main>
      </WeekContextProvider>
    </>
  );
}

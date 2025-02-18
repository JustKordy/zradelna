import { WeekContextProvider } from "~/lib/providers/weekStoreProvider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <WeekContextProvider>
        <main className="min-h-screen">{children}</main>
      </WeekContextProvider>
    </>
  );
}

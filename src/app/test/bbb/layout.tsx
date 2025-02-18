import { WeekContextProvider } from "~/lib/providers/weekStoreProvider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <WeekContextProvider>
        <main>{children}</main>
      </WeekContextProvider>
    </>
  );
}

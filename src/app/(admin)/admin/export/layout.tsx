import { WeekContextProvider } from "~/lib/providers/weekStoreProvider";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <WeekContextProvider>{children}</WeekContextProvider>
    </>
  );
}

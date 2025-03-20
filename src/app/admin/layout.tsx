import { getUser } from "~/server/queries/user";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();
  if (user?.role !== "admin") throw new Error("Unauthorized");

  return <>{children}</>;
}

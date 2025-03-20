import { MenuForm } from "./menu-form";

export default function Page() {
  return (
    <main className="container mx-auto py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">Nové menu</h1>
      <MenuForm />
    </main>
  );
}

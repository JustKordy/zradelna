"use client";

import { lala } from "./actions";

export default function Page() {
  return (
    <main>
      <form>
        <h1>Hello</h1>
        <button formAction={lala}>Click Me</button>
      </form>

      <button className="border p-3">Click Me Too</button>
    </main>
  );
}

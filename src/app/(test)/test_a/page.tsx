"use client";

import { lala } from "./actions";

export default function Page() {
  return (
    <main>
      <form>
        <h1>Hello</h1>
        <button formAction={lala}>Click Me</button>
      </form>
    </main>
  );
}

"use client"
import { useState } from "react";
import { createClient } from "~/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const [expanded, setExpanded] = useState<boolean>(false);
 
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="w-[200px] flex justify-center items-center flex-col">

      </div>
    </div>
  );
}

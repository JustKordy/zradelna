"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getUser } from "~/server/queries/user";
import { useEffect, useState } from "react";

import type { User as SupabaseUser } from "@supabase/auth-js";

interface User extends SupabaseUser {
  user_metadata: SupabaseUser["user_metadata"] & {
    full_name?: string;
  };
}

export default function NotFound() {

  

  const [username, setUsername] = useState<string | undefined>(undefined);
  // Removed unused userName declaration and ensured proper scoping of user variable
  useEffect(() => {
    async function fetchUser() {
      const user: User | null = await getUser();

      // Extract username from user_metadata
      const fetchedUsername = user?.user_metadata.full_name;

      if (fetchedUsername) {
        setUsername(fetchedUsername);
      } else {
        setUsername(" ")
      }
    }

    fetchUser().catch((error) => {
      console.error("Failed to fetch user:", error);
    });
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-orange-100 to-white px-6 py-12">
      {/* Obrovský křížek v pozadí */}
      <motion.div
        initial={{ scale: 0.9, rotate: -15, opacity: 0 }}
        animate={{ scale: 1.2, rotate: 0, opacity: 0.05 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <svg
          className="h-[500px] w-[500px] text-orange-500 blur-sm"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </motion.div>

      {/* Obsah stránky */}
      <div className="relative z-10 max-w-2xl text-center">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="select-none text-[10rem] font-extrabold text-orange-500 drop-shadow-xl"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-2xl font-semibold text-gray-800 md:text-3xl"
        >
          uživatel
          <span className="font-bold text-orange-500 mx-2">
            {username ?? "Načítám uživatele"}
          </span>
          zabloudil
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-4 text-base text-gray-600 md:text-lg"
        >
          Možná jsi zabloudil... ale cesta zpět je jednoduchá.
        </motion.p>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-orange-500 px-8 py-3 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:bg-orange-600"
          >
            Zpět domů
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

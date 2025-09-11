'use client'
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
      <NextTopLoader />{" "}
    </>
  );
}

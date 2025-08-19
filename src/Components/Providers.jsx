"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import NoHeaderFooter from "./NoHeaderFooter";

export default function Providers({ children }) {
  const [client] = useState(new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <NoHeaderFooter>{children}</NoHeaderFooter>
      </QueryClientProvider>
    </SessionProvider>
  );
}

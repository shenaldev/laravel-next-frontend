"use client";

import { Toaster } from "sonner";
import AuthProvider from "./auth-provider";
import ReactQueryProvider from "./query-client-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactQueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryProvider>
      <Toaster richColors position="bottom-right" />
    </>
  );
}

export default Providers;

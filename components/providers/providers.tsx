"use client";

import AuthProvider from "./auth-provider";
import ReactQueryProvider from "./query-client-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  );
}

export default Providers;

import ReactQueryProvider from "./query-client-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}

export default Providers;

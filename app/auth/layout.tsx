export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="min-h-[calc(100dvh-4.1rem)]">{children}</main>;
}

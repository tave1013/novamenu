import { RootShell, rootMetadata } from "@/views/RootShell";

export { viewport } from "@/views/RootShell";

export const metadata = rootMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}

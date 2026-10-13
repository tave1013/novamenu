import { RootShell, rootMetadata } from "@/views/RootShell";

export { viewport } from "@/views/RootShell";

export const metadata = rootMetadata("it");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="it">{children}</RootShell>;
}

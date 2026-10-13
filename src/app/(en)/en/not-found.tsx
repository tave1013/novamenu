import { setLocale } from "@/i18n";
import NotFound from "@/views/NotFound";

export default function Page() {
  setLocale("en");
  return <NotFound />;
}

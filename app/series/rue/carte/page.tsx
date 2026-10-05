import { redirect } from "next/navigation";

export default function LegacyRueMapPage() {
  redirect("/ou-je-suis?series=rue");
}

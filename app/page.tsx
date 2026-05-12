import { Metadata } from "next";
import HomeClient from "./page-client";

export const metadata: Metadata = {
  // Inherit title / description / openGraph / twitter from app/layout.tsx —
  // the root defaults are already correct for the home page.
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}

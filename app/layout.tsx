import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/constants";
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}｜${SITE.tagline}`, template: `%s｜${SITE.name}` },
  description: SITE.description,
  openGraph: { title: `${SITE.name}｜${SITE.tagline}`, description: SITE.description, type:"website", siteName: SITE.name },
};
export default function RootLayout({ children }:{ children:React.ReactNode }) {
  return <html lang="ja"><body className="font-sans antialiased">{children}</body></html>;
}

import type { Metadata } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import { BottomNav, TopBar } from "@/components/Nav";
import { SessionProvider } from "@/components/Session";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "XyApps — XyStudio",
    template: "%s · XyApps",
  },
  description:
    "Toko resmi XyStudio. Source gratis boleh dipakai, dilarang dijual. Install lewat gerbang, bukan tautan GitHub mentah.",
  metadataBase: new URL("https://xyapps.my.id"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${outfit.variable} ${geistMono.variable}`}>
      <body>
        <SessionProvider>
          <TopBar />
          <div className="page-pad">{children}</div>
          <BottomNav />
        </SessionProvider>
      </body>
    </html>
  );
}

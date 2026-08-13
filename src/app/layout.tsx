import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BottomNav, Nav } from "@/components/Nav";
import { SessionProvider } from "@/components/Session";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SessionProvider>
          <Nav />
          <div className="page-pad">{children}</div>
          <BottomNav />
        </SessionProvider>
      </body>
    </html>
  );
}

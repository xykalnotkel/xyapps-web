import type { Metadata } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import { BottomNav, TopBar } from "@/components/Nav";
import { AppBanner } from "@/components/AppBanner";
import { SessionProvider } from "@/components/Session";
import { ThemeProvider } from "@/components/Theme";
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
    default: "XyApps — XySpace",
    template: "%s · XyApps",
  },
  description:
    "Toko aplikasi resmi XySpace. Unduh dengan aman lewat gerbang resmi, temukan aplikasi dan game pilihan.",
  metadataBase: new URL("https://xyapps.xystudio.my.id"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${outfit.variable} ${geistMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('xyapps.theme')||'system';var d=t==='system'?(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;document.documentElement.setAttribute('data-theme',d);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();",
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SessionProvider>
            <TopBar />
            <AppBanner />
            <div className="page-pad">{children}</div>
            <BottomNav />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

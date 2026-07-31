import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import CholoAssistant from "./cholo-assistant";
import Navbar from "./navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "CHOLO",
  description: "Choose - Hold - Learn - Own",
  verification: {
    google: "efwLDMalycYsQB8q4jG1Uv-GwA7U0I_ayRbpnwmZqXI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} font-sans antialiased`}
        style={{ backgroundColor: "var(--background)" }}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9FLRBQ4PX9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9FLRBQ4PX9');
          `}
        </Script>
        <Navbar />
        <CholoAssistant />
        {children}
      </body>
    </html>
  );
}

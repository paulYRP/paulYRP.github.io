import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import Navbar from "./navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "CHOLO",
  description: "Choose - Hold - Learn - Own",
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
        <Navbar />
        <div>{children}</div> {/* <---- CHANGE: removed padding */}
      </body>
    </html>
  );
}

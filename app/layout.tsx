import type { Metadata } from "next";
import { Lobster, Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/global";

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: ["400"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Timoh Wilson",
  description: "Hi, I'm Timoh Wilson an Engineer based in Yaounde, Cameroon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${lobster.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}

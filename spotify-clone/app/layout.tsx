import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify clone",
  description: "Listen to music!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <Sidebar>
          {children}
        </Sidebar>
      </body>
    </html >
  );
}

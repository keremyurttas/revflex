import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNavbar from "./components/SideNavbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="lg:flex gap-48 bg-[#0d0d0d]">
        <SideNavbar />
        {children}
      </body>
    </html>
  );
}

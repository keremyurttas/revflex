import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import ClientProvider from "./providers/ClientProvider";
import RootContent from "./layouts/RootContent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata: Metadata = {
  title: "Revflix",
  description: "A movie rating app",
  icons:{
    icon:"/favicon.ico"
  }
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--poppins",

});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
       <link rel="icon" href="/favicon.ico" />
      <body className={`lg:flex bg-[#0d0d0d] ${poppins.variable}`}>
        <ClientProvider>
          <RootContent>{children}</RootContent>
        </ClientProvider>
      </body>
    </html>
  );
}

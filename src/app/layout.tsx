import type { Metadata } from "next";
import type { ReactNode } from "react";

import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

import Background from "@/components/background";

import "@/styles/globals.css";

// eslint-disable-next-line
const ibmPlex = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const chicagoKare = localFont({
  src: [
    {
      path: "../fonts/ChicagoKare-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../fonts/ChicagoKare-Regular.woff",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-chicago-kare",
});

export const metadata: Metadata = {
  description: "Gabriel's corner of the web",
  title: "Gabriel Pereira - Software Engineer",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html
    className={`h-full antialiased ${ibmPlex.variable} ${chicagoKare.variable}`}
    lang="en"
  >
    <body className="h-full overflow-hidden flex flex-col">
      <main className="relative flex flex-col min-h-[130vh] md:min-h-full bg-background">
        <Background />
        {children}
      </main>
    </body>
  </html>
);

export default RootLayout;

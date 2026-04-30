import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  DotGothic16 as dotGothic16,
  IBM_Plex_Mono as ibmPlexMono,
} from "next/font/google";
import localFont from "next/font/local";

import Background from "@/components/effects/background";

import "@/styles/globals.css";

const chicagoKare = localFont({
  src: [
    {
      path: "../fonts/ChicagoKare-Regular.woff2",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-chicago-kare",
});

const dotGothic = dotGothic16({
  variable: "--font-dot-gothic-16",
  weight: ["400"],
});

const ibmPlex = ibmPlexMono({
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  weight: ["400", "500"],
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
    className={`h-full antialiased ${ibmPlex.variable} ${chicagoKare.variable} ${dotGothic.variable}`}
    lang="en"
  >
    <body className="h-full overflow-hidden flex flex-col">
      <main className="relative md:min-h-full bg-background text-white">
        <Background />
        {children}
      </main>
    </body>
  </html>
);

export default RootLayout;

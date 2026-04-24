import Image from "next/image";
import Link from "next/link";

import { Button, ButtonWrapper } from "@/components/primitives/button";
import WindowsProvider from "@/components/windows/context/windows-provider";
import {
  TitleBarLines,
  Window,
  WindowContent,
  WindowFooter,
  WindowHeader,
} from "@/components/windows/window";

import Pool from "@/../public/pool.gif";

import StaggeredOpener from "./not-found-opener";

const FILLER_COUNT = 50;
const FILLER_SLUGS = Array.from(
  { length: FILLER_COUNT },
  (_, i) => `filler-${i}`,
);

const NotFound = () => {
  return (
    <WindowsProvider initialOpen={["not-found"]}>
      <StaggeredOpener slugs={FILLER_SLUGS} topSlug="not-found" />

      <Window slug="not-found">
        <div className="flex items-center p-2 border-b border-white select-none inset-shadow-header bg-primary/15 touch-none">
          <TitleBarLines />

          <p className="text-base font-dot-gothic-16 leading-0 px-2">悲しい</p>

          <TitleBarLines />
        </div>

        <WindowContent>
          <div className="relative">
            <Image alt="Not Found" src={Pool} />

            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <p className="text-base md:text-lg leading-tight max-w-60 [text-shadow:1px_1px_0_rgb(0_0_0_/55%)] font-chicago-kare">
                You found yourself too far away from home. Do you wish to go
                back to a familiar place?
              </p>

              <div className="self-end">
                <ButtonWrapper>
                  <Button
                    className="font-chicago-kare text-md md:text-lg"
                    nativeButton={false}
                    render={<Link href="/" />}
                  >
                    Continue
                  </Button>
                </ButtonWrapper>
              </div>
            </div>
          </div>
        </WindowContent>

        <WindowFooter />
      </Window>

      {FILLER_SLUGS.map((slug) => (
        <Window className="w-75" key={slug} slug={slug}>
          <WindowHeader />

          <WindowContent className="p-4 text-sm space-y-2 font-semibold">
            <p>Sorry, a system error occurred.</p>
            <p>The page you requested was not found. Please try again later.</p>
          </WindowContent>

          <WindowFooter />
        </Window>
      ))}
    </WindowsProvider>
  );
};

export default NotFound;

import WindowsProvider from "@/components/windows/context/windows-provider";
import {
  Window,
  WindowContent,
  WindowFooter,
  WindowHeader,
} from "@/components/windows/window";
import Image from "next/image";

import Pool from "@/../public/pool.gif";

const NotFound = () => {
  return (
    <WindowsProvider initialOpen={["not-found"]}>
      <Window slug="not-found">
        <WindowHeader title="404" />
        <WindowContent>
          <Image alt="Not Found" src={Pool} />
        </WindowContent>
        <WindowFooter />
      </Window>
    </WindowsProvider>
  );
};

export default NotFound;

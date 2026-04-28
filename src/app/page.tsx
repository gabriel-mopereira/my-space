import { InformationSource, SpeechBaloon } from "@/components/icons";
import {
  Window,
  WindowContent,
  WindowFooter,
  WindowHeader,
} from "@/components/windows/window";
import Header from "@/components/navigation/header";
import AboutContent from "@/components/windows/about-content";
import ContactContent from "@/components/windows/contact-content";
import Footer from "@/components/navigation/footer";
import WindowAnimationOverlay from "@/components/windows/window-animation-overlay";
import WindowsProvider from "@/components/windows/context/windows-provider";
import WindowsUrlSync from "@/components/windows/windows-url-sync";
import { NAV_OPTIONS } from "@/components/navigation/options";

const getInitialOpen = (params: SearchParams): Array<string> => {
  const paramKeys = Object.keys(params);

  if (paramKeys.length === 0) {
    return ["about"];
  }

  return paramKeys.filter((key) =>
    NAV_OPTIONS.some((opt) => opt.slug === key && !opt.disabled),
  );
};

type SearchParams = Record<string, string | undefined>;

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;

  const initialOpen = getInitialOpen(params);

  return (
    <WindowsProvider initialOpen={initialOpen}>
      <WindowAnimationOverlay />

      <WindowsUrlSync />

      <div className="relative text-white font-ibm-plex">
        <Header className="w-full hidden md:flex flex-row border-b border-white bg-primary/15 backdrop-blur-sm" />

        <Footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden" />

        <div className="relative flex-1">
          <Window className="max-w-94 md:max-w-2xl" slug="about">
            <WindowHeader
              icon={<InformationSource size={16} strokeWidth={0.3} />}
              title="About me"
            />

            <WindowContent>
              <AboutContent />
            </WindowContent>

            <WindowFooter />
          </Window>

          <Window className="max-w-85 md:max-w-md" slug="contact">
            <WindowHeader
              icon={<SpeechBaloon size={16} strokeWidth={0.3} />}
              title="Contact"
            />

            <WindowContent>
              <ContactContent />
            </WindowContent>

            <WindowFooter />
          </Window>
        </div>
      </div>
    </WindowsProvider>
  );
};

export default Page;

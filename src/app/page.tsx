import { InformationSource, SpeechBaloon } from "@/components/icons";
import Background from "@/components/background";
import Window from "@/components/windows/window";
import Header from "@/components/navigation/header";
import AboutContent from "@/components/windows/about/about-content";
import ContactContent from "@/components/windows/contact/contact-content";
import Footer from "@/components/navigation/footer";
import WindowsProvider from "@/components/windows/context/windows-provider";
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
      <main className="relative flex flex-col min-h-[130vh] md:min-h-auto flex-1 items-center justify-center text-white font-ibm-plex bg-background">
        <Background />

        <Header className="w-full hidden md:flex flex-row border-b border-white bg-primary/15 backdrop-blur-sm" />

        <Footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden" />

        <div className="relative flex-1">
          <Window
            className="max-w-94 md:max-w-2xl"
            icon={<InformationSource size={16} strokeWidth={0.3} />}
            slug="about"
            title="About me"
          >
            <AboutContent />
          </Window>

          <Window
            className="max-w-85 md:max-w-md"
            icon={<SpeechBaloon size={16} strokeWidth={0.3} />}
            slug="contact"
            title="Contact"
          >
            <ContactContent />
          </Window>
        </div>
      </main>
    </WindowsProvider>
  );
};

export default Page;

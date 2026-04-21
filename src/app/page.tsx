import { InformationSource, SpeechBaloon } from "@/components/icons";
import Background from "@/components/Background";
import Window from "@/components/windows/Window";
import Header from "@/components/navigation/Header";
import AboutContent from "@/components/windows/about/AboutContent";
import ContactContent from "@/components/windows/contact/ContactContent";
import Footer from "@/components/navigation/Footer";
import { WindowsProvider } from "@/components/windows/WindowsContext";
import { NAV_OPTIONS } from "@/components/navigation/options";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}) => {
  const params = await searchParams;

  const paramKeys = Object.keys(params);

  const initialOpen =
    paramKeys.length > 0
      ? paramKeys.filter((key) =>
          NAV_OPTIONS.some((opt) => opt.slug === key && !opt.disabled),
        )
      : ["about"];

  return (
    <WindowsProvider initialOpen={initialOpen}>
      <main className="relative flex flex-col min-h-[120vh] md:min-h-auto flex-1 items-center justify-center text-white font-ibm-plex bg-background -translate-y-[10vh] md:translate-y-0">
        <Background />

        <Header className="w-full hidden md:flex flex-row border-b border-white bg-primary/15 backdrop-blur-sm" />

        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
          <Footer />
        </div>

        <div className="relative flex-1">
          <Window
            title="About me"
            slug="about"
            className="max-w-94 md:max-w-2xl"
            icon={<InformationSource size={16} strokeWidth={0.3} />}
          >
            <AboutContent />
          </Window>

          <Window
            title="Contact"
            slug="contact"
            className="max-w-85 md:max-w-md"
            icon={<SpeechBaloon size={16} strokeWidth={0.3} />}
          >
            <ContactContent />
          </Window>
        </div>
      </main>
    </WindowsProvider>
  );
};

export default Page;

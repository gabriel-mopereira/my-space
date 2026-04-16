import { InformationSource, SpeechBaloon } from "@/components/icons";
import Background from "@/components/Background";
import Window from "@/components/windows/Window";
import Header from "@/components/navigation/Header";
import AboutContent from "@/components/windows/about/AboutContent";
import ContactContent from "@/components/windows/contact/ContactContent";
import Footer from "@/components/navigation/Footer";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}) => {
  const params = await searchParams;

  return (
    <main className="relative flex flex-col flex-1 items-center justify-center text-white font-ibm-plex bg-black">
      <Background />

      <Header searchParams={params} className="w-full hidden md:flex flex-row border-b border-white bg-primary/15 backdrop-blur-sm" />

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <Footer searchParams={params} />
      </div>

      <div className="relative flex-1">
        {params.about !== undefined ? (
          <Window
            title="About me"
            slug="about"
            searchParams={params}
            className="max-w-94 md:max-w-2xl"
            icon={<InformationSource size={16} strokeWidth={0.3} />}
          >
            <AboutContent />
          </Window>
        ) : null}

        {params.contact !== undefined ? (
          <Window
            title="Contact"
            slug="contact"
            searchParams={params}
            className="max-w-85 md:max-w-md"
            icon={<SpeechBaloon size={16} strokeWidth={0.3} />}
          >
            <ContactContent />
          </Window>
        ) : null}
      </div>
    </main>
  );
};

export default Page;

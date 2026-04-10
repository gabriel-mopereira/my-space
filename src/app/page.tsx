import { InformationSource, SpeechBaloon } from "@/components/icons";
import Background from "@/components/Background";
import Window from "@/components/windows/Window";
import Header from "@/components/Header";
import AboutContent from "@/components/windows/about/AboutContent";
import ContactContent from "@/components/windows/contact/ContactContent";

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

      <Header className="w-full flex flex-row border-b border-white bg-indigo-400/20 backdrop-blur-sm" />

      <div className="relative flex-1">
        {params.about !== undefined ? (
          <Window
            title="About me"
            slug="about"
            className="max-w-2xl"
            icon={<InformationSource size={16} strokeWidth={0.3} />}
          >
            <AboutContent />
          </Window>
        ) : null}

        {params.contact !== undefined ? (
          <Window
            title="Contact"
            slug="contact"
            className="min-w-md"
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

import {
  HappyPersonRaisingOneHand,
  InformationSource,
} from "@/components/icons";
import Background from "@/components/Background";
import Me from "../../public/me.jpeg";
import Image from "next/image";
import Window from "@/components/Window";
import Header from "@/components/Header";

const Home = () => {
  return (
    <main className="relative flex flex-col flex-1 items-center justify-center text-white font-ibm-plex bg-black">
      <Background />

      <Header className="w-full flex flex-row border-b border-white bg-indigo-400/20 backdrop-blur-sm" />

      <div className="flex-1 flex items-center justify-center">
        <Window
          title="About me"
          className="max-w-2xl"
          icon={<InformationSource size={16} strokeWidth={0.3} />}
        >
          <div className="flex gap-4 p-2">
            <div className="aspect-square h-60 border-white border">
              <Image
                src={Me}
                alt="That's me :ˆ)"
                width={240}
                height={240}
                className="object-cover object-top"
              />
            </div>

            <div className="space-y-4">
              <div className="text-5xl">
                <p>Hello,</p>
                <span className="flex items-center">
                  <p className="inline">
                    I&apos;m <span>Gabriel!</span>
                  </p>
                  <HappyPersonRaisingOneHand
                    size={42}
                    strokeWidth={0}
                    className="shrink-0"
                  />
                </span>
              </div>

              <p className="font-medium text-pretty">
                Full-stack developer working with TypeScript, React, and
                Next.js. I enjoy building performant web applications and
                writing code that&apos;s clean and maintainable.
              </p>
            </div>
          </div>
        </Window>
      </div>
    </main>
  );
};

export default Home;

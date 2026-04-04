import { FolderCode, Globe, Mail, UserRound } from "lucide-react";
import Me from "../../public/me.jpeg";
import Image from "next/image";

const HEADER_OPTIONS = [
  {
    label: "Home",
    href: "#home",
    icon: Globe,
  },
  {
    label: "About",
    href: "#about",
    icon: UserRound,
  },
  {
    label: "Projects",
    href: "#projects",
    icon: FolderCode,
  },
  {
    label: "Contact",
    href: "#contact",
    icon: Mail,
  },
];

const GRADIENTS = [
  "linear-gradient(135deg, #6b7ec2 0%, #8b7bb8 25%, #c4a0c4 45%, #a98bb8 60%, #7a82c4 80%, #6a8dca 100%)", // 0. Lavender Haze
  "linear-gradient(135deg, #4a1a6b 0%, #6b2fa0 25%, #8e44ad 45%, #7b3f9e 60%, #5b2d8e 80%, #3d1560 100%)", // 1. Deep Purple
  "linear-gradient(135deg, #1a4a3a 0%, #2d6b4f 25%, #3a8f6a 45%, #2e7d5e 60%, #1f5c44 80%, #164030 100%)", // 2. Forest Emerald
  "linear-gradient(135deg, #c96b8a 0%, #d48a7e 25%, #e8a87c 45%, #d4956e 60%, #c07a8a 80%, #a8607a 100%)", // 3. Sunset Blush
  "linear-gradient(135deg, #1a2a4a 0%, #2a3d6b 25%, #3a5a8e 45%, #2e4d7d 60%, #1f3a5c 80%, #162840 100%)", // 4. Midnight Ocean
  "linear-gradient(135deg, #8e6b7a 0%, #b08898 25%, #cca0aa 45%, #b894a0 60%, #9a7e8e 80%, #7a6070 100%)", // 5. Dusty Rose
  "linear-gradient(135deg, #8a6520 0%, #b0843a 25%, #cca050 45%, #b89040 60%, #9a7830 80%, #7a5e18 100%)", // 6. Warm Amber
  "linear-gradient(135deg, #3a6a6e 0%, #5a8e90 25%, #7ab0aa 45%, #68a09a 60%, #4e8a88 80%, #3a7070 100%)", // 7. Arctic Teal
  "linear-gradient(135deg, #3a3a4a 0%, #4e4e60 25%, #6a6a7e 45%, #5c5c70 60%, #484860 80%, #343448 100%)", // 8. Charcoal Slate
  "linear-gradient(135deg, #c4725a 0%, #d89878 25%, #eab89a 45%, #d8a888 60%, #c48a70 80%, #a86a52 100%)", // 9. Peach Coral
  "linear-gradient(135deg, #e8a0bf 0%, #c8a0e8 18%, #a8b8f0 35%, #b0d8e8 50%, #e0b0d0 65%, #f0c0a8 80%, #d8a0e0 100%)", // 10. Vaporwave Pastel
  "linear-gradient(135deg, #f0b8d0 0%, #f0d0a8 18%, #e8e0b0 35%, #b8e0c8 50%, #a8d0e8 65%, #c8b8f0 80%, #e8b0c8 100%)", // 11. Sorbet Dream
  "linear-gradient(135deg, #b0a0e8 0%, #e0a8c8 18%, #f0c8b0 35%, #f0e0a0 50%, #b8e8c0 65%, #a0c8e8 80%, #c0a8e8 100%)", // 12. Cotton Candy Sunset
  "linear-gradient(135deg, #a8c8f0 0%, #c0a8e8 18%, #e8a8c0 35%, #f0b8a8 50%, #f0d0b8 65%, #e0e8b0 80%, #b0e0d0 100%)", // 13. Pastel Horizon
  "linear-gradient(135deg, #d0a8e8 0%, #a8b0f0 18%, #a8d8e8 35%, #b0e8d0 50%, #d0e8a8 65%, #f0d8a8 80%, #f0b0c0 100%)", // 14. Prism Mist
  "linear-gradient(135deg, #f0c0d8 0%, #d8b0f0 18%, #b0b8f0 35%, #a8d8f0 50%, #b0f0e0 65%, #d0f0b8 80%, #f0e0b0 100%)", // 15. Aurora Soft
];

const SELECTED_GRADIENT = 0;

const Home = () => {
  return (
    <main
      className="relative flex flex-col flex-1 items-center justify-center  text-white font-ibm-plex"
      style={{ background: GRADIENTS[SELECTED_GRADIENT] }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-70 mix-blend-overlay grain" />
      <div className="relative z-10 w-full flex flex-row border-b-2 border-white backdrop-blur-sm ">
        {HEADER_OPTIONS.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            className="font-chicago-kare flex-1 not-first:border-l-2 border-white flex justify-between items-center px-2 py-0.5 leading-5 text-xl"
          >
            <span>
              <span className="underline">{label[0]}</span>
              {label.slice(1)}
            </span>
            <Icon size={16} strokeWidth={2.5} color="white" />
          </a>
        ))}
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="border-2 border-white backdrop-blur-sm max-w-2xl m-4">
          <div className="flex items-center gap-3 p-2 border-b-2 border-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M20 2H4c-.55 0-1 .45-1 1v18c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1M6 19c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1m13 0h-3v-.5h-4v-1h4V17h3zm0-5H5V4h14z"
              />
            </svg>

            <div className="flex flex-col gap-px flex-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-px bg-white w-full" />
              ))}
            </div>

            <p className="text-2xl leading-4.5 font-chicago-kare">About me</p>
          </div>

          <div className="flex gap-4 p-2">
            <Image
              src={Me}
              alt="That's me :ˆ)"
              width={240}
              height={240}
              className="aspect-square object-cover object-top border-white border-2"
            />

            <div className="space-y-4">
              <div className="text-5xl">
                <p>Hello,</p>
                <p>
                  I&apos;m <span>Gabriel!</span>
                  👋🏻
                </p>
              </div>

              <p className="font-medium text-pretty">
                Full-stack developer working with TypeScript, React, and
                Next.js. I enjoy building performant web applications and
                writing code that&apos;s clean and maintainable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

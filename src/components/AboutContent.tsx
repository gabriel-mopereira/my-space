import { HappyPersonRaisingOneHand } from "@/components/icons";
import Image from "next/image";
import Me from "@/../public/me.jpeg";

const AboutContent = () => (
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
        Full-stack developer working with TypeScript, React, and Next.js. I
        enjoy building performant web applications and writing code that&apos;s
        clean and maintainable.
      </p>
    </div>
  </div>
);

export default AboutContent;

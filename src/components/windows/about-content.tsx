import { ClappingHands } from "@/components/icons";
import Image from "next/image";
import Me from "@/../public/me.jpeg";

const AboutContent = () => (
  <div className="flex flex-col md:flex-row p-2 gap-2 items-center">
    <div className="relative aspect-square size-60 border-white border">
      <Image
        alt="That's me :ˆ)"
        className="object-cover object-top"
        height={240}
        loading="eager"
        sizes="240px"
        src={Me}
        width={240}
      />
    </div>

    <div className="space-y-2 md:space-y-4">
      <span className="inline-flex md:flex-col underline decoration-1 underline-offset-2 text-3xl md:text-5xl">
        <span className="md:block">Hello, </span>
        <span className="inline-flex items-center">
          I&apos;m Gabriel!
          <ClappingHands className="size-6 md:size-8 inline ml-2" />
        </span>
      </span>

      <p className="font-medium text-sm md:text-base">
        Full-stack developer working with TypeScript, React, and Next.js. I
        enjoy building performant web applications and writing code that&apos;s
        clean and maintainable.
      </p>
    </div>
  </div>
);

export default AboutContent;

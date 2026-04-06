import { HTMLAttributes } from "react";
import {
  Code,
  SpeechBaloon,
  InformationSource,
  PageCurl,
} from "@/components/icons";

const HEADER_OPTIONS = [
  {
    label: "About me",
    href: "#about",
    icon: InformationSource,
  },
  {
    label: "Projects",
    href: "#projects",
    icon: Code,
  },
  {
    label: "Contact",
    href: "#contact",
    icon: SpeechBaloon,
  },
  {
    label: "Curriculum Vitae",
    href: "#cv",
    icon: PageCurl,
  },
];

const Header = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      {HEADER_OPTIONS.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          className="font-chicago-kare flex-1 not-first:border-l border-white flex justify-between items-center px-2 py-0.5 leading-5 text-xl inset-shadow-pixelated"
        >
          <span>
            <span className="underline">{label[0]}</span>
            {label.slice(1)}
          </span>

          <Icon size={16} strokeWidth={0.3} />
        </a>
      ))}
    </div>
  );
};

export default Header;

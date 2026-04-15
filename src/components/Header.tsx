import { HTMLAttributes } from "react";
import {
  Code,
  SpeechBaloon,
  InformationSource,
  PageCurl,
} from "@/components/icons";
import HeaderLink from "./HeaderLink";

const HEADER_OPTIONS = [
  {
    label: "About me",
    slug: "about",
    icon: InformationSource,
  },
  {
    label: "Contact",
    slug: "contact",
    icon: SpeechBaloon,
  },
  {
    label: "Projects",
    slug: "projects",
    icon: Code,
    disabled: true,
  },
  {
    label: "Curriculum Vitae",
    slug: "cv",
    icon: PageCurl,
    disabled: true,
  },
];

const Header = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      {HEADER_OPTIONS.map(({ label, slug, icon: Icon }) => (
        <HeaderLink
          key={label}
          paramKey={slug}
          className="font-chicago-kare flex-1 not-first:border-l border-white flex justify-between items-center px-2 py-0.5 leading-5 text-xl inset-shadow-pixelated"
        >
          <span>
            <span className="underline">{label[0]}</span>
            {label.slice(1)}
          </span>

          <Icon size={16} strokeWidth={0.3} />
        </HeaderLink>
      ))}
    </div>
  );
};

export default Header;

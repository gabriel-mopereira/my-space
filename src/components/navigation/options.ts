import {
  Code,
  SpeechBaloon,
  InformationSource,
  PageCurl,
} from "@/components/icons";

export const NAV_OPTIONS = [
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
    label: "Resume",
    slug: "resume",
    icon: PageCurl,
    disabled: true,
  },
];

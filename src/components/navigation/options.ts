import {
  Code,
  SpeechBaloon,
  InformationSource,
  PageCurl,
} from "@/components/icons";

export const NAV_OPTIONS = [
  {
    icon: InformationSource,
    label: "About me",
    slug: "about",
  },
  {
    icon: SpeechBaloon,
    label: "Contact",
    slug: "contact",
  },
  {
    disabled: true,
    icon: Code,
    label: "Projects",
    slug: "projects",
  },
  {
    disabled: true,
    icon: PageCurl,
    label: "Resume",
    slug: "resume",
  },
];

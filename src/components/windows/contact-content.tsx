import { Envelope, GitHub, Phone, Twitter } from "@/components/icons";
import ContactOpenButton from "@/components/windows/contact-open-button";

const CONTACT_OPTIONS = [
  {
    baseUrl: "https://github.com/",
    icon: GitHub,
    label: "GitHub",
    slug: "gitHub",
    username: "gabriel-mopereira",
  },
  {
    baseUrl: "https://x.com/",
    icon: Twitter,
    label: "X",
    slug: "twitter",
    username: "gabriel_mop",
  },
  {
    baseUrl: "mailto:",
    icon: Envelope,
    label: "Email",
    slug: "email",
    username: "gabriel@mopereira.com",
  },
  {
    baseUrl: "tel:",
    icon: Phone,
    label: "Phone",
    slug: "phone",
    username: "+5532991552663",
  },
];

const ContactContent = () => (
  <div className="flex flex-col">
    <div className="grid grid-cols-12 border-b border-border w-full font-chicago-kare md:text-lg select-none">
      <div className="col-span-3 border-r border-border px-2 inset-shadow-header">
        System
      </div>

      <div className="col-span-9 px-2 inset-shadow-header">Username</div>
    </div>

    {CONTACT_OPTIONS.map(({ baseUrl, icon: Icon, label, slug, username }) => (
      <div
        className="grid-cols-12 grid bg-secondary/30 not-first:mb-0.5 items-center"
        key={slug}
      >
        <div className="bg-secondary/50 p-2 col-span-3 md:col-span-3 flex gap-2 items-center text-base md:text-xl font-chicago-kare select-none">
          <Icon className="size-5 md:size-6" />
          <span className="mt-0.5">{label}</span>
        </div>

        <div className="col-span-9 flex items-center justify-between px-1 md:px-2 gap-1 md:gap-4">
          <span className="text-sm md:text-base">{username}</span>

          <ContactOpenButton baseUrl={baseUrl} username={username} />
        </div>
      </div>
    ))}
  </div>
);

export default ContactContent;

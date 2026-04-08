import { Envelope, GitHub, Phone, Twitter } from "@/components/icons";
import ContactOpenButton from "@/components/windows/contact/ContactOpenButton";

const CONTACT_INFO = [
  {
    slug: "gitHub",
    label: "GitHub",
    icon: GitHub,
    baseUrl: "https://github.com/",
    username: "gabriel-mopereira",
  },
  {
    slug: "twitter",
    label: "X",
    icon: Twitter,
    baseUrl: "https://x.com/",
    username: "gabriel_mop",
  },
  {
    slug: "email",
    label: "Email",
    icon: Envelope,
    baseUrl: "mailto:",
    username: "gabriel@mopereira.com",
  },
  {
    slug: "phone",
    label: "Phone",
    icon: Phone,
    baseUrl: "tel:",
    username: "+5532991552663",
  },
];

const ContactContent = () => (
  <div className="flex flex-col">
    <div className="grid grid-cols-10 border-b border-border w-full font-chicago-kare text-lg select-none">
      <div className="col-span-3 border-r border-border px-2 inset-shadow-header">
        System
      </div>

      <div className="col-span-7 px-2 inset-shadow-header">Username</div>
    </div>

    {CONTACT_INFO.map(({ slug, label, icon: Icon, baseUrl, username }) => (
      <div
        key={slug}
        className="grid-cols-10 grid bg-secondary/30 not-first:mb-0.5 items-center"
      >
        <div className="bg-secondary/40 px-2 col-span-3 flex gap-2 items-center text-xl font-chicago-kare py-2 select-none">
          <Icon strokeWidth={0} size={24} className="inline" />
          <span>{label}</span>
        </div>

        <div className="col-span-7 flex items-center justify-between px-2 gap-4">
          <span>{username}</span>

          <ContactOpenButton baseUrl={baseUrl} username={username} />
        </div>
      </div>
    ))}
  </div>
);

export default ContactContent;

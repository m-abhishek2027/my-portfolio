import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/icons";
import contactData from "./contact.json";

type ContactIconKey = "linkedin" | "github" | "mail";

interface ContactSocial {
  platform: string;
  url: string;
  icon: ContactIconKey;
}

interface ContactJson {
  eyebrow: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  formEndpoint: string;
  socials: ContactSocial[];
}

const contact = contactData as ContactJson;

const socialIcons: Record<ContactIconKey, typeof LinkedInIcon> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  mail: MailIcon,
};

// No preview/full variant here (unlike About/Skills/Projects/Experience) —
// contact info is already short, so the Home section and the dedicated
// /contact page show exactly the same thing.
export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-border-subtle px-4 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
          {contact.eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          {contact.title}
        </h2>
        <p className="mt-6 text-muted">{contact.description}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 py-3 text-sm font-semibold text-background shadow-[0_10px_25px_-10px_rgba(212,175,55,0.6)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            <MailIcon className="h-4 w-4" />
            {contact.email}
          </a>
          <a
            href={`tel:${contact.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-gold hover:text-background"
          >
            <PhoneIcon className="h-4 w-4" />
            {contact.phone}
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {contact.socials.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-foreground/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

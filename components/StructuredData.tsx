import aboutData from "@/components/About/about.json";
import { siteConfig, absoluteUrl } from "@/lib/seo";

interface EducationEntry {
  institution: string;
}

interface AboutSeoJson {
  education: EducationEntry[];
}

const about = aboutData as AboutSeoJson;

/**
 * JSON-LD (schema.org) for the whole site — a `Person` entity plus the
 * `WebSite` itself, combined in one `@graph`. This is what lets Google
 * confidently associate this domain with searches for the person's name
 * (and is a prerequisite for things like a knowledge panel) rather than
 * just treating the page as unstructured text. Rendered once in the root
 * layout; every field is pulled from the same JSON the page content uses
 * (see lib/seo.ts) instead of being retyped here.
 *
 * Valid to render inside <body> — Google explicitly supports JSON-LD there,
 * it doesn't have to live in <head>.
 */
export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        url: siteConfig.url,
        image: siteConfig.photo.url,
        jobTitle: siteConfig.jobTitle,
        description: siteConfig.description,
        email: `mailto:${siteConfig.email}`,
        sameAs: siteConfig.socialUrls,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.split(",")[0]?.trim(),
          addressCountry: "IN",
        },
        ...(siteConfig.currentCompany
          ? {
              worksFor: {
                "@type": "Organization",
                name: siteConfig.currentCompany.name,
                url: siteConfig.currentCompany.url,
              },
            }
          : {}),
        ...(about.education.length > 0
          ? {
              alumniOf: about.education.map((edu) => ({
                "@type": "EducationalOrganization",
                name: edu.institution,
              })),
            }
          : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#profile"),
        url: siteConfig.url,
        mainEntity: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

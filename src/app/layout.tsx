import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s | Muhammad Mateen",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  classification: "Software Engineer Portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    siteName: "Muhammad Mateen Portfolio",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Mateen - Full-Stack Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-dark.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icon.png",
    shortcut: "/favicon.png",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: siteConfig.googleVerification,
  },
};

// JSON-LD Structured Data Schema (Person, ProfilePage, WebSite, ItemList)
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: siteConfig.name,
  alternateName: ["Muhammad Mateen", "Mateen", "Mateen.Dev"],
  jobTitle: "Full-Stack Software Engineer",
  description: siteConfig.description,
  url: siteUrl,
  image: `${siteUrl}/profile-picture.png`,
  email: `mailto:${siteConfig.email}`,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    addressCountry: "PK",
    addressLocality: "Bahawalpur",
    addressRegion: "Punjab",
  },
  sameAs: [siteConfig.github, siteConfig.linkedin],
  knowsAbout: [
    "Full-Stack Development",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "SQL",
    "PostgreSQL",
    "Playwright",
    "End-to-End Testing",
    "Automated CI/CD Pipelines",
    "Tailwind CSS",
    "REST APIs",
    "Git",
    "Matter.js Physics Simulation",
    "Web Performance Optimization"
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Full-Stack Software Engineer",
    occupationLocation: {
      "@type": "Country",
      name: "Worldwide (Remote)",
    },
    skills: "Next.js, React, Node.js, Python, SQL, Playwright, CI/CD, TypeScript",
  },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/#webpage`,
  url: siteUrl,
  name: siteConfig.title,
  mainEntity: { "@id": `${siteUrl}/#person` },
  description: siteConfig.description,
  inLanguage: "en-US",
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Muhammad Mateen Developer Portfolio",
  publisher: { "@id": `${siteUrl}/#person` },
  inLanguage: "en-US",
};

const projectListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Featured Software Projects",
  description: "Production web applications, e-commerce stores, and automation platforms built by Muhammad Mateen.",
  numberOfItems: siteConfig.projects.length,
  itemListElement: siteConfig.projects.map((proj, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    item: {
      "@type": "SoftwareApplication",
      name: proj.name,
      description: proj.description,
      url: proj.url,
      applicationCategory: "WebApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-emerald-500/30 selection:text-emerald-300`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

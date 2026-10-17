export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/$/, "");
  }
  if (process.env.URL) {
    return process.env.URL.replace(/\/$/, "");
  }
  return "https://mmateenn.netlify.app";
}

export const siteConfig = {
  name: "Muhammad Mateen",
  title: "Muhammad Mateen | Full-Stack Software Engineer",
  shortTitle: "Mateen.Dev",
  description:
    "Portfolio of Muhammad Mateen — Full-Stack Software Engineer specializing in Next.js, React, Node.js, Python, SQL, and End-to-End Automation. Explore live production webapps, interactive API & SQL sandboxes, and automated CI/CD pipelines.",
  email: "meetmuhammadmateen@gmail.com",
  phone: "+92 325 7312012",
  location: "Pakistan (Open to Worldwide Remote & Relocation)",
  github: "https://github.com/meet-muhammad-mateen",
  linkedin: "https://www.linkedin.com/in/muhammadmateen112/",
  googleVerification: "d4d8b46076cd799c",
  keywords: [
    "Muhammad Mateen",
    "Full-Stack Software Engineer",
    "Full Stack Developer",
    "Frontend Engineer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Python Developer",
    "Automation Engineer",
    "Playwright Testing",
    "TypeScript Developer",
    "SQL Database Engineer",
    "CI/CD Pipelines",
    "Tailwind CSS Specialist",
    "Web Developer Pakistan",
    "Remote Software Engineer",
    "Software Engineer Portfolio",
    "Muhammad Mateen Portfolio",
    "mmateenn.netlify.app",
    "mmateenn.vercel.app"
  ],
  projects: [
    {
      name: "After Concept",
      description: "Digital agency website delivering fintech and product solutions for SMEs with a bold, professional dark-themed interface.",
      url: "https://www.afterconcept.io/",
      code: "https://github.com/meet-muhammad-mateen/after-concept-revisions",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design"]
    },
    {
      name: "BookShelf Online",
      description: "Pakistan's premier online bookstore — fully responsive multi-page e-commerce site with category browsing, new arrivals, and polished reading-first UI.",
      url: "https://bookshelfonline.netlify.app/",
      code: "https://github.com/meet-muhammad-mateen",
      tags: ["HTML", "CSS", "JavaScript", "Tailwind CSS"]
    },
    {
      name: "Lahore Gates Cafe",
      description: "Luxury dining website featuring typography-rich visual layouts, interactive table reservation flow, and refined culinary presentation.",
      url: "https://lahoregatescafe.netlify.app/",
      code: "https://github.com/meet-muhammad-mateen",
      tags: ["HTML", "CSS", "JavaScript", "Animations"]
    },
    {
      name: "SnackSpot",
      description: "Modern fast-casual dining digital storefront with dynamic ordering UI and mobile-first responsive layout.",
      url: "https://snackspot.netlify.app/",
      code: "https://github.com/meet-muhammad-mateen",
      tags: ["Next.js", "React", "Tailwind CSS"]
    },
    {
      name: "Gossip Cafe",
      description: "Artisanal bakery and coffee bar web experience featuring digital menus, location finder, and reservation inquiries.",
      url: "https://gossipcafe.netlify.app/",
      code: "https://github.com/meet-muhammad-mateen",
      tags: ["React", "Tailwind CSS", "Motion UI"]
    },
    {
      name: "Land Design Intelligence",
      description: "Enterprise GIS and spatial intelligence platform deployed on cloud infrastructure for civil planning and land development.",
      url: "https://landdesignintelligence.com/",
      code: "https://github.com/meet-muhammad-mateen",
      tags: ["Next.js", "Cloud Deployment", "Spatial Analysis"]
    }
  ]
};

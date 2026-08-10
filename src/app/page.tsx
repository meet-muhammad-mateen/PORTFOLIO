"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : prefersDark ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("main section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <nav className="navbar">
          <a className="brand" href="#home">
            <span className="brand-mark">MM</span>
            <span className="brand-text">Muhammad Mateen</span>
          </a>

          <button
            className={`menu-toggle ${isMenuOpen ? "is-open" : ""}`}
            type="button"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-panel ${isMenuOpen ? "is-open" : ""}`} id="nav-links">
            <ul className="nav-links">
              <li>
                <a href="#home" className={activeSection === "home" ? "is-active" : ""} onClick={() => setIsMenuOpen(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className={activeSection === "about" ? "is-active" : ""} onClick={() => setIsMenuOpen(false)}>
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className={activeSection === "experience" ? "is-active" : ""} onClick={() => setIsMenuOpen(false)}>
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className={activeSection === "projects" ? "is-active" : ""} onClick={() => setIsMenuOpen(false)}>
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className={activeSection === "skills" ? "is-active" : ""} onClick={() => setIsMenuOpen(false)}>
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className={activeSection === "contact" ? "is-active" : ""} onClick={() => setIsMenuOpen(false)}>
                  Contact
                </a>
              </li>
            </ul>

            <div className="nav-actions">
              <button className="theme-toggle" type="button" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} onClick={toggleTheme}>
                <i className={`ri-sun-line theme-icon theme-icon-light`} aria-hidden="true"></i>
                <i className={`ri-moon-line theme-icon theme-icon-dark`} aria-hidden="true"></i>
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
              <a className="button button-primary button-small" href="/resume">
                Resume
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-shell">
            <div className="hero-copy">
              <p className="eyebrow">Front-End Developer based in Pakistan</p>
              <h1>Building real websites for real businesses — polished, responsive, and ready to launch.</h1>
              <p className="hero-text">
                I build professional websites for agencies, cafes, restaurants, and e-commerce brands using HTML, CSS, JavaScript, Tailwind CSS, and Bootstrap. From company redesigns to client-facing storefronts — I turn ideas into live products.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Let's Work Together
                </a>
                <a className="button button-secondary" href="/resume">
                  View Resume
                </a>
              </div>

              <div className="hero-socials">
                <a href="https://github.com/meet-muhammad-mateen" target="_blank" rel="noopener noreferrer">
                  <i className="ri-github-line" aria-hidden="true"></i>
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/muhammadmateen112/" target="_blank" rel="noopener noreferrer">
                  <i className="ri-linkedin-box-line" aria-hidden="true"></i>
                  <span>LinkedIn</span>
                </a>
                <a href="mailto:meetmuhammadmateen@gmail.com">
                  <i className="ri-mail-line" aria-hidden="true"></i>
                  <span>Email</span>
                </a>
              </div>
            </div>

            <aside className="hero-card">
              <div className="status-pill">
                <span className="status-dot"></span>
                Available for internships and freelance work
              </div>

              <div className="hero-portrait">
                <img src="/profile-picture-optimized.jpg" alt="Professional portrait of Muhammad Mateen" width="820" height="903" decoding="async" />
              </div>

              <div className="hero-card-main">
                <p className="card-label">Professional Snapshot</p>
                <h2>Muhammad Mateen</h2>
                <p>
                  I build websites for real businesses — agency platforms, restaurant brands, online stores,
                  and hospitality sites — with a strong focus on responsive layout and visual quality.
                </p>
              </div>

              <div className="hero-stats">
                <article>
                  <strong>8+</strong>
                  <span>Projects delivered</span>
                </article>
                <article>
                  <strong>5+</strong>
                  <span>Core technologies used</span>
                </article>
                <article>
                  <strong>100%</strong>
                  <span>Responsive-first mindset</span>
                </article>
              </div>

              <div className="hero-highlights">
                <div>
                  <p className="card-label">Specializes In</p>
                  <span>Agency sites, restaurant & cafe brands, and e-commerce storefronts</span>
                </div>
                <div>
                  <p className="card-label">Current Focus</p>
                  <span>Building React/Next.js applications and expanding into UI/UX Design</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="section-heading">
            <p className="eyebrow">About Me</p>
            <h2>Delivering real websites for businesses, agencies, and hospitality brands.</h2>
            <p>
              I am a front-end developer who has built live websites for a digital agency, restaurants, cafes,
              and an e-commerce brand. I care about clean code, strong visual hierarchy, and shipping work that
              real clients can be proud of.
            </p>
          </div>

          <div className="about-grid">
            <article className="info-card">
              <div className="info-icon"><i className="ri-code-s-slash-line" aria-hidden="true"></i></div>
              <h3>Clean Development</h3>
              <p>I write structured HTML and CSS with maintainability in mind, so projects stay easier to improve.</p>
            </article>

            <article className="info-card">
              <div className="info-icon"><i className="ri-layout-4-line" aria-hidden="true"></i></div>
              <h3>Thoughtful UI</h3>
              <p>I focus on clear spacing, readable typography, and layouts that feel trustworthy and modern.</p>
            </article>

            <article className="info-card">
              <div className="info-icon"><i className="ri-rocket-line" aria-hidden="true"></i></div>
              <h3>Fast Delivery</h3>
              <p>I like taking projects from rough idea to usable website quickly without sacrificing polish.</p>
            </article>

            <article className="info-card">
              <div className="info-icon"><i className="ri-team-line" aria-hidden="true"></i></div>
              <h3>Reliable Collaboration</h3>
              <p>I communicate clearly, stay open to feedback, and aim to make the build process smooth.</p>
            </article>
          </div>

          <div className="story-grid">
            <article className="story-card">
              <p className="card-label">What I bring</p>
              <h3>Production-ready websites for real clients and real businesses</h3>
              <p>
                I have built and shipped live websites for an agency, multiple restaurants, a cafe chain, and
                an e-commerce bookstore — each one deployed, functional, and client-approved.
              </p>
            </article>

            <article className="story-card accent-card">
              <p className="card-label">What I am working toward</p>
              <h3>Expanding into dynamic, JavaScript-driven web applications</h3>
              <p>
                I am levelling up from static sites to interactive, component-driven builds using JavaScript
                and React, ready to take on more complex frontend challenges.
              </p>
            </article>
          </div>
        </section>

        <section className="section experience" id="experience">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>My professional journey and internships.</h2>
            <p>A look at my roles and contributions in the industry.</p>
          </div>
          <div className="story-grid" style={{ gridTemplateColumns: "1fr", marginTop: "42px" }}>
            <article className="story-card accent-card">
              <div className="project-topline">
                <p className="card-label">After Concept</p>
                <span>2025 – Present</span>
              </div>
              <h3 style={{ marginTop: "12px" }}>Frontend Developer Intern</h3>
              <ul style={{ marginTop: "16px", color: "var(--muted)", paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "10px", listStyleType: "disc", lineHeight: "1.6" }}>
                <li><strong>Website Redesign & Architecture:</strong> Spearheaded the complete redesign and development of the company's official website, transitioning to a modern, high-performance web architecture.</li>
                <li><strong>UI/UX Design & Engineering:</strong> Designed and engineered responsive, accessible user interfaces utilizing Figma, React, Next.js, TypeScript, and Tailwind CSS, ensuring a pixel-perfect experience across all devices.</li>
                <li><strong>Component Design:</strong> Architected reusable UI components and a structured navigation system, significantly reducing future development time and improving code maintainability.</li>
                <li><strong>Performance Optimization:</strong> Conducted comprehensive performance optimization, improving Core Web Vitals and achieving excellent Lighthouse scores for mobile responsiveness and SEO.</li>
                <li><strong>Deployment & Workflow:</strong> Integrated modern web development workflows, utilizing Git for version control and Netlify for continuous integration and automated deployments.</li>
                <li><strong>Team Collaboration:</strong> Collaborated closely with cross-functional teams to gather requirements, iterate on designs based on feedback, and deliver polished solutions on strict deadlines.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="section-heading">
            <p className="eyebrow">Featured Projects</p>
            <h2>Eight diverse projects — agency redesigns, restaurant brands, web scrapers, and more.</h2>
            <p>A collection of deployed websites, real-world business solutions, and automation tools built with modern web technologies.</p>
          </div>

          <div className="project-filters">
            <button className={`filter-btn ${activeFilter === "all" ? "active" : ""}`} onClick={() => setActiveFilter("all")}>All</button>
            <button className={`filter-btn ${activeFilter === "company" ? "active" : ""}`} onClick={() => setActiveFilter("company")}>Company Projects</button>
            <button className={`filter-btn ${activeFilter === "personal" ? "active" : ""}`} onClick={() => setActiveFilter("personal")}>Personal Projects</button>
          </div>

          <div className="projects-grid">
            <article className={`project-card ${activeFilter !== "all" && activeFilter !== "company" ? "hidden" : ""}`} data-category="company">
              <picture className="project-picture">
                <source srcSet="/afterconcept-preview-480.webp 480w, /afterconcept-preview.webp 900w" sizes="(max-width: 640px) 480px, 900px" type="image/webp" />
                <img className="theme-project-image" src="/afterconcept-preview.jpg" alt="Preview of After Concept agency website" width="900" height="506" loading="lazy" decoding="async" />
              </picture>
              <div className="project-content">
                <div className="project-topline">
                  <p className="card-label">Agency Website</p>
                  <span>Full Redesign</span>
                </div>
                <h3>After Concept</h3>
                <p>
                  A complete redesign of my company's digital agency website — delivering fintech and product solutions for SMEs with a bold, professional dark-themed interface.
                </p>
                <div className="tags">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                  <span>Responsive Design</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/meet-muhammad-mateen/after-concept-revisions" target="_blank" rel="noopener noreferrer">Code</a>
                  <a href="https://www.afterconcept.io/" target="_blank" rel="noopener noreferrer">Live Demo</a>
                </div>
              </div>
            </article>

            <article className={`project-card ${activeFilter !== "all" && activeFilter !== "company" ? "hidden" : ""}`} data-category="company">
              <picture className="project-picture">
                <source srcSet="/bookshelf-preview-480.webp 480w, /bookshelf-preview.webp 900w" sizes="(max-width: 640px) 480px, 900px" type="image/webp" />
                <img className="theme-project-image" src="/bookshelf-preview.jpg" alt="Preview of BookShelf Online website" width="900" height="506" loading="lazy" decoding="async" />
              </picture>
              <div className="project-content">
                <div className="project-topline">
                  <p className="card-label">E-Commerce Website</p>
                  <span>Multi-Page Build</span>
                </div>
                <h3>BookShelf Online</h3>
                <p>
                  Pakistan's premier online bookstore — a fully responsive multi-page site with category browsing, new arrivals, bestsellers, and a polished reading-first experience.
                </p>
                <div className="tags">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                  <span>Tailwind CSS</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/meet-muhammad-mateen" target="_blank" rel="noopener noreferrer">Code</a>
                  <a href="https://bookshelfonline.netlify.app/" target="_blank" rel="noopener noreferrer">Live Demo</a>
                </div>
              </div>
            </article>
            
            <article className={`project-card ${activeFilter !== "all" && activeFilter !== "company" ? "hidden" : ""}`} data-category="company">
              <picture className="project-picture">
                <source srcSet="/lahoregatescafe-preview-480.webp 480w, /lahoregatescafe-preview.webp 900w" sizes="(max-width: 640px) 480px, 900px" type="image/webp" />
                <img className="theme-project-image" src="/lahoregatescafe-preview.jpg" alt="Preview of Lahore Gates Cafe website" width="900" height="506" loading="lazy" decoding="async" />
              </picture>
              <div className="project-content">
                <div className="project-topline">
                  <p className="card-label">Restaurant Website</p>
                  <span>Interactive UI</span>
                </div>
                <h3>Lahore Gates Cafe</h3>
                <p>
                  A luxury dining website for Lahore Gates Cafe featuring elegant typography, immersive full-screen visuals, table reservation flow, and a refined guest experience.
                </p>
                <div className="tags">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                  <span>Bootstrap</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/meet-muhammad-mateen" target="_blank" rel="noopener noreferrer">Code</a>
                  <a href="https://lahoregatescafe.netlify.app/" target="_blank" rel="noopener noreferrer">Live Demo</a>
                </div>
              </div>
            </article>

            <article className={`project-card ${activeFilter !== "all" && activeFilter !== "company" ? "hidden" : ""}`} data-category="company">
              <picture className="project-picture">
                <source srcSet="/snackspot-preview-480.webp 480w, /snackspot-preview.webp 900w" sizes="(max-width: 640px) 480px, 900px" type="image/webp" />
                <img className="theme-project-image" src="/snackspot-preview.jpg" alt="Preview of Snack Spot website" width="900" height="506" loading="lazy" decoding="async" />
              </picture>
              <div className="project-content">
                <div className="project-topline">
                  <p className="card-label">Food & Beverage Website</p>
                  <span>Dark Theme Build</span>
                </div>
                <h3>Snack Spot</h3>
                <p>
                  A vibrant restaurant website for Snacks Bar in Bahawalpur — bold dark design with golden accents, an interactive menu, testimonials section, and table booking feature.
                </p>
                <div className="tags">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                  <span>Tailwind CSS</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/meet-muhammad-mateen" target="_blank" rel="noopener noreferrer">Code</a>
                  <a href="https://snackspot.netlify.app/" target="_blank" rel="noopener noreferrer">Live Demo</a>
                </div>
              </div>
            </article>

            <article className={`project-card ${activeFilter !== "all" && activeFilter !== "company" ? "hidden" : ""}`} data-category="company">
              <picture className="project-picture">
                <source srcSet="/gossipcafe-preview-480.webp 480w, /gossipcafe-preview.webp 900w" sizes="(max-width: 640px) 480px, 900px" type="image/webp" />
                <img className="theme-project-image" src="/gossipcafe-preview.jpg" alt="Preview of Gossip Cafe website" width="900" height="506" loading="lazy" decoding="async" />
              </picture>
              <div className="project-content">
                <div className="project-topline">
                  <p className="card-label">Cafe Website</p>
                  <span>Immersive Design</span>
                </div>
                <h3>Gossip Cafe</h3>
                <p>
                  A warm, atmospheric cafe website for Bahawalpur's Gossip Cafe — featuring a rich dark theme, gallery section, menu display, guest reviews, and smooth table reservation flow.
                </p>
                <div className="tags">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                  <span>Bootstrap</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/meet-muhammad-mateen" target="_blank" rel="noopener noreferrer">Code</a>
                  <a href="https://gossipcafe.netlify.app/" target="_blank" rel="noopener noreferrer">Live Demo</a>
                </div>
              </div>
            </article>

            <article className={`project-card ${activeFilter !== "all" && activeFilter !== "personal" ? "hidden" : ""}`} data-category="personal">
              <img className="theme-project-image" src="/currency-converter-new.jpg" alt="Preview of the currency converter project" width="900" height="506" loading="lazy" decoding="async" />
              <div className="project-content">
                <div className="project-topline">
                  <p className="card-label">Utility App</p>
                  <span>Practical Interface</span>
                </div>
                <h3>Currency Converter</h3>
                <p>
                  A clean conversion interface built to make everyday tasks easier, with a layout centered on usability, clarity, and quick interaction.
                </p>
                <div className="tags">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                  <span>API Integration</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/meet-muhammad-mateen/Currency-Converter" target="_blank" rel="noopener noreferrer">Code</a>
                  <a href="https://currencyflipz.netlify.app/" target="_blank" rel="noopener noreferrer">Live Demo</a>
                </div>
              </div>
            </article>

            <article className={`project-card ${activeFilter !== "all" && activeFilter !== "personal" ? "hidden" : ""}`} data-category="personal">
              <picture className="project-picture">
                <img className="theme-project-image" src="/scraper_furniture.jpg" alt="Preview of 1stop furniture scraper dashboard" width="900" height="506" loading="lazy" decoding="async" />
              </picture>
              <div className="project-content">
                <div className="project-topline">
                  <p className="card-label">Data Extraction</p>
                  <span>Web Scraper</span>
                </div>
                <h3>1stop Furniture Scraper</h3>
                <p>
                  Developed a custom web scraper for 1stop furniture to automate product data extraction, efficiently parsing catalogs and compiling structured data.
                </p>
                <div className="tags">
                  <span>Web Scraping</span>
                  <span>Data Parsing</span>
                  <span>Automation</span>
                </div>
              </div>
            </article>

            <article className={`project-card ${activeFilter !== "all" && activeFilter !== "personal" ? "hidden" : ""}`} data-category="personal">
              <picture className="project-picture" style={{ backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img className="theme-project-image" src="/ldi-logo-green.png" alt="Land Design Intelligence Logo" width="900" height="506" loading="lazy" decoding="async" style={{ objectFit: "contain", padding: "3rem" }} />
              </picture>
              <div className="project-content">
                <div className="project-topline">
                  <p className="card-label">Full-Stack Scraper</p>
                  <span>Deployed</span>
                </div>
                <h3>Land Design Intelligence</h3>
                <p>
                  A production-ready data pipeline and Django web app built to aggregate county-level zoning and site plan data using Playwright for automated headless scraping.
                </p>
                <div className="tags">
                  <span>Python / Django</span>
                  <span>Playwright</span>
                  <span>Data Processing</span>
                  <span>AWS Deployment</span>
                </div>
                <div className="project-links">
                  <a href="http://13.51.121.114:8001/" target="_blank" rel="noopener noreferrer">Live WebApp</a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section skills" id="skills">
          <div className="section-heading">
            <p className="eyebrow">Technical Expertise</p>
            <h2>A frontend toolkit proven across agency, hospitality, and e-commerce projects.</h2>
            <p>I have used these technologies to build and ship live websites for real clients.</p>
          </div>

          <div className="skill-columns">
            <article className="skill-card">
              <h3>Core Front-End</h3>
              <ul>
                <li>React, Next.js & TypeScript</li>
                <li>JavaScript (ES6+)</li>
                <li>HTML5 & Semantic Markup</li>
                <li>CSS3 & Custom Properties</li>
                <li>Mobile-first responsive design</li>
              </ul>
            </article>

            <article className="skill-card">
              <h3>Frameworks & Styling</h3>
              <ul>
                <li>Tailwind CSS</li>
                <li>Bootstrap</li>
                <li>Multi-page layout architecture</li>
                <li>Restaurant, cafe & e-commerce UI patterns</li>
                <li>Immersive UI & Dark Themes</li>
              </ul>
            </article>

            <article className="skill-card">
              <h3>Tools & Workflow</h3>
              <ul>
                <li>UI/UX Design (Figma)</li>
                <li>GitHub & version control</li>
                <li>Netlify / Vercel deployment</li>
                <li>API integration</li>
                <li>Client-ready live website delivery</li>
              </ul>
            </article>

            <article className="skill-card">
              <h3>Backend & Automation</h3>
              <ul>
                <li>Python & Django</li>
                <li>Playwright (Headless Web Scraping)</li>
                <li>Data pipelines & processing</li>
                <li>AWS EC2 Linux Deployments</li>
                <li>Database Management</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-panel">
            <div className="contact-copy">
              <p className="eyebrow">Get In Touch</p>
              <h2>Need a website for your business? Let's build something great together.</h2>
              <p>
                I have delivered live websites for agencies, restaurants, cafes, and e-commerce brands. I am
                open to freelance work, internships, and new client projects — reach out and let's talk.
              </p>
              <div className="contact-actions">
                <a className="button button-primary" href="mailto:meetmuhammadmateen@gmail.com">Send an Email</a>
                <a className="button button-secondary" href="/resume">Open Resume</a>
              </div>
            </div>

            <div className="contact-cards">
              <article className="contact-card">
                <i className="ri-mail-line" aria-hidden="true"></i>
                <div>
                  <h3>Email</h3>
                  <a href="mailto:meetmuhammadmateen@gmail.com">meetmuhammadmateen@gmail.com</a>
                </div>
              </article>

              <article className="contact-card">
                <i className="ri-linkedin-line" aria-hidden="true"></i>
                <div>
                  <h3>LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/muhammadmateen112/" target="_blank" rel="noopener noreferrer">linkedin.com/in/muhammadmateen112</a>
                </div>
              </article>

              <article className="contact-card">
                <i className="ri-github-line" aria-hidden="true"></i>
                <div>
                  <h3>GitHub</h3>
                  <a href="https://github.com/meet-muhammad-mateen" target="_blank" rel="noopener noreferrer">github.com/meet-muhammad-mateen</a>
                </div>
              </article>

              <article className="contact-card">
                <i className="ri-phone-line" aria-hidden="true"></i>
                <div>
                  <h3>Phone</h3>
                  <a href="tel:+923257312012">+92 325 7312012</a>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; <span id="year">{new Date().getFullYear()}</span> Muhammad Mateen. All rights reserved.</p>
      </footer>
    </>
  );
}

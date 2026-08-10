import React from 'react';

export default function Resume() {
  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh", padding: "2rem 1rem", fontFamily: "system-ui, sans-serif", color: "#0f172a" }}>
      <style dangerouslySetInnerHTML={{__html: `
        .resume-container { max-width: 1000px; margin: 0 auto; background: white; border-radius: 1.5rem; box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.1); padding: 2rem 2rem 2.5rem; }
        .resume-h1 { font-size: 2.5rem; font-weight: 700; letter-spacing: -0.02em; background: linear-gradient(135deg, #1e293b, #3b82f6); -webkit-background-clip: text; color: transparent; margin-bottom: 0.25rem; }
        .resume-subhead { font-size: 1.2rem; font-weight: 500; color: #3b82f6; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin-bottom: 1rem; }
        .contact-bar { display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.9rem; color: #334155; margin: 1rem 0 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0; }
        .contact-bar a { color: #2563eb; text-decoration: none; }
        .resume-section { margin: 1.8rem 0 1.5rem; }
        .section-title { font-size: 1.3rem; font-weight: 600; color: #0f172a; border-left: 5px solid #3b82f6; padding-left: 1rem; margin-bottom: 1rem; }
        .project, .education-item { margin-bottom: 1.2rem; }
        .project-title { font-weight: 700; font-size: 1.05rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; }
        .tech-stack { font-family: monospace; font-size: 0.75rem; background: #eef2ff; padding: 0.2rem 0.5rem; border-radius: 20px; color: #1e40af; }
        .project-links { margin: 0.4rem 0 0.2rem; font-size: 0.85rem; }
        .project-links a { color: #2563eb; text-decoration: none; margin-right: 1rem; }
        .resume-ul { margin-left: 1.2rem; margin-top: 0.4rem; }
        .resume-li { margin: 0.3rem 0; }
        .skills-grid { display: flex; flex-wrap: wrap; gap: 1rem; }
        .skill-cat { background: #f8fafc; padding: 0.5rem 1rem; border-radius: 16px; font-size: 0.85rem; }
        .resume-hr { margin: 1rem 0; border: 0; height: 1px; background: #e2e8f0; }
        @media (max-width: 640px) {
            .resume-container { padding: 1.25rem; }
            .resume-h1 { font-size: 1.8rem; }
        }
      `}} />
      
      <div className="resume-container">
        {/* add a back button to home */}
        <div style={{ marginBottom: '2rem' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#3b82f6', fontWeight: 'bold' }}>&larr; Back to Portfolio</a>
        </div>

        <h1 className="resume-h1">Muhammad Mateen</h1>
        <div className="resume-subhead">Frontend Developer</div>

        <div className="contact-bar">
            <span>📧 meetmuhammadmateen@gmail.com</span>
            <span>📞 +92 325 7312012</span>
            <span>📍 Bahawalpur, Pakistan</span>
            <span>🌐 <a href="/">Portfolio</a></span>
            <span>💼 <a href="https://linkedin.com/in/muhammadmateen112" target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
            <span>🐙 <a href="https://github.com/meet-muhammad-mateen" target="_blank" rel="noopener noreferrer">GitHub</a></span>
        </div>

        <div className="resume-section">
            <div className="section-title">Profile</div>
            <p>Frontend developer with a strong focus on responsive, modern web applications using React, Next.js, TypeScript, and Tailwind CSS. Delivered 8+ real-world projects for businesses, agencies, and e-commerce platforms. Passionate about clean code, performance optimization, and shipping client-ready products.</p>
        </div>

        <div className="resume-section">
            <div className="section-title">Experience</div>
            <div className="education-item">
                <div className="project-title">Frontend Developer Intern <span className="tech-stack">After Concept</span></div>
                <div style={{fontSize: "0.85rem", color: "#475569", marginBottom: "0.4rem"}}>2025 – Present</div>
                <ul className="resume-ul">
                    <li className="resume-li">Spearheaded redesign and development of the agency website using React, Next.js, TypeScript, and Tailwind CSS.</li>
                    <li className="resume-li">Designed responsive, accessible user interfaces utilizing Figma.</li>
                    <li className="resume-li">Optimized Core Web Vitals, achieving excellent Lighthouse scores for mobile responsiveness.</li>
                    <li className="resume-li">Integrated modern workflows with Git and Netlify for CI/CD.</li>
                </ul>
            </div>
        </div>

        <div className="resume-section">
            <div className="section-title">Education</div>
            <div className="education-item"><strong>Intermediate in Computer Science (ICS)</strong> — 2025–Present<br/>Army
                Public School & College System</div>
            <div className="education-item"><strong>Matriculation (Computer Science)</strong> — 2025<br/>Army Public School &
                College System</div>
        </div>

        <div className="resume-section">
            <div className="section-title">Technical Skills</div>
            <div className="skills-grid">
                <div className="skill-cat"><strong>Core</strong><br/>React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3</div>
                <div className="skill-cat"><strong>Frameworks & Libraries</strong><br/>Tailwind CSS, Bootstrap</div>
                <div className="skill-cat"><strong>Tools</strong><br/>Figma (UI/UX), Git, GitHub, Netlify, Vercel</div>
            </div>
        </div>

        <div className="resume-section">
            <div className="section-title">Featured Projects</div>

            <div className="project">
                <div className="project-title">After Concept Agency <span className="tech-stack">Next.js · TypeScript · Tailwind</span>
                </div>
                <ul className="resume-ul">
                    <li className="resume-li">Complete redesign of a digital agency website delivering fintech and product solutions.</li>
                    <li className="resume-li">Bold, professional dark-themed interface built for performance and accessibility.</li>
                </ul>
            </div>

            <div className="project">
                <div className="project-title">BookShelf Online <span className="tech-stack">HTML · CSS · JS · Tailwind</span></div>
                <ul className="resume-ul">
                    <li className="resume-li">Fully responsive multi-page e-commerce bookstore.</li>
                    <li className="resume-li">Features category browsing, new arrivals, bestsellers, and polished UI.</li>
                </ul>
            </div>

            <div className="project">
                <div className="project-title">Lahore Gates Cafe <span className="tech-stack">HTML · CSS · JS · Bootstrap</span></div>
                <ul className="resume-ul">
                    <li className="resume-li">Luxury dining website featuring immersive visuals and table reservation flow.</li>
                    <li className="resume-li">Cross-browser compatible with elegant typography.</li>
                </ul>
            </div>

            <div className="project">
                <div className="project-title">1stop Furniture Scraper <span className="tech-stack">Web Scraping · Automation</span></div>
                <ul className="resume-ul">
                    <li className="resume-li">Custom web scraper to automate product data extraction from catalogs.</li>
                    <li className="resume-li">Efficiently parsed and compiled structured data for e-commerce.</li>
                </ul>
            </div>
        </div>

        <div className="resume-section">
            <div className="section-title">Currently Learning</div>
            <ul className="resume-ul">
                <li className="resume-li">Advanced React & Next.js Patterns</li>
                <li className="resume-li">Backend Integration & Full-Stack Development</li>
                <li className="resume-li">Advanced Web Scraping & Data Processing</li>
            </ul>
        </div>

        <div className="resume-section">
            <div className="section-title">Soft Skills (with evidence)</div>
            <ul className="resume-ul">
                <li className="resume-li"><strong>Team collaboration</strong> – Used Git in a 3-person academic project</li>
                <li className="resume-li"><strong>Quick learner</strong> – Built currency converter API project in 2 days without prior API
                    experience</li>
                <li className="resume-li"><strong>Attention to detail</strong> – Pixel-perfect Tailwind layouts across all projects</li>
                <li className="resume-li"><strong>Time management</strong> – 4 deployed projects while studying full-time</li>
            </ul>
        </div>

        <hr className="resume-hr" />
        <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#475569" }}>✅ Open for frontend internship · Remote /
            On-site (Pakistan)</p>
      </div>
    </div>
  );
}

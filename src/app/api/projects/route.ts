import { NextResponse } from 'next/server';

export async function GET() {
  // Real live data from the backend
  const projects = [
    {
      id: "PROJ-1",
      title: "After Concept",
      type: "Website",
      category: "Frontend",
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      description: "A digital agency website built with cutting-edge frontend technologies."
    },
    {
      id: "PROJ-2",
      title: "BookShelf Online",
      type: "E-Commerce",
      category: "Full Stack",
      tags: ["React", "Express", "Node.js", "MongoDB", "Redux"],
      description: "Full-stack e-commerce platform for book enthusiasts."
    },
    {
      id: "PROJ-3",
      title: "Lahore Gates Cafe",
      type: "Website",
      category: "Frontend",
      tags: ["HTML5", "CSS3", "JavaScript"],
      description: "Restaurant website with elegant UI and responsive design."
    },
    {
      id: "PROJ-4",
      title: "Land Design Intelligence",
      type: "Data Pipeline",
      category: "Automation",
      tags: ["Python", "Playwright", "FastAPI", "PostgreSQL"],
      description: "Data extraction and automation pipeline for land intelligence."
    }
  ];

  // Simulate slight database/network latency
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return NextResponse.json(projects);
}

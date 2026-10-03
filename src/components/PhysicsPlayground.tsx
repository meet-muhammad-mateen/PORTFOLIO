"use client";
import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const techStack = [
  { id: 1, name: "React", x: 662, y: 140, color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10" },
  { id: 2, name: "Next.js", x: 279, y: 185, color: "text-neutral-200", border: "border-neutral-500/30", bg: "bg-neutral-500/10" },
  { id: 3, name: "Python", x: 429, y: 221, color: "text-yellow-400", border: "border-yellow-500/30", bg: "bg-yellow-500/10" },
  { id: 4, name: "Playwright", x: 328, y: 73, color: "text-green-400", border: "border-green-500/30", bg: "bg-green-500/10" },
  { id: 5, name: "PostgreSQL", x: 476, y: 293, color: "text-blue-300", border: "border-blue-500/30", bg: "bg-blue-500/10" },
  { id: 6, name: "Tailwind", x: 348, y: 150, color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10" },
  { id: 7, name: "TypeScript", x: 320, y: 52, color: "text-blue-500", border: "border-blue-500/30", bg: "bg-blue-500/10" },
  { id: 8, name: "Django", x: 682, y: 272, color: "text-green-600", border: "border-green-500/30", bg: "bg-green-500/10" },
  { id: 9, name: "FastAPI", x: 335, y: 56, color: "text-teal-400", border: "border-teal-500/30", bg: "bg-teal-500/10" },
  { id: 10, name: "Supabase", x: 294, y: 276, color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
  { id: 11, name: "Vercel", x: 100, y: 94, color: "text-neutral-200", border: "border-neutral-500/30", bg: "bg-neutral-500/10" },
  { id: 12, name: "HTML5", x: 567, y: 144, color: "text-orange-500", border: "border-orange-500/30", bg: "bg-orange-500/10" },
  { id: 13, name: "CSS3", x: 295, y: 80, color: "text-blue-500", border: "border-blue-500/30", bg: "bg-blue-500/10" },
  { id: 14, name: "JavaScript", x: 537, y: 80, color: "text-yellow-300", border: "border-yellow-500/30", bg: "bg-yellow-500/10" },
  { id: 15, name: "Bootstrap", x: 654, y: 281, color: "text-purple-500", border: "border-purple-500/30", bg: "bg-purple-500/10" },
  { id: 16, name: "Shadcn UI", x: 351, y: 138, color: "text-neutral-200", border: "border-neutral-500/30", bg: "bg-neutral-500/10" },
  { id: 17, name: "Framer", x: 390, y: 151, color: "text-pink-400", border: "border-pink-500/30", bg: "bg-pink-500/10" },
  { id: 18, name: "Git", x: 472, y: 164, color: "text-red-500", border: "border-red-500/30", bg: "bg-red-500/10" },
];

export default function PhysicsPlayground() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [positions, setPositions] = useState<{ [key: number]: { x: number, y: number, angle: number } }>({});

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
          Runner = Matter.Runner,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          World = Matter.World,
          Bodies = Matter.Bodies;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;
    
    // Low gravity for a floating space-like feel
    engine.gravity.y = 0.2;

    const width = sceneRef.current.clientWidth;
    const height = 400;

    // Boundaries
    const wallOptions = { isStatic: true, render: { visible: false } };
    World.add(world, [
      Bodies.rectangle(width / 2, -50, width * 2, 100, wallOptions), // Top
      Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions), // Bottom
      Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions), // Left
      Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions) // Right
    ]);

    // Create DOM bodies
    const radius = 48; // 96px width/height = 48 radius
    const bodies = techStack.map(tech => {
      const body = Bodies.circle(tech.x, tech.y, radius, {
        restitution: 0.9, // Bounciness
        friction: 0.1,
        frictionAir: 0.05,
        density: 0.04
      });
      body.label = tech.id.toString();
      return body;
    });

    World.add(world, bodies);

    // Mouse interaction
    const mouse = Mouse.create(sceneRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    World.add(world, mouseConstraint);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // Sync positions loop
    let animationFrame: number;
    const updatePositions = () => {
      const newPos: { [key: number]: { x: number, y: number, angle: number } } = {};
      bodies.forEach(body => {
        newPos[parseInt(body.label)] = {
          x: body.position.x,
          y: body.position.y,
          angle: body.angle
        };
      });
      setPositions(newPos);
      animationFrame = requestAnimationFrame(updatePositions);
    };
    updatePositions();

    return () => {
      cancelAnimationFrame(animationFrame);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div ref={sceneRef} className="h-[400px] w-full rounded-3xl border border-white/10 hover:border-emerald-500/30 bg-white/[0.02] backdrop-blur-md shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] transition-all duration-700 relative overflow-hidden cursor-grab active:cursor-grabbing">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {techStack.map((tech) => {
        const pos = positions[tech.id] || { x: tech.x, y: tech.y, angle: 0 };
        return (
          <div
            key={tech.id}
            className={`absolute flex items-center justify-center w-24 h-24 rounded-full border ${tech.border} ${tech.bg} backdrop-blur-md shadow-lg pointer-events-none select-none`}
            style={{
              left: pos.x - 48, // offset by radius
              top: pos.y - 48,
              transform: `rotate(${pos.angle}rad)`
            }}
          >
            <span className={`font-mono text-xs font-bold text-center leading-tight px-2 ${tech.color}`}>{tech.name}</span>
          </div>
        );
      })}
    </div>
  );
}

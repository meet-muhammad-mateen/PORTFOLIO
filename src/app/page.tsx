"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code, Briefcase, Mail, Phone, ExternalLink, Code2, Layout, Rocket, Users, ChevronRight, Terminal, Box, PlayCircle, CheckCircle, FileText, Database, Cpu, Globe, Server } from "lucide-react";

import dynamic from 'next/dynamic';

const PhysicsPlayground = dynamic(() => import('../components/PhysicsPlayground'), { ssr: false });
const ApiSandbox = dynamic(() => import('../components/ApiSandbox'), { ssr: false });
const PlaywrightSimulator = dynamic(() => import('../components/PlaywrightSimulator'), { ssr: false });
const SqlPlayground = dynamic(() => import('../components/SqlPlayground'), { ssr: false });
const CiCdSimulator = dynamic(() => import('../components/CiCdSimulator'), { ssr: false });
const DataSlider = dynamic(() => import('../components/DataSlider'), { ssr: false });

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("workflow");
  const [workflowStep, setWorkflowStep] = useState(0);
  const [isFullStackMode, setIsFullStackMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "output", text: "Welcome to Mateen's interactive terminal. Type 'help' to see available commands." }
  ]);
  
  
  
  const techNodes = [
    { name: "React", x: "10%", y: "20%", color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10" },
    { name: "Next.js", x: "30%", y: "60%", color: "text-white", border: "border-white/30", bg: "bg-white/10" },
    { name: "Python", x: "70%", y: "30%", color: "text-yellow-400", border: "border-yellow-500/30", bg: "bg-yellow-500/10" },
    { name: "Playwright", x: "80%", y: "70%", color: "text-green-400", border: "border-green-500/30", bg: "bg-green-500/10" },
    { name: "PostgreSQL", x: "50%", y: "40%", color: "text-blue-300", border: "border-blue-300/30", bg: "bg-blue-300/10" },
    { name: "Tailwind", x: "20%", y: "80%", color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10" },
    { name: "TypeScript", x: "50%", y: "80%", color: "text-blue-500", border: "border-blue-500/30", bg: "bg-blue-500/10" },
  ];
const [pipelineState, setPipelineState] = useState('idle');
  const runPipeline = () => {
    if (pipelineState !== 'idle') return;
    setPipelineState('extracting');
    setTimeout(() => setPipelineState('processing'), 1500);
    setTimeout(() => setPipelineState('saving'), 3000);
    setTimeout(() => {
      setPipelineState('complete');
      setTimeout(() => setPipelineState('idle'), 3000);
    }, 4500);
  };
const [isXRayMode, setIsXRayMode] = useState(false);

  useEffect(() => {
    if (activeTab === "workflow") {
      const interval = setInterval(() => {
        setWorkflowStep(prev => {
          if (prev >= 6) {
            clearInterval(interval);
            return 6;
          }
          return prev + 1;
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [activeTab]);


  const terminalContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (activeTab === 'terminal' && terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({ top: terminalContainerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [terminalHistory, activeTab]);

  const handleTerminalSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && terminalInput.trim() !== '') {
      const command = terminalInput.trim().toLowerCase();
      let outputText = '';
      
      switch (command) {
        case 'help':
          outputText = 'Available commands:\n- whoami: About Mateen\n- skills: List technical expertise\n- clear: Clear terminal\n- fetch projects: See latest work';
          break;
        case 'whoami':
          outputText = 'Muhammad Mateen - Frontend & Automation Engineer. Bridging the gap between beautiful UIs and robust backend pipelines.';
          break;
        case 'skills':
          outputText = 'Frontend: React, Next.js, Tailwind CSS\nBackend: Python, Playwright, Django, REST APIs\nTools: Git, Vercel, Supabase';
          break;
        case 'fetch projects':
          outputText = 'Connecting to database...\n> College Digital Hub (Next.js, FastAPI)\n> After Concept Redesign (Tailwind, HTML)\n> Data Analytics Dashboard (Python, Playwright)\nType \'help\' for more.';
          break;
        case 'clear':
          setTerminalHistory([]);
          setTerminalInput('');
          return;
        default:
          outputText = `Command not found: ${command}. Type 'help' for available commands.`;
      }
      
      setTerminalHistory(prev => [
        ...prev,
        { type: 'input', text: `$ ${terminalInput}` },
        { type: 'output', text: outputText }
      ]);
      setTerminalInput('');
    }
  };
  const projects = [
    {
      title: "After Concept",
      category: "company",
      type: "Agency Website",
      desc: "A complete redesign of my company's digital agency website — delivering fintech and product solutions for SMEs with a bold, professional dark-themed interface.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      demo: "https://www.afterconcept.io/",
      code: "https://github.com/meet-muhammad-mateen/after-concept-revisions"
    },
    {
      title: "BookShelf Online",
      category: "company",
      type: "E-Commerce",
      desc: "Pakistan's premier online bookstore — a fully responsive multi-page site with category browsing, new arrivals, bestsellers, and a polished reading-first experience.",
      tags: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
      demo: "https://bookshelfonline.netlify.app/",
      code: "https://github.com/meet-muhammad-mateen"
    },
    {
      title: "Lahore Gates Cafe",
      category: "company",
      type: "Restaurant",
      desc: "A luxury dining website for Lahore Gates Cafe featuring elegant typography, immersive full-screen visuals, table reservation flow, and a refined guest experience.",
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      demo: "https://lahoregatescafe.netlify.app/",
      code: "https://github.com/meet-muhammad-mateen"
    },
    {
      title: "Snack Spot",
      category: "company",
      type: "Food & Beverage",
      desc: "A vibrant restaurant website for Snacks Bar in Bahawalpur — bold dark design with golden accents, an interactive menu, testimonials section, and table booking feature.",
      tags: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
      demo: "https://snackspot.netlify.app/",
      code: "https://github.com/meet-muhammad-mateen"
    },
    {
      title: "Gossip Cafe",
      category: "company",
      type: "Cafe",
      desc: "A warm, atmospheric cafe website for Bahawalpur's Gossip Cafe — featuring a rich dark theme, gallery section, menu display, guest reviews, and smooth table reservation flow.",
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      demo: "https://gossipcafe.netlify.app/",
      code: "https://github.com/meet-muhammad-mateen"
    },
    {
      title: "Currency Converter",
      category: "personal",
      type: "Utility App",
      desc: "A clean conversion interface built to make everyday tasks easier, with a layout centered on usability, clarity, and quick interaction.",
      tags: ["HTML", "CSS", "JavaScript", "API Integration"],
      demo: "https://currencyflipz.netlify.app/",
      code: "https://github.com/meet-muhammad-mateen/Currency-Converter"
    },
    {
      title: "1stop Furniture Scraper",
      category: "personal",
      type: "Web Scraper",
      desc: "Developed a custom web scraper for 1stop furniture to automate product data extraction, efficiently parsing catalogs and compiling structured data.",
      tags: ["Web Scraping", "Data Parsing", "Automation"],
      demo: "",
      code: ""
    },
    {
      title: "Land Design Intelligence",
      category: "personal",
      type: "Full-Stack Scraper",
      desc: "A production-ready data pipeline and Django web app built to aggregate county-level zoning and site plan data using Playwright for automated headless scraping.",
      tags: ["Python / Django", "Playwright", "Browser Automation"],
      demo: "https://landdesignintelligence.com/",
      code: ""
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-neutral-800 font-sans">

      

      {/* Background Pattern - Animated Shadcn Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black overflow-hidden h-full">
        <div className={`absolute inset-0 bg-[size:32px_32px] transition-colors duration-1000 ${isFullStackMode ? 'bg-[linear-gradient(to_right,#10b9811a_1px,transparent_1px),linear-gradient(to_bottom,#10b9811a_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]'}`}></div>
        
        {/* Floating Icons */}
        <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[10%]">
          <Code className="w-20 h-20 text-neutral-500" strokeWidth={1.5} />
        </motion.div>
        <motion.div animate={{ y: [0, 30, 0], rotate: [0, 10, 0], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[40%] right-[15%]">
          <Terminal className="w-32 h-32 text-blue-600/80" strokeWidth={1.5} />
        </motion.div>
        <motion.div animate={{ x: [0, 20, 0], y: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[20%] left-[20%]">
          <Box className="w-24 h-24 text-neutral-500" strokeWidth={1.5} />
        </motion.div>
        <motion.div animate={{ y: [0, -40, 0], rotate: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[10%] right-[25%]">
          <Layout className="w-40 h-40 text-purple-600/80" strokeWidth={1.5} />
        </motion.div>
        
        {/* Additional Background Icons */}
        <motion.div animate={{ x: [0, -30, 0], y: [0, 20, 0], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] right-[5%]">
          <Database className="w-24 h-24 text-emerald-600/70" strokeWidth={1.5} />
        </motion.div>
        <motion.div animate={{ y: [0, -25, 0], rotate: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[40%] left-[5%]">
          <Cpu className="w-28 h-28 text-orange-600/70" strokeWidth={1.5} />
        </motion.div>
        <motion.div animate={{ y: [0, 35, 0], opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[5%] left-[40%]">
          <Globe className="w-32 h-32 text-indigo-600/70" strokeWidth={1.5} />
        </motion.div>
        <motion.div animate={{ x: [0, 30, 0], rotate: [0, -10, 0], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[5%] left-[45%]">
          <Server className="w-20 h-20 text-red-600/70" strokeWidth={1.5} />
        </motion.div>
        
        <div className="absolute left-0 right-0 top-[10%] -z-10 m-auto h-[500px] w-[500px] rounded-full bg-blue-500 opacity-10 blur-[120px]"></div>
        <div className="absolute inset-0 bg-black/60 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_100%)]"></div>
      </div>

      {/* Header */}
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="fixed top-0 w-full border-b border-white/10 bg-black/50 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white rounded flex items-center justify-center text-black font-bold text-xs">
              MM
            </div>
            <span className="font-semibold text-lg tracking-tight">Muhammad Mateen</span>
          </div>
          <nav className="hidden md:flex items-center gap-4 md:p-8 text-sm text-neutral-400 font-medium">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/resume.pdf" target="_blank" className="text-sm px-4 py-2 border border-white/10 text-white rounded-full font-medium hover:bg-white/5 transition-colors hidden sm:block">
              Resume
            </a>
            <a href="#contact" className="text-sm px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors hidden sm:block">
              Get in Touch
            </a>
            <button 
              className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
      </motion.header>

      {/* Right-Side Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-3/4 max-w-sm bg-neutral-950 border-l border-white/10 z-[70] md:hidden flex flex-col font-sans"
            >
              <div className="h-16 border-b border-white/10 flex items-center justify-end px-6">
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-8 p-8 text-lg">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-400 hover:text-white transition-colors">About</a>
                <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-400 hover:text-white transition-colors">Experience</a>
                <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-400 hover:text-white transition-colors">Projects</a>
                <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-400 hover:text-white transition-colors">Skills</a>
                <a href="/resume.pdf" target="_blank" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-400 hover:text-white transition-colors">Resume</a>
                <div className="h-px w-full bg-white/10 my-2" />
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-center px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-neutral-200 transition-colors">Get in Touch</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 max-w-5xl mt-16 text-center md:text-left flex flex-col md:flex-row gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex-1 space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-neutral-300 font-medium uppercase tracking-wider">Available for internships and freelance work</span>
              </div>
              
              <div 
                className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors" 
                onClick={() => setIsFullStackMode(!isFullStackMode)}
              >
                <span className={`text-xs font-bold transition-colors duration-500 ${!isFullStackMode ? 'text-white' : 'text-neutral-500'}`}>UI Mode</span>
                <button 
                  className="w-12 h-6 rounded-full bg-neutral-900 relative border border-white/20 transition-colors pointer-events-none"
                >
                  <motion.div 
                    animate={{ x: isFullStackMode ? 24 : 0 }} 
                    className={`w-6 h-6 absolute left-0 top-0 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500 ${isFullStackMode ? 'bg-emerald-400' : 'bg-white'}`}
                  >
                    {isFullStackMode ? <Database className="w-3 h-3 text-black" /> : <Layout className="w-3 h-3 text-black" />}
                  </motion.div>
                </button>
                <span className={`text-xs font-bold transition-colors duration-500 ${isFullStackMode ? 'text-emerald-400' : 'text-neutral-500'}`}>Full-Stack Mode</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight transition-colors duration-1000">
              {isFullStackMode ? (
                <>Building robust pipelines <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">for data-driven apps.</span></>
              ) : (
                <>Building real websites <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-600">for real businesses.</span></>
              )}
            </h1>
            
            <p className="text-lg md:text-2xl text-neutral-400 max-w-2xl leading-relaxed min-h-[140px] md:min-h-[100px]">
              {isFullStackMode ? 
                "I architect automated browser scrapers, robust data pipelines, and scalable backend infrastructure. From Python/Playwright automation to Next.js API integrations — I engineer complete end-to-end solutions." : 
                "I build professional websites for agencies, cafes, restaurants, and e-commerce brands. From company redesigns to client-facing storefronts — I turn ideas into polished live products."
              }
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4 justify-center md:justify-start">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projects" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-neutral-200 transition-colors flex items-center gap-2 text-lg">
                View Projects <ChevronRight className="w-5 h-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="https://github.com/meet-muhammad-mateen" target="_blank" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2 text-lg">
                <Code className="w-5 h-5" /> GitHub
              </motion.a>
              <motion.a whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="https://www.linkedin.com/in/muhammadmateen112/" target="_blank" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2 text-lg">
                <Briefcase className="w-5 h-5" /> LinkedIn
              </motion.a>
              <motion.a whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="/resume.pdf" target="_blank" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5" /> Resume
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Dashboard Mockup - The Relay Vibe */}
        <section className="container mx-auto px-6 max-w-5xl mt-24">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="rounded-2xl border border-white/10 bg-neutral-950 p-2 shadow-2xl relative overflow-hidden">
            <div className="rounded-xl border border-white/10 bg-black overflow-hidden flex flex-col relative z-10">
              <div className="h-12 border-b border-white/10 flex items-center px-4 gap-4 bg-neutral-900/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-400 bg-black/50 px-3 py-1 rounded-md border border-white/10">
                  <Box className="w-4 h-4" />
                  <span>mateen / portfolio / {activeTab}</span>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row min-h-[400px]">
                <div className="w-full md:w-64 border-r border-white/10 p-4">
                  <div className="space-y-1">
                    <button 
                      onClick={() => { setActiveTab('workflow'); setWorkflowStep(0); }}
                      className={`w-full px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2 transition-colors ${activeTab === 'workflow' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      <Terminal className="w-4 h-4" /> Workflow
                    </button>
                    <button 
                      onClick={() => setActiveTab('projects')}
                      className={`w-full px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2 transition-colors ${activeTab === 'projects' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      <PlayCircle className="w-4 h-4" /> Live Projects
                    </button>
                    <button 
                      onClick={() => setActiveTab('deployments')}
                      className={`w-full px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2 transition-colors ${activeTab === 'deployments' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      <Rocket className="w-4 h-4" /> Deployments
                    </button>
                    <button 
                      onClick={() => setActiveTab('terminal')}
                      className={`w-full px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2 transition-colors ${activeTab === 'terminal' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      <Terminal className="w-4 h-4" /> Terminal
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 p-6 md:p-4 md:p-8">
                  {activeTab === 'workflow' && (
                    <div className="animate-in fade-in duration-500">
                      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">Development Workflow</h3>
                          <p className="text-sm text-neutral-400">Commit to production pipeline</p>
                        </div>
                        {workflowStep >= 6 ? (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 text-sm font-medium">
                            <CheckCircle className="w-3 h-3" /> Deployed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Running
                          </span>
                        )}
                      </div>

                      <div className="border border-white/10 rounded-lg overflow-hidden bg-black/50">
                        <div className="px-6 py-4 border-b border-white/10 text-xs font-bold text-neutral-500 uppercase tracking-wider grid grid-cols-2">
                          <span>Phase</span>
                          <span className="text-right">Status</span>
                        </div>
                        {[
                          "Requirement Gathering",
                          "UI/UX Design (Figma)",
                          "Front-End Development (React / Next.js)",
                          "Responsive Layout Validation",
                          "Client Feedback & Iteration",
                          "Production Deployment"
                        ].map((name, i) => {
                          const isDone = workflowStep > i;
                          const isRunning = workflowStep === i;
                          
                          let statusText = "Queued";
                          let statusColor = "text-neutral-500";
                          
                          if (isDone) {
                            statusText = "Done";
                            statusColor = "text-green-500";
                          } else if (isRunning) {
                            statusText = "In Progress";
                            statusColor = "text-yellow-500";
                          }
                          
                          return (
                            <div key={i} className="px-6 py-4 border-b border-white/5 text-sm md:text-base flex items-center justify-between last:border-0 hover:bg-white/5 transition-colors group">
                              <div className="flex items-center gap-3">
                                {isDone ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : isRunning ? (
                                  <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-neutral-700" />
                                )}
                                <span className={`font-medium transition-colors ${isDone || isRunning ? 'text-white' : 'text-neutral-400'}`}>{name}</span>
                              </div>
                              <span className={`font-semibold ${statusColor}`}>{statusText}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'projects' && (
                    <div className="animate-in fade-in duration-500">
                      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">Live Projects Status</h3>
                          <p className="text-sm text-neutral-400">Monitoring deployed environments</p>
                        </div>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 text-sm font-medium">
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> 8 Healthy
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {[
                          { name: "After Concept", url: "www.afterconcept.io", href: "https://www.afterconcept.io/", status: "Healthy", ping: "42ms" },
                          { name: "BookShelf Online", url: "bookshelfonline.netlify.app", href: "https://bookshelfonline.netlify.app/", status: "Healthy", ping: "38ms" },
                          { name: "Lahore Gates Cafe", url: "lahoregatescafe.netlify.app", href: "https://lahoregatescafe.netlify.app/", status: "Healthy", ping: "45ms" },
                          { name: "Snack Spot", url: "snackspot.netlify.app", href: "https://snackspot.netlify.app/", status: "Healthy", ping: "51ms" },
                          { name: "Gossip Cafe", url: "gossipcafe.netlify.app", href: "https://gossipcafe.netlify.app/", status: "Healthy", ping: "48ms" },
                          { name: "Currency Converter", url: "currencyflipz.netlify.app", href: "https://currencyflipz.netlify.app/", status: "Healthy", ping: "33ms" },
                          { name: "1stop Furniture Scraper", url: "Private Pipeline", href: "#", status: "Active", ping: "112ms" },
                          { name: "Land Design Intelligence", url: "landdesignintelligence.com", href: "https://landdesignintelligence.com/", status: "Healthy", ping: "64ms" },
                        ].map((proj, i) => (
                          <a key={i} href={proj.href !== "#" ? proj.href : undefined} target={proj.href !== "#" ? "_blank" : undefined} className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                                <Box className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                              </div>
                              <div>
                                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                                  {proj.name}
                                  {proj.href !== "#" && <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />}
                                </h4>
                                <span className="text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">{proj.url}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                              <span className="text-neutral-400 font-mono hidden sm:inline">{proj.ping}</span>
                              <span className="flex items-center gap-1.5 text-green-500 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {proj.status}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  
                  {activeTab === 'terminal' && (
                    <div className="animate-in fade-in duration-500 h-full flex flex-col font-mono text-sm">
                      <div ref={terminalContainerRef} className="flex-1 overflow-y-auto space-y-3 pb-4 max-h-[350px]">
                        {terminalHistory.map((item, index) => (
                          <div key={index} className={`flex gap-2 ${item.type === 'input' ? 'text-white' : 'text-emerald-400'}`}>
                            {item.type === 'input' ? (
                              <span className="text-neutral-500"></span>
                            ) : (
                              <span className="text-neutral-500">&gt;</span>
                            )}
                            <span className="whitespace-pre-wrap">{item.text}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                        <span className="text-emerald-500">$</span>
                        <input 
                          type="text" 
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          onKeyDown={handleTerminalSubmit}
                          className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
                          placeholder="Type 'help' and press Enter..."
                          autoFocus
                        />
                      </div>
                    </div>
                  )}
{activeTab === 'deployments' && (
                    <div className="animate-in fade-in duration-500">
                      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">Recent Deployments</h3>
                          <p className="text-sm text-neutral-400">CI/CD deployment history</p>
                        </div>
                      </div>

                      <div className="border-l-2 border-white/10 ml-3 pl-6 space-y-8 py-2">
                        {[
                          { hash: "7a9b2f1", msg: "fix: mobile navigation overflow", proj: "After Concept", time: "2 hours ago", status: "success" },
                          { hash: "3c8e5d0", msg: "feat: integrate new reservation API", proj: "Lahore Gates Cafe", time: "1 day ago", status: "success" },
                          { hash: "9f1d4a2", msg: "chore: update dependencies", proj: "BookShelf Online", time: "3 days ago", status: "success" },
                          { hash: "5b6a8c4", msg: "fix: typography adjustments on hero", proj: "Snack Spot", time: "5 days ago", status: "success" },
                        ].map((dep, i) => (
                          <div key={i} className="relative">
                            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-black border-2 border-green-500" />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <p className="text-white font-medium mb-1">{dep.msg}</p>
                                <div className="flex items-center gap-3 text-xs">
                                  <span className="text-neutral-500 font-mono">{dep.hash}</span>
                                  <span className="text-neutral-500">•</span>
                                  <span className="text-neutral-400">{dep.proj}</span>
                                </div>
                              </div>
                              <span className="text-xs text-neutral-500 whitespace-nowrap">{dep.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Stats Strip */}
        <section className="border-y border-white/10 bg-white/5 mt-24 backdrop-blur-sm">
          <div className="container mx-auto px-6 max-w-5xl py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:p-8 text-center divide-x divide-white/10">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">8+</p>
                <p className="text-sm text-neutral-400 uppercase tracking-widest font-semibold">Projects Delivered</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">12+</p>
                <p className="text-sm text-neutral-400 uppercase tracking-widest font-semibold">Core Technologies</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">100%</p>
                <p className="text-sm text-neutral-400 uppercase tracking-widest font-semibold">Responsive-First</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">2026</p>
                <p className="text-sm text-neutral-400 uppercase tracking-widest font-semibold">Pro Journey Started</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container mx-auto px-6 max-w-5xl mt-20 md:mt-32">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Delivering real websites for businesses, agencies, and hospitality brands.</h2>
            <p className="text-neutral-400 text-xl max-w-3xl leading-relaxed">
              I am a front-end developer who has built live websites for a digital agency, restaurants, cafes,
              and an e-commerce brand. I care about clean code, strong visual hierarchy, and shipping work that
              real clients can be proud of.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:p-8">
            <div className="p-4 md:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
              <Code2 className="w-8 h-8 text-white mb-6 group-hover:text-green-400 transition-colors" />
              <h3 className="text-2xl font-bold mb-4 text-white">Full-Stack Engineering</h3>
              <p className="text-neutral-400 text-lg">I architect scalable web applications using Next.js, React, and TypeScript, focusing on clean code, maintainability, and high performance.</p>
            </div>
            <div className="p-4 md:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
              <Layout className="w-8 h-8 text-white mb-6 group-hover:text-blue-400 transition-colors" />
              <h3 className="text-2xl font-bold mb-4 text-white">Advanced UI Integration</h3>
              <p className="text-neutral-400 text-lg">I build highly interactive and accessible interfaces using Tailwind CSS, Shadcn UI, and Framer Motion, delivering polished, production-ready experiences.</p>
            </div>
            <div className="p-4 md:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
              <Terminal className="w-8 h-8 text-white mb-6 group-hover:text-yellow-400 transition-colors" />
              <h3 className="text-2xl font-bold mb-4 text-white">Data Pipelines & Scraping</h3>
              <p className="text-neutral-400 text-lg">Beyond the frontend, I engineer automated browser scraping solutions and robust data extraction pipelines using Python and Playwright.</p>
            </div>
            <div className="p-4 md:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
              <Rocket className="w-8 h-8 text-white mb-6 group-hover:text-purple-400 transition-colors" />
              <h3 className="text-2xl font-bold mb-4 text-white">End-to-End Delivery</h3>
              <p className="text-neutral-400 text-lg">From initial requirement gathering to deploying on modern cloud infrastructure, I ensure a smooth, rapid, and transparent development lifecycle.</p>
            </div>
          </div>
        </section>

        
        {/* Data Pipeline Visualizer */}
        <section className="container mx-auto px-6 max-w-5xl mt-20 md:mt-32">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Automation in Action</h2>
            <p className="text-neutral-400 text-xl max-w-2xl">A visual demonstration of my data extraction and processing pipelines. I build bots that navigate the web, extract unstructured data, and pipe it into clean databases for frontend consumption.</p>
          </div>
          
          <div className="p-4 md:p-8 rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 md:mb-12">
              <h3 className="text-lg font-mono text-emerald-400">pipeline.ts</h3>
              <button 
                onClick={runPipeline}
                disabled={pipelineState !== 'idle'}
                className="px-6 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30 rounded-full font-bold transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlayCircle className="w-5 h-5" /> 
                {pipelineState === 'idle' ? 'Run Scraper' : pipelineState === 'complete' ? 'Success!' : 'Running...'}
              </button>
            </div>
            
            <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 md:p-8 md:gap-0 py-8">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-white/10 -z-10 -translate-y-1/2"></div>
              
              {/* Active Line Animation */}
              <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-emerald-500 -z-10 -translate-y-1/2 origin-left transition-transform duration-750 ease-linear" style={{ transform: pipelineState === 'idle' ? 'scaleX(0)' : pipelineState === 'extracting' ? 'scaleX(0.33)' : pipelineState === 'processing' ? 'scaleX(0.66)' : 'scaleX(1)' }}></div>
              
              {/* Node 1: Target Website */}
              <div className={`flex flex-col items-center gap-4 transition-opacity duration-300 ${pipelineState === 'extracting' ? 'opacity-100 scale-110' : 'opacity-50'}`}>
                <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center bg-neutral-900 transition-colors ${pipelineState === 'extracting' ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-white/10'}`}>
                  <Globe className={`w-10 h-10 transition-colors ${pipelineState === 'extracting' ? 'text-emerald-400' : 'text-neutral-500'}`} />
                </div>
                <span className="font-mono text-sm">Target.com</span>
              </div>
              
              {/* Node 2: Python Bot */}
              <div className={`flex flex-col items-center gap-4 transition-opacity duration-300 ${pipelineState === 'processing' ? 'opacity-100 scale-110' : 'opacity-50'}`}>
                <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center bg-neutral-900 transition-colors ${pipelineState === 'processing' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-white/10'}`}>
                  <Terminal className={`w-10 h-10 transition-colors ${pipelineState === 'processing' ? 'text-blue-400' : 'text-neutral-500'}`} />
                </div>
                <span className="font-mono text-sm">Playwright</span>
              </div>
              
              {/* Node 3: Database */}
              <div className={`flex flex-col items-center gap-4 transition-opacity duration-300 ${pipelineState === 'saving' ? 'opacity-100 scale-110' : 'opacity-50'}`}>
                <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center bg-neutral-900 transition-colors ${pipelineState === 'saving' ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-white/10'}`}>
                  <Database className={`w-10 h-10 transition-colors ${pipelineState === 'saving' ? 'text-purple-400' : 'text-neutral-500'}`} />
                </div>
                <span className="font-mono text-sm">PostgreSQL</span>
              </div>
              
              {/* Node 4: Dashboard */}
              <div className={`flex flex-col items-center gap-4 transition-opacity duration-300 ${pipelineState === 'complete' ? 'opacity-100 scale-110' : 'opacity-50'}`}>
                <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center bg-neutral-900 relative transition-colors ${pipelineState === 'complete' ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-white/10'}`}>
                  <Layout className={`w-10 h-10 transition-colors ${pipelineState === 'complete' ? 'text-emerald-400' : 'text-neutral-500'}`} />
                  
                  {pipelineState === 'complete' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -20 }} className="absolute -top-6 right-0 bg-emerald-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                      +100 rows
                    </motion.div>
                  )}
                </div>
                <span className="font-mono text-sm">Next.js App</span>
              </div>
            </div>
            
            <div className="mt-12 bg-black rounded-xl p-4 border border-white/10 font-mono text-xs md:text-sm text-neutral-400 min-h-[60px] flex items-center">
              {pipelineState === 'idle' && <span>&gt; Ready to execute data_pipeline.py...</span>}
              {pipelineState === 'extracting' && <span className="text-emerald-400">&gt; [1/3] Navigating to target DOM, bypassing captchas, extracting HTML tables...</span>}
              {pipelineState === 'processing' && <span className="text-blue-400">&gt; [2/3] Cleaning data with pandas, removing null values, normalizing JSON...</span>}
              {pipelineState === 'saving' && <span className="text-purple-400">&gt; [3/3] UPSERT into production database, verifying integrity constraints...</span>}
              {pipelineState === 'complete' && <span className="text-emerald-400">&gt; Pipeline executed successfully. Next.js cache invalidated.</span>}
            </div>
          </div>
        </section>

          {/* API Documentation Sandbox */}
          <section className="container mx-auto px-6 max-w-5xl mt-20 md:mt-32">
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Interactive API Docs</h2>
              <p className="text-neutral-400 text-xl mb-8">Not just a frontend developer. I architect clean, RESTful APIs and robust backend services. Try fetching my data directly from this simulated endpoint sandbox.</p>
              <ApiSandbox />
            </div>
          </section>

          {/* Playwright Simulator */}
          <section className="container mx-auto px-6 max-w-5xl mt-20 md:mt-32">
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Headless Browser Automation</h2>
              <p className="text-neutral-400 text-xl mb-8">Watch a live simulation of a Playwright scraping bot. I engineer automated solutions that navigate complex DOMs, bypass captchas, and extract structured data seamlessly.</p>
              <PlaywrightSimulator />
            </div>
          </section>

          {/* SQL Playground */}
          <section className="container mx-auto px-6 max-w-5xl mt-20 md:mt-32">
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Database Architecture Sandbox</h2>
              <p className="text-neutral-400 text-xl mb-8">Test my understanding of relational data modeling. Write and execute simulated SQL queries directly against my portfolio database to filter projects and skills.</p>
              <SqlPlayground />
            </div>
          </section>

          {/* CI/CD Simulator */}
          <section className="container mx-auto px-6 max-w-5xl mt-20 md:mt-32">
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">CI/CD Pipeline Simulator</h2>
              <p className="text-neutral-400 text-xl mb-8">Deploying robust applications requires robust DevOps. Watch how my automated GitHub Actions workflow handles linting, python scraping tests, Next.js builds, and automatic rollbacks on failure.</p>
              <CiCdSimulator />
            </div>
          </section>

          {/* Data Cleansing Slider */}
          <section className="container mx-auto px-6 max-w-5xl mt-20 md:mt-32">
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Data Engineering & Cleansing</h2>
              <p className="text-neutral-400 text-xl mb-8">Raw scraped data is rarely ready for production. Drag the slider to see how I transform messy, unstructured DOM elements into clean, strictly-typed data ready for the frontend.</p>
              <DataSlider />
            </div>
          </section>





{/* Experience Section */}
        <section id="experience" className="container mx-auto px-6 max-w-5xl mt-20 md:mt-32">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
            <p className="text-neutral-400 text-xl">My professional journey and internships.</p>
          </div>
          
          <div className="p-6 md:p-14 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-white">Frontend & Automation Engineer</h3>
                  <p className="text-neutral-400 text-xl mt-2">After Concept</p>
                </div>
                <span className="px-4 py-2 rounded-full bg-white/10 text-base font-semibold border border-white/10">2026 – Present</span>
              </div>
              <ul className="space-y-6 text-neutral-300 text-lg">
                <li className="flex gap-4">
                  <ChevronRight className="w-6 h-6 text-neutral-500 shrink-0 mt-0.5" />
                  <span><strong>Frontend Engineering & Architecture:</strong> Engineered scalable, high-performance web applications using Next.js, React, and TypeScript, delivering seamless user experiences.</span>
                </li>
                <li className="flex gap-4">
                  <ChevronRight className="w-6 h-6 text-neutral-500 shrink-0 mt-0.5" />
                  <span><strong>Advanced UI Development:</strong> Architected robust, interactive interfaces leveraging Tailwind CSS, Shadcn UI, and Framer Motion for premium, production-ready animations and layouts.</span>
                </li>
                <li className="flex gap-4">
                  <ChevronRight className="w-6 h-6 text-neutral-500 shrink-0 mt-0.5" />
                  <span><strong>Data Pipelines & Automation:</strong> Developed automated browser scraping solutions using Python and Playwright, integrating robust data extraction pipelines with backend systems.</span>
                </li>
                <li className="flex gap-4">
                  <ChevronRight className="w-6 h-6 text-neutral-500 shrink-0 mt-0.5" />
                  <span><strong>Performance & Optimization:</strong> Enforced rigorous performance standards, dramatically improving Core Web Vitals, accessibility, and SEO across client-facing applications.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container mx-auto px-6 max-w-5xl mt-20 md:mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-neutral-400 text-xl max-w-2xl">A collection of deployed websites, real-world business solutions, and automation tools built with modern web technologies.</p>
            </div>
            
            <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/10">
              {['all', 'company', 'personal'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-lg text-base font-medium capitalize transition-colors ${activeFilter === filter ? 'bg-white/10 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:p-8">
            {projects.map((project, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.1 }}
                key={i} 
                className={`group p-4 md:p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex flex-col h-full ${activeFilter !== 'all' && activeFilter !== project.category ? 'hidden' : ''}`}
              >
                {isXRayMode ? (
                  <div className="text-xs sm:text-sm whitespace-pre-wrap overflow-x-auto font-mono text-emerald-400 h-full flex flex-col justify-center">
                    {`{\n  "id": "PROJ-${i+1}",\n  "name": "${project.title}",\n  "type": "${project.type}",\n  "category": "${project.category}",\n  "tags": [\n${project.tags.map(t => `    "${t}"`).join(',\n')}\n  ]\n}`}
                  </div>
                ) : (
                  <>
                    <div className="mb-8 flex justify-between items-start">
                  <div>
                    <p className="text-sm font-mono text-neutral-500 mb-3 uppercase tracking-wider font-semibold">{project.type}</p>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  </div>
                  <div className="flex gap-3">
                    {project.code && (
                      <a href={project.code} target="_blank" className="p-3 bg-black/50 rounded-full border border-white/10 hover:border-white/30 transition-colors">
                        <Code className="w-5 h-5 text-neutral-400 group-hover:text-white" />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" className="p-3 bg-black/50 rounded-full border border-white/10 hover:border-white/30 transition-colors">
                        <ExternalLink className="w-5 h-5 text-neutral-400 group-hover:text-white" />
                      </a>
                    )}
                  </div>
                </div>
                
                <p className="text-neutral-400 mb-10 flex-1 text-lg leading-relaxed">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-md bg-black/50 border border-white/5 text-sm text-neutral-300 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Realistic Physics Tech Stack Playground */}
        <section className="container mx-auto px-6 max-w-5xl mt-20 md:mt-32">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Interactive Tech Stack Physics</h2>
            <p className="text-neutral-400 text-xl mb-8">Grab, throw, and crash the technology nodes around. Powered by Matter.js for a realistic 2D collision physics engine.</p>
            <PhysicsPlayground />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="container mx-auto px-6 max-w-5xl mt-20 md:mt-32">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
            <p className="text-neutral-400 text-xl">A frontend toolkit proven across agency, hospitality, and e-commerce projects.</p>
          </div>
          
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:p-8">
            <motion.div whileHover={{ scale: 1.05 }} className="p-4 md:p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <Code2 className="w-10 h-10 text-white mb-6" />
              <h3 className="font-bold text-2xl mb-6 text-white">Core Front-End</h3>
              <ul className="space-y-4 text-lg text-neutral-400">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> React, Next.js & TypeScript</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> JavaScript (ES6+)</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> HTML5 & Semantic Markup</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> CSS3 & Custom Properties</li>
              </ul>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-4 md:p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <Layout className="w-10 h-10 text-white mb-6" />
              <h3 className="font-bold text-2xl mb-6 text-white">Frameworks & Libraries</h3>
              <ul className="space-y-4 text-lg text-neutral-400">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> Tailwind CSS</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> Bootstrap</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> Shadcn UI & Component Libs</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> Framer Motion & Animations</li>
              </ul>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-4 md:p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <Rocket className="w-10 h-10 text-white mb-6" />
              <h3 className="font-bold text-2xl mb-6 text-white">Tools & Workflow</h3>
              <ul className="space-y-4 text-lg text-neutral-400">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> UI/UX Design (Figma)</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> GitHub & Git</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> Netlify / Vercel</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> API integration</li>
              </ul>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-4 md:p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <Users className="w-10 h-10 text-white mb-6" />
              <h3 className="font-bold text-2xl mb-6 text-white">Backend</h3>
              <ul className="space-y-4 text-lg text-neutral-400">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> Python & Django</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> Playwright (Scraping)</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> Database Management</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-neutral-600" /> Browser Automation</li>
              </ul>
            </motion.div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <motion.section initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} id="contact" className="container mx-auto px-6 max-w-4xl mt-20 md:mt-32 text-center">
          <div className="p-16 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let&apos;s build something great.</h2>
            <p className="text-neutral-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              I have delivered live websites for agencies, restaurants, cafes, and e-commerce brands. I am open to freelance work, internships, and new client projects.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="mailto:meetmuhammadmateen@gmail.com" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-neutral-200 transition-colors flex items-center gap-3 text-lg">
                <Mail className="w-5 h-5" /> meetmuhammadmateen@gmail.com
              </a>
              <a href="tel:+923257312012" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-colors flex items-center gap-3 text-lg">
                <Phone className="w-5 h-5" /> +92 325 7312012
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      <button 
        onPointerDown={() => setIsXRayMode(true)}
        onPointerUp={() => setIsXRayMode(false)}
        onPointerLeave={() => setIsXRayMode(false)}
        className="fixed bottom-8 right-8 z-50 bg-neutral-900 border border-white/20 text-white px-4 py-3 rounded-full flex items-center gap-2 shadow-2xl hover:bg-neutral-800 transition-colors select-none group"
      >
        <Code2 className={`w-5 h-5 transition-colors ${isXRayMode ? 'text-emerald-400' : 'text-neutral-400 group-hover:text-white'}`} />
        <span className={`font-mono text-sm font-bold transition-colors ${isXRayMode ? 'text-emerald-400' : 'text-neutral-400 group-hover:text-white'}`}>Hold for X-Ray</span>
      </button>

      <footer className="border-t border-white/10 py-12 text-center text-neutral-500 mt-20">
        <p className="text-base">&copy; {new Date().getFullYear()} Muhammad Mateen. All rights reserved.</p>
      </footer>
    </div>
  );
}

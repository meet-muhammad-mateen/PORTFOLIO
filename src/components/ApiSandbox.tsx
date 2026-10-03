"use client";
import { useState } from 'react';
import { PlayCircle, Server, Code, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const endpoints = [
  {
    id: 'bio',
    method: 'GET',
    path: '/api/v1/mateen/bio',
    response: {
      status: 200,
      data: {
        name: "Muhammad Mateen",
        role: "Frontend & Automation Engineer",
        location: "Pakistan",
        mission: "Bridging the gap between beautiful UIs and robust backend pipelines."
      }
    }
  },
  {
    id: 'experience',
    method: 'GET',
    path: '/api/v1/mateen/experience',
    response: {
      status: 200,
      data: [
        {
          company: "Upwork",
          title: "Top Rated Frontend Web Developer",
          duration: "March 2026 - Present",
          achievements: [
            "Engineered scalable Next.js architectures",
            "Built automated web scraping pipelines using Python & Playwright",
            "Delivered premium UI/UX for global clients"
          ]
        }
      ]
    }
  },
  {
    id: 'skills',
    method: 'GET',
    path: '/api/v1/mateen/skills?category=backend',
    response: {
      status: 200,
      data: {
        category: "backend",
        technologies: [
          "Python",
          "Playwright",
          "Django",
          "FastAPI",
          "PostgreSQL",
          "REST APIs"
        ]
      }
    }
  }
];

export default function ApiSandbox() {
  const [activeEndpointId, setActiveEndpointId] = useState(endpoints[0].id);
  const [requestState, setRequestState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [responseTime, setResponseTime] = useState(0);
  const [liveData, setLiveData] = useState<any>(null);

  const activeEndpoint = endpoints.find(e => e.id === activeEndpointId)!;

  
  const handleSend = async () => {
    if (requestState === 'loading') return;
    
    setRequestState('loading');
    const start = Date.now();
    
    try {
      if (activeEndpoint.path === '/api/projects') {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setLiveData(data);
      } else {
        // Fallback for mock endpoints
        await new Promise(r => setTimeout(r, Math.floor(Math.random() * 400) + 300));
        setLiveData(activeEndpoint.response);
      }
    } catch (e) {
      setLiveData({ error: "Failed to fetch" });
    }
    
    setResponseTime(Date.now() - start);
    setRequestState('success');
  };

  const handleSelect = (id: string) => {
    setActiveEndpointId(id);
    setRequestState('idle');
    setResponseTime(0);
  };

  return (
    <div className="w-full rounded-3xl border border-white/10 hover:border-emerald-500/30 bg-white/[0.02] backdrop-blur-md shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] overflow-hidden flex flex-col flex-col lg:flex-row min-h-[600px] lg:min-h-[500px] transition-all duration-700">
      
      {/* Sidebar - Endpoints */}
      <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/20 p-4">
        <div className="flex items-center gap-2 text-neutral-400 mb-6 px-2 uppercase text-xs font-bold tracking-wider">
          <Server className="w-4 h-4" /> Endpoints
        </div>
        
        <div className="space-y-2">
          {endpoints.map((ep) => (
            <button
              key={ep.id}
              onClick={() => handleSelect(ep.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-mono transition-colors flex flex-col gap-1 ${
                activeEndpointId === ep.id 
                  ? 'bg-white/10 text-white' 
                  : 'text-neutral-500 hover:bg-white/5 hover:text-neutral-300'
              }`}
            >
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase w-max ${
                ep.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
              }`}>
                {ep.method}
              </span>
              <span className="truncate">{ep.path.split('/').pop()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Sandbox Area */}
      <div className="flex-1 flex flex-col bg-transparent">
        
        {/* URL Bar */}
        <div className="p-4 border-b border-white/10 bg-black/10 flex items-center gap-4">
          <div className="flex-1 flex items-center bg-transparent border border-white/10 rounded-lg overflow-hidden">
            <span className="px-4 py-2 bg-white/5 text-blue-400 font-mono text-sm font-bold border-r border-white/10">
              {activeEndpoint.method}
            </span>
            <span className="px-4 py-2 text-neutral-300 font-mono text-sm truncate flex-1">
              https://mateen.dev{activeEndpoint.path}
            </span>
          </div>
          <button 
            onClick={handleSend}
            disabled={requestState === 'loading'}
            className="px-6 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 rounded-full font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <PlayCircle className="w-4 h-4" />
            Send
          </button>
        </div>

        {/* Response Area */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 text-xs font-mono text-neutral-500">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4" /> Response Body
            </div>
            
            {requestState === 'success' && (
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-3 h-3" /> 200 OK
                </span>
                <span className="flex items-center gap-1 text-blue-400">
                  <Clock className="w-3 h-3" /> {responseTime}ms
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 bg-transparent rounded-xl border border-white/10 p-4 overflow-auto font-mono text-sm relative">
            {requestState === 'idle' && (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
                Click &quot;Send&quot; to fetch data.
              </div>
            )}
            
            {requestState === 'loading' && (
              <div className="absolute inset-0 flex items-center justify-center text-emerald-500">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Server className="w-6 h-6" />
                </motion.div>
              </div>
            )}

            {requestState === 'success' && (
              <motion.pre 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-neutral-300"
              >
                {JSON.stringify(activeEndpoint.response.data, null, 2)}
              </motion.pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

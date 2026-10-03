"use client";
import { useState } from 'react';
import { Database, Play, Terminal, Table as TableIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_DB: Record<string, unknown[]> = {
  experience: [
    { id: 1, role: "Frontend & Automation Engineer", company: "After Concept", year: "2026 - Present", type: "Full-Stack" }
  ],
  projects: [
    { id: 1, name: "After Concept", type: "Agency Website", stack: "HTML, CSS, JS", category: "company" },
    { id: 2, name: "BookShelf Online", type: "E-Commerce", stack: "Tailwind, JS", category: "company" },
    { id: 3, name: "Lahore Gates Cafe", type: "Restaurant", stack: "Bootstrap, JS", category: "company" },
    { id: 4, name: "Snack Spot", type: "Food & Beverage", stack: "Tailwind, JS", category: "company" },
    { id: 5, name: "Gossip Cafe", type: "Cafe", stack: "Bootstrap, JS", category: "company" },
    { id: 6, name: "Currency Converter", type: "Utility App", stack: "APIs, JS", category: "personal" },
    { id: 7, name: "1stop Furniture Scraper", type: "Web Scraper", stack: "Python, Scraping", category: "personal" },
    { id: 8, name: "Land Design Intelligence", type: "Data Pipeline", stack: "Django, Playwright", category: "personal" }
  ],
  skills: [
    { id: 1, name: "React & Next.js", category: "frontend", proficiency: "Expert" },
    { id: 2, name: "TypeScript & JS", category: "frontend", proficiency: "Expert" },
    { id: 3, name: "Python & Django", category: "backend", proficiency: "Advanced" },
    { id: 4, name: "Playwright", category: "automation", proficiency: "Advanced" },
    { id: 5, name: "Tailwind CSS", category: "frontend", proficiency: "Expert" },
    { id: 6, name: "PostgreSQL", category: "database", proficiency: "Intermediate" }
  ]
};

const SUGGESTED_QUERIES = [
  "SELECT * FROM experience",
  "SELECT * FROM projects WHERE category = 'backend'",
  "SELECT * FROM skills WHERE category = 'frontend'"
];

export default function SqlPlayground() {
  const [query, setQuery] = useState(SUGGESTED_QUERIES[0]);
  const [results, setResults] = useState<Record<string, unknown>[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const executeQuery = () => {
    setIsExecuting(true);
    setError(null);
    setResults(null);

    setTimeout(() => {
      try {
        const sql = query.trim();
        // Super simple regex parser for demonstration
        const match = sql.match(/SELECT\s+\*\s+FROM\s+(\w+)(?:\s+WHERE\s+(\w+)\s*=\s*'([^']+)')?/i);
        
        if (!match) {
          throw new Error("SyntaxError: Only basic SELECT * FROM table [WHERE col = 'val'] supported in sandbox.");
        }

        const table = match[1].toLowerCase();
        const whereCol = match[2];
        const whereVal = match[3];

        if (!MOCK_DB[table]) {
          throw new Error(`RelationError: relation "${table}" does not exist.`);
        }

        let data = [...MOCK_DB[table]] as Record<string, unknown>[];

        if (whereCol && whereVal) {
          data = data.filter(row => row[whereCol] === whereVal);
        }

        setResults(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setIsExecuting(false);
      }
    }, 600); // Simulate network/DB latency
  };

  const columns = results && results.length > 0 ? Object.keys(results[0]) : [];

  return (
    <div className="w-full rounded-3xl border border-white/10 hover:border-emerald-500/30 bg-white/[0.02] backdrop-blur-md shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] overflow-hidden flex flex-col min-h-[500px] transition-all duration-700">
      
      {/* DB Header */}
      <div className="h-14 bg-transparent border-b border-white/10 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3 text-neutral-300 font-bold tracking-wider uppercase text-sm">
          <Database className="w-5 h-5 text-blue-400" /> PostgreSQL Studio
        </div>
        <div className="flex gap-2">
          {Object.keys(MOCK_DB).map(table => (
            <span key={table} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-neutral-400">
              <TableIcon className="w-3 h-3 inline mr-1" />{table}
            </span>
          ))}
        </div>
      </div>

      {/* Query Editor */}
      <div className="p-6 border-b border-white/10 bg-black/10">
        <div className="flex gap-4 items-start">
          <div className="flex-1 bg-transparent border border-white/10 rounded-lg p-1 shadow-inner relative font-mono text-sm">
            <div className="absolute top-3 left-3 text-neutral-500 select-none">1</div>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-emerald-400 pl-10 py-3 pr-4 outline-none resize-none min-h-[80px]"
              spellCheck="false"
            />
          </div>
          <button 
            onClick={executeQuery}
            disabled={isExecuting}
            className="px-6 py-4 bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 rounded-full font-bold transition-colors flex items-center gap-2 disabled:opacity-50 h-[80px]"
          >
            <Play className="w-5 h-5" /> Run
          </button>
        </div>

        {/* Suggested Queries */}
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="text-xs text-neutral-500 uppercase font-bold py-1 px-2">Try:</span>
          {SUGGESTED_QUERIES.map((q, i) => (
            <button 
              key={i}
              onClick={() => setQuery(q)}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs font-mono text-neutral-400 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Results Pane */}
      <div className="flex-1 bg-transparent p-6 relative overflow-auto">
        <div className="flex items-center gap-2 text-neutral-500 mb-4 font-mono text-xs uppercase tracking-wider font-bold">
          <Terminal className="w-4 h-4" /> Query Results
        </div>

        <AnimatePresence mode="wait">
          {isExecuting && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-3 text-blue-500">
                <Database className="w-8 h-8 animate-pulse" />
                <span className="font-mono text-sm">Executing query...</span>
              </div>
            </motion.div>
          )}

          {!isExecuting && error && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg font-mono text-sm"
            >
              {error}
            </motion.div>
          )}

          {!isExecuting && results && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            >
              {results.length === 0 ? (
                <div className="text-neutral-500 font-mono text-sm">0 rows returned.</div>
              ) : (
                <div className="overflow-x-auto w-full"><table className="w-full text-left text-sm text-neutral-300 border-collapse">
                  <thead className="bg-white/5 text-neutral-400 font-mono text-xs uppercase">
                    <tr>
                      {columns.map(col => (
                        <th key={col} className="px-4 py-3 border border-white/10 font-medium">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        {columns.map(col => (
                          <td key={col} className="px-4 py-3 border border-white/10 font-mono text-emerald-400">
                            {String(row[col])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table></div>
              )}
              <div className="mt-4 text-xs text-neutral-500 font-mono">
                {results.length} row(s) returned.
              </div>
            </motion.div>
          )}

          {!isExecuting && !results && !error && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center text-neutral-600 font-mono text-sm"
            >
              No active query. Press &quot;Run&quot; to execute.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

"use client";
import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MousePointer2, Terminal, Database, PlayCircle, ShoppingCart } from 'lucide-react';

const FAKE_PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: "$99.99", stock: "In Stock" },
  { id: 2, name: "Mechanical Keyboard", price: "$149.50", stock: "Low Stock" },
  { id: 3, name: "4K Monitor", price: "$329.00", stock: "Out of Stock" },
  { id: 4, name: "Ergonomic Mouse", price: "$59.99", stock: "In Stock" },
];

export default function PlaywrightSimulator() {
  const [isScraping, setIsScraping] = useState(false);
  const [scrapedData, setScrapedData] = useState<typeof FAKE_PRODUCTS>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const cursorControls = useAnimation();

  const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

  const runSimulation = async () => {
    if (isScraping) return;
    setIsScraping(true);
    setScrapedData([]);
    setLogs([]);

    // 1. Init
    addLog("> playwright.chromium.launch({ headless: false })");
    await new Promise(r => setTimeout(r, 800));
    addLog("> page.goto('https://mock-ecommerce.dev')");
    await cursorControls.start({ x: 50, y: 50, opacity: 1, transition: { duration: 1 } });
    
    // 2. Hover over first item
    await new Promise(r => setTimeout(r, 500));
    await cursorControls.start({ x: 100, y: 150, transition: { duration: 0.8, ease: "easeInOut" } });
    addLog("> const products = await page.locator('.product-card').all()");
    
    // 3. Extract item 1 & 2
    await new Promise(r => setTimeout(r, 600));
    await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } }); // click
    await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
    setScrapedData(prev => [...prev, FAKE_PRODUCTS[0]]);
    addLog(`> Extracted: ${FAKE_PRODUCTS[0].name}`);

    await cursorControls.start({ x: 300, y: 150, transition: { duration: 0.6, ease: "easeInOut" } });
    await new Promise(r => setTimeout(r, 400));
    setScrapedData(prev => [...prev, FAKE_PRODUCTS[1]]);
    addLog(`> Extracted: ${FAKE_PRODUCTS[1].name}`);

    // 4. Scroll / Move to next row
    await cursorControls.start({ x: 100, y: 280, transition: { duration: 0.8, ease: "easeInOut" } });
    await new Promise(r => setTimeout(r, 500));
    setScrapedData(prev => [...prev, FAKE_PRODUCTS[2]]);
    addLog(`> Extracted: ${FAKE_PRODUCTS[2].name}`);

    // 5. Final item
    await cursorControls.start({ x: 300, y: 280, transition: { duration: 0.6, ease: "easeInOut" } });
    await new Promise(r => setTimeout(r, 400));
    setScrapedData(prev => [...prev, FAKE_PRODUCTS[3]]);
    addLog(`> Extracted: ${FAKE_PRODUCTS[3].name}`);
    
    // 6. Finish
    await new Promise(r => setTimeout(r, 600));
    await cursorControls.start({ x: -20, y: -20, opacity: 0, transition: { duration: 0.5 } });
    addLog("> await browser.close()");
    addLog("> [SUCCESS] Pipeline finished. 4 rows added to DB.");
    
    setTimeout(() => {
      setIsScraping(false);
    }, 1500);
  };

  return (
    <div className="w-full rounded-3xl border border-white/10 hover:border-emerald-500/30 bg-white/[0.02] backdrop-blur-md shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] overflow-hidden flex flex-col xl:flex-row min-h-[500px] transition-all duration-700">
      
      {/* Left Pane: Simulated Browser */}
      <div className="flex-1 border-b xl:border-b-0 xl:border-r border-white/10 flex flex-col relative overflow-hidden bg-white/5">
        
        {/* Browser Header */}
        <div className="h-12 bg-white/10 border-b border-white/20 flex items-center px-4 gap-4 w-full">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white/5 border border-white/20 rounded-md h-7 flex items-center px-3 text-xs text-neutral-400 font-mono shadow-sm">
            https://mock-ecommerce.dev/products
          </div>
        </div>

        {/* Browser Content */}
        <div className="p-6 grid grid-cols-2 gap-4 relative flex-1 text-white">
          {/* Ghost Cursor */}
          <motion.div 
            initial={{ x: -20, y: -20, opacity: 0 }}
            animate={cursorControls}
            className="absolute z-50 text-emerald-500 drop-shadow-md pointer-events-none"
          >
            <MousePointer2 className="w-8 h-8 fill-emerald-500" />
          </motion.div>

          {/* Fake Products */}
          {FAKE_PRODUCTS.map((p) => (
            <div key={p.id} className="border border-white/10 rounded-lg p-4 flex flex-col justify-between shadow-sm bg-white/5">
              <div className="w-full h-24 bg-white/10 rounded-md flex items-center justify-center mb-3">
                <ShoppingCart className="w-8 h-8 text-neutral-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">{p.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-600 font-bold">{p.price}</span>
                  <span className="text-[10px] bg-white/10 px-2 py-1 rounded-full text-neutral-400 uppercase font-bold">{p.stock}</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Overlay when not running */}
          {!isScraping && scrapedData.length === 0 && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px] flex items-center justify-center z-40">
              <button 
                onClick={runSimulation}
                className="px-6 py-3 bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded-full font-bold shadow-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5" /> Initialize Scraper
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Pane: Logs & Data */}
      <div className="flex-1 flex flex-col bg-black/20">
        
        {/* Extracted Data Table */}
        <div className="flex-1 p-6 overflow-auto border-b border-white/10 relative">
          <div className="flex items-center gap-2 text-neutral-400 mb-4 font-mono text-sm uppercase tracking-wider font-bold">
            <Database className="w-4 h-4" /> Postgres DB (Extracted)
          </div>
          
          <div className="overflow-x-auto w-full"><table className="w-full text-left text-sm text-neutral-300">
            <thead className="text-xs text-neutral-400 uppercase bg-white/5">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">ID</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3 rounded-tr-lg">Price</th>
              </tr>
            </thead>
            <tbody>
              {scrapedData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-neutral-600 border-b border-white/5">
                    No data extracted yet. Waiting for pipeline...
                  </td>
                </tr>
              ) : (
                scrapedData.map((item) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={item.id} 
                    className="border-b border-white/5 bg-white/[0.02]"
                  >
                    <td className="px-4 py-3 font-mono">{item.id}</td>
                    <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                    <td className="px-4 py-3 text-emerald-400 font-mono">{item.price}</td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table></div>
        </div>

        {/* Playwright Terminal logs */}
        <div className="h-48 bg-[#0D1117] p-4 overflow-auto font-mono text-xs flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-neutral-400 mb-2 font-bold uppercase tracking-wider">
            <Terminal className="w-4 h-4" /> Playwright Execution Logs
          </div>
          {logs.map((log, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              key={i} 
              className={log.includes('SUCCESS') ? 'text-emerald-400' : 'text-blue-300'}
            >
              {log}
            </motion.div>
          ))}
          {isScraping && (
            <motion.div 
              animate={{ opacity: [1, 0.5, 1] }} 
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-neutral-400"
            >
              _
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}

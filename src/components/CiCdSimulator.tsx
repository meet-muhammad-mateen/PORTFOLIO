"use client";
import { useState, useEffect, useRef } from 'react';
import { PlayCircle, AlertCircle, CheckCircle, Circle, RefreshCcw, GitBranch, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

type StepStatus = 'pending' | 'running' | 'success' | 'failed';

interface PipelineStep {
  id: string;
  name: string;
  duration: number;
}

const STEPS: PipelineStep[] = [
  { id: 'lint', name: 'ESLint & Typecheck', duration: 1200 },
  { id: 'test', name: 'pytest (Scrapers)', duration: 1800 },
  { id: 'build', name: 'next build', duration: 2500 },
  { id: 'deploy', name: 'Deploy to Production', duration: 1500 },
];

export default function CiCdSimulator() {
  const [pipelineState, setPipelineState] = useState<'idle' | 'running' | 'failed' | 'rolling_back' | 'success'>('idle');
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>({
    lint: 'pending',
    test: 'pending',
    build: 'pending',
    deploy: 'pending'
  });
  const [logs, setLogs] = useState<string[]>([]);
  
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollTop = logsEndRef.current.scrollHeight;
    }
  }, [logs]);

  const resetPipeline = () => {
    setPipelineState('idle');
    setStepStatuses({ lint: 'pending', test: 'pending', build: 'pending', deploy: 'pending' });
    setLogs([]);
    
  };

  const runPipeline = async (failTriggered: boolean) => {
    if (pipelineState !== 'idle') return;
    
    
    setPipelineState('running');
    setStepStatuses({ lint: 'pending', test: 'pending', build: 'pending', deploy: 'pending' });
    setLogs([]);

    addLog("system: Triggered via GitHub webhook");
    addLog("system: Preparing job 'build-and-deploy'");

    for (let i = 0; i < STEPS.length; i++) {
      const step = STEPS[i];
      
      setStepStatuses(prev => ({ ...prev, [step.id]: 'running' }));
      addLog(`[${step.name}] Starting...`);

      // If this is the test step and we are supposed to fail
      if (failTriggered && step.id === 'test') {
        await new Promise(r => setTimeout(r, 1000));
        setStepStatuses(prev => ({ ...prev, [step.id]: 'failed' }));
        addLog(`[${step.name}] ERROR: AssertionError: Expected 200, got 500`);
        addLog(`[${step.name}] Traceback (most recent call last):`);
        addLog(`  File "tests/test_scraper.py", line 42, in test_extraction`);
        addLog(`    assert len(data) > 0`);
        addLog(`[${step.name}] Failed with exit code 1`);
        
        setPipelineState('failed');
        
        // Initiate rollback after 2 seconds
        await new Promise(r => setTimeout(r, 2000));
        setPipelineState('rolling_back');
        addLog("system: CRITICAL FAILURE DETECTED. Initiating auto-rollback...");
        await new Promise(r => setTimeout(r, 1500));
        addLog("system: Rolled back to previous stable commit (a4f9c2d).");
        addLog("system: Pipeline aborted.");
        
        setTimeout(() => {
          resetPipeline();
        }, 5000); // reset after a while
        return;
      }

      // Normal success step
      await new Promise(r => setTimeout(r, step.duration));
      setStepStatuses(prev => ({ ...prev, [step.id]: 'success' }));
      addLog(`[${step.name}] Completed successfully in ${step.duration}ms`);
    }

    setPipelineState('success');
    addLog("system: Deployment successful. https://mateen.dev is live.");
    
    setTimeout(() => {
      resetPipeline();
    }, 6000);
  };

  return (
    <div className="w-full rounded-3xl border border-white/10 hover:border-emerald-500/30 bg-white/[0.02] backdrop-blur-md shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] overflow-hidden flex flex-col flex-col lg:flex-row min-h-[700px] lg:min-h-[500px] transition-all duration-700">
      
      {/* Left Pane - Workflow Visualization */}
      <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/10 p-4 md:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-neutral-300 font-bold tracking-wider text-lg">
            <GitBranch className="w-6 h-6" /> GitHub Actions
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => runPipeline(false)}
              disabled={pipelineState !== 'idle'}
              className="px-4 py-2 bg-emerald-600/20 text-emerald-500 border border-emerald-500/30 hover:bg-emerald-600/30 rounded-full text-sm px-5 font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <PlayCircle className="w-4 h-4" /> Deploy
            </button>
            <button 
              onClick={() => runPipeline(true)}
              disabled={pipelineState !== 'idle'}
              className="px-4 py-2 bg-red-600/20 text-red-500 border border-red-500/30 hover:bg-red-600/30 rounded-full text-sm px-5 font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <AlertCircle className="w-4 h-4" /> Break Build
            </button>
          </div>
        </div>

        {/* The Pipeline Nodes */}
        <div className="flex-1 flex flex-col justify-center relative">
          
          {/* Vertical connection line */}
          <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-white/10 -z-10" />

          {STEPS.map((step, idx) => {
            const status = stepStatuses[step.id];
            return (
              <div key={step.id} className="flex items-center gap-6 mb-8 last:mb-0 relative z-10">
                <div className="relative flex items-center justify-center w-12 h-12">
                  <div className={`absolute inset-0 rounded-full transition-colors ${
                    status === 'running' ? 'bg-blue-500/20 animate-ping' : ''
                  }`} />
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center bg-black/10 transition-colors ${
                    status === 'success' ? 'border-emerald-500 text-emerald-500' :
                    status === 'failed' ? 'border-red-500 text-red-500' :
                    status === 'running' ? 'border-blue-500 text-blue-500' :
                    'border-neutral-600 text-neutral-600'
                  }`}>
                    {status === 'success' ? <CheckCircle className="w-6 h-6" /> :
                     status === 'failed' ? <AlertCircle className="w-6 h-6" /> :
                     status === 'running' ? <RefreshCcw className="w-5 h-5 animate-spin" /> :
                     <Circle className="w-6 h-6" />}
                  </div>
                </div>
                
                <div className="flex-1 border border-white/5 bg-white/[0.02] rounded-lg p-4 transition-colors">
                  <h4 className={`font-bold text-lg ${
                    status === 'success' ? 'text-emerald-400' :
                    status === 'failed' ? 'text-red-400' :
                    status === 'running' ? 'text-blue-400' :
                    'text-neutral-400'
                  }`}>{step.name}</h4>
                  <p className="text-sm font-mono text-neutral-500">
                    {status === 'pending' ? 'Waiting...' : 
                     status === 'running' ? 'In progress...' : 
                     status === 'failed' ? 'Failed in ' + (step.id === 'test' ? '1s' : '0s') :
                     `Completed in ${(step.duration / 1000).toFixed(1)}s`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Pane - Logs */}
      <div className="w-full md:w-1/2 bg-transparent flex flex-col relative">
        <div className="h-12 border-b border-white/10 bg-black/10 flex items-center px-4 font-mono text-xs text-neutral-400 gap-2 font-bold uppercase tracking-wider">
          <Terminal className="w-4 h-4" /> runner-logs
        </div>
        
        <div ref={logsEndRef} className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed max-h-[500px]">
          {pipelineState === 'idle' && logs.length === 0 && (
            <div className="text-neutral-600 h-full flex items-center justify-center text-center">
              Waiting for deployment trigger...<br/>
              Click &quot;Deploy&quot; to simulate a successful build, or &quot;Break Build&quot; to simulate a test failure and auto-rollback.
            </div>
          )}

          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-1 ${
                log.includes('CRITICAL') || log.includes('ERROR') || log.includes('Failed') ? 'text-red-400' :
                log.includes('successfully') || log.includes('Rolled back') || log.includes('live') ? 'text-emerald-400' :
                log.includes('system:') ? 'text-neutral-500' :
                'text-neutral-300'
              }`}
            >
              {log}
            </motion.div>
          ))}

          {pipelineState === 'running' && (
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-blue-500 mt-2">
              _
            </motion.div>
          )}

          {pipelineState === 'rolling_back' && (
            <div className="absolute inset-0 bg-red-900/10 border-2 border-red-500/50 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-[2px] z-20">
              <AlertCircle className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold text-red-500 mb-2">Build Failed</h3>
              <p className="text-red-400/80 text-center font-mono text-sm max-w-sm">
                Safety protocols engaged. Automatically reverting production to previous stable commit.
              </p>
            </div>
          )}
          
          {pipelineState === 'success' && (
            <div className="absolute inset-0 bg-emerald-900/10 border-2 border-emerald-500/50 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-[2px] z-20">
              <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
              <h3 className="text-2xl font-bold text-emerald-500 mb-2">Deployed to Production</h3>
              <p className="text-emerald-400/80 text-center font-mono text-sm max-w-sm">
                Pipeline completed successfully. Code is now live.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

"use client";
import { useState, useRef, useEffect } from 'react';
import { GripVertical } from 'lucide-react';

export default function DataSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMove = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const rawHtml = `<div class="product-wrapper" data-id="84920">
  <h2 class="title-text dirty-class   ">
    <span>Sony WH-1000XM4</span>
  </h2>
  <div class="price-container">
    <span class="currency">$</span>
    <span class="value">348.00</span>
    <span class="discount" style="display:none;">-10%</span>
  </div>
  <!-- tracking pixel -->
  <img src="tracker.gif" width="1" height="1" />
  <div class="metadata">
    Stock: IN_STOCK_12
    Ref: XYZ-998
  </div>
</div>`;

  return (
    <div 
      ref={containerRef}
      className="group w-full rounded-3xl border border-white/10 hover:border-emerald-500/30 bg-white/[0.02] backdrop-blur-md shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] overflow-hidden relative min-h-[400px] select-none touch-none transition-all duration-700"
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
    >
      {/* Background (Clean Data) */}
      <div className="absolute inset-0 bg-[#0A0A0A] p-4 md:p-8 flex flex-col justify-center">
        <h3 className="text-emerald-400 font-mono text-sm mb-4 uppercase tracking-wider font-bold">Clean Data (Pandas/PostgreSQL)</h3>
        <div className="overflow-x-auto w-full"><table className="w-full text-left text-sm text-neutral-300 border-collapse max-w-3xl">
          <thead className="bg-white/5 text-neutral-400 font-mono text-xs uppercase">
            <tr>
              <th className="px-4 py-3 border border-white/10">product_id</th>
              <th className="px-4 py-3 border border-white/10">name</th>
              <th className="px-4 py-3 border border-white/10">price_usd</th>
              <th className="px-4 py-3 border border-white/10">in_stock</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white/5">
              <td className="px-4 py-3 border border-white/10 font-mono">84920</td>
              <td className="px-4 py-3 border border-white/10 font-medium text-white">Sony WH-1000XM4</td>
              <td className="px-4 py-3 border border-white/10 font-mono text-emerald-400">348.00</td>
              <td className="px-4 py-3 border border-white/10 font-mono text-blue-400">true</td>
            </tr>
          </tbody>
        </table></div>
        <div className="mt-6 text-neutral-500 font-mono text-xs">
          &gt; Cleaned 12 anomalies<br/>
          &gt; Cast string &quot;348.00&quot; to float<br/>
          &gt; Mapped &quot;IN_STOCK_12&quot; to boolean true<br/>
          &gt; Data normalized and ready for frontend consumption.
        </div>
      </div>

      {/* Foreground (Messy Data) */}
      <div 
        className="absolute inset-0 bg-[#0A0A0A] p-4 md:p-8 border-r-2 border-white/20 flex flex-col justify-center overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <div className="w-full min-w-full md:min-w-[800px]">
          <h3 className="text-red-400 font-mono text-sm mb-4 uppercase tracking-wider font-bold">Raw Scraped DOM (Playwright)</h3>
          <pre className="text-neutral-500 font-mono text-xs whitespace-pre-wrap">
            {rawHtml}
          </pre>
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center hover:w-1.5"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="w-10 h-14 bg-white text-black flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.8)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] group-hover:text-emerald-600 transition-all duration-500 pointer-events-none hover:scale-110 transition-transform">
          <GripVertical className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

interface CursorMetadata {
  category: string;
  services: string[];
}

export const CustomCursor: React.FC<{ activeData: CursorMetadata | null }> = ({ activeData }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!activeData) return null;

  return (
    <div
      className="fixed z-[90] pointer-events-none hidden md:block transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x + 18}px`,
        top: `${pos.y + 18}px`,
      }}
    >
      <div className="bg-[#141414]/95 border border-[#E30613]/40 rounded-xl p-3.5 shadow-2xl backdrop-blur-md max-w-xs">
        <span className="block text-[10px] font-mono font-bold tracking-widest text-[#E30613] uppercase mb-1">
          {activeData.category}
        </span>
        <p className="text-[11px] font-medium tracking-wider text-[#F3F4EF] uppercase leading-tight">
          {activeData.services.join(' · ')}
        </p>
      </div>
    </div>
  );
};

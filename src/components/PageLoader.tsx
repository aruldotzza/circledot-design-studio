import React from 'react';

export const PageLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full bg-white dark:bg-[#0C0C0C] transition-colors duration-300">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Circle Dot */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-[#222222]"></div>
          <div className="absolute inset-0 rounded-full border-2 border-t-[#E30613] animate-spin"></div>
          <div className="w-3 h-3 rounded-full bg-[#E30613]"></div>
        </div>
        <span className="text-xs font-mono tracking-widest text-gray-500 dark:text-[#A5A8A1] uppercase">
          Loading...
        </span>
      </div>
    </div>
  );
};

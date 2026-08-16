import React from 'react';

interface LiveProjectButtonProps {
  className?: string;
  onClick?: () => void;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ className = '', onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center ${className}`}
    >
      Live Project
    </button>
  );
};

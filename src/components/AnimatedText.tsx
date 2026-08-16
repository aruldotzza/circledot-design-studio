import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char: React.FC<CharProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline">
      {children}
    </motion.span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');
  const totalChars = characters.length;

  return (
    <p
      ref={containerRef}
      className={`text-[#333333] font-medium text-center leading-relaxed max-w-[560px] ${className}`}
      style={{
        fontSize: 'clamp(1rem, 2vw, 1.35rem)',
      }}
    >
      {characters.map((char, i) => {
        const start = i / totalChars;
        const end = start + 1 / totalChars;

        return (
          <Char key={i} progress={scrollYProgress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </p>
  );
};

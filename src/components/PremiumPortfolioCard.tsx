import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

export type PortfolioCardItem = {
  label: string;
  number: string;
  title: string;
  description: string;
  image: string;
};

export const portfolioCardData: PortfolioCardItem[] = [
  {
    label: 'PILLAR',
    number: '01',
    title: 'MULTI-TENANT CLOUD INFRASTRUCTURE',
    description: 'Dark-mode telemetry dashboards for high-density engineering environments.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'PILLAR',
    number: '02',
    title: 'AI OPERATIONS COMMAND CENTER',
    description: 'Editorial system design for live workflow visibility and automation decisions.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'PILLAR',
    number: '03',
    title: 'FINTECH STRATEGY PLATFORM',
    description: 'Luxury UX for modern wealth operations and portfolio intelligence.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  },
];

type MagneticSquareProps = {
  left: number;
  top: number;
  size: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  intensity?: number;
};

const MagneticSquare: React.FC<MagneticSquareProps> = ({
  left,
  top,
  size,
  pointerX,
  pointerY,
  intensity = 1,
}) => {
  const x = useTransform(pointerX, [0, 1], [-(size * 0.9 * intensity), size * 0.9 * intensity]);
  const y = useTransform(pointerY, [0, 1], [-(size * 0.8 * intensity), size * 0.8 * intensity]);

  const smoothX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const smoothY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });

  return (
    <motion.div
      className="absolute rounded-[2px] bg-[#E50000] shadow-[0_0_22px_rgba(229,0,0,0.75)]"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        x: smoothX,
        y: smoothY,
      }}
    />
  );
};

type PixelOverlayProps = {
  isHovered: boolean;
};

const PixelOverlay: React.FC<PixelOverlayProps> = ({ isHovered }) => {
  const rows = 8;
  const cols = 12;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: rows * cols }).map((_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;

        const delayIn = (row + col) * 0.018;
        const delayOut = (8 - row + (12 - col)) * 0.012;

        return (
          <motion.span
            key={`${row}-${col}`}
            className="absolute block bg-black/75"
            style={{
              left: `${(col / cols) * 100}%`,
              top: `${(row / rows) * 100}%`,
              width: `calc(${100 / cols}% - 1px)`,
              height: `calc(${100 / rows}% - 1px)`,
            }}
            animate={
              isHovered
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
              delay: isHovered ? delayIn : delayOut,
            }}
          />
        );
      })}
    </div>
  );
};

type PremiumPortfolioCardProps = {
  item: PortfolioCardItem;
  index: number;
};

export const PremiumPortfolioCard: React.FC<PremiumPortfolioCardProps> = ({
  item,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    pointerX.set(Math.min(Math.max(px, 0), 1));
    pointerY.set(Math.min(Math.max(py, 0), 1));
  };

  const resetPointer = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const squareSet = [
    { left: 9, top: 12, size: 20, intensity: 1 },
    { left: 20, top: 28, size: 28, intensity: 1.1 },
    { left: 66, top: 18, size: 24, intensity: 0.95 },
    { left: 78, top: 42, size: 30, intensity: 1.2 },
    { left: 55, top: 68, size: 18, intensity: 0.9 },
  ];

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        setIsHovered(false);
        resetPointer();
      }}
      onPointerEnter={() => setIsHovered(true)}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#111315] shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[26px]">
        <motion.img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_36%)]" />

        <PixelOverlay isHovered={isHovered} />

        {squareSet.map((square, i) => (
          <MagneticSquare
            key={`${item.title}-${i}`}
            left={square.left}
            top={square.top}
            size={square.size}
            pointerX={pointerX}
            pointerY={pointerY}
            intensity={square.intensity}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label={`View ${item.title}`}
        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/30 text-xl text-white backdrop-blur-md transition-transform duration-300 hover:scale-105"
      >
        <span className="leading-none">+</span>
      </button>

      <motion.div
        className="absolute bottom-0 left-0 z-20 max-w-[74%] rounded-tr-[20px] border border-white/10 bg-[#0b0d0f]/70 p-4 pb-5 backdrop-blur-md"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-2 text-[10px] font-medium tracking-[0.24em] text-[#E50000] uppercase">
          {item.label} // {item.number}
        </div>
        <h3 className="max-w-[18rem] text-[1.2rem] font-medium uppercase leading-[1.08] tracking-[-0.04em] text-white">
          {item.title}
        </h3>
        <p className="mt-2 max-w-[18rem] text-[0.72rem] leading-5 text-[#b7bdc5]">
          {item.description}
        </p>
      </motion.div>
    </motion.article>
  );
};

export const PremiumPortfolioShowcase: React.FC = () => {
  return (
    <section className="w-full bg-[#0a0d0f] px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 xl:grid-cols-3">
        {portfolioCardData.map((item, index) => (
          <PremiumPortfolioCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default PremiumPortfolioShowcase;

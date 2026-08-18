import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { CustomCursor } from '../components/CustomCursor';
import { LazyImage } from '../components/LazyImage';

const CircleDotSculpture = React.lazy(() => import('../components/CircleDotSculpture').then(module => ({ default: module.CircleDotSculpture })));
import { ArrowUpRight, ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectItemData {
  id: string;
  number: string;
  title: string;
  industry: string;
  services: string[];
  category: string;
  description: string;
  image: string;
  bgGradient: string;
}

// Reusable Stacking Project Card Component (Large & Immersive Vertical Layout)
const StackingProjectCard: React.FC<{
  project: ProjectItemData;
  index: number;
  totalProjects: number;
  onHover: (data: { category: string; services: string[] } | null) => void;
  onSelect: () => void;
}> = ({ project, index, totalProjects, onHover, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalProjects - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[80vh] sm:h-[82vh] flex items-center justify-center sticky"
      style={{
        top: `calc(11.5rem + ${index * 20}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        onMouseEnter={() => onHover({ category: project.category, services: project.services })}
        onMouseLeave={() => onHover(null)}
        onClick={onSelect}
        className="group relative w-full max-w-6xl rounded-[32px] sm:rounded-[44px] bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#222222] hover:border-[#E30613] dark:hover:border-[#E30613] transition-all p-5 sm:p-8 flex flex-col justify-between shadow-xl dark:shadow-2xl overflow-hidden cursor-pointer"
      >
        {/* Background Ambient Color Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} opacity-20 dark:opacity-40 group-hover:opacity-50 transition-opacity pointer-events-none`}></div>

        {/* Top Header Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-[#222222]">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-mono text-3xl sm:text-5xl font-bold text-[#E30613]">
              {project.number}
            </span>
            <div>
              <span className="px-3.5 py-1 rounded-full bg-gray-100 dark:bg-[#0C0C0C] text-[11px] font-mono text-[#E30613] border border-gray-200 dark:border-[#222222] inline-block mb-1">
                {project.industry}
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-gray-900 dark:text-[#F3F4EF] group-hover:translate-x-1 transition-transform">
                {project.title}
              </h3>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="px-6 py-2.5 rounded-full bg-gray-100 dark:bg-[#0C0C0C] border border-gray-200 dark:border-[#222222] group-hover:border-[#E30613] text-xs font-mono text-gray-900 dark:text-[#F3F4EF] group-hover:text-[#E30613] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>INSPECT PROJECT</span>
            <ArrowUpRight className="w-4 h-4 text-[#E30613]" />
          </button>
        </div>

        {/* Large Immersive Image Banner Preview */}
        <div className="relative z-10 w-full h-56 sm:h-72 md:h-[340px] my-5 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 dark:border-[#222222] group-hover:border-[#E30613]/50 transition-colors shadow-lg">
          <LazyImage
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 dark:brightness-90 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
          <span className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#0C0C0C]/85 backdrop-blur-md border border-gray-200 dark:border-[#222222] font-mono text-xs text-gray-900 dark:text-[#F3F4EF]">
            CATEGORY: <span className="text-[#E30613] font-bold">{project.category}</span>
          </span>
        </div>

        {/* Card Content & Services Badges (NO SEPARATOR LINE ABOVE CTA) */}
        <div className="relative z-10 flex flex-col justify-between gap-4">
          <p className="text-sm sm:text-lg text-gray-600 dark:text-[#A5A8A1] font-light leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex flex-wrap gap-2">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-[#0C0C0C] border border-gray-200 dark:border-[#222222] text-xs font-mono text-gray-700 dark:text-[#D7E2EA]"
                >
                  {s}
                </span>
              ))}
            </div>

            <span className="text-xs sm:text-sm font-mono text-[#E30613] group-hover:underline font-semibold flex items-center gap-1">
              View Full Breakdown →
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Stacked Why Card Component with Scroll-Triggered Scale Animation
interface WhyCardData {
  num: string;
  title: string;
  desc: string;
  icon: string;
  image: string;
}

const EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PixelOverlay: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const rows = 8;
  const cols = 12;
  const blocks: JSX.Element[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const delayIn = (r + c) * 0.018;
      const delayOut = (8 - r + (12 - c)) * 0.012;

      blocks.push(
        <motion.div
          key={`${r}-${c}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.25,
            delay: isHovered ? delayIn : delayOut,
            ease: EASING,
          }}
          style={{
            left: `${c * (100 / 12)}%`,
            top: `${r * (100 / 8)}%`,
            width: `${100 / 12}%`,
            height: `${100 / 8}%`,
          }}
          className="pointer-events-none absolute bg-black/80"
        />
      );
    }
  }

  return <>{blocks}</>;
};

const MagneticSquare: React.FC<{
  sq: { x: number; y: number; size: number };
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}> = ({ sq, mouseX, mouseY }) => {
  const dx = useTransform(mouseX, [0, 1], [-(sq.x - 50) * 0.6, (sq.x - 50) * 0.6]);
  const dy = useTransform(mouseY, [0, 1], [-(sq.y - 50) * 0.6, (sq.y - 50) * 0.6]);

  const springX = useSpring(dx, { stiffness: 80, damping: 18, mass: 0.6 });
  const springY = useSpring(dy, { stiffness: 80, damping: 18, mass: 0.6 });

  return (
    <motion.div
      style={{
        left: `${sq.x}%`,
        top: `${sq.y}%`,
        width: `${sq.size}px`,
        height: `${sq.size}px`,
        x: springX,
        y: springY,
      }}
      className="pointer-events-none absolute z-10 bg-[#E50000] shadow-[0_0_8px_#E50000] rounded-full"
    />
  );
};

const StackedWhyCard: React.FC<{
  card: WhyCardData;
  index: number;
  totalCards: number;
}> = ({ card, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    mouseX.set(px);
    mouseY.set(py);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const squares = [
    { x: 12, y: 14, size: 20 },
    { x: 28, y: 32, size: 24 },
    { x: 67, y: 18, size: 22 },
    { x: 76, y: 42, size: 28 },
    { x: 58, y: 68, size: 18 },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-[85vh] flex items-start justify-center sticky"
      style={{
        top: `${24 + index * 24}px`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 0.7,
          delay: index * 0.1,
          ease: EASING,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/10 bg-[#111315] shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
      >
        <LazyImage
          src={card.image}
          alt={card.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-[#0C0C0C]/20 to-transparent" />

        <PixelOverlay isHovered={isHovered} />

        {squares.map((sq, sqIndex) => (
          <MagneticSquare key={`${card.title}-${sqIndex}`} sq={sq} mouseX={mouseX} mouseY={mouseY} />
        ))}

        <button
          type="button"
          aria-label={`View ${card.title}`}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/30 text-xl font-medium text-white backdrop-blur-md transition-transform duration-300 hover:scale-105"
        >
          +
        </button>

        <div className="absolute bottom-0 left-0 z-20 max-w-[76%] rounded-tr-[20px] border border-white/10 bg-[#0C0C0C]/80 px-4 pb-4 pt-3 backdrop-blur-md shadow-2xl">
          <span className="mb-1 block text-[10px] font-medium tracking-[0.24em] text-[#E50000] uppercase">
            PILLAR // {card.num}
          </span>
          <h3 className="max-w-[18rem] text-xl font-black uppercase leading-[1.05] tracking-[-0.04em] text-white sm:text-2xl">
            {card.title}
          </h3>
          <p className="mt-1 max-w-[18rem] text-xs leading-5 text-[#D7E2EA]/80 sm:text-sm">
            {card.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const { navigateTo, openEnquiryModal } = useNavigation();
  const [hoveredProject, setHoveredProject] = useState<{ category: string; services: string[] } | null>(null);

  // GSAP ScrollTrigger Setup for Services Section
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const servicesTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = servicesSectionRef.current;
    const track = servicesTrackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Calculate exact scroll distance to move all cards across
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 100);

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 180}`,
          invalidateOnRefresh: true,
        },
      });
    }, servicesSectionRef);

    return () => ctx.revert();
  }, []);

  // Selected Work Projects Data with Representation Images
  const projectsData: ProjectItemData[] = [
    {
      id: 'careflow',
      number: '01',
      title: 'CareFlow',
      industry: 'Healthcare · Concept',
      services: ['Brand', 'UX/UI', 'Product Design', 'Development'],
      category: 'HEALTHCARE',
      description: 'Streamlining clinical workflows and patient triage with a modern digital health platform.',
      image: '/images/projects/careflow.jpg',
      bgGradient: 'from-[#E30613]/20 via-slate-900 to-[#141414]',
    },
    {
      id: 'nivara',
      number: '02',
      title: 'Nivara',
      industry: 'Fintech · Concept',
      services: ['Brand', 'Product Design', 'UX/UI'],
      category: 'FINTECH',
      description: 'Democratizing algorithmic wealth management for next-generation investors.',
      image: '/images/projects/nivara.jpg',
      bgGradient: 'from-slate-800 via-slate-900 to-[#141414]',
    },
    {
      id: 'learnloop',
      number: '03',
      title: 'LearnLoop',
      industry: 'Education · Concept',
      services: ['Brand', 'Digital Experience', 'Product Design'],
      category: 'EDUCATION',
      description: 'Interactive micro-learning loops designed for asynchronous remote engineering teams.',
      image: '/images/projects/learnloop.jpg',
      bgGradient: 'from-red-950/40 via-slate-900 to-[#141414]',
    },
    {
      id: 'roamly',
      number: '04',
      title: 'Roamly',
      industry: 'Travel · Concept',
      services: ['Brand', 'Website', 'Digital Experience'],
      category: 'TRAVEL',
      description: 'Curated spatial itineraries and offline map intelligence for solo explorers.',
      image: '/images/projects/roamly.jpg',
      bgGradient: 'from-amber-950/40 via-slate-900 to-[#141414]',
    },
    {
      id: 'kapi',
      number: '05',
      title: 'Kapi',
      industry: 'Local Business · Concept',
      services: ['Brand', 'Digital Presence', 'Social'],
      category: 'LOCAL BRAND',
      description: 'Artisanal coffee roastery digital presence, short-form content, and subscription funnel.',
      image: '/images/projects/kapi.jpg',
      bgGradient: 'from-orange-950/40 via-slate-900 to-[#141414]',
    },
    {
      id: 'nexa',
      number: '06',
      title: 'Nexa',
      industry: 'B2B SaaS · Concept',
      services: ['Product Design', 'UX/UI', 'Design System'],
      category: 'B2B SAAS',
      description: 'Multi-tenant cloud infrastructure monitoring dashboard and high-density UI component system.',
      image: '/images/projects/nexa.jpg',
      bgGradient: 'from-slate-900 via-zinc-900 to-[#141414]',
    },
  ];

  // 6 Service Categories with Visual Representation Images
  const servicesList = [
    {
      id: 'brand-identity',
      number: '01',
      title: 'BRAND & IDENTITY',
      hook: "Be recognized before you're remembered.",
      description: 'Build a brand people can see, trust and remember.',
      image: '/images/brand-identity.jpg',
      pointers: ['Brand Strategy', 'Naming', 'Identity', 'Personal Branding', 'Packaging'],
      ctaPath: '/services/brand-identity',
    },
    {
      id: 'digital-product-design',
      number: '02',
      title: 'DIGITAL & PRODUCT DESIGN',
      hook: 'Make complex things feel simple.',
      description: 'Design digital products and experiences people understand, use and remember.',
      image: '/images/product-design.jpg',
      pointers: ['UX/UI', 'Product', 'Web', 'Mobile', 'Design Systems'],
      ctaPath: '/services/digital-product-design',
    },
    {
      id: 'development-technology',
      number: '03',
      title: 'DEVELOPMENT & TECHNOLOGY',
      hook: "Good design shouldn't stop at the prototype.",
      description: 'Turn thoughtful design into fast, responsive and production-ready experiences.',
      image: '/images/development-tech.jpg',
      pointers: ['Web', 'Apps', 'E-commerce', 'MVP', 'Design-to-Code', 'AI'],
      ctaPath: '/services/development-technology',
    },
    {
      id: 'digital-growth-social',
      number: '04',
      title: 'DIGITAL GROWTH & SOCIAL',
      hook: 'Get found. Get understood. Stay remembered.',
      description: 'We connect SEO, social media, content and digital campaigns to build a stronger presence and turn attention into business opportunities.',
      image: '/images/digital-growth.jpg',
      pointers: ['SEO', 'Social Media Management', 'Content', 'Digital Marketing', 'Campaigns', 'CRO'],
      ctaPath: '/services/digital-growth-social',
    },
    {
      id: 'automation-ai',
      number: '05',
      title: 'AUTOMATION & AI',
      hook: 'Make the repetitive disappear.',
      description: 'Design smarter workflows that reduce manual work and help your business move faster.',
      image: '/images/automation-ai.jpg',
      pointers: ['AI', 'Workflows', 'CRM', 'Automation', 'Internal Tools'],
      ctaPath: '/services/automation-ai',
    },
    {
      id: 'launch-consultation',
      number: '06',
      title: 'LAUNCH & CONSULTATION',
      hook: 'Know what to do next. Then make it happen.',
      description: 'From product launches to strategic audits, turn uncertainty into a clear path forward.',
      image: '/images/launch-consultation.jpg',
      pointers: ['Product Launch', 'Strategy', 'Audits', 'Roadmaps', 'Consultation'],
      ctaPath: '/services/launch-consultation',
    },
  ];

  return (
    <div className="w-full bg-[#F8F9FA] dark:bg-[#0C0C0C] text-gray-900 dark:text-[#F3F4EF] transition-colors duration-300">
      <CustomCursor activeData={hoveredProject} />

      {/* SECTION 01: HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 px-6 md:px-10 overflow-hidden">
        {/* Background 3D Canvas Container */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-80 transition-opacity duration-700">
          <React.Suspense fallback={null}>
            <CircleDotSculpture />
          </React.Suspense>
        </div>

        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#E30613]/10 blur-[140px] rounded-full pointer-events-none"></div>

        {/* Hero Central Content */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center my-auto">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-[#222222] bg-white/60 dark:bg-[#141414]/60 backdrop-blur-md mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#E30613] animate-pulse"></span>
            <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase font-medium">
              VIBRANT DIGITAL STUDIO
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-[#F3F4EF] leading-[1.05] mb-8"
          >
            WE BUILD BRAND, PRODUCT &amp; SYSTEM
            <span className="block text-[#E30613]">THAT DRIVES GROWTH.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-xl text-gray-600 dark:text-[#A5A8A1] font-light max-w-2xl leading-relaxed mb-10"
          >
            From raw concept to scalable execution. We craft bespoke identity systems, high-converting digital products, and intelligent AI automation workflows.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => openEnquiryModal()}
              className="px-8 py-4 rounded-full bg-[#E30613] text-white font-bold text-xs tracking-widest uppercase hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#E30613]/25"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('case-studies');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full border border-gray-300 dark:border-[#222222] bg-white/40 dark:bg-[#141414]/40 backdrop-blur-md text-xs font-mono tracking-widest text-gray-900 dark:text-[#F3F4EF] hover:border-[#E30613] hover:text-[#E30613] transition-all cursor-pointer"
            >
              SEE CASE STUDIES ↓
            </button>
          </motion.div>
        </div>

        {/* Hero Bottom Trust Bar */}
        <div className="relative z-10 pt-12 flex flex-wrap items-center justify-between gap-6 max-w-6xl mx-auto w-full text-xs font-mono text-gray-500 dark:text-[#A5A8A1]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#E30613]"></span>
            <span>AVAILABLE FOR Q3 / Q4 PROJECTS</span>
          </div>
          <div className="flex items-center gap-6">
            <span>BRAND IDENTITY</span>
            <span>·</span>
            <span>PRODUCT DESIGN</span>
            <span>·</span>
            <span>DEVELOPMENT</span>
          </div>
        </div>
      </section>

      {/* 02. POSITIONING SECTION */}
      <section className="py-24 px-6 md:px-10 bg-white dark:bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-4">
              WHY CIRCLE DOT
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-gray-900 dark:text-[#F3F4EF] tracking-tight mb-6 leading-tight">
              Start with the problem. We'll help shape the solution.
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-[#A5A8A1] leading-relaxed mb-8">
              Whether you need a brand, product, website, growth strategy, automation, or simply don't know where to start — bring us the challenge. We'll help define the right next step.
            </p>

            <div className="flex flex-col items-center gap-4 mb-12 sm:flex-row sm:justify-start sm:items-center sm:gap-6">
              <button
                onClick={() => openEnquiryModal()}
                className="w-full sm:w-auto max-w-[220px] sm:max-w-none px-7 py-3.5 rounded-full bg-[#E30613] text-white font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#E30613]/20"
              >
                <span>Talk to Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-center text-xs font-mono text-gray-600 dark:text-[#A5A8A1] sm:text-left whitespace-nowrap">
                Clear direction · Focused execution · One connected team
              </span>
            </div>
          </div>

          {/* Animated Pillars Bar */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-5 gap-4">
            {['BRAND', 'DESIGN', 'BUILD', 'LAUNCH', 'GROW'].map((word) => (
              <div
                key={word}
                className={`${word === 'GROW' ? 'col-span-2 sm:col-span-1' : ''} p-6 rounded-2xl bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-[#222222] text-center group hover:border-[#E30613] transition-all`}
              >
                <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-gray-900 dark:text-[#F3F4EF] group-hover:text-[#E30613] transition-colors">
                  {word}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. SERVICES SECTION (GSAP ScrollTrigger Horizontal Pin) */}
      <section ref={servicesSectionRef} className="relative min-h-screen w-full bg-white dark:bg-[#0C0C0C] py-16 px-6 md:px-10 overflow-hidden flex flex-col justify-between">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-3">
            WHAT WE CAN BUILD WITH YOU
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-gray-900 dark:text-[#F3F4EF] tracking-tight">
              Whatever you need next.
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A5A8A1] max-w-md">
              From building your brand to launching a product, growing your presence or automating your business — choose where you are, and we'll take it from there.
            </p>
          </div>
        </div>

        {/* GSAP Moving Track */}
        <div className="w-full overflow-visible my-auto py-8">
          <div ref={servicesTrackRef} className="flex gap-4 sm:gap-8 w-max pl-4 pr-12">
            {servicesList.map((service) => (
              <div
                key={service.id}
                className="group w-[82vw] sm:w-[450px] lg:w-[500px] bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-[#222222] rounded-3xl p-5 sm:p-8 flex flex-col justify-between hover:border-[#E30613]/60 transition-all shrink-0 shadow-2xl"
              >
                <div>
                  {/* Top Representation Image Banner */}
                  <div className="w-full h-44 sm:h-52 lg:h-60 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#222222] relative group-hover:border-[#E30613]/50 transition-colors mb-6">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#141414] via-transparent to-transparent opacity-60"></div>
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0C0C0C]/80 backdrop-blur-md border border-gray-200 dark:border-[#222222] font-mono text-xs font-bold text-[#E30613]">
                      {service.number}
                    </span>
                  </div>

                  {/* Card Title & Info */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-[#222222]">
                    <span className="text-[10px] sm:text-xs font-mono text-[#E30613] font-bold tracking-widest uppercase">
                      {service.title}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-gray-600 dark:text-[#A5A8A1]">
                      SERVICE 0{service.number}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-[#F3F4EF] mb-3">
                    {service.hook}
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-gray-600 dark:text-[#A5A8A1] mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.pointers.map((p) => (
                      <span
                        key={p}
                        className="px-3 py-1 rounded-lg bg-white dark:bg-[#0C0C0C] border border-gray-200 dark:border-[#222222] text-[10px] sm:text-xs font-mono text-gray-700 dark:text-[#D7E2EA]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigateTo(service.ctaPath)}
                  className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#E30613] hover:underline cursor-pointer pt-2 border-t border-gray-200 dark:border-[#222222]"
                >
                  <span>EXPLORE SERVICE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. WHO WE WORK WITH SECTION */}
      <section className="py-24 px-6 md:px-10 bg-white dark:bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-3">
              BUILT FOR WHERE YOU ARE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-gray-900 dark:text-[#F3F4EF] tracking-tight">
              Different businesses. One design mindset.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
            {[
              { title: 'STARTING', subtitle: 'Have an idea?', desc: 'Shape the brand, experience and digital foundation before you launch.' },
              { title: 'BUILDING', subtitle: 'Growing something real?', desc: 'Strengthen your brand, digital presence, product and customer experience.' },
              { title: 'TRANSFORMING', subtitle: 'Need a change?', desc: 'Modernize an existing brand, website, product or digital experience.' },
              { title: 'LAUNCHING', subtitle: 'Taking something to market?', desc: 'Bring strategy, design, development and launch assets together.' },
              { title: 'GROWING', subtitle: 'Ready for what\'s next?', desc: 'Optimize the experience, automate the work and design for sustainable growth.' },
            ].map((stage) => (
              <div key={stage.title} className="p-6 rounded-2xl bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-[#222222] flex flex-col justify-between hover:border-[#E30613]/50 transition-all">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#E30613] uppercase block mb-2">
                    {stage.title}
                  </span>
                  <h4 className="font-display font-bold text-base text-gray-900 dark:text-[#F3F4EF] mb-3">
                    {stage.subtitle}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-[#A5A8A1] leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => openEnquiryModal()}
              className="px-8 py-3.5 rounded-full bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-[#222222] text-[#E30613] font-mono text-xs tracking-wider uppercase hover:bg-[#E30613] hover:text-white transition-all cursor-pointer"
            >
              Tell us where you are →
            </button>
          </div>
        </div>
      </section>

      {/* 05. CASE STUDIES SECTION (STACKING CARDS EFFECT) */}
      <section id="case-studies" className="py-16 px-0 md:px-10 bg-white dark:bg-[#0C0C0C] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-0">
          
          {/* Sticky Section Header - Available on screen throughout scrolling animation */}
          <div className="sticky top-16 md:top-20 z-30 bg-white/90 dark:bg-[#0C0C0C]/90 backdrop-blur-md py-4 md:py-4 mb-6 border-b border-gray-200/50 dark:border-[#222222]/50 transition-colors -mx-6 md:mx-0 px-6 md:px-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-2 font-bold">
                  CASE STUDIES
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-gray-900 dark:text-[#F3F4EF] tracking-tight leading-[0.95]">
                  Case studies built around real business needs.
                </h2>
              </div>
              <p className="text-[10px] sm:text-xs font-mono text-gray-500 dark:text-[#A5A8A1] uppercase tracking-wider">
                Concept Work Honest Showcase · Interactive Stacking Showcase
              </p>
            </div>
          </div>

          {/* Sticky Stacking Cards Stack */}
          <div className="flex flex-col gap-6 mb-4">
            {projectsData.map((project, idx) => (
              <StackingProjectCard
                key={project.id}
                project={project}
                index={idx}
                totalProjects={projectsData.length}
                onHover={setHoveredProject}
                onSelect={() => navigateTo('/work')}
              />
            ))}
          </div>

          {/* CTA directly below final card with no excess space */}
          <div className="text-center pt-4 pb-4">
            <button
              onClick={() => navigateTo('/work')}
              className="px-8 py-4 rounded-full bg-[#E30613] text-white font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-2 shadow-lg shadow-[#E30613]/20"
            >
              <span>Explore All Case Studies</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 06. HOW WE WORK SECTION */}
      <section className="py-24 px-6 md:px-10 bg-white dark:bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-3">
              OUR PROCESS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-gray-900 dark:text-[#F3F4EF] tracking-tight mb-4">
              From idea to impact.
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A5A8A1] max-w-xl">
              A focused process that keeps the work strategic, creative and moving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'DISCOVER', subtitle: 'Start with the real problem.', desc: 'We understand your business, audience, market, competition and objective before deciding what needs to be designed.' },
              { num: '02', title: 'DEFINE', subtitle: 'Find the right direction.', desc: 'We turn insights into strategy, priorities, requirements and a clear creative direction.' },
              { num: '03', title: 'DESIGN', subtitle: 'Make the idea tangible.', desc: 'We create the identity, experience, product and visual system that brings the direction to life.' },
              { num: '04', title: 'BUILD', subtitle: 'Make it real.', desc: 'We turn approved designs into responsive, accessible and production-ready digital experiences.' },
              { num: '05', title: 'LAUNCH', subtitle: 'Put it into the world.', desc: 'We prepare the brand, product or digital experience for launch with the assets and systems it needs.' },
              { num: '06', title: 'GROW', subtitle: 'Don\'t stop at launch.', desc: 'We learn, optimize and evolve the experience as your business moves forward.' },
            ].map((step) => (
              <div key={step.num} className="p-8 rounded-3xl bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-[#222222] flex flex-col justify-between hover:border-[#E30613]/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200 dark:border-[#222222]">
                    <span className="font-mono text-xl font-bold text-[#E30613]">{step.num}</span>
                    <span className="text-xs font-mono text-gray-600 dark:text-[#A5A8A1]">{step.title}</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-gray-900 dark:text-[#F3F4EF] mb-3">
                    {step.subtitle}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-[#A5A8A1] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07. WHY WORK WITH US - STACKED CARD SCROLL ANIMATION */}
      <section className="bg-white dark:bg-[#0C0C0C] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="mb-12">
            <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-2">
              WHY WORK WITH US
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-[#F3F4EF]">
              One studio. Connected thinking.
            </h2>
          </div>
        </div>

        {/* Stacked Cards Container */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {[
              { num: '01', title: 'BUSINESS-FIRST', desc: 'Design decisions start with the objective.', icon: '→', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80' },
              { num: '02', title: 'CONNECTED', desc: 'Brand, product, digital and growth work together.', icon: '↔', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80' },
              { num: '03', title: 'DESIGN-LED', desc: 'Strategy and creativity continue through development.', icon: '⚡', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80' },
              { num: '04', title: 'BUILT TO EVOLVE', desc: 'We create systems, not one-time visuals.', icon: '⚙', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80' },
            ].map((why, index, arr) => (
              <StackedWhyCard
                key={why.title}
                card={why}
                index={index}
                totalCards={arr.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 09. FINAL CTA SECTION */}
      <section className="py-28 px-6 md:px-10 bg-white dark:bg-[#0C0C0C] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-4">
            READY WHEN YOU ARE
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-gray-900 dark:text-[#F3F4EF] tracking-tight mb-6">
            Have something worth building?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-[#A5A8A1] leading-relaxed mb-10 max-w-2xl mx-auto">
            Tell us what you're building, improving, launching or trying to solve. You don't need a perfect brief — we'll help define the right next step.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <button
              onClick={() => openEnquiryModal()}
              className="px-9 py-4 rounded-full bg-[#E30613] text-white font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-xl shadow-[#E30613]/20"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openEnquiryModal('Consultation')}
              className="px-9 py-4 rounded-full bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-[#222222] text-gray-900 dark:text-[#F3F4EF] font-semibold text-xs tracking-wider uppercase hover:border-[#E30613] transition-colors cursor-pointer"
            >
              <span>Book a Consultation</span>
            </button>
          </div>

          <p className="text-xs font-mono text-gray-600 dark:text-[#A5A8A1]">
            Not sure what you need? That's exactly what the consultation is for.
          </p>
        </div>
      </section>
    </div>
  );
};

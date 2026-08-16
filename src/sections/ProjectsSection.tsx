import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { LiveProjectButton } from '../components/LiveProjectButton';

interface ProjectItem {
  id: string;
  number: string;
  category: string;
  title: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const projectsData: ProjectItem[] = [
  {
    id: '01',
    number: '01',
    category: 'Client',
    title: 'Nextlevel Studio',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    id: '02',
    number: '02',
    category: 'Personal',
    title: 'Aura Brand Identity',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    id: '03',
    number: '03',
    category: 'Client',
    title: 'Solaris Digital',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

interface CardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
}

const ProjectCard: React.FC<CardProps> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-center justify-center sticky top-24 md:top-32"
      style={{
        top: `calc(6rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border border-gray-200 bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-lg overflow-hidden"
      >
        {/* Top Row Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Number */}
            <span
              className="font-black text-[#111111] leading-none shrink-0"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-light uppercase tracking-widest text-[#555555]">
                {project.category}
              </span>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-medium uppercase text-[#111111] tracking-wide">
                {project.title}
              </h3>
            </div>
          </div>

          <LiveProjectButton />
        </div>

        {/* Bottom Row Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 flex-1 min-h-0">
          {/* Left Column (40% width / 4 cols out of 10) */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6">
            <img
              src={project.col1Img1}
              alt={`${project.title} screenshot 1`}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover bg-slate-900 shadow-md"
              style={{
                height: 'clamp(130px, 16vw, 230px)',
              }}
            />
            <img
              src={project.col1Img2}
              alt={`${project.title} screenshot 2`}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover bg-slate-900 shadow-md"
              style={{
                height: 'clamp(160px, 22vw, 340px)',
              }}
            />
          </div>

          {/* Right Column (60% width / 6 cols out of 10) */}
          <div className="md:col-span-6 h-full">
            <img
              src={project.col2Img}
              alt={`${project.title} main display`}
              className="w-full h-full min-h-[260px] md:min-h-[420px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover bg-slate-900 shadow-md"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="bg-gray-50 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 pb-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading: Singular "Project" */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-24"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>

        {/* Sticky Stacking Cards Container */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={projectsData.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

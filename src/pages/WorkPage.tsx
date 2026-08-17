import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { LazyImage } from '../components/LazyImage';
import { ArrowUpRight, Filter, X } from 'lucide-react';

interface ConceptProject {
  id: string;
  number: string;
  title: string;
  industry: string;
  capability: string;
  services: string[];
  description: string;
  image: string;
  challenge: string;
  solution: string;
  deliverables: string[];
}

export const WorkPage: React.FC = () => {
  const { openEnquiryModal } = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [activeModalProject, setActiveModalProject] = useState<ConceptProject | null>(null);

  const projects: ConceptProject[] = [
    {
      id: 'careflow',
      number: '01',
      title: 'CareFlow',
      industry: 'Healthcare · Concept',
      capability: 'PRODUCT DESIGN & DEV',
      services: ['Brand', 'UX/UI', 'Product Design', 'Development'],
      description: 'Streamlining clinical triage workflows and patient monitoring with a fast, modern web application.',
      image: '/images/projects/careflow.jpg',
      challenge: 'Healthcare providers struggle with fragmented patient intake systems that slow down triage and cause data entry bottlenecks.',
      solution: 'We designed and prototyped a high-density, accessible clinical dashboard with real-time patient status cards and automated triage routing.',
      deliverables: ['Brand Identity & Logo', 'Clinical Workflow Audit', 'Web App Dashboard UI/UX', 'Production Component Library'],
    },
    {
      id: 'nivara',
      number: '02',
      title: 'Nivara',
      industry: 'Fintech · Concept',
      capability: 'BRAND & PRODUCT',
      services: ['Brand', 'Product Design', 'UX/UI'],
      description: 'Democratizing algorithmic wealth management for next-generation investors with an intuitive interface.',
      image: '/images/projects/nivara.jpg',
      challenge: 'Complex quantitative investment strategies feel overwhelming and inaccessible to retail investors.',
      solution: 'A minimal, transparent wealth management app that translates quantitative strategies into visual risk sliders and automated portfolio rebalancing.',
      deliverables: ['Brand System & Color Palette', 'iOS & Web App Design', 'Interactive Onboarding Flow', 'Design System'],
    },
    {
      id: 'learnloop',
      number: '03',
      title: 'LearnLoop',
      industry: 'Education · Concept',
      capability: 'PRODUCT DESIGN',
      services: ['Brand', 'Digital Experience', 'Product Design'],
      description: 'Interactive micro-learning loops designed for asynchronous remote engineering teams.',
      image: '/images/projects/learnloop.jpg',
      challenge: 'Traditional LMS platforms suffer from poor engagement and lack contextual integration into daily engineering workflows.',
      solution: 'Designed bite-sized interactive learning modules directly inside developer tooling with peer code reviews and progress telemetry.',
      deliverables: ['Brand & Mascot Identity', 'Micro-Learning Dashboard', 'Gamified Progress UI', 'Interactive Sandbox Specs'],
    },
    {
      id: 'roamly',
      number: '04',
      title: 'Roamly',
      industry: 'Travel · Concept',
      capability: 'BRAND & WEB',
      services: ['Brand', 'Website', 'Digital Experience'],
      description: 'Curated spatial itineraries and offline map intelligence for solo explorers.',
      image: '/images/projects/roamly.jpg',
      challenge: 'Travelers waste hours switching between static blogs, Google Maps, and disjointed booking tools.',
      solution: 'A unified spatial travel guide combining offline vector maps, curated community micro-guides, and 1-tap booking.',
      deliverables: ['Brand Positioning & Identity', 'Spatial Mobile Web Experience', 'Custom Map UI System', 'SEO Landing Pages'],
    },
    {
      id: 'kapi',
      number: '05',
      title: 'Kapi',
      industry: 'Local Business · Concept',
      capability: 'DIGITAL GROWTH & SOCIAL',
      services: ['Brand', 'Digital Presence', 'Social'],
      description: 'Artisanal coffee roastery digital presence, short-form content strategy, and subscription funnel.',
      image: '/images/projects/kapi.jpg',
      challenge: 'Local specialty coffee roasters face fierce competition and low digital retention outside their physical cafes.',
      solution: 'A high-converting direct-to-consumer subscription website paired with a short-form video content kit and local search optimization.',
      deliverables: ['Packaging & Brand Visuals', 'E-commerce Subscription Funnel', 'Short-Form Content Strategy', 'Local SEO Setup'],
    },
    {
      id: 'nexa',
      number: '06',
      title: 'Nexa',
      industry: 'B2B SaaS · Concept',
      capability: 'PRODUCT DESIGN & DEV',
      services: ['Product Design', 'UX/UI', 'Design System'],
      description: 'Multi-tenant cloud infrastructure monitoring dashboard and high-density UI component system.',
      image: '/images/projects/nexa.jpg',
      challenge: 'DevOps engineers struggle with high alert noise and cluttered telemetry screens.',
      solution: 'A dark-mode high-density monitoring interface prioritizing anomaly detection and single-click root cause inspection.',
      deliverables: ['Dark-Mode Design System', 'Telemetry Dashboard UI', 'Alert Management Flows', 'React Component Specs'],
    },
  ];

  const filters = ['ALL', 'BRAND & WEB', 'PRODUCT DESIGN & DEV', 'DIGITAL GROWTH & SOCIAL'];

  const filteredProjects = selectedFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.capability === selectedFilter || p.services.some(s => s.toUpperCase().includes(selectedFilter.split(' ')[0])));

  return (
    <div className="w-full bg-[#F8F9FA] dark:bg-[#0C0C0C] text-gray-900 dark:text-[#F3F4EF] pt-24 pb-24 transition-colors duration-300">
      {/* HERO SECTION */}
      <section className="px-6 md:px-10 pb-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-0">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-3 font-bold">
                CASE STUDIES
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-[#F3F4EF]">
                Proof of craft.
              </h1>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#222222] text-xs font-mono text-gray-600 dark:text-[#A5A8A1] max-w-md shadow-sm">
              <span className="text-[#E30613] font-bold block mb-1">HONEST SHOWCASE STATEMENT</span>
              All project case studies shown are clear, honest concept demonstrations showcasing how Circle Dot approaches brand, product design, development and growth.
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="sticky top-[86px] z-20 -mx-6 md:-mx-10 px-6 md:px-10 py-2.5 bg-[#F8F9FA]/90 dark:bg-[#0C0C0C]/90 backdrop-blur-md border-b border-gray-200 dark:border-[#222222]">
            <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1">
              <Filter className="w-4 h-4 text-gray-500 dark:text-[#A5A8A1] mr-2 shrink-0" />
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    selectedFilter === f
                      ? 'bg-[#E30613] text-white font-bold'
                      : 'bg-white dark:bg-[#141414] text-gray-700 dark:text-[#A5A8A1] border border-gray-200 dark:border-[#222222] hover:text-gray-900 dark:hover:text-gray-900 dark:text-[#F3F4EF]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="px-6 md:px-10 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setActiveModalProject(p)}
              className="group p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#222222] hover:border-[#E30613] dark:hover:border-[#E30613] transition-all cursor-pointer flex flex-col justify-between shadow-md dark:shadow-xl"
            >
              <div>
                {/* Top Image Banner */}
                <div className="w-full h-52 sm:h-60 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#222222] relative group-hover:border-[#E30613]/50 transition-colors mb-6">
                  <LazyImage
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 dark:brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-[#0C0C0C]/80 backdrop-blur-md border border-gray-200 dark:border-[#222222] font-mono text-xs font-bold text-[#E30613]">
                    {p.number}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-[#222222]">
                  <span className="font-mono text-xs text-[#E30613] font-bold tracking-widest uppercase">{p.capability}</span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#0C0C0C] text-[10px] font-mono text-gray-600 dark:text-[#A5A8A1] border border-gray-200 dark:border-[#222222]">
                    {p.industry}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-left leading-[1.08] tracking-[-0.04em] text-gray-900 dark:text-[#F3F4EF] mb-3 group-hover:translate-x-0.5 transition-transform break-words">
                  {p.title}
                </h3>
                <p className="text-left text-xs sm:text-sm text-gray-600 dark:text-[#A5A8A1] leading-relaxed mb-6">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.services.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-[#0C0C0C] border border-gray-200 dark:border-[#222222] text-xs font-mono text-gray-700 dark:text-[#D7E2EA]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-[#222222] flex items-center justify-between text-xs font-mono text-[#E30613] group-hover:underline">
                <span>INSPECT CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DETAIL MODAL */}
      {activeModalProject && (
        <div className="fixed inset-0 z-[100] bg-black/60 dark:bg-[#0C0C0C]/90 backdrop-blur-2xl p-4 sm:p-6 flex items-center justify-center overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#222222] rounded-3xl p-6 sm:p-10 my-auto shadow-2xl text-gray-900 dark:text-[#F3F4EF]">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-[#0C0C0C] text-gray-500 dark:text-[#A5A8A1] hover:text-gray-900 dark:hover:text-gray-900 dark:text-[#F3F4EF] border border-gray-200 dark:border-[#222222] hover:border-[#E30613]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#0C0C0C] text-[10px] font-mono text-[#E30613] border border-gray-200 dark:border-[#222222] inline-block mb-3">
              {activeModalProject.industry}
            </span>
            <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-[#F3F4EF] mb-4">{activeModalProject.title}</h2>
            <p className="text-sm text-gray-600 dark:text-[#A5A8A1] mb-8 leading-relaxed">{activeModalProject.description}</p>

            <div className="space-y-6 mb-8">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0C0C0C] border border-gray-200 dark:border-[#222222]">
                <h4 className="text-xs font-mono text-[#E30613] mb-1">THE PROBLEM / CHALLENGE</h4>
                <p className="text-xs text-gray-800 dark:text-[#F3F4EF] leading-relaxed">{activeModalProject.challenge}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0C0C0C] border border-gray-200 dark:border-[#222222]">
                <h4 className="text-xs font-mono text-[#E30613] mb-1">THE CIRCLE DOT APPROACH</h4>
                <p className="text-xs text-gray-800 dark:text-[#F3F4EF] leading-relaxed">{activeModalProject.solution}</p>
              </div>
            </div>

            <h4 className="text-xs font-mono text-gray-500 dark:text-[#A5A8A1] uppercase mb-3 font-bold">CORE DELIVERABLES</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {activeModalProject.deliverables.map((d) => (
                <span key={d} className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#0C0C0C] text-xs font-mono text-gray-700 dark:text-[#D7E2EA] border border-gray-200 dark:border-[#222222]">
                  ✓ {d}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveModalProject(null);
                openEnquiryModal();
              }}
              className="w-full py-4 rounded-full bg-[#E30613] text-white font-bold text-xs tracking-wider uppercase hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#E30613]/20"
            >
              <span>Build Something Similar</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

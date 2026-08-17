import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const HowWeWorkPage: React.FC = () => {
  const { openEnquiryModal } = useNavigation();

  const stages = [
    {
      num: '01',
      title: 'DISCOVER',
      headline: 'Start with the real problem.',
      desc: 'We understand your business, audience, market, competition and objective before deciding what needs to be designed.',
      deliverables: ['Problem Audit & Discovery Session', 'Competitor & Landscape Mapping', 'Strategic Goals & Success Criteria'],
    },
    {
      num: '02',
      title: 'DEFINE',
      headline: 'Find the right direction.',
      desc: 'We turn insights into strategy, priorities, requirements and a clear creative direction before building anything.',
      deliverables: ['Creative Direction & Positioning', 'Feature & Scope Prioritization', 'Information Architecture & Wireframes'],
    },
    {
      num: '03',
      title: 'DESIGN',
      headline: 'Make the idea tangible.',
      desc: 'We create the identity, experience, product and visual system that brings the approved direction to life.',
      deliverables: ['Brand & Visual Identity System', 'High-Fidelity Product UI/UX', 'Design Systems & Component Specs'],
    },
    {
      num: '04',
      title: 'BUILD',
      headline: 'Make it real.',
      desc: 'We turn approved designs into responsive, accessible and production-ready digital experiences using modern code.',
      deliverables: ['Frontend & Backend Development', 'Mobile-First Responsive Testing', 'Content & CMS Integration'],
    },
    {
      num: '05',
      title: 'LAUNCH',
      headline: 'Put it into the world.',
      desc: 'We prepare the brand, product or digital experience for launch with the assets, systems and marketing strategy it needs.',
      deliverables: ['Production Deployment & QA', 'SEO & Analytics Setup', 'Launch Campaign Assets'],
    },
    {
      num: '06',
      title: 'GROW',
      headline: "Don't stop at launch.",
      desc: 'We learn, optimize and evolve the experience as your business moves forward with ongoing content, feature and workflow updates.',
      deliverables: ['Post-Launch CRO & Optimization', 'Social & Growth Content Strategy', 'AI & Automation Upgrades'],
    },
  ];

  return (
    <div className="w-full bg-[#F8F9FA] dark:bg-[#0C0C0C] text-gray-900 dark:text-[#F3F4EF] pt-32 pb-24 transition-colors duration-300">
      {/* HERO */}
      <section className="px-6 md:px-10 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-3 font-bold">
              HOW WE WORK
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-[#F3F4EF] mb-6 leading-tight">
              A clear process <br />
              <span className="text-[#E30613]">from idea to impact.</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-[#A5A8A1] leading-relaxed mb-8 font-light">
              We keep the work strategic, creative and moving. No bureaucratic delays, no unexplained decisions — just clear communication and focused execution.
            </p>

            <button
              onClick={() => openEnquiryModal()}
              className="px-8 py-4 rounded-full bg-[#E30613] text-white font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#E30613]/20"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* PROCESS STAGES */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-12">
          {stages.map((stg) => (
            <div key={stg.num} className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#222222] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:border-[#E30613]/40 transition-all shadow-md dark:shadow-xl">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-2xl font-bold text-[#E30613]">{stg.num}</span>
                  <span className="text-xs font-mono text-gray-500 dark:text-[#A5A8A1] tracking-widest uppercase">{stg.title}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-[#F3F4EF] mb-3">{stg.headline}</h3>
                <p className="text-sm text-gray-600 dark:text-[#A5A8A1] leading-relaxed">{stg.desc}</p>
              </div>

              <div className="lg:col-span-8 bg-gray-50 dark:bg-[#0C0C0C] border border-gray-200 dark:border-[#222222] rounded-2xl p-6 sm:p-8">
                <h4 className="text-xs font-mono text-[#E30613] uppercase tracking-widest mb-4 font-bold">
                  WHAT GETS DELIVERED & RESOLVED
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {stg.deliverables.map((del) => (
                    <div key={del} className="flex items-start gap-2 text-xs font-mono text-gray-800 dark:text-[#D7E2EA]">
                      <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE CIRCLE DOT EXPERIENCE */}
      <section className="py-20 px-6 md:px-10 bg-white dark:bg-[#141414]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-3 font-bold">
              THE CIRCLE DOT EXPERIENCE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-gray-900 dark:text-[#F3F4EF] tracking-tight">
              Good design is only part of the experience.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'CLEAR FROM DAY ONE', subtitle: 'No unnecessary complexity.', desc: 'We start with what you\'re trying to achieve, not just what you think you need designed.' },
              { num: '02', title: 'ONE CONNECTED DIRECTION', subtitle: 'Everything works together.', desc: 'Brand, product, website, content and development follow the same design logic.' },
              { num: '03', title: 'FAST, WITHOUT RUSHING', subtitle: 'Move quickly. Make smart decisions.', desc: 'Focused iterations, clear communication and reusable systems keep projects moving.' },
              { num: '04', title: 'BUILT FOR REAL USE', subtitle: 'Beautiful isn\'t enough.', desc: 'We design for real users, real devices, real businesses and real-world constraints.' },
              { num: '05', title: 'SUPPORT BEYOND LAUNCH', subtitle: 'Launch is a milestone, not the finish line.', desc: 'Continue improving, optimizing and evolving as your business changes.' },
            ].map((exp) => (
              <div key={exp.num} className="p-8 rounded-3xl bg-gray-50 dark:bg-[#0C0C0C] border border-gray-200 dark:border-[#222222]">
                <span className="text-xs font-mono text-[#E30613] block mb-2">{exp.num} — {exp.title}</span>
                <h4 className="font-display font-bold text-lg text-gray-900 dark:text-[#F3F4EF] mb-2">{exp.subtitle}</h4>
                <p className="text-xs text-gray-600 dark:text-[#A5A8A1] leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

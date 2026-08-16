import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { ArrowUpRight } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { navigateTo, openEnquiryModal } = useNavigation();

  const services = [
    {
      id: 'brand-identity',
      number: '01',
      title: 'BRAND & IDENTITY',
      hook: "Be recognized before you're remembered.",
      desc: 'Build a cohesive visual system, positioning, naming, and identity that commands trust across all touchpoints.',
      ctaPath: '/services/brand-identity',
    },
    {
      id: 'digital-product-design',
      number: '02',
      title: 'DIGITAL & PRODUCT DESIGN',
      hook: 'Make complex things feel simple.',
      desc: 'Create intuitive UI/UX for web applications, mobile platforms, design systems, and digital customer experiences.',
      ctaPath: '/services/digital-product-design',
    },
    {
      id: 'development-technology',
      number: '03',
      title: 'DEVELOPMENT & TECHNOLOGY',
      hook: "Good design shouldn't stop at the prototype.",
      desc: 'High-performance React/TypeScript web apps, modern CMS platforms, MVP engineering, and production code.',
      ctaPath: '/services/development-technology',
    },
    {
      id: 'digital-growth-social',
      number: '04',
      title: 'DIGITAL GROWTH & SOCIAL',
      hook: 'Get found. Get understood. Stay remembered.',
      desc: 'Strategic Social Media Management (SMM), SEO architecture, creative short-form content, and conversion rate optimization.',
      ctaPath: '/services/digital-growth-social',
    },
    {
      id: 'automation-ai',
      number: '05',
      title: 'AUTOMATION & AI',
      hook: 'Make the repetitive disappear.',
      desc: 'Custom AI integration, internal tool building, automated CRM workflows, and operational efficiency design.',
      ctaPath: '/services/automation-ai',
    },
    {
      id: 'launch-consultation',
      number: '06',
      title: 'LAUNCH & CONSULTATION',
      hook: 'Know what to do next. Then make it happen.',
      desc: 'Go-to-market strategy, product launch campaign design, design audits, and executive advisory.',
      ctaPath: '/services/launch-consultation',
    },
  ];

  return (
    <div className="w-full bg-[#F8F9FA] dark:bg-[#0C0C0C] text-gray-900 dark:text-[#F3F4EF] pt-32 pb-24 transition-colors duration-300">
      <section className="px-6 md:px-10 mb-16">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-3 font-bold">
            CAPABILITIES & SERVICES
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-[#F3F4EF] mb-6">
            Whatever your business needs next.
          </h1>
          <p className="text-lg text-gray-600 dark:text-[#A5A8A1] max-w-2xl leading-relaxed font-light">
            From establishing your brand to engineering digital products, expanding your social presence or streamlining operations with AI.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.id}
              className="p-8 rounded-3xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#222222] hover:border-[#E30613] dark:hover:border-[#E30613] transition-all flex flex-col justify-between shadow-md dark:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-[#222222]">
                  <span className="font-mono text-2xl font-bold text-[#E30613]">{s.number}</span>
                  <span className="text-xs font-mono text-gray-500 dark:text-[#A5A8A1]">{s.title}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-[#F3F4EF] mb-3">{s.hook}</h3>
                <p className="text-xs text-gray-600 dark:text-[#A5A8A1] leading-relaxed mb-6">{s.desc}</p>
              </div>

              <button
                onClick={() => navigateTo(s.ctaPath)}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#E30613] hover:underline cursor-pointer"
              >
                <span>EXPLORE SERVICE PAGE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center p-10 rounded-3xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#222222] shadow-lg dark:shadow-2xl">
          <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-[#F3F4EF] mb-3">
            Not sure which service fits best?
          </h3>
          <p className="text-xs text-gray-600 dark:text-[#A5A8A1] mb-6">
            Tell us your business goal or problem and we'll craft a custom connected solution.
          </p>
          <button
            onClick={() => openEnquiryModal()}
            className="px-8 py-3.5 rounded-full bg-[#E30613] text-white font-bold text-xs tracking-wider uppercase hover:opacity-95 transition-opacity inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#E30613]/20"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

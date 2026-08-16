import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openEnquiryModal } = useNavigation();

  return (
    <div className="w-full bg-[#F8F9FA] dark:bg-[#0C0C0C] text-gray-900 dark:text-[#F3F4EF] pt-32 pb-24 transition-colors duration-300">
      {/* HERO SECTION */}
      <section className="px-6 md:px-10 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-3 font-bold">
              ABOUT CIRCLE DOT DESIGN STUDIO
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-[#F3F4EF] mb-6 leading-tight">
              Start with the problem. <br />
              <span className="text-[#E30613]">Build what matters.</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-[#A5A8A1] leading-relaxed mb-8 font-light">
              Circle Dot is a design-led studio helping startups, growing businesses, local brands, digital products and founders turn ideas and challenges into clear, beautiful and functional solutions.
            </p>

            <button
              onClick={() => openEnquiryModal()}
              className="px-8 py-4 rounded-full bg-[#E30613] text-white font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#E30613]/20"
            >
              <span>Work with Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-3 font-bold">
                OUR PHILOSOPHY
              </span>
              <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-[#F3F4EF] mb-6">
                You don't need a full brief to get started.
              </h2>
              <p className="text-sm text-gray-600 dark:text-[#A5A8A1] leading-relaxed mb-4">
                Most businesses come to us knowing something needs to change — their brand feels outdated, their website isn't converting, their product interface is confusing, or their social presence isn't driving results.
              </p>
              <p className="text-sm text-gray-600 dark:text-[#A5A8A1] leading-relaxed">
                We don't expect you to know exactly which service you need. Bring us the problem, and we'll help define the right solution, priorities and execution roadmap.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#222222] shadow-md dark:shadow-xl">
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-[#F3F4EF] mb-4">
                Connected Execution
              </h3>
              <p className="text-xs text-gray-600 dark:text-[#A5A8A1] leading-relaxed mb-6">
                Instead of hiring separate agencies for brand, web development, growth marketing and AI automation — Circle Dot connects all four disciplines into one cohesive design-led workflow.
              </p>

              <div className="space-y-3">
                {['Brand & Visual Strategy', 'Digital & Product Design', 'Production Development', 'SEO & Social Media Growth', 'Automation & Workflows'].map((p) => (
                  <div key={p} className="flex items-center gap-2 text-xs font-mono text-gray-800 dark:text-[#D7E2EA]">
                    <CheckCircle2 className="w-4 h-4 text-[#E30613]" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZERO FAKE PROMISE */}
      <section className="py-20 px-6 md:px-10 bg-gray-100/60 dark:bg-[#141414]/30">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-3 font-bold">
            STUDIO TRANSPARENCY
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-[#F3F4EF] mb-4">
            Honest work. Real value. Zero fluff.
          </h2>
          <p className="text-sm text-gray-600 dark:text-[#A5A8A1] leading-relaxed mb-8">
            We don't publish inflated metrics, fake client logos or generic social media templates. We focus on craft, usability, strategic clarity and shipping quality work that helps your business grow.
          </p>

          <button
            onClick={() => openEnquiryModal()}
            className="px-8 py-4 rounded-full bg-[#E30613] text-white font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#E30613]/20"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

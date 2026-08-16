import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { ArrowUpRight, CheckCircle2, ArrowLeft } from 'lucide-react';

interface ServiceDetailConfig {
  title: string;
  tagline: string;
  heroDesc: string;
  problemsSolved: string[];
  deliverables: string[];
  processSteps: { title: string; desc: string }[];
  caseStudyHighlight: { title: string; desc: string };
}

const serviceDataMap: Record<string, ServiceDetailConfig> = {
  'brand-identity': {
    title: 'Brand & Identity Design',
    tagline: "Be recognized before you're remembered.",
    heroDesc: 'We craft comprehensive visual identity systems, brand positioning, logo architecture, typography, and messaging frameworks that command trust.',
    problemsSolved: ['Generic visual identity that blends into competitors', 'Inconsistent branding across digital touchpoints', 'Lack of clear positioning for founders and teams', 'Outdated brand image holding back business growth'],
    deliverables: ['Brand Strategy & Positioning Deck', 'Logo Suite & Iconography', 'Typography & Color System', 'Brand Guidelines (PDF & Web)', 'Social Media & Print Templates'],
    processSteps: [
      { title: '01 Discover & Audit', desc: 'Analyzing market context, competitors and target audience expectations.' },
      { title: '02 Creative Direction', desc: 'Developing moodboards, visual concepts and tone of voice options.' },
      { title: '03 System Crafting', desc: 'Refining selected concept into full logo suites, typography and UI assets.' },
      { title: '04 Guidelines & Delivery', desc: 'Packaging all assets into production-ready guidelines for web and print.' },
    ],
    caseStudyHighlight: {
      title: 'CareFlow Brand Elevation',
      desc: 'Created an empathetic yet authoritative medical brand system for a next-generation clinical triage platform.',
    },
  },
  'digital-product-design': {
    title: 'Digital & Product Design',
    tagline: 'Make complex things feel simple.',
    heroDesc: 'User interface (UI) and user experience (UX) design for web applications, mobile platforms, design systems, and complex SaaS products.',
    problemsSolved: ['Confusing user onboarding causing high drop-off', 'Cluttered interfaces that slow down daily power users', 'Inconsistent component usage across product teams', 'Mobile responsiveness issues on complex web apps'],
    deliverables: ['User Research & Journey Mapping', 'Wireframes & Interactive Prototypes', 'High-Fidelity UI Design (Figma)', 'Design Systems & Component Libraries', 'Usability Testing & Refinements'],
    processSteps: [
      { title: '01 UX Research', desc: 'Mapping user journeys, pain points and key functional requirements.' },
      { title: '02 Wireframing', desc: 'Iterating on layout structure and task flows prior to visual styling.' },
      { title: '03 Visual UI Design', desc: 'Applying brand aesthetics, micro-interactions and dark-mode elegance.' },
      { title: '04 Design System Handoff', desc: 'Building scalable Figma component specs ready for developer handoff.' },
    ],
    caseStudyHighlight: {
      title: 'Nivara Wealth Dashboard',
      desc: 'Redesigned a quantitative fintech dashboard, reducing user time-to-first-investment by 60%.',
    },
  },
  'development-technology': {
    title: 'Development & Technology',
    tagline: "Good design shouldn't stop at the prototype.",
    heroDesc: 'Modern frontend development with React, TypeScript, Vite, Tailwind CSS, Framer Motion, Three.js, and headless CMS integrations.',
    problemsSolved: ['Sluggish website load times hurting Google rankings', 'Clunky frontend code that doesn\'t match design specs', 'Brittle codebase difficult to maintain or scale', 'Lack of smooth animations and responsive polishing'],
    deliverables: ['Production React / Next.js Applications', 'Tailwind CSS Custom Design Systems', 'Framer Motion & WebGL Interactive Animations', 'Headless CMS & API Integration', 'SEO & Performance Optimization'],
    processSteps: [
      { title: '01 Architecture Setup', desc: 'Configuring modern React/TypeScript workspace with Tailwind and Vite.' },
      { title: '02 Component Engineering', desc: 'Building modular, reusable components adhering to strict design tokens.' },
      { title: '03 Integration & Animation', desc: 'Hooking up APIs, routing and scroll-triggered micro-animations.' },
      { title: '04 QA & Performance Audit', desc: 'Rigorous cross-device testing ensuring 95+ Lighthouse scores.' },
    ],
    caseStudyHighlight: {
      title: 'Nexa SaaS Frontend Architecture',
      desc: 'Built a 60fps real-time cloud monitoring UI using React, TypeScript, and Three.js canvas visuals.',
    },
  },
  'digital-growth-social': {
    title: 'Digital Growth & Social Presence',
    tagline: 'Get found. Get understood. Stay remembered.',
    heroDesc: 'Strategic Social Media Management (SMM), technical SEO architecture, creative short-form content direction, and digital presence engineering.',
    problemsSolved: ['Posting social content without clear strategic direction or leads', 'Poor organic Google search visibility for key service terms', 'Inconsistent visual branding across Instagram, LinkedIn, and Web', 'Low conversion rates on social traffic landing pages'],
    deliverables: ['Social Media Strategy & Content Calendars', 'Short-Form Video & Reel Creative Direction', 'Technical & On-Page SEO Architecture', 'Social Graphic Design Kits', 'Conversion Rate Optimization (CRO) Audits'],
    processSteps: [
      { title: '01 Growth Audit', desc: 'Evaluating current organic search, social engagement and funnel conversion.' },
      { title: '02 Content & Keyword Strategy', desc: 'Mapping high-intent search terms and viral content pillars.' },
      { title: '03 Creative Production', desc: 'Designing high-impact social templates, short-form reels, and blog visuals.' },
      { title: '04 Analytics & Optimization', desc: 'Weekly performance tracking and continuous campaign refinement.' },
    ],
    caseStudyHighlight: {
      title: 'Kapi Coffee Social Growth',
      desc: 'Built a multi-channel digital growth engine scaling local cafe subscriptions by 300% in 90 days.',
    },
  },
  'automation-ai': {
    title: 'Automation & AI Integration',
    tagline: 'Make the repetitive disappear.',
    heroDesc: 'Custom AI workflows, internal tool automation, CRM integrations, and operational design to help teams work faster with zero friction.',
    problemsSolved: ['Manual copy-pasting between CRM, email, and databases', 'Slow customer response times due to manual lead triage', 'Repetitive content formatting and data entry tasks', 'Lack of automated lead scoring and pipeline updates'],
    deliverables: ['Custom AI Assistant & Chat Bot Workflows', 'Zapier / Make / n8n Operational Pipelines', 'CRM & Email Triage Automation', 'Internal Admin Dashboards', 'Workflow Documentation & Training'],
    processSteps: [
      { title: '01 Bottleneck Mapping', desc: 'Identifying repetitive operational tasks consuming valuable team hours.' },
      { title: '02 Pipeline Architecture', desc: 'Designing secure AI prompts, webhooks and automated logic triggers.' },
      { title: '03 Integration Testing', desc: 'Testing end-to-end reliability across edge-case scenarios.' },
      { title: '04 Team Onboarding', desc: 'Deploying automated workflows with minimal friction.' },
    ],
    caseStudyHighlight: {
      title: 'Automated Lead Triage System',
      desc: 'Connected web enquiry forms directly to custom AI lead scoring and instant Slack notifications.',
    },
  },
  'launch-consultation': {
    title: 'Launch & Strategic Consultation',
    tagline: 'Know what to do next. Then make it happen.',
    heroDesc: 'Go-to-market strategy, product launch execution, brand and UX audits, roadmapping, and founder advisory sessions.',
    problemsSolved: ['Uncertainty on how to structure a product launch campaign', 'Unsure whether to prioritize brand, website, app, or marketing first', 'Low conversion rates on existing digital assets', 'Need an external expert perspective on design strategy'],
    deliverables: ['Go-To-Market (GTM) Launch Playbook', 'Comprehensive UX & Brand Audit Report', 'Phased Product Development Roadmap', '1-on-1 Strategic Advisory Sessions', 'Launch Campaign Asset Specs'],
    processSteps: [
      { title: '01 Comprehensive Audit', desc: 'Deep-dive review of existing assets, market positioning and objectives.' },
      { title: '02 Strategic Roadmap', desc: 'Defining exact priorities, deliverables, timelines and budget allocation.' },
      { title: '03 Execution Alignment', desc: 'Aligning design, development and marketing teams around launch goals.' },
      { title: '04 Post-Launch Review', desc: 'Analyzing launch telemetry and establishing next-phase iteration targets.' },
    ],
    caseStudyHighlight: {
      title: 'Roamly GTM Strategy',
      desc: 'Orchestrated the multi-channel launch roadmap for a spatial travel app, acquiring 10k early users.',
    },
  },
};

export const ServiceDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigateTo, openEnquiryModal } = useNavigation();

  const data = serviceDataMap[slug] || serviceDataMap['brand-identity'];

  return (
    <div className="w-full bg-[#F8F9FA] dark:bg-[#0C0C0C] text-gray-900 dark:text-[#F3F4EF] pt-32 pb-24 transition-colors duration-300">
      {/* Top Back Nav */}
      <div className="px-6 md:px-10 mb-8 max-w-7xl mx-auto">
        <button
          onClick={() => navigateTo('/services')}
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-600 dark:text-[#A5A8A1] hover:text-[#E30613] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ALL SERVICES</span>
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="px-6 md:px-10 mb-20">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase block mb-3 font-bold">
            CIRCLE DOT SERVICE LANDING PAGE
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-[#F3F4EF] mb-4">
            {data.title}
          </h1>
          <p className="font-display text-xl sm:text-2xl text-[#E30613] mb-6 font-semibold">
            "{data.tagline}"
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-[#A5A8A1] max-w-3xl leading-relaxed mb-10 font-light">
            {data.heroDesc}
          </p>

          <button
            onClick={() => openEnquiryModal(data.title)}
            className="px-8 py-4 rounded-full bg-[#E30613] text-white font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-opacity inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#E30613]/20"
          >
            <span>Discuss This Service</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* PROBLEMS SOLVED GRID */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-[#F3F4EF] mb-8">
            Challenges We Solve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.problemsSolved.map((prob) => (
              <div key={prob} className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#222222] flex items-start gap-3 shadow-sm">
                <span className="text-[#E30613] font-bold text-lg leading-none">✕</span>
                <p className="text-sm text-gray-600 dark:text-[#A5A8A1] leading-relaxed">{prob}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-20 px-6 md:px-10 bg-gray-100/60 dark:bg-[#141414]/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-[#F3F4EF] mb-8">
            What You Receive
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.deliverables.map((del) => (
              <div key={del} className="p-6 rounded-2xl bg-white dark:bg-[#0C0C0C] border border-gray-200 dark:border-[#222222] flex items-center gap-3 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#E30613] shrink-0" />
                <span className="text-sm font-mono text-gray-800 dark:text-[#D7E2EA]">{del}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-[#F3F4EF] mb-12">
            Execution Workflow
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.processSteps.map((step) => (
              <div key={step.title} className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#222222] shadow-sm">
                <h4 className="font-display font-bold text-sm text-[#E30613] mb-2">{step.title}</h4>
                <p className="text-xs text-gray-600 dark:text-[#A5A8A1] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY HIGHLIGHT */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#222222] text-center shadow-lg dark:shadow-2xl">
          <span className="text-xs font-mono text-[#E30613] uppercase tracking-widest block mb-2 font-bold">
            RELATED CASE STUDY SHOWCASE
          </span>
          <h3 className="font-display text-3xl font-bold text-gray-900 dark:text-[#F3F4EF] mb-4">
            {data.caseStudyHighlight.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-[#A5A8A1] mb-8 leading-relaxed">
            {data.caseStudyHighlight.desc}
          </p>

          <button
            onClick={() => openEnquiryModal(data.title)}
            className="px-8 py-3.5 rounded-full bg-[#E30613] text-white font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#E30613]/20"
          >
            <span>Start a Similar Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

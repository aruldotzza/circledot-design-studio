import React, { useEffect } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { EnquiryModal } from './components/EnquiryModal';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HowWeWorkPage } from './pages/HowWeWorkPage';
import { WorkPage } from './pages/WorkPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';

const SITE_URL = 'https://www.circledot.design';

const routeMetadata: Record<string, { title: string; description: string; keywords: string; type?: string }> = {
  '/': {
    title: 'Circle Dot Design Studio — Premium Design, Development & Growth for Startups',
    description: 'Circle Dot is a design-led studio in India helping ambitious startups and growing businesses with brand strategy, product design, React development, SEO optimization, and AI automation. Start with the problem. Build what matters.',
    keywords: 'design studio, brand strategy, product design, web development, React developer, SEO agency, AI automation, startup design, digital agency',
    type: 'website',
  },
  '/about': {
    title: 'About Circle Dot Design Studio — Strategy, Brand Design & Digital Execution',
    description: 'Circle Dot is a design-led studio that combines strategic thinking, visual branding, product design, full-stack development, growth marketing, and AI automation into one connected workflow. Founded on the belief that good design solves real problems.',
    keywords: 'about circle dot design studio, design agency, brand design studio, digital product design agency, creative studio India, design and development',
    type: 'website',
  },
  '/how-we-work': {
    title: 'Our Process — From Discovery to Launch & Growth | Circle Dot',
    description: 'Discover how Circle Dot delivers results through a 6-stage process: Discovery, Define, Design, Build, Launch, and Grow. Clear communication, focused execution, and transparent collaboration from day one to impact.',
    keywords: 'design process, product design process, development workflow, brand strategy process, launch process, design methodology, agile design workflow',
    type: 'website',
  },
  '/work': {
    title: 'Case Studies & Portfolio — Brand, Product & Digital Design Work',
    description: 'Explore Circle Dot\'s concept case studies showcasing brand identity design, product UI/UX, web development, and digital growth work across healthcare, fintech, travel, education, SaaS, and local business.',
    keywords: 'case studies, design portfolio, product design examples, brand case study, SaaS design, UI/UX portfolio, digital portfolio, design work showcase',
    type: 'website',
  },
  '/services': {
    title: 'Design & Development Services — Brand, Product, SEO & AI Automation',
    description: 'Circle Dot offers six core services: Brand & Identity Design, Digital & Product Design, Development & Technology, Digital Growth & SEO, Automation & AI Integration, and Strategic Launch Consultation.',
    keywords: 'design services, brand design, product design services, web development services, SEO services, AI automation, digital agency services, growth marketing',
    type: 'website',
  },
  '/services/brand-identity': {
    title: 'Brand & Identity Design Services — Logo, Strategy & Visual Systems',
    description: 'Create a commanding brand identity with strategic positioning, visual systems, logo design, typography, color systems, and brand guidelines that make you recognizable, trustworthy, and memorable across all touchpoints.',
    keywords: 'brand identity design, brand strategy, logo design, visual identity system, brand guidelines, branding agency, brand positioning, corporate identity',
    type: 'service',
  },
  '/services/digital-product-design': {
    title: 'Digital & Product Design — UX/UI Design for Web Apps & SaaS Products',
    description: 'Design intuitive, delightful user experiences for web applications, mobile platforms, SaaS dashboards, and digital products. We create user research-backed interfaces that simplify complexity and drive conversions.',
    keywords: 'product design, UX design, UI design, app design, SaaS design, web app design, user experience design, interface design, design system, usability',
    type: 'service',
  },
  '/services/development-technology': {
    title: 'Web Development & Technology — React, TypeScript, Vite, Tailwind CSS',
    description: 'Build production-ready web applications using modern React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Three.js. Performance-optimized, SEO-friendly, and fully responsive digital experiences.',
    keywords: 'React development, web development, front-end development, TypeScript, full-stack development, Vite, Tailwind CSS, responsive web design, web application development',
    type: 'service',
  },
  '/services/digital-growth-social': {
    title: 'Digital Growth & SEO Services — Organic Growth, Social Strategy & Optimization',
    description: 'Build a sharper digital presence with technical SEO architecture, on-page optimization, content strategy, short-form video direction, social media management, and conversion rate optimization (CRO).',
    keywords: 'SEO services, digital growth, organic growth, social media strategy, SEO optimization, content marketing, conversion rate optimization, CRO, social media management',
    type: 'service',
  },
  '/services/automation-ai': {
    title: 'AI Automation & Integration — Custom AI, Workflow Automation & CRM',
    description: 'Reduce manual work and boost efficiency with custom AI assistants, automated workflows, CRM integrations, internal tool building, and operational process design using no-code and custom solutions.',
    keywords: 'AI automation, workflow automation, CRM automation, AI integration, business automation, process automation, automation consulting, internal tools, Make.com, n8n',
    type: 'service',
  },
  '/services/launch-consultation': {
    title: 'Launch Strategy & Consulting — Go-to-Market, Audits & Roadmaps',
    description: 'Get strategic clarity with go-to-market (GTM) planning, comprehensive design audits, product launch roadmaps, phased execution plans, and founder advisory sessions.',
    keywords: 'launch strategy, GTM strategy, go-to-market planning, product launch, strategic consulting, design audit, startup consulting, founder advisory, product roadmap',
    type: 'service',
  },
};

const setMetaTag = (selector: string, attribute: string, value: string, isAttributeValue = false) => {
  const element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

  if (element) {
    if (isAttributeValue) {
      (element as HTMLLinkElement).setAttribute(attribute, value);
    } else {
      (element as HTMLMetaElement).setAttribute(attribute, value);
    }
    return;
  }

  const newTag = selector.startsWith('link')
    ? document.createElement('link')
    : document.createElement('meta');

  if (selector.startsWith('link')) {
    newTag.setAttribute('rel', attribute);
    newTag.setAttribute('href', value);
  } else {
    newTag.setAttribute(attribute === 'property' ? 'property' : 'name', attribute === 'property' ? selector.replace('meta[property="', '').replace('"]', '') : selector.replace('meta[name="', '').replace('"]', ''));
    newTag.setAttribute('content', value);
  }

  document.head.appendChild(newTag);
};

const MainRouter: React.FC = () => {
  const { currentPath } = useNavigation();

  useEffect(() => {
    const normalizedPath = currentPath === '/' ? '/' : currentPath.endsWith('/') && currentPath.length > 1 ? currentPath.slice(0, -1) : currentPath;
    const metadata = routeMetadata[normalizedPath] || routeMetadata['/'];
    const canonicalUrl = `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;

    document.title = metadata.title;

    const metaDescription = document.head.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', metadata.description);
    if (!metaDescription.parentNode) document.head.appendChild(metaDescription);

    const keywords = document.head.querySelector('meta[name="keywords"]') || document.createElement('meta');
    keywords.setAttribute('name', 'keywords');
    keywords.setAttribute('content', metadata.keywords);
    if (!keywords.parentNode) document.head.appendChild(keywords);

    const canonical = document.head.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', canonicalUrl);
    if (!canonical.parentNode) document.head.appendChild(canonical);

    const ogTitle = document.head.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', metadata.title);
    if (!ogTitle.parentNode) document.head.appendChild(ogTitle);

    const ogDescription = document.head.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', metadata.description);
    if (!ogDescription.parentNode) document.head.appendChild(ogDescription);

    const ogType = document.head.querySelector('meta[property="og:type"]') || document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.setAttribute('content', metadata.type || 'website');
    if (!ogType.parentNode) document.head.appendChild(ogType);

    const ogUrl = document.head.querySelector('meta[property="og:url"]') || document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.setAttribute('content', canonicalUrl);
    if (!ogUrl.parentNode) document.head.appendChild(ogUrl);

    const ogImage = document.head.querySelector('meta[property="og:image"]') || document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.setAttribute('content', `${SITE_URL}/og-image.svg`);
    if (!ogImage.parentNode) document.head.appendChild(ogImage);

    const twitterCard = document.head.querySelector('meta[name="twitter:card"]') || document.createElement('meta');
    twitterCard.setAttribute('name', 'twitter:card');
    twitterCard.setAttribute('content', 'summary_large_image');
    if (!twitterCard.parentNode) document.head.appendChild(twitterCard);

    const twitterTitle = document.head.querySelector('meta[name="twitter:title"]') || document.createElement('meta');
    twitterTitle.setAttribute('name', 'twitter:title');
    twitterTitle.setAttribute('content', metadata.title);
    if (!twitterTitle.parentNode) document.head.appendChild(twitterTitle);

    const twitterDescription = document.head.querySelector('meta[name="twitter:description"]') || document.createElement('meta');
    twitterDescription.setAttribute('name', 'twitter:description');
    twitterDescription.setAttribute('content', metadata.description);
    if (!twitterDescription.parentNode) document.head.appendChild(twitterDescription);

    const twitterImage = document.head.querySelector('meta[name="twitter:image"]') || document.createElement('meta');
    twitterImage.setAttribute('name', 'twitter:image');
    twitterImage.setAttribute('content', `${SITE_URL}/og-image.svg`);
    if (!twitterImage.parentNode) document.head.appendChild(twitterImage);

    const schemaId = 'circle-dot-schema';
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Circle Dot Design Studio',
      url: SITE_URL,
      logo: `${SITE_URL}/Logo/Circledot logo-1.png`,
      description: 'Design-led studio for brand strategy, product design, development, growth, and AI automation.',
      areaServed: 'Worldwide',
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'hello@circledot.design',
      },
    };

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);
  }, [currentPath]);

  const renderContent = () => {
    if (currentPath === '/about') {
      return <AboutPage />;
    }
    if (currentPath === '/how-we-work') {
      return <HowWeWorkPage />;
    }
    if (currentPath === '/work') {
      return <WorkPage />;
    }
    if (currentPath === '/services') {
      return <ServicesPage />;
    }

    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return <ServiceDetailPage slug={slug} />;
    }

    // Default Home Page
    return <HomePage />;
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans overflow-x-clip transition-colors duration-300">
      <Navigation />
      <main>{renderContent()}</main>
      <Footer />
      <EnquiryModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <MainRouter />
      </NavigationProvider>
    </ThemeProvider>
  );
};

export default App;

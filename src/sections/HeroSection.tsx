import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { ContactButton } from '../components/ContactButton';
import { Magnet } from '../components/Magnet';

export const HeroSection: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="h-screen w-full relative flex flex-col overflow-x-clip bg-white">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-20">
        <nav className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            className="text-[#111111] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-60 transition-opacity duration-200"
          >
            About
          </a>
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            Price
          </a>
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            Contact
          </a>
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <div className="w-full overflow-hidden mt-6 sm:mt-4 md:-mt-5 z-20">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m jack
          </h1>
        </FadeIn>
      </div>

      {/* Hero Portrait with Magnet */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          className="w-full flex justify-center"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Jack Portrait"
            className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-2xl"
          />
        </Magnet>
      </FadeIn>

      {/* Bottom bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 mt-auto flex justify-between items-end z-20 relative">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#333333] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={() => scrollToSection('about')} />
        </FadeIn>
      </div>
    </section>
  );
};


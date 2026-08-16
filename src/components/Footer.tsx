import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';

export const Footer: React.FC = () => {
  const { navigateTo, openEnquiryModal } = useNavigation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);

  const fitWatermark = () => {
    if (!svgRef.current || !textRef.current) return;
    try {
      const bbox = textRef.current.getBBox();
      svgRef.current.setAttribute(
        'viewBox',
        `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
      );
    } catch (e) {
      // Ignore if bbox unavailable during SSR/initial render
    }
  };

  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitWatermark);
    } else {
      fitWatermark();
    }

    window.addEventListener('resize', fitWatermark);
    return () => window.removeEventListener('resize', fitWatermark);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="w-full bg-white transition-colors duration-300">
      <section className="footer-section">
        <div className="footer-wrapper">
          
          {/* Left Card */}
          <div className="footer-left">
            <video className="footer-left-video" autoPlay muted loop playsInline preload="auto">
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4" type="video/mp4" />
            </video>

            <div className="footer-logo">
              <img 
                src="/Logo/Logo mockup.png" 
                alt="Circle Dot" 
                className="h-8 sm:h-9 w-auto object-contain brightness-0 invert" 
              />
            </div>

            <div className="footer-tagline-container">
              <p className="footer-tagline">
                Whatever you're building,<br />
                <span>let's design it better.</span>
              </p>
            </div>

            <div className="footer-social-row">
              <span className="footer-social-label">Stay in touch!</span>
              <div className="footer-social-icons">
                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-icon-btn" 
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                {/* Instagram / X */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-icon-btn" 
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* Behance */}
                <a 
                  href="https://behance.net" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-icon-btn" 
                  aria-label="Behance"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.101 0-5-2.262-5-5.5 0-3.419 2.058-5.5 5-5.5 2.82 0 4.67 1.956 4.67 5.163 0 .346-.037.837-.07 1.337h-7.3c.094 1.543 1.233 2.5 2.7 2.5 1.231 0 2.1-.645 2.45-1.5h2.276zm-4.726-5.5c-1.22 0-2.17.75-2.38 2h4.74c-.06-1.27-.92-2-2.36-2zm-10.926 8.5h-8.074v-16h7.5c2.392 0 4.227.971 4.227 3.676 0 1.776-.976 2.738-2.062 3.197 1.503.491 2.409 1.758 2.409 3.627 0 3.01-2.28 5.5-4.000 5.5zm-5.074-13v4h4.15c1.23 0 1.85-.6 1.85-1.93 0-1.39-.77-2.07-2.03-2.07h-3.97zm0 7v4.11h4.43c1.39 0 2.14-.64 2.14-2.06 0-1.47-.84-2.05-2.23-2.05h-4.34z" />
                  </svg>
                </a>
                {/* Dribbble */}
                <a 
                  href="https://dribbble.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-icon-btn" 
                  aria-label="Dribbble"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.502 8.502 0 0 1 1.93 5.312c-.44-.09-2.61-.48-5.045.52a42.92 42.92 0 0 0-.96-1.92c3.08-1.28 3.96-3.69 4.075-3.912zm-5.745-3.08c1.92 0 3.68.74 5.01 1.96-.13.25-.97 2.45-3.87 3.66a50.84 50.84 0 0 0-3.32-4.99c.7-.41 1.43-.63 2.18-.63zm-3.86 1.05a48.97 48.97 0 0 1 3.23 4.84c-2.82.94-5.38.97-5.91.97a8.536 8.536 0 0 1 2.68-5.81zm-5.46 7.42c.44 0 2.87-.02 5.86-.98.31.64.6 1.28.89 1.92-3.85 1.13-5.34 3.32-5.54 3.64a8.544 8.544 0 0 1-1.21-4.58zm2.34 5.82c.23-.33 1.55-2.28 5.25-3.36 1.02 2.69 1.48 5.4 1.62 6.3a8.51 8.51 0 0 1-6.87-2.94zm8.42 2.87c-.15-.81-.57-3.31-1.54-5.83 2.32-.92 4.43-.68 4.84-.62a8.515 8.515 0 0 1-3.3 6.45z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="footer-right">
            {/* Floating Badge */}
            <div className="footer-lucky-graphic">
              <div 
                className="lucky-cube cursor-pointer transition-transform hover:scale-105"
                onClick={() => openEnquiryModal()}
                title="Start a Project"
              >
                <span className="lucky-cube-mark">C</span>
              </div>
              <div className="lucky-text-row">
                <div className="lucky-arrow">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 20 C 6 14, 10 9, 18 5" />
                    <path d="M18 5 L 12 5" />
                    <path d="M18 5 L 18 11" />
                  </svg>
                </div>
                <span className="lucky-text">Feeling lucky?</span>
              </div>
            </div>

            {/* Top Section with Nav Columns */}
            <div className="footer-right-top">
              <div className="footer-nav-cols">
                <div className="footer-col">
                  <div className="footer-col-title">Navigation</div>
                  <button onClick={() => navigateTo('/work')}>Case Studies</button>
                  <button onClick={() => navigateTo('/services')}>Services</button>
                  <button onClick={() => navigateTo('/how-we-work')}>How We Work</button>
                  <button onClick={() => navigateTo('/about')}>About</button>
                  <button onClick={() => openEnquiryModal()}>Contact</button>
                </div>

                <div className="footer-col">
                  <div className="footer-col-title">Services</div>
                  <button onClick={() => navigateTo('/services/brand-identity')}>Brand & Identity</button>
                  <button onClick={() => navigateTo('/services/digital-product-design')}>Product Design</button>
                  <button onClick={() => navigateTo('/services/development-technology')}>Development & Tech</button>
                  <button onClick={() => navigateTo('/services/digital-growth-social')}>Digital Growth</button>
                  <button onClick={() => navigateTo('/services/automation-ai')}>Automation & AI</button>
                </div>

                <div className="footer-col">
                  <div className="footer-col-title">Company</div>
                  <button onClick={() => navigateTo('/about')}>About Us</button>
                  <a href="mailto:hello@circledot.design">hello@circledot.design</a>
                  <button onClick={() => openEnquiryModal()}>Get in Touch</button>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="footer-bottom">
              <div className="footer-copyright">
                © 2026 Circle Dot Design Studio. All rights reserved.
              </div>

              <div className="footer-cta-mini">
                <h4>
                  <strong>Stay ahead with Circle Dot.</strong>
                </h4>

                <form onSubmit={handleSubscribe} className="footer-subscribe-row">
                  <input 
                    type="email" 
                    placeholder={subscribed ? "Subscribed!" : "Enter email address"} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit">{subscribed ? "Joined" : "Subscribe"}</button>
                </form>
              </div>
            </div>
          </div>

        </div>

        {/* Watermark SVG */}
        <div className="footer-watermark" aria-hidden="true">
          <svg 
            ref={svgRef} 
            id="watermarkSvg" 
            viewBox="62 95 876 175" 
            preserveAspectRatio="xMidYMid meet" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <text 
              ref={textRef} 
              id="watermarkText" 
              x="500" 
              y="240" 
              textAnchor="middle" 
              fontSize="320"
            >
              Circle Dot
            </text>
          </svg>
        </div>
      </section>
    </footer>
  );
};

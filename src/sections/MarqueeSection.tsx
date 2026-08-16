import React, { useRef, useState, useEffect } from 'react';

const row1Gifs = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
];

const row2Gifs = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Tripled lists for infinite horizontal feel
  const row1Images = [...row1Gifs, ...row1Gifs, ...row1Gifs];
  const row2Images = [...row2Gifs, ...row2Gifs, ...row2Gifs];

  const row1Transform = `translateX(${scrollOffset - 200}px)`;
  const row2Transform = `translateX(${-(scrollOffset - 200)}px)`;

  return (
    <section
      ref={sectionRef}
      className="bg-gray-50 pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full relative"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1: Moves RIGHT */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-3 w-max"
            style={{
              transform: row1Transform,
              willChange: 'transform',
            }}
          >
            {row1Images.map((src, index) => (
              <img
                key={`row1-${index}`}
                src={src}
                alt={`3D motion work preview ${index + 1}`}
                loading="lazy"
                className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0 select-none bg-slate-900"
              />
            ))}
          </div>
        </div>

        {/* Row 2: Moves LEFT */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-3 w-max"
            style={{
              transform: row2Transform,
              willChange: 'transform',
            }}
          >
            {row2Images.map((src, index) => (
              <img
                key={`row2-${index}`}
                src={src}
                alt={`3D motion work preview ${index + 1}`}
                loading="lazy"
                className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0 select-none bg-slate-900"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

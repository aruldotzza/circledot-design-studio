import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  responsiveSrc?: { mobile: string; tablet: string; desktop: string };
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder,
  responsiveSrc,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  // Use responsive sources if provided
  const srcset = responsiveSrc
    ? `${responsiveSrc.mobile} 640w, ${responsiveSrc.tablet} 1024w, ${responsiveSrc.desktop} 1440w`
    : undefined;

  const sizes = responsiveSrc ? '(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1440px' : undefined;

  return (
    <picture>
      {responsiveSrc && (
        <>
          <source media="(max-width: 640px)" srcSet={responsiveSrc.mobile} />
          <source media="(max-width: 1024px)" srcSet={responsiveSrc.tablet} />
          <source media="(min-width: 1025px)" srcSet={responsiveSrc.desktop} />
        </>
      )}
      <img
        src={src}
        srcSet={srcset}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundColor: !isLoaded ? '#f3f4f6' : undefined,
        }}
      />
    </picture>
  );
};

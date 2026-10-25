import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  backgroundImage?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge = 'Oferta dla przemysłu',
  backgroundImage,
}) => {
  return (
    <section className="page-hero relative pt-32 pb-16 md:pt-40 md:pb-24 bg-industrial-900 border-b border-gray-800/80 overflow-hidden">
      {/* Background with technical grid & subtle glow */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-industrial-950/85 z-10" />
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="w-full h-full object-cover opacity-20"
          />
        )}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              'linear-gradient(125deg, rgba(8,15,26,0.96) 0%, rgba(17,24,39,0.86) 50%, rgba(45,32,10,0.45) 100%), radial-gradient(circle at 20% 20%, rgba(245,158,11,0.16), transparent 30%), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 40px)',
          }}
        />
        <div className="absolute inset-x-0 bottom-[-25%] h-40 bg-industrial-accent/10 blur-3xl" />
      </div>

      <div className="page-container relative z-20 text-center animate-hero-fade-in">
        {badge ? (
          <div className="mb-4 flex justify-center">
            <span className="section-badge">{badge}</span>
          </div>
        ) : null}
        <h1 className="page-hero-title text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 md:mb-5 uppercase tracking-tight">
          {title}
        </h1>
        <p className="page-hero-subtitle text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

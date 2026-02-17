import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, backgroundImage }) => {
  const heroImage = backgroundImage || 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=2000';

  return (
    <section className="page-hero relative min-h-[44vh] md:min-h-[52vh] flex items-end bg-industrial-900 border-b border-gray-800 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tło sekcji"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-industrial-900/45 via-industrial-900/70 to-industrial-950/95 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(245,158,11,0.18),transparent_45%)] z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center pt-20 pb-14 md:pt-24 md:pb-20">
        <h1 className="page-hero-title text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 uppercase tracking-tight drop-shadow-2xl">
          {title}
        </h1>
        <p className="page-hero-subtitle text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed bg-black/25 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/10">
          {subtitle}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-industrial-950 to-transparent z-20" />
    </section>
  );
};

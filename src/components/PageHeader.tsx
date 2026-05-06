import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <section className="relative py-24 bg-industrial-900 border-b border-gray-800 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-industrial-900/90 z-10" />
        {backgroundImage && (
          <img 
            src={backgroundImage} 
            alt="Background" 
            className="w-full h-full object-cover opacity-30"
          />
        )}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(120deg, rgba(8,15,26,0.96) 0%, rgba(15,23,42,0.8) 45%, rgba(68,48,15,0.58) 100%), radial-gradient(circle at 18% 18%, rgba(245,158,11,0.18), transparent 26%), radial-gradient(circle at 82% 35%, rgba(255,255,255,0.08), transparent 28%), repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 34px), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 34px)',
          }}
        />
        <div className="absolute inset-x-0 bottom-[-20%] h-40 bg-industrial-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tight"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            <span className="text-[var(--color-acc2)]">01.</span> {t('about.title')}
          </h2>
          <div className="h-[1px] bg-white/20 flex-grow md:max-w-xs"></div>
        </div>

        {/* Bloc avec Spotlight Effect */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl border border-white/10 bg-dark-card overflow-hidden group"
        >
          {/* Spotlight dynamique qui suit la souris (Feature 2) */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ease-out"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center p-10 md:p-14">
            <div className="flex-1 space-y-6 text-lg text-gray-300 leading-relaxed font-light">
              <p className="group-hover:text-white transition-colors duration-500">{t('about.p1')}</p>
              <p className="group-hover:text-[var(--color-acc1)] transition-colors duration-500 font-medium">
                {t('about.p2')}
              </p>
            </div>
            
            <div className="relative w-64 h-64 flex-shrink-0 group/img">
              <div className="absolute inset-0 border-2 border-[var(--color-acc2)] rounded translate-x-4 translate-y-4 group-hover/img:translate-x-2 group-hover/img:translate-y-2 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-[var(--color-acc2)]/20 rounded mix-blend-screen group-hover/img:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2670&auto=format&fit=crop" 
                alt="Programming code" 
                className="w-full h-full object-cover rounded relative z-0 grayscale group-hover/img:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

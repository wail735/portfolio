import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-32 px-6 min-h-screen flex items-center z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              <span className="text-neon-cyan">01.</span> {t('about.title')}
            </h2>
            <div className="h-[1px] bg-white/20 flex-grow md:max-w-xs"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 text-gray-300 text-lg leading-relaxed">
            <div>
              <p className="mb-6">
                {t('about.p1')}
              </p>
              <p>
                {t('about.p2')}
              </p>
            </div>
            
            <div className="relative group">
              <div className="w-full h-80 rounded overflow-hidden relative z-10 transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2">
                <img 
                  src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800&auto=format&fit=crop" 
                  alt="Chennouf wail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 border-2 border-[var(--color-acc1)] rounded z-0 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

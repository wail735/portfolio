import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { playHoverSound } from '../../utils/audio';

export default function Experience() {
  const { t } = useTranslation();
  const experiences = t('experience.list', { returnObjects: true });

  return (
    <section id="experience" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            <span className="text-[var(--color-acc2)]">02.</span> {t('experience.title')}
          </h2>
          <div className="h-[1px] bg-white/20 flex-grow md:max-w-xs"></div>
        </div>

        <div className="relative border-l-2 border-white/10 ml-4 md:ml-0">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onMouseEnter={playHoverSound}
              className="mb-12 ml-8 relative group"
            >
              {/* Le point sur la timeline */}
              <div className="absolute w-5 h-5 bg-dark-bg border-2 border-[var(--color-acc2)] rounded-full -left-[43px] top-1 group-hover:bg-[var(--color-acc2)] group-hover:shadow-[0_0_15px_var(--color-acc2)] transition-all duration-300"></div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[var(--color-acc2)] transition-colors">
                  {exp.role}
                </h3>
                <span className="hidden md:block text-gray-500">•</span>
                <span className="text-[var(--color-acc1)] font-mono">{exp.company}</span>
              </div>
              
              <div className="text-sm font-mono text-gray-500 mb-4 bg-white/5 inline-block px-3 py-1 rounded">
                {exp.year}
              </div>
              
              <p className="text-gray-400 leading-relaxed max-w-2xl">
                {exp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

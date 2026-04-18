import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { playHoverSound } from '../../utils/audio';
import GithubCalendar from '../ui/GithubCalendar';

export default function Experience() {
  const { t } = useTranslation();
  const experiences = t('experience.list', { returnObjects: true }) || [];

  return (
    <section id="experience" className="py-32 px-6 relative z-10 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            <span className="text-[var(--color-acc2)]">02.</span> {t('experience.title')}
          </h2>
          <div className="h-[1px] bg-white/20 flex-grow md:max-w-xs"></div>
        </div>

        {/* Construit une Timeline Verticale Standard */}
        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12 mb-24">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative pl-8 md:pl-12"
              onMouseEnter={playHoverSound}
            >
              {/* Point de la Timeline */}
              <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full bg-[var(--color-acc2)] shadow-[0_0_10px_var(--color-acc2)]" />
              
              <div className="bg-[#111] border border-white/10 p-8 rounded-xl hover:border-[var(--color-acc2)]/50 transition-all group shadow-xl">
                <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-[var(--color-acc2)] font-mono text-sm mb-4">
                   {exp.year}
                </span>
                <h3 className="text-2xl font-bold text-white group-hover:text-[var(--color-acc1)] transition-colors">{exp.role}</h3>
                <h4 className="text-lg text-gray-500 font-medium mb-4">{exp.company}</h4>
                <p className="text-gray-400 leading-relaxed">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature 4: Github Calendar Mockup */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <GithubCalendar />
        </motion.div>

      </div>
    </section>
  );
}

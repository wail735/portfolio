import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { playHoverSound } from '../../utils/audio';
import GithubCalendar from '../ui/GithubCalendar';
import TrophyCanvas from '../3d/TrophyCanvas';

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

        {/* Le Carousel 3D (Trophy Room) remplaçant la Timeline HTML */}
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="mb-24 w-full"
        >
          <p className="text-gray-400 mb-6 font-mono text-sm max-w-xl">
            Cliquez et glissez avec la souris pour interagir avec la Chambre des Trophées et inspecter chaque sommet de mon parcours professionnel modélisé en verre mathématique 3D.
          </p>
          <TrophyCanvas experiences={experiences} />
        </motion.div>

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

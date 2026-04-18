import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import { Download } from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }} // Délai allongé pour laisser le Loader disparaître
        >
          <span className="text-neon-cyan font-semibold tracking-wider uppercase text-sm mb-4 block">
            {t('hero.greeting')}
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight min-h-[140px] md:min-h-[160px]">
            {t('hero.name')}
            <br />
            {/* Feature 4: Effet Machine à écrire */}
            <TypeAnimation
              sequence={[
                t('hero.titles.0', { defaultValue: 'Développeur Frontend 🚀' }),
                2000,
                t('hero.titles.1', { defaultValue: 'Passionné par l\'UI/UX 🎨' }),
                2000,
                t('hero.titles.2', { defaultValue: 'Créateur d\'expériences 3D 🌐' }),
                2000
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple block"
            />
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-transparent border-2 border-neon-cyan text-neon-cyan font-medium rounded hover:bg-neon-cyan hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)]"
            >
              {t('hero.btnProjects')}
            </a>
            
            {/* Feature 5: Bouton de Téléchargement du CV */}
            <a 
              href="/CV_Chennouf_wail.pdf" 
              download
              className="px-8 py-4 bg-white/5 border-2 border-transparent text-white font-medium rounded hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <Download size={20} />
              {t('hero.btnCv')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

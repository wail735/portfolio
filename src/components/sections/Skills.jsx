import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Palette, Globe, Terminal, Code2, Database, Layout } from 'lucide-react';
import CodePlayground from '../ui/CodePlayground';

export default function Skills() {
  const { t } = useTranslation();
  const gridRef = useRef(null);
  
  // Fonction globale pour illuminer les cartes au passage de la souris
  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    const cards = gridRef.current.getElementsByClassName('bento-card');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Injecte la position X Y exacte de la souris dans chaque carte via CSS
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  const icons = [Layout, Database, Palette, Globe, Terminal, Code2];
  const skillsList = t('skills.list', { returnObjects: true }) || [];

  // Définition astucieuse des largeurs pour créer le design asymétrique Bento !
  const spans = ['md:col-span-2', 'md:col-span-1', 'md:col-span-1', 'md:col-span-2', 'md:col-span-2', 'md:col-span-1'];

  return (
    <section id="skills" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-20">
          <div className="h-[1px] bg-white/20 flex-grow md:max-w-xs"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-right">
            {t('skills.title')} <span className="text-[var(--color-acc1)]">.03</span>
          </h2>
        </div>

        <div 
          ref={gridRef}
          onMouseMove={handleMouseMove}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 group/grid"
        >
          {skillsList.map((skill, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={index}
                className={`bento-card relative rounded-3xl bg-dark-card border border-white/10 overflow-hidden ${spans[index] || 'md:col-span-1'} p-8 min-h-[250px] flex flex-col justify-between hover:border-[var(--color-acc1)]/50 transition-colors shadow-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]`}
              >
                {/* Couche de lumière "Spotlight" sous le texte */}
                <div 
                  className="absolute inset-0 z-0 opacity-0 group-hover/grid:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(500px circle at var(--mouse-x,-100px) var(--mouse-y,-100px), rgba(0,240,255,0.08), transparent 40%)',
                  }}
                />
                
                <div className="relative z-10 text-[var(--color-acc2)] mb-8">
                  <Icon size={48} strokeWidth={1} />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover/grid:text-[var(--color-acc1)] transition-colors">{skill.name}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{skill.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Pack 7: Editeur de code en temps réel (JIT React) */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8 }}
        >
           <CodePlayground />
        </motion.div>

      </div>
    </section>
  );
}

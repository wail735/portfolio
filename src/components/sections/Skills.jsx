import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Code2, 
  Database, 
  Globe, 
  Layout, 
  Palette, 
  Terminal 
} from 'lucide-react';

export default function Skills() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const skillIcons = [Layout, Database, Palette, Globe, Terminal, Code2];

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            <span className="text-neon-cyan">02.</span> {t('skills.title')}
          </h2>
          <div className="h-[1px] bg-white/20 flex-grow md:max-w-xs"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {t('skills.list', { returnObjects: true }).map((skill, index) => {
            const Icon = skillIcons[index];
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="group p-6 rounded bg-dark-card border border-white/10 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] relative overflow-hidden"
              >
                {/* Effet lueur de fond */}
                <div className="absolute top-0 right-0 p-8 w-32 h-32 bg-[var(--color-acc1)] opacity-5 blur-2xl transform translate-x-10 -translate-y-10 group-hover:opacity-20 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <Icon className="w-10 h-10 text-[var(--color-acc1)] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
                  <p className="text-gray-400">{skill.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

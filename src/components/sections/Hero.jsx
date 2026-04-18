import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import MagneticButton from '../ui/MagneticButton';
import Tilt from 'react-parallax-tilt';

export default function Hero() {
  const { t } = useTranslation();
  const [showCv, setShowCv] = useState(false);
  const titles = t('hero.titles', { returnObjects: true });

  const sequence = titles.flatMap(title => [title, 2000]);

  return (
    <>
      <section id="hero" className="min-h-screen flex items-center justify-center relative px-6 z-10 pointer-events-none">
        
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center pointer-events-auto">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-[var(--color-acc1)] font-mono mb-4 text-lg">
                {t('hero.greeting')}
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-normal">
                {t('hero.name')}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 block py-2 min-h-[80px] md:min-h-[120px]">
                  <TypeAnimation
                    sequence={sequence}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="inline"
                  />
                </span>
              </h1>
              
              <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-12 leading-relaxed">
                {t('hero.description')}
              </p>

              {/* Feature 2: Boutons Magnétiques propulsés par Framer Motion Springs */}
              <div className="flex flex-col sm:flex-row gap-6 mt-8">
                <MagneticButton>
                  <a href="#projects" className="px-8 py-4 bg-[var(--color-acc1)] text-black font-bold uppercase tracking-wider text-sm rounded shadow-[0_0_15px_var(--color-acc1)] hover:brightness-125 transition-all text-center block w-full">
                    {t('hero.btnProjects')}
                  </a>
                </MagneticButton>
                
                <MagneticButton>
                  <button 
                     onClick={() => setShowCv(true)}
                     className="px-8 py-4 border border-[var(--color-acc1)] text-[var(--color-acc1)] font-bold uppercase tracking-wider text-sm rounded hover:bg-[var(--color-acc1)] hover:text-black transition-colors text-center block w-full"
                  >
                    {t('hero.btnCv')}
                  </button>
                </MagneticButton>
              </div>

            </motion.div>
          </div>

          {/* Colonne de Droite (Vidée jusqu'à présent) - Ajout de la carte Holographique Code */}
          <div className="hidden md:flex justify-end items-center relative">
            <motion.div 
               initial={{ opacity: 0, x: 50, rotateY: 20 }}
               animate={{ opacity: 1, x: 0, rotateY: 0 }}
               transition={{ duration: 1, delay: 0.5, type: 'spring' }}
               className="relative z-10 w-full max-w-sm"
            >
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.3} glareColor="var(--color-acc1)" scale={1.05} className="w-full">
                <div className="backdrop-blur-xl bg-[#050505]/60 border border-white/5 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden relative group">
                   
                   {/* Cercle néon de décoration au fond */}
                   <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-acc1)] blur-[80px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-700"></div>
                   
                   <div className="flex gap-2 mb-6">
                     <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                   </div>

                   <pre className="text-xs lg:text-sm font-mono text-gray-300 overflow-hidden leading-relaxed">
                     <code className="block mb-1"><span className="text-purple-400 font-bold">const</span> <span className="text-blue-400 font-bold">Developer</span> <span className="text-cyan-400">=</span> {'{'}</code>
                     <code className="block mb-1 ml-4"><span className="text-gray-400">name:</span> <span className="text-green-300">'{t('hero.name')}'</span>,</code>
                     <code className="block mb-1 ml-4"><span className="text-gray-400">skills:</span> [<span className="text-green-300">'React'</span>, <span className="text-green-300">'Three.js'</span>],</code>
                     <code className="block mb-1 ml-4"><span className="text-gray-400">type:</span> <span className="text-green-300">'{t('heroRight.type')}'</span>,</code>
                     <code className="block mb-1 ml-4"><span className="text-gray-400">available:</span> <span className="text-orange-400">true</span>,</code>
                     <code className="block mb-1 ml-4"><span className="text-gray-400">execute:</span> <span className="text-purple-400 font-bold">() =&gt;</span> {'{'}</code>
                     <code className="block mb-1 ml-8"><span className="text-cyan-400">buildMasterpiece</span>();</code>
                     <code className="block mb-1 ml-4">{'}'}</code>
                     <code className="block">{'}'};</code>
                   </pre>

                   <div className="mt-8 flex justify-between items-center border-t border-white/5 pt-4">
                      <div className="text-[10px] text-gray-500 tracking-widest uppercase font-black">
                         {t('heroRight.engine')}
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[var(--color-acc1)] animate-ping"></div>
                   </div>
                </div>
              </Tilt>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Feature 4: Modal Numérique pour Lire le CV sans Téléchargement Aveugle */}
      <AnimatePresence>
        {showCv && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCv(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()} 
              className="bg-dark-bg border border-white/10 w-full h-full max-w-6xl rounded-2xl relative overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/5 backdrop-blur-md">
                 <h3 className="text-white font-black tracking-widest uppercase text-xl">
                   <span className="text-[var(--color-acc1)]">●</span> Curriculum Vitae
                 </h3>
                 <div className="flex items-center gap-6">
                   <a href="/CV_Chennouf_wail.pdf" download="CV_Chennouf_wail.pdf" className="hidden md:block text-[var(--color-acc2)] font-mono text-sm hover:underline">
                     [Download Source]
                   </a>
                   <button onClick={() => setShowCv(false)} className="text-gray-400 hover:text-white transition-colors bg-white/10 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                     ✕
                   </button>
                 </div>
              </div>
              <div className="flex-grow w-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                 {/* Si le navigateur ne lit pas les PDF, fallback standard iframe */}
                 <object 
                   data="/CV_Chennouf_wail.pdf" 
                   type="application/pdf" 
                   className="w-full h-full"
                 >
                    <p className="text-white p-8">Votre navigateur ne prend pas en charge la lecture PDF. <a href="/CV_Chennouf_wail.pdf" download className="text-neon-cyan underline">Télécharger le fichier ici</a>.</p>
                 </object>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

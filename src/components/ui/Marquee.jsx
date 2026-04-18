import React from 'react';
import { motion } from 'framer-motion';

export default function Marquee() {
  const textLine = "CRAFTING DIGITAL EXPERIENCES • CREATIVE DEVELOPER • BUILDING THE WEB • MODERN UI/UX • ";

  return (
    <div className="w-full relative py-8 overflow-hidden bg-white/5 border-y border-white/10 -rotate-2 -mx-4 md:-mx-8 lg:-mx-20 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20">
      <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-transparent to-dark-bg z-10 pointer-events-none"></div>
      
      <div className="flex whitespace-nowrap">
        {/* L'animation utilise x = -100% sur un élément et nous le dupliquons pour l'illusion thermique de l'infini */}
        <motion.div
          animate={{ x: [0, -1035] }} // 1035px environ la largueur du block, ajusté par Tailwind
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 15
          }}
          className="flex whitespace-nowrap text-[var(--color-acc1)] font-black text-4xl md:text-6xl tracking-widest opacity-80"
        >
          <span className="px-4">{textLine}</span>
          <span className="px-4">{textLine}</span>
          <span className="px-4">{textLine}</span>
        </motion.div>
      </div>
    </div>
  );
}

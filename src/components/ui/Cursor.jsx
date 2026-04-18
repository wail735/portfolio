import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Suit la souris et désactive le pointeur natif (si CSS n'est pas suffisant)
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Détecte le survol des éléments interactifs
    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' || 
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') !== null ||
        e.target.closest('button') !== null
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-neon-cyan/80 z-[999] pointer-events-none mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 16, // Moitié de la taille w-8 h-8
          y: mousePosition.y - 16,
          scale: isHovered ? 2 : 1,
          backgroundColor: isHovered ? "rgba(0, 240, 255, 0.4)" : "transparent"
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      
      {/* Point central de la souris */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-neon-cyan z-[999] pointer-events-none hidden md:block"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovered ? 0 : 1
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }} // Suivi instantané du point
      />
    </>
  );
}

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export default function Konami() {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    let position = 0;

    const handleKeyDown = (e) => {
      if (e.key === KONAMI_CODE[position]) {
        position++;
        if (position === KONAMI_CODE.length) {
          setIsActive(true);
          position = 0; // Reset
        }
      } else {
        position = 0; // Mauvaise touche, on réinitialise
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Logique du Canvas Matrix
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00f0ff'; // Cyan néon
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    // Désactive l'easter egg après 10 secondes ou au clic
    const timeout = setTimeout(() => setIsActive(false), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsActive(false)}
          className="fixed inset-0 z-[9999] bg-black cursor-pointer"
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-4xl md:text-6xl font-black text-white bg-black/50 px-8 py-4 rounded shadow-[0_0_50px_#00f0ff] border-2 border-neon-cyan">
              BIENVENUE DANS LA MATRICE
            </h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

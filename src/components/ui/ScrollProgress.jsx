import React from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-acc1)] origin-left z-[9999] shadow-[0_0_10px_var(--color-acc1)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

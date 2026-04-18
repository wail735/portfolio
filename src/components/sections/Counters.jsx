import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code, Coffee, Briefcase } from 'lucide-react';

const CountUpNode = ({ target, label, icon: Icon }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 secondes
      const incrementTime = 20; // rafraichissement toutes les 20ms
      const steps = duration / incrementTime;
      const stepValue = target / steps;

      const timer = setInterval(() => {
        start += stepValue;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center">
      <Icon size={40} className="text-[var(--color-acc1)] mb-4 opacity-80" />
      <span className="text-4xl md:text-6xl font-black text-white font-mono tracking-tighter mb-2 shadow-text">
        {count.toLocaleString()}
        {target > 1000 && "+"}
      </span>
      <span className="text-gray-400 font-medium uppercase tracking-widest text-sm">{label}</span>
    </div>
  );
};

export default function Counters() {
  const { t } = useTranslation();
  const stats = t('counters.stats', { returnObjects: true }) || [];

  const icons = [Code, Coffee, Briefcase];

  return (
    <section className="py-16 md:py-24 px-6 border-y border-white/10 bg-gradient-to-b from-transparent via-white/5 to-transparent relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <CountUpNode 
            key={i} 
            target={stat.value} 
            label={stat.label} 
            icon={icons[i]} 
          />
        ))}
      </div>
    </section>
  );
}

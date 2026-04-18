import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, ArrowRight } from 'lucide-react';
import { playHoverSound } from '../../utils/audio';

export default function Blog() {
  const { t } = useTranslation();
  const articles = t('blog.articles', { returnObjects: true });

  return (
    <section id="blog" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            <span className="text-[var(--color-acc1)]">04.</span> {t('blog.title')}
          </h2>
          <div className="h-[1px] bg-white/20 flex-grow md:max-w-xs"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.a
              href="#"
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={playHoverSound}
              className="block p-6 rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-[var(--color-acc1)]/50 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:scale-125 transition-all text-[var(--color-acc1)]">
                <BookOpen size={48} />
              </div>
              
              <span className="text-[var(--color-acc2)] text-xs font-mono font-bold tracking-wider mb-2 block">
                {article.category}
              </span>
              
              <h3 className="text-xl font-bold text-white mb-8 group-hover:text-[var(--color-acc1)] transition-colors">
                {article.title}
              </h3>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-gray-500 text-sm">{article.date}</span>
                <span className="text-white flex items-center gap-2 text-sm font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  {t('blog.read')} <ArrowRight size={16} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

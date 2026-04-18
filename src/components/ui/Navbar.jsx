import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Palette, Globe } from 'lucide-react';
import { playThemeSound, playHoverSound } from '../../utils/audio';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const [themeIndex, setThemeIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Liste des thèmes possibles (reliés aux classes du body définies dans index.css)
  const themes = ['', 'theme-matrix', 'theme-cyberpunk'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#hero' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.blog'), href: '#blog' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  // Gestion du système de Thème (Feature 7)
  const toggleTheme = () => {
    playThemeSound(); // Son SFX
    const nextIndex = (themeIndex + 1) % themes.length;
    setThemeIndex(nextIndex);
    document.body.className = themes[nextIndex];
  };

  // Gestion du clic mobile pour forcer le scroll APRÈS la fermeture du menu
  const handleMobileClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200); // Wait for the menu closing animation
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-bg/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center max-w-6xl">
        <a href="#hero" className="text-2xl font-bold tracking-tighter">
          <span className="text-white">DEV</span>
          <span className="text-neon-cyan">.PORTFOLIO</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onMouseEnter={playHoverSound}
              className="text-sm font-medium text-gray-300 hover:text-[var(--color-acc1)] transition-colors"
            >
              {link.name}
            </a>
          ))}

          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
            {/* Bouton de Langue AI */}
            <LanguageSelector />
            
            {/* Bouton de Thème */}
            <button 
              onClick={toggleTheme}
              className="text-gray-400 hover:text-neon-purple transition-colors"
              aria-label="Changer de thème"
            >
              <Palette size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button - Minimal */}
        <div className="md:hidden flex items-center gap-4">
            <LanguageSelector />
            <button onClick={toggleTheme} className="text-gray-400">
              <Palette size={18} />
            </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-bg/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col items-center py-6 gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleMobileClick(e, link.href)}
                  className="text-lg font-medium text-gray-300 hover:text-[var(--color-acc1)] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

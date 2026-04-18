import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Monitor, Terminal, FileText, Mail, Home, Gamepad2 } from 'lucide-react';
import { useToast } from '../../utils/ToastContext';
import MiniGame from '../3d/MiniGame';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);
  const { addToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Écoute de Cmd+K ou Ctrl+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      addToast("Palette de commandes activée", "system");
    } else {
      setSearch('');
    }
  }, [isOpen]);

  const actions = [
    { id: 'theme', label: 'Changer de couleur / Thème global', icon: <Monitor size={18} />, onSelect: () => {
      const themes = ['theme-cyberpunk', 'theme-matrix'];
      // Bascule simplifiée
      document.body.className = document.body.className === 'theme-cyberpunk' ? 'theme-matrix' : 'theme-cyberpunk';
      addToast("Interface Visuelle Modifiée", "success");
      setIsOpen(false);
    } },
    { id: 'home', label: 'Retourner à l\'Accueil', icon: <Home size={18} />, onSelect: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
    } },
    { id: 'contact', label: 'Créer un nouvel Email', icon: <Mail size={18} />, onSelect: () => {
      window.location.hash = '#contact';
      addToast("Redirection vers la passerelle Node.js", "system");
      setIsOpen(false);
    } },
    { id: 'matrix', label: 'Plonger dans la Matrice (Easter Egg)', icon: <Terminal size={18} />, onSelect: () => {
      addToast("Utilisez le code [Haut Haut Bas Bas Gauche Droite Gauche Droite B A]", "info");
      setIsOpen(false);
    } },
    { id: 'arcade', label: 'Lancer "Cyber Dodge" (Mini-jeu WebGL 3D)', icon: <Gamepad2 size={18} />, onSelect: () => {
      setIsGameOpen(true);
      setIsOpen(false);
    } }
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
    <AnimatePresence>
      {isGameOpen && <MiniGame onClose={() => setIsGameOpen(false)} />}
    </AnimatePresence>
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-32 bg-black/50 backdrop-blur-sm px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-2xl bg-dark-card border border-white/20 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="flex items-center px-4 py-4 border-b border-white/10">
              <Search className="text-gray-400 mr-3" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tapez une commande (theme, email, mat...)"
                className="w-full bg-transparent border-none outline-none text-white text-lg placeholder-gray-500"
              />
              <span className="text-xs bg-white/10 border border-white/20 text-gray-400 px-2 py-1 rounded hidden md:block">ESC</span>
            </div>
            
            <div className="max-h-96 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Aucune commande système trouvée.</p>
              ) : (
                filtered.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.onSelect}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                        <span className="text-gray-500 group-hover:text-[var(--color-acc1)] transition-colors">
                        {action.icon}
                        </span>
                        {action.label}
                    </div>
                    <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                        Exécuter ↵
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}

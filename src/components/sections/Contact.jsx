import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle } from 'lucide-react';
import { playClickSound, playHoverSound } from '../../utils/audio';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    playClickSound(); // Feature 3: Action Sound effect

    setStatus('submitting');
    try {
      // Si une variable d'environnement existe (en ligne), on l'utilise, sinon on utilise le local
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error(result);
        setStatus('idle');
        alert("Erreur");
      }
    } catch (error) {
      console.error(error);
      setStatus('idle');
      alert("Erreur");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-32 px-6 min-h-screen flex items-center relative">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-neon-purple font-semibold tracking-wider uppercase text-sm mb-4 block">
            04. {t('contact.subtitle')}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            {t('contact.desc')}
          </p>
          <div className="space-y-6 text-gray-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                <span className="text-neon-cyan">📧</span>
              </div>
              <p>akramwail382@gmail.com</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-dark-card border border-white/10 p-8 rounded relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-[var(--color-acc2)] opacity-10 blur-3xl transform translate-x-32 -translate-y-32"></div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="space-y-2">
              <input
                type="text" name="name" value={formData.name} onChange={handleChange} required disabled={status === 'submitting'}
                className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-[var(--color-acc1)] transition-all"
                placeholder={t('contact.placeholders.name')}
              />
            </div>
            <div className="space-y-2">
              <input
                type="email" name="email" value={formData.email} onChange={handleChange} required disabled={status === 'submitting'}
                className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-[var(--color-acc2)] transition-all"
                placeholder={t('contact.placeholders.email')}
              />
            </div>
            <div className="space-y-2">
              <textarea
                name="message" rows="4" value={formData.message} onChange={handleChange} required disabled={status === 'submitting'}
                className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-[var(--color-acc1)] transition-all resize-none"
                placeholder={t('contact.placeholders.msg')}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded text-white font-medium transition-all duration-300
                ${status === 'success' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                  : 'bg-transparent border border-[var(--color-acc2)] hover:bg-[var(--color-acc2)] hover:text-black hover:shadow-[0_0_20px_var(--color-acc2)]'
                }`}
            >
              {status === 'submitting' && <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>}
              {status === 'success' ? <><CheckCircle size={20} />{t('contact.btnSent')}</> : status === 'idle' ? <><Send size={20} />{t('contact.btnSend')}</> : t('contact.btnSending')}
            </button>
          </form>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-gray-500 font-mono text-xs w-full px-6">
        <p>{t('contact.footer')}</p>
      </div>
    </section>
  );
}

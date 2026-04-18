import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../utils/ToastContext';
import { Terminal, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle size={18} className="text-green-400" />;
      case 'error': return <AlertCircle size={18} className="text-red-400" />;
      case 'system': return <Terminal size={18} className="text-[var(--color-acc1)]" />;
      default: return <Info size={18} className="text-white" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="pointer-events-auto flex items-center gap-3 px-5 py-4 bg-dark-card border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-lg min-w-[300px] cursor-pointer"
            onClick={() => removeToast(toast.id)}
          >
            {getIcon(toast.type)}
            <p className="text-sm font-medium text-white">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

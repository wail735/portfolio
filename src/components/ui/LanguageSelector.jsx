import React, { useState } from 'react';
import { Bot, RefreshCw } from 'lucide-react';
import i18n from '../../i18n';
import { useToast } from '../../utils/ToastContext';

// Dictionnaire de correspondances basique
const languageMap = {
  japonais: "ja", japanese: "ja", ja: "ja",
  anglais: "en", english: "en", en: "en",
  espagnol: "es", spanish: "es", es: "es",
  allemand: "de", german: "de", de: "de",
  italien: "it", italian: "it", it: "it",
  arabe: "ar", arabic: "ar", ar: "ar",
  chinois: "zh-CN", chinese: "zh-CN", cn: "zh-CN",
  russe: "ru", russian: "ru", ru: "ru",
  portugais: "pt", portuguese: "pt", pt: "pt",
  coreen: "ko", korean: "ko", ko: "ko",
  hindi: "hi", indien: "hi",
  hollandais: "nl", dutch: "nl",
  turc: "tr", turkish: "tr",
  grec: "el", greek: "el"
};

export default function LanguageSelector() {
  const [langQuery, setLangQuery] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const { addToast } = useToast();

  const handleTranslate = async (e) => {
    e.preventDefault();
    const query = langQuery.trim().toLowerCase();
    if (!query) return;

    setIsTranslating(true);
    addToast("L'IA traduit le site mondialement...", "info");

    try {
      const currentResource = i18n.getResourceBundle('fr', 'translation');
      
      // Extraction magique du code ISO
      let targetIso = languageMap[query] || query.slice(0, 2);

      // Si la traduction est existante dans nos fichiers de données internes (Anglais, Français...)
      if (['en', 'fr'].includes(targetIso) || i18n.hasResourceBundle(targetIso, 'translation')) {
         i18n.changeLanguage(targetIso);
         addToast(`Interface générée nativement (${targetIso.toUpperCase()})`, "success");
         setShowInput(false);
         setLangQuery('');
         setIsTranslating(false);
         return;
      }

      // Extraction de toutes les phrases pour BATCH-TRANSLATION (1 seule requête API)
      const stringsToTranslate = [];
      const extractStrings = (obj) => {
        if (typeof obj === 'string') stringsToTranslate.push(obj);
        else if (Array.isArray(obj)) obj.forEach(extractStrings);
        else if (typeof obj === 'object') Object.values(obj).forEach(extractStrings);
      };
      extractStrings(currentResource);

      // On joint tout avec un séparateur secret très reconnaissable
      const bulkText = stringsToTranslate.join('\n\n|===|\n\n');

      // Traduction Massive en 1 appel direct (0 proxy requis, 0 Throttling requis)
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=${targetIso}&dt=t&q=${encodeURIComponent(bulkText)}`);
      if (!res.ok) throw new Error("API Google indisponible (CORS/429)");
      
      const data = await res.json();
      const translatedBulk = data[0].map(x => x[0]).join('');
      const translatedStrings = translatedBulk.split(/\n\s*\|===\|\s*\n/); // Regex tolérante aux espaces

      // Ré-injection dans le dictionnaire de l'interface
      let idx = 0;
      const rebuildDictionary = (obj) => {
        if (typeof obj === 'string') return translatedStrings[idx++] || obj;
        if (Array.isArray(obj)) return obj.map(rebuildDictionary);
        if (typeof obj === 'object') {
           const newObj = {};
           for (const key in obj) newObj[key] = rebuildDictionary(obj[key]);
           return newObj;
        }
        return obj;
      };

      const translatedData = rebuildDictionary(currentResource);
      
      // Enregistrement au coeur de i18n et Switch d'interface
      i18n.addResourceBundle(targetIso, 'translation', translatedData, true, true);
      i18n.changeLanguage(targetIso);
      
      addToast(`Le site a été converti à 100% avec succès (${targetIso.toUpperCase()})`, "success");
      setShowInput(false);
      setLangQuery('');

    } catch(err) {
      console.error(err);
      addToast("Erreur serveur lors de la traduction massive.", "error");
    }
    setIsTranslating(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowInput(!showInput)} 
        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 p-2 bg-white/5 rounded-full border border-white/10 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
        title="Traduction Universelle Live par IA"
      >
         {isTranslating ? <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div> : <Bot size={20} className="text-cyan-400" />}
      </button>

      {showInput && (
        <form onSubmit={handleTranslate} className="absolute top-12 right-0 bg-[#0a0a0a]/90 backdrop-blur-xl p-3 rounded-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-3 min-w-[250px] z-50">
           <p className="text-xs text-[var(--color-acc1)] font-mono uppercase tracking-widest">{i18n.t('translator.connected', { defaultValue: "Connecté à l'API Linguistique" })}</p>
           <input 
             type="text" 
             placeholder={i18n.t('translator.placeholder', { defaultValue: "Traduire le site en... (ex: Japonais)" })}
             value={langQuery}
             onChange={e => setLangQuery(e.target.value)}
             className="bg-black/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white w-full focus:outline-none focus:border-cyan-400 font-sans"
             autoFocus
           />
           <button type="submit" disabled={isTranslating} className="bg-gradient-to-r from-[var(--color-acc1)] to-[var(--color-acc2)] text-black font-bold px-3 py-2 rounded-lg text-sm disabled:opacity-50 flex justify-center hover:brightness-125 transition-all">
             {isTranslating ? i18n.t('translator.loading', { defaultValue: 'Traduction Profonde...' }) : i18n.t('translator.btn', { defaultValue: 'Lancer l\'algorithme' })}
           </button>
        </form>
      )}
    </div>
  );
}

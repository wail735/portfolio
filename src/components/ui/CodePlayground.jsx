import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const codeTemplate = `
function FuturisticCard() {
  const [active, setActive] = React.useState(false);
  
  return (
    <div 
      style={{
        padding: '2rem',
        background: active ? '#1a1a1a' : '#0a0a0a',
        border: '1px solid ' + (active ? '#00f0ff' : '#333'),
        borderRadius: '16px',
        color: '#fff',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        boxShadow: active ? '0 0 30px rgba(0,240,255,0.2)' : 'none',
        transform: active ? 'scale(1.05)' : 'scale(1)'
      }}
      onClick={() => setActive(!active)}
    >
      <h3 style={{ margin: 0, color: active ? '#00f0ff' : '#fff', fontWeight: 'bold' }}>
        {active ? 'SYSTEME OPÉRATIONNEL 🚀' : 'INITIALISER SYSTÈME'}
      </h3>
      <p style={{ marginTop: '1rem', color: '#888', fontSize: '14px', lineHeight: '1.6' }}>
        Modifiez mon code source React à gauche (couleurs, texte).<br/>
        Observez le composant DOM se re-compiler en temps réel !
      </p>
    </div>
  );
}
`;

export default function CodePlayground() {
  return (
    <div className="w-full mt-24 mb-12 group">
       <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[var(--color-acc1)]/10 rounded-xl text-[var(--color-acc1)] border border-[var(--color-acc1)]/30">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Environnement React Live</h3>
            <p className="text-gray-400 text-sm mt-1">Compilateur local intégré. (Sandbox JIT)</p>
          </div>
       </div>

       <LiveProvider code={codeTemplate.trim()} scope={{ React }}>
         <div className="w-full bg-[#0d0d0d] rounded-2xl border border-white/10 overflow-hidden flex flex-col xl:flex-row shadow-2xl transition-all hover:border-white/20 hover:shadow-[0_0_50px_rgba(0,240,255,0.05)]">
            
            {/* GAUCHE : Editeur */}
            <div className="w-full xl:w-3/5 border-b xl:border-b-0 xl:border-r border-white/10 relative">
               <div className="bg-[#151515] px-4 py-3 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    <span className="font-mono text-xs text-gray-400 ml-3 hidden sm:block">InteractiveUI.jsx</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-[10px] text-[var(--color-acc1)] border border-[var(--color-acc1)]/30 bg-[var(--color-acc1)]/10 px-2 py-0.5 rounded uppercase tracking-widest font-bold animate-pulse">Compile</span>
                  </div>
               </div>
               {/* La zone éditeur react-live (basée sur Prism) */}
               <div className="p-4 h-[400px] overflow-y-auto text-sm font-mono editor-container scrollbar-thin bg-black/40">
                 <LiveEditor className="focus:outline-none transparent-editor" />
               </div>
            </div>
            
            {/* DROITE : Preview */}
            <div className="w-full xl:w-2/5 relative flex flex-col">
               <div className="bg-[#151515] px-4 py-3 border-b border-white/10 flex items-center">
                  <span className="font-mono text-xs text-gray-400">Viewport (Résultat Live)</span>
               </div>
               {/* Grille de fond technologique */}
               <div 
                 className="p-8 flex-grow flex items-center justify-center relative overflow-hidden"
                 style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundColor: '#050505' }}
               >
                 {/* Ombre portée subtile */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                 
                 <div className="relative z-10 w-full max-w-sm">
                   <LivePreview />
                 </div>
               </div>
               <div className="absolute bottom-0 left-0 w-full">
                 <LiveError className="bg-red-900/90 backdrop-blur text-white p-4 text-xs font-mono max-h-32 overflow-y-auto border-t border-red-500 m-0" />
               </div>
            </div>

         </div>
       </LiveProvider>
    </div>
  );
}

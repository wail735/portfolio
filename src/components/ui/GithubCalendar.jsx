import React from 'react';

export default function GithubCalendar() {
  const username = 'wail735';
  const imgUrl = `https://ghchart.rshah.org/39d353/${username}`;

  return (
    <div className="w-full overflow-x-auto p-6 md:p-8 bg-dark-card border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] mt-12 mb-4 group relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
         <div>
           <h3 className="text-white font-bold text-xl flex items-center gap-3">
              <svg className="w-6 h-6 text-green-500 group-hover:text-green-400 transition-colors drop-shadow-[0_0_5px_rgba(57,211,83,0.5)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              Activité GitHub Officielle
           </h3>
           <p className="text-sm text-gray-400 mt-1">Graphe connecté en temps-réel à l'API GitHub de : <strong className="text-green-400">@{username}</strong></p>
         </div>
      </div>
      
      {/* Container Graphique */}
      <div className="w-full min-h-[160px] flex items-center justify-center bg-black/40 rounded-xl border border-white/5 p-4 overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
         {/* Injection pure de l'API graphique GitHub */}
         <img 
            src={imgUrl} 
            alt={`GitHub Contribution Graph for ${username}`} 
            className="w-full max-w-4xl opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.02] filter drop-shadow-[0_0_8px_rgba(57,211,83,0.4)] hue-rotate-15 contrast-125" 
            onError={(e) => { e.target.style.display='none'; document.getElementById('gh-error').style.display='block'; }}
         />
         <div id="gh-error" className="hidden text-red-400 font-mono text-sm text-center">
            [Erreur API] Utilisateur introuvable ou erreur de connexion GitHub.
         </div>
      </div>

    </div>
  );
}

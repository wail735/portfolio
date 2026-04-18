import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, X } from 'lucide-react';

const GithubIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function Projects() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);

  const rawProjects = t('projects.projectsList', { returnObjects: true });
  
  // Mapping des data statiques sur les projets traduits
  const projects = rawProjects.map((proj, index) => {
    const techStacks = [
        ['React', 'Three.js', 'Tailwind CSS', 'Stripe'],
        ['Next.js', 'Chart.js', 'Framer Motion', 'Firebase'],
        ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io']
    ];
    const imageBgs = [
        'bg-gradient-to-br from-blue-900 to-black',
        'bg-gradient-to-br from-purple-900 to-black',
        'bg-gradient-to-br from-emerald-900 to-black'
    ];
    return {
        ...proj,
        idx: index,
        tech: techStacks[index] || ['React', 'CSS'],
        github: '#',
        demo: '#',
        imageBg: imageBgs[index] || 'bg-black'
    };
  });

  return (
    <section id="projects" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            <span className="text-[var(--color-acc1)]">03.</span> {t('projects.title')}
          </h2>
          <div className="h-[1px] bg-white/20 flex-grow md:max-w-xs"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: project.idx * 0.2 }}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col justify-between p-6 bg-dark-card border border-white/10 rounded cursor-pointer overflow-hidden hover:-translate-y-2 transition-transform duration-300 shadow-lg"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0 ${project.imageBg}`}></div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6 text-[var(--color-acc1)]">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <div className="flex gap-4">
                    <a href={project.github} onClick={e => e.stopPropagation()} className="text-gray-400 hover:text-[var(--color-acc1)] transition-colors">
                      <GithubIcon size={20} />
                    </a>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[var(--color-acc1)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {project.desc}
                </p>
              </div>

              <div className="relative z-10">
                <ul className="flex flex-wrap gap-3 text-xs font-mono text-white/50">
                  {project.tech.map((tech, i) => <li key={i}>{tech}</li>)}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature 6: Modale Pop-up (Project Details) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent close on modal click
              className="bg-[theme('colors.dark-bg')] border border-white/20 w-full max-w-3xl rounded-xl p-8 relative shadow-[0_0_50px_rgba(0,240,255,0.1)]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
              >
                <X size={28} />
              </button>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedProject.title}</h3>
              
              <div className="flex flex-wrap gap-2 my-6">
                 {selectedProject.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 text-[var(--color-acc1)] text-xs font-mono rounded">
                        {tech}
                    </span>
                 ))}
              </div>

              <div className={`w-full h-48 md:h-64 rounded-lg mb-8 ${selectedProject.imageBg} flex items-center justify-center`}>
                 <span className="text-white/50 font-bold tracking-widest uppercase">Screenshots / Demo</span>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-10">
                {selectedProject.fullDesc || selectedProject.desc}
              </p>

              <div className="flex gap-4">
                  <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="px-6 py-3 bg-[var(--color-acc1)] text-black font-semibold rounded hover:brightness-110 transition flex gap-2 items-center">
                      <ExternalLink size={18} /> Visiter le site
                  </a>
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white/10 text-white font-semibold rounded hover:bg-white/20 transition flex gap-2 items-center">
                      <GithubIcon size={18} /> Code Source
                  </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        about: "À propos",
        experience: "Parcours",
        skills: "Compétences",
        projects: "Projets",
        blog: "Blog",
        contact: "Contact",
      },
      hero: {
        greeting: "Bonjour, je suis",
        name: "Chennouf wail.",
        titles: ["Développeur Frontend 🚀", "Passionné par l'UI/UX 🎨", "Créateur d'expériences 3D 🌐"],
        description: "Un développeur passionné par la création d'interfaces utilisateur exceptionnelles, performantes et accessibles avec des technologies modernes.",
        btnProjects: "Voir mes projets",
        btnCv: "Télécharger mon CV",
      },
      about: {
        title: "À propos de moi",
        p1: "Bonjour ! Je m'appelle Chennouf wail et j'aime créer des choses qui vivent sur internet. Mon intérêt pour le développement web m'a poussé à sans cesse chercher des solutions plus belles et performantes.",
        p2: "Ma priorité absolue est de créer des produits accessibles, inclusifs et visuellement impactants.",
      },
      experience: {
        title: "Mon Parcours",
        list: [
          {
            year: "2025 - 2026",
            role: "Diplôme Master 2",
            company: "Université",
            desc: "Spécialisation et préparation de mon diplôme de fin d'études en Master 2. Actuellement en recherche d'opportunités et très motivé pour de nouveaux défis !"
          }
        ]
      },
      skills: {
        title: "Mes Compétences",
        list: [
          { name: "Frontend", desc: "React, Vue, HTML, CSS" },
          { name: "Backend", desc: "Node.js, Express, MongoDB" },
          { name: "Design", desc: "Figma, TailwindCSS" },
          { name: "3D Web", desc: "Three.js, React Three Fiber" },
          { name: "Outils", desc: "Git, Webpack, Vite" },
          { name: "Soft Skills", desc: "Clean Code, Agilité" }
        ]
      },
      projects: {
        title: "Quelques Projets",
        viewBtn: "Voir les détails",
        projectsList: [
          { title: "E-Commerce 3D", desc: "Une boutique en ligne avec une visualisation 3D des produits.", fullDesc: "Architecture complète pour un E-Commerce du futur gérant les paiements avec Stripe." },
          { title: "Dashboard Analytique", desc: "Plateforme SAAS pour visualiser des données complexes en temps réel.", fullDesc: "Une console puissante bâtie pour les Data Scientists." },
          { title: "App Web Sociale", desc: "Réseau social minimaliste de partage de code.", fullDesc: "Réseau social en temps réel géré par Socket.io." }
        ]
      },
      blog: {
        title: "Ma Veille Tech",
        read: "Lire l'article",
        articles: [
          { date: "Octobre 2024", title: "L'art du WebGL avec React Three Fiber", category: "3D Web" },
          { date: "Septembre 2024", title: "Optimiser les performances sous Next.js 14", category: "Performance" },
          { date: "Juillet 2024", title: "Tailwind CSS v4 : Pourquoi ça change tout", category: "CSS" }
        ]
      },
      contact: {
        subtitle: "Et ensuite ?", title: "Contactez-moi", desc: "Je suis à l'écoute d'opportunités. Envoyez-moi un message !",
        placeholders: { name: "Votre nom complet", email: "vous@exemple.com", msg: "Votre message ici..." },
        btnSending: "Envoi en cours...", btnSent: "Message Envoyé !", btnSend: "Envoyer", footer: "Conçu avec ❤️ par Chennouf wail"
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: "Home", about: "About", experience: "Journey", skills: "Skills", projects: "Projects", blog: "Blog", contact: "Contact",
      },
      hero: {
        greeting: "Hello, I am", name: "Chennouf wail.", titles: ["Frontend Developer 🚀", "UI/UX Enthusiast 🎨", "3D Web Creator 🌐"],
        description: "A passionate developer building beautiful, performant user interfaces.",
        btnProjects: "View projects", btnCv: "Download CV",
      },
      about: {
        title: "About Me", p1: "Hello! My name is Chennouf. I love creating things for the web.", p2: "My priority is accessibility and performance.",
      },
      experience: {
        title: "My Journey",
        list: [
          {
            year: "2025 - 2026", role: "Master's Degree (M2)", company: "University",
            desc: "Specialization and completion of my Master's degree. Currently looking for opportunities and highly motivated for new challenges!"
          }
        ]
      },
      skills: {
        title: "My Skills", list: [{ name: "Frontend", desc: "React, Vue" }, { name: "Backend", desc: "Node.js, MongoDB" }, { name: "Design", desc: "Figma" }, { name: "3D Web", desc: "Three.js" }, { name: "Tools", desc: "Git, Vite" }, { name: "Soft Skills", desc: "Clean Code" }]
      },
      projects: {
        title: "Some Projects", viewBtn: "Details", projectsList: [{ title: "3D E-Commerce", desc: "3D store.", fullDesc: "Full architecture." }, { title: "Dashboard", desc: "SAAS dashboard.", fullDesc: "Powerful console." }, { title: "Social App", desc: "Social network.", fullDesc: "Realtime Socket.io app." }]
      },
      blog: {
        title: "Tech Watch", read: "Read article",
        articles: [
          { date: "October 2024", title: "The Art of WebGL with R3F", category: "3D Web" },
          { date: "September 2024", title: "Performance in Next.js 14", category: "Performance" },
          { date: "July 2024", title: "Tailwind CSS v4 changes everything", category: "CSS" }
        ]
      },
      contact: {
        subtitle: "What's Next?", title: "Get In Touch", desc: "Open to opportunities.",
        placeholders: { name: "Name", email: "Email", msg: "Message" },
        btnSending: "Sending...", btnSent: "Sent!", btnSend: "Send Mail", footer: "Built with ❤️ by Chennouf wail"
      }
    }
  }
};

i18n.use(initReactI18next).init({ resources, lng: "fr", fallbackLng: "fr", interpolation: { escapeValue: false } });

export default i18n;

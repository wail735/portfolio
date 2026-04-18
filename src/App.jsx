import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';
import Experience from './components/sections/Experience';
import TechCube from './components/3d/TechCube';
import Loader from './components/ui/Loader';
import Cursor from './components/ui/Cursor';
import Konami from './components/ui/Konami';

function App() {
  return (
    <div className="relative w-full h-full text-white bg-dark-bg selection:bg-neon-cyan selection:text-black">
      {/* 
        Feature 2 & 5 & EasterEgg: Custom Cursor, Loader Global, Konami
      */}
      <Loader />
      <Cursor />
      <Konami />

      {/* 3D Canvas Background */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          {/* Feature 1: Particules / Étoiles */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="var(--color-acc1)" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="var(--color-acc2)" />
          
          <Suspense fallback={null}>
            <TechCube />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 font-sans">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Blog />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;

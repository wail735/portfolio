import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Logique Cœur du Jeu
function GameLogic({ setScore, setGameOver, isGameOver }) {
  const playerRef = useRef();
  const cubesRef = useRef([]);
  const frameRef = useRef(0);
  
  // Contrôleur Clavier stocké nativement pour haute performance
  useEffect(() => {
    window.gamePlayerX = 0;
    const handleKeyDown = (e) => {
      if(isGameOver) return;
      if (e.key === 'ArrowLeft') window.gamePlayerX = Math.max(window.gamePlayerX - 3, -6);
      if (e.key === 'ArrowRight') window.gamePlayerX = Math.min(window.gamePlayerX + 3, 6);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameOver]);

  useFrame((state, delta) => {
    if (isGameOver) return;
    frameRef.current += 1;

    // Déplacement inertiel du vaisseau (Lerp)
    if (playerRef.current) {
      playerRef.current.position.x += (window.gamePlayerX - playerRef.current.position.x) * 0.15;
    }

    // Apparition de générateurs d'obstacles (1 bloc toutes les 35 frames)
    if (frameRef.current % 35 === 0) {
      const xPos = Math.floor(Math.random() * 5) * 3 - 6; // -6, -3, 0, 3, 6
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 1.5),
        new THREE.MeshStandardMaterial({ color: '#ff003c', emissive: '#ff003c', emissiveIntensity: 2 })
      );
      mesh.position.set(xPos, 15, 0);
      state.scene.add(mesh);
      cubesRef.current.push(mesh);
    }

    // Calcul de Physique des chutes et Collisions
    for (let i = cubesRef.current.length - 1; i >= 0; i--) {
      const cube = cubesRef.current[i];
      cube.position.y -= 15 * delta;

      // Impact avec le joueur (Hauteur = -4)
      if (cube.position.y < -3.2 && cube.position.y > -4.8) {
        if (Math.abs(cube.position.x - playerRef.current.position.x) < 1.4) {
          // CHOC
          setGameOver(true);
          
          // Nettoyage de la scène
          cubesRef.current.forEach(c => state.scene.remove(c));
          cubesRef.current = [];
          return;
        }
      }

      // Esquive réussie
      if (cube.position.y < -6) {
         state.scene.remove(cube);
         cubesRef.current.splice(i, 1);
         setScore(s => s + 100);
      }
    }
  });

  return (
    <>
      <mesh ref={playerRef} position={[0, -4, 0]}>
        <boxGeometry args={[1.5, 1, 1]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3} wireframe={false} />
      </mesh>
      
      {/* Tunnel Grille Laser de vitesse */}
      <gridHelper args={[40, 40, '#ff00ff', '#111111']} position={[0, -5, -10]} rotation={[Math.PI / 2, 0, 0]} />
      <gridHelper args={[40, 40, '#00f0ff', '#111111']} position={[0, 10, -10]} rotation={[Math.PI / 2, 0, 0]} />
    </>
  );
}

// Wrapper Principal du composant (Exporté)
export default function MiniGame({ onClose }) {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const restart = () => {
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="fixed inset-0 z-[999999] bg-black">
       {/* UI 2D survolant le jeu */}
       <div className="absolute top-6 left-6 z-10">
          <h2 className="text-white font-mono text-2xl tracking-widest uppercase">
            Score: <span className="text-[var(--color-acc1)]">{score}</span>
          </h2>
       </div>

       <button onClick={onClose} className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full font-bold flex items-center justify-center transition-colors">
          ✕
       </button>

       {/* OSD Fin de jeu */}
       {gameOver && (
         <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
           <h1 className="text-6xl md:text-8xl font-black text-red-500 mb-4 animate-pulse">CRASH SYSTEM</h1>
           <p className="text-white text-xl mb-8 font-mono">Scores Uploadés : {score}</p>
           <div className="flex gap-4">
             <button onClick={restart} className="px-8 py-4 bg-[var(--color-acc1)] text-black font-bold uppercase rounded shadow-[0_0_20px_var(--color-acc1)] hover:brightness-110">
               RETRY [⟳]
             </button>
           </div>
         </div>
       )}
       
       <div className="absolute bottom-8 w-full text-center z-10 pointer-events-none">
          <p className="text-gray-500 font-mono text-sm tracking-widest uppercase animate-pulse">
            Pilotez avec les flèches [←] et [→]
          </p>
       </div>

       {/* Moteur R3F */}
       <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={1} color="#ffffff" />
          
          <GameLogic 
             setScore={setScore} 
             setGameOver={setGameOver} 
             isGameOver={gameOver} 
          />
       </Canvas>
    </div>
  );
}

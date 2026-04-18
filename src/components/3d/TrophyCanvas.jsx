import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, MeshTransmissionMaterial, Environment, Html, Lightformer } from '@react-three/drei';

function Trophy({ experience, position, index }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.5;
        meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* 1. L'objet Géométrique en Verre représentant le Trophée */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        {/* Couche Externe en Cristal Épais */}
        <mesh ref={meshRef}>
          {index % 3 === 0 && <icosahedronGeometry args={[1.5, 0]} />}
          {index % 3 === 1 && <torusKnotGeometry args={[1, 0.3, 100, 16]} />}
          {index % 3 === 2 && <octahedronGeometry args={[1.5, 0]} />}
          
          <MeshTransmissionMaterial 
             backside
             backsideThickness={1}
             thickness={1.5}
             chromaticAberration={1.5}
             anisotropy={1}
             clearcoat={1}
             clearcoatRoughness={0}
             envMapIntensity={3}
             transmission={1}
             roughness={0}
             metalness={0.2}
          />
        </mesh>
        
        {/* Noyau d'Énergie Interne Lumineux */}
        <mesh>
          {index % 3 === 0 && <icosahedronGeometry args={[0.7, 0]} />}
          {index % 3 === 1 && <torusGeometry args={[0.5, 0.1, 16, 100]} />}
          {index % 3 === 2 && <octahedronGeometry args={[0.7, 0]} />}
          <meshBasicMaterial color={index % 2 === 0 ? "#00f0ff" : "#8a2be2"} wireframe wireframeLinewidth={2} />
        </mesh>
      </Float>
      
      {/* 2. Titre 3D Suspendu en dessous */}
      <Text 
        position={[0, -2.5, 0]} 
        color="var(--color-acc1)" 
        fontSize={0.3} 
        maxWidth={3} 
        textAlign="center"
        anchorX="center" 
        anchorY="middle"
      >
        {experience.role}
      </Text>
      
      {/* 3. L'Entité HTML "Plaque de Musée" - Refonte Holographique */}
      <Html 
        transform 
        position={[0, -3.8, 0]} 
        distanceFactor={12}
        style={{ width: '420px', pointerEvents: 'none' }}
      >
        <div className="bg-[#030303]/90 backdrop-blur-2xl p-6 rounded-none border border-[var(--color-acc1)]/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] text-center relative overflow-hidden group">
          {/* Scanner Line Holographique */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-acc1)] to-transparent opacity-80 animate-[ping_3s_ease-in-out_infinite]"></div>
          
          {/* Angles Cyberpunk / High-Tech */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--color-acc1)]"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--color-acc1)]"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color-acc1)]"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--color-acc1)]"></div>

          <h4 className="text-[var(--color-acc1)] font-bold text-xl mb-3 tracking-widest uppercase drop-shadow-[0_0_10px_var(--color-acc1)]">{experience.company}</h4>
          <span className="inline-block bg-[var(--color-acc1)] text-black font-black text-xs px-3 py-1 mb-5 uppercase tracking-widest shadow-[0_0_15px_var(--color-acc1)]">{experience.year}</span>
          <p className="text-gray-300 text-sm leading-relaxed font-light">{experience.desc}</p>
        </div>
      </Html>
    </group>
  );
}

export default function TrophyCanvas({ experiences }) {
  if (!experiences || experiences.length === 0) return null;

  const getPosition = (index, total) => {
    // Si l'utilisateur n'a qu'un seul trophée, on le centre. Mieux vaut prévenir l'excentration.
    if (total === 1) return [0, 1, 0];
    
    // Sinon on les dispose en cercle (Orbites)
    const angle = (index / total) * Math.PI * 2;
    const radius = 4;
    return [Math.cos(angle) * radius, 1, Math.sin(angle) * radius];
  };

  return (
    <div className="w-full h-[700px] border border-white/5 bg-black/40 rounded-2xl overflow-hidden relative shadow-[0_0_80px_rgba(0,0,0,0.5)] pointer-events-none">
      
      {/* HUD Visuel (Heads UP Display) */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2 pointer-events-none">
        <div className="text-[var(--color-acc1)] text-xs font-mono tracking-widest uppercase flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--color-acc1)] rounded-full animate-pulse"></div>
          Chambre des Trophées
        </div>
        <div className="text-gray-500 text-[10px] font-mono tracking-widest uppercase">
          Moteur de Rendu : R3F / Drei MeshTransmission
        </div>
      </div>

      <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} intensity={2} color="var(--color-acc1)" />
        <spotLight position={[-10, 5, -10]} intensity={1} color="#8a2be2" />
        
        <Suspense fallback={null}>
          {/* Environnement synthétique auto-généré (Zéro téléchargement, Zéro "Failed to fetch") */}
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <Lightformer intensity={4} color="#00f0ff" position={[0, 5, -2]} form="ring" scale={[10, 10, 1]} />
              <Lightformer intensity={2} color="#8a2be2" position={[-5, 0, -2]} form="rect" scale={[10, 10, 1]} />
              <Lightformer intensity={2} color="white" position={[5, 0, -2]} form="circle" scale={[10, 10, 1]} />
            </group>
          </Environment>

          <group>
            {experiences.map((exp, index) => (
              <Trophy 
                key={index} 
                experience={exp} 
                index={index} 
                position={getPosition(index, experiences.length)} 
              />
            ))}
          </group>
        </Suspense>

        {/* Autorotate navigue entre les diplômes subtilement */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          autoRotate={true}
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.5}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
}

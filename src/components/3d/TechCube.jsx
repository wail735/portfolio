import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Edges } from '@react-three/drei';

export default function TechCube() {
  const cubeRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    // Temps pour les animations continues
    const time = state.clock.getElapsedTime();

    // Rotation de base animée
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.2;
      cubeRef.current.rotation.y += delta * 0.3;
    }

    // Effet parallax basé sur le scroll vertical
    const scrollY = window.scrollY;
    const height = document.body.clientHeight - window.innerHeight;
    const progress = height > 0 ? scrollY / height : 0;

    // Feature 1: Mouse Tracking Magnétique
    // state.mouse.x et y vont de -1 à +1 (centre de l'écran)
    const targetX = (state.mouse.x * Math.PI) / 4; 
    const targetY = (state.mouse.y * Math.PI) / 4;

    if (groupRef.current) {
      // Interpolation fluide (lerp) vers la position de la souris
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.z += (-targetX - groupRef.current.rotation.z) * 0.05;

      // Rotation Y est pilotée globalement par le scroll (avec un léger multiplicateur)
      groupRef.current.rotation.y = progress * Math.PI * 4;

      // Déplacement spatial
      groupRef.current.position.y = Math.sin(progress * Math.PI) * 1.5;
      groupRef.current.position.x = Math.cos(progress * Math.PI * 0.5) * 1.2 - 1.2;
      groupRef.current.position.z = Math.sin(progress * Math.PI) * 2 - 1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={cubeRef}>
          {/* Icosahedron pour un look de "Data Core" complexe au lieu d'un simple cube */}
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial 
            color="#0a0a0c" 
            roughness={0.2} 
            metalness={0.8} 
            envMapIntensity={2} 
            transparent
            opacity={0.9}
          />
          {/* Bordures Néon */}
          <Edges 
            scale={1.05} 
            threshold={15} // Affiche les arêtes dures
            color="#00f0ff" 
          />
        </mesh>
      </Float>
    </group>
  );
}

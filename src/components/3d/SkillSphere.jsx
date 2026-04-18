import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

export default function SkillSphere() {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  
  // Liste des mots/compétences
  const skills = [
    "React", "Node.js", "Three.js", "TailwindCSS", "Vite", "JavaScript",
    "HTML5", "CSS3", "Git", "Figma", "Express", "MongoDB", "Framer Motion",
    "UI/UX", "API REST", "WebGL", "GitHub", "Vercel", "Cloudflare", "Postman",
    "Frontend", "Backend", "Fullstack", "NPM"
  ];

  // Algorithme de distribution sur Sphère de Fibonacci
  const words = useMemo(() => {
    const temp = [];
    const count = skills.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Angle d'or
    const radius = 3; // Rayon de la sphère

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y va de 1 à -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const position = new THREE.Vector3(x * radius, y * radius, z * radius);
      
      temp.push({ 
        position, 
        word: skills[i]
      });
    }
    return temp;
  }, [skills]);

  // Tracking de la souris fluide et Rotation continue
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotation naturelle
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;

      // Mouse tracking (lerp) pour incliner la sphère
      const targetX = (state.mouse.y * Math.PI) / 8;
      const targetY = (state.mouse.x * Math.PI) / 8;
      
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.1;
      groupRef.current.rotation.z += (-targetY - groupRef.current.rotation.z) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map((item, index) => (
        // Billboard force le texte à toujours regarder la caméra malgré la rotation 3D de la Sphère
        <Billboard key={index} position={item.position}>
          <Text
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            // On alterne la couleur de l'outline (Néon) pour donner du volume
            outlineColor={index % 2 === 0 ? "var(--color-acc1)" : "var(--color-acc2)"}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'none'}
            className="hover:scale-125 transition-transform"
          >
            {item.word}
          </Text>
        </Billboard>
      ))}
    </group>
  );
}

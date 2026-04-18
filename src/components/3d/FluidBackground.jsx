import React, { useEffect, useRef } from 'react';
import webGLFluidEnhance from 'webgl-fluid';

export default function FluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      webGLFluidEnhance(canvasRef.current, {
        IMMEDIATE: true,        // Simule sans interaction
        TRIGGER: 'hover',       // Mode interaction
        SIM_RESOLUTION: 128,    // Résolution
        DYE_RESOLUTION: 512,  
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 1, 
        VELOCITY_DISSIPATION: 0.2, 
        PRESSURE: 0.8,
        PRESSURE_ITERATIONS: 20,
        CURL: 30,               // Turbulence
        SPLAT_RADIUS: 0.25,     // Taille des éclaboussures
        SPLAT_FORCE: 6000,      // Puissance cinétique
        SHADING: true,
        COLORFUL: false,        // Forcer nos couleurs (Cyan)
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 10, g: 10, b: 10 }, // Fond ultra-sombre (Dark Mode)
        TRANSPARENT: false,
        BLOOM: true,
        BLOOM_ITERATIONS: 8,
        BLOOM_RESOLUTION: 256,
        BLOOM_INTENSITY: 0.8,
        BLOOM_THRESHOLD: 0.6,
        BLOOM_SOFT_KNEE: 0.7,
        SUNRAYS: true,
        SUNRAYS_RESOLUTION: 196,
        SUNRAYS_WEIGHT: 1.0,
      });

      // Injecter la couleur Acc1 (Cyan) via DOM / script interne si COLORFUL:false ne suffit pas
      // webgl-fluid définit une fonction splat() globale ou color.
    }
  }, []);

  // Capture des mouvements de la souris de manière absolue pour contourner les z-index bloquants
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Propagation mathématique au canvas principal sans perturber le DOM
      if (canvasRef.current) {
         // Déclencher manuellement un event si besoin (souvent webgl-fluid écoute window automatiquement)
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-2] pointer-events-none">
       {/* pointer-events-auto : Si webgl-fluid a besoin d'absorber */}
       <canvas 
         ref={canvasRef} 
         className="w-full h-full block"
         style={{ width: '100vw', height: '100vh', pointerEvents: 'auto' }}
       />
    </div>
  );
}

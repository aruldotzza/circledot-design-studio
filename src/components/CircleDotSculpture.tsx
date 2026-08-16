import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

// Inner Sculpture 3D Component
const SculptureObject: React.FC<{ scrollProgress: number; isDark: boolean }> = ({ scrollProgress, isDark }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const ring4Ref = useRef<THREE.Group>(null);
  const ring5Ref = useRef<THREE.Group>(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Subtle mouse rotation interpolation
    const targetRotX = mouse.y * 0.15 + scrollProgress * 0.5;
    const targetRotY = state.clock.elapsedTime * 0.05 + mouse.x * 0.25;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);

    // Scroll scale & position shift
    const targetScale = 1 - scrollProgress * 0.35;
    const targetZ = -scrollProgress * 2;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05));
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);

    // Ring differential rotations
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.1;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.08;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.12;
    if (ring4Ref.current) ring4Ref.current.rotation.z -= delta * 0.07;
    if (ring5Ref.current) ring5Ref.current.rotation.x -= delta * 0.09;
  });

  const ringColor = isDark ? "#F3F4EF" : "#94a3b8";
  const ringColorMuted = isDark ? "#A5A8A1" : "#cbd5e1";
  const ringColorAlt = isDark ? "#D7E2EA" : "#cbd5e1";
  const ringOpacity = isDark ? 0.9 : 0.4;
  const coreColor = isDark ? "#0C0C0C" : "#e2e8f0";
  const coreOpacity = isDark ? 1 : 0.35;

  return (
    <group ref={groupRef}>
      {/* Central Dot: THE BUSINESS */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshPhysicalMaterial
          color={coreColor}
          roughness={isDark ? 0.2 : 0.5}
          metalness={isDark ? 0.8 : 0.1}
          clearcoat={0.3}
          clearcoatRoughness={0.1}
          emissive="#E30613"
          emissiveIntensity={isDark ? 0.05 : 0.04}
          transparent={!isDark}
          opacity={coreOpacity}
        />
      </mesh>

      {/* Orbiting System 1: BRAND */}
      <group ref={ring1Ref} rotation={[0.4, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[2.0, 0.012, 32, 100]} />
          <meshStandardMaterial color={ringColor} roughness={0.3} metalness={isDark ? 0.9 : 0.2} transparent={!isDark} opacity={ringOpacity} />
        </mesh>
        <mesh position={[2.0, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#E30613" roughness={0.1} metalness={isDark ? 0.9 : 0.3} transparent={!isDark} opacity={isDark ? 1 : 0.5} />
        </mesh>
      </group>

      {/* Orbiting System 2: DESIGN */}
      <group ref={ring2Ref} rotation={[-0.5, 0.6, 0.3]}>
        <mesh>
          <torusGeometry args={[2.7, 0.015, 32, 100]} />
          <meshStandardMaterial color={ringColorMuted} roughness={0.4} metalness={isDark ? 0.7 : 0.2} transparent={!isDark} opacity={ringOpacity} />
        </mesh>
        <mesh position={[0, 2.7, 0]}>
          <octahedronGeometry args={[0.1]} />
          <meshStandardMaterial color={ringColor} roughness={0.2} metalness={isDark ? 0.8 : 0.3} transparent={!isDark} opacity={isDark ? 1 : 0.5} />
        </mesh>
      </group>

      {/* Orbiting System 3: BUILD */}
      <group ref={ring3Ref} rotation={[0.8, -0.3, -0.4]}>
        <mesh>
          <torusGeometry args={[3.4, 0.018, 32, 100]} />
          <meshStandardMaterial color={ringColorAlt} roughness={0.2} metalness={isDark ? 0.8 : 0.2} transparent={!isDark} opacity={ringOpacity} />
        </mesh>
        <mesh position={[-3.4, 0, 0]}>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshStandardMaterial color="#E30613" roughness={0.1} metalness={isDark ? 0.9 : 0.3} transparent={!isDark} opacity={isDark ? 1 : 0.5} />
        </mesh>
      </group>

      {/* Orbiting System 4: LAUNCH */}
      <group ref={ring4Ref} rotation={[-0.2, -0.8, 0.5]}>
        <mesh>
          <torusGeometry args={[4.1, 0.014, 32, 100]} />
          <meshStandardMaterial color={ringColorMuted} roughness={0.5} metalness={isDark ? 0.6 : 0.2} transparent={!isDark} opacity={ringOpacity} />
        </mesh>
        <mesh position={[0, -4.1, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={ringColor} roughness={0.2} metalness={isDark ? 0.8 : 0.3} transparent={!isDark} opacity={isDark ? 1 : 0.5} />
        </mesh>
      </group>

      {/* Orbiting System 5: GROW */}
      <group ref={ring5Ref} rotation={[0.6, 0.9, -0.2]}>
        <mesh>
          <torusGeometry args={[4.8, 0.01, 32, 100]} />
          <meshStandardMaterial color={ringColor} roughness={0.1} metalness={isDark ? 0.95 : 0.2} transparent={!isDark} opacity={ringOpacity} />
        </mesh>
      </group>
    </group>
  );
};

export const CircleDotSculpture: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isDark } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // WebGL support check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // WebGL Fallback CSS/SVG Sculpture
  if (!hasWebGL) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="relative w-72 h-72 rounded-full border border-[#A5A8A1]/20 flex items-center justify-center animate-pulse">
          <div className="absolute w-56 h-56 rounded-full border border-[#C8FF32]/30 transform rotate-45"></div>
          <div className="absolute w-40 h-40 rounded-full border border-[#D7E2EA]/40 transform -rotate-45"></div>
          <div className="w-20 h-20 rounded-full bg-[#0C0C0C] border-2 border-[#F3F4EF] shadow-[0_0_30px_rgba(200,255,50,0.15)] flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#C8FF32]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[350px] sm:min-h-[450px] md:min-h-[550px] pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#F3F4EF" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#E30613" />
        <pointLight position={[0, 0, 2]} intensity={0.4} color="#D7E2EA" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <SculptureObject scrollProgress={scrollProgress} isDark={isDark} />
        </Float>
      </Canvas>
    </div>
  );
};

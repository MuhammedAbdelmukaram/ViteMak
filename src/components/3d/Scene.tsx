import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo, memo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useScroll, useTransform, useSpring } from 'framer-motion';

// Generate random points for the network with dynamic count based on device
function generatePoints(count: number, radius: number) {
  const points = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const angle = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    
    points[i3] = radius * Math.sin(phi) * Math.cos(angle);
    points[i3 + 1] = radius * Math.sin(phi) * Math.sin(angle);
    points[i3 + 2] = radius * Math.cos(phi);
    
    // Elegant gold/purple gradient colors
    colors[i3] = 0.6 + Math.random() * 0.2;     // R (gold tint)
    colors[i3 + 1] = 0.4 + Math.random() * 0.2; // G
    colors[i3 + 2] = 0.8 + Math.random() * 0.2; // B (purple tint)
    
    sizes[i] = Math.random() * 2;
  }
  
  return { points, colors, sizes };
}

const NetworkPoints = memo(function NetworkPoints() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 4.8;
  
  // Reduce point count and radius for mobile
  const count = isMobile ? 2000 : 3000;
  const baseRadius = isMobile ? 8 : 12;
  
  const { points, colors, sizes } = useMemo(
    () => generatePoints(count, baseRadius),
    [count, baseRadius]
  );
  
  const pointsRef = useRef<THREE.Points>(null);
  const { scrollYProgress } = useScroll();

  // Enhanced scroll-based transformations with smaller scale for mobile
  const smoothScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [isMobile ? 0.4 : 1, 0.2]),
    { stiffness: 100, damping: 30, restDelta: 0.001 }
  );

  // Rotation based on scroll
  const rotationX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.PI * 2]
  );

  const rotationY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.PI * 1.5]
  );

  // Position based on scroll - less movement on mobile
  const yPosition = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobile ? -3 : -5]
  );

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Apply scroll-based transformations with reduced animation for mobile
    const breathingIntensity = isMobile ? 0.03 : 0.05;
    const currentScale = smoothScale.get() * (1 + Math.sin(state.clock.getElapsedTime() * 0.5) * breathingIntensity);
    pointsRef.current.scale.set(currentScale, currentScale, currentScale);

    // Slower rotation for mobile
    const rotationSpeed = isMobile ? 0.05 : 0.1;
    pointsRef.current.rotation.x = rotationX.get() + state.clock.getElapsedTime() * rotationSpeed;
    pointsRef.current.rotation.y = rotationY.get() + state.clock.getElapsedTime() * (rotationSpeed * 1.5);
    
    // Update position
    pointsRef.current.position.y = yPosition.get();

    // Adjust point size based on scroll and device
    if (pointsRef.current.material) {
      const baseSize = isMobile ? 0.06 : 0.15;
      const scrollFactor = 1 - scrollYProgress.get();
      (pointsRef.current.material as THREE.PointsMaterial).size = 
        baseSize * (1 + scrollFactor * 0.5);
    }
  });

  return (
    <Points ref={pointsRef} positions={points} colors={colors} sizes={sizes}>
      <PointMaterial
        transparent
        vertexColors
        size={isMobile ? 0.06 : 0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={isMobile ? 0.5 : 0.8}
      />
    </Points>
  );
});

const SceneContent = memo(function SceneContent() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 4.8;

  return (
    <>
      <color attach="background" args={['#000000']} />
      
      <ambientLight intensity={isMobile ? 0.25 : 0.4} />
      <pointLight 
        position={[10, 10, 10]} 
        intensity={isMobile ? 0.3 : 0.5} 
        color="#e2b447" 
      />
      <pointLight 
        position={[-10, -10, -10]} 
        intensity={isMobile ? 0.15 : 0.3} 
        color="#a78bfa" 
      />
      <pointLight 
        position={[0, 20, 0]} 
        intensity={isMobile ? 0.1 : 0.2} 
        color="#f472b6" 
      />
      
      <NetworkPoints />
      
      <OrbitControls
        enableZoom={false}
        autoRotate={false}
        enablePan={false}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />
    </>
  );
});

export const Scene = memo(function Scene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Canvas
      className="w-full h-full"
      gl={{
        alpha: false,
        antialias: true,
        powerPreference: "high-performance",
        precision: "highp"
      }}
      camera={{ 
        position: [0, 0, isMobile ? 40 : 25], // Increased distance for mobile
        fov: isMobile ? 30 : 45 // Reduced FOV for mobile
      }}
      dpr={[1, 2]}
    >
      <SceneContent />
    </Canvas>
  );
});
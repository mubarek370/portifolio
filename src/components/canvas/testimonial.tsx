import { Float, OrbitControls, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

import { useInView } from "../../hooks/use-in-view";
import CanvasLoader from "../loader";

const HologramBadge = () => {
  const meshRef = useRef<Mesh>(null);

  return (
    <group>
      {/* Dynamic ambient and accent lights */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-3, -3, 2]} intensity={2} color="#915eff" />
      <pointLight position={[3, 3, 2]} intensity={2} color="#00cea8" />
      <pointLight position={[0, -2, -2]} intensity={1.5} color="#ffd700" />

      {/* Floating 3D Sculpture */}
      <Float
        speed={2.5}
        rotationIntensity={1.5}
        floatIntensity={2}
        floatingRange={[-0.1, 0.1]}
      >
        {/* Core Glowing Multifaceted Gem */}
        <mesh ref={meshRef} scale={1.35}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#804dee"
            emissive="#3b1d7d"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.85}
            distort={0.25}
            speed={2}
            wireframe={false}
          />
        </mesh>

        {/* Outer Orbiting Gyro Ring 1 */}
        <mesh rotation={[Math.PI / 4, Math.PI / 6, 0]} scale={1.8}>
          <torusGeometry args={[1, 0.03, 16, 64]} />
          <meshStandardMaterial
            color="#00cea8"
            emissive="#00cea8"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Outer Orbiting Gyro Ring 2 */}
        <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]} scale={2.1}>
          <torusGeometry args={[1, 0.025, 16, 64]} />
          <meshStandardMaterial
            color="#915eff"
            emissive="#915eff"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Floating Sparkle Particles */}
        <Sparkles
          count={45}
          scale={3.5}
          size={3}
          speed={0.6}
          color="#f272c8"
          opacity={0.8}
        />
        <Sparkles
          count={25}
          scale={2.8}
          size={2.5}
          speed={0.4}
          color="#00cea8"
          opacity={0.7}
        />
      </Float>
    </group>
  );
};

const TestimonialCanvas = () => {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="w-full h-[320px] sm:h-[400px] cursor-grab active:cursor-grabbing">
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ preserveDrawingBuffer: true, alpha: true }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={2}
              maxPolarAngle={Math.PI / 1.6}
              minPolarAngle={Math.PI / 2.8}
            />
            <HologramBadge />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default TestimonialCanvas;


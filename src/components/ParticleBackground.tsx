import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 1200;
const MOUSE_RADIUS = 3;

const RAINBOW_COLORS = [
  new THREE.Color("hsl(0, 100%, 60%)"),
  new THREE.Color("hsl(30, 100%, 60%)"),
  new THREE.Color("hsl(55, 100%, 55%)"),
  new THREE.Color("hsl(120, 70%, 50%)"),
  new THREE.Color("hsl(200, 100%, 55%)"),
  new THREE.Color("hsl(260, 80%, 60%)"),
  new THREE.Color("hsl(300, 80%, 60%)"),
];

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2(9999, 9999));
  const { viewport, camera } = useThree();

  const { positions, velocities, colors, basePositions } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 4;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;

      const c =
        RAINBOW_COLORS[Math.floor(Math.random() * RAINBOW_COLORS.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, velocities, colors, basePositions };
  }, []);

  // Track mouse position via window event for reliability
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Convert screen coords to NDC
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      // Convert to world coordinates
      mouseRef.current.set((x * viewport.width) / 2, (y * viewport.height) / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewport]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3,
        iy = i * 3 + 1;

      const dx = pos[ix] - mx;
      const dy = pos[iy] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_RADIUS && dist > 0.01) {
        const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.08;
        velocities[ix] += (dx / dist) * force;
        velocities[iy] += (dy / dist) * force;
      }

      // Spring back
      velocities[ix] += (basePositions[ix] - pos[ix]) * 0.004;
      velocities[iy] += (basePositions[iy] - pos[iy]) * 0.004;

      // Damping
      velocities[ix] *= 0.94;
      velocities[iy] *= 0.94;

      pos[ix] += velocities[ix];
      pos[iy] += velocities[iy];

      // Gentle float
      pos[iy] += Math.sin(Date.now() * 0.001 + i * 0.5) * 0.001;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}

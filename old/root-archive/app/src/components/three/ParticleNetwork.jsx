import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GRID_SIZE = 50;
const SPACING = 1.6;

function GridNetwork() {
  const pointsRef = useRef();
  const linesRef = useRef();

  const { positions, lineIndices } = useMemo(() => {
    const nodeCount = GRID_SIZE * GRID_SIZE;
    const positions = new Float32Array(nodeCount * 3);
    const indices = [];

    let i = 0;
    for (let ix = 0; ix < GRID_SIZE; ix++) {
      for (let iz = 0; iz < GRID_SIZE; iz++) {
        // Center the grid
        positions[i * 3] = (ix - GRID_SIZE / 2) * SPACING;
        positions[i * 3 + 1] = 0; // Y will be animated
        positions[i * 3 + 2] = (iz - GRID_SIZE / 2) * SPACING;

        // Build connection indices (right and down)
        const currentIdx = ix * GRID_SIZE + iz;
        if (ix < GRID_SIZE - 1) indices.push(currentIdx, currentIdx + GRID_SIZE); // down
        if (iz < GRID_SIZE - 1) indices.push(currentIdx, currentIdx + 1); // right

        i++;
      }
    }

    return {
      positions,
      lineIndices: new Uint16Array(indices),
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const pos = pointsRef.current.geometry.attributes.position.array;

    let i = 0;
    for (let ix = 0; ix < GRID_SIZE; ix++) {
      for (let iz = 0; iz < GRID_SIZE; iz++) {
        // Apply complex sine wave math for undulating surface
        pos[i * 3 + 1] =
          Math.sin((ix + time * 0.5) * 0.3) * 1.5 +
          Math.sin((iz + time * 0.5) * 0.5) * 1.5 +
          Math.sin((ix + iz - time) * 0.2) * 1.5;
        
        i++;
      }
    }

    // Mark buffers for update
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.position.needsUpdate = true;

    // Slow rotation
    pointsRef.current.rotation.y = time * 0.05;
    linesRef.current.rotation.y = time * 0.05;
  });

  return (
    <group position={[0, -2, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#FFFFFF"
          transparent
          opacity={0.6}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            array={lineIndices}
            count={lineIndices.length}
            itemSize={1}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.15}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export default function ParticleNetwork() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.6 }}>
      <Canvas
        camera={{ position: [0, 8, 25], fov: 75 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#0A0A0F', 10, 45]} />
        <GridNetwork />
      </Canvas>
    </div>
  );
}

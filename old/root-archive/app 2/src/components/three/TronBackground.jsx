import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useScrollStore } from '../../useScrollStore';

/* ═══════════════════════════════════════════
   TRON GRID PLANE — custom shader
   ═══════════════════════════════════════════ */
function TronGrid() {
  const meshRef = useRef();
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColor: { value: new THREE.Color('#FB0C0C') },
      uColorDim: { value: new THREE.Color('#950707') },
    }),
    []
  );

  useFrame((state) => {
    const scroll = useScrollStore.getState().progress;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uScroll.value = scroll;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[80, 80, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vWorldPos;
          void main() {
            vUv = uv;
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vWorldPos = worldPos.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPos;
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform float uScroll;
          uniform vec3 uColor;
          uniform vec3 uColorDim;
          varying vec2 vUv;
          varying vec3 vWorldPos;

          float gridLine(float coord, float width) {
            float line = abs(fract(coord - 0.5) - 0.5);
            return smoothstep(width, width + 0.02, line);
          }

          void main() {
            float spacing = 2.0;
            float lineWidth = 0.03;

            // Grid lines
            float gx = 1.0 - gridLine(vWorldPos.x / spacing, lineWidth);
            float gz = 1.0 - gridLine(vWorldPos.z / spacing, lineWidth);
            float grid = max(gx, gz);

            // Thicker lines every 5 units
            float gxMajor = 1.0 - gridLine(vWorldPos.x / (spacing * 5.0), lineWidth * 0.8);
            float gzMajor = 1.0 - gridLine(vWorldPos.z / (spacing * 5.0), lineWidth * 0.8);
            float majorGrid = max(gxMajor, gzMajor);

            // Distance fade from camera center
            float dist = length(vWorldPos.xz) / 40.0;
            float fade = 1.0 - smoothstep(0.0, 1.0, dist);

            // Pulse wave that ripples outward
            float pulse = sin(dist * 12.0 - uTime * 2.0) * 0.5 + 0.5;
            pulse = pow(pulse, 8.0) * 0.4;

            // Scroll-based opacity: bright at top, dims as you scroll
            float scrollFade = 1.0 - uScroll * 0.7;

            // Combine
            float intensity = (grid * 0.4 + majorGrid * 0.7 + pulse * 0.3) * fade * scrollFade;

            vec3 color = mix(uColorDim, uColor, intensity);

            gl_FragColor = vec4(color, intensity * 0.6);
          }
        `}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════
   LIGHT TRAILS — lines racing across the grid
   ═══════════════════════════════════════════ */
function LightTrails() {
  const groupRef = useRef();
  const trailCount = 6;

  const trails = useMemo(() => {
    return Array.from({ length: trailCount }, (_, i) => ({
      axis: i % 2 === 0 ? 'x' : 'z',
      position: (Math.random() - 0.5) * 30,
      speed: 4 + Math.random() * 6,
      offset: Math.random() * 40,
      length: 3 + Math.random() * 5,
    }));
  }, []);

  const meshRefs = useRef([]);

  useFrame((state) => {
    const scroll = useScrollStore.getState().progress;
    const time = state.clock.elapsedTime;
    const trailOpacity = Math.max(0.1, 1.0 - scroll * 0.8);

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const t = trails[i];
      const pos = ((time * t.speed + t.offset) % 80) - 40;

      if (t.axis === 'x') {
        mesh.position.set(pos, -1.95, t.position);
        mesh.rotation.set(-Math.PI / 2, 0, 0);
      } else {
        mesh.position.set(t.position, -1.95, pos);
        mesh.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
      }

      mesh.material.opacity = trailOpacity * 0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {trails.map((t, i) => (
        <mesh
          key={i}
          ref={(el) => (meshRefs.current[i] = el)}
        >
          <planeGeometry args={[t.length, 0.08]} />
          <meshBasicMaterial
            color="#FB0C0C"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════
   FLOATING FRAGMENTS — translucent geometric shards
   ═══════════════════════════════════════════ */
function FloatingFragments() {
  const groupRef = useRef();

  const fragments = useMemo(() => {
    return Array.from({ length: 12 }, () => ({
      pos: [
        (Math.random() - 0.5) * 20,
        Math.random() * 6 - 1,
        (Math.random() - 0.5) * 15 - 5,
      ],
      scale: 0.1 + Math.random() * 0.25,
      rotSpeed: (Math.random() - 0.5) * 0.5,
      floatSpeed: 0.3 + Math.random() * 0.5,
      floatOffset: Math.random() * Math.PI * 2,
      type: Math.random() > 0.5 ? 'oct' : 'ico',
    }));
  }, []);

  useFrame((state) => {
    const scroll = useScrollStore.getState().progress;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      const f = fragments[i];
      child.rotation.x += f.rotSpeed * 0.01;
      child.rotation.z += f.rotSpeed * 0.008;
      child.position.y =
        f.pos[1] + Math.sin(time * f.floatSpeed + f.floatOffset) * 0.5;

      // Scroll: fragments drift upward and converge
      child.position.y += scroll * 2;
      child.position.x = f.pos[0] * (1 - scroll * 0.3);

      child.material.opacity = Math.max(0.03, 0.12 - scroll * 0.08);
    });
  });

  return (
    <group ref={groupRef}>
      {fragments.map((f, i) => (
        <mesh key={i} position={f.pos} scale={f.scale}>
          {f.type === 'oct' ? (
            <octahedronGeometry args={[1, 0]} />
          ) : (
            <icosahedronGeometry args={[1, 0]} />
          )}
          <meshBasicMaterial
            color="#FB0C0C"
            transparent
            opacity={0.12}
            wireframe
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════
   HORIZON GLOW — volumetric-style gradient at vanishing point
   ═══════════════════════════════════════════ */
function HorizonGlow() {
  const meshRef = useRef();

  useFrame(() => {
    const scroll = useScrollStore.getState().progress;
    if (meshRef.current) {
      meshRef.current.material.opacity = Math.max(0.05, 0.35 - scroll * 0.3);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -1, -30]}>
      <planeGeometry args={[60, 8]} />
      <meshBasicMaterial
        color="#FB0C0C"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════
   CAMERA CONTROLLER — scroll-reactive camera
   ═══════════════════════════════════════════ */
function CameraController() {
  const { camera } = useThree();

  useFrame(() => {
    const scroll = useScrollStore.getState().progress;

    // Camera tilts from looking slightly down to more level as you scroll
    const tiltX = THREE.MathUtils.lerp(-0.35, -0.15, scroll);
    const posY = THREE.MathUtils.lerp(3, 4.5, scroll);
    const posZ = THREE.MathUtils.lerp(12, 14, scroll);

    camera.position.y = posY;
    camera.position.z = posZ;
    camera.rotation.x = tiltX;
  });

  return null;
}

/* ═══════════════════════════════════════════
   MAIN BACKGROUND COMPONENT
   ═══════════════════════════════════════════ */
export default function TronBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{
          fov: 60,
          near: 0.1,
          far: 100,
          position: [0, 3, 12],
        }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <CameraController />
        <TronGrid />
        <LightTrails />
        <FloatingFragments />
        <HorizonGlow />

        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

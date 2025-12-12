'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

function ParticleField() {
    const particlesRef = useRef();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const particleCount = 100;
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
        }
        return pos;
    }, []);

    const originalPositions = useMemo(() => new Float32Array(positions), [positions]);

    useFrame((state, delta) => {
        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;

                const x = positions[i3];
                const y = positions[i3 + 1];

                const dx = x - mousePosition.x * 5;
                const dy = y - mousePosition.y * 5;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 2) {
                    const force = (2 - distance) * 0.05;
                    positions[i3] += (dx / distance) * force;
                    positions[i3 + 1] += (dy / distance) * force;
                }

                positions[i3] += (originalPositions[i3] - positions[i3]) * 0.01;
                positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.01;

                positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
            }

            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    const handlePointerMove = (event) => {
        setMousePosition({
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1,
        });
    };

    return (
        <points ref={particlesRef} onPointerMove={handlePointerMove}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#ffffff"
                transparent={true}
                opacity={0.6}
                sizeAttenuation={true}
            />
        </points>
    );
}

export default function Scene3D() {
    return (
        <div className="absolute inset-0 pointer-events-none animate-fade-in opacity-0">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <ParticleField />
            </Canvas>
        </div>
    );
}

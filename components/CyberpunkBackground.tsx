import React, { useState, useEffect } from 'react';

export default function CyberpunkBackground() {
    const [particles, setParticles] = useState<Array<{ top: string, left: string }>>([]);
    const [floatTransforms, setFloatTransforms] = useState<Array<{ x: number, y: number }>>([]);

    useEffect(() => {
        // Generate particle positions on the client side
        const newParticles = [...Array(20)].map(() => ({
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
        }));
        setParticles(newParticles);

        // Generate float transforms
        const newFloatTransforms = [...Array(20)].map(() => ({
            x: Math.floor(Math.random() * 2) * 50,
            y: Math.floor(Math.random() * 2) * 50,
        }));
        setFloatTransforms(newFloatTransforms);
    }, []);

    return (
        <div className="fixed inset-0 min-h-full w-full overflow-hidden pointer-events-none" style={{ zIndex: 0, backgroundColor: 'rgba(0,0,0,0.95)' }}>
            {/* Static Grid */}
            <div className="fixed inset-0 min-h-full w-full" style={{
                backgroundImage: 'linear-gradient(90deg, rgba(0,191,255,0.15) 1px, transparent 1px), linear-gradient(0deg, rgba(0,191,255,0.15) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
            }}></div>

            {/* Data Flow Lines */}
            <div className="fixed inset-0 min-h-full w-full">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-[1px] w-[150px]"
                        style={{
                            top: `${((i + 1) / 9) * 100}vh`,
                            left: i % 2 === 0 ? '0' : 'auto',
                            right: i % 2 === 0 ? 'auto' : '0',
                            background: 'linear-gradient(90deg, transparent, hsla(195, 100.00%, 50.00%, 0.80), transparent)',
                            animation: `${i % 2 === 0 ? 'dataFlow' : 'dataFlowReverse'} ${5 + i}s infinite linear`
                        }}
                    ></div>
                ))}
            </div>

            {/* Tech Particles */}
            <div className="absolute inset-0">
                {particles.map((particle, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            top: particle.top,
                            left: particle.left,
                            background: 'rgba(0,191,255,0.8)',
                            boxShadow: '0 0 8px rgba(0,191,255,0.6)',
                            animation: `float ${8 + i * 0.5}s infinite ease-in-out`
                        }}
                    ></div>
                ))}
            </div>

            <style jsx>{`
                @keyframes dataFlow {
                    from { transform: translateX(-150px); opacity: 0; }
                    50% { opacity: 0.8; }
                    to { transform: translateX(100vw); opacity: 0; }
                }

                @keyframes dataFlowReverse {
                    from { transform: translateX(150px); opacity: 0; }
                    50% { opacity: 0.8; }
                    to { transform: translateX(-100vw); opacity: 0; }
                }

                @keyframes float {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(${floatTransforms[0]?.x || 0}px, ${floatTransforms[0]?.y || 0}px); }
                }
            `}</style>
        </div>
    );
}
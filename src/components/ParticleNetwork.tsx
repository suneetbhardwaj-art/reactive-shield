import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function ParticleNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate random nodes
  const nodes = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    connections: [
      Math.floor(Math.random() * 15),
      Math.floor(Math.random() * 15)
    ]
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 mix-blend-screen" ref={containerRef}>
      <svg className="absolute inset-0 w-full h-full">
        {/* Draw connections first so they are behind nodes */}
        {nodes.map((node, i) => (
          <g key={`lines-${i}`}>
            {node.connections.map((targetIdx, j) => {
              const target = nodes[targetIdx];
              return target ? (
                <motion.line
                  key={`line-${i}-${j}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="url(#gradient-line)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 1, 0],
                    opacity: [0, 0.5, 0.5, 0] 
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: node.delay,
                    ease: "linear"
                  }}
                />
              ) : null;
            })}
          </g>
        ))}

        {/* Draw Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={`node-${node.id}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="hsl(var(--primary))"
            filter="url(#glow)"
            animate={{
              y: [`${node.y}%`, `${node.y - 5}%`, `${node.y}%`],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 5 + (node.id % 5),
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        <defs>
          <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

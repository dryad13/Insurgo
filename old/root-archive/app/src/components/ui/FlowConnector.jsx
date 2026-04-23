import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

let connectorId = 0;

export default function FlowConnector({ height = 32 }) {
  const gradId = `flowGrad${++connectorId}`;
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.6'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="flex justify-center" style={{ height }}>
      <svg width="2" height={height} className="overflow-visible">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FB0C0C" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#950707" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2={height}
          stroke={`url(#${gradId})`}
          strokeWidth="2"
          strokeDasharray="6 4"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}

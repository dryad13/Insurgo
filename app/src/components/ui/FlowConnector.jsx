import { motion } from 'framer-motion';

let connectorId = 0;

export default function FlowConnector({ height = 40 }) {
  const gradId = `flowGrad${++connectorId}`;

  return (
    <div className="flex justify-center" style={{ height }}>
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
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </svg>
    </div>
  );
}

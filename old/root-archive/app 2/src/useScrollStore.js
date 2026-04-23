import { create } from 'zustand';

/**
 * Global scroll store.
 * `progress` = 0..1 representing full page scroll.
 * Updated via a scroll listener in App.
 * Consumed by Three.js scene + Framer Motion sections.
 */
export const useScrollStore = create((set) => ({
  progress: 0,
  setProgress: (p) => set({ progress: p }),
}));

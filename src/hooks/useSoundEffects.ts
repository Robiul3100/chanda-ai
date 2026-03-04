import { useCallback, useRef } from "react";

// Generate simple sounds using Web Audio API
function createAudioContext(): AudioContext | null {
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
}

export function useSoundEffects() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = createAudioContext();
    return ctxRef.current;
  }, []);

  const playTone = useCallback((freq: number, duration: number, type: OscillatorType = "sine", volume = 0.15) => {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, [getCtx]);

  const playSend = useCallback(() => {
    // Playful "boop" send sound
    playTone(600, 0.08, "sine", 0.12);
    setTimeout(() => playTone(800, 0.1, "sine", 0.1), 60);
    setTimeout(() => playTone(1000, 0.12, "triangle", 0.08), 120);
  }, [playTone]);

  const playReceive = useCallback(() => {
    // Cute "ding" receive sound
    playTone(880, 0.1, "sine", 0.1);
    setTimeout(() => playTone(1100, 0.15, "sine", 0.08), 100);
  }, [playTone]);

  const playReaction = useCallback(() => {
    // Fun "pop" reaction sound
    playTone(500, 0.05, "sine", 0.15);
    setTimeout(() => playTone(700, 0.08, "triangle", 0.12), 40);
    setTimeout(() => playTone(1200, 0.1, "sine", 0.08), 80);
  }, [playTone]);

  const playLevelUp = useCallback(() => {
    // Triumphant level up!
    [400, 500, 600, 800, 1000].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.15, "triangle", 0.12), i * 80);
    });
  }, [playTone]);

  return { playSend, playReceive, playReaction, playLevelUp };
}

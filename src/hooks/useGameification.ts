import { useState, useCallback, useEffect } from "react";

interface GameState {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  totalMessages: number;
  isVIP: boolean;
}

const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 800, 1200, 1800, 2500, 3500, 5000];

function getLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

function getLevelTitle(level: number): string {
  const titles = [
    "নবীন চান্দাবাজ 🐣",
    "চান্দা শিক্ষার্থী 📚",
    "চান্দা যোদ্ধা ⚔️",
    "চান্দা মাস্টার 🎓",
    "চান্দা লিজেন্ড 🏆",
    "চান্দা কিং 👑",
    "চান্দা গডফাদার 🫅",
    "চান্দা ইম্পেরর 🏰",
    "চান্দা দেবতা ⚡",
    "চান্দা মহাবিশ্ব 🌌",
    "সর্বোচ্চ চান্দাবাজ 💎",
  ];
  return titles[Math.min(level - 1, titles.length - 1)];
}

function getXPForNextLevel(level: number): number {
  if (level >= LEVEL_THRESHOLDS.length) return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  return LEVEL_THRESHOLDS[level]; // next level threshold
}

const STORAGE_KEY = "binpi-game-state";

function loadState(): GameState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { xp: 0, level: 1, streak: 0, lastActiveDate: "", totalMessages: 0, isVIP: false };
}

export function useGameification() {
  const [state, setState] = useState<GameState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Check streak on mount
  useEffect(() => {
    const today = new Date().toDateString();
    const last = state.lastActiveDate;
    if (last && last !== today) {
      const lastDate = new Date(last);
      const diff = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diff > 1) {
        setState((s) => ({ ...s, streak: 0 }));
      }
    }
  }, []);

  const addXP = useCallback((amount: number) => {
    setState((prev) => {
      const today = new Date().toDateString();
      const newStreak = prev.lastActiveDate !== today ? prev.streak + 1 : prev.streak;
      const newXP = prev.xp + amount;
      const newLevel = getLevel(newXP);
      const isVIP = newLevel >= 5;
      return {
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        lastActiveDate: today,
        totalMessages: prev.totalMessages + 1,
        isVIP,
      };
    });
  }, []);

  const levelTitle = getLevelTitle(state.level);
  const nextLevelXP = getXPForNextLevel(state.level);
  const currentLevelXP = LEVEL_THRESHOLDS[state.level - 1] || 0;
  const progress = nextLevelXP > currentLevelXP ? ((state.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 100;

  return {
    ...state,
    levelTitle,
    nextLevelXP,
    progress,
    addXP,
  };
}

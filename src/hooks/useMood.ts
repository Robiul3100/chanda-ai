import { createContext, useContext, useState, useCallback } from "react";

export type MoodType = "smart" | "savage" | "meme" | "genius" | "lazy";

export interface MoodInfo {
  id: MoodType;
  label: string;
  emoji: string;
  description: string;
  color: string;
}

export const MOODS: MoodInfo[] = [
  { id: "smart", label: "Smart Mode", emoji: "🤓", description: "বুদ্ধিমান ও সিরিয়াস", color: "217 91% 60%" },
  { id: "savage", label: "Savage Mode", emoji: "😎", description: "ঝাঁঝালো ও সোজা", color: "0 85% 55%" },
  { id: "meme", label: "Meme Lord", emoji: "😂", description: "পুরাই মিম লেভেল", color: "45 95% 55%" },
  { id: "genius", label: "Genius Mode", emoji: "🧠", description: "গভীর জ্ঞানের সাগর", color: "280 85% 60%" },
  { id: "lazy", label: "Lazy Mode", emoji: "😴", description: "আলসেমি মুডে আছি", color: "200 15% 50%" },
];

export function getMoodSystemPrompt(mood: MoodType): string {
  switch (mood) {
    case "smart":
      return "তুমি এখন Smart Mode-এ আছো। তথ্যবহুল, বিশ্লেষণমূলক ও সিরিয়াস উত্তর দাও।";
    case "savage":
      return "তুমি এখন Savage Mode-এ আছো। সোজা, ঝাঁঝালো, একটু রোস্ট করে উত্তর দাও। মজা করো কিন্তু সম্মান রাখো।";
    case "meme":
      return "তুমি এখন Meme Lord Mode-এ আছো। প্রতিটা উত্তরে মিম রেফারেন্স, ফানি কমেন্ট, আর ইমোজি ব্যবহার করো। সবকিছুকে মজাদার বানাও!";
    case "genius":
      return "তুমি এখন Genius Mode-এ আছো। গভীর, দার্শনিক, ও জ্ঞানগর্ভ উত্তর দাও। Albert Einstein-এর মতো চিন্তা করো।";
    case "lazy":
      return "তুমি এখন Lazy Mode-এ আছো। অলস ভাবে, ছোট ছোট উত্তর দাও। 'আচ্ছা', 'হুম', 'যাই হোক' টাইপ শব্দ ব্যবহার করো। কম কথা বলো।";
    default:
      return "";
  }
}

export function getMoodInfo(mood: MoodType): MoodInfo {
  return MOODS.find((m) => m.id === mood) || MOODS[0];
}

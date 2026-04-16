export interface Greeting {
  text: string;
  emoji: string;
}

export function getGreeting(hour: number): Greeting {
  if (hour >= 5 && hour < 12) return { text: "Good morning", emoji: "☕" };
  if (hour >= 12 && hour < 17) return { text: "Good afternoon", emoji: "☀️" };
  if (hour >= 17 && hour < 22) return { text: "Good evening", emoji: "🌇" };
  return { text: "Burning the midnight oil", emoji: "🦉" };
}

// Browser-only time helpers. Every value here reflects the visitor's local
// timezone via their own `Date` — no SSR / no Central-TZ assumptions.

export interface TimeInfo {
  hour: number;
  minute: number;
  dayOfYear: number;
  formattedTime: string;
  formattedDate: string;
  timeZone: string;
}

export interface SunShadow {
  sunAngle: number;
  shadowX: number;
  shadowY: number;
  shadowOpacity: number;
}

export interface Greeting {
  text: string;
  emoji: string;
}

export function getTimeInfo(now: Date = new Date()): TimeInfo {
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor(
    (now.getTime() - startOfYear.getTime()) / 86400000,
  );
  return {
    hour: now.getHours(),
    minute: now.getMinutes(),
    dayOfYear,
    formattedTime: now.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    formattedDate: now.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function getSunShadow(hour: number): SunShadow {
  const sunAngle = ((hour - 6) / 12) * 90 - 45;
  const sunRadians = (sunAngle * Math.PI) / 180;
  const shadowDistance = 6;
  return {
    sunAngle,
    shadowX: -Math.sin(sunRadians) * shadowDistance,
    shadowY: Math.abs(Math.cos(sunRadians)) * shadowDistance,
    shadowOpacity: getShadowOpacity(hour),
  };
}

function getShadowOpacity(hour: number): number {
  if (hour < 5 || hour > 19) return 0;
  if (hour < 8) return 0.3 + (hour - 5) * 0.1;
  if (hour <= 16) return 0.6;
  return 0.6 - (hour - 16) * 0.1;
}

export function getGreeting(hour: number): Greeting {
  if (hour >= 5 && hour < 12) return { text: "Good morning", emoji: "☕" };
  if (hour >= 12 && hour < 17) return { text: "Good afternoon", emoji: "☀️" };
  if (hour >= 17 && hour < 22) return { text: "Good evening", emoji: "🌇" };
  return { text: "Burning the midnight oil", emoji: "🦉" };
}

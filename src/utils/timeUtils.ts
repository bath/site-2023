export function calculateSunPosition(currentHour: number) {
  const sunAngle = ((currentHour - 6) / 12) * 90 - 45; // -45 to +45 degrees
  const sunRadians = (sunAngle * Math.PI) / 180;
  const shadowDistance = 6;

  return {
    sunAngle,
    shadowX: -Math.sin(sunRadians) * shadowDistance,
    shadowY: Math.abs(Math.cos(sunRadians)) * shadowDistance,
    shadowOpacity: calculateShadowOpacity(currentHour),
  };
}

export function calculateShadowOpacity(hours: number) {
  if (hours < 5 || hours > 19) return "0";

  // Dawn: 5-8am, gradually increase from 0.3 to 0.6
  if (hours >= 5 && hours < 8) {
    return (0.3 + (hours - 5) * 0.1).toFixed(2);
  }

  // Day: 8am-4pm, constant 0.6
  if (hours >= 8 && hours <= 16) {
    return "0.6";
  }

  // Dusk: 4-7pm, gradually decrease from 0.6 to 0.3
  if (hours > 16 && hours <= 19) {
    return (0.6 - (hours - 16) * 0.1).toFixed(2);
  }

  return "0";
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function getCurrentCentralHour(): number {
  const date = new Date();
  const centralTime = new Date(
    date.toLocaleString("en-US", { timeZone: "America/Chicago" }),
  );
  return centralTime.getHours() + centralTime.getMinutes() / 60;
}

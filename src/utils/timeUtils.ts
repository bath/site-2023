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
  if (hours < 6) return ((hours - 5) * 0.2).toFixed(2);
  if (hours > 18) return ((19 - hours) * 0.2).toFixed(2);
  return "0.2";
}

export function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

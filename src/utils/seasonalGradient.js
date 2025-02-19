function getSeasonalColors(debugDay) {
  const now = new Date();
  // Use debug day if provided, otherwise calculate real day
  const dayOfYear =
    debugDay ??
    Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

  // Kansas City seasonal colors
  const seasons = [
    // Winter (blues and whites) - more pronounced colors
    { start: [235, 240, 255], end: [220, 230, 245] },
    // Spring (light greens and pinks) - more pronounced colors
    { start: [235, 250, 235], end: [255, 235, 245] },
    // Summer (warm greens and yellows) - more pronounced colors
    { start: [240, 255, 230], end: [255, 245, 220] },
    // Fall (browns and oranges) - more pronounced colors
    { start: [255, 235, 225], end: [245, 230, 225] },
  ];

  // Calculate which season we're in (0-3)
  const seasonIndex = Math.floor((dayOfYear / 365) * 4);
  // Calculate progress through current season (0-1)
  const seasonProgress = (dayOfYear % (365 / 4)) / (365 / 4);

  // Get current and next season
  const currentSeason = seasons[seasonIndex];
  const nextSeason = seasons[(seasonIndex + 1) % 4];

  // Interpolate between current and next season
  const startColor = currentSeason.start.map((channel, i) =>
    Math.round(
      channel * (1 - seasonProgress) + nextSeason.start[i] * seasonProgress,
    ),
  );
  const endColor = currentSeason.end.map((channel, i) =>
    Math.round(
      channel * (1 - seasonProgress) + nextSeason.end[i] * seasonProgress,
    ),
  );

  return {
    startColor: `rgb(${startColor.join(", ")})`,
    endColor: `rgb(${endColor.join(", ")})`,
  };
}

// Add event listener for gradient updates if in browser
if (typeof window !== "undefined") {
  window.addEventListener("updateGradient", () => {
    const debugDay = Number(
      document.documentElement.style.getPropertyValue("--debug-day"),
    );
    const { startColor, endColor } = getSeasonalColors(debugDay);

    // Update the CSS variables
    document.documentElement.style.setProperty("--startColor", startColor);
    document.documentElement.style.setProperty("--endColor", endColor);
  });
}

export { getSeasonalColors };

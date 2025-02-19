function getSeasonalColors(debugDay) {
  console.log("getSeasonalColors called with debugDay:", debugDay);
  const now = new Date();
  // Use debug day if provided, otherwise calculate real day
  const dayOfYear =
    debugDay ??
    Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

  console.log("Using dayOfYear:", dayOfYear);

  // Kansas City seasonal colors
  const seasons = [
    // Winter (subtle cool grays with a hint of blue)
    { start: [220, 225, 235], end: [200, 205, 215] },

    // Spring (soft sage and warm limestone)
    { start: [210, 220, 205], end: [225, 220, 210] },

    // Summer (deeper greens with golden undertones)
    { start: [195, 210, 190], end: [220, 215, 195] },

    // Fall (warm earth tones)
    { start: [220, 210, 200], end: [215, 205, 195] },
  ];

  // Calculate which season we're in (0-3)
  const seasonIndex = Math.floor((dayOfYear / 365) * 4);
  // Calculate progress through current season (0-1)
  const seasonProgress = (dayOfYear % (365 / 4)) / (365 / 4);
  console.log("Season calculations:", { seasonIndex, seasonProgress });

  // Get current and next season
  const currentSeason = seasons[seasonIndex];
  const nextSeason = seasons[(seasonIndex + 1) % 4];
  console.log("Selected seasons:", {
    current: seasonIndex,
    next: (seasonIndex + 1) % 4,
  });

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

  const result = {
    startColor: `rgb(${startColor.join(", ")})`,
    endColor: `rgb(${endColor.join(", ")})`,
  };
  console.log("Returning colors:", result);
  return result;
}

// Add event listener for gradient updates if in browser
if (typeof window !== "undefined") {
  console.log("Setting up updateGradient event listener");
  window.addEventListener("updateGradient", () => {
    console.log("updateGradient event received");
    const debugDay = Number(
      document.documentElement.style.getPropertyValue("--debug-day"),
    );
    console.log("Retrieved debug day:", debugDay);
    const { startColor, endColor } = getSeasonalColors(debugDay);

    // Update the CSS variables using style.setProperty instead of setAttribute
    const html = document.documentElement;
    console.log("Setting CSS variables:", { startColor, endColor });
    html.style.setProperty("--startColor", startColor);
    html.style.setProperty("--endColor", endColor);

    // Log values to help debug
    console.log("Updating gradient:", { debugDay, startColor, endColor });
  });
}

export { getSeasonalColors };

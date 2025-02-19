function getSeasonalColors() {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24,
  );

  const seasons = [
    // Winter (cool blues with silver highlights - more subtle)
    { start: [242, 245, 250], end: [235, 240, 248] },
    // Spring (fresh greens with warm pink undertones - softened)
    { start: [240, 248, 240], end: [248, 242, 240] },
    // Summer (vibrant greens with golden sunshine - muted)
    { start: [238, 245, 238], end: [245, 242, 235] },
    // Fall (rich autumn colors - softened)
    { start: [245, 240, 235], end: [242, 238, 235] },
  ];

  const seasonIndex = Math.floor((dayOfYear / 365) * 4);
  const seasonProgress = (dayOfYear % (365 / 4)) / (365 / 4);

  const currentSeason = seasons[seasonIndex];
  const nextSeason = seasons[(seasonIndex + 1) % 4];

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

export { getSeasonalColors };

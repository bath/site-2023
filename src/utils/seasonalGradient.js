const SEASONS = [
  // Winter — cool pale blue with a hint of silver
  { label: "Winter", start: [232, 240, 250], end: [210, 222, 242] },
  // Spring — fresh pale green fading into soft pink
  { label: "Spring", start: [230, 246, 230], end: [250, 228, 232] },
  // Summer — pale lime into warm golden cream
  { label: "Summer", start: [238, 248, 218], end: [252, 232, 192] },
  // Fall — peach into amber
  { label: "Fall", start: [250, 226, 204], end: [232, 198, 178] },
];

function getDayOfYear(date = new Date()) {
  return Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24,
  );
}

function getSeasonalColorsForDay(dayOfYear) {
  const clamped = ((dayOfYear % 365) + 365) % 365;
  const seasonIndex = Math.floor((clamped / 365) * 4);
  const seasonProgress = (clamped % (365 / 4)) / (365 / 4);

  const currentSeason = SEASONS[seasonIndex];
  const nextSeason = SEASONS[(seasonIndex + 1) % 4];

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
    seasonLabel: currentSeason.label,
    nextSeasonLabel: nextSeason.label,
    seasonProgress,
  };
}

function getSeasonalColors() {
  return getSeasonalColorsForDay(getDayOfYear());
}

export { getSeasonalColors, getSeasonalColorsForDay, getDayOfYear, SEASONS };

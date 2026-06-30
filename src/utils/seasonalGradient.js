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

// Map a light seasonal channel onto a deep tone for dark mode. Keeps the
// season's hue (winter stays cool, fall stays warm) on a near-black base so
// the signature seasonal gradient survives instead of becoming flat black.
function shadeForDark(channel) {
  return Math.round(channel * 0.13 + 9);
}

function lerpChannels(a, b, t) {
  return a.map((channel, i) => Math.round(channel * (1 - t) + b[i] * t));
}

function getSeasonalColorsForDay(dayOfYear, isDark = false) {
  const clamped = ((dayOfYear % 365) + 365) % 365;
  const seasonIndex = Math.floor((clamped / 365) * 4);
  const seasonProgress = (clamped % (365 / 4)) / (365 / 4);

  const currentSeason = SEASONS[seasonIndex];
  const nextSeason = SEASONS[(seasonIndex + 1) % 4];

  let startColor = lerpChannels(
    currentSeason.start,
    nextSeason.start,
    seasonProgress,
  );
  let endColor = lerpChannels(currentSeason.end, nextSeason.end, seasonProgress);

  if (isDark) {
    startColor = startColor.map(shadeForDark);
    endColor = endColor.map(shadeForDark);
  }

  return {
    startColor: `rgb(${startColor.join(", ")})`,
    endColor: `rgb(${endColor.join(", ")})`,
    seasonLabel: currentSeason.label,
    nextSeasonLabel: nextSeason.label,
    seasonProgress,
  };
}

function getSeasonalColors(isDark = false) {
  return getSeasonalColorsForDay(getDayOfYear(), isDark);
}

export { getSeasonalColors, getSeasonalColorsForDay, getDayOfYear, SEASONS };

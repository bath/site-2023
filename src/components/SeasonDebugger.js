let updateGradient;

// Create a custom event for updating the gradient
const gradientUpdateEvent = new CustomEvent("updateGradient");

function initDebugger() {
  const slider = document.getElementById("season-debug");
  if (!slider) return;

  updateGradient = (day) => {
    document.documentElement.style.setProperty("--debug-day", day);
    window.dispatchEvent(gradientUpdateEvent);
  };

  slider.addEventListener("input", (e) => {
    updateGradient(e.target.value);
  });
}

// Initialize after DOM is loaded
document.addEventListener("DOMContentLoaded", initDebugger);

export { updateGradient };

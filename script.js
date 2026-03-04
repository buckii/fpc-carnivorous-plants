/* ============================================
   Carnivorous Plants - Interactive Script
   ============================================ */

// Track which plants have been visited
const visitedPlants = new Set();

/**
 * Navigate to a screen by ID
 */
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
  });

  // Show target screen
  var target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }

  // Track plant visits
  var plantScreens = ['bladderwort', 'pitcher-plant', 'sundew', 'venus-flytrap'];
  if (plantScreens.indexOf(screenId) !== -1) {
    markPlantVisited(screenId);
  }
}

/**
 * Mark a plant as visited and update UI
 */
function markPlantVisited(plantId) {
  visitedPlants.add(plantId);

  // Update progress dots
  var dot = document.querySelector('.progress-dot[data-plant="' + plantId + '"]');
  if (dot) {
    dot.classList.add('discovered');
  }

  // Mark the bog button as visited
  var plantClass = plantId.replace('-', '--').replace('pitcher--plant', 'pitcher');
  document.querySelectorAll('.bog-plant').forEach(function(btn) {
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').indexOf(plantId) !== -1) {
      btn.classList.add('visited');
    }
  });

  // Check if all plants visited
  if (visitedPlants.size === 4) {
    showAllDiscoveredMessage();
  }
}

/**
 * Show congratulations when all plants are discovered
 */
function showAllDiscoveredMessage() {
  var intro = document.querySelector('.bog-intro p');
  if (intro && !intro.dataset.complete) {
    intro.textContent = 'Amazing! You discovered all four carnivorous plants! Can you find the hidden frog?';
    intro.dataset.complete = 'true';
  }
}

/**
 * Progressive fact reveal on plant pages
 */
function revealFacts(button) {
  var container = button.closest('.plant-content');
  var hiddenFacts = container.querySelectorAll('.hidden-fact:not(.revealed)');

  hiddenFacts.forEach(function(fact, index) {
    setTimeout(function() {
      fact.classList.add('revealed');
    }, index * 200);
  });

  // Hide the button after revealing
  button.classList.add('hidden');
}

// Initialize: ensure home screen is shown on load
document.addEventListener('DOMContentLoaded', function() {
  showScreen('home');
});

import { displayFeed } from './feed.js';

function showPage(pageId) {
  const sections = document.querySelectorAll('.page');
  sections.forEach(section => section.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
}

function handleNavigation(event) {
  event.preventDefault(); 
  const target = event.target; // Get the item

  // Check click
    if (target.matches('#feedLink')) {
        showPage('feed');
        displayFeed(); // Loads and displays news feed
    }
}

// Manage page
document.addEventListener('click', handleNavigation);
showPage('feed');
displayFeed();
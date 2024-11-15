import { displayFeed } from './feed.js';
import { loadConversations } from './messaging.js';

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
    } else if (target.matches('#messagingLink')) {
        showPage('messaging');
        loadConversations(); // Load conversations
    } else if (target.matches('#friendsLink')) {
        showPage('friends');
    }
}

// Manage page
document.addEventListener('click', handleNavigation);
showPage('feed');
displayFeed();
document.addEventListener('DOMContentLoaded', () => {
    console.log("Discover Games page loaded");
    const gameCardsContainer = document.getElementById('gamesContainer');
    // const loadingMessage = document.getElementById('loadingMessage');
    // const errorMessage = document.getElementById('errorMessage');

    const API_BASE_URL = 'https://stepforward.onrender.com/api'; // Base URL for your API

    // Function to fetch games from the API
    async function fetchGames() {
    //   loadingMessage.style.display = 'block'; // Show loading message
    //   errorMessage.style.display = 'none';    // Hide any previous error messages
      gameCardsContainer.innerHTML = '';      // Clear existing cards

      try {
        const response = await fetch(`${API_BASE_URL}/games`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const games = await response.json();
        displayGames(games);
      } catch (error) {
        console.error('Error fetching games:', error);
        // errorMessage.textContent = 'Failed to load games. Please try again later.';
        // errorMessage.style.display = 'block';
      } finally {
        // loadingMessage.style.display = 'none'; // Hide loading message
      }
    }

    // Function to display games in the UI
    function displayGames(games) {
      if (games.length === 0) {
        gameCardsContainer.innerHTML = '<p style="text-align: center; width: 100%;">No games found.</p>';
        return;
      }

      games.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('dashboard-card');

        // Provide a fallback image or a placeholder if the image URL is missing or broken
        const imageUrl = game.image || 'https://placehold.co/280x150/cccccc/333333?text=No+Image';

        card.innerHTML = `
          <img src="${imageUrl}" alt="${game.title}" onerror="this.onerror=null;this.src='https://placehold.co/280x150/cccccc/333333?text=Image+Error';">
          <h4>${game.title}</h4>
          <p>${game.description}</p>
          <p>${'⭐'.repeat(Math.round(game.rating))}${'☆'.repeat(5 - Math.round(game.rating))}</p>
          <button onclick="window.location.href='${game.downloadUrl || '#'}';">Download</button>
        `;
        gameCardsContainer.appendChild(card);
      });
    }

    // Initial fetch of games when the page loads
    fetchGames();

    // You can add event listeners here for your filters later if you want them to trigger new API calls
    // For example:
    // document.getElementById('filterMath').addEventListener('change', fetchGames);
    // document.getElementById('filterScience').addEventListener('change', fetchGames);
  });
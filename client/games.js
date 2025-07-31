document.addEventListener('DOMContentLoaded', () => {
      const RAWG_API_KEY = 'b7895369b7024c61868df9e585c274ae';
      // We'll fetch 10 games from the RAWG API for a simple list.  
      // we set the genres to '34' which corresponds to 'Educational' games.
      const API_URL = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&genres=34`;

      const gamesContainer = document.getElementById('gamesContainer');

      // Function to create a game card element
      const createGameCard = (game) => {
        const card = document.createElement('div');
        card.className = 'dashboard-card';
        card.innerHTML = `
          <img src="${game.image_url}" alt="${game.title}" onerror="this.onerror=null;this.src='https://placehold.co/400x200/999/fff?text=Image+Not+Found';">
          <h4>${game.title}</h4>
          <p>${game.description}</p>
          <p>${game.rating}</p>
          <button>Download</button>
        `;
        return card;
      };

      // Helper function to generate a star rating string based on the rating number.
      const getStarRating = (rating) => {
        const fullStars = '⭐'.repeat(Math.round(rating));
        const emptyStars = '☆'.repeat(5 - Math.round(rating));
        return `${fullStars}${emptyStars}`;
      };

      // Asynchronous function to fetch games from the RAWG API
      const fetchGames = async () => {
        // Show a loading message while we wait for the API response.
        gamesContainer.innerHTML = '<p>Loading games...</p>';

        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          
          // Clear the loading message after the data is received.
          gamesContainer.innerHTML = '';
          
          if (data.results && data.results.length > 0) {
            data.results.forEach(game => {
              // Map the API data to a format our card function can use.
              const cardData = {
                title: game.name,
                // Combine genres and platforms to create a simple description.
                description: `Genres: ${game.genres.map(g => g.name).join(', ')} | Platforms: ${game.platforms.map(p => p.platform.name).join(', ')}`,
                rating: getStarRating(game.rating_top),
                image_url: game.background_image
              };
              const gameCard = createGameCard(cardData);
              gamesContainer.appendChild(gameCard);
            });
          } else {
            gamesContainer.innerHTML = '<p>No games found.</p>';
          }
        } catch (error) {
          console.error('Failed to fetch games:', error);
          gamesContainer.innerHTML = `<p style="color: red;">Error: Failed to load games. Check your API key and try again. Reason: ${error.message}</p>`;
        }
      };

      // Call the function to start fetching games when the page loads.
      fetchGames();
    });
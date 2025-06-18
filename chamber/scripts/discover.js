document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.discover-grid');

    // Visit message 
    const visitEl = document.querySelector('#visit-message p');
    const lastVisit = localStorage.getItem('discoverLastVisit');
    const now = Date.now();
    let messageText;
    if (!lastVisit) {
      messageText = "Welcome! Let us know if you have any questions.";
    } else {
      const diffMs = now - Number(lastVisit);
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays < 1) {
        messageText = "Back so soon! Awesome!";
      } else {
        messageText = `You last visited ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago.`;
      }
    }
    visitEl.textContent = messageText;
    localStorage.setItem('discoverLastVisit', now.toString());

    fetch('data/discover.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} – ${response.statusText}`);
            }
            return response.json();
        })
        .then(items => {
            items.forEach(item => {
                const article = document.createElement('article');
                article.className = `discover-card card${item.id}`;

                article.innerHTML = `
            <figure>
              <img src="${item.image}" alt="${item.alt}">
            </figure>
            <h2>${item.name}</h2>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
          `;

                grid.appendChild(article);
            });
        })
        .catch(err => {
            console.error('Failed to load discover items:', err);
            grid.innerHTML = '<p class="error">Sorry, we couldn’t load the Discover items at this time.</p>';
        });
});
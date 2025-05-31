document.addEventListener('DOMContentLoaded', () => {
  const gridViewBtn = document.getElementById('grid-view');
  const listViewBtn = document.getElementById('list-view');
  const directoryGrid = document.querySelector('.directory-grid');

  gridViewBtn.addEventListener('click', () => {
      directoryGrid.classList.remove('list-view');
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
  });

  listViewBtn.addEventListener('click', () => {
      directoryGrid.classList.add('list-view');
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
  });


  document.getElementById('currentYear').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = new Date(document.lastModified).toLocaleDateString();


  async function loadMembers() {
    const resp = await fetch('/chamber/data/members.json');
    const members = await resp.json();
    const grid = document.querySelector('.directory-grid');
    grid.innerHTML = '';
    members.forEach(m => {
      const card = document.createElement('article');
      card.className = 'business-card';
      card.innerHTML = `
        <header><h3>${m.name}</h3></header>
        <div class="card-image">
          <img src="/chamber/images/${m.image}" alt="${m.name}">
        </div>
        <div class="card-details">
          <p class="address">${m.address}</p>
          <p class="phone">${m.phone}</p>
          <p class="website"><a href="${m.website}" target="_blank" rel="noopener">${m.website}</a></p>
          <p class="membership">Membership Level: ${m.membershipLevel}</p>
        </div>`;
      grid.appendChild(card);
    });
  }
  loadMembers();
});

function toggleMenu() {
  const hamburger = document.querySelector('.hamburger');
  document.body.classList.toggle('nav-open');
  hamburger.classList.toggle('open');
}
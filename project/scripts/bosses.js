
const bossList = document.getElementById('bossList');
const DATA_URL = 'data/bosses.json';

// Load and display boss data
async function loadBosses() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const bosses = await res.json();
    displayBosses(bosses);
  } catch (err) {
    console.error('Error fetching bosses:', err);
    bossList.innerHTML = `<li class="error">Unable to load boss checklist. Please try again later.</li>`;
  }
}


function displayBosses(bosses) {
  bossList.innerHTML = '';
  bosses.forEach(boss => {
    const li = document.createElement('li');

    // Boss thumbnail
    const img = document.createElement('img');
    img.src = boss.imageUrl;
    img.alt = `${boss.name} thumbnail`;
    img.className = 'boss-thumbnail';

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `boss-${boss.id}`;
    checkbox.checked = getStoredState(boss.id);
    checkbox.addEventListener('change', () => storeState(boss.id, checkbox.checked));

    // Label for boss name
    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = boss.name;

    // More Info button
    const moreBtn = document.createElement('button');
    moreBtn.textContent = 'More Info';
    moreBtn.className = 'more-info-btn';
    moreBtn.addEventListener('click', () => showModal(boss));

    // Container for image, checkbox, label, and button
    const meta = document.createElement('div');
    meta.className = 'boss-meta';
    meta.append(img, checkbox, label, moreBtn);

    li.append(meta);
    bossList.appendChild(li);
  });
}

function storeState(id, checked) {
  const data = JSON.parse(localStorage.getItem('bossesProgress')) || {};
  data[id] = checked;
  localStorage.setItem('bossesProgress', JSON.stringify(data));
}

function getStoredState(id) {
  const data = JSON.parse(localStorage.getItem('bossesProgress')) || {};
  return data[id] || false;
}

// Modal show/hide functions
function showModal(boss) {
  const modal = document.getElementById('infoModal');
  const titleEl = document.getElementById('modalTitle');
  const bodyEl = document.getElementById('modalBody');

  titleEl.textContent = boss.name;
  bodyEl.innerHTML = `
    <p><strong>Location:</strong> ${boss.location}</p>
    <p><strong>Difficulty:</strong> ${boss.difficulty}</p>
    <p><strong>Category:</strong> ${boss.category}</p>
    <p><strong>Weakness:</strong> ${boss.weakness}</p>
  `;

  modal.style.display = 'block';
}

function hideModal() {
  document.getElementById('infoModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.close-btn').addEventListener('click', hideModal);
  window.addEventListener('click', e => {
    if (e.target.id === 'infoModal') hideModal();
  });
  loadBosses();
});
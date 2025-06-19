
import { loadBosses } from './dataLoader.js';
import { showModal, hideModal } from './modal.js';
import { storeState, getStoredState } from './storage.js';

const bossList = document.getElementById('bossList');

function displayBosses(bosses) {
  bossList.innerHTML = '';
  bosses.forEach(boss => {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = boss.imageUrl;
    img.alt = `${boss.name} thumbnail`;
    img.loading = 'lazy';
    img.className = 'boss-thumbnail';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `boss-${boss.id}`;
    checkbox.checked = getStoredState(boss.id);
    checkbox.addEventListener('change', () => storeState(boss.id, checkbox.checked));

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = boss.name;

    const moreBtn = document.createElement('button');
    moreBtn.textContent = 'More Info';
    moreBtn.className = 'more-info-btn';
    moreBtn.addEventListener('click', () => showModal(boss));

    const meta = document.createElement('div');
    meta.className = 'boss-meta';
    meta.append(img, checkbox, label, moreBtn);

    li.append(meta);
    bossList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.close-btn').addEventListener('click', hideModal);
  window.addEventListener('click', e => {
    if (e.target.id === 'infoModal') hideModal();
  });

  loadBosses()
    .then(bosses => displayBosses(bosses))
    .catch(err => {
      console.error('Error fetching bosses:', err);
      bossList.innerHTML = `<li class="error">Unable to load boss checklist. Please try again later.</li>`;
    });

  const burger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      burger.classList.toggle('open');
    });
  }
});
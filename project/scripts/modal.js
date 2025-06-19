
export function showModal(boss) {
    const modal = document.getElementById('infoModal');
    document.getElementById('modalTitle').textContent = boss.name;
    document.getElementById('modalBody').innerHTML = `
      <p><strong>Location:</strong> ${boss.location}</p>
      <p><strong>Difficulty:</strong> ${boss.difficulty}</p>
      <p><strong>Category:</strong> ${boss.category}</p>
      <p><strong>Weakness:</strong> ${boss.weakness}</p>
    `;
    modal.style.display = 'block';
}

export function hideModal() {
    document.getElementById('infoModal').style.display = 'none';
  }
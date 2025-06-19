
export function storeState(id, checked) {
    const data = JSON.parse(localStorage.getItem('bossesProgress')) || {};
    data[id] = checked;
    localStorage.setItem('bossesProgress', JSON.stringify(data));
}

export function getStoredState(id) {
    const data = JSON.parse(localStorage.getItem('bossesProgress')) || {};
    return data[id] || false;
  }

const DATA_URL = 'data/bosses.json';

export async function loadBosses() {
    const res = await fetch(DATA_URL);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}
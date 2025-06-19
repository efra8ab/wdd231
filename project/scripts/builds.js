
export async function initBuildsPage() {
    const res = await fetch('data/resources.json');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const { rightHandWeapons, leftHandWeapons, amulets } = await res.json();

    populateSelect('rh1', rightHandWeapons, true);
    populateSelect('rh2', rightHandWeapons);
    populateSelect('lh1', leftHandWeapons);
    populateSelect('lh2', leftHandWeapons);

    const amuletsContainer = document.getElementById('amuletSelectors');
    for (let i = 1; i <= 4; i++) {
        const select = document.createElement('select');
        select.id = `amulet${i}`;
        select.name = `amulet${i}`;

        const noneOption = document.createElement('option');
        noneOption.value = '';
        noneOption.textContent = 'None';
        select.append(noneOption);
        amulets.forEach(a => {
            const opt = document.createElement('option');
            opt.value = a.id;
            opt.textContent = a.name;
            select.append(opt);
        });
        amuletsContainer.append(select);
    }

    const stats = ['Vigor', 'Mind', 'Endurance', 'Strength', 'Dexterity', 'Intelligence', 'Faith', 'Arcane'];
    const statsContainer = document.getElementById('statsInputs');
    stats.forEach(stat => {
        const wrapper = document.createElement('div');
        wrapper.className = 'stat-input';
        const label = document.createElement('label');
        label.htmlFor = stat;
        label.textContent = stat;
        const input = document.createElement('input');
        input.type = 'number';
        input.id = stat;
        input.name = stat;
        input.min = 1;
        input.max = 99;
        input.value = 1;
        wrapper.append(label, input);
        statsContainer.append(wrapper);
    });

    const form = document.getElementById('buildForm');
    form.addEventListener('submit', handleSubmit);

    renderBuilds();
}

function populateSelect(id, items, required = false) {
    const select = document.getElementById(id);
    select.required = required;
    select.innerHTML = required ? '<option value="">Select…</option>' : '<option value="">None</option>';
    items.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.id;
        opt.textContent = item.name;
        select.append(opt);
    });
}

function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const build = {
        rh1: data.get('rh1'),
        rh2: data.get('rh2'),
        lh1: data.get('lh1'),
        lh2: data.get('lh2'),
        amulets: [1, 2, 3, 4].map(i => data.get(`amulet${i}`)),
        stats: {},
        notes: data.get('notes'),
        created: new Date().toISOString()
    };

    // collect stats
    ['Vigor', 'Mind', 'Endurance', 'Strength', 'Dexterity', 'Intelligence', 'Faith', 'Arcane'].forEach(stat => {
        build.stats[stat] = parseInt(data.get(stat)) || 0;
    });

    const saved = JSON.parse(localStorage.getItem('userBuilds') || '[]');
    saved.push(build);
    localStorage.setItem('userBuilds', JSON.stringify(saved));

    event.target.reset();
    renderBuilds();
}

function renderBuilds() {
    const builds = JSON.parse(localStorage.getItem('userBuilds') || '[]');
    const container = document.getElementById('buildList');
    container.innerHTML = '';
    if (!builds.length) {
        container.textContent = 'No builds saved.';
        return;
    }
    builds.forEach((b, idx) => {
        const card = document.createElement('div');
        card.className = 'build-card';
        // Title
        const title = document.createElement('h3');
        title.textContent = `Build #${idx + 1}`;
        card.append(title);
        // Weapons
        const weap = document.createElement('p');
        weap.textContent = `RH1: ${b.rh1}, RH2: ${b.rh2 || '—'}, LH1: ${b.lh1 || '—'}, LH2: ${b.lh2 || '—'}`;
        card.append(weap);
        // Amulets
        const amu = document.createElement('p');
        amu.textContent = 'Amulets: ' + b.amulets.filter(a => a).join(', ');
        card.append(amu);
        // Stats
        const statsDiv = document.createElement('div');
        statsDiv.className = 'build-stats';
        for (const [stat, value] of Object.entries(b.stats)) {
            const span = document.createElement('span');
            span.textContent = `${stat}: ${value}`;
            statsDiv.append(span);
        }
        card.append(statsDiv);
        // Notes
        if (b.notes) {
            const notes = document.createElement('p');
            notes.textContent = `Notes: ${b.notes}`;
            card.append(notes);
        }
        container.append(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initBuildsPage().catch(console.error);

    const burger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }
});
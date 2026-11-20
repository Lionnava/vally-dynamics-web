function setLanguage(lang) {
    const enElements = document.querySelectorAll('.lang-en');
    const esElements = document.querySelectorAll('.lang-es');
    const btnEn = document.getElementById('btn-en');
    const btnEs = document.getElementById('btn-es');

    if (lang === 'es') {
        enElements.forEach(el => el.classList.add('lang-hidden'));
        esElements.forEach(el => el.classList.remove('lang-hidden'));
        if (btnEs) btnEs.classList.add('text-emerald-700', 'border-b-2', 'border-emerald-700');
        if (btnEs) btnEs.classList.remove('text-gray-400');
        if (btnEn) btnEn.classList.remove('text-emerald-700', 'border-b-2', 'border-emerald-700');
        if (btnEn) btnEn.classList.add('text-gray-400');
    } else {
        esElements.forEach(el => el.classList.add('lang-hidden'));
        enElements.forEach(el => el.classList.remove('lang-hidden'));
        if (btnEn) btnEn.classList.add('text-emerald-700', 'border-b-2', 'border-emerald-700');
        if (btnEn) btnEn.classList.remove('text-gray-400');
        if (btnEs) btnEs.classList.remove('text-emerald-700', 'border-b-2', 'border-emerald-700');
        if (btnEs) btnEs.classList.add('text-gray-400');
    }
}

// Active global visitor counter. The API increments the count once per page load.
document.addEventListener('DOMContentLoaded', () => {
    const counterImage = document.querySelector('img[src*="hitwebcounter.com"]');
    if (!counterImage) return;

    const counterContainer = counterImage.parentElement;
    const label = counterContainer.querySelector('span');
    const count = document.createElement('span');
    count.id = 'visitor-count';
    count.className = 'font-black text-emerald-300';
    count.textContent = '...';

    // Replace the inactive image counter with an accessible text counter.
    counterImage.remove();
    if (label) {
        label.innerHTML = '<span class="lang-en">Global visitors:</span><span class="lang-es lang-hidden">Visitas globales:</span>';
    }
    counterContainer.appendChild(count);

    fetch('https://api.counterapi.dev/v1/vally-dynamics/visits/up')
        .then(response => {
            if (!response.ok) throw new Error('Counter request failed');
            return response.json();
        })
        .then(data => {
            count.textContent = Number(data.count).toLocaleString();
        })
        .catch(() => {
            count.textContent = '—';
        });
});

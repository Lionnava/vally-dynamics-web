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

// Request a real shared page-view count instead of relying on the old image
// counter, whose unregistered page identifier displayed 0000.
document.addEventListener('DOMContentLoaded', async () => {
    const oldCounterImage = document.querySelector('img[src*="hitwebcounter.com"]');
    if (!oldCounterImage) return;

    const counterContainer = oldCounterImage.parentElement;
    const label = counterContainer.querySelector('span');
    const count = document.createElement('span');
    count.id = 'visitor-count';
    count.className = 'font-black text-emerald-300';
    count.setAttribute('aria-live', 'polite');
    count.textContent = '…';

    oldCounterImage.remove();
    counterContainer.classList.remove('opacity-40');
    counterContainer.classList.add('opacity-100');
    if (label) {
        label.innerHTML = '<span class="lang-en">Global visitors:</span><span class="lang-es lang-hidden">Visitas globales:</span>';
    }
    counterContainer.appendChild(count);

    try {
        const response = await fetch('https://api.counterapi.dev/v1/vally-dynamics-web/visits/up', {
            cache: 'no-store'
        });
        if (!response.ok) throw new Error(`Counter service returned ${response.status}`);

        const data = await response.json();
        const total = Number(data.count);
        if (!Number.isSafeInteger(total) || total < 0) throw new Error('Invalid counter response');
        count.textContent = total.toLocaleString();
    } catch (error) {
        console.error('Visitor counter could not be loaded:', error);
        count.textContent = 'N/D';
        count.title = 'El servicio externo del contador no está disponible.';
    }
});

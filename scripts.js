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

// Keep the hosted counter image intact: the counter provider updates its digits
// in the image response, so replacing it with a client-side fetch hides the count.
document.addEventListener('DOMContentLoaded', () => {
    const counterImage = document.querySelector('img[src*="hitwebcounter.com"]');
    if (!counterImage) return;

    const counterContainer = counterImage.parentElement;
    const label = counterContainer.querySelector('span');

    counterContainer.classList.remove('opacity-40');
    counterContainer.classList.add('opacity-100');
    counterImage.classList.add('h-5', 'w-auto');
    counterImage.alt = 'Global visitor count';
    counterImage.title = 'Global visitor counter';

    if (label) {
        label.innerHTML = '<span class="lang-en">Global visitors:</span><span class="lang-es lang-hidden">Visitas globales:</span>';
    }
});

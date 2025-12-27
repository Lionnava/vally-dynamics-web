function setLanguage(lang) {
    const enElements = document.querySelectorAll('.lang-en');
    const esElements = document.querySelectorAll('.lang-es');
    const btnEn = document.getElementById('btn-en');
    const btnEs = document.getElementById('btn-es');

    if (lang === 'es') {
        enElements.forEach(el => el.classList.add('lang-hidden'));
        esElements.forEach(el => el.classList.remove('lang-hidden'));
        if(btnEs) btnEs.classList.add('text-emerald-700', 'border-b-2', 'border-emerald-700');
        if(btnEs) btnEs.classList.remove('text-gray-400');
        if(btnEn) btnEn.classList.remove('text-emerald-700', 'border-b-2', 'border-emerald-700');
        if(btnEn) btnEn.classList.add('text-gray-400');
    } else {
        esElements.forEach(el => el.classList.add('lang-hidden'));
        enElements.forEach(el => el.classList.remove('lang-hidden'));
        if(btnEn) btnEn.classList.add('text-emerald-700', 'border-b-2', 'border-emerald-700');
        if(btnEn) btnEn.classList.remove('text-gray-400');
        if(btnEs) btnEs.classList.remove('text-emerald-700', 'border-b-2', 'border-emerald-700');
        if(btnEs) btnEs.classList.add('text-gray-400');
    }
}
// Detectar idioma del navegador al cargar
document.addEventListener("DOMContentLoaded", () => {
    const userLang = navigator.language || navigator.userLanguage; 
    if (userLang.startsWith('es')) setLanguage('es');
});

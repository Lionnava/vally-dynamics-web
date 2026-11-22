// scripts.js — Vally Dynamics / Vally Structural Intelligence

function safeGetStorage(key, fallback) {
    try {
        return localStorage.getItem(key) || fallback;
    } catch (e) {
        return fallback;
    }
}

function safeSetStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        // Ignorar si el navegador bloquea almacenamiento local
    }
}

function setLanguage(lang) {
    const normalizedLang = lang === 'es' ? 'es' : 'en';
    const enElements = document.querySelectorAll('.lang-en');
    const esElements = document.querySelectorAll('.lang-es');
    const btnEn = document.getElementById('btn-en');
    const btnEs = document.getElementById('btn-es');

    document.documentElement.lang = normalizedLang;
    safeSetStorage('vally_lang', normalizedLang);

    if (normalizedLang === 'es') {
        enElements.forEach(el => el.classList.add('lang-hidden'));
        esElements.forEach(el => el.classList.remove('lang-hidden'));
        if (btnEs) {
            btnEs.classList.add('text-emerald-700', 'border-b-2', 'border-emerald-700');
            btnEs.classList.remove('text-gray-400');
        }
        if (btnEn) {
            btnEn.classList.remove('text-emerald-700', 'border-b-2', 'border-emerald-700');
            btnEn.classList.add('text-gray-400');
        }
    } else {
        esElements.forEach(el => el.classList.add('lang-hidden'));
        enElements.forEach(el => el.classList.remove('lang-hidden'));
        if (btnEn) {
            btnEn.classList.add('text-emerald-700', 'border-b-2', 'border-emerald-700');
            btnEn.classList.remove('text-gray-400');
        }
        if (btnEs) {
            btnEs.classList.remove('text-emerald-700', 'border-b-2', 'border-emerald-700');
            btnEs.classList.add('text-gray-400');
        }
    }

    // Actualizar <title> si tiene data-en / data-es
    const titleEl = document.querySelector('title[data-en][data-es]');
    if (titleEl) {
        document.title = titleEl.getAttribute(`data-${normalizedLang}`);
    }

    // Traducir <option> y placeholders
    document.querySelectorAll('option[data-en][data-es]').forEach(opt => {
        const text = opt.getAttribute(`data-${normalizedLang}`);
        if (text) opt.textContent = text;
    });

    document.querySelectorAll('[data-placeholder-en][data-placeholder-es]').forEach(el => {
        const ph = el.getAttribute(`data-placeholder-${normalizedLang}`);
        if (ph) el.placeholder = ph;
    });

    // Sincronizar idioma sugerido del reporte si el usuario aún no lo ha cambiado manualmente
    const reportLang = document.getElementById('report-lang');
    if (reportLang && !reportLang.dataset.userModified) {
        reportLang.value = normalizedLang.toUpperCase();
    }
}

function toggleStructureFields() {
    const typeSelect = document.getElementById('structure-type');
    const publicFields = document.getElementById('public-pdb-fields');
    const ndaNotice = document.getElementById('nda-notice');
    const pdbInput = document.getElementById('pdb-id');
    const chainSelect = document.getElementById('chain-mode');

    if (!typeSelect || !publicFields || !ndaNotice) return;

    const isPublic = typeSelect.value === 'public_pdb';
    publicFields.classList.toggle('hidden', !isPublic);
    ndaNotice.classList.toggle('hidden', isPublic);

    if (pdbInput) {
        pdbInput.required = isPublic;
        pdbInput.disabled = !isPublic;
        if (!isPublic) pdbInput.value = '';
    }
    if (chainSelect) {
        chainSelect.disabled = !isPublic;
    }
}

function toggleMutationField() {
    const modeSelect = document.getElementById('scan-mode');
    const mutField = document.getElementById('mutation-field');
    const mutInput = document.getElementById('mutation-target');

    if (!modeSelect || !mutField) return;

    const isMutation = modeSelect.value === 'mutation_impact';
    mutField.classList.toggle('hidden', !isMutation);

    if (mutInput) {
        mutInput.required = isMutation;
        mutInput.disabled = !isMutation;
        if (!isMutation) mutInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = safeGetStorage('vally_lang', 'en');
    setLanguage(savedLang);
    toggleStructureFields();
    toggleMutationField();

    const reportLang = document.getElementById('report-lang');
    if (reportLang) {
        reportLang.addEventListener('change', () => {
            reportLang.dataset.userModified = 'true';
        });
    }

    const pdbInput = document.getElementById('pdb-id');
    if (pdbInput) {
        pdbInput.addEventListener('input', () => {
            pdbInput.value = pdbInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        });
    }

    // Evitar doble envío accidental en el formulario
    const intakeForm = document.getElementById('intake-form');
    const submitBtn = document.getElementById('submit-btn');
    if (intakeForm && submitBtn) {
        intakeForm.addEventListener('submit', () => {
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-60', 'cursor-not-allowed');
        });
    }
});
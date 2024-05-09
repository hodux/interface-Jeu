var currentTranslation;

function translatePage(language) {
    currentTranslation = language;
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    sessionStorage.setItem('currentTranslation', language);
    console.log("Language switched to " + currentTranslation);
}
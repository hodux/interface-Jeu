var currentTranslation;
 
async function translatePage(language) {
    currentTranslation = language;

    const response = await fetch("../interface-jeu/json/translations.json");
    const translations = await response.json();
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    sessionStorage.setItem('currentTranslation', language);
    console.log("Language switched to " + currentTranslation);

    // Menu
    // Confirme que les bouttons ne restent pas vert - resets all buttons
    document.querySelectorAll('.language-btn').forEach(button => {
        button.classList.remove('btn-info');
        button.classList.add('btn-secondary');
    });

    if (language === 'en') {
        document.getElementById('en').classList.replace('btn-secondary', 'btn-info');
    } else if (language === 'es') {
        document.getElementById('es').classList.replace('btn-secondary', 'btn-info');
    } else if (language === 'fr') {
        document.getElementById('fr').classList.replace('btn-secondary', 'btn-info');
    } else if (language === 'zh') {
        document.getElementById('zh').classList.replace('btn-secondary', 'btn-info');
    }
    
}
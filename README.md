# interface-Jeu
_En cadre avec le cours d'interfaces humain machines pour **Création d'un jeu avec objet(s) connecté(s)**_

<img src="plan-figma.png">

<img src="plan-manette.png">

# Comment ajouter des traductions
> [!TIP]
> La fonction responsable pour la traduction des pages recherche l'attribut "data-translate".

#### Pour ajouter une traduction :
- Inscrire les traductions sous format json et les ajouter à la liste `translations` de la page html.

Traduction FR pour `Menu.html` avec ces attributs : `data-translate="welcome"`, `data-translate="rules"` et `data-translate="start"`
```html
fr: {
  welcome: "Bienvenue dans l'aventure de Tri",
  rules: 'Règles',
  start: 'Démarrer'
}
```
- Ajouter la condition pour la nouvelle langue dans `translate.js`
```html
  if (language === 'en') {
      document.getElementById('en').classList.replace('btn-secondary', 'btn-info');
  } else if (language === 'es') {
      document.getElementById('es').classList.replace('btn-secondary', 'btn-info');
  } else if (language === 'fr') {
      document.getElementById('fr').classList.replace('btn-secondary', 'btn-info');
  }
```

# Guide de Contribution

Merci de votre intérêt pour contribuer à **Audiotivist** ! Ce document vous guidera à travers le processus de contribution.

## 🚀 Démarrage Rapide

### Prérequis
- **Node.js** 18+ 
- **npm** ou **yarn**
- **Git**
- Un éditeur de code (VS Code recommandé)

### Installation
```bash
# Fork et cloner le repository
git clone https://github.com/michaelgermini/audiotivist.git
cd audiotivist

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

## 📋 Types de Contributions

### 🐛 Signaler un Bug
- Utilisez le template "Bug Report"
- Incluez des étapes de reproduction claires
- Ajoutez des captures d'écran si possible
- Spécifiez votre environnement (OS, navigateur, version)

### ✨ Proposer une Fonctionnalité
- Utilisez le template "Feature Request"
- Décrivez clairement le besoin
- Expliquez pourquoi cette fonctionnalité serait utile
- Proposez une solution si possible

### 🔧 Améliorer le Code
- Créez une branche pour votre fonctionnalité
- Suivez les conventions de code
- Ajoutez des tests si applicable
- Mettez à jour la documentation

## 🛠️ Workflow de Développement

### 1. Créer une Branche
```bash
# Depuis la branche main
git checkout -b feature/nom-de-la-fonctionnalite
# ou
git checkout -b fix/nom-du-bug
```

### 2. Développer
- Écrivez du code propre et documenté
- Suivez les conventions ESLint
- Testez vos changements localement
- Committez régulièrement avec des messages clairs

### 3. Tester
```bash
# Vérifier le code
npm run lint

# Formater le code
npm run format

# Tester l'application
npm run dev
```

### 4. Committer
```bash
# Ajouter les fichiers
git add .

# Committer avec un message descriptif
git commit -m "feat: ajouter nouvelle fonctionnalité X"
git commit -m "fix: corriger bug dans Y"
git commit -m "docs: mettre à jour documentation Z"
```

### 5. Pousser et Créer une PR
```bash
git push origin feature/nom-de-la-fonctionnalite
```

## 📝 Conventions de Code

### Messages de Commit
Utilisez le format [Conventional Commits](https://www.conventionalcommits.org/) :

```
type(scope): description

feat(video): ajouter support pour format WebM
fix(audio): corriger problème de latence
docs(readme): mettre à jour instructions d'installation
style(ui): améliorer design du bouton play
refactor(mixer): simplifier logique de mixage
test(effects): ajouter tests pour effets visuels
```

Types disponibles :
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `style` : Formatage, points-virgules manquants, etc.
- `refactor` : Refactoring de code
- `test` : Ajout ou modification de tests
- `chore` : Tâches de maintenance

### Style de Code
- **JavaScript/React** : Suivre les règles ESLint
- **CSS** : Utiliser les variables CSS pour les couleurs
- **Noms de fichiers** : PascalCase pour les composants React
- **Noms de variables** : camelCase
- **Noms de constantes** : UPPER_SNAKE_CASE

### Structure des Composants
```javascript
// 1. Imports
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from 'lucide-react'

// 2. Composant principal
const MonComposant = ({ prop1, prop2, onAction }) => {
  // 3. États et hooks
  const [state, setState] = useState(initialValue)
  
  // 4. Effets
  useEffect(() => {
    // logique
  }, [dependencies])
  
  // 5. Fonctions
  const handleClick = () => {
    // logique
  }
  
  // 6. Rendu
  return (
    <div className="mon-composant">
      {/* JSX */}
    </div>
  )
}

// 7. Export
export default MonComposant
```

## 🧪 Tests

### Tests Manuels
- Testez sur différents navigateurs (Chrome, Firefox, Safari, Edge)
- Vérifiez la responsivité sur mobile/tablette
- Testez avec différents formats de vidéos
- Vérifiez les performances avec des fichiers volumineux

### Tests Automatisés
```bash
# Lancer les tests (quand implémentés)
npm test

# Couverture de code
npm run test:coverage
```

## 📚 Documentation

### Code
- Commentez les fonctions complexes
- Utilisez JSDoc pour les APIs publiques
- Expliquez les algorithmes non évidents

### README
- Mettez à jour le README si vous ajoutez des fonctionnalités
- Ajoutez des exemples d'utilisation
- Documentez les nouvelles options de configuration

### CHANGELOG
- Ajoutez vos changements au CHANGELOG.md
- Suivez le format existant
- Utilisez les catégories appropriées

## 🎯 Zones de Contribution

### Priorité Haute
- **Performance** : Optimisations vidéo/audio
- **Stabilité** : Correction de bugs critiques
- **Accessibilité** : Amélioration de l'accessibilité
- **Tests** : Ajout de tests unitaires/intégration

### Priorité Moyenne
- **Nouvelles fonctionnalités** : Effets visuels, contrôles audio
- **UI/UX** : Améliorations d'interface
- **Documentation** : Guides, tutoriels, exemples

### Priorité Basse
- **Refactoring** : Amélioration du code existant
- **Optimisations mineures** : Performance non critique
- **Nouvelles dépendances** : Intégration de nouvelles librairies

## 🤝 Processus de Review

### Avant de Soumettre
- [ ] Code linté et formaté
- [ ] Tests passent
- [ ] Documentation mise à jour
- [ ] CHANGELOG mis à jour
- [ ] Fonctionnalité testée manuellement

### Pendant la Review
- Répondez aux commentaires rapidement
- Faites les modifications demandées
- Ajoutez des tests si nécessaire
- Expliquez vos choix de design

### Après la Review
- Mergez seulement après approbation
- Supprimez la branche après merge
- Célébrez votre contribution ! 🎉

## 🆘 Besoin d'Aide ?

- **Issues** : [GitHub Issues](https://github.com/michaelgermini/audiotivist/issues)
- **Discussions** : [GitHub Discussions](https://github.com/michaelgermini/audiotivist/discussions)
- **Email** : contact@audiotivist.com

## 📄 Licence

En contribuant, vous acceptez que vos contributions soient sous la même licence MIT que le projet.

---

**Merci de contribuer à Audiotivist !** 🎵✨

# 🎵 Audiotivist

**Audiotivist** est un logiciel moderne pour la production et performance audio-visuelle parallèle. Conçu pour les VJ, musiciens et créateurs de contenu, il offre un workflow efficace pour mixer vidéo et graphiques génératifs en temps réel.

## ✨ Fonctionnalités

### 🎥 **Mixage Vidéo Avancé**
- **Multi-couches** : Jusqu'à 8 couches vidéo simultanées
- **Formats supportés** : MP4, WebM, AVI, MOV, etc.
- **Contrôles temps réel** : Opacité, visibilité, sélection
- **Tailles multiples** : 320x240, 640x480, 1280x720, 800x600

### 🎨 **Graphiques Génératifs**
- **P5.js** : Animations 2D réactives
- **Three.js** : Éléments 3D interactifs
- **Audio-réactif** : Synchronisation avec l'audio
- **Effets visuels** : Distorsion, masques, transitions

### 🎵 **Intégration Audio**
- **Tone.js** : Traitement audio avancé
- **Analyse temps réel** : Spectre, fréquence, amplitude
- **MIDI** : Support des contrôleurs externes
- **OSC** : Communication réseau

### 🎛️ **Interface Performancielle**
- **GUI compacte** : Optimisée pour les performances live
- **Contrôles rapides** : Raccourcis clavier et souris
- **Mode plein écran** : Sortie dédiée
- **Responsive** : Adapté à tous les écrans

## 🚀 Installation

### Prérequis
- **Node.js** 18+ 
- **npm** ou **yarn**
- **Navigateur moderne** (Chrome, Firefox, Safari, Edge)

### Installation
```bash
# Cloner le repository
git clone https://github.com/michaelgermini/audiotivist.git
cd audiotivist

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build
```

## 🎯 Utilisation

### Démarrage Rapide
1. **Lancer l'application** : `npm run dev`
2. **Ouvrir le navigateur** : `http://localhost:5173`
3. **Ajouter des vidéos** : Cliquer sur l'icône vidéo dans la sidebar
4. **Activer l'audio** : Cliquer sur l'icône audio pour autoriser le microphone
5. **Mixer** : Utiliser les contrôles de couches pour ajuster l'opacité et la visibilité

### Contrôles Principaux
- **Play/Pause** : Barre d'espace ou bouton dans la TopBar
- **Sélection de couche** : Clic sur une couche dans le VideoMixer
- **Ajustement d'opacité** : Slider dans les contrôles de couche
- **Plein écran** : Bouton "Fullscreen" dans le VideoMixer

### Effets Visuels
- **Onglet Effects** : Effets de base (luminosité, contraste, etc.)
- **Onglet Generative** : Graphiques génératifs et patterns
- **Onglet Transitions** : Transitions entre scènes

## 🛠️ Architecture Technique

### Frontend
- **React 18** : Interface utilisateur
- **Vite** : Build tool et dev server
- **Framer Motion** : Animations fluides
- **Lucide React** : Icônes modernes

### Graphiques
- **Three.js** : Rendu 3D WebGL
- **P5.js** : Graphiques 2D génératifs
- **WebGL** : Accélération matérielle

### Audio
- **Tone.js** : Framework audio avancé
- **Web Audio API** : API audio native
- **MIDI API** : Support des contrôleurs
- **OSC** : Communication réseau

### Styling
- **CSS Variables** : Thème personnalisable
- **Responsive Design** : Adaptatif mobile/desktop
- **Dark Theme** : Interface sombre moderne

## 📁 Structure du Projet

```
audiotivist/
├── public/                 # Assets statiques
├── src/
│   ├── components/         # Composants React
│   │   ├── VideoMixer.jsx  # Mixeur vidéo principal
│   │   ├── AudioController.jsx # Contrôleur audio
│   │   ├── EffectsPanel.jsx # Panneau d'effets
│   │   ├── Sidebar.jsx     # Barre latérale
│   │   ├── TopBar.jsx      # Barre supérieure
│   │   ├── Timeline.jsx    # Timeline de lecture
│   │   └── ErrorBoundary.jsx # Gestion d'erreurs
│   ├── App.jsx            # Composant principal
│   ├── main.jsx           # Point d'entrée
│   └── index.css          # Styles globaux
├── package.json           # Dépendances et scripts
├── vite.config.js         # Configuration Vite
└── README.md              # Documentation
```

## 🎨 Personnalisation

### Thème
Modifiez les variables CSS dans `src/index.css` :
```css
:root {
  --primary: #6366f1;
  --background: #0f0f23;
  --surface: #1a1a2e;
  --text: #ffffff;
  /* ... autres variables */
}
```

### Effets Personnalisés
Ajoutez vos propres effets dans `src/components/EffectsPanel.jsx` :
```javascript
const customEffect = {
  name: 'Mon Effet',
  parameters: {
    intensity: { min: 0, max: 1, default: 0.5 },
    speed: { min: 0, max: 10, default: 1 }
  }
}
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build
npm run lint         # Vérification du code
```

## 🌐 Compatibilité

### Navigateurs Supportés
- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

### Fonctionnalités Requises
- **WebGL** : Pour les graphiques 3D
- **Web Audio API** : Pour le traitement audio
- **File API** : Pour l'upload de vidéos
- **Fullscreen API** : Pour le mode plein écran

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### Guidelines
- **Code style** : Suivre les conventions ESLint
- **Tests** : Ajouter des tests pour les nouvelles fonctionnalités
- **Documentation** : Mettre à jour le README si nécessaire
- **Performance** : Optimiser pour les performances temps réel

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **Three.js** : Pour les graphiques 3D
- **P5.js** : Pour les graphiques génératifs
- **Tone.js** : Pour le traitement audio
- **React** : Pour l'interface utilisateur
- **Vite** : Pour l'outil de build

## 📞 Support

- **Issues** : [GitHub Issues](https://github.com/michaelgermini/audiotivist/issues)
- **Discussions** : [GitHub Discussions](https://github.com/michaelgermini/audiotivist/discussions)
- **Email** : contact@audiotivist.com

---

**Audiotivist** - Créez, mixez, performez ! 🎵✨

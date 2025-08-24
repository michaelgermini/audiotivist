# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Ajouté
- **Interface principale** : Interface moderne avec thème sombre
- **VideoMixer** : Mixage multi-couches avec support MP4 optimisé
- **AudioController** : Intégration audio avec Tone.js et analyse temps réel
- **EffectsPanel** : Panneau d'effets avec 3 onglets (Effects, Generative, Transitions)
- **Sidebar** : Gestion des couches et upload de vidéos
- **TopBar** : Contrôles principaux et statut
- **Timeline** : Timeline de lecture avec contrôles de transport
- **ErrorBoundary** : Gestion d'erreurs robuste

### Fonctionnalités Vidéo
- Support multi-formats (MP4, WebM, AVI, MOV)
- Contrôles d'opacité et visibilité par couche
- Tailles multiples (320x240, 640x480, 1280x720, 800x600)
- Mode plein écran
- Optimisations MP4 avec `playsInline`, `preload="metadata"`
- Gestion d'erreurs vidéo améliorée

### Fonctionnalités Audio
- Analyse audio temps réel avec Tone.js
- Support MIDI pour contrôleurs externes
- Communication OSC
- Gestion des périphériques audio
- Activation par interaction utilisateur

### Graphiques Génératifs
- Intégration P5.js pour animations 2D
- Intégration Three.js pour éléments 3D
- Graphiques audio-réactifs
- Patterns génératifs multiples
- Effets de transition avancés

### Interface Utilisateur
- Design responsive adaptatif
- Animations fluides avec Framer Motion
- Icônes modernes avec Lucide React
- Thème sombre optimisé pour performances
- Contrôles intuitifs pour VJ

### Performance
- Optimisations WebGL pour graphiques
- Gestion mémoire des vidéos
- Frame skipping pour effets complexes
- Chargement asynchrone des ressources

### Compatibilité
- Support navigateurs modernes (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- WebGL requis pour graphiques 3D
- Web Audio API pour traitement audio
- File API pour upload vidéos

### Développement
- Configuration Vite pour build rapide
- ESLint et Prettier pour qualité du code
- Structure modulaire React
- Documentation complète

---

## [0.1.0] - 2024-12-18

### Ajouté
- Structure initiale du projet
- Configuration de base React + Vite
- Composants de base
- Intégration Three.js et P5.js

---

**Note** : Ce projet suit le [Semantic Versioning](https://semver.org/).

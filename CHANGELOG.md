# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added
- **Main interface** : Modern interface with dark theme
- **VideoMixer** : Multi-layer mixing with optimized MP4 support
- **AudioController** : Audio integration with Tone.js and real-time analysis
- **EffectsPanel** : Effects panel with 3 tabs (Effects, Generative, Transitions)
- **Sidebar** : Layer management and video uploads
- **TopBar** : Main controls and status
- **Timeline** : Playback timeline with transport controls
- **ErrorBoundary** : Robust error handling

### Video Features
- Multi-format support (MP4, WebM, AVI, MOV)
- Layer opacity and visibility controls
- Multiple sizes (320x240, 640x480, 1280x720, 800x600)
- Fullscreen mode
- MP4 optimizations with `playsInline`, `preload="metadata"`
- Enhanced video error handling

### Audio Features
- Real-time audio analysis with Tone.js
- MIDI support for external controllers
- OSC communication
- Audio device management
- User interaction activation

### Generative Graphics
- P5.js integration for 2D animations
- Three.js integration for 3D elements
- Audio-reactive graphics
- Multiple generative patterns
- Advanced transition effects

### User Interface
- Responsive adaptive design
- Smooth animations with Framer Motion
- Modern icons with Lucide React
- Dark theme optimized for performances
- Intuitive VJ controls

### Performance
- WebGL optimizations for graphics
- Video memory management
- Frame skipping for complex effects
- Asynchronous resource loading

### Compatibility
- Modern browser support (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- WebGL required for 3D graphics
- Web Audio API for audio processing
- File API for video uploads

### Development
- Vite configuration for fast builds
- ESLint and Prettier for code quality
- Modular React structure
- Complete documentation

---

## [0.1.0] - 2024-12-18

### Added
- Initial project structure
- Basic React + Vite configuration
- Base components
- Three.js and P5.js integration

---

**Note** : This project follows [Semantic Versioning](https://semver.org/).

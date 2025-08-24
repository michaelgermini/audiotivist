import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Palette, Layers, Settings, Zap, Music, Eye, RotateCw, Waves, Star, Heart, Target, Droplets, Flame, Snowflake } from 'lucide-react'
import './EffectsPanel.css'

const EffectsPanel = ({ selectedLayer, layers, onLayerUpdate }) => {
  const [activeTab, setActiveTab] = useState('effects')
  const [transitionSettings, setTransitionSettings] = useState({
    type: 'fade',
    duration: 1,
    easing: 'ease-in-out',
    direction: 'in',
    trigger: 'manual'
  })
  const [effects, setEffects] = useState({
    blur: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1,
    hue: 0,
    noise: 0,
    pixelate: 1,
    // Nouveaux effets de base
    gamma: 1,
    sepia: 0,
    invert: 0,
    grayscale: 0,
    // Effets de déformation
    distortion: 0,
    wave: 0,
    ripple: 0,
    twirl: 0,
    // Effets de masque
    vignette: 0,
    radialBlur: 0,
    edgeDetection: 0,
    // Effets de transition
    fadeIn: 0,
    slideIn: 0,
    zoomIn: 0,
    rotate: 0,
    // Effets audio-réactifs
    audioReactive: false,
    bassReactive: false,
    trebleReactive: false,
    // Effets spéciaux
    glitch: 0,
    scanlines: 0,
    crt: 0,
    kaleidoscope: 0,
    mirror: false,
    flipH: false,
    flipV: false
  })

  const [generativeSettings, setGenerativeSettings] = useState({
    pattern: 'wave',
    speed: 1,
    intensity: 0.5,
    color: '#6366f1',
    size: 1,
    // Nouveaux paramètres génératifs
    complexity: 0.5,
    symmetry: 0.5,
    flow: 0.5,
    turbulence: 0.3,
    // Paramètres de particules
    particleCount: 100,
    particleSize: 2,
    particleSpeed: 1,
    // Paramètres de géométrie
    geometryType: 'triangles',
    geometrySize: 1,
    geometryRotation: 0,
    // Paramètres de fractales
    fractalDepth: 3,
    fractalScale: 0.5,
    fractalRotation: 0
  })

  const handleEffectChange = (effect, value) => {
    setEffects(prev => ({ ...prev, [effect]: value }))
    // Apply effect to selected layer
    if (selectedLayer !== null) {
      onLayerUpdate(selectedLayer, { effects: { ...effects, [effect]: value } })
    }
  }

  const handleGenerativeChange = (setting, value) => {
    setGenerativeSettings(prev => ({ ...prev, [setting]: value }))
  }

  const handleTransitionChange = (setting, value) => {
    setTransitionSettings(prev => ({ ...prev, [setting]: value }))
  }

  const applyPreset = (presetName) => {
    const presets = {
      // Presets de base
      'glitch': { blur: 0.1, brightness: 1.2, contrast: 1.3, saturation: 0.8, noise: 0.3, glitch: 0.5 },
      'vintage': { brightness: 0.9, contrast: 1.1, saturation: 0.7, hue: 30, sepia: 0.3, vignette: 0.4 },
      'neon': { brightness: 1.3, contrast: 1.4, saturation: 1.5, hue: 180, edgeDetection: 0.2 },
      'minimal': { brightness: 1.1, contrast: 0.9, saturation: 0.5, blur: 0.05, grayscale: 0.3 },
      // Nouveaux presets créatifs
      'cyberpunk': { brightness: 1.2, contrast: 1.4, saturation: 1.3, hue: 200, glitch: 0.3, scanlines: 0.4, crt: 0.2 },
      'dreamy': { blur: 0.2, brightness: 1.1, saturation: 0.8, vignette: 0.3, radialBlur: 0.2, wave: 0.3 },
      'energetic': { brightness: 1.4, contrast: 1.3, saturation: 1.2, distortion: 0.3, ripple: 0.4, audioReactive: true },
      'mystical': { brightness: 0.8, contrast: 1.2, saturation: 1.1, hue: 280, kaleidoscope: 0.3, twirl: 0.2 },
      'retro': { brightness: 0.9, contrast: 1.1, saturation: 0.6, sepia: 0.4, crt: 0.5, scanlines: 0.6 },
      'futuristic': { brightness: 1.3, contrast: 1.5, saturation: 1.4, edgeDetection: 0.4, mirror: true, flipH: true },
      'organic': { brightness: 1.0, contrast: 0.9, saturation: 1.1, wave: 0.5, ripple: 0.3, turbulence: 0.4 },
      'chaos': { brightness: 1.2, contrast: 1.4, saturation: 1.3, glitch: 0.8, distortion: 0.6, noise: 0.5 }
    }
    
    if (presets[presetName]) {
      setEffects(presets[presetName])
      if (selectedLayer !== null) {
        onLayerUpdate(selectedLayer, { effects: presets[presetName] })
      }
    }
  }

  const renderEffectsTab = () => (
    <div className="effects-content">
      {/* Effets de base */}
      <div className="effects-section">
        <h4><Eye size={14} /> Basic Effects</h4>
        <div className="effect-controls">
          <div className="effect-control">
            <label>Blur</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.blur}
              onChange={(e) => handleEffectChange('blur', parseFloat(e.target.value))}
            />
            <span>{effects.blur.toFixed(2)}</span>
          </div>
          
          <div className="effect-control">
            <label>Brightness</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={effects.brightness}
              onChange={(e) => handleEffectChange('brightness', parseFloat(e.target.value))}
            />
            <span>{effects.brightness.toFixed(1)}</span>
          </div>
          
          <div className="effect-control">
            <label>Contrast</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={effects.contrast}
              onChange={(e) => handleEffectChange('contrast', parseFloat(e.target.value))}
            />
            <span>{effects.contrast.toFixed(1)}</span>
          </div>
          
          <div className="effect-control">
            <label>Saturation</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={effects.saturation}
              onChange={(e) => handleEffectChange('saturation', parseFloat(e.target.value))}
            />
            <span>{effects.saturation.toFixed(1)}</span>
          </div>
          
          <div className="effect-control">
            <label>Hue</label>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={effects.hue}
              onChange={(e) => handleEffectChange('hue', parseInt(e.target.value))}
            />
            <span>{effects.hue}°</span>
          </div>
          
          <div className="effect-control">
            <label>Gamma</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={effects.gamma}
              onChange={(e) => handleEffectChange('gamma', parseFloat(e.target.value))}
            />
            <span>{effects.gamma.toFixed(1)}</span>
          </div>
          
          <div className="effect-control">
            <label>Sepia</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={effects.sepia}
              onChange={(e) => handleEffectChange('sepia', parseFloat(e.target.value))}
            />
            <span>{effects.sepia.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      {/* Effets de déformation */}
      <div className="effects-section">
        <h4><Waves size={14} /> Distortion Effects</h4>
        <div className="effect-controls">
          <div className="effect-control">
            <label>Distortion</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.distortion}
              onChange={(e) => handleEffectChange('distortion', parseFloat(e.target.value))}
            />
            <span>{effects.distortion.toFixed(2)}</span>
          </div>
          
          <div className="effect-control">
            <label>Wave</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.wave}
              onChange={(e) => handleEffectChange('wave', parseFloat(e.target.value))}
            />
            <span>{effects.wave.toFixed(2)}</span>
          </div>
          
          <div className="effect-control">
            <label>Ripple</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.ripple}
              onChange={(e) => handleEffectChange('ripple', parseFloat(e.target.value))}
            />
            <span>{effects.ripple.toFixed(2)}</span>
          </div>
          
          <div className="effect-control">
            <label>Twirl</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.twirl}
              onChange={(e) => handleEffectChange('twirl', parseFloat(e.target.value))}
            />
            <span>{effects.twirl.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Effets spéciaux */}
      <div className="effects-section">
        <h4><Zap size={14} /> Special Effects</h4>
        <div className="effect-controls">
          <div className="effect-control">
            <label>Glitch</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.glitch}
              onChange={(e) => handleEffectChange('glitch', parseFloat(e.target.value))}
            />
            <span>{effects.glitch.toFixed(2)}</span>
          </div>
          
          <div className="effect-control">
            <label>Scanlines</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.scanlines}
              onChange={(e) => handleEffectChange('scanlines', parseFloat(e.target.value))}
            />
            <span>{effects.scanlines.toFixed(2)}</span>
          </div>
          
          <div className="effect-control">
            <label>CRT Effect</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.crt}
              onChange={(e) => handleEffectChange('crt', parseFloat(e.target.value))}
            />
            <span>{effects.crt.toFixed(2)}</span>
          </div>
          
          <div className="effect-control">
            <label>Kaleidoscope</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.kaleidoscope}
              onChange={(e) => handleEffectChange('kaleidoscope', parseFloat(e.target.value))}
            />
            <span>{effects.kaleidoscope.toFixed(2)}</span>
          </div>
          
          <div className="effect-control">
            <label>Noise</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.noise}
              onChange={(e) => handleEffectChange('noise', parseFloat(e.target.value))}
            />
            <span>{effects.noise.toFixed(2)}</span>
          </div>
          
          <div className="effect-control">
            <label>Pixelate</label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={effects.pixelate}
              onChange={(e) => handleEffectChange('pixelate', parseInt(e.target.value))}
            />
            <span>{effects.pixelate}</span>
          </div>
        </div>
      </div>
      
      {/* Effets de masque */}
      <div className="effects-section">
        <h4><Target size={14} /> Mask Effects</h4>
        <div className="effect-controls">
          <div className="effect-control">
            <label>Vignette</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.vignette}
              onChange={(e) => handleEffectChange('vignette', parseFloat(e.target.value))}
            />
            <span>{effects.vignette.toFixed(2)}</span>
          </div>
          
          <div className="effect-control">
            <label>Radial Blur</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.radialBlur}
              onChange={(e) => handleEffectChange('radialBlur', parseFloat(e.target.value))}
            />
            <span>{effects.radialBlur.toFixed(2)}</span>
          </div>
          
          <div className="effect-control">
            <label>Edge Detection</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.edgeDetection}
              onChange={(e) => handleEffectChange('edgeDetection', parseFloat(e.target.value))}
            />
            <span>{effects.edgeDetection.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Effets audio-réactifs */}
      <div className="effects-section">
        <h4><Music size={14} /> Audio Reactive</h4>
        <div className="effect-controls">
          <div className="effect-control checkbox-control">
            <label>
              <input
                type="checkbox"
                checked={effects.audioReactive}
                onChange={(e) => handleEffectChange('audioReactive', e.target.checked)}
              />
              Audio Reactive
            </label>
          </div>
          
          <div className="effect-control checkbox-control">
            <label>
              <input
                type="checkbox"
                checked={effects.bassReactive}
                onChange={(e) => handleEffectChange('bassReactive', e.target.checked)}
              />
              Bass Reactive
            </label>
          </div>
          
          <div className="effect-control checkbox-control">
            <label>
              <input
                type="checkbox"
                checked={effects.trebleReactive}
                onChange={(e) => handleEffectChange('trebleReactive', e.target.checked)}
              />
              Treble Reactive
            </label>
          </div>
        </div>
      </div>
      
      {/* Transformations */}
      <div className="effects-section">
        <h4><RotateCw size={14} /> Transformations</h4>
        <div className="effect-controls">
          <div className="effect-control">
            <label>Rotate</label>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={effects.rotate}
              onChange={(e) => handleEffectChange('rotate', parseInt(e.target.value))}
            />
            <span>{effects.rotate}°</span>
          </div>
          
          <div className="effect-control">
            <label>Zoom In</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={effects.zoomIn}
              onChange={(e) => handleEffectChange('zoomIn', parseFloat(e.target.value))}
            />
            <span>{effects.zoomIn.toFixed(1)}</span>
          </div>
          
          <div className="effect-control checkbox-control">
            <label>
              <input
                type="checkbox"
                checked={effects.mirror}
                onChange={(e) => handleEffectChange('mirror', e.target.checked)}
              />
              Mirror
            </label>
          </div>
          
          <div className="effect-control checkbox-control">
            <label>
              <input
                type="checkbox"
                checked={effects.flipH}
                onChange={(e) => handleEffectChange('flipH', e.target.checked)}
              />
              Flip Horizontal
            </label>
          </div>
          
          <div className="effect-control checkbox-control">
            <label>
              <input
                type="checkbox"
                checked={effects.flipV}
                onChange={(e) => handleEffectChange('flipV', e.target.checked)}
              />
              Flip Vertical
            </label>
          </div>
        </div>
      </div>
      
      {/* Presets */}
      <div className="effects-section">
        <h4><Star size={14} /> Presets</h4>
        <div className="preset-buttons">
          {['glitch', 'vintage', 'neon', 'minimal', 'cyberpunk', 'dreamy', 'energetic', 'mystical', 'retro', 'futuristic', 'organic', 'chaos'].map(preset => (
            <button
              key={preset}
              onClick={() => applyPreset(preset)}
              className="preset-btn"
            >
              {preset.charAt(0).toUpperCase() + preset.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderGenerativeTab = () => (
    <div className="generative-content">
      {/* Types de patterns */}
      <div className="generative-section">
        <h4><Heart size={14} /> Pattern Type</h4>
        <select
          value={generativeSettings.pattern}
          onChange={(e) => handleGenerativeChange('pattern', e.target.value)}
          className="pattern-select"
        >
          <option value="wave">Wave</option>
          <option value="particles">Particles</option>
          <option value="geometric">Geometric</option>
          <option value="organic">Organic</option>
          <option value="fractal">Fractal</option>
          <option value="spiral">Spiral</option>
          <option value="maze">Maze</option>
          <option value="cellular">Cellular</option>
          <option value="voronoi">Voronoi</option>
          <option value="perlin">Perlin Noise</option>
          <option value="fire">Fire</option>
          <option value="smoke">Smoke</option>
          <option value="water">Water</option>
          <option value="galaxy">Galaxy</option>
          <option value="nebula">Nebula</option>
        </select>
      </div>
      
      {/* Animation de base */}
      <div className="generative-section">
        <h4><RotateCw size={14} /> Animation</h4>
        <div className="effect-controls">
          <div className="effect-control">
            <label>Speed</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={generativeSettings.speed}
              onChange={(e) => handleGenerativeChange('speed', parseFloat(e.target.value))}
            />
            <span>{generativeSettings.speed.toFixed(1)}</span>
          </div>
          
          <div className="effect-control">
            <label>Intensity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={generativeSettings.intensity}
              onChange={(e) => handleGenerativeChange('intensity', parseFloat(e.target.value))}
            />
            <span>{generativeSettings.intensity.toFixed(1)}</span>
          </div>
          
          <div className="effect-control">
            <label>Size</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={generativeSettings.size}
              onChange={(e) => handleGenerativeChange('size', parseFloat(e.target.value))}
            />
            <span>{generativeSettings.size.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      {/* Paramètres avancés */}
      <div className="generative-section">
        <h4><Settings size={14} /> Advanced Parameters</h4>
        <div className="effect-controls">
          <div className="effect-control">
            <label>Complexity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={generativeSettings.complexity}
              onChange={(e) => handleGenerativeChange('complexity', parseFloat(e.target.value))}
            />
            <span>{generativeSettings.complexity.toFixed(1)}</span>
          </div>
          
          <div className="effect-control">
            <label>Symmetry</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={generativeSettings.symmetry}
              onChange={(e) => handleGenerativeChange('symmetry', parseFloat(e.target.value))}
            />
            <span>{generativeSettings.symmetry.toFixed(1)}</span>
          </div>
          
          <div className="effect-control">
            <label>Flow</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={generativeSettings.flow}
              onChange={(e) => handleGenerativeChange('flow', parseFloat(e.target.value))}
            />
            <span>{generativeSettings.flow.toFixed(1)}</span>
          </div>
          
          <div className="effect-control">
            <label>Turbulence</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={generativeSettings.turbulence}
              onChange={(e) => handleGenerativeChange('turbulence', parseFloat(e.target.value))}
            />
            <span>{generativeSettings.turbulence.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      {/* Paramètres de particules */}
      <div className="generative-section">
        <h4><Droplets size={14} /> Particle System</h4>
        <div className="effect-controls">
          <div className="effect-control">
            <label>Particle Count</label>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={generativeSettings.particleCount}
              onChange={(e) => handleGenerativeChange('particleCount', parseInt(e.target.value))}
            />
            <span>{generativeSettings.particleCount}</span>
          </div>
          
          <div className="effect-control">
            <label>Particle Size</label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={generativeSettings.particleSize}
              onChange={(e) => handleGenerativeChange('particleSize', parseInt(e.target.value))}
            />
            <span>{generativeSettings.particleSize}</span>
          </div>
          
          <div className="effect-control">
            <label>Particle Speed</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={generativeSettings.particleSpeed}
              onChange={(e) => handleGenerativeChange('particleSpeed', parseFloat(e.target.value))}
            />
            <span>{generativeSettings.particleSpeed.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      {/* Paramètres de géométrie */}
      <div className="generative-section">
        <h4><Target size={14} /> Geometry</h4>
        <div className="effect-controls">
          <div className="effect-control">
            <label>Geometry Type</label>
            <select
              value={generativeSettings.geometryType}
              onChange={(e) => handleGenerativeChange('geometryType', e.target.value)}
              className="geometry-select"
            >
              <option value="triangles">Triangles</option>
              <option value="squares">Squares</option>
              <option value="circles">Circles</option>
              <option value="hexagons">Hexagons</option>
              <option value="stars">Stars</option>
              <option value="polygons">Polygons</option>
            </select>
          </div>
          
          <div className="effect-control">
            <label>Geometry Size</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={generativeSettings.geometrySize}
              onChange={(e) => handleGenerativeChange('geometrySize', parseFloat(e.target.value))}
            />
            <span>{generativeSettings.geometrySize.toFixed(1)}</span>
          </div>
          
          <div className="effect-control">
            <label>Geometry Rotation</label>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={generativeSettings.geometryRotation}
              onChange={(e) => handleGenerativeChange('geometryRotation', parseInt(e.target.value))}
            />
            <span>{generativeSettings.geometryRotation}°</span>
          </div>
        </div>
      </div>
      
      {/* Paramètres de fractales */}
      <div className="generative-section">
        <h4><Snowflake size={14} /> Fractals</h4>
        <div className="effect-controls">
          <div className="effect-control">
            <label>Fractal Depth</label>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={generativeSettings.fractalDepth}
              onChange={(e) => handleGenerativeChange('fractalDepth', parseInt(e.target.value))}
            />
            <span>{generativeSettings.fractalDepth}</span>
          </div>
          
          <div className="effect-control">
            <label>Fractal Scale</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={generativeSettings.fractalScale}
              onChange={(e) => handleGenerativeChange('fractalScale', parseFloat(e.target.value))}
            />
            <span>{generativeSettings.fractalScale.toFixed(1)}</span>
          </div>
          
          <div className="effect-control">
            <label>Fractal Rotation</label>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={generativeSettings.fractalRotation}
              onChange={(e) => handleGenerativeChange('fractalRotation', parseInt(e.target.value))}
            />
            <span>{generativeSettings.fractalRotation}°</span>
          </div>
        </div>
      </div>
      
      {/* Couleurs */}
      <div className="generative-section">
        <h4><Palette size={14} /> Color</h4>
        <div className="color-controls">
          <input
            type="color"
            value={generativeSettings.color}
            onChange={(e) => handleGenerativeChange('color', e.target.value)}
            className="color-picker"
          />
          <span className="color-value">{generativeSettings.color}</span>
        </div>
      </div>
    </div>
  )

  const renderTransitionsTab = () => (
    <div className="transitions-content">
      {/* Types de transitions */}
      <div className="transitions-section">
        <h4><Flame size={14} /> Transition Type</h4>
        <select
          value={transitionSettings.type}
          onChange={(e) => handleTransitionChange('type', e.target.value)}
          className="transition-select"
        >
          <option value="fade">Fade</option>
          <option value="slide">Slide</option>
          <option value="zoom">Zoom</option>
          <option value="rotate">Rotate</option>
          <option value="wipe">Wipe</option>
          <option value="dissolve">Dissolve</option>
          <option value="morph">Morph</option>
          <option value="wave">Wave</option>
          <option value="spiral">Spiral</option>
          <option value="explosion">Explosion</option>
          <option value="implosion">Implosion</option>
          <option value="pixelate">Pixelate</option>
          <option value="glitch">Glitch</option>
          <option value="matrix">Matrix</option>
        </select>
      </div>
      
      {/* Paramètres de transition */}
      <div className="transitions-section">
        <h4><Settings size={14} /> Transition Parameters</h4>
        <div className="effect-controls">
          <div className="effect-control">
            <label>Duration</label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={transitionSettings.duration}
              onChange={(e) => handleTransitionChange('duration', parseFloat(e.target.value))}
            />
            <span>{transitionSettings.duration.toFixed(1)}s</span>
          </div>
          
          <div className="effect-control">
            <label>Easing</label>
            <select
              value={transitionSettings.easing}
              onChange={(e) => handleTransitionChange('easing', e.target.value)}
              className="easing-select"
            >
              <option value="linear">Linear</option>
              <option value="ease-in">Ease In</option>
              <option value="ease-out">Ease Out</option>
              <option value="ease-in-out">Ease In Out</option>
              <option value="bounce">Bounce</option>
              <option value="elastic">Elastic</option>
              <option value="back">Back</option>
            </select>
          </div>
          
          <div className="effect-control">
            <label>Direction</label>
            <select
              value={transitionSettings.direction}
              onChange={(e) => handleTransitionChange('direction', e.target.value)}
              className="direction-select"
            >
              <option value="in">In</option>
              <option value="out">Out</option>
              <option value="in-out">In-Out</option>
            </select>
          </div>
          
          <div className="effect-control">
            <label>Trigger</label>
            <select
              value={transitionSettings.trigger}
              onChange={(e) => handleTransitionChange('trigger', e.target.value)}
              className="trigger-select"
            >
              <option value="manual">Manual</option>
              <option value="auto">Auto</option>
              <option value="audio">Audio Trigger</option>
              <option value="beat">Beat Sync</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Presets de transitions */}
      <div className="transitions-section">
        <h4><Star size={14} /> Transition Presets</h4>
        <div className="preset-buttons">
          {[
            { name: 'Smooth Fade', type: 'fade', duration: 1.5, easing: 'ease-in-out' },
            { name: 'Quick Cut', type: 'fade', duration: 0.1, easing: 'linear' },
            { name: 'Slide In', type: 'slide', duration: 1, easing: 'ease-out' },
            { name: 'Zoom Burst', type: 'zoom', duration: 0.8, easing: 'bounce' },
            { name: 'Glitch Switch', type: 'glitch', duration: 0.5, easing: 'linear' },
            { name: 'Matrix Rain', type: 'matrix', duration: 2, easing: 'ease-in' },
            { name: 'Wave Morph', type: 'wave', duration: 1.2, easing: 'ease-in-out' },
            { name: 'Explosion', type: 'explosion', duration: 1.5, easing: 'back' }
          ].map(preset => (
            <button
              key={preset.name}
              onClick={() => {
                setTransitionSettings({
                  type: preset.type,
                  duration: preset.duration,
                  easing: preset.easing,
                  direction: transitionSettings.direction,
                  trigger: transitionSettings.trigger
                })
              }}
              className="preset-btn"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="effects-panel">
      <div className="effects-header">
        <h3>Effects & Graphics</h3>
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'effects' ? 'active' : ''}`}
            onClick={() => setActiveTab('effects')}
          >
            <Sparkles size={14} />
            Effects
          </button>
          <button
            className={`tab-btn ${activeTab === 'generative' ? 'active' : ''}`}
            onClick={() => setActiveTab('generative')}
          >
            <Palette size={14} />
            Generative
          </button>
          <button
            className={`tab-btn ${activeTab === 'transitions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transitions')}
          >
            <Flame size={14} />
            Transitions
          </button>
        </div>
      </div>
      
      <div className="effects-body">
        {activeTab === 'effects' && renderEffectsTab()}
        {activeTab === 'generative' && renderGenerativeTab()}
        {activeTab === 'transitions' && renderTransitionsTab()}
      </div>
    </div>
  )
}

export default EffectsPanel

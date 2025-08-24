import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import p5 from 'p5'
import { motion } from 'framer-motion'
import './VideoMixer.css'

const VideoMixer = ({ layers, isPlaying, selectedLayer, onLayerUpdate }) => {
  const canvasRef = useRef(null)
  const videoRefs = useRef({})
  const threeSceneRef = useRef(null)
  const p5InstanceRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [outputMode, setOutputMode] = useState('preview') // preview, fullscreen, external
  const [isInitialized, setIsInitialized] = useState(false)
  const [canvasSize, setCanvasSize] = useState('medium') // small, medium, large, custom

  useEffect(() => {
    const initGraphics = () => {
      if (canvasRef.current) {
        // Clean up any existing instances first
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove()
          p5InstanceRef.current = null
        }
        if (threeSceneRef.current && threeSceneRef.current.renderer) {
          threeSceneRef.current.renderer.dispose()
          threeSceneRef.current = null
        }
        
        // Initialize new instances
        initializeThreeJS()
        initializeP5()
        setIsInitialized(true)
      }
    }
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(initGraphics, 100)
    
    return () => {
      clearTimeout(timer)
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove()
        p5InstanceRef.current = null
      }
      if (threeSceneRef.current && threeSceneRef.current.renderer) {
        threeSceneRef.current.renderer.dispose()
        threeSceneRef.current = null
      }
    }
  }, [canvasSize])

  // Nettoyer les URLs des vidéos quand le composant se démonte
  useEffect(() => {
    return () => {
      // Libérer la mémoire des URLs de vidéos
      Object.values(videoRefs.current).forEach(video => {
        if (video && video.src) {
          URL.revokeObjectURL(video.src)
        }
      })
    }
  }, [])

  // Synchroniser la lecture des vidéos avec l'état isPlaying
  useEffect(() => {
    Object.values(videoRefs.current).forEach(video => {
      if (video && video.readyState >= 2) { // HAVE_CURRENT_DATA
        if (isPlaying) {
          video.play().catch(e => {
            console.log('Video play error:', e)
            // Essayer de recharger la vidéo si elle ne peut pas être lue
            if (e.name === 'NotSupportedError') {
              video.load()
            }
          })
        } else {
          video.pause()
        }
      }
    })
  }, [isPlaying])

  const initializeThreeJS = () => {
    if (!canvasRef.current) return
    
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    canvasRef.current.appendChild(renderer.domElement)
    
    // Add some basic 3D elements
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    
    camera.position.z = 5
    
    threeSceneRef.current = { scene, camera, renderer, cube }
    
    const animate = () => {
      if (!threeSceneRef.current) return
      requestAnimationFrame(animate)
      if (isPlaying && threeSceneRef.current.cube) {
        threeSceneRef.current.cube.rotation.x += 0.01
        threeSceneRef.current.cube.rotation.y += 0.01
      }
      renderer.render(scene, camera)
    }
    animate()
  }

  const getCanvasDimensions = () => {
    switch (canvasSize) {
      case 'small':
        return { width: 320, height: 240 }
      case 'medium':
        return { width: 640, height: 480 }
      case 'large':
        return { width: 1280, height: 720 }
      case 'custom':
        return { width: 800, height: 600 }
      default:
        return { width: 640, height: 480 }
    }
  }

  const initializeP5 = () => {
    if (!canvasRef.current) return
    
    const dimensions = getCanvasDimensions()
    
    const sketch = (p) => {
      p.setup = () => {
        if (canvasRef.current) {
          const canvas = p.createCanvas(dimensions.width, dimensions.height)
          canvas.parent(canvasRef.current)
          p.colorMode(p.HSB, 360, 100, 100, 1)
        }
      }
      
      p.draw = () => {
        p.background(0, 0, 0, 0.1)
        
        if (isPlaying) {
          // Generate reactive graphics based on audio
          const time = p.millis() * 0.001
          const hue = (time * 50) % 360
          
          p.push()
          p.translate(p.width / 2, p.height / 2)
          p.rotate(time)
          
          for (let i = 0; i < 8; i++) {
            p.push()
            p.rotate((p.TWO_PI / 8) * i)
            p.translate(100, 0)
            p.fill(hue, 80, 80, 0.6)
            p.noStroke()
            p.ellipse(0, 0, 20 + Math.sin(time * 2 + i) * 10)
            p.pop()
          }
          p.pop()
        }
      }
      
      p.windowResized = () => {
        if (canvasRef.current && p.canvas) {
          const newDimensions = getCanvasDimensions()
          p.resizeCanvas(newDimensions.width, newDimensions.height)
        }
      }
    }
    
    p5InstanceRef.current = new p5(sketch)
  }

  const handleVideoUpload = (layerId, event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('video/')) {
      // Vérifier la taille du fichier (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        alert('Fichier trop volumineux. Taille maximum: 100MB')
        return
      }
      
      // Créer l'URL avec des options optimisées pour MP4
      const url = URL.createObjectURL(file, { type: file.type })
      
      console.log(`Uploading video: ${file.name}, size: ${(file.size / 1024 / 1024).toFixed(2)}MB, type: ${file.type}`)
      
      // Mettre à jour la couche avec l'URL de la vidéo
      onLayerUpdate(layerId, { 
        videoUrl: url,
        videoFile: file.name
      })
    } else {
      alert('Veuillez sélectionner un fichier vidéo valide (MP4, WebM, etc.)')
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      canvasRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const renderLayer = (layer) => {
    if (!layer.visible) return null
    
    return (
      <motion.div
        key={layer.id}
        className={`video-layer ${selectedLayer === layer.id ? 'selected' : ''}`}
        style={{
          opacity: layer.opacity,
          mixBlendMode: layer.blendMode,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        onClick={() => onLayerUpdate(layer.id, { selected: true })}
      >
        {layer.videoUrl && (
          <>
            <video
            ref={(el) => {
              if (el) {
                videoRefs.current[layer.id] = el
                // Synchroniser la lecture avec l'état global
                if (isPlaying) {
                  el.play().catch(e => console.log('Video play error:', e))
                } else {
                  el.pause()
                }
              }
            }}
            src={layer.videoUrl}
            autoPlay={isPlaying}
            loop
            muted
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              pointerEvents: 'none'
            }}
            onLoadedMetadata={(e) => {
              // Mettre à jour la durée du projet si nécessaire
              if (e.target.duration > 0) {
                console.log(`Video loaded: ${layer.videoFile}, duration: ${e.target.duration}s`)
              }
            }}
            onError={(e) => {
              console.error('Video error:', e.target.error)
            }}
            onCanPlay={(e) => {
              console.log(`Video can play: ${layer.videoFile}`)
            }}
          />
            {/* Indicateur de chargement */}
            <div 
              className="video-loading"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '12px',
                pointerEvents: 'none',
                opacity: 0.8
              }}
            >
              Chargement vidéo...
            </div>
          </>
        )}
      </motion.div>
    )
  }

  return (
    <div className="video-mixer">
      <div className="mixer-header">
        <div className="mixer-title">
          <h3>Video Mixer</h3>
          <span className="size-indicator">
            {getCanvasDimensions().width} × {getCanvasDimensions().height}
          </span>
        </div>
        <div className="mixer-controls">
          <select 
            value={canvasSize} 
            onChange={(e) => setCanvasSize(e.target.value)}
            className="size-select"
            title="Canvas Size"
          >
            <option value="small">Small (320x240)</option>
            <option value="medium">Medium (640x480)</option>
            <option value="large">Large (1280x720)</option>
            <option value="custom">Custom (800x600)</option>
          </select>
          <select 
            value={outputMode} 
            onChange={(e) => setOutputMode(e.target.value)}
            className="output-select"
          >
            <option value="preview">Preview</option>
            <option value="fullscreen">Fullscreen</option>
            <option value="external">External Output</option>
          </select>
          <button onClick={toggleFullscreen} className="fullscreen-btn">
            {isFullscreen ? 'Exit' : 'Fullscreen'}
          </button>
        </div>
      </div>
      
             <div className="mixer-canvas" ref={canvasRef}>
         {!isInitialized && (
           <div style={{
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             height: '100%',
             color: '#9ca3af',
             fontSize: '14px'
           }}>
             Initializing graphics...
           </div>
         )}
         {layers.map(renderLayer)}
         
         {/* Message d'aide pour les vidéos */}
         {layers.every(layer => !layer.videoUrl) && (
           <div style={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             transform: 'translate(-50%, -50%)',
             textAlign: 'center',
             color: '#9ca3af',
             fontSize: '14px',
             pointerEvents: 'none'
           }}>
             <div style={{ marginBottom: '8px' }}>🎥</div>
             <div>Cliquez sur l'icône vidéo dans la sidebar pour ajouter des vidéos</div>
           </div>
         )}
       </div>
      
      <div className="layer-controls">
        {layers.map(layer => (
          <div key={layer.id} className="layer-control">
            <label>
              <input
                type="checkbox"
                checked={layer.visible}
                onChange={(e) => onLayerUpdate(layer.id, { visible: e.target.checked })}
              />
              {layer.name}
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleVideoUpload(layer.id, e)}
              className="video-upload"
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={layer.opacity}
              onChange={(e) => onLayerUpdate(layer.id, { opacity: parseFloat(e.target.value) })}
              className="opacity-slider"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoMixer

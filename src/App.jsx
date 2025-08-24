import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VideoMixer from './components/VideoMixer'
import AudioController from './components/AudioController'
import EffectsPanel from './components/EffectsPanel'
import Timeline from './components/Timeline'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [selectedLayer, setSelectedLayer] = useState(0)
  const [layers, setLayers] = useState([
    { id: 0, name: 'Layer A', visible: true, opacity: 1, blendMode: 'normal', videoUrl: null, videoFile: null },
    { id: 1, name: 'Layer B', visible: true, opacity: 0.8, blendMode: 'multiply', videoUrl: null, videoFile: null },
    { id: 2, name: 'Layer C', visible: false, opacity: 0.6, blendMode: 'screen', videoUrl: null, videoFile: null }
  ])

  const [audioInputs, setAudioInputs] = useState([])
  const [midiDevices, setMidiDevices] = useState([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Initialize audio and MIDI devices
    initializeAudioDevices()
    initializeMidiDevices()
    
    // Add user interaction handler for audio context
    const handleUserInteraction = () => {
      document.body.classList.add('user-interacted')
      setIsReady(true)
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
    }
    
    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('keydown', handleUserInteraction)
    
    // Set ready after a short delay for initial load
    setTimeout(() => setIsReady(true), 1000)
    
    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
    }
  }, [])

  const initializeAudioDevices = async () => {
    try {
      // Check if we're in a secure context (required for mediaDevices)
      if (!window.isSecureContext) {
        console.warn('Media devices require a secure context (HTTPS or localhost)')
        return
      }
      
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const audioInputs = devices.filter(device => device.kind === 'audioinput')
        setAudioInputs(audioInputs)
      } else {
        console.warn('Media devices API not supported in this browser')
      }
    } catch (error) {
      console.error('Error accessing audio devices:', error)
      // Set empty array to prevent further errors
      setAudioInputs([])
    }
  }

  const initializeMidiDevices = async () => {
    if (navigator.requestMIDIAccess) {
      try {
        const midiAccess = await navigator.requestMIDIAccess()
        const devices = Array.from(midiAccess.inputs.values())
        setMidiDevices(devices)
      } catch (error) {
        console.error('Error accessing MIDI devices:', error)
      }
    }
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const updateLayer = (layerId, updates) => {
    if (typeof layerId === 'object') {
      // If layerId is actually a new layer object
      setLayers(prev => [...prev, layerId])
    } else {
      // If layerId is an ID and updates is an object
      setLayers(prev => prev.map(layer => 
        layer.id === layerId ? { ...layer, ...updates } : layer
      ))
    }
  }

    return (
    <div className="app">
      <TopBar 
        isPlaying={isPlaying}
        onPlayPause={togglePlayback}
        currentTime={currentTime}
        duration={duration}
        isReady={isReady}
      />
      
      <div className="main-content">
        <Sidebar 
          layers={layers}
          selectedLayer={selectedLayer}
          onLayerSelect={setSelectedLayer}
          onLayerUpdate={updateLayer}
          audioInputs={audioInputs}
          midiDevices={midiDevices}
        />
        
                 <div className="center-panel">
           <ErrorBoundary>
             <VideoMixer 
               layers={layers}
               isPlaying={isPlaying}
               selectedLayer={selectedLayer}
               onLayerUpdate={updateLayer}
             />
           </ErrorBoundary>
           
           <Timeline 
             currentTime={currentTime}
             duration={duration}
             onTimeUpdate={setCurrentTime}
             isPlaying={isPlaying}
           />
         </div>
        
        <div className="right-panel">
          <AudioController 
            audioInputs={audioInputs}
            midiDevices={midiDevices}
            isPlaying={isPlaying}
          />
          
          <EffectsPanel 
            selectedLayer={selectedLayer}
            layers={layers}
            onLayerUpdate={updateLayer}
          />
        </div>
      </div>
    </div>
  )
}

export default App

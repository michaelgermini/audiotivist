import React, { useState, useEffect, useRef } from 'react'
import * as Tone from 'tone'
import { motion } from 'framer-motion'
import { Volume2, Mic, Music, Settings, BarChart3 } from 'lucide-react'
import './AudioController.css'

const AudioController = ({ audioInputs, midiDevices, isPlaying }) => {
  const [audioLevels, setAudioLevels] = useState({ input: 0, output: 0 })
  const [frequencyData, setFrequencyData] = useState(new Array(64).fill(0))
  const [selectedInput, setSelectedInput] = useState('')
  const [selectedOutput, setSelectedOutput] = useState('')
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [midiNotes, setMidiNotes] = useState([])
  
  const analyserRef = useRef(null)
  const micRef = useRef(null)
  const audioContextRef = useRef(null)

  useEffect(() => {
    initializeAudio()
    initializeMidi()
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const initializeAudio = async () => {
    try {
      // Only initialize if user has interacted with the page
      if (document.body.classList.contains('user-interacted')) {
        await Tone.start()
        audioContextRef.current = Tone.context
        
        // Create audio analyser
        analyserRef.current = new Tone.Analyser({
          type: 'fft',
          size: 64
        })
        
        // Create microphone input
        micRef.current = new Tone.UserMedia()
        
        // Connect microphone to analyser
        micRef.current.connect(analyserRef.current)
        
        // Start audio analysis
        startAudioAnalysis()
      }
    } catch (error) {
      console.error('Error initializing audio:', error)
    }
  }

  const initializeMidi = () => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then((midiAccess) => {
        midiAccess.inputs.forEach((input) => {
          input.onmidimessage = handleMidiMessage
        })
      })
    }
  }

  const handleMidiMessage = (event) => {
    const [status, note, velocity] = event.data
    
    if (status === 144 && velocity > 0) { // Note on
      setMidiNotes(prev => [...prev, { note, velocity, timestamp: Date.now() }])
    } else if (status === 128 || (status === 144 && velocity === 0)) { // Note off
      setMidiNotes(prev => prev.filter(n => n.note !== note))
    }
  }

  const startAudioAnalysis = () => {
    const updateLevels = () => {
      if (analyserRef.current) {
        const data = analyserRef.current.getValue()
        setFrequencyData(data)
        
        // Calculate overall levels
        const inputLevel = data.reduce((sum, val) => sum + Math.abs(val), 0) / data.length
        setAudioLevels(prev => ({
          ...prev,
          input: inputLevel
        }))
      }
      requestAnimationFrame(updateLevels)
    }
    updateLevels()
  }

  const toggleAudioInput = async () => {
    if (!isAudioEnabled) {
      try {
        // Mark user interaction for audio context
        document.body.classList.add('user-interacted')
        
        // Initialize audio if not already done
        if (!audioContextRef.current) {
          await initializeAudio()
        }
        
        if (micRef.current) {
          await micRef.current.open()
          setIsAudioEnabled(true)
        }
      } catch (error) {
        console.error('Error opening microphone:', error)
      }
    } else {
      if (micRef.current) {
        micRef.current.close()
        setIsAudioEnabled(false)
      }
    }
  }

  const createOscillator = (frequency, type = 'sine') => {
    const osc = new Tone.Oscillator(frequency, type)
    const gain = new Tone.Gain(0.1)
    osc.connect(gain)
    gain.toDestination()
    osc.start()
    
    // Stop after 1 second
    setTimeout(() => {
      osc.stop()
      osc.dispose()
      gain.dispose()
    }, 1000)
  }

  const handleMidiNote = (note) => {
    const frequency = Tone.Frequency(note, 'midi').toFrequency()
    createOscillator(frequency)
  }

  const renderFrequencyVisualizer = () => {
    return (
      <div className="frequency-visualizer">
        {frequencyData.map((value, index) => (
          <motion.div
            key={index}
            className="frequency-bar"
            style={{
              height: `${Math.abs(value) * 100}%`,
              backgroundColor: `hsl(${index * 5}, 70%, 60%)`
            }}
            animate={{
              height: `${Math.abs(value) * 100}%`
            }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>
    )
  }

  const renderMidiNotes = () => {
    return (
      <div className="midi-notes">
        {midiNotes.map((note, index) => (
          <motion.div
            key={`${note.note}-${note.timestamp}`}
            className="midi-note"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => handleMidiNote(note.note)}
          >
            {Tone.Frequency(note.note, 'midi').toNote()}
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="audio-controller">
      <div className="audio-header">
        <h3>Audio Controller</h3>
        <button 
          onClick={toggleAudioInput}
          className={`audio-toggle ${isAudioEnabled ? 'active' : ''}`}
        >
          <Mic size={16} />
        </button>
      </div>
      
      <div className="audio-content">
        <div className="audio-section">
          <h4>Input Devices</h4>
          <select 
            value={selectedInput}
            onChange={(e) => setSelectedInput(e.target.value)}
            className="device-select"
          >
            <option value="">Select Input</option>
            {audioInputs.map(device => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Input ${device.deviceId.slice(0, 8)}`}
              </option>
            ))}
          </select>
        </div>
        
        <div className="audio-section">
          <h4>MIDI Devices</h4>
          <div className="midi-devices">
            {midiDevices.map(device => (
              <div key={device.id} className="midi-device">
                <span>{device.name}</span>
                <span className="midi-status connected">Connected</span>
              </div>
            ))}
            {midiDevices.length === 0 && (
              <span className="no-devices">No MIDI devices found</span>
            )}
          </div>
        </div>
        
        <div className="audio-section">
          <h4>Audio Levels</h4>
          <div className="level-meters">
            <div className="level-meter">
              <span>Input</span>
              <div className="meter-bar">
                <motion.div 
                  className="meter-fill"
                  style={{ width: `${audioLevels.input * 100}%` }}
                  animate={{ width: `${audioLevels.input * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
            <div className="level-meter">
              <span>Output</span>
              <div className="meter-bar">
                <motion.div 
                  className="meter-fill"
                  style={{ width: `${audioLevels.output * 100}%` }}
                  animate={{ width: `${audioLevels.output * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="audio-section">
          <h4>Frequency Analysis</h4>
          {renderFrequencyVisualizer()}
        </div>
        
        <div className="audio-section">
          <h4>Active MIDI Notes</h4>
          {renderMidiNotes()}
        </div>
      </div>
    </div>
  )
}

export default AudioController

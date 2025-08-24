import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Square, Save, Settings, Monitor, Volume2 } from 'lucide-react'
import './TopBar.css'

const TopBar = ({ isPlaying, onPlayPause, currentTime, duration, isReady }) => {
  const [showSettings, setShowSettings] = useState(false)
  const [projectName, setProjectName] = useState('Audiotivist Session')

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSave = () => {
    // Save project logic would be implemented here
    console.log('Saving project...')
  }

  const handleExport = () => {
    // Export logic would be implemented here
    console.log('Exporting project...')
  }

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div className="logo">
          <span className="logo-text">Audiotivist</span>
          <span className="logo-version">v1.0.0</span>
        </div>
        
        <div className="project-info">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="project-name-input"
          />
          <span className="project-status">● Live</span>
        </div>
      </div>
      
      <div className="top-bar-center">
        <div className="transport-controls">
          <button className="transport-btn" onClick={() => onPlayPause()}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button className="transport-btn">
            <Square size={16} />
          </button>
        </div>
        
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span className="time-separator">/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="top-bar-right">
        <div className="status-indicators">
          <div className="status-item">
            <Monitor size={14} />
            <span>1920x1080</span>
          </div>
          <div className="status-item">
            <Volume2 size={14} />
            <span>Audio Active</span>
          </div>
          <div className={`status-item ${isReady ? 'ready' : 'loading'}`}>
            <span>{isReady ? 'Ready' : 'Loading...'}</span>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="action-btn" onClick={handleSave}>
            <Save size={14} />
            Save
          </button>
          <button className="action-btn" onClick={handleExport}>
            Export
          </button>
          <button 
            className="action-btn"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={14} />
          </button>
        </div>
      </div>
      
      {showSettings && (
        <motion.div
          className="settings-panel"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="settings-content">
            <h4>Settings</h4>
            <div className="setting-group">
              <label>Output Resolution</label>
              <select defaultValue="1920x1080">
                <option value="1920x1080">1920x1080</option>
                <option value="1280x720">1280x720</option>
                <option value="3840x2160">3840x2160</option>
              </select>
            </div>
            <div className="setting-group">
              <label>Frame Rate</label>
              <select defaultValue="30">
                <option value="24">24 fps</option>
                <option value="30">30 fps</option>
                <option value="60">60 fps</option>
              </select>
            </div>
            <div className="setting-group">
              <label>Audio Buffer Size</label>
              <select defaultValue="512">
                <option value="256">256</option>
                <option value="512">512</option>
                <option value="1024">1024</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default TopBar

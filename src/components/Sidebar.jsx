import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Folder, Plus, Trash2, Eye, EyeOff, Settings, Video } from 'lucide-react'
import './Sidebar.css'

const Sidebar = ({ layers, selectedLayer, onLayerSelect, onLayerUpdate, audioInputs, midiDevices }) => {
  const [activeTab, setActiveTab] = useState('layers')
  const [showLayerSettings, setShowLayerSettings] = useState(null)

  const addLayer = () => {
    const newLayer = {
      id: Date.now(),
      name: `Layer ${layers.length + 1}`,
      visible: true,
      opacity: 1,
      blendMode: 'normal',
      effects: {}
    }
    onLayerUpdate(newLayer.id, newLayer)
  }

  const deleteLayer = (layerId) => {
    // Remove layer logic would be implemented here
    console.log('Delete layer:', layerId)
  }

  const toggleLayerVisibility = (layerId) => {
    const layer = layers.find(l => l.id === layerId)
    if (layer) {
      onLayerUpdate(layerId, { visible: !layer.visible })
    }
  }

  const renderLayersTab = () => (
    <div className="layers-content">
      <div className="layers-header">
        <h4>Video Layers</h4>
        <button onClick={addLayer} className="add-layer-btn">
          <Plus size={14} />
        </button>
      </div>
      
      <div className="layers-list">
        <AnimatePresence>
          {layers.map((layer, index) => (
            <motion.div
              key={layer.id}
              className={`layer-item ${selectedLayer === layer.id ? 'selected' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => onLayerSelect(layer.id)}
            >
              <div className="layer-info">
                <div className="layer-visibility">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLayerVisibility(layer.id)
                    }}
                    className="visibility-btn"
                  >
                    {layer.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                </div>
                
                <div className="layer-details">
                  <span className="layer-name">{layer.name}</span>
                  <span className="layer-type">
                    {layer.videoFile ? `Video: ${layer.videoFile}` : 'Empty Layer'}
                  </span>
                </div>
                
                <div className="layer-actions">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      e.stopPropagation()
                      const file = e.target.files[0]
                      if (file) {
                        const url = URL.createObjectURL(file)
                        onLayerUpdate(layer.id, { 
                          videoUrl: url,
                          videoFile: file.name
                        })
                      }
                    }}
                    style={{ display: 'none' }}
                    id={`video-upload-${layer.id}`}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      document.getElementById(`video-upload-${layer.id}`).click()
                    }}
                    className="upload-video-btn"
                    title="Upload Video"
                  >
                    <Video size={12} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowLayerSettings(showLayerSettings === layer.id ? null : layer.id)
                    }}
                    className="layer-settings-btn"
                  >
                    <Settings size={12} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteLayer(layer.id)
                    }}
                    className="delete-layer-btn"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              
              {showLayerSettings === layer.id && (
                <motion.div
                  className="layer-settings"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="setting-group">
                    <label>Opacity</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={layer.opacity}
                      onChange={(e) => onLayerUpdate(layer.id, { opacity: parseFloat(e.target.value) })}
                    />
                    <span>{layer.opacity}</span>
                  </div>
                  
                  <div className="setting-group">
                    <label>Blend Mode</label>
                    <select
                      value={layer.blendMode}
                      onChange={(e) => onLayerUpdate(layer.id, { blendMode: e.target.value })}
                    >
                      <option value="normal">Normal</option>
                      <option value="multiply">Multiply</option>
                      <option value="screen">Screen</option>
                      <option value="overlay">Overlay</option>
                      <option value="difference">Difference</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )

  const renderProjectTab = () => (
    <div className="project-content">
      <div className="project-section">
        <h4>Project Info</h4>
        <div className="project-info">
          <div className="info-item">
            <span className="info-label">Name:</span>
            <span className="info-value">Audiotivist Session</span>
          </div>
          <div className="info-item">
            <span className="info-label">Resolution:</span>
            <span className="info-value">1920x1080</span>
          </div>
          <div className="info-item">
            <span className="info-label">FPS:</span>
            <span className="info-value">30</span>
          </div>
          <div className="info-item">
            <span className="info-label">Duration:</span>
            <span className="info-value">00:05:30</span>
          </div>
        </div>
      </div>
      
      <div className="project-section">
        <h4>Audio Devices</h4>
        <div className="device-list">
          {audioInputs.map(device => (
            <div key={device.deviceId} className="device-item">
              <span className="device-name">{device.label || `Input ${device.deviceId.slice(0, 8)}`}</span>
              <span className="device-status connected">Connected</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="project-section">
        <h4>MIDI Devices</h4>
        <div className="device-list">
          {midiDevices.map(device => (
            <div key={device.id} className="device-item">
              <span className="device-name">{device.name}</span>
              <span className="device-status connected">Connected</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'layers' ? 'active' : ''}`}
            onClick={() => setActiveTab('layers')}
          >
            <Layers size={14} />
            Layers
          </button>
          <button
            className={`tab-btn ${activeTab === 'project' ? 'active' : ''}`}
            onClick={() => setActiveTab('project')}
          >
            <Folder size={14} />
            Project
          </button>
        </div>
      </div>
      
      <div className="sidebar-content">
        {activeTab === 'layers' ? renderLayersTab() : renderProjectTab()}
      </div>
    </div>
  )
}

export default Sidebar

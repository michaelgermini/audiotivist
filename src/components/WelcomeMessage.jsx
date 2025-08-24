import React from 'react'
import { motion } from 'framer-motion'
import { Play, Mic, Video, Palette } from 'lucide-react'
import './WelcomeMessage.css'

const WelcomeMessage = ({ isReady }) => {
  if (!isReady) return null

  return (
    <motion.div
      className="welcome-message"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="welcome-content">
        <h3>Welcome to Audiotivist</h3>
        <p>Your audio-visual production suite is ready!</p>
        
        <div className="quick-start">
          <h4>Quick Start:</h4>
          <div className="start-items">
            <div className="start-item">
              <Play size={16} />
              <span>Click play to start the timeline</span>
            </div>
            <div className="start-item">
              <Mic size={16} />
              <span>Enable audio input for reactive visuals</span>
            </div>
            <div className="start-item">
              <Video size={16} />
              <span>Upload videos to layers</span>
            </div>
            <div className="start-item">
              <Palette size={16} />
              <span>Apply effects and generative graphics</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WelcomeMessage

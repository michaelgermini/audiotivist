import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Clock } from 'lucide-react'
import './Timeline.css'

const Timeline = ({ currentTime, duration, onTimeUpdate, isPlaying }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [scrubTime, setScrubTime] = useState(currentTime)
  const timelineRef = useRef(null)

  useEffect(() => {
    if (!isDragging) {
      setScrubTime(currentTime)
    }
  }, [currentTime, isDragging])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const handleTimelineClick = (e) => {
    if (!timelineRef.current) return
    
    const rect = timelineRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration
    
    onTimeUpdate(newTime)
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    handleTimelineClick(e)
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleTimelineClick(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        onTimeUpdate(Math.max(0, currentTime - 1))
        break
      case 'ArrowRight':
        e.preventDefault()
        onTimeUpdate(Math.min(duration, currentTime + 1))
        break
      case ' ':
        e.preventDefault()
        // Toggle play/pause handled by parent
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [currentTime, duration])

  const progress = duration > 0 ? (scrubTime / duration) * 100 : 0

  return (
    <div className="timeline">
      <div className="timeline-header">
        <div className="time-display">
          <Clock size={14} />
          <span>{formatTime(scrubTime)} / {formatTime(duration)}</span>
        </div>
        
        <div className="timeline-controls">
          <button className="control-btn" onClick={() => onTimeUpdate(Math.max(0, currentTime - 5))}>
            <SkipBack size={16} />
          </button>
          <button className="control-btn" onClick={() => onTimeUpdate(0)}>
            <SkipBack size={16} />
          </button>
          <button className="control-btn" onClick={() => onTimeUpdate(Math.min(duration, currentTime + 5))}>
            <SkipForward size={16} />
          </button>
        </div>
      </div>
      
      <div className="timeline-track">
        <div 
          ref={timelineRef}
          className="timeline-progress"
          onMouseDown={handleMouseDown}
        >
          <motion.div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
          
          <motion.div 
            className="playhead"
            style={{ left: `${progress}%` }}
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
          
          <div className="timeline-markers">
            {/* Add markers for keyframes or cues */}
            <div className="marker" style={{ left: '25%' }} />
            <div className="marker" style={{ left: '50%' }} />
            <div className="marker" style={{ left: '75%' }} />
          </div>
        </div>
      </div>
      
      <div className="timeline-footer">
        <div className="timeline-info">
          <span className="info-label">FPS:</span>
          <span className="info-value">30</span>
          <span className="info-label">Resolution:</span>
          <span className="info-value">1920x1080</span>
        </div>
        
        <div className="timeline-actions">
          <button className="action-btn">Add Marker</button>
          <button className="action-btn">Export</button>
        </div>
      </div>
    </div>
  )
}

export default Timeline

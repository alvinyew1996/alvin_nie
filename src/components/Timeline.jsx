import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, ChevronRight } from 'lucide-react'

const Timeline = ({ memories, onMemorySelect, selectedMemory }) => {
  const sortedMemories = [...memories].sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <motion.div 
      className="timeline"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="timeline-title">时间线</h2>
      
      <div className="timeline-container">
        {sortedMemories.map((memory, index) => (
          <motion.div
            key={memory.id}
            className={`timeline-item ${selectedMemory?.id === memory.id ? 'active' : ''}`}
            onClick={() => onMemorySelect(memory)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="memory-header">
                <h3 className="memory-title">{memory.title}</h3>
                <ChevronRight className="chevron" />
              </div>
              
              <div className="memory-meta">
                <div className="meta-item">
                  <Clock className="meta-icon" />
                  <span>{new Date(memory.date).toLocaleDateString('zh-CN')}</span>
                </div>
                {memory.location && (
                  <div className="meta-item">
                    <MapPin className="meta-icon" />
                    <span>{memory.location}</span>
                  </div>
                )}
              </div>
              
              <p className="memory-description">{memory.description}</p>
              
              <div className="memory-tags">
                {memory.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Timeline
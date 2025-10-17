import React from 'react'
import { motion } from 'framer-motion'
import { X, Calendar, MapPin, Heart, Tag } from 'lucide-react'

const MemoryDetail = ({ memory, onClose }) => {
  if (!memory) return null

  return (
    <motion.div 
      className="memory-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="memory-detail"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          <X />
        </button>

        <div className="memory-header">
          <h2 className="memory-title">{memory.title}</h2>
          <div className="memory-meta">
            <div className="meta-item">
              <Calendar className="meta-icon" />
              <span>{new Date(memory.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              })}</span>
            </div>
            {memory.location && (
              <div className="meta-item">
                <MapPin className="meta-icon" />
                <span>{memory.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="memory-content">
          <div className="memory-description">
            <p>{memory.description}</p>
          </div>

          {memory.tags && memory.tags.length > 0 && (
            <div className="memory-tags">
              <Tag className="tags-icon" />
              <div className="tags-list">
                {memory.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {memory.photos && memory.photos.length > 0 && (
            <div className="memory-photos">
              <h3>相关照片</h3>
              <div className="photos-grid">
                {memory.photos.map(photo => (
                  <div key={photo.id} className="photo-item">
                    <img 
                      src={photo.url} 
                      alt={photo.caption || memory.title}
                      className="photo-image"
                    />
                    {photo.caption && (
                      <p className="photo-caption">{photo.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {memory.story && (
            <div className="memory-story">
              <h3>详细故事</h3>
              <p>{memory.story}</p>
            </div>
          )}
        </div>

        <div className="memory-footer">
          <div className="memory-stats">
            <div className="stat">
              <Heart className="stat-icon" />
              <span>特别回忆</span>
            </div>
            <div className="stat">
              <span>{memory.photos?.length || 0} 张照片</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default MemoryDetail
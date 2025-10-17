import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'

const PhotoGallery = ({ memories, onMemorySelect, selectedMemory }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const allPhotos = memories.flatMap(memory => 
    memory.photos.map(photo => ({ ...photo, memoryId: memory.id, memoryTitle: memory.title }))
  )

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allPhotos.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length)
  }

  const handlePhotoClick = (photo) => {
    const memory = memories.find(m => m.id === photo.memoryId)
    onMemorySelect(memory)
  }

  if (allPhotos.length === 0) {
    return (
      <div className="gallery-empty">
        <div className="empty-content">
          <h3>暂无照片</h3>
          <p>选择其他年份查看回忆照片</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="photo-gallery"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="gallery-header">
        <h2 className="gallery-title">照片集</h2>
        <span className="photo-count">{allPhotos.length} 张照片</span>
      </div>

      <div className="gallery-grid">
        {allPhotos.map((photo, index) => (
          <motion.div
            key={`${photo.memoryId}-${photo.id}`}
            className="photo-item"
            onClick={() => handlePhotoClick(photo)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="photo-container">
              <img 
                src={photo.url} 
                alt={photo.caption || photo.memoryTitle}
                className="photo-image"
              />
              <div className="photo-overlay">
                <Maximize2 className="expand-icon" />
                <div className="photo-info">
                  <h4>{photo.memoryTitle}</h4>
                  {photo.caption && <p>{photo.caption}</p>}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 全屏查看器 */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            className="fullscreen-viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
          >
            <div className="viewer-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="close-btn"
                onClick={() => setIsFullscreen(false)}
              >
                <X />
              </button>
              
              <button 
                className="nav-btn prev-btn"
                onClick={prevImage}
              >
                <ChevronLeft />
              </button>
              
              <button 
                className="nav-btn next-btn"
                onClick={nextImage}
              >
                <ChevronRight />
              </button>
              
              <img 
                src={allPhotos[currentImageIndex]?.url}
                alt={allPhotos[currentImageIndex]?.caption}
                className="fullscreen-image"
              />
              
              <div className="image-info">
                <h3>{allPhotos[currentImageIndex]?.memoryTitle}</h3>
                <p>{allPhotos[currentImageIndex]?.caption}</p>
                <span className="image-counter">
                  {currentImageIndex + 1} / {allPhotos.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default PhotoGallery
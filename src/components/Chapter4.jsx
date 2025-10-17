import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react'
import { getVideoUrl } from '../config/mediaConfig'

const Chapter4 = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [canFlip, setCanFlip] = useState(false)
  const [showSpecialEffect, setShowSpecialEffect] = useState(false)

  const pages = [
    {
      id: 1,
      title: "那些笑容",
      subtitle: "纯粹的快乐，最难忘。",
      type: "special_photo",
      image: "/images/chapter4/special-smile.jpg",
      text: "那时候我看到了你的眼神，满眼都是期待和开心，眼里只有我，而我也一样，那一天的那个瞬间其实我也迷恋了你。"
    },
    {
      id: 2,
      type: "special_video",
      video: "/videos/chapter4/special-moment.mp4",
      videoKey: "chapter4/special-smile",
      text: "那一刻，我只想让时间停在这里。"
    }
  ]

  useEffect(() => {
    // 播放背景音乐
    if (window.audioManager) {
      window.audioManager.playAudio('chapter4')
    }

    const delay = getPageDelay(currentPage)
    const timer = setTimeout(() => {
      setCanFlip(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [currentPage])

  const getPageDelay = (pageIndex) => {
    const page = pages[pageIndex]
    if (!page) return 3000

    switch (page.type) {
      case 'special_photo':
        return 8000
      case 'special_video':
        return 10000
      default:
        return 3000
    }
  }

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
      setCanFlip(false)
      setShowSpecialEffect(false)
    } else {
      onComplete()
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      setCanFlip(false)
      setShowSpecialEffect(false)
    }
  }

  const currentPageData = pages[currentPage]

  const renderPageContent = () => {
    switch (currentPageData.type) {
      case 'special_photo':
        return (
          <motion.div 
            className="special-photo-container"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            onAnimationComplete={() => {
              setShowSpecialEffect(true)
            }}
          >
            <div className="photo-placeholder special-photo">
              <img src={currentPageData.image} alt="特殊笑容" />
              
              {/* 特殊特效 */}
              <AnimatePresence>
                {showSpecialEffect && (
                  <motion.div 
                    className="special-effects"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* 心形粒子效果 */}
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="heart-particle"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          y: [0, -50, -100]
                        }}
                        transition={{
                          duration: 2,
                          delay: Math.random() * 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      >
                        <Heart size={16} color="#FF69B4" />
                      </motion.div>
                    ))}

                    {/* 星光效果 */}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <motion.div
                        key={`sparkle-${i}`}
                        className="sparkle-particle"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 1.5,
                          delay: Math.random() * 1.5,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >
                        <Sparkles size={12} color="#FFD700" />
                      </motion.div>
                    ))}

                    {/* 光晕效果 */}
                    <motion.div 
                      className="photo-glow"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 0.6 }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )
      case 'special_video':
        return (
          <motion.div 
            className="special-video-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="video-wrapper">
              <video 
                src={getVideoUrl(currentPageData.videoKey) || currentPageData.video}
                autoPlay
                muted={false}
                loop={false}
                className="special-video"
                onPlay={() => {
                  // 暂停背景音乐
                  if (window.audioManager) {
                    window.audioManager.pauseAudio()
                  }
                }}
                onEnded={() => {
                  // 恢复背景音乐
                  if (window.audioManager) {
                    window.audioManager.resumeAudio()
                  }
                  setCanFlip(true)
                }}
                onError={(e) => {
                  console.warn('视频加载失败，使用备用源:', e.target.src);
                  if (currentPageData.video) {
                    e.target.src = currentPageData.video;
                  }
                }}
              />
              
              {/* 浪漫特效 */}
              <motion.div 
                className="romantic-effects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* 泡泡效果 */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={`bubble-${i}`}
                    className="bubble"
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: '0%'
                    }}
                    initial={{ opacity: 0, scale: 0, y: 0 }}
                    animate={{ 
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                      y: [0, -200, -400]
                    }}
                    transition={{
                      duration: 3,
                      delay: Math.random() * 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                ))}

                {/* 花瓣效果 */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={`petal-${i}`}
                    className="petal"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: '0%'
                    }}
                    initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      x: [0, Math.random() * 100 - 50],
                      y: [0, 300],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 4,
                      delay: Math.random() * 2,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    🌸
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div 
      className="chapter4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="book-page">
        {/* 页面标题 */}
        {currentPage === 0 && (
          <motion.div 
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>{currentPageData.title}</h1>
            <p className="subtitle">{currentPageData.subtitle}</p>
          </motion.div>
        )}

        {/* 页面内容 */}
        <div className="page-content">
          {renderPageContent()}
        </div>

        {/* 页面文字 */}
        <AnimatePresence>
          {currentPageData.text && (
            <motion.div 
              className="page-text special-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <p>{currentPageData.text}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 翻页控制 */}
        <div className="page-controls">
          <button 
            className="page-btn prev-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="page-indicator">
            {pages.map((_, index) => (
              <div 
                key={index}
                className={`dot ${index === currentPage ? 'active' : ''}`}
              />
            ))}
          </div>

          <button 
            className="page-btn next-btn"
            onClick={handleNextPage}
            disabled={!canFlip}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* 翻页提示 */}
        <AnimatePresence>
          {canFlip && (
            <motion.div 
              className="flip-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Chapter4
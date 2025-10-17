import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Chapter1 = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [canFlip, setCanFlip] = useState(false)
  const [showText, setShowText] = useState(false)

  const pages = [
    {
      id: 1,
      title: "初遇",
      subtitle: "那天的我们之间的相遇，故事的开始。",
      image: "/images/chapter1/coffee-shop.jpg",
      text: "那天我怀着忐忑的心进入了自己不熟悉的领域和工作地点，但我却在那天遇见了你，在这里的一切是我和你的开始。",
      delay: 8000
    },
    {
      id: 2,
      image: "/images/chapter1/beach-date.jpg",
      text: "这是第一次单独约我出来去海边，愿意分享你的心事给我，那晚我心跳加速了"
    },
    {
      id: 3,
      image: "/images/chapter1/shoulder-touch.jpg",
      text: "在最初遇见的三四月里，你主动的把手搭到我肩膀上了，让我很是高兴又苦恼，高兴的是你愿意靠近我了，苦恼的是我不知道该不该亲近你还是保持距离 😊"
    },
    {
      id: 4,
      image: "/images/chapter1/early-days.jpg"
    }
  ]

  useEffect(() => {
    // 播放背景音乐
    if (window.audioManager) {
      window.audioManager.playAudio('chapter1')
    }

    const delay = currentPage === 0 ? 8000 : 3000
    const timer = setTimeout(() => {
      setCanFlip(true)
    }, delay)

    // 第一页文字延迟显示
    if (currentPage === 0) {
      const textTimer = setTimeout(() => {
        setShowText(true)
      }, 2000)
      return () => {
        clearTimeout(timer)
        clearTimeout(textTimer)
      }
    }

    return () => clearTimeout(timer)
  }, [currentPage])

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
      setCanFlip(false)
      setShowText(false)
    } else {
      onComplete()
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      setCanFlip(false)
      setShowText(false)
    }
  }

  const currentPageData = pages[currentPage]

  return (
    <motion.div 
      className="chapter1"
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

        {/* 照片区域 */}
        <motion.div 
          className="photo-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="photo-placeholder">
            <img 
              src={currentPageData.image} 
              alt={`第${currentPage + 1}张照片`}
              className="chapter-photo"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="photo-overlay">
              <div className="loading-text">照片加载中...</div>
            </div>
            {/* 照片淡入效果 */}
            <motion.div 
              className="photo-fade-in"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* 文字内容 */}
        <AnimatePresence>
          {currentPageData.text && showText && (
            <motion.div 
              className="page-text"
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

export default Chapter1
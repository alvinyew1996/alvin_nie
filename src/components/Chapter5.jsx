import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, Gift, Mic } from 'lucide-react'

const Chapter5 = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [canFlip, setCanFlip] = useState(false)

  const pages = [
    {
      id: 1,
      title: "我想对你说",
      subtitle: "那段话，只想让你听见一次。",
      type: "individual_photos",
      images: ["/images/chapter5/individual-1.jpg", "/images/chapter5/individual-2.jpg", "/images/chapter5/individual-3.jpg", "/images/chapter5/individual-4.jpg", "/images/chapter5/individual-5.jpg", "/images/chapter5/individual-6.jpg", "/images/chapter5/individual-7.jpg", "/images/chapter5/individual-8.jpg", "/images/chapter5/individual-9.jpg"]
    },
    {
      id: 2,
      type: "gift_photos",
      images: ["/images/chapter5/gift-1.jpg", "/images/chapter5/gift-2.jpg", "/images/chapter5/gift-3.jpg", "/images/chapter5/gift-4.jpg", "/images/chapter5/gift-5.jpg", "/images/chapter5/gift-6.jpg", "/images/chapter5/gift-7.jpg", "/images/chapter5/gift-8.jpg", "/images/chapter5/gift-9.jpg", "/images/chapter5/gift-10.jpg", "/images/chapter5/gift-11.jpg"],
      text: "我送给她的礼物"
    },
    {
      id: 3,
      type: "voice_message",
      text: "其实我做这个网页，不是为了让你难过。只是想让我们都记得那些开心的时光，真的做着情侣都做的事情。"
    },
    {
      id: 4,
      type: "final_message",
      text: "谢谢你陪我走过的日子，无论未来我们在世界的哪个角落，希望你一直笑得像陪伴我时最开心的时候一样灿烂。"
    }
  ]

  useEffect(() => {
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
      case 'individual_photos':
        return 5000
      case 'gift_photos':
        return 8000
      case 'voice_message':
        return 10000
      case 'final_message':
        return 5000
      default:
        return 3000
    }
  }

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
      setCanFlip(false)
    } else {
      onComplete()
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      setCanFlip(false)
    }
  }

  const currentPageData = pages[currentPage]

  const renderPageContent = () => {
    switch (currentPageData.type) {
      case 'individual_photos':
        return (
          <motion.div 
            className="individual-photos-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="photo-sequence">
              {currentPageData.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="sequence-photo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <div className="photo-placeholder">
                    <img src={image} alt={`照片 ${index + 1}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      case 'gift_photos':
        return (
          <motion.div 
            className="gift-photos-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="gift-photos-grid">
              {currentPageData.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="gift-photo-item"
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <div className="photo-placeholder">
                    <img src={image} alt={`礼物 ${index + 1}`} />
                    <Gift className="gift-icon" />
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.p 
              className="gift-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {currentPageData.text}
            </motion.p>
          </motion.div>
        )
      case 'voice_message':
        return (
          <motion.div 
            className="voice-message-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="voice-player">
              <div className="voice-icon">
                <Mic size={60} color="#8B4513" />
              </div>
              
              <motion.div 
                className="voice-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p>{currentPageData.text}</p>
              </motion.div>
            </div>
          </motion.div>
        )
      case 'final_message':
        return (
          <motion.div 
            className="final-message-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="final-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Heart className="heart-icon" />
              <p>{currentPageData.text}</p>
            </motion.div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div 
      className="chapter5"
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

export default Chapter5
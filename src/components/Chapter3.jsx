import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Plane } from 'lucide-react'
import { getVideoUrl } from '../config/mediaConfig'

const Chapter3 = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [canFlip, setCanFlip] = useState(false)
  const [isHorizontalMode, setIsHorizontalMode] = useState(false)

  const pages = [
    {
      id: 1,
      title: "旅行",
      subtitle: "我们走过的地方，每个都值得。",
      type: "intro"
    },
    {
      id: 2,
      type: "single_image",
      image: "/images/chapter3/beach-toilet.jpg",
      text: "每次陪她疯，在她喝酒喝醉时我都很着急，担心她有危险。"
    },
    {
      id: 3,
      type: "video",
      video: "/videos/chapter3/happy-daily.mp4",
      videoKey: "chapter3/jb-birthday",
      text: "这是我们最快乐的日常，我都会陪伴她，也许我很多东西都不会，但是我真心想要在她身边一直对她好，照顾她"
    },
    {
      id: 4,
      type: "dual_images",
      images: ["/images/chapter3/home-clothes-1.jpg", "/images/chapter3/home-clothes-2.jpg"],
      text: "来到新加坡以后第一次回家乡还是想到了你，也是第一次帮你和你爸爸买了衣裤。"
    },
    {
      id: 5,
      type: "single_image",
      image: "/images/chapter3/watch-basketball.jpg",
      text: "借用你的手表去打球了嘻嘻，也很感谢你偶尔会去球场看我打球甚至是比赛，我都会非常高兴。"
    },
    {
      id: 6,
      type: "gift_series",
      images: ["/images/chapter3/gift-1.jpg", "/images/chapter3/gift-2.jpg", "/images/chapter3/gift-3.jpg", "/images/chapter3/gift-4.jpg"],
      text: "就算是陪家人一起过节，我偷偷的为了你排了一个小时多的队就只为了可以买到你说你很喜欢的系列。"
    },
    {
      id: 7,
      type: "sunrise",
      images: ["/images/chapter3/sunrise-1.jpg", "/images/chapter3/sunrise-2.jpg", "/images/chapter3/sunrise-3.jpg"],
      text: "我们一起看过最美的日出"
    },
    {
      id: 8,
      type: "ending",
      text: "那时我们以为，只要一直走下去，就能到达幸福的远方。"
    }
  ]

  useEffect(() => {
    // 播放背景音乐
    if (window.audioManager) {
      window.audioManager.playAudio('chapter3')
    }

    const delay = getPageDelay(currentPage)
    const timer = setTimeout(() => {
      setCanFlip(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [currentPage])

  useEffect(() => {
    // 第三章启用横向模式
    if (currentPage > 0) {
      setIsHorizontalMode(true)
    } else {
      setIsHorizontalMode(false)
    }
  }, [currentPage])

  const getPageDelay = (pageIndex) => {
    const page = pages[pageIndex]
    if (!page) return 3000

    switch (page.type) {
      case 'video':
        return 8000
      case 'gift_series':
      case 'sunrise':
        return 6000
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
      case 'intro':
        return (
          <motion.div 
            className="intro-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="travel-icon">
              <Plane size={60} color="#8B4513" />
            </div>
          </motion.div>
        )
      case 'single_image':
        return (
          <motion.div 
            className="single-photo-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="photo-placeholder">
              <img src={currentPageData.image} alt="旅行照片" />
              <div className="photo-glow"></div>
            </div>
          </motion.div>
        )
      case 'video':
        return (
          <motion.div 
            className="video-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <video 
              src={getVideoUrl(currentPageData.videoKey) || currentPageData.video}
              autoPlay
              muted
              loop
              className="chapter-video"
              onEnded={() => setCanFlip(true)}
              onError={(e) => {
                console.warn('视频加载失败，使用备用源:', e.target.src);
                if (currentPageData.video) {
                  e.target.src = currentPageData.video;
                }
              }}
            />
            <div className="video-overlay">
              <MapPin className="video-icon" />
            </div>
          </motion.div>
        )
      case 'dual_images':
        return (
          <motion.div 
            className="dual-images-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="dual-images-grid">
              {currentPageData.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="dual-image-item"
                  initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="photo-placeholder">
                    <img src={image} alt={`旅行照片 ${index + 1}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      case 'gift_series':
        return (
          <motion.div 
            className="gift-series-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="gift-series-grid">
              {currentPageData.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="gift-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="photo-placeholder">
                    <img src={image} alt={`礼物 ${index + 1}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      case 'sunrise':
        return (
          <motion.div 
            className="sunrise-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="sunrise-grid">
              {currentPageData.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="sunrise-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                >
                  <div className="photo-placeholder">
                    <img src={image} alt={`日出照片 ${index + 1}`} />
                    <div className="sunrise-glow"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      case 'ending':
        return (
          <motion.div 
            className="ending-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.p 
              className="ending-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {currentPageData.text}
            </motion.p>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div 
      className={`chapter3 ${isHorizontalMode ? 'horizontal-mode' : ''}`}
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

export default Chapter3
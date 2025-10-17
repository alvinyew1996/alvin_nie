import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Plane, Camera, Gift } from 'lucide-react'

const Chapter3 = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [canFlip, setCanFlip] = useState(false)
  const [isHorizontalMode, setIsHorizontalMode] = useState(false)
  const scrollContainerRef = useRef(null)

  const pages = [
    // 第1组：海边厕所
    {
      id: 1,
      title: "旅行",
      subtitle: "我们走过的地方，每个都值得。",
      type: "single_image",
      image: "/images/chapter3/beach-toilet.jpg",
      text: "每次陪她疯，在她喝酒喝醉时我都很着急，担心她有危险。"
    },
    // 第2组：快乐日常视频
    {
      id: 2,
      type: "video",
      video: "/videos/chapter3/happy-daily.mp4",
      text: "这是我们最快乐的日常，我都会陪伴她，也许我很多东西都不会，但是我真心想要在她身边一直对她好，照顾她"
    },
    // 第3组：机场游玩视频
    {
      id: 3,
      type: "video",
      video: "/videos/chapter3/airport-play.mp4",
      text: "我们一起去机场玩了，好开心。"
    },
    // 第4组：回家乡买衣服
    {
      id: 4,
      type: "dual_images",
      images: ["/images/chapter3/home-clothes-1.jpg", "/images/chapter3/home-clothes-2.jpg"],
      text: "来到新加坡以后第一次回家乡还是想到了你，也是第一次帮你和你爸爸买了衣裤。"
    },
    // 第5组：借手表打球
    {
      id: 5,
      type: "single_image",
      image: "/images/chapter3/watch-basketball.jpg",
      text: "借用你的手表去打球了嘻嘻，也很感谢你偶尔会去球场看我打球甚至是比赛，我都会非常高兴。"
    },
    // 第6组：送礼物视频
    {
      id: 6,
      type: "video",
      video: "/videos/chapter3/gift-giving.mp4",
      text: "这是真正意义上这一次送你的礼物 😰"
    },
    // 第7组：买喜欢的东西 - 2个页面
    {
      id: 7,
      type: "gift_series",
      images: Array.from({ length: 3 }, (_, i) => `/images/chapter3/gift-series-${i + 1}.jpg`),
      text: "为了买到你喜欢的我不甘心买了好几个。"
    },
    {
      id: 8,
      type: "gift_series",
      images: Array.from({ length: 4 }, (_, i) => `/images/chapter3/gift-series-${i + 4}.jpg`),
      text: "看到感觉是你喜欢的东西我就会买给你",
      summary: "就算是陪家人一起过节，我偷偷的为了你排了一个小时多的队就只为了可以买到你说你很喜欢的系列。"
    },
    // 第8组：制作礼物
    {
      id: 9,
      type: "gift_making",
      images: Array.from({ length: 4 }, (_, i) => `/images/chapter3/gift-making-${i + 1}.jpg`),
      text: "就算跟朋友出去也想着你，为了你很认真的制作礼物，甚至没太多跟朋友聊天，真的就一直在想怎么做到最好的给你"
    },
    // 第9组：JB游玩庆祝生日
    {
      id: 10,
      type: "video_with_audio",
      video: "/videos/chapter3/jb-birthday.mp4",
      text: "去JB游玩还有一起庆祝生日最开心了"
    },
    // 第10组：逗猫视频
    {
      id: 11,
      type: "video_with_audio",
      video: "/videos/chapter3/cat-playing.mp4",
      text: "在jb时其实很想带她去逗猫可是时间不够"
    },
    // 第11组：海鲜餐厅
    {
      id: 12,
      type: "single_image",
      image: "/images/chapter3/seafood-restaurant.jpg",
      text: "很好吃的海鲜餐厅，明白你的用心良苦，是你找到的餐厅，虽然那时候很累了，但是却很幸福"
    },
    // 第12组：海底捞 - 3个页面
    {
      id: 13,
      type: "single_image",
      image: "/images/chapter3/haidilao-photo.jpg",
      text: "不会拍照的我还有一个因为我所以很爱拍照的女朋友一起吃了海底捞"
    },
    {
      id: 14,
      type: "video_with_audio",
      video: "/videos/chapter3/haidilao-video1.mp4",
      text: "不会拍照的我还有一个因为我所以很爱拍照的女朋友一起吃了海底捞"
    },
    {
      id: 15,
      type: "video_with_audio",
      video: "/videos/chapter3/haidilao-video2.mp4",
      text: "不会拍照的我还有一个因为我所以很爱拍照的女朋友一起吃了海底捞"
    },
    // 第13组：日出 - 3个页面
    {
      id: 16,
      type: "single_image",
      image: "/images/chapter3/forest-walk.jpg",
      text: "这里我们在看日出之前走过的森林，当时候小Frennie还害怕的样子真的很可爱"
    },
    {
      id: 17,
      type: "sunrise_photos",
      images: Array.from({ length: 3 }, (_, i) => `/images/chapter3/sunrise-${i + 1}.jpg`),
      text: "等待日出时一起拍的照片"
    },
    {
      id: 18,
      type: "video_with_audio",
      video: "/videos/chapter3/sunrise-video.mp4",
      text: "我们一起看过最美的日出"
    },
    // 结尾页面
    {
      id: 19,
      type: "ending",
      text: "那时我们以为，只要一直走下去，就能到达幸福的远方。"
    }
  ]

  useEffect(() => {
    // 播放第三章背景音乐
    if (window.audioManager) {
      window.audioManager.playAudio('chapter3')
    }

    // 第三章使用奏折式横向滑动
    if (currentPage >= 0) {
      setIsHorizontalMode(true)
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
      case 'video':
      case 'video_with_audio':
        return 8000
      case 'gift_series':
        return 6000
      case 'sunrise_photos':
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
      // 章节结束
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
      case 'single_image':
        return renderSingleImage()
      case 'video':
        return renderVideo(false)
      case 'video_with_audio':
        return renderVideo(true)
      case 'dual_images':
        return renderDualImages()
      case 'gift_series':
        return renderGiftSeries()
      case 'gift_making':
        return renderGiftMaking()
      case 'sunrise_photos':
        return renderSunrisePhotos()
      case 'ending':
        return renderEnding()
      default:
        return null
    }
  }

  const renderSingleImage = () => (
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

  const renderVideo = (withAudio = false) => (
    <motion.div 
      className="video-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <video 
        src={currentPageData.video}
        autoPlay
        muted={!withAudio}
        loop
        className="chapter-video"
        onEnded={() => setCanFlip(true)}
      />
      {!withAudio && (
        <div className="video-overlay">
          <Camera className="video-icon" />
        </div>
      )}
    </motion.div>
  )

  const renderDualImages = () => (
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

  const renderGiftSeries = () => (
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
              <Gift className="gift-icon" />
            </div>
          </motion.div>
        ))}
      </div>
      {currentPageData.summary && (
        <motion.p 
          className="summary-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {currentPageData.summary}
        </motion.p>
      )}
    </motion.div>
  )

  const renderGiftMaking = () => (
    <motion.div 
      className="gift-making-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="gift-making-grid">
        {currentPageData.images.map((image, index) => (
          <motion.div
            key={index}
            className="gift-making-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="photo-placeholder">
              <img src={image} alt={`制作礼物 ${index + 1}`} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

  const renderSunrisePhotos = () => (
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

  const renderEnding = () => (
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
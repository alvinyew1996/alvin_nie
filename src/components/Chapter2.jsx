import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'

const Chapter2 = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [canFlip, setCanFlip] = useState(false)

  const pages = [
    {
      id: 1,
      title: "相处的日子",
      subtitle: "那些简单的小事，其实最幸福。",
      description: "其实最幸福的时光，是我们一起无所事事的时候，每时每刻都为你解决事情的时候，在分开以前从来没有食言，只对你一个人好。",
      type: "intro"
    },
    // 第一组：住过的地方 - 4页
    {
      id: 2,
      type: "living_places_1",
      images: ["/images/chapter2/living-1.jpg", "/images/chapter2/living-2.jpg", "/images/chapter2/living-3.jpg", "/images/chapter2/living-4.jpg", "/images/chapter2/living-5.jpg"],
      text: "我们在一起住过的地方的日子里",
      specialNote: "在这里开始有了想和你一起住的幻想"
    },
    {
      id: 3,
      type: "living_places_2", 
      images: ["/images/chapter2/living-6.jpg", "/images/chapter2/living-7.jpg", "/images/chapter2/living-8.jpg", "/images/chapter2/living-9.jpg", "/images/chapter2/living-10.jpg"],
      text: "我们在一起住过的地方的日子里"
    },
    {
      id: 4,
      type: "living_places_3",
      images: ["/images/chapter2/living-11.jpg", "/images/chapter2/living-12.jpg", "/images/chapter2/living-13.jpg", "/images/chapter2/living-14.jpg", "/images/chapter2/living-15.jpg"],
      text: "我们在一起住过的地方的日子里"
    },
    {
      id: 5,
      type: "living_places_4",
      images: ["/images/chapter2/living-16.jpg", "/images/chapter2/living-17.jpg", "/images/chapter2/living-18.jpg", "/images/chapter2/living-19.jpg", "/images/chapter2/living-20.jpg"],
      text: "我们在一起住过的地方的日子里"
    },
    // 第二组：Lok Lok店 - 1页
    {
      id: 6,
      type: "single_image",
      image: "/images/chapter2/lok-lok.jpg",
      text: "你最爱吃的Lok Lok店"
    },
    // 第三组：工作照片 - 4页
    {
      id: 7,
      type: "work_photos_1",
      images: ["/images/chapter2/work-1.jpg", "/images/chapter2/work-2.jpg", "/images/chapter2/work-3.jpg", "/images/chapter2/work-4.jpg"],
      text: "因为喜欢看你工作其实很常去你的店看你"
    },
    {
      id: 8,
      type: "work_photos_2",
      images: ["/images/chapter2/work-5.jpg", "/images/chapter2/work-6.jpg", "/images/chapter2/work-7.jpg", "/images/chapter2/work-8.jpg"],
      text: "总是陪着你吃宵夜哪怕是半夜12点，我也一样出门陪着你吃好吃的酿豆腐"
    },
    {
      id: 9,
      type: "work_photos_3",
      images: ["/images/chapter2/work-9.jpg", "/images/chapter2/work-10.jpg", "/images/chapter2/work-11.jpg", "/images/chapter2/work-12.jpg"],
      text: "每次打包mcd都可以打包一大堆食物，然后回家等你回来我们开开心心的一起吃"
    },
    {
      id: 10,
      type: "work_photos_4",
      images: ["/images/chapter2/work-13.jpg", "/images/chapter2/work-14.jpg", "/images/chapter2/work-15.jpg"],
      text: "喜欢陪你吃东西也喜欢待在你身边看着你吃，真的一次都不想跟你错过"
    },
    // 第四组：Bedok遗漏东西 - 1页
    {
      id: 11,
      type: "bedok_things",
      images: ["/images/chapter2/bedok-1.jpg", "/images/chapter2/bedok-2.jpg"],
      text: "在bedok，你总会遗漏东西在我的房间里"
    },
    // 第五组：心疼照片 - 1页
    {
      id: 12,
      type: "heartbreaking",
      images: ["/images/chapter2/heartbreak-1.jpg", "/images/chapter2/heartbreak-2.jpg", "/images/chapter2/heartbreak-3.jpg"],
      text: "总是发给我一些让我非常心疼你的照片"
    },
    // 第六组：咬痕 - 1页
    {
      id: 13,
      type: "bite_mark",
      image: "/images/chapter2/bite-mark.jpg",
      text: "被咬得可疼了，但是又很喜欢她咬我。",
      subtitle: "我喜欢的人咬我的痕迹"
    },
    // 第七组：偷拍 - 1页
    {
      id: 14,
      type: "sneaky_photo",
      image: "/images/chapter2/sneaky-photo.jpg",
      text: "我第一次鼓起勇气偷拍了你"
    },
    // 第八组：搞怪照片 - 1页
    {
      id: 15,
      type: "funny_photos",
      images: ["/images/chapter2/funny-1.jpg", "/images/chapter2/funny-2.jpg"],
      text: "总会发给你我搞怪的照片"
    },
    // 第九组：担心迷路 - 1页
    {
      id: 16,
      type: "worry_lost",
      image: "/images/chapter2/worry-lost.jpg",
      text: "无论什么时候都担心你迷路，哪怕自己在工作"
    },
    // 第十组：床单 - 1页
    {
      id: 17,
      type: "bed_sheets",
      images: ["/images/chapter2/bed-1.jpg", "/images/chapter2/bed-2.jpg", "/images/chapter2/bed-3.jpg"],
      text: "为了生活多样化一些，特地在那里一直挑选一个小时多的床单，摊主都怀疑我要偷床单呢哈哈"
    },
    // 第十一组：饮料 - 1页
    {
      id: 18,
      type: "drinks",
      images: ["/images/chapter2/drink-1.jpg", "/images/chapter2/drink-2.jpg", "/images/chapter2/drink-3.jpg"],
      text: "总会预备饮料给你喝，就怕你懒惰出门又想喝饮料"
    },
    // 第十二组：礼篮 - 1页
    {
      id: 19,
      type: "gift_basket",
      image: "/images/chapter2/gift-basket.jpg",
      text: "拿到礼篮第一个就是想跟你一起分享"
    },
    // 第十三组：食物 - 2页
    {
      id: 20,
      type: "food_gifts_1",
      images: ["/images/chapter2/food-1.jpg", "/images/chapter2/food-2.jpg", "/images/chapter2/food-3.jpg"],
      text: "为了买到好吃的tart给你吃，我排了一个小时多的队结果cheese tart卖完了，只能买tiramisu tart，其实觉得很伤心，但看到你工作回来时，给你吃的那时候你说已经很满足了，我又觉得很高兴一切都值得的"
    },
    {
      id: 21,
      type: "food_gifts_2",
      images: ["/images/chapter2/food-4.jpg", "/images/chapter2/food-5.jpg"],
      text: "看到很多人买abang balik就忍不住想排队买给你吃，只不过没有干的（因为你喜欢吃），只有湿的。只要是你喜欢的食物或者是好吃的，无论是在哪里，需要花多少时间我都愿意帮你弄来吃，只为了让你尝一口，包括月饼也是，很多时候都会花上半天时间，就等你放工回来吃。"
    },
    // 第十四组：酒 - 1页
    {
      id: 22,
      type: "wine",
      image: "/images/chapter2/wine.jpg",
      text: "谢谢你最后送我的酒，我在海边喝了它"
    },
    // 第十五组：陪伴 - 1页
    {
      id: 23,
      type: "companionship",
      images: ["/images/chapter2/companion-1.jpg", "/images/chapter2/companion-2.jpg", "/images/chapter2/companion-3.jpg"],
      text: "很感谢这两年半来一直都有你的陪伴"
    },
    // 第十六组：聊天记录 - 1页
    {
      id: 24,
      type: "chat_records",
      images: ["/images/chapter2/chat-1.jpg", "/images/chapter2/chat-2.jpg", "/images/chapter2/chat-3.jpg", "/images/chapter2/chat-4.jpg", "/images/chapter2/chat-5.jpg", "/images/chapter2/chat-6.jpg", "/images/chapter2/chat-7.jpg"],
      text: "其实我真的有努力跟你聊天噢，这两年来很明显有了很大的改变，一切其实都是为了你，而且不管你在机场还是KOB我都有问你几点到家，到家了一定要通知我，要吃宵夜也不要客气一定要跟我说。"
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
      case 'living_places':
      case 'work_photos':
      case 'chat_records':
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
            <p className="description">{currentPageData.description}</p>
          </motion.div>
        )
      case 'living_places':
        return (
          <motion.div 
            className="photo-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {currentPageData.images.map((image, index) => (
              <motion.div
                key={index}
                className="grid-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="photo-placeholder">
                  <img src={image} alt={`住过的地方 ${index + 1}`} />
                  {index === 0 && currentPageData.specialNote && (
                    <motion.div 
                      className="special-note"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      <Heart className="heart-icon" />
                      <span>{currentPageData.specialNote}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
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
              <img src={currentPageData.image} alt="单张照片" />
            </div>
          </motion.div>
        )
      case 'work_photos':
        return (
          <motion.div 
            className="work-photos-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="work-photos-grid">
              {currentPageData.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="work-photo-item"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="photo-placeholder">
                    <img src={image} alt={`工作照片 ${index + 1}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      case 'heartbreaking':
        return (
          <motion.div 
            className="heartbreaking-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="heartbreaking-photos">
              {currentPageData.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="heartbreaking-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                >
                  <div className="photo-placeholder">
                    <img src={image} alt={`心疼照片 ${index + 1}`} />
                    <div className="heartbreaking-overlay">
                      <Heart className="broken-heart" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      case 'funny_photos':
        return (
          <motion.div 
            className="funny-photos-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="funny-photos-grid">
              {currentPageData.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="funny-photo-item"
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <div className="photo-placeholder">
                    <img src={image} alt={`搞怪照片 ${index + 1}`} />
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
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      case 'chat_records':
        return (
          <motion.div 
            className="chat-records-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="chat-grid">
              {currentPageData.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="chat-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="photo-placeholder">
                    <img src={image} alt={`聊天记录 ${index + 1}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div 
      className="chapter2"
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
              {currentPageData.subtitle && (
                <p className="subtitle-text">{currentPageData.subtitle}</p>
              )}
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

export default Chapter2
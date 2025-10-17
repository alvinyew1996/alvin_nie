import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, Home, Utensils, Camera, Gift } from 'lucide-react'

const Chapter2 = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [canFlip, setCanFlip] = useState(false)
  const [showSpecialEffect, setShowSpecialEffect] = useState(false)

  const pages = [
    // 第1组：住过的地方 - 4个页面
    {
      id: 1,
      title: "相处的日子",
      subtitle: "那些简单的小事，其实最幸福。",
      description: "其实最幸福的时光，是我们一起无所事事的时候，每时每刻都为你解决事情的时候，在分开以前从来没有食言，只对你一个人好。",
      type: "living_places",
      images: Array.from({ length: 5 }, (_, i) => `/images/chapter2/living-${i + 1}.jpg`),
      text: "我们在一起住过的地方的日子里"
    },
    {
      id: 2,
      type: "living_places",
      images: Array.from({ length: 5 }, (_, i) => `/images/chapter2/living-${i + 6}.jpg`),
      text: "我们在一起住过的地方的日子里"
    },
    {
      id: 3,
      type: "living_places",
      images: Array.from({ length: 5 }, (_, i) => `/images/chapter2/living-${i + 11}.jpg`),
      text: "我们在一起住过的地方的日子里"
    },
    {
      id: 4,
      type: "living_places",
      images: Array.from({ length: 5 }, (_, i) => `/images/chapter2/living-${i + 16}.jpg`),
      text: "我们在一起住过的地方的日子里",
      specialNote: "在这里开始有了想和你一起住的幻想"
    },
    // 第2组：Lok Lok店
    {
      id: 5,
      type: "single_image",
      image: "/images/chapter2/lok-lok.jpg",
      text: "你最爱吃的Lok Lok店"
    },
    // 第3组：工作相关 - 4个页面
    {
      id: 6,
      type: "work_photos",
      images: Array.from({ length: 4 }, (_, i) => `/images/chapter2/work-${i + 1}.jpg`),
      text: "因为喜欢看你工作其实很常去你的店看你"
    },
    {
      id: 7,
      type: "work_photos",
      images: Array.from({ length: 4 }, (_, i) => `/images/chapter2/work-${i + 5}.jpg`),
      texts: [
        "总是陪着你吃宵夜哪怕是半夜12点，我也一样出门陪着你吃好吃的酿豆腐",
        "每次都会主动跟你提打包宵夜，经常等你回来陪你吃",
        "每次打包mcd都可以打包一大堆食物，然后回家等你回来我们开开心心的一起吃",
        "每次打包mcd都可以打包一大堆食物，然后回家等你回来我们开开心心的一起吃"
      ]
    },
    {
      id: 8,
      type: "work_photos",
      images: Array.from({ length: 4 }, (_, i) => `/images/chapter2/work-${i + 9}.jpg`),
      texts: [
        "我为你找的韩国餐就是想跟你一起吃",
        "我为你找的韩国餐就是想跟你一起吃",
        "每次你也喜欢跟我一次吃多多的炒煮的食物，我知道都是你请客，我其实很愧疚噢",
        "每次你也喜欢跟我一次吃多多的炒煮的食物，我知道都是你请客，我其实很愧疚噢"
      ]
    },
    {
      id: 9,
      type: "work_photos",
      images: Array.from({ length: 4 }, (_, i) => `/images/chapter2/work-${i + 13}.jpg`),
      texts: [
        "谢谢你让我吃那么好吃的蛋糕",
        "好吃的日本餐",
        "以前在bedok还经常买水果当饭后甜点",
        "以前在bedok还经常买水果当饭后甜点"
      ],
      summary: "喜欢陪你吃东西也喜欢待在你身边看着你吃，真的一次都不想跟你错过"
    },
    // 第4组：Bedok遗漏东西
    {
      id: 10,
      type: "bedok_items",
      images: ["/images/chapter2/bedok-1.jpg", "/images/chapter2/bedok-2.jpg"],
      text: "在bedok，你总会遗漏东西在我的房间里"
    },
    // 第5组：心疼的照片
    {
      id: 11,
      type: "heartbreaking_photos",
      images: Array.from({ length: 3 }, (_, i) => `/images/chapter2/heartbreak-${i + 1}.jpg`),
      text: "总是发给我一些让我非常心疼你的照片"
    },
    // 第6组：咬痕
    {
      id: 12,
      type: "bite_mark",
      image: "/images/chapter2/bite-mark.jpg",
      text: "被咬得可疼了，但是又很喜欢她咬我。",
      subtitle: "我喜欢的人咬我的痕迹"
    },
    // 第7组：偷拍
    {
      id: 13,
      type: "sneaky_photo",
      image: "/images/chapter2/sneaky-photo.jpg",
      text: "我第一次鼓起勇气偷拍了你"
    },
    // 第8组：搞怪照片
    {
      id: 14,
      type: "funny_photos",
      images: ["/images/chapter2/funny-1.jpg", "/images/chapter2/funny-2.jpg"],
      text: "总会发给你我搞怪的照片"
    },
    // 第9组：担心迷路
    {
      id: 15,
      type: "worry_photo",
      image: "/images/chapter2/worry.jpg",
      text: "无论什么时候都担心你迷路，哪怕自己在工作"
    },
    // 第10组：床单挑选
    {
      id: 16,
      type: "bedsheet_photos",
      images: Array.from({ length: 3 }, (_, i) => `/images/chapter2/bedsheet-${i + 1}.jpg`),
      text: "为了生活多样化一些，特地在那里一直挑选一个小时多的床单，摊主都怀疑我要偷床单呢哈哈"
    },
    // 第11组：预备饮料
    {
      id: 17,
      type: "drinks_photos",
      images: Array.from({ length: 3 }, (_, i) => `/images/chapter2/drinks-${i + 1}.jpg`),
      text: "总会预备饮料给你喝，就怕你懒惰出门又想喝饮料"
    },
    // 第12组：礼篮分享
    {
      id: 18,
      type: "gift_basket",
      image: "/images/chapter2/gift-basket.jpg",
      text: "拿到礼篮第一个就是想跟你一起分享"
    },
    // 第13组：食物排队
    {
      id: 19,
      type: "food_queue",
      images: Array.from({ length: 3 }, (_, i) => `/images/chapter2/food-queue-${i + 1}.jpg`),
      texts: [
        "为了买到好吃的tart给你吃，我排了一个小时多的队结果cheese tart卖完了，只能买tiramisu tar，其实觉得很伤心，但看到你工作回来时，给你吃的那时候你说已经很满足了，我又觉得很高兴一切都值得的",
        "看到很多人买abang balik就忍不住想排队买给你吃，只不过没有干的（因为你喜欢吃），只有湿的",
        "看到很多人买abang balik就忍不住想排队买给你吃，只不过没有干的（因为你喜欢吃），只有湿的"
      ],
      summary: "只要是你喜欢的食物或者是好吃的，无论是在哪里，需要花多少时间我都愿意帮你弄来吃，只为了让你尝一口，包括月饼也是，很多时候都会花上半天时间，就等你放工回来吃。"
    },
    // 第14组：最后的酒
    {
      id: 20,
      type: "last_wine",
      image: "/images/chapter2/last-wine.jpg",
      text: "谢谢你最后送我的酒，我在海边喝了它"
    },
    // 第15组：感谢陪伴
    {
      id: 21,
      type: "gratitude_photos",
      images: Array.from({ length: 3 }, (_, i) => `/images/chapter2/gratitude-${i + 1}.jpg`),
      text: "很感谢这两年半来一直都有你的陪伴"
    },
    // 第16组：聊天记录
    {
      id: 22,
      type: "chat_records",
      images: Array.from({ length: 21 }, (_, i) => `/images/chapter2/chat-${i + 1}.jpg`),
      text: "其实我真的有努力跟你聊天噢，这两年来很明显有了很大的改变，一切其实都是为了你，而且不管你在机场还是KOB我都有问你几点到家，到家了一定要通知我，要吃宵夜也不要客气一定要跟我说。"
    }
  ]

  useEffect(() => {
    // 播放第二章背景音乐
    if (window.audioManager) {
      window.audioManager.playAudio('chapter2')
    }

    // 根据页面类型设置不同的延迟
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
        return 5000
      case 'work_photos':
        return 6000
      case 'chat_records':
        return 8000
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
      // 章节结束
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
      case 'living_places':
        return renderLivingPlaces()
      case 'single_image':
        return renderSingleImage()
      case 'work_photos':
        return renderWorkPhotos()
      case 'bedok_items':
        return renderBedokItems()
      case 'heartbreaking_photos':
        return renderHeartbreakingPhotos()
      case 'bite_mark':
        return renderBiteMark()
      case 'sneaky_photo':
        return renderSneakyPhoto()
      case 'funny_photos':
        return renderFunnyPhotos()
      case 'worry_photo':
        return renderWorryPhoto()
      case 'bedsheet_photos':
        return renderBedsheetPhotos()
      case 'drinks_photos':
        return renderDrinksPhotos()
      case 'gift_basket':
        return renderGiftBasket()
      case 'food_queue':
        return renderFoodQueue()
      case 'last_wine':
        return renderLastWine()
      case 'gratitude_photos':
        return renderGratitudePhotos()
      case 'chat_records':
        return renderChatRecords()
      default:
        return null
    }
  }

  const renderLivingPlaces = () => (
    <motion.div 
      className="photo-grid"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
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

  const renderSingleImage = () => (
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

  const renderWorkPhotos = () => (
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
            {currentPageData.texts && currentPageData.texts[index] && (
              <p className="photo-caption">{currentPageData.texts[index]}</p>
            )}
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

  const renderHeartbreakingPhotos = () => (
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
            whileHover={{ scale: 1.05 }}
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

  const renderChatRecords = () => (
    <motion.div 
      className="chat-records-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="chat-grid">
        {currentPageData.images.slice(0, 7).map((image, index) => (
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

  // 其他渲染函数的简化版本
  const renderBedokItems = () => renderSingleImage()
  const renderBiteMark = () => renderSingleImage()
  const renderSneakyPhoto = () => renderSingleImage()
  const renderWorryPhoto = () => renderSingleImage()
  const renderGiftBasket = () => renderSingleImage()
  const renderLastWine = () => renderSingleImage()
  const renderFunnyPhotos = () => renderWorkPhotos()
  const renderBedsheetPhotos = () => renderWorkPhotos()
  const renderDrinksPhotos = () => renderWorkPhotos()
  const renderFoodQueue = () => renderWorkPhotos()
  const renderGratitudePhotos = () => renderWorkPhotos()

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
            <p className="description">{currentPageData.description}</p>
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

export default Chapter2
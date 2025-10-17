import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Moon, Heart } from 'lucide-react'

const CoverPage = ({ onComplete, isSecondVisit }) => {
  const [showTitle, setShowTitle] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [showSecondVisitText, setShowSecondVisitText] = useState(false)
  const [canFlip, setCanFlip] = useState(false)

  useEffect(() => {
    // 15秒后可以翻页
    const timer = setTimeout(() => {
      setCanFlip(true)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // 标题动画序列
    const titleTimer = setTimeout(() => setShowTitle(true), 1000)
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 2000)
    const imageTimer = setTimeout(() => setImage(true), 3000)
    const secondVisitTimer = setTimeout(() => setShowSecondVisitText(true), 4000)

    return () => {
      clearTimeout(titleTimer)
      clearTimeout(subtitleTimer)
      clearTimeout(imageTimer)
      clearTimeout(secondVisitTimer)
    }
  }, [])

  return (
    <motion.div 
      className="cover-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 星空背景 */}
      <div className="stars-background">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <Star size={12} />
          </motion.div>
        ))}
      </div>

      {/* 月亮 */}
      <motion.div 
        className="moon"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <Moon size={80} color="#FFD700" />
        <div className="moon-glow"></div>
      </motion.div>

      {/* 破旧书本 */}
      <motion.div 
        className="old-book"
        initial={{ scale: 0.8, rotateY: -30, opacity: 0 }}
        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <div className="book-cover">
          <div className="book-spine"></div>
          <div className="book-pages">
            {/* 标题 */}
            <AnimatePresence>
              {showTitle && (
                <motion.h1 
                  className="main-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  我们之间的故事
                </motion.h1>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showSubtitle && (
                <motion.p 
                  className="subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  ——献给那个曾经让我笑、让我成长的人。
                </motion.p>
              )}
            </AnimatePresence>

            {/* 第二次访问的额外文字 */}
            <AnimatePresence>
              {isSecondVisit && showSecondVisitText && (
                <motion.p 
                  className="second-visit-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  希望你现在真的开心了。
                </motion.p>
              )}
            </AnimatePresence>

            {/* 月亮和幸运草图片区域 */}
            <AnimatePresence>
              {showImage && (
                <motion.div 
                  className="moon-clover-image"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  <div className="image-placeholder">
                    <Moon size={40} color="#FFD700" />
                    <div className="clover">🍀</div>
                    <div className="sparkles">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="sparkle"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: Math.random() * 2
                          }}
                        >
                          ✨
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* 翻页提示 */}
      <AnimatePresence>
        {canFlip && (
          <motion.div 
            className="flip-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={onComplete}
            style={{ cursor: 'pointer' }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={24} color="#FFD700" />
            </motion.div>
            <p>点击翻页</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CoverPage
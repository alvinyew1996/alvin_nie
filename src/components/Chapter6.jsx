import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Star, Heart } from 'lucide-react'

const Chapter6 = ({ onComplete }) => {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [showBookClose, setShowBookClose] = useState(false)
  const [showBackCover, setShowBackCover] = useState(false)
  const [showFinalPhoto, setShowFinalPhoto] = useState(false)
  const [showFinalText, setShowFinalText] = useState(false)
  const [showStars, setShowStars] = useState(false)
  const [showMeteors, setShowMeteors] = useState(false)

  useEffect(() => {
    // 书本合上动画
    const timer1 = setTimeout(() => {
      setShowBookClose(true)
    }, 2000)

    // 显示背面
    const timer2 = setTimeout(() => {
      setShowBackCover(true)
    }, 4000)

    // 显示最终照片
    const timer3 = setTimeout(() => {
      setShowFinalPhoto(true)
    }, 7000)

    // 显示最终文字
    const timer4 = setTimeout(() => {
      setShowFinalText(true)
    }, 10000)

    // 显示星星和流星
    const timer5 = setTimeout(() => {
      setShowStars(true)
    }, 12000)

    const timer6 = setTimeout(() => {
      setShowMeteors(true)
    }, 15000)

    // 最终结束
    const timer7 = setTimeout(() => {
      onComplete()
    }, 50000) // 25秒文字 + 25秒流星效果

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
      clearTimeout(timer6)
      clearTimeout(timer7)
    }
  }, [onComplete])

  const finalMessages = [
    "要开心，不要经常有太多情绪。",
    "对其他人不要有太多的期待。",
    "一定要对自己好，只有自己好起来才是最重要的。",
    "这样就会有一个稳定的内核不怕被内耗，",
    "不论遇到什么事情，都能让自己坚强，",
    "也不会受太大的伤害。",
    "你的人生才会慢慢形成你想要的样子。",
    "以后好好生活，希望你都可以过得很好的生活。"
  ]

  return (
    <motion.div 
      className="chapter6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 书本合上动画 */}
      <AnimatePresence>
        {showBookClose && (
          <motion.div 
            className="book-closing"
            initial={{ scale: 1, rotateY: 0 }}
            animate={{ scale: 0.8, rotateY: -30 }}
            transition={{ duration: 2 }}
          >
            <div className="closing-book">
              <div className="book-cover-closing"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 书本背面 */}
      <AnimatePresence>
        {showBackCover && (
          <motion.div 
            className="book-back-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="back-cover">
              <div className="back-cover-content">
                {/* 最终照片 */}
                <AnimatePresence>
                  {showFinalPhoto && (
                    <motion.div 
                      className="final-photo-container"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.5 }}
                    >
                      <img 
                        src="/images/chapter6/final-smile.jpg" 
                        alt="最终笑容" 
                        className="final-photo"
                      />
                      <motion.div 
                        className="final-photo-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                      >
                        <p>其实这张是我想发自内心笑给你看的，因为从来没让你知道，遇见你我是多么的高兴。</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 夜空背景 */}
      <div className="night-sky">
        {/* 月亮 */}
        <motion.div 
          className="final-moon"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 5 }}
        >
          <Moon size={120} color="#FFD700" />
          <div className="moon-glow-final"></div>
        </motion.div>

        {/* 星星 */}
        <AnimatePresence>
          {showStars && (
            <div className="final-stars">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="final-star"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3
                  }}
                >
                  <Star size={8} color="#fff" />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* 流星 */}
        <AnimatePresence>
          {showMeteors && (
            <div className="meteors">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="meteor"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 50}%`,
                  }}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    x: [0, 300],
                    y: [0, 300]
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 3,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 5
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 最终文字 */}
      <AnimatePresence>
        {showFinalText && (
          <motion.div 
            className="final-messages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {finalMessages.map((message, index) => (
              <motion.p
                key={index}
                className="final-message"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 3.125 // 25秒 / 8条消息 = 3.125秒每条
                }}
              >
                {message}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Chapter6
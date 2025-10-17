import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getVideoUrl, handleVideoError } from '../utils/cloudStorage'

const OptimizedVideo = ({ 
  src, 
  className = '', 
  autoPlay = false, 
  muted = false, 
  loop = false,
  onPlay = () => {},
  onPause = () => {},
  onEnded = () => {},
  controls = true,
  poster = null,
  fallbackSrc = null
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  // 获取优化后的视频URL
  const videoUrl = getVideoUrl(src)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // 设置视频源
    video.src = videoUrl

    // 错误处理
    const handleError = () => {
      setHasError(true)
      setIsLoading(false)
      
      // 尝试备用源
      if (fallbackSrc) {
        video.src = fallbackSrc
      } else {
        // 显示占位符
        handleVideoError(video, fallbackSrc)
      }
    }

    // 加载完成
    const handleLoadedData = () => {
      setIsLoading(false)
      setHasError(false)
    }

    // 播放状态
    const handlePlay = () => {
      setIsPlaying(true)
      onPlay()
    }

    const handlePause = () => {
      setIsPlaying(false)
      onPause()
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onEnded()
    }

    // 添加事件监听器
    video.addEventListener('error', handleError)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [videoUrl, fallbackSrc, onPlay, onPause, onEnded])

  if (hasError && !fallbackSrc) {
    return (
      <div className={`video-placeholder ${className}`}>
        <div className="placeholder-content">
          <div className="placeholder-icon">🎬</div>
          <p>视频加载失败</p>
          <p className="placeholder-note">请检查网络连接或稍后重试</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`video-container ${className}`}>
      {isLoading && (
        <motion.div 
          className="video-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="loading-spinner"></div>
          <p>视频加载中...</p>
        </motion.div>
      )}
      
      <video
        ref={videoRef}
        className={`optimized-video ${isLoading ? 'loading' : ''}`}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        poster={poster}
        preload="metadata"
        playsInline
      />
      
      {/* 自定义播放按钮 */}
      {!controls && (
        <motion.button
          className="custom-play-button"
          onClick={() => {
            if (videoRef.current) {
              if (isPlaying) {
                videoRef.current.pause()
              } else {
                videoRef.current.play()
              }
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </motion.button>
      )}
    </div>
  )
}

export default OptimizedVideo
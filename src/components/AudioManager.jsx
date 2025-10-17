import React, { useEffect, useRef } from 'react'
import { Howl } from 'howler'

const AudioManager = () => {
  const currentAudioRef = useRef(null)
  const audioQueueRef = useRef([])
  const isPausedRef = useRef(false)

  useEffect(() => {
    // 预加载音频文件
    const audioFiles = {
      cover: '/audio/a-town-with-an-ocean-view.mp3',
      chapter1: '/audio/rain-love.mp3',
      chapter2: '/audio/rain-love.mp3',
      chapter3: '/audio/left-person.mp3',
      chapter4: '/audio/left-person.mp3',
      chapter5: '/audio/deceive.mp3',
      chapter6: '/audio/deceive.mp3'
    }

    // 创建音频对象
    Object.keys(audioFiles).forEach(key => {
      const sound = new Howl({
        src: [audioFiles[key]],
        loop: true,
        volume: 0.6,
        preload: true,
        onload: () => {
          console.log(`Audio loaded: ${key}`)
        },
        onloaderror: (id, error) => {
          console.warn(`Audio load error for ${key}:`, error)
        }
      })
      audioQueueRef.current[key] = sound
    })

    return () => {
      // 清理音频
      Object.values(audioQueueRef.current).forEach(sound => {
        if (sound) sound.unload()
      })
    }
  }, [])

  const playAudio = (audioKey) => {
    // 如果当前音频和要播放的音频相同，且已暂停，则恢复播放
    if (currentAudioRef.current && currentAudioRef.current._src === audioQueueRef.current[audioKey]?._src) {
      if (isPausedRef.current) {
        resumeAudio()
        return
      }
    }

    // 停止当前音频
    if (currentAudioRef.current) {
      currentAudioRef.current.stop()
    }

    // 播放新音频
    const sound = audioQueueRef.current[audioKey]
    if (sound) {
      sound.play()
      currentAudioRef.current = sound
      isPausedRef.current = false
    }
  }

  const stopAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.stop()
      currentAudioRef.current = null
      isPausedRef.current = false
    }
  }

  const pauseAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      isPausedRef.current = true
    }
  }

  const resumeAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.play()
      isPausedRef.current = false
    }
  }

  const setVolume = (volume) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.volume(volume)
    }
  }

  const fadeOut = (duration = 2000) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.fade(currentAudioRef.current.volume(), 0, duration)
      setTimeout(() => {
        stopAudio()
      }, duration)
    }
  }

  const fadeIn = (audioKey, duration = 2000) => {
    playAudio(audioKey)
    if (currentAudioRef.current) {
      currentAudioRef.current.volume(0)
      currentAudioRef.current.fade(0, 0.6, duration)
    }
  }

  // 将音频控制函数暴露给全局
  useEffect(() => {
    window.audioManager = {
      playAudio,
      stopAudio,
      pauseAudio,
      resumeAudio,
      setVolume,
      fadeOut,
      fadeIn
    }
  }, [])

  return null
}

export default AudioManager
import React, { useEffect, useRef } from 'react'
import { Howl } from 'howler'

const AudioManager = () => {
  const currentAudioRef = useRef(null)
  const audioQueueRef = useRef([])

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
        volume: 0.7,
        preload: true
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
    // 停止当前音频
    if (currentAudioRef.current) {
      currentAudioRef.current.stop()
    }

    // 播放新音频
    const sound = audioQueueRef.current[audioKey]
    if (sound) {
      sound.play()
      currentAudioRef.current = sound
    }
  }

  const stopAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.stop()
      currentAudioRef.current = null
    }
  }

  const pauseAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
    }
  }

  const resumeAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.play()
    }
  }

  // 将音频控制函数暴露给全局
  useEffect(() => {
    window.audioManager = {
      playAudio,
      stopAudio,
      pauseAudio,
      resumeAudio
    }
  }, [])

  return null
}

export default AudioManager
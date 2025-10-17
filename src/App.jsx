import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import Book3D from './components/Book3D'
import CoverPage from './components/CoverPage'
import Chapter1 from './components/Chapter1'
import Chapter2 from './components/Chapter2'
import Chapter3 from './components/Chapter3'
import Chapter4 from './components/Chapter4'
import Chapter5 from './components/Chapter5'
import Chapter6 from './components/Chapter6'
import AudioManager from './components/AudioManager'
import { chapters } from './data/chapters'

function App() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [isBookOpen, setIsBookOpen] = useState(false)
  const [showCover, setShowCover] = useState(true)
  const [isSecondVisit, setIsSecondVisit] = useState(false)

  useEffect(() => {
    // 检查是否是第二次访问
    const hasVisited = localStorage.getItem('memoir-visited')
    if (hasVisited) {
      setIsSecondVisit(true)
    } else {
      localStorage.setItem('memoir-visited', 'true')
    }
  }, [])

  const handleCoverComplete = () => {
    setShowCover(false)
    setIsBookOpen(true)
  }

  const handleChapterComplete = (chapterIndex) => {
    if (chapterIndex < chapters.length - 1) {
      setCurrentChapter(chapterIndex + 1)
    } else {
      // 最后一章完成
      setCurrentChapter(0)
      setIsBookOpen(false)
      setShowCover(true)
    }
  }

  const renderChapter = () => {
    switch (currentChapter) {
      case 0:
        return <Chapter1 onComplete={() => handleChapterComplete(0)} />
      case 1:
        return <Chapter2 onComplete={() => handleChapterComplete(1)} />
      case 2:
        return <Chapter3 onComplete={() => handleChapterComplete(2)} />
      case 3:
        return <Chapter4 onComplete={() => handleChapterComplete(3)} />
      case 4:
        return <Chapter5 onComplete={() => handleChapterComplete(4)} />
      case 5:
        return <Chapter6 onComplete={() => handleChapterComplete(5)} />
      default:
        return null
    }
  }

  return (
    <div className="app">
      <AudioManager />
      
      <AnimatePresence>
        {showCover && (
          <CoverPage 
            onComplete={handleCoverComplete}
            isSecondVisit={isSecondVisit}
          />
        )}
      </AnimatePresence>

      {isBookOpen && (
        <div className="book-container">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Book3D 
              currentChapter={currentChapter}
              onChapterChange={setCurrentChapter}
            />
          </Canvas>
          
          <div className="chapter-content">
            {renderChapter()}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
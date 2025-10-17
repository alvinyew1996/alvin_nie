import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'

const Book3D = ({ currentChapter, onChapterChange }) => {
  const bookRef = useRef()
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipProgress, setFlipProgress] = useState(0)

  useFrame((state) => {
    if (isFlipping) {
      setFlipProgress(prev => {
        const newProgress = prev + 0.02
        if (newProgress >= 1) {
          setIsFlipping(false)
          setFlipProgress(0)
          return 0
        }
        return newProgress
      })
    }
  })

  const handlePageFlip = () => {
    setIsFlipping(true)
    setTimeout(() => {
      onChapterChange(currentChapter + 1)
    }, 1000)
  }

  return (
    <group ref={bookRef}>
      {/* 书本主体 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 4, 0.5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* 书页 */}
      <mesh position={[0, 0, 0.26]}>
        <planeGeometry args={[2.8, 3.8]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>

      {/* 翻页动画 */}
      {isFlipping && (
        <mesh 
          position={[0, 0, 0.27]}
          rotation={[0, flipProgress * Math.PI, 0]}
        >
          <planeGeometry args={[2.8, 3.8]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
      )}

      {/* 章节标题 */}
      <Text
        position={[0, 1, 0.28]}
        fontSize={0.3}
        color="#8B4513"
        anchorX="center"
        anchorY="middle"
      >
        {`第${currentChapter + 1}章`}
      </Text>

      {/* 翻页按钮 */}
      <Html position={[1.5, 0, 0.3]}>
        <button 
          className="flip-button"
          onClick={handlePageFlip}
          disabled={isFlipping}
        >
          翻页
        </button>
      </Html>
    </group>
  )
}

export default Book3D
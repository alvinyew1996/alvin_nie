import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Timeline from './components/Timeline'
import PhotoGallery from './components/PhotoGallery'
import MemoryDetail from './components/MemoryDetail'
import { memories } from './data/memories'

function App() {
  const [selectedMemory, setSelectedMemory] = useState(null)
  const [currentYear, setCurrentYear] = useState(2023)

  const handleMemorySelect = (memory) => {
    setSelectedMemory(memory)
  }

  const handleYearChange = (year) => {
    setCurrentYear(year)
    setSelectedMemory(null)
  }

  const filteredMemories = memories.filter(memory => 
    new Date(memory.date).getFullYear() === currentYear
  )

  return (
    <div className="app">
      <Header 
        currentYear={currentYear} 
        onYearChange={handleYearChange}
        totalMemories={memories.length}
      />
      
      <main className="main-content">
        <div className="container">
          <div className="content-grid">
            <Timeline 
              memories={filteredMemories}
              onMemorySelect={handleMemorySelect}
              selectedMemory={selectedMemory}
            />
            
            <div className="gallery-section">
              <PhotoGallery 
                memories={filteredMemories}
                onMemorySelect={handleMemorySelect}
                selectedMemory={selectedMemory}
              />
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedMemory && (
          <MemoryDetail 
            memory={selectedMemory}
            onClose={() => setSelectedMemory(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
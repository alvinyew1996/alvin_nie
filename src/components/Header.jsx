import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Heart, Camera } from 'lucide-react'

const Header = ({ currentYear, onYearChange, totalMemories }) => {
  const years = [2020, 2021, 2022, 2023, 2024]

  return (
    <motion.header 
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container">
        <div className="header-content">
          <div className="header-title">
            <Heart className="title-icon" />
            <h1>我的回忆录</h1>
            <span className="subtitle">Interactive Memoir</span>
          </div>
          
          <div className="header-stats">
            <div className="stat">
              <Camera className="stat-icon" />
              <span>{totalMemories} 个回忆</span>
            </div>
          </div>
        </div>
        
        <div className="year-selector">
          <Calendar className="year-icon" />
          <div className="year-buttons">
            {years.map(year => (
              <motion.button
                key={year}
                className={`year-btn ${currentYear === year ? 'active' : ''}`}
                onClick={() => onYearChange(year)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
// 云存储配置
const CLOUD_CONFIG = {
  // 您可以选择以下任一服务
  services: {
    // 方案1: 使用免费的 GitHub Pages + jsDelivr CDN
    github: {
      baseUrl: 'https://cdn.jsdelivr.net/gh/您的用户名/您的仓库名@main/public/videos/',
      fallback: true
    },
    
    // 方案2: 使用免费的 Cloudinary
    cloudinary: {
      baseUrl: 'https://res.cloudinary.com/您的云名称/video/upload/',
      transformations: 'q_auto,f_auto,w_1280,h_720/',
      fallback: true
    },
    
    // 方案3: 使用免费的 Imgur (适合小文件)
    imgur: {
      baseUrl: 'https://i.imgur.com/',
      fallback: false
    },
    
    // 方案4: 使用免费的 Vercel/Netlify
    vercel: {
      baseUrl: 'https://您的项目名.vercel.app/videos/',
      fallback: true
    }
  },
  
  // 当前使用的服务
  currentService: 'github'
}

// 获取视频URL
export const getVideoUrl = (filename) => {
  const service = CLOUD_CONFIG.services[CLOUD_CONFIG.currentService]
  return `${service.baseUrl}${filename}`
}

// 获取图片URL
export const getImageUrl = (filename, chapter) => {
  const service = CLOUD_CONFIG.services[CLOUD_CONFIG.currentService]
  return `${service.baseUrl.replace('/videos/', '/images/')}${chapter}/${filename}`
}

// 预加载视频
export const preloadVideo = (url) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = () => resolve(video)
    video.onerror = reject
    video.src = url
  })
}

// 检查视频是否可访问
export const checkVideoAccess = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

// 视频加载失败时的处理
export const handleVideoError = (videoElement, fallbackUrl) => {
  videoElement.onerror = () => {
    if (fallbackUrl) {
      videoElement.src = fallbackUrl
    } else {
      // 显示占位符
      videoElement.style.display = 'none'
      const placeholder = document.createElement('div')
      placeholder.className = 'video-placeholder'
      placeholder.innerHTML = `
        <div class="placeholder-content">
          <div class="placeholder-icon">🎬</div>
          <p>视频加载中...</p>
          <p class="placeholder-note">如果长时间无法加载，请检查网络连接</p>
        </div>
      `
      videoElement.parentNode.insertBefore(placeholder, videoElement)
    }
  }
}
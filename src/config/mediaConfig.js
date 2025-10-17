// 媒体文件配置 - 支持云存储
export const MEDIA_CONFIG = {
  // 云存储服务配置
  cloudStorage: {
    // 方案1: 使用免费的 Cloudinary
    cloudinary: {
      baseUrl: 'https://res.cloudinary.com/您的云名称/video/upload/',
      // 自动优化参数
      transformations: 'q_auto,f_auto,w_1280,h_720/',
      // 高质量参数
      highQuality: 'q_auto,f_auto,w_1920,h_1080/',
      // 低质量参数（快速加载）
      lowQuality: 'q_auto,f_auto,w_1280,h_720/'
    },
    
    // 方案2: 使用免费的 Imgur
    imgur: {
      baseUrl: 'https://i.imgur.com/',
      // 需要先上传到Imgur获取ID
    },
    
    // 方案3: 使用 Vercel/Netlify
    vercel: {
      baseUrl: 'https://您的项目名.vercel.app/videos/',
    },
    
    // 方案4: 使用 GitHub + jsDelivr CDN
    github: {
      baseUrl: 'https://cdn.jsdelivr.net/gh/您的用户名/您的仓库名@main/public/videos/',
    }
  },
  
  // 当前使用的服务
  currentService: 'cloudinary', // 改为您选择的方案
  
  // 视频文件映射
  videos: {
    // 第三章视频
    'chapter3/happy-daily': {
      cloudinary: '您的视频ID1',
      imgur: '您的视频ID1',
      vercel: 'chapter3/happy-daily.mp4',
      github: 'chapter3/happy-daily.mp4'
    },
    'chapter3/airport-play': {
      cloudinary: '您的视频ID2',
      imgur: '您的视频ID2', 
      vercel: 'chapter3/airport-play.mp4',
      github: 'chapter3/airport-play.mp4'
    },
    'chapter3/gift-giving': {
      cloudinary: '您的视频ID3',
      imgur: '您的视频ID3',
      vercel: 'chapter3/gift-giving.mp4',
      github: 'chapter3/gift-giving.mp4'
    },
    'chapter3/jb-birthday': {
      cloudinary: '您的视频ID4',
      imgur: '您的视频ID4',
      vercel: 'chapter3/jb-birthday.mp4',
      github: 'chapter3/jb-birthday.mp4'
    },
    'chapter3/sunrise-video': {
      cloudinary: '您的视频ID5',
      imgur: '您的视频ID5',
      vercel: 'chapter3/sunrise-video.mp4',
      github: 'chapter3/sunrise-video.mp4'
    },
    
    // 第四章视频
    'chapter4/special-moment': {
      cloudinary: '您的视频ID6',
      imgur: '您的视频ID6',
      vercel: 'chapter4/special-moment.mp4',
      github: 'chapter4/special-moment.mp4'
    }
  },
  
  // 图片文件映射
  images: {
    // 封面
    'cover/moon-clover': {
      cloudinary: '您的图片ID1',
      imgur: '您的图片ID1',
      vercel: 'cover/moon-clover.jpg',
      github: 'cover/moon-clover.jpg'
    }
    // ... 其他图片配置
  }
}

// 获取视频URL
export const getVideoUrl = (videoKey) => {
  const service = MEDIA_CONFIG.cloudStorage[MEDIA_CONFIG.currentService]
  const videoConfig = MEDIA_CONFIG.videos[videoKey]
  
  if (!videoConfig) {
    console.warn(`Video not found: ${videoKey}`)
    return null
  }
  
  const videoId = videoConfig[MEDIA_CONFIG.currentService]
  if (!videoId) {
    console.warn(`Video ID not found for service ${MEDIA_CONFIG.currentService}: ${videoKey}`)
    return null
  }
  
  return `${service.baseUrl}${service.transformations || ''}${videoId}`
}

// 获取图片URL
export const getImageUrl = (imageKey) => {
  const service = MEDIA_CONFIG.cloudStorage[MEDIA_CONFIG.currentService]
  const imageConfig = MEDIA_CONFIG.images[imageKey]
  
  if (!imageConfig) {
    console.warn(`Image not found: ${imageKey}`)
    return null
  }
  
  const imageId = imageConfig[MEDIA_CONFIG.currentService]
  if (!imageId) {
    console.warn(`Image ID not found for service ${MEDIA_CONFIG.currentService}: ${imageKey}`)
    return null
  }
  
  return `${service.baseUrl}${imageId}`
}

// 检查服务是否可用
export const checkServiceAvailability = async (serviceName) => {
  const service = MEDIA_CONFIG.cloudStorage[serviceName]
  if (!service) return false
  
  try {
    const response = await fetch(service.baseUrl, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}
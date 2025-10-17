// 媒体文件配置 - Cloudinary 云存储
export const MEDIA_CONFIG = {
  // 云存储服务配置
  cloudStorage: {
    cloudinary: {
      baseUrl: 'https://res.cloudinary.com/dowr4/video/upload/',
      // 自动优化参数
      transformations: 'q_auto,f_auto,w_1280,h_720/',
      // 高质量参数
      highQuality: 'q_auto,f_auto,w_1920,h_1080/',
      // 低质量参数（快速加载）
      lowQuality: 'q_auto,f_auto,w_1280,h_720/'
    }
  },
  
  // 当前使用的服务
  currentService: 'cloudinary',
  
  // 视频文件映射
  videos: {
    'chapter3/jb-birthday': {
      cloudinary: 'chapter3_jb_birthday',
    },
    'chapter3/sunrise-video': {
      cloudinary: 'chapter3_sunrise_video',
    },
    'chapter3/haidilao-1': {
      cloudinary: 'chapter3_haidilao_1',
    },
    'chapter3/haidilao-2': {
      cloudinary: 'chapter3_haidilao_2',
    },
    'chapter4/special-smile': {
      cloudinary: 'chapter4_special_smile',
    }
  },
  
  // 图片文件映射 (稍后添加)
  images: {
    // 封面
    'cover/moon-clover': {
      cloudinary: '您的封面图片ID', // 请替换为实际ID
    }
    // ... 其他图片稍后添加
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
  
  return `${service.baseUrl.replace('/video/', '/image/')}${imageId}`
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
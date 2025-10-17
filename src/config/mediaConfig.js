// 媒体文件配置 - Cloudinary 云存储
export const MEDIA_CONFIG = {
  // 云存储服务配置
  cloudStorage: {
    cloudinary: {
      baseUrl: 'https://res.cloudinary.com/dowr4almo/video/upload/',
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
    // 大容量视频 - Cloudinary
    'chapter3/jb-birthday': {
      cloudinary: 'videos_chapter3_jb_birthday_ymtob7', // ✅ 已确认 (96.35 MB)
    },
    'chapter3/sunrise-video': {
      cloudinary: 'videos_chapter3_sunrise_video_afunaj', // ✅ 已确认 (95.72 MB)
    },
    'chapter3/haidilao-1': {
      cloudinary: 'vidoes_chapter3_haidilao_1_jjn0yk', // ✅ 已确认 (95.52 MB)
    },
    'chapter3/haidilao-2': {
      cloudinary: 'videos_chapter3_haidilao_2_hs1tmn', // ✅ 已确认 (96.83 MB)
    },
    'chapter4/special-smile': {
      cloudinary: 'videos_chapter4_important_smile_cxvpxn', // ✅ 已确认 (92.62 MB)
    },
    
    // 小容量视频 - GitHub (已上传)
    'chapter3/airport-play': {
      local: '/videos/chapter3_airport_play.mp4', // 1.55 MB
    },
    'chapter3/gift-giving': {
      local: '/videos/chapter3_gift_giving.mp4', // 1.53 MB
    },
    'chapter3/happy-daily': {
      local: '/videos/chapter3_happy_daily.mp4', // 2.44 MB
    },
    'chapter3/jb-cats': {
      local: '/videos/chapter3_jb_cats.mp4', // 4.93 MB
    },
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
  const videoConfig = MEDIA_CONFIG.videos[videoKey]
  
  if (!videoConfig) {
    console.warn(`Video not found: ${videoKey}`)
    return null
  }
  
  // 检查是否有 Cloudinary 配置
  if (videoConfig.cloudinary) {
    const service = MEDIA_CONFIG.cloudStorage.cloudinary
    return `${service.baseUrl}${service.transformations || ''}${videoConfig.cloudinary}`
  }
  
  // 检查是否有本地文件配置
  if (videoConfig.local) {
    return videoConfig.local
  }
  
  console.warn(`No video source found for: ${videoKey}`)
  return null
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
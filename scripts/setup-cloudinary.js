#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupCloudinary() {
  console.log('☁️  Cloudinary 云存储设置向导');
  console.log('================================\n');

  try {
    // 获取云名称
    const cloudName = await question('请输入您的 Cloudinary 云名称 (例如: d1234567890): ');
    
    if (!cloudName) {
      console.log('❌ 云名称不能为空');
      process.exit(1);
    }

    console.log('\n📹 请输入您的5个视频的 Public ID:');
    console.log('(在 Cloudinary 控制台的 Media Library 中可以找到)\n');

    const videos = [
      { key: 'chapter3/happy-daily', name: '最快乐的日常' },
      { key: 'chapter3/airport-play', name: '机场游玩' },
      { key: 'chapter3/gift-giving', name: '送礼物' },
      { key: 'chapter3/jb-birthday', name: 'JB庆祝生日' },
      { key: 'chapter3/sunrise-video', name: '日出视频' }
    ];

    const videoIds = {};
    
    for (const video of videos) {
      const videoId = await question(`${video.name} 的 Public ID: `);
      if (videoId) {
        videoIds[video.key] = { cloudinary: videoId };
      }
    }

    // 获取第四章视频
    const chapter4Video = await question('\n第四章特殊时刻视频的 Public ID (可选): ');
    if (chapter4Video) {
      videoIds['chapter4/special-moment'] = { cloudinary: chapter4Video };
    }

    // 生成配置文件
    const configContent = `// 媒体文件配置 - Cloudinary 云存储
export const MEDIA_CONFIG = {
  // 云存储服务配置
  cloudStorage: {
    cloudinary: {
      baseUrl: 'https://res.cloudinary.com/${cloudName}/video/upload/',
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
${Object.entries(videoIds).map(([key, config]) => `    '${key}': {
      cloudinary: '${config.cloudinary}',
    }`).join(',\n')}
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
    console.warn(\`Video not found: \${videoKey}\`)
    return null
  }
  
  const videoId = videoConfig[MEDIA_CONFIG.currentService]
  if (!videoId) {
    console.warn(\`Video ID not found for service \${MEDIA_CONFIG.currentService}: \${videoKey}\`)
    return null
  }
  
  return \`\${service.baseUrl}\${service.transformations || ''}\${videoId}\`
}

// 获取图片URL
export const getImageUrl = (imageKey) => {
  const service = MEDIA_CONFIG.cloudStorage[MEDIA_CONFIG.currentService]
  const imageConfig = MEDIA_CONFIG.images[imageKey]
  
  if (!imageConfig) {
    console.warn(\`Image not found: \${imageKey}\`)
    return null
  }
  
  const imageId = imageConfig[MEDIA_CONFIG.currentService]
  if (!imageId) {
    console.warn(\`Image ID not found for service \${MEDIA_CONFIG.currentService}: \${imageKey}\`)
    return null
  }
  
  return \`\${service.baseUrl.replace('/video/', '/image/')}\${imageId}\`
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
`;

    // 写入配置文件
    const configPath = path.join(__dirname, '..', 'src', 'config', 'mediaConfig.js');
    fs.writeFileSync(configPath, configContent);

    console.log('\n✅ 配置文件已生成!');
    console.log(`📁 位置: ${configPath}`);
    
    console.log('\n📋 下一步:');
    console.log('1. 上传您的照片到 Cloudinary');
    console.log('2. 更新配置文件中的图片ID');
    console.log('3. 运行 npm run dev 测试');
    
    console.log('\n🎬 测试视频链接:');
    Object.keys(videoIds).forEach(key => {
      const url = `https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto,w_1280,h_720/${videoIds[key].cloudinary}`;
      console.log(`${key}: ${url}`);
    });

  } catch (error) {
    console.error('❌ 设置失败:', error.message);
  } finally {
    rl.close();
  }
}

// 运行设置
if (require.main === module) {
  setupCloudinary();
}

module.exports = { setupCloudinary };
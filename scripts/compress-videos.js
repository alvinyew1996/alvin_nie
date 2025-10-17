#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 检查FFmpeg是否安装
function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// 压缩视频
function compressVideo(inputPath, outputPath, options = {}) {
  const {
    crf = 28,
    scale = '1280:720',
    audioBitrate = '128k'
  } = options;

  const command = `ffmpeg -i "${inputPath}" -c:v libx264 -crf ${crf} -c:a aac -b:a ${audioBitrate} -vf "scale=${scale}" -movflags +faststart "${outputPath}"`;
  
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ 压缩完成: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ 压缩失败: ${path.basename(inputPath)}`, error.message);
    return false;
  }
}

// 获取文件大小
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2); // MB
}

// 主函数
function main() {
  console.log('🎬 视频压缩工具');
  console.log('================');

  // 检查FFmpeg
  if (!checkFFmpeg()) {
    console.error('❌ 错误: 未找到FFmpeg');
    console.log('请先安装FFmpeg:');
    console.log('  Windows: https://ffmpeg.org/download.html');
    console.log('  Mac: brew install ffmpeg');
    console.log('  Linux: sudo apt install ffmpeg');
    process.exit(1);
  }

  // 创建输出目录
  const outputDir = path.join(__dirname, '..', 'compressed_videos');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 视频配置
  const videoConfigs = [
    {
      input: '您的视频1.mp4', // 请替换为实际路径
      output: 'happy-daily.mp4',
      description: '最快乐的日常'
    },
    {
      input: '您的视频2.mp4',
      output: 'airport-play.mp4',
      description: '机场游玩'
    },
    {
      input: '您的视频3.mp4',
      output: 'gift-giving.mp4',
      description: '送礼物'
    },
    {
      input: '您的视频4.mp4',
      output: 'jb-birthday.mp4',
      description: 'JB庆祝生日'
    },
    {
      input: '您的视频5.mp4',
      output: 'sunrise-video.mp4',
      description: '日出视频'
    }
  ];

  console.log('📁 开始压缩视频...\n');

  let successCount = 0;
  let totalSizeBefore = 0;
  let totalSizeAfter = 0;

  videoConfigs.forEach((config, index) => {
    const inputPath = path.resolve(config.input);
    const outputPath = path.join(outputDir, config.output);

    console.log(`[${index + 1}/${videoConfigs.length}] ${config.description}`);
    
    // 检查输入文件是否存在
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  跳过: 文件不存在 - ${config.input}`);
      return;
    }

    // 获取原始文件大小
    const sizeBefore = getFileSize(inputPath);
    totalSizeBefore += parseFloat(sizeBefore);
    console.log(`   原始大小: ${sizeBefore} MB`);

    // 压缩视频
    const success = compressVideo(inputPath, outputPath, {
      crf: 28,
      scale: '1280:720',
      audioBitrate: '128k'
    });

    if (success) {
      // 获取压缩后文件大小
      const sizeAfter = getFileSize(outputPath);
      totalSizeAfter += parseFloat(sizeAfter);
      const reduction = ((parseFloat(sizeBefore) - parseFloat(sizeAfter)) / parseFloat(sizeBefore) * 100).toFixed(1);
      
      console.log(`   压缩后: ${sizeAfter} MB (减少 ${reduction}%)`);
      successCount++;
    }
    
    console.log('');
  });

  // 显示总结
  console.log('📊 压缩总结');
  console.log('==========');
  console.log(`✅ 成功: ${successCount}/${videoConfigs.length} 个视频`);
  console.log(`📦 原始总大小: ${totalSizeBefore.toFixed(2)} MB`);
  console.log(`📦 压缩后总大小: ${totalSizeAfter.toFixed(2)} MB`);
  console.log(`💾 节省空间: ${(totalSizeBefore - totalSizeAfter).toFixed(2)} MB (${((totalSizeBefore - totalSizeAfter) / totalSizeBefore * 100).toFixed(1)}%)`);
  
  if (successCount > 0) {
    console.log('\n🎉 压缩完成！');
    console.log(`📁 输出目录: ${outputDir}`);
    console.log('\n📋 下一步:');
    console.log('1. 将压缩后的视频复制到 public/videos/chapter3/ 文件夹');
    console.log('2. 重命名文件以匹配项目要求');
    console.log('3. 运行 git add . && git commit -m "Add videos" && git push');
  }
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = { compressVideo, checkFFmpeg };
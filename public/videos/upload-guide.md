# 视频上传指南

## 🎬 视频文件处理方案

### 方案1: 压缩后直接上传 (推荐)
```bash
# 1. 压缩视频 (保持质量，减小文件)
ffmpeg -i 原始视频.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 128k 压缩后.mp4

# 2. 重命名并放入对应文件夹
# 例如: chapter3/happy-daily.mp4
```

### 方案2: 云存储 (最佳)
1. **GitHub Pages + CDN** (免费)
   - 创建新仓库专门存放媒体文件
   - 上传到 `public/videos/` 文件夹
   - 使用 jsDelivr CDN 加速

2. **Cloudinary** (免费额度)
   - 注册 https://cloudinary.com
   - 上传视频到云端
   - 获取公开链接

3. **Vercel/Netlify** (免费)
   - 部署到 Vercel 或 Netlify
   - 将视频放在 `public/videos/` 文件夹

## 📁 文件命名规范

### 第三章视频
- `chapter3/happy-daily.mp4` - 最快乐的日常
- `chapter3/airport-play.mp4` - 机场游玩
- `chapter3/gift-giving.mp4` - 送礼物
- `chapter3/jb-birthday.mp4` - JB庆祝生日
- `chapter3/jb-cats.mp4` - JB逗猫
- `chapter3/haidilao-photo.mp4` - 海底捞照片
- `chapter3/haidilao-video.mp4` - 海底捞视频
- `chapter3/sunrise-video.mp4` - 日出视频

### 第四章视频
- `chapter4/special-moment.mp4` - 特殊时刻

## 🔧 技术建议

### 视频规格
- **格式**: MP4 (H.264)
- **分辨率**: 1280x720 或 1920x1080
- **帧率**: 30fps
- **码率**: 2-5 Mbps
- **音频**: AAC, 128kbps

### 压缩命令
```bash
# 高质量压缩
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4

# 平衡质量和大小
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 128k output.mp4

# 小文件压缩
ffmpeg -i input.mp4 -c:v libx264 -crf 32 -c:a aac -b:a 96k -vf "scale=1280:720" output.mp4
```

## 📊 文件大小估算
- 原始 100MB → 压缩后约 20-30MB
- 5个视频压缩后约 100-150MB
- 适合直接上传到 GitHub

## 🚀 上传步骤
1. 压缩视频文件
2. 按命名规范重命名
3. 放入对应文件夹
4. 提交到 Git
5. 推送到远程仓库
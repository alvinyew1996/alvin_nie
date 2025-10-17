# 🚀 快速上手指南

## 📋 准备工作

### 1. 安装必要工具
```bash
# 安装FFmpeg (视频压缩)
# Windows: 下载 https://ffmpeg.org/download.html
# Mac: brew install ffmpeg
# Linux: sudo apt install ffmpeg

# 验证安装
ffmpeg -version
```

### 2. 准备您的文件
- 📸 **照片**: 按章节整理好
- 🎬 **视频**: 5个大视频文件 (100MB+)
- 🎵 **音频**: 背景音乐和语音消息

## 🎬 视频处理 (推荐方案)

### 方案A: 使用压缩脚本 (最简单)
```bash
# 1. 编辑压缩脚本
nano scripts/compress-videos.js

# 2. 修改视频路径 (第45-65行)
# 将 '您的视频1.mp4' 替换为实际文件路径

# 3. 运行压缩
npm run compress

# 4. 复制压缩后的视频到项目
cp compressed_videos/*.mp4 public/videos/chapter3/
```

### 方案B: 手动压缩
```bash
# 创建压缩文件夹
mkdir compressed_videos

# 压缩每个视频 (替换文件路径)
ffmpeg -i "您的视频1.mp4" -c:v libx264 -crf 28 -c:a aac -b:a 128k -vf "scale=1280:720" compressed_videos/happy-daily.mp4
ffmpeg -i "您的视频2.mp4" -c:v libx264 -crf 28 -c:a aac -b:a 128k -vf "scale=1280:720" compressed_videos/airport-play.mp4
ffmpeg -i "您的视频3.mp4" -c:v libx264 -crf 28 -c:a aac -b:a 128k -vf "scale=1280:720" compressed_videos/gift-giving.mp4
ffmpeg -i "您的视频4.mp4" -c:v libx264 -crf 28 -c:a aac -b:a 128k -vf "scale=1280:720" compressed_videos/jb-birthday.mp4
ffmpeg -i "您的视频5.mp4" -c:v libx264 -crf 28 -c:a aac -b:a 128k -vf "scale=1280:720" compressed_videos/sunrise-video.mp4
```

## 📁 文件上传

### 1. 创建文件夹结构
```bash
npm run setup-media
```

### 2. 上传文件
```bash
# 方法1: 使用Git (推荐)
git add .
git commit -m "Add media files"
git push origin main

# 方法2: 使用GitHub网页界面
# 1. 访问 https://github.com/您的用户名/您的仓库
# 2. 进入 public/videos/chapter3/
# 3. 点击 "Add file" → "Upload files"
# 4. 拖拽压缩后的视频文件
```

## 📸 照片上传

### 按章节上传照片:

#### 封面
```
public/images/cover/moon-clover.jpg
```

#### 第一章 (4张)
```
public/images/chapter1/
├── coffee-shop.jpg      # 面包咖啡店
├── beach-date.jpg       # 海边约会
├── shoulder-touch.jpg   # 搭肩膀
└── early-days.jpg       # 早期照片
```

#### 第二章 (24页，约50张照片)
```
public/images/chapter2/
├── living-1.jpg 到 living-20.jpg    # 住过的地方
├── lok-lok.jpg                      # Lok Lok店
├── work-1.jpg 到 work-15.jpg        # 工作照片
├── bedok-1.jpg, bedok-2.jpg         # Bedok照片
├── heartbreak-1.jpg 到 heartbreak-3.jpg  # 心疼照片
├── bite-mark.jpg                    # 咬痕照片
├── sneaky-photo.jpg                 # 偷拍照片
├── funny-1.jpg, funny-2.jpg         # 搞怪照片
├── worry-lost.jpg                   # 担心迷路
├── bed-1.jpg 到 bed-3.jpg           # 床单照片
├── drink-1.jpg 到 drink-3.jpg       # 饮料照片
├── gift-basket.jpg                  # 礼篮照片
├── food-1.jpg 到 food-5.jpg         # 食物照片
├── wine.jpg                         # 酒照片
├── companion-1.jpg 到 companion-3.jpg # 陪伴照片
└── chat-1.jpg 到 chat-7.jpg         # 聊天记录
```

#### 第三章 (约15张照片)
```
public/images/chapter3/
├── beach-toilet.jpg           # 海边厕所
├── home-clothes-1.jpg         # 回家买衣服
├── home-clothes-2.jpg
├── watch-basketball.jpg       # 手表打球
├── gift-1.jpg 到 gift-4.jpg   # 礼物系列
└── sunrise-1.jpg 到 sunrise-3.jpg # 日出照片
```

#### 第四章 (1张特殊照片)
```
public/images/chapter4/special-smile.jpg
```

#### 第五章 (20张照片)
```
public/images/chapter5/
├── individual-1.jpg 到 individual-9.jpg  # 个人照片
└── gift-1.jpg 到 gift-11.jpg             # 礼物照片
```

#### 第六章 (1张最终照片)
```
public/images/chapter6/final-smile.jpg
```

## 🎵 音频上传

```
public/audio/
├── a-town-with-an-ocean-view.mp3  # 封面音乐
├── rain-love.mp3                  # 第一章和第二章
├── left-person.mp3                # 第三章和第四章
├── deceive.mp3                    # 第五章和第六章
└── voice-message.mp3              # 语音消息
```

## 🚀 部署

### 本地测试
```bash
npm run dev
# 访问 http://localhost:3000
```

### 在线部署
```bash
# 方法1: Vercel (推荐)
npm i -g vercel
vercel

# 方法2: Netlify
npm run build
# 上传 dist 文件夹到 Netlify

# 方法3: GitHub Pages
npm install --save-dev gh-pages
npm run deploy
```

## ⚡ 性能优化

### 视频优化
- 使用H.264编码
- 分辨率: 1280x720
- 码率: 2-5 Mbps
- 音频: AAC, 128kbps

### 图片优化
- 格式: JPG/WebP
- 宽度: 800px以上
- 压缩: 80-90%质量

## 🔧 故障排除

### 视频无法播放
1. 检查文件格式 (必须是MP4)
2. 检查文件是否损坏
3. 检查网络连接
4. 查看浏览器控制台

### 文件过大
1. 进一步压缩视频
2. 降低分辨率
3. 使用云存储

### 加载缓慢
1. 启用CDN
2. 使用懒加载
3. 预加载关键资源

## 📞 需要帮助？

如果遇到问题，请提供：
1. 错误信息截图
2. 文件大小和格式
3. 浏览器控制台日志
4. 使用的压缩参数

---

## 🎯 快速检查清单

- [ ] 安装FFmpeg
- [ ] 压缩5个视频文件
- [ ] 上传压缩后的视频
- [ ] 上传所有照片
- [ ] 上传音频文件
- [ ] 本地测试
- [ ] 在线部署
- [ ] 检查所有功能正常
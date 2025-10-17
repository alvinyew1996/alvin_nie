# 📁 文件上传完整指南

## 🎯 推荐方案：视频压缩 + 直接上传

### 步骤1: 安装FFmpeg (视频压缩工具)

#### Windows:
1. 下载 FFmpeg: https://ffmpeg.org/download.html
2. 解压到 `C:\ffmpeg`
3. 添加 `C:\ffmpeg\bin` 到系统PATH

#### Mac:
```bash
brew install ffmpeg
```

#### Linux:
```bash
sudo apt update
sudo apt install ffmpeg
```

### 步骤2: 压缩您的视频

在项目根目录创建压缩脚本：

```bash
# 创建压缩脚本
cat > compress_videos.sh << 'EOF'
#!/bin/bash

# 创建压缩后的视频文件夹
mkdir -p compressed_videos

# 压缩命令 - 高质量压缩
echo "开始压缩视频..."

# 示例：压缩您的5个大视频
# 请将 '您的视频.mp4' 替换为实际文件名

# 视频1: 最快乐的日常
ffmpeg -i "您的视频1.mp4" -c:v libx264 -crf 28 -c:a aac -b:a 128k -vf "scale=1280:720" compressed_videos/happy-daily.mp4

# 视频2: 机场游玩
ffmpeg -i "您的视频2.mp4" -c:v libx264 -crf 28 -c:a aac -b:a 128k -vf "scale=1280:720" compressed_videos/airport-play.mp4

# 视频3: 送礼物
ffmpeg -i "您的视频3.mp4" -c:v libx264 -crf 28 -c:a aac -b:a 128k -vf "scale=1280:720" compressed_videos/gift-giving.mp4

# 视频4: JB庆祝生日
ffmpeg -i "您的视频4.mp4" -c:v libx264 -crf 28 -c:a aac -b:a 128k -vf "scale=1280:720" compressed_videos/jb-birthday.mp4

# 视频5: 日出视频
ffmpeg -i "您的视频5.mp4" -c:v libx264 -crf 28 -c:a aac -b:a 128k -vf "scale=1280:720" compressed_videos/sunrise-video.mp4

echo "压缩完成！"
EOF

# 给脚本执行权限
chmod +x compress_videos.sh
```

### 步骤3: 文件组织结构

```
public/
├── audio/
│   ├── a-town-with-an-ocean-view.mp3
│   ├── rain-love.mp3
│   ├── left-person.mp3
│   ├── deceive.mp3
│   └── voice-message.mp3
├── images/
│   ├── cover/
│   │   └── moon-clover.jpg
│   ├── chapter1/
│   │   ├── coffee-shop.jpg
│   │   ├── beach-date.jpg
│   │   ├── shoulder-touch.jpg
│   │   └── early-days.jpg
│   ├── chapter2/
│   │   ├── living-1.jpg 到 living-20.jpg
│   │   ├── lok-lok.jpg
│   │   ├── work-1.jpg 到 work-15.jpg
│   │   └── ... (其他照片)
│   ├── chapter3/
│   │   ├── beach-toilet.jpg
│   │   ├── home-clothes-1.jpg
│   │   └── ... (其他照片)
│   ├── chapter4/
│   │   └── special-smile.jpg
│   ├── chapter5/
│   │   ├── individual-1.jpg 到 individual-9.jpg
│   │   └── gift-1.jpg 到 gift-11.jpg
│   └── chapter6/
│       └── final-smile.jpg
└── videos/
    ├── chapter3/
    │   ├── happy-daily.mp4
    │   ├── airport-play.mp4
    │   ├── gift-giving.mp4
    │   ├── jb-birthday.mp4
    │   ├── jb-cats.mp4
    │   ├── haidilao-photo.mp4
    │   ├── haidilao-video.mp4
    │   └── sunrise-video.mp4
    └── chapter4/
        └── special-moment.mp4
```

### 步骤4: 上传文件

#### 方法1: 使用Git (推荐)
```bash
# 1. 将压缩后的视频复制到对应文件夹
cp compressed_videos/*.mp4 public/videos/chapter3/

# 2. 添加所有文件
git add .

# 3. 提交更改
git commit -m "Add compressed videos and images"

# 4. 推送到远程
git push origin main
```

#### 方法2: 使用GitHub网页界面
1. 访问您的GitHub仓库
2. 进入 `public/videos/chapter3/` 文件夹
3. 点击 "Add file" → "Upload files"
4. 拖拽压缩后的视频文件
5. 提交更改

### 步骤5: 验证上传

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
# 检查视频是否正常加载
```

## 🎵 音频文件处理

### 音频要求
- **格式**: MP3
- **质量**: 128kbps 或以上
- **时长**: 背景音乐3-5分钟，语音消息1分钟

### 音频文件列表
1. `a-town-with-an-ocean-view.mp3` - 封面音乐
2. `rain-love.mp3` - 第一章和第二章音乐
3. `left-person.mp3` - 第三章和第四章音乐
4. `deceive.mp3` - 第五章和第六章音乐
5. `voice-message.mp3` - 第五章语音消息

## 📸 图片文件处理

### 图片要求
- **格式**: JPG, PNG, WebP
- **尺寸**: 宽度800px以上
- **质量**: 清晰，光线良好

### 批量重命名脚本 (可选)

```bash
# 创建重命名脚本
cat > rename_images.sh << 'EOF'
#!/bin/bash

# 重命名第一章图片
cd public/images/chapter1/
mv "您的第一张照片.jpg" "coffee-shop.jpg"
mv "您的第二张照片.jpg" "beach-date.jpg"
mv "您的第三张照片.jpg" "shoulder-touch.jpg"
mv "您的第四张照片.jpg" "early-days.jpg"

# 重命名第二章图片 (根据您的实际照片)
cd ../chapter2/
# 住过的地方照片
for i in {1..20}; do
  mv "您的照片$i.jpg" "living-$i.jpg"
done

# 其他照片...
EOF

chmod +x rename_images.sh
```

## 🚀 部署选项

### 选项1: Vercel (推荐)
```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel

# 自动部署，支持大文件
```

### 选项2: Netlify
```bash
# 构建项目
npm run build

# 将dist文件夹上传到Netlify
# 支持大文件上传
```

### 选项3: GitHub Pages
```bash
# 安装gh-pages
npm install --save-dev gh-pages

# 添加部署脚本到package.json
# "deploy": "gh-pages -d dist"

# 部署
npm run deploy
```

## ⚡ 性能优化建议

1. **视频压缩**: 使用H.264编码，CRF 28
2. **图片优化**: 使用WebP格式，适当压缩
3. **懒加载**: 视频和图片按需加载
4. **CDN**: 使用CDN加速文件访问
5. **缓存**: 设置适当的缓存策略

## 🔧 故障排除

### 视频无法播放
1. 检查文件格式是否为MP4
2. 检查文件是否损坏
3. 检查网络连接
4. 查看浏览器控制台错误

### 文件过大
1. 进一步压缩视频
2. 降低分辨率到720p
3. 使用云存储服务

### 加载缓慢
1. 启用CDN
2. 使用懒加载
3. 预加载关键资源

## 📞 需要帮助？

如果遇到问题，请提供：
1. 错误信息截图
2. 文件大小和格式
3. 使用的压缩参数
4. 浏览器控制台日志
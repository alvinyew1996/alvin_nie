# GitHub 仓库设置指南

## 🚀 快速设置

### 1. 创建GitHub仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" 号，选择 "New repository"
3. 仓库名称建议：`memories-diary` 或 `our-story-3d`
4. 选择 "Public" 或 "Private"（根据你的需要）
5. 不要勾选 "Add a README file"（我们已经有了）
6. 点击 "Create repository"

### 2. 初始化本地Git仓库

```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "Initial commit: 3D Memory Diary Project"

# 添加远程仓库（替换YOUR_USERNAME和YOUR_REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 推送到GitHub
git push -u origin main
```

### 3. 启用GitHub Pages

1. 进入你的GitHub仓库页面
2. 点击 "Settings" 标签
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 下选择 "GitHub Actions"
5. 保存设置

### 4. 自动部署

项目已配置GitHub Actions，每次推送到main分支时会自动：
- 安装依赖
- 构建项目
- 部署到GitHub Pages

## 📁 文件上传

### 本地视频文件
将以下视频文件上传到 `videos/chapter3/local/` 文件夹：

- `chapter3_happy_daily.mp4` - 快乐日常
- `chapter3_airport_play.mp4` - 机场游玩  
- `chapter3_gift_giving.mp4` - 送礼物
- `chapter3_jb_cats.mp4` - 逗猫

### 图片文件
将照片上传到对应的章节文件夹：
- `images/chapter1/` - 第一章照片
- `images/chapter2/` - 第二章照片
- `images/chapter3/` - 第三章照片
- `images/chapter4/` - 第四章照片
- `images/chapter5/` - 第五章照片
- `images/chapter6/` - 第六章照片

### 音频文件
将音频文件上传到 `audio/` 文件夹：
- `a-town-with-an-ocean-view.mp3`
- `rain-love.mp3`
- `left-person.mp3`
- `lie.mp3`

## 🔗 Cloudinary视频链接

以下视频已配置为使用Cloudinary CDN：

### 第三章大容量视频
- JB庆祝生日：`https://res.cloudinary.com/dowr4almo/video/upload/v1760708502/videos_chapter3_jb_birthday_ymtob7.mp4`
- 海底捞视频1：`https://res.cloudinary.com/dowr4almo/video/upload/v1760708519/vidoes_chapter3_haidilao_1_jjn0yk.mp4`
- 海底捞视频2：`https://res.cloudinary.com/dowr4almo/video/upload/v1760708511/videos_chapter3_haidilao_2_hs1tmn.mp4`
- 日出视频：`https://res.cloudinary.com/dowr4almo/video/upload/v1760708520/videos_chapter3_sunrise_video_afunaj.mp4`

### 第四章重要视频
- 特别时刻：`https://res.cloudinary.com/dowr4almo/video/upload/v1760708507/videos_chapter4_important_smile_cxvpxn.mp4`

## 📝 提交更改

每次添加新文件后：

```bash
# 添加更改
git add .

# 提交更改
git commit -m "Add media files for chapter X"

# 推送到GitHub
git push origin main
```

## 🌐 访问网站

部署完成后，你的网站将在以下地址可用：
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📋 检查清单

- [ ] 创建GitHub仓库
- [ ] 初始化本地Git仓库
- [ ] 推送代码到GitHub
- [ ] 启用GitHub Pages
- [ ] 上传本地视频文件
- [ ] 上传图片文件
- [ ] 上传音频文件
- [ ] 测试网站功能
- [ ] 分享链接给朋友

## ❓ 常见问题

### Q: 视频无法播放？
A: 检查视频文件格式是否为MP4，编码是否为H.264

### Q: 音频无法播放？
A: 检查音频文件格式是否为MP3，文件大小是否合理

### Q: 图片无法显示？
A: 检查图片文件路径和命名是否正确

### Q: GitHub Pages部署失败？
A: 检查GitHub Actions日志，确保构建过程无错误

## 📞 技术支持

如果遇到问题，请检查：
1. 文件命名是否正确
2. 文件格式是否支持
3. 文件大小是否合理
4. GitHub Actions是否正常运行
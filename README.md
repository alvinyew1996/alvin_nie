# 我们之间的故事 - 3D回忆录网页

这是一个充满浪漫和回忆的3D交互式网页，记录了一段美好的感情故事。

## 功能特色

- 🎭 **3D破旧日记本效果** - 使用Three.js创建的逼真3D书本模型
- 📖 **现实翻页动画** - 模拟真实书本的翻页效果
- 🎵 **背景音乐系统** - 宫崎骏、杨丞琳、陈华、张碧晨的精选音乐
- ✨ **特殊视觉效果** - 星空、粒子、彩虹、泡泡等浪漫特效
- 📱 **响应式设计** - 适配各种设备屏幕
- 🎬 **视频播放支持** - 集成视频播放和音频控制

## 章节结构

### 封面
- 3D书本从侧面移动到正面
- 星空背景和月亮幸运草装饰
- 回访用户特殊消息

### 第一章：初遇
- 四张照片记录初次相遇
- 翻页动画效果
- 杨丞琳《雨爱》背景音乐

### 第二章：相处的日子
- 24个页面展示日常生活
- 多种照片布局（拼贴、网格、单张）
- 特殊标注和特效

### 第三章：旅行
- 奏折式横向滚动效果
- 19个页面记录旅行回忆
- 视频和照片混合展示
- 陈华《左边的人》背景音乐

### 第四章：那些笑容
- 特殊照片特效展示
- 重要视频播放
- 彩虹泡泡浪漫特效

### 第五章：我想对你说
- 语音消息播放
- 礼物照片拼贴展示
- 张碧晨《骗》背景音乐

### 第六章：结尾
- 书本合上动画
- 星空特效
- 温馨寄语文字动画

## 技术栈

- **Three.js** - 3D图形渲染
- **GSAP** - 动画控制
- **Howler.js** - 音频管理
- **Vite** - 构建工具
- **原生JavaScript** - 交互逻辑

## 快速开始

### 方法一：使用设置脚本
```bash
# 运行项目设置
./start.sh

# 运行GitHub设置
./github-setup.sh
```

### 方法二：手动设置

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

4. 设置GitHub仓库：
```bash
# 初始化Git仓库
git init
git add .
git commit -m "Initial commit"

# 添加远程仓库（替换为你的仓库URL）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## 文件结构

```
├── index.html              # 主页面
├── demo.html              # 演示页面
├── styles.css              # 样式文件
├── main.js                 # 主要逻辑
├── chapter-generator.js    # 章节内容生成器
├── package.json            # 项目配置
├── vite.config.js          # Vite配置
├── start.sh               # 启动脚本
├── github-setup.sh        # GitHub设置脚本
├── GITHUB_SETUP.md        # GitHub设置指南
├── images/                 # 图片资源
│   ├── chapter1/           # 第一章图片
│   ├── chapter2/           # 第二章图片
│   ├── chapter3/           # 第三章图片
│   ├── chapter4/           # 第四章图片
│   ├── chapter5/           # 第五章图片
│   └── chapter6/           # 第六章图片
├── videos/                 # 视频资源
│   ├── chapter3/           # 第三章视频
│   │   └── local/          # 本地小容量视频
│   └── chapter4/           # 第四章视频
└── audio/                  # 音频资源
    ├── a-town-with-an-ocean-view.mp3
    ├── rain-love.mp3
    ├── left-person.mp3
    └── lie.mp3
```

## 视频文件配置

### 本地视频文件
将小容量视频文件放入 `videos/chapter3/local/` 文件夹：
- `chapter3_happy_daily.mp4` - 快乐日常
- `chapter3_airport_play.mp4` - 机场游玩
- `chapter3_gift_giving.mp4` - 送礼物
- `chapter3_jb_cats.mp4` - 逗猫

### Cloudinary CDN视频
大容量视频已配置为使用Cloudinary CDN：
- JB庆祝生日视频
- 海底捞视频（2个）
- 日出视频
- 第四章重要视频

## 使用说明

1. **添加照片**：将照片放入对应的章节文件夹中
2. **添加视频**：将视频文件放入videos文件夹中
3. **添加音频**：将音频文件放入audio文件夹中
4. **自定义内容**：修改`chapter-generator.js`中的数据结构

### Git LFS 支持

本项目已配置 Git LFS 来管理大型媒体文件。添加新的音频、视频或图片文件时，它们会自动通过 Git LFS 进行跟踪和管理。

**使用指南**：
- [GIT_LFS_GUIDE.md](./GIT_LFS_GUIDE.md) - 完整的 Git LFS 使用指南
- [VSCODE_LFS_GUIDE.md](./VSCODE_LFS_GUIDE.md) - VS Code 中使用 Git LFS 的快速指南

**支持的文件类型**：
- 音频：mp3, wav, m4a, aac, ogg, flac
- 视频：mp4, mov, avi, mkv, wmv, flv, webm
- 图片：jpg, jpeg, png, gif, bmp, tiff, webp, svg, psd, ai
- 其他：zip, tar, gz, rar, 7z, pdf

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 注意事项

- 确保所有媒体文件格式正确
- 建议图片尺寸不超过2MB
- 视频文件建议使用MP4格式
- 音频文件建议使用MP3格式

## 许可证

MIT License
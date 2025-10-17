# 📹 视频上传指南

## 🎯 **视频分类和上传策略**

### **大容量视频 (100MB+) → Cloudinary**
这些视频需要上传到 Cloudinary 云存储：

1. **chapter3_jb_birthday** - JB庆祝生日
2. **chapter3_sunrise_video** - 日出视频  
3. **chapter3_haidilao_1** - 海底捞视频1
4. **chapter3_haidilao_2** - 海底捞视频2
5. **chapter4_special_smile** - 特殊笑容视频

**上传步骤**:
1. 登录 https://cloudinary.com/console
2. 进入 "Media Library"
3. 上传视频，确保文件名完全匹配上面的名称
4. 等待上传完成

### **小容量视频 (<100MB) → GitHub**
这些视频可以直接上传到 GitHub：

**需要上传的4个小视频**:
- 请告诉我这4个视频的具体名称和用途
- 我会帮您确定正确的文件夹位置

## 📁 **GitHub 文件夹结构**

```
public/
├── videos/
│   ├── chapter3/
│   │   ├── [小容量视频1]
│   │   ├── [小容量视频2]
│   │   └── [小容量视频3]
│   └── chapter4/
│       └── [小容量视频4]
```

## 🚀 **上传到 GitHub 的步骤**

### **方法1: 通过 Git 命令**
```bash
# 1. 将视频文件复制到对应文件夹
cp your-video1.mp4 public/videos/chapter3/
cp your-video2.mp4 public/videos/chapter3/
cp your-video3.mp4 public/videos/chapter3/
cp your-video4.mp4 public/videos/chapter4/

# 2. 添加到 Git
git add public/videos/

# 3. 提交更改
git commit -m "feat: Add small capacity videos"

# 4. 推送到 GitHub
git push origin main
```

### **方法2: 通过 GitHub 网页界面**
1. 访问您的 GitHub 仓库
2. 进入 `public/videos/chapter3/` 或 `public/videos/chapter4/`
3. 点击 "Add file" → "Upload files"
4. 拖拽视频文件上传
5. 填写提交信息并提交

## ⚠️ **注意事项**

### **GitHub 文件大小限制**
- 单个文件最大 100MB
- 如果视频超过 100MB，必须使用 Cloudinary

### **视频格式建议**
- 格式: MP4 (推荐)
- 编码: H.264
- 分辨率: 1280x720 或 1920x1080
- 比特率: 2-5 Mbps

### **性能优化**
- 小视频可以直接嵌入
- 大视频使用 Cloudinary CDN
- 自动根据设备调整质量

## 🔧 **配置更新**

上传完成后，我会帮您：
1. 更新配置文件
2. 测试视频播放
3. 优化加载性能
4. 处理错误情况

## 📞 **需要帮助？**

请告诉我：
1. 4个小视频的具体名称
2. 它们属于哪个章节
3. 视频文件大小
4. 您希望使用哪种上传方法

我会帮您完成所有配置！🚀
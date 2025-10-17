# 📸 分批上传指南

## 🎯 上传策略

由于照片数量较多（共104张），建议分批上传以避免GitHub限制和网络问题。

## 📋 分批计划

### 第零批：封面参考 (1张照片)
**优先级：⭐⭐⭐⭐⭐**
```
✅ 封面参考图片 (1张)
└── cover/cover-reference.jpg
```

### 第一批：核心章节 (14张照片)
**优先级：⭐⭐⭐⭐⭐**
```
✅ 第一章：初遇 (4张)
├── meeting1/meeting1.jpg
├── meeting2/meeting2.jpg  
├── meeting3/meeting3.jpg
└── meeting4/meeting4.jpg

✅ 第四章：那些笑容 (1张)
└── special-moment/special-moment.jpg

✅ 第六章：结尾 (1张)
└── final-photo/final-photo.jpg

✅ 第五章：个人照片 (9张)
└── individual-photos/photo1.jpg 到 photo9.jpg
```

### 第二批：旅行章节 (8张照片)
**优先级：⭐⭐⭐⭐**
```
✅ 第三章：旅行 (8张)
├── beach-toilet/beach-toilet1.jpg
├── home-visit/home1.jpg, home2.jpg
├── watch-borrowing/watch1.jpg
├── seafood-restaurant/seafood1.jpg
├── sunrise-forest/forest1.jpg
└── sunrise-waiting/sunrise1.jpg, sunrise2.jpg, sunrise3.jpg
```

### 第三批：第五章礼物 (11张照片)
**优先级：⭐⭐⭐**
```
✅ 第五章：礼物照片 (11张)
└── gift-photos/gift1.jpg 到 gift11.jpg
```

### 第四批A：第二章回忆 - 前半部分 (35张照片)
**优先级：⭐⭐**
```
✅ 第二章：相处的日子 - 前半部分 (35张)
├── living-place/ (20张)
├── work-companion/ (15张)
```

### 第四批B：第二章回忆 - 后半部分 (35张照片)
**优先级：⭐⭐**
```
✅ 第二章：相处的日子 - 后半部分 (35张)
├── bedok-memories/ (2张)
├── heartbreaking-photos/ (3张)
├── bite-marks/ (1张)
├── stolen-photos/ (1张)
├── funny-photos/ (2张)
├── worried-about-lost/ (1张)
├── bed-sheet-shopping/ (3张)
├── drinks-prepared/ (3张)
├── gift-basket/ (1张)
├── food-queuing/ (3张)
├── thank-you-wine/ (1张)
├── companion-gratitude/ (3张)
└── chat-records/ (21张)
```

## 🚀 上传步骤

### 步骤0：上传封面参考图片
1. 上传夜空+月亮+幸运草的参考图片
2. 命名为 `cover-reference.jpg`
3. 上传到 `images/cover/` 文件夹

### 步骤1：准备第一批照片
1. 选择第一批的14张照片
2. 按照文件夹结构重命名
3. 压缩照片（每张不超过2MB）
4. 上传到对应文件夹

### 步骤2：测试网站功能
1. 提交到GitHub
2. 访问网站测试
3. 确保所有功能正常

### 步骤3：继续后续批次
1. 按照优先级继续上传
2. 每次上传后测试功能
3. 确保没有遗漏

### 步骤4：第二章分批上传
1. **第四批A**：先上传living-place和work-companion (35张)
2. 测试网站功能，确保照片显示正常
3. **第四批B**：再上传其余12个组别 (35张)
4. 最终测试所有功能

## 📁 文件命名规则

### 统一命名格式
```
章节文件夹/子文件夹/文件名.jpg
```

### 示例
```
images/chapter1/meeting1/meeting1.jpg
images/chapter2/living-place/living1.jpg
images/chapter3/beach-toilet/beach-toilet1.jpg
```

## 🔧 技术建议

### 照片压缩
- 使用在线工具压缩：tinypng.com
- 目标大小：每张不超过2MB
- 保持原始比例

### 批量重命名
- Windows：使用PowerShell或第三方工具
- Mac：使用Automator或终端
- 在线工具：bulkrenameutility.co.uk

### 上传工具
- GitHub网页界面（推荐）
- GitHub Desktop
- Git命令行

## ⚠️ 注意事项

1. **文件大小限制**：GitHub单文件限制100MB
2. **网络稳定性**：建议在网络稳定时上传
3. **备份重要**：上传前备份原始照片
4. **测试优先**：每批上传后都要测试网站

## 📞 技术支持

如果遇到问题：
1. 检查文件命名是否正确
2. 确认文件大小是否超限
3. 验证文件夹结构是否匹配
4. 查看GitHub上传状态

## 🎉 完成检查清单

- [ ] 第零批：1张封面参考图片上传完成
- [ ] 第一批：14张照片上传完成
- [ ] 网站基本功能测试通过
- [ ] 第二批：8张照片上传完成
- [ ] 第三批：20张照片上传完成
- [ ] 第四批A：35张照片上传完成 (living-place + work-companion)
- [ ] 第四批B：35张照片上传完成 (其余12个组别)
- [ ] 所有功能测试通过
- [ ] 网站部署成功
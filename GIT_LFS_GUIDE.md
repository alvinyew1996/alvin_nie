# Git LFS 使用指南 / Git LFS Usage Guide

## 什么是 Git LFS？/ What is Git LFS?

Git LFS (Large File Storage) 是一个 Git 扩展，用于更有效地处理大型文件。它将大文件存储在单独的服务器上，而在 Git 仓库中只保留指针，从而提高性能。

Git LFS (Large File Storage) is a Git extension for handling large files more efficiently. It stores large files on a separate server and keeps only pointers in the Git repository, improving performance.

## 已配置的文件类型 / Configured File Types

本仓库已配置 Git LFS 跟踪以下文件类型：

This repository is configured to track the following file types with Git LFS:

### 音频文件 / Audio Files
- `*.mp3`, `*.wav`, `*.m4a`, `*.aac`, `*.ogg`, `*.flac`

### 视频文件 / Video Files
- `*.mp4`, `*.mov`, `*.avi`, `*.mkv`, `*.wmv`, `*.flv`, `*.webm`

### 图片文件 / Image Files
- `*.jpg`, `*.jpeg`, `*.png`, `*.gif`, `*.bmp`, `*.tiff`, `*.webp`, `*.svg`, `*.psd`, `*.ai`

### 其他大型文件 / Other Large Files
- `*.zip`, `*.tar`, `*.gz`, `*.rar`, `*.7z`, `*.pdf`

## 在 VS Code 中使用 Git LFS / Using Git LFS in VS Code

### 1. 确保已安装 Git LFS / Ensure Git LFS is Installed

```bash
# 检查 Git LFS 版本 / Check Git LFS version
git lfs version

# 如果未安装，请安装 / If not installed, install it
# macOS (使用 Homebrew)
brew install git-lfs

# Windows (使用 Chocolatey)
choco install git-lfs

# Ubuntu/Debian
sudo apt-get install git-lfs

# 安装后初始化 / Initialize after installation
git lfs install
```

### 2. 克隆仓库 / Clone Repository

```bash
# 克隆仓库时会自动下载 LFS 文件 / LFS files are downloaded automatically when cloning
git clone https://github.com/alvinyew1996/alvin_nie.git
cd alvin_nie
```

### 3. 添加新的大文件 / Add New Large Files

当你添加新的媒体文件时，Git LFS 会自动处理：

When you add new media files, Git LFS handles them automatically:

#### 在 VS Code 中 / In VS Code:

1. **添加文件** / **Add Files**
   - 将新的媒体文件复制到相应文件夹（audio/、images/、videos/）
   - Copy new media files to appropriate folders (audio/, images/, videos/)

2. **使用 VS Code 的 Git 面板** / **Use VS Code Git Panel**
   - 打开源代码管理面板 (Ctrl+Shift+G 或 ⌘+Shift+G)
   - Open Source Control panel (Ctrl+Shift+G or ⌘+Shift+G)
   - 点击 "+" 号暂存文件
   - Click "+" to stage files
   - 输入提交信息
   - Enter commit message
   - 点击 "✓" 提交
   - Click "✓" to commit

3. **推送到 GitHub** / **Push to GitHub**
   - 点击 "..." 菜单
   - Click "..." menu
   - 选择 "推送" / "Push"
   - Select "Push"
   - Git LFS 会自动上传大文件到 LFS 服务器
   - Git LFS automatically uploads large files to LFS server

#### 在命令行中 / In Command Line:

```bash
# 添加文件 / Add files
git add audio/new-song.mp3

# 提交 / Commit
git commit -m "Add new audio file"

# 推送 / Push
git push
```

### 4. 查看 LFS 状态 / Check LFS Status

```bash
# 查看 LFS 跟踪的文件 / View LFS tracked files
git lfs ls-files

# 查看 LFS 状态 / View LFS status
git lfs status

# 查看跟踪的模式 / View tracked patterns
git lfs track
```

### 5. 手动迁移现有文件到 LFS / Manually Migrate Existing Files to LFS

如果仓库中已有大文件需要迁移到 LFS：

If there are existing large files in the repository that need to be migrated to LFS:

```bash
# 迁移特定文件类型 / Migrate specific file types
git lfs migrate import --include="*.mp3,*.mp4,*.jpg,*.png"

# 推送迁移后的更改 / Push migrated changes
git push --force
```

**注意**: 使用 `--force` 会重写历史记录，请谨慎使用。
**Note**: Using `--force` rewrites history, use with caution.

## VS Code 扩展推荐 / Recommended VS Code Extensions

为了更好的 Git LFS 体验，推荐安装以下扩展：

For a better Git LFS experience, install these extensions:

1. **GitLens** - 增强的 Git 功能 / Enhanced Git capabilities
2. **Git Graph** - 可视化 Git 历史 / Visualize Git history
3. **Git History** - 查看文件历史 / View file history

## 常见问题 / Common Issues

### 问题1：克隆时文件未下载 / Issue 1: Files Not Downloaded When Cloning

**解决方案** / **Solution**:
```bash
git lfs pull
```

### 问题2：推送失败 / Issue 2: Push Fails

**可能原因** / **Possible Causes**:
- GitHub LFS 存储配额已满 / GitHub LFS storage quota exceeded
- 网络问题 / Network issues

**解决方案** / **Solution**:
```bash
# 检查 LFS 带宽和存储使用情况 / Check LFS bandwidth and storage usage
git lfs env

# 重试推送 / Retry push
git push
```

### 问题3：查看 LFS 文件大小 / Issue 3: View LFS File Sizes

```bash
# 查看所有 LFS 文件及其大小 / View all LFS files and their sizes
git lfs ls-files --size
```

## 最佳实践 / Best Practices

1. **总是提交前检查** / **Always Check Before Committing**
   - 确认大文件会被 LFS 跟踪 / Confirm large files will be tracked by LFS
   - 使用 `git lfs status` 检查 / Use `git lfs status` to check

2. **定期清理** / **Regular Cleanup**
   ```bash
   # 清理本地 LFS 缓存 / Clean local LFS cache
   git lfs prune
   ```

3. **不要跟踪小文件** / **Don't Track Small Files**
   - LFS 适用于大文件（>1MB）/ LFS is for large files (>1MB)
   - 小文件使用普通 Git 跟踪 / Use regular Git for small files

4. **在 .gitignore 中排除临时文件** / **Exclude Temporary Files in .gitignore**
   - 避免意外提交不必要的大文件 / Avoid accidentally committing unnecessary large files

## 配置文件 / Configuration Files

本仓库的 Git LFS 配置在以下文件中：

Git LFS configuration for this repository is in:

- `.gitattributes` - LFS 跟踪规则 / LFS tracking rules
- `.git/hooks/` - Git LFS hooks (自动安装) / Git LFS hooks (auto-installed)

## 更多资源 / More Resources

- [Git LFS 官方文档 / Official Documentation](https://git-lfs.github.com/)
- [GitHub LFS 教程 / GitHub LFS Tutorial](https://docs.github.com/en/repositories/working-with-files/managing-large-files)
- [VS Code Git 文档 / VS Code Git Documentation](https://code.visualstudio.com/docs/editor/versioncontrol)

## 技术支持 / Support

如果遇到问题，请：
If you encounter issues, please:

1. 检查 Git LFS 版本是否最新 / Check if Git LFS is up to date
2. 查看 GitHub 仓库的 LFS 设置 / Review GitHub repository LFS settings
3. 在仓库中创建 issue / Create an issue in the repository

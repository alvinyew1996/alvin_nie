# VS Code 中使用 Git LFS 快速指南
# Quick Guide: Using Git LFS in VS Code

## 一键添加和提交大文件 / Add and Commit Large Files in One Go

### 方法 1：使用 VS Code 图形界面 / Method 1: Using VS Code GUI

1. **打开源代码管理 / Open Source Control**
   - 快捷键：`Ctrl+Shift+G` (Windows/Linux) 或 `⌘+Shift+G` (Mac)
   - Shortcut: `Ctrl+Shift+G` (Windows/Linux) or `⌘+Shift+G` (Mac)

2. **添加新的媒体文件 / Add New Media Files**
   - 将文件复制到 `audio/`、`images/` 或 `videos/` 文件夹
   - Copy files to `audio/`, `images/`, or `videos/` folders
   - **重要**: 这些文件夹在 `.gitignore` 中被忽略
   - **Important**: These folders are ignored in `.gitignore`

3. **在源代码管理中强制添加 / Force Add in Source Control**
   - 在源代码管理面板中，你不会看到被忽略的文件
   - In the Source Control panel, you won't see ignored files
   - **解决方案**: 使用终端或修改 `.gitignore`
   - **Solution**: Use the terminal or modify `.gitignore`

### 方法 2：使用 VS Code 集成终端（推荐）/ Method 2: Using VS Code Integrated Terminal (Recommended)

1. **打开终端 / Open Terminal**
   - 快捷键 / Shortcut: `` Ctrl+` `` (反引号键 / backtick key)

2. **强制添加文件 / Force Add Files**
   ```bash
   # 添加单个文件 / Add single file
   git add -f audio/new-song.mp3
   
   # 添加多个文件 / Add multiple files
   git add -f audio/*.mp3
   git add -f images/chapter1/*.jpg
   
   # 查看将要提交的内容 / View what will be committed
   git status
   ```

3. **提交更改 / Commit Changes**
   ```bash
   git commit -m "Add new media files with Git LFS"
   ```

4. **推送到 GitHub / Push to GitHub**
   ```bash
   git push
   ```
   
   你会看到 Git LFS 上传文件：
   You'll see Git LFS uploading files:
   ```
   Uploading LFS objects: 100% (3/3), 15 MB | 0 B/s, done.
   ```

### 方法 3：一键完成（命令链）/ Method 3: One Command (Command Chain)

```bash
# 添加、提交并推送 / Add, commit, and push
git add -f audio/new-song.mp3 && git commit -m "Add new audio file" && git push
```

## 修改 .gitignore 以简化工作流 / Modify .gitignore to Simplify Workflow

如果你经常添加媒体文件，可以修改 `.gitignore` 来避免每次都使用 `-f`：

If you frequently add media files, modify `.gitignore` to avoid using `-f` every time:

### 选项 A：完全允许媒体文件 / Option A: Allow All Media Files

在 `.gitignore` 中注释掉这些行：
Comment out these lines in `.gitignore`:

```bash
# 注释掉 / Comment out:
# audio/**/*.mp3
# audio/**/*.wav
# audio/**/*.m4a
# images/chapter*/**/*.jpg
# images/chapter*/**/*.png
# images/chapter*/**/*.gif
# videos/chapter*/**/*.mp4
# videos/chapter*/**/*.mov
# videos/chapter*/**/*.avi
```

### 选项 B：只允许特定文件夹 / Option B: Allow Specific Folders

添加例外规则（在忽略规则之后）：
Add exception rules (after ignore rules):

```bash
# 忽略所有音频 / Ignore all audio
audio/**/*.mp3

# 但允许特定文件夹 / But allow specific folder
!audio/approved/*.mp3
```

## VS Code 中的 Git LFS 工作流程 / Git LFS Workflow in VS Code

### 标准工作流 / Standard Workflow

```bash
# 1. 复制文件到项目 / Copy files to project
# 将文件放入 audio/, images/, 或 videos/
# Put files in audio/, images/, or videos/

# 2. 在 VS Code 终端中 / In VS Code terminal
git add -f audio/new-song.mp3

# 3. 检查 LFS 状态 / Check LFS status
git lfs status
# 输出 / Output:
# Objects to be committed:
#   audio/new-song.mp3 (LFS: c036cbb)

# 4. 提交 / Commit
git commit -m "Add new song"

# 5. 推送 / Push (Git LFS 会自动上传大文件)
git push
```

## 验证 Git LFS 是否正常工作 / Verify Git LFS is Working

### 检查文件是否被 LFS 跟踪 / Check if File is Tracked by LFS

```bash
# 添加文件后 / After adding file
git lfs ls-files

# 输出显示文件被 LFS 跟踪 / Output shows file tracked by LFS:
# c036cbb755 * audio/new-song.mp3
```

### 查看 LFS 指针 / View LFS Pointer

```bash
# 查看提交后的文件内容 / View file content after commit
git show HEAD:audio/new-song.mp3

# 输出应该是 LFS 指针，不是实际文件 / Output should be LFS pointer, not actual file:
# version https://git-lfs.github.com/spec/v1
# oid sha256:c036cbb755...
# size 5242880
```

## 常见错误和解决方案 / Common Errors and Solutions

### 错误 1：文件被 .gitignore 忽略 / Error 1: File Ignored by .gitignore

```bash
# 错误信息 / Error message:
# The following paths are ignored by one of your .gitignore files:
# audio/song.mp3

# 解决方案 / Solution:
git add -f audio/song.mp3
```

### 错误 2：推送失败 / Error 2: Push Failed

```bash
# 错误信息 / Error message:
# batch response: This repository is over its data quota.

# 原因 / Cause:
# GitHub LFS 存储配额已满
# GitHub LFS storage quota exceeded

# 解决方案 / Solution:
# 1. 检查 GitHub 仓库设置中的 LFS 使用情况
# 2. 升级 GitHub 账户或购买额外存储
# 3. 清理不需要的 LFS 对象
```

### 错误 3：文件未被 LFS 跟踪 / Error 3: File Not Tracked by LFS

```bash
# 检查 .gitattributes / Check .gitattributes
cat .gitattributes

# 应该包含 / Should contain:
# *.mp3 filter=lfs diff=lfs merge=lfs -text

# 如果没有，重新跟踪文件类型 / If not, re-track file type:
git lfs track "*.mp3"
```

## VS Code 扩展推荐 / Recommended VS Code Extensions

1. **GitLens** (eamodio.gitlens)
   - 增强的 Git 功能 / Enhanced Git capabilities
   - 可视化 Git blame 和历史 / Visualize Git blame and history

2. **Git Graph** (mhutchie.git-graph)
   - 图形化显示 Git 分支和提交 / Graphical view of branches and commits

3. **Git History** (donjayamanne.githistory)
   - 查看文件历史和比较 / View file history and compare

## 快捷键总结 / Keyboard Shortcuts Summary

| 操作 / Action | Windows/Linux | Mac |
|--------------|---------------|-----|
| 源代码管理 / Source Control | `Ctrl+Shift+G` | `⌘+Shift+G` |
| 打开终端 / Open Terminal | `` Ctrl+` `` | `` ⌘+` `` |
| 新终端 / New Terminal | `` Ctrl+Shift+` `` | `` ⌘+Shift+` `` |
| 命令面板 / Command Palette | `Ctrl+Shift+P` | `⌘+Shift+P` |

## 完整示例工作流程 / Complete Example Workflow

```bash
# 步骤 1：添加新的音频文件
# Step 1: Add new audio file
cp ~/Downloads/new-song.mp3 audio/

# 步骤 2：在 VS Code 中打开终端 (Ctrl+`)
# Step 2: Open terminal in VS Code (Ctrl+`)

# 步骤 3：强制添加文件
# Step 3: Force add file
git add -f audio/new-song.mp3

# 步骤 4：验证 LFS 跟踪
# Step 4: Verify LFS tracking
git lfs status
# 输出 / Output: Objects to be committed: audio/new-song.mp3 (LFS: ...)

# 步骤 5：提交更改
# Step 5: Commit changes
git commit -m "Add new song with Git LFS"

# 步骤 6：推送到 GitHub
# Step 6: Push to GitHub
git push
# 输出 / Output: Uploading LFS objects: 100% (1/1), 5.2 MB | 0 B/s

# 完成！/ Done!
```

## 注意事项 / Important Notes

1. **Git LFS 配额** / **Git LFS Quota**
   - GitHub 免费账户：1 GB 存储，1 GB/月带宽
   - GitHub Free: 1 GB storage, 1 GB/month bandwidth
   - 超出需要购买额外配额
   - Additional quota must be purchased if exceeded

2. **文件大小建议** / **File Size Recommendations**
   - 使用 LFS：>1 MB 的文件
   - Use LFS for: Files >1 MB
   - 不需要 LFS：<1 MB 的文件
   - No LFS needed for: Files <1 MB

3. **性能优化** / **Performance Optimization**
   - 定期运行 `git lfs prune` 清理本地缓存
   - Regularly run `git lfs prune` to clean local cache
   - 只克隆最近的提交：`git clone --depth 1`
   - Clone only recent commits: `git clone --depth 1`

## 获取帮助 / Get Help

```bash
# Git LFS 帮助 / Git LFS help
git lfs help

# 查看 LFS 配置 / View LFS configuration
git lfs env

# 检查 LFS 版本 / Check LFS version
git lfs version
```

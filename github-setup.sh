#!/bin/bash

echo "🚀 GitHub 仓库设置向导"
echo "======================"
echo ""

# 检查Git是否安装
if ! command -v git &> /dev/null; then
    echo "❌ 错误：未找到Git，请先安装Git"
    echo "   下载地址：https://git-scm.com/"
    exit 1
fi

echo "✅ Git 已安装"
echo ""

# 获取用户输入
read -p "请输入你的GitHub用户名: " GITHUB_USERNAME
read -p "请输入仓库名称 (建议: memories-diary): " REPO_NAME

if [ -z "$GITHUB_USERNAME" ] || [ -z "$REPO_NAME" ]; then
    echo "❌ 错误：用户名和仓库名称不能为空"
    exit 1
fi

echo ""
echo "📋 设置信息："
echo "   用户名: $GITHUB_USERNAME"
echo "   仓库名: $REPO_NAME"
echo "   仓库URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""

read -p "确认继续？(y/n): " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "❌ 操作已取消"
    exit 1
fi

echo ""
echo "🔧 正在设置Git仓库..."

# 初始化Git仓库
if [ ! -d ".git" ]; then
    git init
    echo "✅ 初始化Git仓库"
else
    echo "✅ Git仓库已存在"
fi

# 添加文件
git add .
echo "✅ 添加文件到Git"

# 创建初始提交
git commit -m "Initial commit: 3D Memory Diary Project with Cloudinary integration"
echo "✅ 创建初始提交"

# 添加远程仓库
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo "✅ 添加远程仓库"

echo ""
echo "📝 下一步操作："
echo "1. 在GitHub上创建仓库: https://github.com/new"
echo "2. 仓库名称: $REPO_NAME"
echo "3. 选择 Public 或 Private"
echo "4. 不要勾选 'Add a README file'"
echo "5. 点击 'Create repository'"
echo ""
echo "6. 创建仓库后，运行以下命令推送代码："
echo "   git push -u origin main"
echo ""
echo "7. 在GitHub仓库设置中启用GitHub Pages："
echo "   - 进入 Settings > Pages"
echo "   - Source 选择 'GitHub Actions'"
echo ""
echo "8. 上传媒体文件到对应文件夹"
echo "9. 访问你的网站: https://$GITHUB_USERNAME.github.io/$REPO_NAME"
echo ""

read -p "是否现在推送代码到GitHub？(y/n): " PUSH_NOW
if [ "$PUSH_NOW" = "y" ] || [ "$PUSH_NOW" = "Y" ]; then
    echo ""
    echo "🚀 正在推送代码到GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 代码推送成功！"
        echo ""
        echo "📋 接下来请："
        echo "1. 在GitHub仓库设置中启用GitHub Pages"
        echo "2. 上传媒体文件到对应文件夹"
        echo "3. 等待GitHub Actions自动部署"
        echo "4. 访问: https://$GITHUB_USERNAME.github.io/$REPO_NAME"
    else
        echo ""
        echo "❌ 推送失败，请检查："
        echo "1. 是否已在GitHub上创建仓库"
        echo "2. 仓库名称是否正确"
        echo "3. 网络连接是否正常"
    fi
fi

echo ""
echo "📚 详细说明请查看 GITHUB_SETUP.md 文件"
echo "🎭 项目设置完成！"
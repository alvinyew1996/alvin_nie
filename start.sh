#!/bin/bash

echo "🎭 我们之间的故事 - 3D回忆录网页"
echo "=================================="
echo ""

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未找到Node.js，请先安装Node.js"
    echo "   下载地址：https://nodejs.org/"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误：未找到npm，请先安装npm"
    exit 1
fi

echo "✅ Node.js 和 npm 已安装"
echo ""

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装项目依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
    echo ""
fi

# 检查媒体文件
echo "📁 检查媒体文件..."
missing_files=0

# 检查音频文件
audio_files=("audio/a-town-with-an-ocean-view.mp3" "audio/rain-love.mp3" "audio/left-person.mp3" "audio/lie.mp3")
for file in "${audio_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "⚠️  缺少音频文件：$file"
        missing_files=$((missing_files + 1))
    fi
done

# 检查示例图片
if [ ! -f "images/chapter1/meeting1.jpg" ]; then
    echo "⚠️  缺少示例图片，请添加照片到对应文件夹"
    missing_files=$((missing_files + 1))
fi

if [ $missing_files -gt 0 ]; then
    echo ""
    echo "💡 提示：请添加媒体文件到对应文件夹，或查看各文件夹中的README.md了解详细说明"
    echo ""
fi

echo "🚀 启动开发服务器..."
echo "   项目将在 http://localhost:3000 打开"
echo "   按 Ctrl+C 停止服务器"
echo ""

# 启动开发服务器
npm run dev
// 项目设置和初始化脚本
console.log('🎭 我们之间的故事 - 3D回忆录网页');
console.log('正在初始化项目...');

// 检查必要的文件夹
const fs = require('fs');
const path = require('path');

const requiredFolders = [
    'images/chapter1',
    'images/chapter2', 
    'images/chapter3',
    'images/chapter4',
    'images/chapter5',
    'images/chapter6',
    'videos/chapter3',
    'videos/chapter4',
    'audio'
];

console.log('📁 检查文件夹结构...');
requiredFolders.forEach(folder => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
        console.log(`✅ 创建文件夹: ${folder}`);
    } else {
        console.log(`📁 文件夹已存在: ${folder}`);
    }
});

// 创建示例文件
console.log('📝 创建示例文件...');

// 创建图片占位符说明
const imageReadme = `# 图片文件说明

## 第一章：初遇 (4张照片)
- meeting1.jpg - 第一次相遇的面包咖啡店
- meeting2.jpg - 第二次见面
- meeting3.jpg - 海边约会
- meeting4.jpg - 搭肩膀的照片

## 第二章：相处的日子 (24个页面)
请按照以下命名规则放置照片：
- 住过的地方: living-place-1.jpg 到 living-place-20.jpg
- Lok Lok店: lok-lok.jpg
- 工作陪伴: work-1.jpg 到 work-15.jpg
- 其他组别按照组名命名

## 第三章：旅行 (19个页面)
- 海边厕所: beach-toilet.jpg
- 快乐日常: happy-daily.mp4
- 机场游玩: airport-fun.mp4
- 其他按照组名命名

## 第四章：那些笑容 (2个页面)
- special-moment.jpg - 最重要的照片
- special-moment.mp4 - 最重要的视频

## 第五章：我想对你说 (12个页面)
- photo1.jpg 到 photo9.jpg - 个人照片
- gift1.jpg 到 gift11.jpg - 礼物照片

## 第六章：结尾 (1个页面)
- final-photo.jpg - 最后的照片

注意：所有图片建议尺寸不超过2MB，格式为JPG或PNG
`;

fs.writeFileSync('images/README.md', imageReadme);

// 创建音频文件说明
const audioReadme = `# 音频文件说明

请将以下音频文件放入 audio 文件夹：

1. a-town-with-an-ocean-view.mp3 - 宫崎骏《魔女宅急便》插曲
2. rain-love.mp3 - 杨丞琳《雨爱》
3. left-person.mp3 - 陈华《左边的人》
4. lie.mp3 - 张碧晨《骗》

注意：音频文件建议使用MP3格式，文件大小不超过10MB
`;

fs.writeFileSync('audio/README.md', audioReadme);

// 创建视频文件说明
const videoReadme = `# 视频文件说明

## 第三章视频
- happy-daily.mp4 - 快乐日常
- airport-fun.mp4 - 机场游玩
- gift-giving.mp4 - 送礼物
- jb-birthday.mp4 - JB庆祝生日
- cat-playing.mp4 - 逗猫
- sunrise-together.mp4 - 一起看日出

## 第四章视频
- special-moment.mp4 - 特别时刻视频

注意：视频文件建议使用MP4格式，分辨率不超过1080p，文件大小不超过50MB
`;

fs.writeFileSync('videos/README.md', videoReadme);

console.log('✅ 项目初始化完成！');
console.log('');
console.log('📋 下一步操作：');
console.log('1. 将照片放入对应的 images/chapter* 文件夹');
console.log('2. 将视频放入 videos/chapter* 文件夹');
console.log('3. 将音频文件放入 audio 文件夹');
console.log('4. 运行 npm install 安装依赖');
console.log('5. 运行 npm run dev 启动开发服务器');
console.log('');
console.log('💡 提示：请查看各文件夹中的 README.md 文件了解详细的文件命名规则');
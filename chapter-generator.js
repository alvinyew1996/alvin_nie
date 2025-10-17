// 章节内容生成器
class ChapterGenerator {
    constructor() {
        this.chapterData = {
            chapter1: {
                pages: 4,
                photos: [
                    { src: 'images/chapter1/meeting1.jpg', text: '那天我怀着忐忑的心进入了自己不熟悉的领域和工作地点，但我却在那天遇见了你，在这里的一切是我和你的开始。', duration: 8000 },
                    { src: 'images/chapter1/meeting2.jpg', text: '' },
                    { src: 'images/chapter1/meeting3.jpg', text: '这是第一次单独约我出来去海边，愿意分享你的心事给我，那晚我心跳加速了' },
                    { src: 'images/chapter1/meeting4.jpg', text: '在最初遇见的三四月里，你主动的把手搭到我肩膀上了，让我很是高兴又苦恼，高兴的是你愿意靠近我了，苦恼的是我不知道该不该亲近你还是保持距离 😊' }
                ]
            },
            chapter2: {
                pages: 24,
                groups: [
                    {
                        name: '住过的地方',
                        photos: 20,
                        pages: 4,
                        text: '我们在一起住过的地方的日子里',
                        specialNote: { photo: 17, text: '在这里开始有了想和你一起住的幻想' }
                    },
                    {
                        name: 'Lok Lok店',
                        photos: 1,
                        pages: 1,
                        text: '你最爱吃的Lok Lok店'
                    },
                    {
                        name: '工作陪伴',
                        photos: 15,
                        pages: 4,
                        text: '喜欢陪你吃东西也喜欢待在你身边看着你吃，真的一次都不想跟你错过',
                        subGroups: [
                            { photos: 4, text: '因为喜欢看你工作其实很常去你的店看你' },
                            { photos: 4, text: '总是陪着你吃宵夜哪怕是半夜12点，我也一样出门陪着你吃好吃的酿豆腐。每次都会主动跟你提打包宵夜，经常等你回来陪你吃。每次打包mcd都可以打包一大堆食物，然后回家等你回来我们开开心心的一起吃。' },
                            { photos: 4, text: '我为你找的韩国餐就是想跟你一起吃。每次你也喜欢跟我一次吃多多的炒煮的食物，我知道都是你请客，我其实很愧疚噢。' },
                            { photos: 3, text: '谢谢你让我吃那么好吃的蛋糕。好吃的日本餐。以前在bedok还经常买水果当饭后甜点。' }
                        ]
                    },
                    {
                        name: 'Bedok遗漏',
                        photos: 2,
                        pages: 1,
                        text: '在bedok，你总会遗漏东西在我的房间里'
                    },
                    {
                        name: '心疼照片',
                        photos: 3,
                        pages: 1,
                        text: '总是发给我一些让我非常心疼你的照片',
                        effect: 'heartbreaking'
                    },
                    {
                        name: '咬痕',
                        photos: 1,
                        pages: 1,
                        text: '被咬得可疼了，但是又很喜欢她咬我。我喜欢的人咬我的痕迹'
                    },
                    {
                        name: '偷拍',
                        photos: 1,
                        pages: 1,
                        text: '我第一次鼓起勇气偷拍了你'
                    },
                    {
                        name: '搞怪照片',
                        photos: 2,
                        pages: 1,
                        text: '总会发给你我搞怪的照片',
                        effect: 'playful'
                    },
                    {
                        name: '担心迷路',
                        photos: 1,
                        pages: 1,
                        text: '无论什么时候都担心你迷路，哪怕自己在工作'
                    },
                    {
                        name: '床单挑选',
                        photos: 3,
                        pages: 1,
                        text: '为了生活多样化一些，特地在那里一直挑选一个小时多的床单，摊主都怀疑我要偷床单呢哈哈'
                    },
                    {
                        name: '预备饮料',
                        photos: 3,
                        pages: 1,
                        text: '总会预备饮料给你喝，就怕你懒惰出门又想喝饮料'
                    },
                    {
                        name: '礼篮分享',
                        photos: 1,
                        pages: 1,
                        text: '拿到礼篮第一个就是想跟你一起分享'
                    },
                    {
                        name: '食物排队',
                        photos: 3,
                        pages: 1,
                        text: '只要是你喜欢的食物或者是好吃的，无论是在哪里，需要花多少时间我都愿意帮你弄来吃，只为了让你尝一口，包括月饼也是，很多时候都会花上半天时间，就等你放工回来吃。',
                        subTexts: [
                            '为了买到好吃的tart给你吃，我排了一个小时多的队结果cheese tart卖完了，只能买tiramisu tar，其实觉得很伤心，但看到你工作回来时，给你吃的那时候你说已经很满足了，我又觉得很高兴一切都值得的',
                            '看到很多人买abang balik就忍不住想排队买给你吃，只不过没有干的（因为你喜欢吃），只有湿的。'
                        ]
                    },
                    {
                        name: '送酒',
                        photos: 1,
                        pages: 1,
                        text: '谢谢你最后送我的酒，我在海边喝了它'
                    },
                    {
                        name: '陪伴感谢',
                        photos: 3,
                        pages: 1,
                        text: '很感谢这两年半来一直都有你的陪伴',
                        effect: 'grateful'
                    },
                    {
                        name: '聊天记录',
                        photos: 21,
                        pages: 1,
                        text: '其实我真的有努力跟你聊天噢，这两年来很明显有了很大的改变，一切其实都是为了你，而且不管你在机场还是KOB我都有问你几点到家，到家了一定要通知我，要吃宵夜也不要客气一定要跟我说。',
                        effect: 'rapidShow'
                    }
                ]
            },
            chapter3: {
                pages: 19,
                groups: [
                    { name: '海边厕所', photos: 1, text: '每次陪她疯，在她喝酒喝醉时我都很着急，担心她有危险。' },
                    { name: '快乐日常', videos: 1, text: '这是我们最快乐的日常，我都会陪伴她，也许我很多东西都不会，但是我真心想要在她身边一直对她好，照顾她', videoSource: 'local' },
                    { name: '机场游玩', videos: 1, text: '我们一起去机场玩了，好开心。', videoSource: 'local' },
                    { name: '回家乡', photos: 2, text: '来到新加坡以后第一次回家乡还是想到了你，也是第一次帮你和你爸爸买了衣裤。' },
                    { name: '手表借用', photos: 1, text: '借用你的手表去打球了嘻嘻，也很感谢你偶尔会去球场看我打球甚至是比赛，我都会非常高兴。' },
                    { name: '送礼物', videos: 1, text: '这是真正意义上这一次送你的礼物 😰', videoSource: 'local' },
                    { name: '节日排队', photos: 7, text: '就算是陪家人一起过节，我偷偷的为了你排了一个小时多的队就只为了可以买到你说你很喜欢的系列。', subTexts: ['为了买到你喜欢的我不甘心买了好几个。', '看到感觉是你喜欢的东西我就会买给你'] },
                    { name: '朋友制作礼物', photos: 4, text: '就算跟朋友出去也想着你，为了你很认真的制作礼物，甚至没太多跟朋友聊天，真的就一直在想怎么做到最好的给你' },
                    { name: 'JB游玩', videos: 1, text: '去JB游玩还有一起庆祝生日最开心了', videoSource: 'cloudinary', videoUrl: 'https://res.cloudinary.com/dowr4almo/video/upload/v1760708502/videos_chapter3_jb_birthday_ymtob7.mp4' },
                    { name: '逗猫', videos: 1, text: '在jb时其实很想带她去逗猫可是时间不够', videoSource: 'local' },
                    { name: '海鲜餐厅', photos: 1, text: '很好吃的海鲜餐厅，明白你的用心良苦，是你找到的餐厅，虽然那时候很累了，但是却很幸福' },
                    { name: '海底捞', photos: 1, videos: 2, text: '不会拍照的我还有一个因为我所以很爱拍照的女朋友一起吃了海底捞', videoSource: 'cloudinary', videoUrls: [
                        'https://res.cloudinary.com/dowr4almo/video/upload/v1760708519/vidoes_chapter3_haidilao_1_jjn0yk.mp4',
                        'https://res.cloudinary.com/dowr4almo/video/upload/v1760708511/videos_chapter3_haidilao_2_hs1tmn.mp4'
                    ] },
                    { name: '日出', photos: 4, videos: 1, text: '我们一起看过最美的日出', subTexts: ['这里我们在看日出之前走过的森林，当时候小Frennie还害怕的样子真的很可爱', '等待日出时一起拍的照片'], videoSource: 'cloudinary', videoUrl: 'https://res.cloudinary.com/dowr4almo/video/upload/v1760708520/videos_chapter3_sunrise_video_afunaj.mp4' }
                ]
            },
            chapter4: {
                pages: 2,
                specialPhoto: {
                    src: 'images/chapter4/special-moment.jpg',
                    text: '那时候我看到了你的眼神，满眼都是期待和开心，眼里只有我，而我也一样，那一天的那个瞬间其实我也迷恋了你。',
                    effect: 'specialGlow'
                },
                specialVideo: {
                    src: 'https://res.cloudinary.com/dowr4almo/video/upload/v1760708507/videos_chapter4_important_smile_cxvpxn.mp4',
                    text: '那一刻，我只想让时间停在这里。',
                    effect: 'rainbowBubbles',
                    source: 'cloudinary'
                }
            },
            chapter5: {
                pages: 12,
                individualPhotos: 9,
                giftPhotos: 11,
                voiceMessage: {
                    text: '其实我做这个网页，不是为了让你难过。只是想让我们都记得那些开心的时光，真的做着情侣都做的事情。',
                    duration: 60000
                },
                finalMessage: {
                    text: '谢谢你陪我走过的日子，无论未来我们在世界的哪个角落，希望你一直笑得像陪伴我时最开心的时候一样灿烂。'
                }
            },
            chapter6: {
                backPhoto: {
                    src: 'images/chapter6/final-photo.jpg',
                    text: '其实这张是我想发自内心笑给你看的，因为从来没让你知道，遇见你我是多么的高兴。'
                },
                finalWords: [
                    '要开心，不要经常有太多情绪。',
                    '对其他人不要有太多的期待。',
                    '一定要对自己好，只有自己好起来才是最重要的。',
                    '这样就会有一个稳定的内核不怕被内耗，',
                    '不论遇到什么事情，都能让自己坚强，',
                    '也不会受太大的伤害。',
                    '你的人生才会慢慢形成你想要的样子。',
                    '以后好好生活，希望你都可以过得很好的生活。'
                ]
            }
        };
    }

    generateChapter2() {
        const container = document.getElementById('chapter2-pages');
        container.innerHTML = '';
        
        let pageIndex = 0;
        
        this.chapterData.chapter2.groups.forEach((group, groupIndex) => {
            if (group.pages === 1) {
                // 单页组
                const page = this.createPhotoPage(pageIndex, group);
                container.appendChild(page);
                pageIndex++;
            } else {
                // 多页组
                for (let i = 0; i < group.pages; i++) {
                    const page = this.createPhotoPage(pageIndex, group, i);
                    container.appendChild(page);
                    pageIndex++;
                }
            }
        });
    }

    generateChapter3() {
        const container = document.getElementById('chapter3-pages');
        container.innerHTML = '';
        
        let pageIndex = 0;
        
        this.chapterData.chapter3.groups.forEach((group, groupIndex) => {
            if (group.name === '海底捞') {
                // 特殊处理：三页
                for (let i = 0; i < 3; i++) {
                    const page = this.createScrollPage(pageIndex, group, i);
                    container.appendChild(page);
                    pageIndex++;
                }
            } else if (group.name === '日出') {
                // 特殊处理：三页
                for (let i = 0; i < 3; i++) {
                    const page = this.createScrollPage(pageIndex, group, i);
                    container.appendChild(page);
                    pageIndex++;
                }
            } else if (group.name === '节日排队') {
                // 特殊处理：两页
                for (let i = 0; i < 2; i++) {
                    const page = this.createScrollPage(pageIndex, group, i);
                    container.appendChild(page);
                    pageIndex++;
                }
            } else {
                // 单页
                const page = this.createScrollPage(pageIndex, group);
                container.appendChild(page);
                pageIndex++;
            }
        });
    }

    generateChapter5() {
        const container = document.getElementById('chapter5-pages');
        container.innerHTML = '';
        
        // 生成9个单独照片页面
        for (let i = 0; i < 9; i++) {
            const page = document.createElement('div');
            page.className = 'photo-page';
            page.innerHTML = `
                <div class="photo-container">
                    <img src="images/chapter5/photo${i + 1}.jpg" alt="回忆照片 ${i + 1}" class="photo">
                </div>
            `;
            container.appendChild(page);
        }
        
        // 生成礼物拼贴页面
        const giftPage = document.createElement('div');
        giftPage.className = 'photo-page collage-page';
        giftPage.innerHTML = `
            <div class="collage-container">
                ${Array.from({length: 11}, (_, i) => `
                    <div class="collage-item">
                        <img src="images/chapter5/gift${i + 1}.jpg" alt="礼物 ${i + 1}" class="photo">
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(giftPage);
    }

    createPhotoPage(pageIndex, group, subPageIndex = 0) {
        const page = document.createElement('div');
        page.className = 'photo-page';
        page.setAttribute('data-page', pageIndex);
        
        if (group.photos === 1) {
            // 单张照片
            page.innerHTML = `
                <div class="photo-container ${group.effect || ''}">
                    <img src="images/chapter2/${group.name.toLowerCase().replace(/\s+/g, '-')}.jpg" alt="${group.name}" class="photo">
                    ${group.specialNote && subPageIndex === 0 ? `<div class="special-note">${group.specialNote.text}</div>` : ''}
                </div>
                <div class="photo-text">${group.text}</div>
            `;
        } else if (group.photos <= 4) {
            // 少量照片拼贴
            page.innerHTML = `
                <div class="photo-container collage-container">
                    ${Array.from({length: group.photos}, (_, i) => `
                        <div class="collage-item">
                            <img src="images/chapter2/${group.name.toLowerCase().replace(/\s+/g, '-')}-${i + 1}.jpg" alt="${group.name} ${i + 1}" class="photo">
                        </div>
                    `).join('')}
                </div>
                <div class="photo-text">${group.text}</div>
            `;
        } else {
            // 多张照片网格布局
            const photosPerPage = Math.ceil(group.photos / group.pages);
            const startIndex = subPageIndex * photosPerPage;
            const endIndex = Math.min(startIndex + photosPerPage, group.photos);
            
            page.innerHTML = `
                <div class="photo-container grid-container">
                    ${Array.from({length: endIndex - startIndex}, (_, i) => `
                        <div class="grid-item">
                            <img src="images/chapter2/${group.name.toLowerCase().replace(/\s+/g, '-')}-${startIndex + i + 1}.jpg" alt="${group.name} ${startIndex + i + 1}" class="photo">
                        </div>
                    `).join('')}
                </div>
                <div class="photo-text">${group.text}</div>
            `;
        }
        
        return page;
    }

    createScrollPage(pageIndex, group, subPageIndex = 0) {
        const page = document.createElement('div');
        page.className = 'scroll-page';
        page.setAttribute('data-page', pageIndex);
        
        if (group.videos && group.videos > 0) {
            // 视频页面
            let videoSource = '';
            if (group.videoSource === 'cloudinary') {
                if (group.videoUrls && group.videoUrls.length > 0) {
                    // 多个视频（如海底捞）
                    videoSource = group.videoUrls[subPageIndex] || group.videoUrls[0];
                } else if (group.videoUrl) {
                    // 单个视频
                    videoSource = group.videoUrl;
                }
            } else {
                // 本地视频
                const videoName = this.getVideoFileName(group.name);
                videoSource = `videos/chapter3/${videoName}.mp4`;
            }
            
            page.innerHTML = `
                <div class="video-container">
                    <video muted autoplay loop>
                        <source src="${videoSource}" type="video/mp4">
                    </video>
                </div>
                <div class="video-text">${group.text}</div>
            `;
        } else if (group.photos && group.photos > 0) {
            // 照片页面
            if (group.photos === 1) {
                page.innerHTML = `
                    <div class="photo-container">
                        <img src="images/chapter3/${group.name.toLowerCase().replace(/\s+/g, '-')}.jpg" alt="${group.name}" class="photo">
                    </div>
                    <div class="photo-text">${group.text}</div>
                `;
            } else {
                page.innerHTML = `
                    <div class="photo-container collage-container">
                        ${Array.from({length: group.photos}, (_, i) => `
                            <div class="collage-item">
                                <img src="images/chapter3/${group.name.toLowerCase().replace(/\s+/g, '-')}-${i + 1}.jpg" alt="${group.name} ${i + 1}" class="photo">
                            </div>
                        `).join('')}
                    </div>
                    <div class="photo-text">${group.text}</div>
                `;
            }
        }
        
        return page;
    }

    getVideoFileName(groupName) {
        const videoMap = {
            '快乐日常': 'chapter3_happy_daily',
            '机场游玩': 'chapter3_airport_play',
            '送礼物': 'chapter3_gift_giving',
            '逗猫': 'chapter3_jb_cats'
        };
        return videoMap[groupName] || groupName.toLowerCase().replace(/\s+/g, '_');
    }

    createSpecialEffects() {
        // 创建特殊效果
        this.createRainbowEffect();
        this.createBubbleEffect();
        this.createHeartbreakingEffect();
        this.createPlayfulEffect();
        this.createGratefulEffect();
    }

    createRainbowEffect() {
        const rainbow = document.createElement('div');
        rainbow.className = 'rainbow-effect';
        rainbow.style.display = 'none';
        document.body.appendChild(rainbow);
        
        window.showRainbow = () => {
            rainbow.style.display = 'block';
            setTimeout(() => {
                rainbow.style.display = 'none';
            }, 3000);
        };
    }

    createBubbleEffect() {
        const createBubble = () => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.left = Math.random() * window.innerWidth + 'px';
            bubble.style.top = window.innerHeight + 'px';
            bubble.style.width = Math.random() * 20 + 10 + 'px';
            bubble.style.height = bubble.style.width;
            document.body.appendChild(bubble);
            
            setTimeout(() => {
                bubble.remove();
            }, 4000);
        };
        
        window.showBubbles = () => {
            for (let i = 0; i < 20; i++) {
                setTimeout(createBubble, i * 100);
            }
        };
    }

    createHeartbreakingEffect() {
        // 创建心疼特效
        const style = document.createElement('style');
        style.textContent = `
            .heartbreaking {
                animation: heartbeat 1s ease-in-out infinite;
                filter: sepia(0.5) hue-rotate(320deg) saturate(1.5);
            }
            
            @keyframes heartbeat {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }

    createPlayfulEffect() {
        // 创建搞怪特效
        const style = document.createElement('style');
        style.textContent = `
            .playful {
                animation: wiggle 0.5s ease-in-out infinite;
                filter: hue-rotate(60deg) saturate(1.2);
            }
            
            @keyframes wiggle {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(2deg); }
                75% { transform: rotate(-2deg); }
            }
        `;
        document.head.appendChild(style);
    }

    createGratefulEffect() {
        // 创建感谢特效
        const style = document.createElement('style');
        style.textContent = `
            .grateful {
                animation: gratefulGlow 2s ease-in-out infinite;
                box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
            }
            
            @keyframes gratefulGlow {
                0%, 100% { 
                    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
                    transform: scale(1);
                }
                50% { 
                    box-shadow: 0 0 40px rgba(255, 215, 0, 0.8);
                    transform: scale(1.02);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 导出供主文件使用
window.ChapterGenerator = ChapterGenerator;
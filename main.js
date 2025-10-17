import * as THREE from 'three';
import { gsap } from 'gsap';
import { Howl } from 'howler';
import { ChapterGenerator } from './chapter-generator.js';

class MemoryDiary {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.book = null;
        this.currentChapter = 0;
        this.currentPage = 0;
        this.isBookOpen = false;
        this.isReturnVisitor = false;
        this.audioManager = null;
        this.animationTimeline = null;
        this.chapterGenerator = new ChapterGenerator();
        
        this.init();
    }

    async init() {
        // 检查是否为回访用户
        this.checkReturnVisitor();
        
        // 初始化3D场景
        this.initThreeJS();
        
        // 创建3D书本
        this.createBook();
        
        // 初始化音频管理器
        this.initAudioManager();
        
        // 创建星空背景
        this.createStars();
        
        // 设置事件监听
        this.setupEventListeners();
        
        // 生成章节内容
        this.generateChapterContent();
        
        // 开始动画序列
        this.startAnimationSequence();
        
        // 隐藏加载屏幕
        this.hideLoadingScreen();
    }

    checkReturnVisitor() {
        const hasVisited = localStorage.getItem('memoryDiaryVisited');
        if (hasVisited) {
            this.isReturnVisitor = true;
        } else {
            localStorage.setItem('memoryDiaryVisited', 'true');
        }
    }

    initThreeJS() {
        const canvas = document.getElementById('book-canvas');
        
        // 创建场景
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        
        // 创建相机
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 5);
        
        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // 添加光源
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        
        // 处理窗口大小变化
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    createBook() {
        // 创建书本组
        this.book = new THREE.Group();
        
        // 创建封面
        const coverGeometry = new THREE.BoxGeometry(3, 4, 0.1);
        const coverMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8B4513,
            map: this.createBookTexture()
        });
        const cover = new THREE.Mesh(coverGeometry, coverMaterial);
        cover.position.set(0, 0, 0.05);
        cover.castShadow = true;
        this.book.add(cover);
        
        // 创建书页
        const pageGeometry = new THREE.BoxGeometry(2.9, 3.9, 0.05);
        const pageMaterial = new THREE.MeshLambertMaterial({ color: 0xF5F5DC });
        
        for (let i = 0; i < 50; i++) {
            const page = new THREE.Mesh(pageGeometry, pageMaterial);
            page.position.set(0, 0, -i * 0.01);
            page.castShadow = true;
            this.book.add(page);
        }
        
        // 设置书本初始位置（侧面）
        this.book.position.set(-2, 0, 0);
        this.book.rotation.y = Math.PI / 4;
        
        this.scene.add(this.book);
        
        // 开始渲染循环
        this.animate();
    }

    createBookTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // 创建破旧书本纹理
        const gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#8B4513');
        gradient.addColorStop(0.5, '#A0522D');
        gradient.addColorStop(1, '#654321');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
        
        // 添加破旧效果
        ctx.fillStyle = 'rgba(139, 69, 19, 0.3)';
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const size = Math.random() * 10 + 5;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    createStars() {
        const starsContainer = document.getElementById('stars-background');
        const starCount = 200;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.animationDelay = Math.random() * 2 + 's';
            star.style.animationDuration = (Math.random() * 2 + 1) + 's';
            starsContainer.appendChild(star);
        }
    }

    initAudioManager() {
        this.audioManager = {
            currentTrack: null,
            tracks: {
                intro: new Howl({
                    src: ['audio/a-town-with-an-ocean-view.mp3'],
                    loop: false,
                    volume: 0.7
                }),
                chapter1: new Howl({
                    src: ['audio/rain-love.mp3'],
                    loop: true,
                    volume: 0.6
                }),
                chapter3: new Howl({
                    src: ['audio/left-person.mp3'],
                    loop: true,
                    volume: 0.6
                }),
                chapter5: new Howl({
                    src: ['audio/lie.mp3'],
                    loop: true,
                    volume: 0.6
                })
            },
            play: (trackName) => {
                if (this.audioManager.currentTrack) {
                    this.audioManager.currentTrack.stop();
                }
                this.audioManager.currentTrack = this.audioManager.tracks[trackName];
                this.audioManager.currentTrack.play();
            },
            stop: () => {
                if (this.audioManager.currentTrack) {
                    this.audioManager.currentTrack.stop();
                }
            },
            pause: () => {
                if (this.audioManager.currentTrack) {
                    this.audioManager.currentTrack.pause();
                }
            },
            resume: () => {
                if (this.audioManager.currentTrack) {
                    this.audioManager.currentTrack.play();
                }
            }
        };
    }

    setupEventListeners() {
        // 翻页控制
        document.getElementById('next-page').addEventListener('click', () => {
            this.nextPage();
        });
        
        document.getElementById('prev-page').addEventListener('click', () => {
            this.prevPage();
        });
        
        // 音频控制
        document.getElementById('play-pause').addEventListener('click', () => {
            this.toggleAudio();
        });
        
        document.getElementById('mute-unmute').addEventListener('click', () => {
            this.toggleMute();
        });
        
        // 键盘控制
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextPage();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevPage();
                    break;
            }
        });
    }

    startAnimationSequence() {
        this.animationTimeline = gsap.timeline();
        
        // 开场动画：书本从侧面移动到正面
        this.animationTimeline
            .to(this.book.position, {
                duration: 2,
                x: 0,
                y: 0,
                ease: "power2.out"
            })
            .to(this.book.rotation, {
                duration: 2,
                y: 0,
                ease: "power2.out"
            }, "-=2")
            .call(() => {
                this.showCover();
            })
            .to({}, { duration: 15 }) // 等待15秒
            .call(() => {
                this.startPageFlip();
            });
    }

    showCover() {
        const coverContent = document.getElementById('cover-content');
        coverContent.style.display = 'block';
        coverContent.classList.add('active');
        
        // 显示回访用户消息
        if (this.isReturnVisitor) {
            const returnMessage = document.getElementById('return-visitor-message');
            returnMessage.style.display = 'block';
        }
        
        // 播放开场音乐
        this.audioManager.play('intro');
        
        // 封面淡入动画
        gsap.fromTo(coverContent, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
        );
        
        // 确保封面内容可见
        setTimeout(() => {
            coverContent.style.visibility = 'visible';
        }, 100);
    }

    startPageFlip() {
        // 停止开场音乐
        this.audioManager.stop();
        
        // 开始翻页动画
        this.flipPage(() => {
            this.showChapter(1);
        });
    }

    flipPage(callback) {
        // 创建翻页动画
        const pageFlipTimeline = gsap.timeline();
        
        // 书本翻页效果
        pageFlipTimeline
            .to(this.book.rotation, {
                duration: 1,
                y: Math.PI * 0.1,
                ease: "power2.inOut"
            })
            .to(this.book.rotation, {
                duration: 1,
                y: 0,
                ease: "power2.inOut"
            })
            .call(() => {
                // 创建粒子效果
                this.createParticleEffect();
                if (callback) callback();
            });
    }

    createParticleEffect() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
    }

    showChapter(chapterNumber) {
        // 隐藏所有章节
        document.querySelectorAll('.chapter-content').forEach(chapter => {
            chapter.style.display = 'none';
        });
        
        // 显示指定章节
        const chapter = document.getElementById(`chapter${chapterNumber}`);
        if (chapter) {
            chapter.style.display = 'block';
            chapter.classList.add('active');
            
            // 播放对应章节音乐
            this.playChapterMusic(chapterNumber);
            
            // 特殊章节处理
            if (chapterNumber === 3) {
                this.switchToScrollMode();
            } else if (chapterNumber === 4) {
                this.handleChapter4SpecialEffects();
            } else if (chapterNumber === 5) {
                this.handleChapter5Voice();
            } else if (chapterNumber === 6) {
                this.handleChapter6Ending();
            } else {
                this.switchToPageMode();
            }
        }
    }

    handleChapter4SpecialEffects() {
        // 第四章特殊效果
        const specialPhoto = document.querySelector('.special-photo-page');
        const videoPage = document.querySelector('.video-page');
        
        // 显示特殊照片
        gsap.fromTo(specialPhoto, 
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
        );
        
        // 3秒后显示视频
        setTimeout(() => {
            specialPhoto.style.display = 'none';
            videoPage.style.display = 'block';
            
            // 显示彩虹泡泡特效
            if (window.showRainbow) window.showRainbow();
            if (window.showBubbles) window.showBubbles();
            
            // 暂停背景音乐
            this.audioManager.pause();
            
            // 播放视频
            const video = document.getElementById('special-video');
            video.src = 'https://res.cloudinary.com/dowr4almo/video/upload/v1760708507/videos_chapter4_important_smile_cxvpxn.mp4';
            video.load();
            video.play();
            
            // 视频结束后恢复音乐
            video.addEventListener('ended', () => {
                this.audioManager.resume();
            });
        }, 3000);
    }

    handleChapter5Voice() {
        // 第五章语音处理
        const voiceMessage = document.querySelector('.voice-message');
        const finalMessage = document.querySelector('.final-message');
        
        // 显示语音播放器
        setTimeout(() => {
            voiceMessage.style.display = 'block';
            
            // 播放语音
            const voiceAudio = document.getElementById('voice-audio');
            if (voiceAudio) {
                voiceAudio.play();
                
                // 语音播放结束后显示最终消息
                voiceAudio.addEventListener('ended', () => {
                    voiceMessage.style.display = 'none';
                    finalMessage.style.display = 'block';
                });
            }
        }, 2000);
    }

    handleChapter6Ending() {
        // 第六章结尾处理
        const bookBack = document.querySelector('.book-back');
        const finalWords = document.querySelector('.final-words');
        
        // 显示书本背面
        gsap.fromTo(bookBack, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
        );
        
        // 3秒后显示最终文字
        setTimeout(() => {
            bookBack.style.display = 'none';
            finalWords.style.display = 'flex';
            
            // 创建流星效果
            this.createMeteorEffect();
        }, 3000);
    }

    createMeteorEffect() {
        const createMeteor = () => {
            const meteor = document.createElement('div');
            meteor.style.position = 'fixed';
            meteor.style.width = '2px';
            meteor.style.height = '2px';
            meteor.style.background = 'linear-gradient(45deg, #fff, #ffd700)';
            meteor.style.borderRadius = '50%';
            meteor.style.left = Math.random() * window.innerWidth + 'px';
            meteor.style.top = '-10px';
            meteor.style.zIndex = '1000';
            meteor.style.boxShadow = '0 0 10px #ffd700';
            
            document.body.appendChild(meteor);
            
            gsap.to(meteor, {
                x: Math.random() * 200 - 100,
                y: window.innerHeight + 100,
                duration: 2,
                ease: "power2.out",
                onComplete: () => meteor.remove()
            });
        };
        
        // 持续创建流星
        const meteorInterval = setInterval(createMeteor, 200);
        
        // 25秒后停止
        setTimeout(() => {
            clearInterval(meteorInterval);
        }, 25000);
    }

    playChapterMusic(chapterNumber) {
        switch(chapterNumber) {
            case 1:
            case 2:
                this.audioManager.play('chapter1');
                break;
            case 3:
            case 4:
                this.audioManager.play('chapter3');
                break;
            case 5:
            case 6:
                this.audioManager.play('chapter5');
                break;
        }
    }

    switchToScrollMode() {
        // 切换到横向滚动模式（第三章奏折效果）
        const chapter3 = document.getElementById('chapter3');
        chapter3.classList.add('scroll-chapter');
        
        // 创建横向滚动效果
        this.createHorizontalScroll();
    }

    switchToPageMode() {
        // 切换到正常翻页模式
        const chapters = document.querySelectorAll('.chapter-content');
        chapters.forEach(chapter => {
            chapter.classList.remove('scroll-chapter');
        });
    }

    createHorizontalScroll() {
        const scrollContainer = document.querySelector('.scroll-container');
        let isScrolling = false;
        
        // 鼠标滚轮控制横向滚动
        scrollContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (!isScrolling) {
                isScrolling = true;
                const scrollAmount = e.deltaY > 0 ? 100 : -100;
                scrollContainer.scrollLeft += scrollAmount;
                
                setTimeout(() => {
                    isScrolling = false;
                }, 100);
            }
        });
        
        // 触摸滑动支持
        let startX = 0;
        scrollContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        scrollContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const currentX = e.touches[0].clientX;
            const diffX = startX - currentX;
            scrollContainer.scrollLeft += diffX;
            startX = currentX;
        });
    }

    nextPage() {
        if (this.currentChapter === 3) {
            // 第三章使用横向滚动
            const scrollContainer = document.querySelector('.scroll-container');
            scrollContainer.scrollLeft += window.innerWidth;
        } else {
            // 其他章节使用翻页
            this.flipPage(() => {
                this.currentPage++;
                this.updatePageContent();
            });
        }
    }

    prevPage() {
        if (this.currentChapter === 3) {
            // 第三章使用横向滚动
            const scrollContainer = document.querySelector('.scroll-container');
            scrollContainer.scrollLeft -= window.innerWidth;
        } else {
            // 其他章节使用翻页
            this.flipPage(() => {
                this.currentPage--;
                this.updatePageContent();
            });
        }
    }

    updatePageContent() {
        // 更新页面内容显示
        const currentChapter = document.getElementById(`chapter${this.currentChapter}`);
        if (currentChapter) {
            const pages = currentChapter.querySelectorAll('.photo-page');
            pages.forEach((page, index) => {
                if (index === this.currentPage) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
        }
    }

    toggleAudio() {
        const playPauseBtn = document.getElementById('play-pause');
        if (this.audioManager.currentTrack.playing()) {
            this.audioManager.pause();
            playPauseBtn.textContent = '▶️';
        } else {
            this.audioManager.resume();
            playPauseBtn.textContent = '⏸️';
        }
    }

    toggleMute() {
        const muteBtn = document.getElementById('mute-unmute');
        if (this.audioManager.currentTrack.volume() > 0) {
            this.audioManager.currentTrack.volume(0);
            muteBtn.textContent = '🔇';
        } else {
            this.audioManager.currentTrack.volume(0.6);
            muteBtn.textContent = '🔊';
        }
    }

    generateChapterContent() {
        // 生成第二章内容
        this.chapterGenerator.generateChapter2();
        
        // 生成第三章内容
        this.chapterGenerator.generateChapter3();
        
        // 生成第五章内容
        this.chapterGenerator.generateChapter5();
        
        // 创建特殊效果
        this.chapterGenerator.createSpecialEffects();
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                }
            });
        }, 3000);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new MemoryDiary();
});
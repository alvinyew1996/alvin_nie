// 全局变量
let currentChapter = 0;
let isSecondVisit = false;
let musicPlaying = false;

// 检查是否第二次访问
function checkSecondVisit() {
    if (localStorage.getItem('visited') === 'true') {
        isSecondVisit = true;
        document.querySelector('.second-visit-message').style.display = 'block';
    } else {
        localStorage.setItem('visited', 'true');
    }
}

// 创建粒子效果
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particlesContainer.appendChild(particle);
    }
}

// 音乐控制
class MusicController {
    constructor() {
        this.currentMusic = null;
        this.isPlaying = false;
        this.volume = 0.3;
        this.fadeTime = 1000; // 淡入淡出时间
    }
    
    play(musicId) {
        if (this.currentMusic && this.currentMusic.id === musicId) {
            return;
        }
        
        this.stop();
        
        const music = document.getElementById(musicId);
        if (music) {
            this.currentMusic = music;
            music.volume = 0;
            music.play().catch(e => console.log('音乐播放失败:', e));
            this.fadeIn();
            this.isPlaying = true;
        }
    }
    
    stop() {
        if (this.currentMusic) {
            this.fadeOut(() => {
                this.currentMusic.pause();
                this.currentMusic.currentTime = 0;
            });
        }
        this.isPlaying = false;
    }
    
    pause() {
        if (this.currentMusic) {
            this.fadeOut(() => {
                this.currentMusic.pause();
            });
        }
    }
    
    resume() {
        if (this.currentMusic) {
            this.currentMusic.play().catch(e => console.log('音乐恢复播放失败:', e));
            this.fadeIn();
        }
    }
    
    fadeIn() {
        if (!this.currentMusic) return;
        
        const targetVolume = this.volume;
        const steps = 20;
        const stepTime = this.fadeTime / steps;
        const volumeStep = targetVolume / steps;
        
        let currentStep = 0;
        const fadeInterval = setInterval(() => {
            currentStep++;
            this.currentMusic.volume = Math.min(volumeStep * currentStep, targetVolume);
            
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
            }
        }, stepTime);
    }
    
    fadeOut(callback) {
        if (!this.currentMusic) {
            if (callback) callback();
            return;
        }
        
        const steps = 20;
        const stepTime = this.fadeTime / steps;
        const volumeStep = this.currentMusic.volume / steps;
        
        let currentStep = 0;
        const fadeInterval = setInterval(() => {
            currentStep++;
            this.currentMusic.volume = Math.max(this.currentMusic.volume - volumeStep, 0);
            
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                if (callback) callback();
            }
        }, stepTime);
    }
}

const musicController = new MusicController();

// 滚动监听
function setupScrollListener() {
    const throttledUpdateOnScroll = throttle(() => {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        try {
            // 封面翻书动画
            if (scrollTop < windowHeight) {
                const progress = scrollTop / windowHeight;
                const book = document.querySelector('.book');
                if (book) {
                    book.style.transform = `rotateY(${progress * 15}deg)`;
                }
            }
            
            // 章节切换
            const chapters = document.querySelectorAll('.chapter');
            chapters.forEach((chapter, index) => {
                const rect = chapter.getBoundingClientRect();
                const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
                
                if (isVisible && currentChapter !== index) {
                    currentChapter = index;
                    handleChapterChange(index);
                }
            });
            
            // 淡入动画
            const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
            fadeElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top < windowHeight * 0.8) {
                    element.classList.add('visible');
                }
            });
        } catch (error) {
            handleError(error, '滚动监听');
        }
    }, 16); // 约60fps
    
    window.addEventListener('scroll', throttledUpdateOnScroll, { passive: true });
}

// 章节切换处理
function handleChapterChange(chapterIndex) {
    updateProgressIndicator(chapterIndex);
    
    switch(chapterIndex) {
        case 0: // 封面
            // 封面不播放音乐
            break;
        case 1: // 第一章
            musicController.play('bg-music');
            animateChapter1();
            break;
        case 2: // 第二章
            animateChapter2();
            break;
        case 3: // 第三章
            musicController.play('left-person-music');
            animateChapter3();
            break;
        case 4: // 第四章
            animateChapter4();
            break;
        case 5: // 第五章
            musicController.play('lie-music');
            animateChapter5();
            break;
        case 6: // 第六章
            animateChapter6();
            break;
    }
}

// 第一章动画
function animateChapter1() {
    const photo = document.querySelector('.fade-in-photo');
    if (photo) {
        setTimeout(() => {
            photo.classList.add('visible');
        }, 500);
    }
}

// 第二章动画
function animateChapter2() {
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item, index) => {
        const delay = parseInt(item.dataset.delay) || index * 200;
        setTimeout(() => {
            item.classList.add('visible');
        }, delay);
    });
}

// 第三章动画
function animateChapter3() {
    const travelPhotos = document.querySelectorAll('.travel-photo');
    travelPhotos.forEach((photo, index) => {
        setTimeout(() => {
            photo.style.opacity = '1';
            photo.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// 第四章动画
function animateChapter4() {
    const video = document.getElementById('smile-video');
    if (video) {
        // 暂停音乐播放视频
        musicController.pause();
        video.play();
        
        video.addEventListener('ended', () => {
            musicController.resume();
        });
    }
}

// 第五章动画
function animateChapter5() {
    const voiceAudio = document.getElementById('voice-audio');
    const voiceText = document.querySelector('.voice-text');
    
    if (voiceAudio && voiceText) {
        // 暂停音乐播放语音
        musicController.pause();
        voiceAudio.play();
        
        // 显示字幕
        const textLines = voiceText.querySelectorAll('p');
        textLines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('visible');
            }, index * 1000);
        });
        
        voiceAudio.addEventListener('ended', () => {
            musicController.resume();
        });
    }
}

// 第六章动画
function animateChapter6() {
    const nightSky = document.querySelector('.night-sky');
    const finalMessage = document.querySelector('.final-message');
    
    if (nightSky) {
        setTimeout(() => {
            nightSky.classList.add('active');
            createStars();
        }, 1000);
    }
    
    if (finalMessage) {
        setTimeout(() => {
            finalMessage.style.opacity = '1';
        }, 2000);
    }
}

// 创建星星
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 20;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 错误处理
function handleError(error, context) {
    console.error(`错误在 ${context}:`, error);
    // 可以在这里添加用户友好的错误提示
}

// 预加载媒体文件
function preloadMedia() {
    const mediaFiles = [
        'images/meeting.jpg',
        'images/together1.jpg',
        'images/together2.jpg',
        'images/together3.jpg',
        'images/together4.jpg',
        'images/together5.jpg',
        'images/together6.jpg',
        'images/together7.jpg',
        'images/together8.jpg',
        'images/together9.jpg',
        'images/together10.jpg',
        'images/together11.jpg',
        'images/together12.jpg',
        'images/travel1.jpg',
        'images/travel2.jpg',
        'images/travel3.jpg',
        'images/travel4.jpg',
        'images/final.jpg',
        'videos/smile.mp4',
        'audio/rain-love.mp3',
        'audio/left-person.mp3',
        'audio/lie.mp3',
        'audio/voice.mp3'
    ];
    
    let loadedCount = 0;
    const totalCount = mediaFiles.length;
    
    mediaFiles.forEach(file => {
        const media = new Image();
        media.onload = () => {
            loadedCount++;
            updateLoadingProgress(loadedCount, totalCount);
        };
        media.onerror = () => {
            loadedCount++;
            updateLoadingProgress(loadedCount, totalCount);
        };
        media.src = file;
    });
}

// 更新加载进度
function updateLoadingProgress(loaded, total) {
    const progress = (loaded / total) * 100;
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        loadingText.textContent = `正在加载我们的故事... ${Math.round(progress)}%`;
    }
}

// 初始化
function init() {
    try {
        checkSecondVisit();
        createParticles();
        setupScrollListener();
        setupMusicControl();
        setupProgressIndicator();
        preloadMedia();
        
        // 隐藏加载屏幕
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        }, 3000);
        
        // 自动进入第一章
        setTimeout(() => {
            if (currentChapter === 0) {
                handleChapterChange(0);
            }
        }, 3000);
        
        // 添加淡入类到需要动画的元素
        const fadeElements = document.querySelectorAll('.photo-item, .travel-photo, .chapter-text');
        fadeElements.forEach(element => {
            element.classList.add('fade-in');
        });
    } catch (error) {
        handleError(error, '初始化');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 处理视频播放
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('smile-video');
    if (video) {
        video.addEventListener('play', function() {
            musicController.pause();
        });
        
        video.addEventListener('ended', function() {
            musicController.resume();
        });
    }
});

// 处理语音播放
document.addEventListener('DOMContentLoaded', function() {
    const voiceAudio = document.getElementById('voice-audio');
    if (voiceAudio) {
        voiceAudio.addEventListener('play', function() {
            musicController.pause();
        });
        
        voiceAudio.addEventListener('ended', function() {
            musicController.resume();
        });
    }
});

// 平滑滚动
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// 键盘导航
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowDown':
        case ' ':
            e.preventDefault();
            const nextChapter = document.querySelectorAll('.chapter')[currentChapter + 1];
            if (nextChapter) {
                smoothScrollTo(nextChapter);
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            const prevChapter = document.querySelectorAll('.chapter')[currentChapter - 1];
            if (prevChapter) {
                smoothScrollTo(prevChapter);
            }
            break;
    }
});

// 音乐控制
function setupMusicControl() {
    const musicToggle = document.getElementById('music-toggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (musicController.isPlaying) {
                musicController.stop();
                this.textContent = '🔇';
            } else {
                musicController.play('bg-music');
                this.textContent = '🎵';
            }
        });
    }
}

// 进度指示器
function setupProgressIndicator() {
    const progressDots = document.querySelectorAll('.progress-dot');
    
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            const chapterIndex = parseInt(this.dataset.chapter);
            const targetChapter = document.querySelectorAll('.chapter')[chapterIndex];
            if (targetChapter) {
                smoothScrollTo(targetChapter);
            }
        });
    });
}

// 更新进度指示器
function updateProgressIndicator(chapterIndex) {
    const progressDots = document.querySelectorAll('.progress-dot');
    progressDots.forEach((dot, index) => {
        if (index === chapterIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 触摸设备支持
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 向上滑动 - 下一章
            const nextChapter = document.querySelectorAll('.chapter')[currentChapter + 1];
            if (nextChapter) {
                smoothScrollTo(nextChapter);
            }
        } else {
            // 向下滑动 - 上一章
            const prevChapter = document.querySelectorAll('.chapter')[currentChapter - 1];
            if (prevChapter) {
                smoothScrollTo(prevChapter);
            }
        }
    }
}
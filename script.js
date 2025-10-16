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
        this.musicStates = {}; // 记录每首音乐的播放状态
    }
    
    play(musicId, continueFromPrevious = false) {
        const music = document.getElementById(musicId);
        if (!music) return;
        
        // 如果继续播放同一首音乐且已经在播放，不重复播放
        if (continueFromPrevious && this.currentMusic && this.currentMusic.id === musicId && this.isPlaying) {
            return;
        }
        
        // 如果切换音乐，先停止当前音乐
        if (!continueFromPrevious) {
            this.stop();
        }
        
        this.currentMusic = music;
        music.volume = 0;
        music.play().catch(e => console.log('音乐播放失败:', e));
        this.fadeIn();
        this.isPlaying = true;
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
            musicController.play('cover-music');
            animateCover();
            break;
        case 1: // 第一章
            musicController.play('bg-music');
            animateChapter1();
            break;
        case 2: // 第二章
            musicController.play('bg-music', true); // 继续播放第一章的音乐
            animateChapter2();
            break;
        case 3: // 第三章
            musicController.play('left-person-music');
            animateChapter3();
            break;
        case 4: // 第四章
            musicController.play('left-person-music', true); // 继续播放第三章的音乐
            animateChapter4();
            break;
        case 5: // 第五章
            musicController.play('lie-music');
            animateChapter5();
            break;
        case 6: // 第六章
            musicController.play('lie-music', true); // 继续播放第五章的音乐
            animateChapter6();
            break;
    }
}

// 封面动画
function animateCover() {
    // 15秒后开始翻页
    setTimeout(() => {
        const book = document.querySelector('.book');
        if (book) {
            book.style.animation = 'bookOpen 3s ease-in-out forwards';
        }
        
        // 翻页完成后停止封面音乐，准备进入第一章
        setTimeout(() => {
            musicController.stop();
            // 自动滚动到第一章
            const chapter1 = document.querySelector('#chapter1');
            if (chapter1) {
                smoothScrollTo(chapter1);
            }
        }, 3000);
    }, 15000);
}

// 第一章翻页功能
let currentPage = 1;
const totalPages = 4;

function setupPageNavigation() {
    const prevBtn = document.querySelector('.prev-page');
    const nextBtn = document.querySelector('.next-page');
    const pageIndicator = document.querySelector('.page-indicator');
    
    if (prevBtn && nextBtn && pageIndicator) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePageDisplay();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePageDisplay();
            }
        });
    }
}

function updatePageDisplay() {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.querySelector('.prev-page');
    const nextBtn = document.querySelector('.next-page');
    const pageIndicator = document.querySelector('.page-indicator');
    
    pages.forEach((page, index) => {
        page.classList.remove('active', 'prev', 'next');
        if (index + 1 === currentPage) {
            page.classList.add('active');
        } else if (index + 1 < currentPage) {
            page.classList.add('prev');
        } else {
            page.classList.add('next');
        }
    });
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
    if (pageIndicator) {
        pageIndicator.textContent = `${currentPage} / ${totalPages}`;
    }
}

// 封面动画
function animateCover() {
    // 15秒后开始翻页
    setTimeout(() => {
        const book = document.querySelector('.book');
        if (book) {
            book.style.animation = 'bookOpen 3s ease-in-out forwards';
        }
        
        // 翻页完成后进入第一章
        setTimeout(() => {
            const chapter1 = document.querySelector('#chapter1');
            if (chapter1) {
                chapter1.scrollIntoView({ behavior: 'smooth' });
            }
        }, 3000);
    }, 15000);
}

// 第一章动画
function animateChapter1() {
    const photo = document.querySelector('.page-1 .fade-in-photo');
    if (photo) {
        setTimeout(() => {
            photo.classList.add('visible');
        }, 500);
    }
    
    // 8秒后启用翻页功能
    setTimeout(() => {
        const pageControls = document.querySelector('.page-controls');
        if (pageControls) {
            pageControls.style.opacity = '1';
            pageControls.style.pointerEvents = 'auto';
        }
    }, 8000);
}

// 第二章动画
function animateChapter2() {
    // 处理所有照片项
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item, index) => {
        const delay = parseInt(item.dataset.delay) || index * 2000;
        setTimeout(() => {
            item.classList.add('visible');
        }, delay);
    });

    // 处理聊天记录的批次显示
    const chatBatches = document.querySelectorAll('.chat-batch');
    chatBatches.forEach((batch, index) => {
        setTimeout(() => {
            batch.classList.add('visible');
        }, 118000 + (index * 15000)); // 每批次间隔15秒
    });

    // 处理特殊效果
    setTimeout(() => {
        // 为不同组添加特殊效果
        const groups = document.querySelectorAll('.photo-group');
        groups.forEach((group, groupIndex) => {
            const items = group.querySelectorAll('.photo-item');
            items.forEach((item, itemIndex) => {
                setTimeout(() => {
                    item.style.animationDelay = `${itemIndex * 0.1}s`;
                }, groupIndex * 1000);
            });
        });
    }, 1000);
}

// 第三章动画
function animateChapter3() {
    const travelPhotos = document.querySelectorAll('.travel-photo');
    const travelVideos = document.querySelectorAll('.travel-video');
    
    // 照片动画
    travelPhotos.forEach((photo, index) => {
        setTimeout(() => {
            photo.style.opacity = '1';
            photo.style.transform = 'translateY(0)';
        }, index * 300);
    });
    
    // 视频播放
    let currentVideoIndex = 0;
    const playNextVideo = () => {
        if (currentVideoIndex < travelVideos.length) {
            const video = travelVideos[currentVideoIndex];
            video.classList.add('active');
            video.play();
            
            video.addEventListener('ended', () => {
                video.classList.remove('active');
                currentVideoIndex++;
                setTimeout(playNextVideo, 1000);
            });
        }
    };
    
    // 延迟开始播放视频
    setTimeout(playNextVideo, 2000);
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
    const sequencePhotos = document.querySelectorAll('.sequence-photo');
    
    // 照片序列动画
    let currentPhotoIndex = 0;
    const showNextPhoto = () => {
        if (currentPhotoIndex < sequencePhotos.length) {
            // 隐藏当前照片
            sequencePhotos.forEach(photo => photo.classList.remove('active'));
            
            // 显示下一张照片
            sequencePhotos[currentPhotoIndex].classList.add('active');
            currentPhotoIndex++;
            
            // 3秒后显示下一张照片
            if (currentPhotoIndex < sequencePhotos.length) {
                setTimeout(showNextPhoto, 3000);
            } else {
                // 所有照片显示完毕，开始播放语音
                setTimeout(() => {
                    playVoice();
                }, 2000);
            }
        }
    };
    
    // 播放语音
    const playVoice = () => {
        if (voiceAudio && voiceText) {
            // 暂停音乐播放语音
            musicController.pause();
            voiceAudio.play();
            
            // 显示字幕
            const textLines = voiceText.querySelectorAll('p');
            textLines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('visible');
                }, index * 2000); // 每2秒显示一行
            });
            
            voiceAudio.addEventListener('ended', () => {
                musicController.resume();
            });
        }
    };
    
    // 开始照片序列
    setTimeout(showNextPhoto, 1000);
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
        // 封面
        'images/moon-clover.jpg',
        
        // 第一章
        'images/meeting1.jpg',
        'images/meeting2.jpg',
        'images/meeting3.jpg',
        'images/meeting4.jpg',
        
        // 第二章 - 居住照片
        'images/living1.jpg', 'images/living2.jpg', 'images/living3.jpg', 'images/living4.jpg', 'images/living5.jpg',
        'images/living6.jpg', 'images/living7.jpg', 'images/living8.jpg', 'images/living9.jpg', 'images/living10.jpg',
        'images/living11.jpg', 'images/living12.jpg', 'images/living13.jpg', 'images/living14.jpg', 'images/living15.jpg',
        'images/living16.jpg', 'images/living17.jpg', 'images/living18.jpg', 'images/living19.jpg', 'images/living20.jpg',
        
        // 第二章 - 其他照片
        'images/loklok.jpg',
        'images/work1.jpg', 'images/work2.jpg', 'images/work3.jpg', 'images/work4.jpg',
        'images/supper1.jpg', 'images/supper2.jpg', 'images/mcd1.jpg', 'images/mcd2.jpg',
        'images/korean1.jpg', 'images/korean2.jpg', 'images/cooked1.jpg', 'images/cooked2.jpg',
        'images/cake.jpg', 'images/japanese.jpg', 'images/fruit.jpg', 'images/food4.jpg',
        'images/bedok1.jpg', 'images/bedok2.jpg',
        'images/heartbreak1.jpg', 'images/heartbreak2.jpg', 'images/heartbreak3.jpg',
        'images/bite.jpg', 'images/sneak.jpg',
        'images/funny1.jpg', 'images/funny2.jpg',
        'images/lost.jpg',
        'images/bedsheet1.jpg', 'images/bedsheet2.jpg', 'images/bedsheet3.jpg',
        'images/drink1.jpg', 'images/drink2.jpg', 'images/drink3.jpg',
        'images/gift.jpg',
        'images/tart.jpg', 'images/abang1.jpg', 'images/abang2.jpg',
        'images/wine.jpg',
        'images/thanks1.jpg', 'images/thanks2.jpg', 'images/thanks3.jpg',
        'images/chat1.jpg', 'images/chat2.jpg', 'images/chat3.jpg', 'images/chat4.jpg', 'images/chat5.jpg',
        'images/chat6.jpg', 'images/chat7.jpg', 'images/chat8.jpg', 'images/chat9.jpg', 'images/chat10.jpg',
        'images/chat11.jpg', 'images/chat12.jpg', 'images/chat13.jpg', 'images/chat14.jpg', 'images/chat15.jpg',
        'images/chat16.jpg', 'images/chat17.jpg', 'images/chat18.jpg', 'images/chat19.jpg', 'images/chat20.jpg',
        'images/chat21.jpg',
        
        // 第三章
        'images/travel1.jpg', 'images/travel2.jpg', 'images/travel3.jpg', 'images/travel4.jpg',
        
        // 第五章
        'images/memory1.jpg', 'images/memory2.jpg', 'images/memory3.jpg', 'images/memory4.jpg',
        'images/memory5.jpg', 'images/memory6.jpg', 'images/memory7.jpg', 'images/memory8.jpg',
        
        // 视频文件
        'videos/smile.mp4',
        'videos/travel1.mp4', 'videos/travel2.mp4', 'videos/travel3.mp4',
        
        // 音频文件
        'audio/ocean-view.mp3', // 宫崎骏音乐
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
        setupPageNavigation();
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
        
        // 初始化页面控制按钮透明度
        const pageControls = document.querySelector('.page-controls');
        if (pageControls) {
            pageControls.style.opacity = '0.5';
            pageControls.style.pointerEvents = 'none';
        }
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
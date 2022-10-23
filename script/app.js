
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);


    const PLAYER_STORAEGE_KEY = "KIEN";
    const cd = $('.cd');
    const heading = $('header h2');
    const cdThumb = $('.cd-thumb');
    const audio = $('#audio');
    const playBtn = $('.btn-toggle-play');
    const player = $('.player');
    const progress = $('#progress');
    const prevBtn = $('.btn-prev')
    const nextBtn = $('.btn-next');
    const randomBtn = $('.btn-random');
    const repeatBtn = $('.btn-repeat');
    const playlist = $('.playlist');

    const app = {
        currentIndex: 0,
        isPlaying: false,
        isRanDom: false,
        isRepeat: false,
        config: JSON.parse(localStorage.getItem(PLAYER_STORAEGE_KEY)) || {},
        songs: [
            {
                name: 'Cưới Thôi',
                singer: 'Masew x Masiu',
                path: './music/y2mate.com - Cưới Thôi  Masew x Masiu x B Ray x TAP  Lyrics Audio .mp3',
                image: './img/cuoithoi.jpg'
            },
            {
                name: 'Shap of You',
                singer: 'Ed Sheeran',
                path: './music/y2mate.com - Ed Sheeran  Shape of You Official Music Video.mp3',
                image: './img/shapofyou.jpg'
            },
            {
                name: 'Hối Duyên',
                singer: 'Masew',
                path: './music/y2mate.com - HỐI DUYÊN   MASEW x KHOI VU.mp3',
                image: './img/Untitled.png'
            },
            {
                name: 'Có chơi có chịu',
                singer: 'KARIK x ONLY',
                path: './music/y2mate.com - KARIK x ONLY C  CÓ CHƠI CÓ CHỊU OFFICIAL MUSIC VIDEO.mp3',
                image: './img/Untitled.png'
            },
            {
                name: 'Mặt Mộc',
                singer: 'Pham Nguyen Ngoc x Vanh',
                path: './music/y2mate.com - MĂT MÔC  Pham Nguyên Ngoc x VAnh x Ân Nhi Original.mp3',
                image: './img/matmoc.jpg'
            },
            {
                name: 'Meant To Be',
                singer: 'Arc North ft Krista',
                path: './music/y2mate.com - Meant To Be  Arc North ft Krista Marina Lyrics  Vietsub .mp3',
                image: './img/Untitled.png'
            },
            {
                name: 'Monsters',
                singer: 'Katie Sky Lyrics',
                path: './music/y2mate.com - Monsters  Katie Sky Lyrics  Vietsub .mp3',
                image: './img/Untitled.png'
            },
            {
                name: 'LONELY',
                singer: 'Nana',
                path: './music/y2mate.com - Nana  LONELY 抖音DJPad仔 FunkyHouse Remix Tiktok 2022 越南鼓  Hot Trend Tiktok Douyin.mp3',
                image: './img/Untitled.png'
            },
            {
                name: 'Reality',
                singer: 'Lost Frequencies',
                path: './music/y2mate.com - Reality    Lost  Frequencies     Lyrics  Vietsub.mp3',
                image: './img/Untitled.png'
            },
            {
                name: 'Try Pnk',
                singer: 'Steve Wuaten',
                path: './music/y2mate.com - Try  Pnk  Steve Wuaten Remix Lyrics  Vietsub  TikTok .mp3',
                image: './img/Untitled.png'
            },
            {
                name: 'Umbrella',
                singer: 'Ember Island Matte',
                path: './music/y2mate.com - Umbrella  Ember Island  Matte Remix Lyrics  Vietsub .mp3',
                image: './img/Untitled.png'
            },
            {
                name: 'Unstoppable',
                singer: 'Sia Lyrics',
                path: './music/y2mate.com - Unstoppable  Sia Lyrics  Vietsub .mp3',
                image: './img/Untitled.png'
            },
            {
                name: 'Vicetone',
                singer: 'Walk Thru Fire',
                path: './music/y2mate.com - Vicetone  Walk Thru Fire Lyrics ft Meron Ryan.mp3',
                image: './img/Untitled.png'
            },
        ],
        setConfig(key, value) {
            this.config[key] = value;
            localStorage.setItem(PLAYER_STORAEGE_KEY, JSON.stringify(this.config));
        },
        render() {
            const htmls = this.songs.map((song, index) => {
                return ` 
                    <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                        <div class="thumb"
                            style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>`
            })
            playlist.innerHTML = htmls.join('');
        },
        //  Định nghĩa ra currentSong lấy bài hát đâu tiên
        defineProperties() {
            Object.defineProperty(this, 'currentSong', {
                get() {
                    return this.songs[this.currentIndex];
                }
            })
        },
        handleEvents() {
            const _this = this;
            const cdWidth = cd.offsetWidth;

            // Xử lý CD quay và dừng
            const cdThumbAnimate = cdThumb.animate([{
                transform: 'rotate(360deg)'
            }], {
                duration: 10000,
                iterations: Infinity
            })
            cdThumbAnimate.pause();

            // Xử lý phong to thu nhỏ CD
            document.onscroll = () => {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const newCdWidth = - scrollTop + cdWidth;
                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
                cd.style.opacity = newCdWidth / cdWidth;
            }

            // Xủ lý khi click play
            playBtn.onclick = () => {
                if (_this.isPlaying) {
                    audio.pause();
                }
                else {
                    audio.play();
                }
            }

            // Khi bài hát được play
            audio.onplay = () => {
                _this.isPlaying = true;
                player.classList.add('playing');
                cdThumbAnimate.play();
            }

            // Khi bài hát được pause
            audio.onpause = () => {
                _this.isPlaying = false;
                player.classList.remove('playing');
                cdThumbAnimate.pause();
            }

            // Khi tiến độ bài hát thay đổi 
            audio.ontimeupdate = () => {
                if (audio.duration) {
                    progress.value = Math.floor((audio.currentTime / audio.duration) * 100);
                }
            }

            // Xử lý khi tua nhạc
            progress.onchange = (event) => {
                audio.currentTime = (audio.duration / 100) * progress.value;
            }

            // Lùi 1 bài nhạc
            prevBtn.onclick = () => {
                if (_this.isRanDom) {
                    _this.playRandomSong();
                }
                else {
                    _this.prevSong();
                }
                audio.play();
                _this.render();
                _this.scrollTopActiveSong();
            }

            // Tiến 1 bài nhạc
            nextBtn.onclick = () => {
                if (_this.isRanDom) {
                    _this.playRandomSong();
                }
                else {
                    _this.nextSong();
                }
                audio.play();
                _this.render();
                _this.scrollTopActiveSong();
            }

            // Xử lý random bật tắt 
            randomBtn.onclick = () => {
                _this.isRanDom = !_this.isRanDom;
                _this.setConfig('isRanDom', _this.isRanDom)
                randomBtn.classList.toggle('active', _this.isRanDom);
            }

            // Xử lý phát lại 1 bài hát 
            repeatBtn.onclick = () => {
                _this.isRepeat = !_this.isRepeat;
                _this.setConfig('isRepeat', _this.isRepeat)
                repeatBtn.classList.toggle('active', _this.isRepeat);
            }

            // Xử lý next bài khi audio ended
            audio.onended = () => {
                if (_this.isRepeat) {
                    audio.play();
                }
                else {
                    if (_this.isRanDom) {
                        _this.playRandomSong();
                    }
                    else {
                        _this.nextSong();
                    }
                    audio.play();
                    _this.render();
                }
            }

            // Khi click vào bài hát
            playlist.onclick = (e) => {
                const songNode = e.target.closest('.song:not(.active)');
                if(songNode || e.target.closest('.option'))
                {
                    // Xử lý khi click vào song
                    if(songNode) {
                        _this.currentIndex = Number(songNode.dataset.index);
                        _this.loadCurrentSong();
                        audio.play();
                        _this.render()
                    }
                    // Xử Lý khi click vào song option
                    if(e.target.closest('.option'))
                    {
                        e.target.closest('.option').getAttribute('data-index')
                    }
                }
            }
        },
        scrollTopActiveSong() {
            setTimeout(() => {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                })
            },200)
        },
        loadCurrentSong() {
            heading.textContent = this.currentSong.name;
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
            audio.src = this.currentSong.path;
        },
        loadConfig() {
            this.isRanDom = this.config.isRanDom;
            this.isRepeat = this.config.isRepeat;
        },
        prevSong() {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1;
            }
            this.loadCurrentSong();
        },
        nextSong() {
            this.currentIndex++;
            if (this.currentIndex == this.songs.length) {
                this.currentIndex = 0;
            }
            this.loadCurrentSong();
        },
        playRandomSong() {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * this.songs.length)
            } while (this.currentIndex === newIndex)
            this.currentIndex = newIndex;
            this.loadCurrentSong();
        },
        start() {

            this.loadConfig()
            // Định ngĩa các thuộc tính cho object
            this.defineProperties();

            // Lắng nghe xử lý các sự kiện (DOM event)
            this.handleEvents();

            // Tải thông tin bài hát đầu tiên khi chạy ứng dụng
            this.loadCurrentSong();

            // Render Playlist
            this.render();
            repeatBtn.classList.toggle('active', this.isRepeat);
            randomBtn.classList.toggle('active', this.isRanDom);
        }
    }

    app.start();
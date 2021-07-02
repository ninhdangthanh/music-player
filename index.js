
  const $ = document.querySelector.bind(document)
  const $$ = document.querySelectorAll.bind(document)

    const PlAYER_STORAGE = "NINHNAM_PLAYER"
  
    const playBtn = $('.btn-toggle-play')
    const player = $('.player')

    const nextBtn = $('.btn-next')
    const prevBtn = $('.btn-prev')
    const randomBtn = $('.btn-random')
    const repeatBtn = $('.btn-repeat')
  
    const heading = $('header h2')
    const cdThumb = $('.cd-thumb')
    const audio = $('audio')
    const progress = $('#progress')
    const playlist = $('.playlist')
  
  
  const app = {
    currentIndex : 0 ,
    isPlaying : false ,
    isRandom : false ,    
    isRepeat : false ,
    config : JSON.parse(localStorage.getItem(PlAYER_STORAGE)) || {} ,
    setConfig: function (key, value) {
      this.config[key] = value;
      localStorage.setItem(PlAYER_STORAGE, JSON.stringify(this.config));
    } ,
    songs: [
      {
        name: "Vách Ngọc Ngà",
        singer: "Anh Rồng",
        path: "./music/Vach Ngoc Nga - Anh Rong.mp3",
        image: "./Image/vách-ngọc-ngà.jpg"
      },
      {
        name: "Tình Ka",
        singer: "G5R",
        path: "./music/Tinh Ka - G5RSquad.mp3",
        image:
          "./Image/tình-ka.jpg"
      },
      {
        name: "Phận duyên lỡ làng",
        singer: "Phát Huy T4",
        path: "./music/Phan Duyen Lo Lang - Phat Huy T4_ Truzg.mp3",
        image:
          "./Image/phanduyenlolang.jpg"
      },
      {
        name: "Save Me",
        singer: "Deam",
        path:
          "./music/SaveMe-Deamn-4780867.mp3",
        image: "./Image/save-me.jpg"
      },
      {
        name: "Ép Duyên",
        singer: "Long nón lá",
        path: "./music/EpDuyenCover-LongNonLaKaydee-6971600.mp3",
        image:
          "./Image/ép-duyên.jpg"
      },
      {
        name: "Hẹn em kiếp sau",
        singer: "Duy Phúc",
        path: "./music/Hen Em Kiep Sau - La_ x Duy Phuc x TiB.mp3",
        image:
          "./Image/hệnmKS.jpg"
      },
      {
        name: "Chiều thu họa bóng nàng",
        singer: "Datkka",
        path:
          "./music/Chieu Thu Hoa Bong Nang - DatKaa.mp3",
        image:
          "./Image/chiều-thu.jpg"
      },
      {
        name: "Ghé qua",
        singer: "Bạn có tài mà",
        path: "./music/Ghe Qua - Tofu_ PC_ Dick.mp3",
        image:
          "./Image/ghé qua.jpg"
      },
      {
        name: "Nevada",
        singer: "ViceToneCo",
        path:
          "./music/Nevada-VicetoneCoziZuehlsdorff-4498121.mp3",
        image:
          "./Image/nevada.jpg"
      },
      {
        name: "SummerTime",
        singer: "K-391",
        path:
          "./music/Summertime-K391-3549537.mp3",
        image:
          "./Image/summerTime.jpg"
      },
      {
        name: "Tương phùng",
        singer: "Long nón la X 199x",
        path:
          "./music/Tuong Phung - Long Non La_ The 199X.mp3",
        image:
          "./Image/tương-phùng.jpg"
      },
    ],
    render : function () {
      const htmls = this.songs.map(function (song, index) {
          return `<div class="song ${index === this.currentIndex ? "active" : ""}" data-index = "${index}">
          <div class="thumb" style="background-image: url('${song.image}')">
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
      $('.playlist').innerHTML = htmls.join('')
      document.getElementsByClassName('song')[this.currentIndex].classList.add('active')
    },
    
    defineProperties : function () {
      Object.defineProperty(this, 'currentSong', {
        get: function () {
          return this.songs[this.currentIndex]
        }
      })
    },
  
    handleEvent : function () {
      _this = this
      const cd = $('.cd')
      const cdWidth = cd.offsetWidth

    // Xử lý khi quay dừng
      const cdThumbAnimate = cdThumb.animate([
        {transform : "rotate(360deg)"}
      ],{
        duration : 5000,
        iterations : Infinity
      });
      
      cdThumbAnimate.pause()

    // Xử lý phóng to thu nhỏ CD
      document.onscroll = function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newCdWidth = cdWidth - scrollTop
        
        cd.style.width = (newCdWidth < 0) ? 0 : newCdWidth
        cd.style.opacity = newCdWidth / cdWidth
      }
      
    // Xử lý khi click play
      playBtn.onclick = function () {
        if (_this.isPlaying) {
          audio.pause()
        }
        else {
          audio.play()
        }
      }

      console.log(cdThumbAnimate)
  
    // Xử lí khi play 
      audio.onplay = function () {
        player.classList.add('playing')
        _this.isPlaying = true
        cdThumbAnimate.play()
      }
    // Xử lí khi bị pause
      audio.onpause = function () {
        player.classList.remove('playing')
        _this.isPlaying = false
        cdThumbAnimate.pause()
      }
  
    //  Khi tiến độ bài hát thay đổi
      audio.ontimeupdate = function () {
        if (audio.duration) {
          const progressPercent = Math.floor(audio.currentTime * 100 / audio.duration )
          progress.value = progressPercent
        }
      }
    
    // Xử lý khi tua song
      progress.onchange = function(e) {
        const seekTime = audio.duration / 100 * e.target.value
        audio.currentTime = seekTime
      }

    // Khi next bài hát 
    nextBtn.onclick = function () {
      if(_this.isRandom) {
        _this.playRandomSong()
      }
      else {
        _this.nextSong()
      }
      audio.play()
      _this.render()
      _this.scrollToActiveSong()
    }
    // Khi prev bài hát
      prevBtn.onclick = function () {
        if(_this.isRandom) {
          _this.playRandomSong()
        }
        else {
          _this.prevSong()
        }
        audio.play()
        _this.render()
        _this.scrollToActiveSong()
      }

    // Khi random song
      randomBtn.onclick = function () {
        _this.isRandom = !_this.isRandom
        _this.setConfig('isRandom', _this.isRandom)  
        randomBtn.classList.toggle('active', _this.isRandom)
      }

    // Khi repeat song
      repeatBtn.onclick = function () {
        _this.isRepeat = !_this.isRepeat
        _this.setConfig('isRepeat', _this.isRepeat)  
        repeatBtn.classList.toggle('active', _this.isRepeat)
      }

    // Khi bài hát kết thúc
      audio.onended = function () {

        if(_this.isRepeat){
          audio.play()
        }
        else {
          nextBtn.click()
        }
      }

      playlist.onclick = function (e) {
        const songNode = e.target.closest('.song:not(.active)')
        if (songNode || e.target.closest('.option')) {
          // Xử lý khi click vào song
          if (songNode) {
            _this.currentIndex = Number(songNode.dataset.index)

            _this.loadCurrentSong()
            audio.play()
          }
        }
      }
  
    },
    scrollToActiveSong : function () {
      setTimeout(() => {
        $('.song.active').scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 300);
    },
    loadCurrentSong : function () {
      heading.innerHTML = this.currentSong.name
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
      audio.src = this.currentSong.path
      this.render()
    },
    loadConfig : function () {
      this.isRandom = this.config.isRandom
      this.isRepeat = this.config.isRepeat
      randomBtn.classList.toggle('active', this.isRandom)
      repeatBtn.classList.toggle('active', this.isRepeat)
      // this.loadCurrentSong()
    },
    nextSong : function () {
      this.currentIndex ++

      if(this.currentIndex > (this.songs.length - 1)) {
        this.currentIndex = 0
      }

      this.loadCurrentSong()
    },
    prevSong : function () {
      this.currentIndex --

      if(this.currentIndex < 0) {
        this.currentIndex = (this.songs.length - 1)
      }

      this.loadCurrentSong()
    },
    playRandomSong : function () {
      let newIndex 
      do {
        newIndex = Math.floor( Math.random() * this.songs.length)
      } while (newIndex === this.currentIndex);
      this.currentIndex = newIndex

      this.loadCurrentSong()
    },
  
    start : function (){

      this.loadConfig()

      // Định nghĩa các thuộc tính cho object
      this.defineProperties()

      // Lắng nghe xử lí các sự kiện (DOM events)
      this.handleEvent()
  
      // Tải Thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
      this.loadCurrentSong()

    }

  
  }
  
  
  app.start()
  
  
  

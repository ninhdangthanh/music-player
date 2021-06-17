
  const $ = document.querySelector.bind(document)
  const $$ = document.querySelectorAll.bind(document)
  
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
  
  
  const app = {
    currentIndex : 0 ,
    isPlaying : false ,
    isRandom : false ,
    isRepeat : false ,
    songs: [
      {
        name: "Click Pow Get Down",
        singer: "Raftaar x Fortnite",
        path: "./music/Vach Ngoc Nga - Anh Rong.mp3",
        image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
      },
      {
        name: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "./music/Tinh Ka - G5RSquad.mp3",
        image:
          "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
      },
      {
        name: "Naachne Ka Shaunq",
        singer: "Raftaar x Brobha V",
        path:
          "https://mp3.filmysongs.in/download.php?id=Naachne Ka Shaunq Raftaar Ft Brodha V Mp3 Hindi Song Filmysongs.co.mp3",
        image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
      },
      {
        name: "Mantoiyat",
        singer: "Raftaar x Nawazuddin Siddiqui",
        path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
        image:
          "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
      },
      {
        name: "Aage Chal",
        singer: "Raftaar",
        path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
        image:
          "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
      },
      {
        name: "Damn",
        singer: "Raftaar x kr$na",
        path:
          "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
        image:
          "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
      },
      {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
        path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
        image:
          "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
      }
    ],
    render : function () {
      const htmls = this.songs.map(function (song, index) {
          return `<div class="song ${index === this.currentIndex ? "active" : ""}">
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
        duration : 100,
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
        randomBtn.classList.toggle('active', _this.isRandom)
      }

    // Khi repeat song
      repeatBtn.onclick = function () {
        _this.isRepeat = !_this.isRepeat
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
      // Định nghĩa các thuộc tính cho object
      this.defineProperties()

      // Lắng nghe xử lí các sự kiện (DOM events)
      this.handleEvent()
  
      // Tải Thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
      this.loadCurrentSong()
  
      // Render playlist
      this.render()

    }

  
  }
  
  
  app.start()
  
  
  

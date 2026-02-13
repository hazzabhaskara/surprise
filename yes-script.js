// ==========================================
//  22 ALASAN KENAPA AKU SAYANG KAMU
//  (Ganti dengan alasan personalmu sendiri!)
// ==========================================

const reasons = [
    "Karena senyummu selalu bikin hariku lebih cerah ☀️",
    "Karena kamu selalu dengerin ceritaku, bahkan yang nggak penting sekalipun 🥰",
    "Karena tawamu itu menular banget, bikin aku ikut ketawa 😄",
    "Karena kamu selalu support aku di saat aku ngerasa nggak bisa 💪",
    "Karena pelukan kamu rasanya kayak rumah 🏠",
    "Karena kamu sabar banget ngadepin aku yang kadang nyebelin 😅",
    "Karena cara kamu marah itu lucu banget, nggak bisa dibawa serius 🤭",
    "Karena kamu selalu inget hal-hal kecil tentang aku 🥺",
    "Karena setiap momen sama kamu selalu jadi kenangan terindah 💫",
    "Karena kamu bikin aku jadi orang yang lebih baik setiap harinya ✨",
    "Karena kamu nggak pernah bosan bilang sayang, dan aku nggak pernah bosan dengernya 💕",
    "Karena mata kamu.. entahlah, aku bisa tenggelam di situ 👀",
    "Karena kamu selalu tau cara bikin aku tenang saat aku gelisah 🌙",
    "Karena jalan-jalan sama kamu, mau ke mana aja, selalu seru 🚗",
    "Karena kamu terima aku apa adanya, nggak ada yang perlu ditutup-tutupi 💛",
    "Karena cara kamu peduli ke orang-orang di sekitarmu bikin aku makin kagum 🌻",
    "Karena bareng kamu, waktu rasanya berjalan terlalu cepat ⏳",
    "Karena kamu selalu jadi alasan aku senyum tanpa sadar 😊",
    "Karena setiap chat dari kamu bikin hari jadi lebih berwarna 🌈",
    "Karena aku nggak bisa bayangin hidup tanpa kamu di dalamnya 💗",
    "Karena kamu adalah jawaban dari semua doa-doaku 🤲",
    "Karena kamu adalah hadiah terbaik yang pernah aku terima... Happy 22nd Birthday, sayang! 🎂🎉💖"
]

let currentIndex = 0
let musicPlaying = false

// === INIT ===
window.addEventListener('load', () => {
    showReason(0)
    launchSmallConfetti()

    // Autoplay music
    const music = document.getElementById('bg-music')
    music.volume = 0.3
    music.play().then(() => {
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }).catch(() => {
        // Will play on first interaction
        document.addEventListener('click', () => {
            music.play().catch(() => { })
            musicPlaying = true
            document.getElementById('music-toggle').textContent = '🔊'
        }, { once: true })
    })
})

// === REASON DISPLAY ===
function showReason(index) {
    const card = document.getElementById('reason-card')
    const numberEl = document.getElementById('reason-number')
    const textEl = document.getElementById('reason-text')
    const counterEl = document.getElementById('current-num')
    const progressFill = document.getElementById('progress-fill')

    // Check if it's the final card (index 22 = birthday message)
    const isFinal = index >= reasons.length

    if (isFinal) {
        showFinale()
        return
    }

    // Update content
    numberEl.textContent = `#${index + 1}`
    textEl.textContent = reasons[index]
    counterEl.textContent = index + 1

    // Update progress bar
    const progress = ((index + 1) / 22) * 100
    progressFill.style.width = `${progress}%`

    // Card animation
    card.classList.remove('slide-in', 'finale')
    void card.offsetWidth // force reflow
    card.classList.add('slide-in')

    // Reset finale content if going back
    card.innerHTML = `
        <div class="reason-number" id="reason-number">#${index + 1}</div>
        <div class="reason-text" id="reason-text">${reasons[index]}</div>
    `

    // Update button states
    document.getElementById('prev-btn').disabled = index === 0
    document.getElementById('next-btn').textContent = index === reasons.length - 1 ? '🎂' : '▶'

    // Confetti every 5 reasons
    if ((index + 1) % 5 === 0 && index > 0) {
        launchSmallConfetti()
        spawnSparkles()
    }
}

function showFinale() {
    const card = document.getElementById('reason-card')
    const counterEl = document.getElementById('current-num')
    const progressFill = document.getElementById('progress-fill')

    counterEl.textContent = '22'
    progressFill.style.width = '100%'

    card.classList.remove('slide-in')
    card.classList.add('finale')
    void card.offsetWidth
    card.classList.add('slide-in')

    card.innerHTML = `
        <div class="finale-emoji">🎂</div>
        <div class="finale-text">Selamat Ulang Tahun ke-22, Sayangku! 🎉</div>
        <div class="finale-subtext">
            Semoga di umur 22 ini, semua mimpi-mimpimu jadi kenyataan.
            Aku bahagia banget bisa ada di sampingmu. I love you! 💖
        </div>
    `

    document.getElementById('next-btn').style.display = 'none'

    // MASSIVE confetti
    launchBigConfetti()
}

// === NAVIGATION ===
function nextReason() {
    if (currentIndex < reasons.length - 1) {
        currentIndex++
        showReason(currentIndex)
    } else {
        // Show finale
        showFinale()
    }
}

function prevReason() {
    if (currentIndex > 0) {
        currentIndex--
        showReason(currentIndex)
        document.getElementById('next-btn').style.display = ''
    }
}

// === CONFETTI ===
function launchSmallConfetti() {
    const colors = ['#ffd700', '#ff69b4', '#ff1493', '#ffb3c1', '#fff', '#a855f7', '#fbbf24']
    confetti({
        particleCount: 60,
        spread: 80,
        origin: { x: 0.5, y: 0.4 },
        colors
    })
}

function launchBigConfetti() {
    const colors = ['#ffd700', '#ff69b4', '#ff1493', '#ffb3c1', '#fff', '#a855f7', '#fbbf24', '#f97316']
    const duration = 5000
    const end = Date.now() + duration

    // Initial big burst
    confetti({
        particleCount: 200,
        spread: 120,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)

    // Star burst from center
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 360,
            startVelocity: 30,
            decay: 0.95,
            origin: { x: 0.5, y: 0.5 },
            shapes: ['star'],
            colors: ['#ffd700', '#ffaa00']
        })
    }, 1500)
}

function spawnSparkles() {
    const sparkles = ['✨', '🌟', '⭐', '💫']
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const el = document.createElement('div')
            el.className = 'sparkle'
            el.textContent = sparkles[Math.floor(Math.random() * sparkles.length)]
            el.style.left = `${Math.random() * 100}vw`
            el.style.top = `${30 + Math.random() * 50}vh`
            document.body.appendChild(el)
            setTimeout(() => el.remove(), 1000)
        }, i * 100)
    }
}

// === MUSIC ===
function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

  'use client'

  import { useEffect, useRef, useState } from 'react'

  /* ─── Keyframe injection ─── */
  const KEYFRAMES = `
  @keyframes floatY {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-18px) rotate(6deg); }
  }
  @keyframes floatYR {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-14px) rotate(-8deg); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes spinR {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:.5; transform:scale(1.3); }
  }
  @keyframes wiggle {
    0%,100% { transform: rotate(-8deg); }
    50%      { transform: rotate(8deg); }
  }
  @keyframes slideInLeft {
    from { opacity:0; transform:translateX(-60px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity:0; transform:translateX(60px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes slideInUp {
    from { opacity:0; transform:translateY(40px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes bounceIn {
    0%   { opacity:0; transform:scale(.3); }
    50%  { opacity:1; transform:scale(1.08); }
    70%  { transform:scale(.95); }
    100% { transform:scale(1); }
  }
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(30px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
  }
  @keyframes drift {
    0%  { transform: translateX(0) translateY(0); }
    25% { transform: translateX(12px) translateY(-8px); }
    50% { transform: translateX(0) translateY(-16px); }
    75% { transform: translateX(-12px) translateY(-8px); }
    100%{ transform: translateX(0) translateY(0); }
  }
  @keyframes rainbowBorder {
    0%   { border-color: #FF4F7A; }
    25%  { border-color: #FFD633; }
    50%  { border-color: #19C339; }
    75%  { border-color: #24B5F3; }
    100% { border-color: #FF4F7A; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes cardPop {
    from { opacity:0; transform: translateY(30px) scale(.9); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }
  @keyframes starTwinkle {
    0%,100% { opacity:1;  transform: scale(1) rotate(0deg); }
    50%      { opacity:.2; transform: scale(.6) rotate(45deg); }
  }
  @keyframes bubblePop {
    0%   { transform: scale(0) rotate(-10deg); opacity:0; }
    60%  { transform: scale(1.1) rotate(3deg); opacity:1; }
    100% { transform: scale(1) rotate(0deg); opacity:1; }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ─── Hide scrollbar utility for mobile horizontal scroll ─── */
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  `

  /* ─── Floating background decoration component ─── */
      type FloatingItem = {
        el: React.ReactNode
        left: string
        top: string
        size: string
        anim: string
        dur: number
        delay?: number
        opacity?: number
      }

  function FloatingBg({ items }: { items: FloatingItem[] }) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden>
        {items.map((it, i) => (
          <span key={i} style={{
            position: 'absolute',
            left: it.left,
            top: it.top,
            fontSize: it.size,
            animation: `${it.anim} ${it.dur}s ${it.delay || 0}s ease-in-out infinite`,
            opacity: it.opacity || 0.35,
            zIndex: 1,
            display: 'block',
          }}>{it.el}</span>
        ))}
      </div>
    )
  }

  /* ─── Animated counter ─── */

  function Counter({
    target,
    suffix = '',
  }: {
    target: number
    suffix?: string
  }) {

    const [count, setCount] = useState(0)

    const ref = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {

      const observer = new IntersectionObserver((entries) => {

        const entry = entries[0]

        if (entry.isIntersecting) {

          let start = 0

          const step = Math.ceil(target / 60)

          const timer = setInterval(() => {

            start += step

            if (start >= target) {

              setCount(target)

              clearInterval(timer)

            } else {

              setCount(start)

            }

          }, 25)

          observer.disconnect()

        }

      }, { threshold: 0.5 })

      if (ref.current) observer.observe(ref.current)

      return () => observer.disconnect()

    }, [target])

    return (
      <span ref={ref}>
        {count}
        {suffix}
      </span>
    )
  }


  /* ─── Video Card ─── */
  function VideoCard({ src, idx }: { src: string; idx: number }) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
      return () => {
        document.body.style.overflow = ''
      }
    }, [open])

    useEffect(() => {
      if (!open) return

      const overlay = document.createElement('div')
      overlay.id = `video-overlay-${idx}`
      Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.92)',
        zIndex: '2147483647',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box',
      })

      const box = document.createElement('div')
      Object.assign(box.style, {
        position: 'relative',
        width: '100%',
        maxWidth: '820px',
        backgroundColor: '#0d1b3e',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '4px solid #FFD633',
        boxShadow: '0 0 0 6px #123B91',
      })

      const closeBtn = document.createElement('button')
      closeBtn.innerHTML = '×'
      Object.assign(closeBtn.style, {
        position: 'absolute',
        top: '12px',
        right: '12px',
        zIndex: '10',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        backgroundColor: '#FF4F7A',
        color: 'white',
        fontSize: '28px',
        fontWeight: '900',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '1',
        boxShadow: '0 4px 0 #c0325a',
      })

      const videoWrap = document.createElement('div')
      Object.assign(videoWrap.style, {
        width: '100%',
        aspectRatio: '16/9',
        backgroundColor: '#000',
      })

      const video = document.createElement('video')
      video.src = src
      video.controls = true
      video.autoplay = true
      video.playsInline = true
      Object.assign(video.style, {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      })

      const closeHandler = () => {
        video.pause()
        document.body.removeChild(overlay)
        setOpen(false)
      }

      closeBtn.addEventListener('click', closeHandler)
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeHandler()
      })

      const keyHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeHandler()
      }
      document.addEventListener('keydown', keyHandler)

      videoWrap.appendChild(video)
      box.appendChild(closeBtn)
      box.appendChild(videoWrap)
      overlay.appendChild(box)
      document.body.appendChild(overlay)

      return () => {
        document.removeEventListener('keydown', keyHandler)
        if (document.getElementById(`video-overlay-${idx}`)) {
          video.pause()
          document.body.removeChild(overlay)
        }
      }
    }, [open, src, idx])

    return (
      <div
        className="relative rounded-[24px] border-[3px] border-[#E5B84B] shadow-[0_8px_0_0_#E5B84B]
          hover:shadow-[0_4px_0_0_#E5B84B] hover:translate-y-[4px] transition-all duration-300
          overflow-hidden group cursor-pointer bg-black"
        style={{ animation: `cardPop .6s ${.1 + idx * .18}s ease both` }}
        onClick={() => setOpen(true)}
      >
        {/* THUMBNAIL — portrait 9/16, object-cover so no black bars */}
        <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: '9/16' }}>
          <video
            src={src}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-[#123B91]/20 group-hover:bg-[#123B91]/40 transition-all duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-[68px] h-[68px] rounded-full bg-[#FFD633] border-[4px] border-[#123B91]
                flex items-center justify-center shadow-[4px_4px_0_#123B91]
                group-hover:scale-110 group-hover:bg-white transition-all duration-300"
              style={{ animation: 'floatY 3s ease-in-out infinite' }}
            >
              <svg className="w-8 h-8 fill-[#123B91] ml-1" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  }


  export default function HomePage() {
    const [showForm, setShowForm] = useState(false)
    return (
      <main className="overflow-hidden bg-[#F8F5ED] pt-[80px] md:pt-[120px]">
        <style>{KEYFRAMES}</style>

        {/* ═══════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════ */}
  <section id="home" className="relative overflow-hidden pt-[70px] sm:pt-[90px] lg:pt-[100px] pb-[120px] sm:pb-[200px] md:pb-[360px]">

          {/* Background image */}
          {/* Desktop Background */}
            <div
              className="
                absolute
                inset-0
                hidden
                lg:block
                bg-cover
                bg-center
                bg-no-repeat
              "
              style={{
                backgroundImage: "url('/images/hero-bg.png')"
              }}
            />

          {/* MOBILE BACKGROUND */}
          <div
            className="
              absolute
              inset-0

              block
              md:hidden

              bg-cover
              bg-top
              bg-no-repeat
            "
            style={{
              backgroundImage:
                "url('/images/mobile-hero-bg.png')"
            }}
          />

          {/* iPAD BACKGROUND */}
          <div
            className="
              absolute
              inset-0

              hidden
              md:block
              lg:hidden

              bg-[length:100%_100%]
              bg-center
              bg-no-repeat
            "
            style={{
              backgroundImage:
                "url('/images/ipad-hero-bg.png')"
            }}
          />


          <div className="absolute inset-0 bg-[#24B5F3]/10" />

          {/* ── Animated floating bg elements ── */}
          <FloatingBg items={[
            { el: '⭐', left: '5%',  top: '12%', size: '2rem',  anim: 'floatY',     dur: 3.2, delay: 0   },
            { el: '🌟', left: '88%', top: '8%',  size: '2.5rem',anim: 'floatYR',    dur: 4,   delay: 1   },
            { el: '✏️', left: '15%', top: '70%', size: '2rem',  anim: 'wiggle',     dur: 2.5, delay: .5  },
            { el: '🎈', left: '78%', top: '60%', size: '2.8rem',anim: 'floatY',     dur: 5,   delay: .8  },
            { el: '📚', left: '92%', top: '40%', size: '2rem',  anim: 'floatYR',    dur: 3.8, delay: 1.5 },
            { el: '🌈', left: '3%',  top: '45%', size: '2.2rem',anim: 'drift',      dur: 6,   delay: 2   },
            { el: '✦',  left: '50%', top: '5%',  size: '1.5rem',anim: 'starTwinkle',dur: 1.5,delay: .3   },
            { el: '✦',  left: '35%', top: '80%', size: '1.2rem',anim: 'starTwinkle',dur: 2,   delay: .9   },
            { el: '🎯', left: '60%', top: '75%', size: '1.8rem',anim: 'floatY',     dur: 4.5, delay: 1.2 },
            { el: '💫', left: '25%', top: '20%', size: '1.6rem',anim: 'pulse',      dur: 2,   delay: .6  },
          ]} />

          <div className="container relative z-20 mx-auto max-w-[1280px] px-5">
            <div className="grid lg:grid-cols-2 items-center min-h-[auto] lg:min-h-[550px]">

              {/* LEFT SIDE */}
              <div className="max-w-[520px] mx-auto lg:mx-0 text-center lg:text-left pt-[50px]">

                {/* BADGE */}
                <div style={{ animation: 'bubblePop .7s ease both' }}
                  className="inline-flex items-center gap-2 bg-[#FFD633] rounded-full border-[4px] border-[#123B91] px-4 sm:px-6 py-2 sm:py-3 shadow-[4px_4px_0_#123B91] text-[#123B91] font-black text-[12px] sm:text-[14px] mb-5 sm:mb-6">
                  ✨ Phonics Classes For Kids
                </div>

                {/* TITLE */}
                <h1 className="leading-[0.95] font-black tracking-[-2px]">
                  <span style={{ animation: 'slideInLeft .6s .1s ease both' }}
                    className="block text-[#123B91] text-[40px] sm:text-[58px] md:text-[64px] lg:text-[74px]">
                    Strong Phonics.
                  </span>
                  <span style={{ animation: 'slideInLeft .6s .25s ease both' }}
                    className="block text-[#FF4F7A] text-[36px] sm:text-[52px] md:text-[60px] lg:text-[68px]">
                    Strong Foundation,
                  </span>
                  <span style={{ animation: 'slideInLeft .6s .4s ease both' }}
                    className="block text-[#19C339] text-[36px] sm:text-[52px] md:text-[60px] lg:text-[68px]">
                    Bright Future!
                  </span>
                </h1>

                {/* DESCRIPTION */}
                <p style={{ animation: 'fadeIn .8s .55s ease both' }}
                  className="mt-4 sm:mt-5 text-[#222] text-[16px] sm:text-[19px] lg:text-[21px] leading-[1.6] font-bold max-w-[430px] mx-auto lg:mx-0">
                  Fun, engaging and effective phonics classes that help children{" "}
                  <span className="text-[#FF4F7A] font-black"> read</span>,{" "}
                  <span className="text-[#19C339] font-black"> spell</span>{" "}
                  and{" "}
                  <span className="text-[#F59E0B] font-black"> succeed!</span>
                </p>

                {/* FEATURE ICONS */}
                <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-7 sm:mt-8 max-w-[360px] mx-auto lg:mx-0">
                  {[ ['👩‍🏫','Expert'], ['📌','Proven'], ['🎨','Fun'], ['⭐','Personalized'] ].map((item, idx) => (
                    <div key={idx} style={{ animation: `bounceIn .5s ${.7 + idx*.1}s ease both` }} className="text-center">
                      <div className="w-[48px] h-[48px] sm:w-[58px] sm:h-[58px] rounded-full bg-white border-[3px] border-[#123B91] flex items-center justify-center mx-auto shadow-[3px_3px_0_#123B91] text-[18px] sm:text-[22px]
                        hover:scale-110 transition-transform duration-200 cursor-default"
                        style={{ animation: `floatY ${3 + idx * .4}s ${idx * .3}s ease-in-out infinite` }}>
                        {item[0]}
                      </div>
                      <p className="mt-2 text-[#123B91] font-black text-[10px] sm:text-[12px]">{item[1]}</p>
                    </div>
                  ))}
                </div>

                {/* CONNECTED ACTION BUTTONS */}
                <div style={{ animation: 'slideInUp .6s 1.1s ease both' }} 
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7 sm:mt-8 items-center justify-center lg:justify-start w-full">
                  
                  {/* WhatsApp Connection */}
                  <a 
                    href="https://wa.me/919882620805?text=Hi,%20I%20am%20interested%20in%20Phonics%20Classes!" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#19C339] text-white rounded-[20px] border-[4px] border-[#123B91] px-6 py-3 font-black text-[16px] flex items-center justify-center gap-3 shadow-[5px_5px_0_#123B91] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0_#123B91] transition-all duration-200 cursor-pointer active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_#123B91] no-underline"
                  >
                    <svg className="w-6 h-6 fill-white shrink-0" viewBox="0 0 24 24">
                      <path d="M12.004 2c-5.51 0-9.993 4.483-9.993 9.993 0 1.763.457 3.49 1.329 5.005L2 22l5.122-1.343c1.467.8 3.11 1.222 4.781 1.222 5.51 0 9.994-4.483 9.994-9.993C21.997 6.483 17.514 2 12.004 2zm5.221 14.12c-.227.64-.897 1.177-1.609 1.348-.485.114-1.12.212-3.243-.668-2.716-1.127-4.467-3.9-4.603-4.08-.135-.18-1.111-1.48-1.111-2.82 0-1.343.702-2.003.951-2.275.25-.272.544-.34.726-.34h.521c.18 0 .43.023.634.521.227.544.771 1.882.839 2.019.068.136.113.318.022.5-.09.18-.136.317-.272.476-.136.158-.295.34-.408.475-.136.159-.272.34-.114.612.159.272.703 1.157 1.52 1.882.158.137.317.25.52.34.205.09.41.114.568-.045.158-.16.68-.794.862-1.066.18-.272.363-.227.612-.136.25.09 1.588.75 1.86 1.112.272.113.272.272.204.544z"/>
                    </svg>
                    <div className="text-left leading-tight">
                      <span className="block text-[15px] font-black">WhatsApp Us</span>
                      <span className="block text-[11px] opacity-90 font-medium">Chat on WhatsApp</span>
                    </div>
                  </a>

                  {/* Email Connection */}
                  <a 
                    href="mailto:reenaminhas4426@gmail.com?subject=Inquiry%20About%20Phonics%20Classes"
                    className="w-full sm:w-auto bg-white text-[#123B91] rounded-[20px] border-[4px] border-[#123B91] px-6 py-3 font-black text-[16px] flex items-center justify-center gap-3 shadow-[5px_5px_0_#123B91] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0_#123B91] transition-all duration-200 cursor-pointer active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_#123B91] no-underline"
                  >
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="#EAEAEA"/>
                      <path d="M22 6v12c0 1.1-.9 2-2 2h-3V8l-5 4-5-4v12H4c-1.1 0-2-.9-2-2V6l10 7 10-7z" fill="#4285F4"/>
                      <path d="M2 6v2l10 7 10-7V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2z" fill="#EA4335"/>
                    </svg>
                    <div className="text-left leading-tight">
                      <span className="block text-[15px] font-black text-[#123B91]">Email Us</span>
                      <span className="block text-[11px] text-gray-500 font-medium">Send us an Email</span>
                    </div>
                  </a>
                  
                </div>

            </div>
            <div />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════════ */}
      <section id="about" className="relative bg-[#F8F5ED] mt-0 lg:-mt-[60px] z-30 pb-[60px] sm:pb-[80px] pt-[40px] sm:pt-[80px] overflow-hidden">

        {/* Animated bg */}
        <FloatingBg items={[
          { el: '🔤', left: '2%',  top: '15%', size: '2rem',  anim: 'floatY',  dur: 4,   delay: 0   },
          { el: '📖', left: '90%', top: '20%', size: '2rem',  anim: 'floatYR', dur: 3.5, delay: .5  },
          { el: '🌟', left: '95%', top: '65%', size: '1.8rem',anim: 'pulse',   dur: 2,   delay: 1   },
          { el: '✏️', left: '5%',  top: '70%', size: '2rem',  anim: 'wiggle',  dur: 2.5, delay: .3  },
          { el: '🎓', left: '48%', top: '5%',  size: '2.2rem',anim: 'floatY',  dur: 5,   delay: 1.5 },
          { el: '✦',  left: '20%', top: '10%', size: '1.4rem',anim: 'starTwinkle',dur:1.8,delay:.7 },
          { el: '✦',  left: '75%', top: '85%', size: '1.2rem',anim: 'starTwinkle',dur:2.2,delay:1.1},
          { el: '🌈', left: '60%', top: '90%', size: '2rem',  anim: 'drift',   dur: 6,   delay: 2   },
        ]} />

        <div className="max-w-[1140px] mx-auto px-5">
          <div className="relative bg-[#FFF9EF] border-[4px] border-[#E5B84B] rounded-[28px] sm:rounded-[45px] shadow-[0_8px_0_#E5B84B] px-5 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12"
            style={{ animation: 'slideInUp .7s ease both' }}>

            <div className="absolute right-5 sm:right-8 top-5 sm:top-8 text-[20px] sm:text-[26px] rotate-[20deg] select-none"
              style={{ animation: 'wiggle 2s ease-in-out infinite' }}>✏️</div>

            {/* Orbiting decoration */}
            <div className="absolute right-16 top-16 w-8 h-8 pointer-events-none hidden lg:block"
              style={{ animation: 'orbit 4s linear infinite' }}>
              <span style={{ fontSize: '1.2rem' }}>⭐</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 sm:gap-8 items-center">

              {/* LEFT IMAGE */}
              <div className="relative flex justify-center items-end h-full pt-2 sm:pt-6"
                style={{ animation: 'slideInLeft .8s .2s ease both' }}>
                <div className="w-full max-w-[260px] sm:max-w-[340px] lg:max-w-none hover:scale-105 transition-transform duration-300"
                  style={{ animation: 'floatY 4s ease-in-out infinite' }}>
                  <img src="/images/about-girl.png" alt="Learning Phonics" className="w-full h-auto object-contain" />
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div className="flex flex-col justify-center text-center lg:text-left lg:pl-4"
                style={{ animation: 'slideInRight .8s .3s ease both' }}>

                <div>
                  <div className="inline-flex items-center bg-[#FFD633] border-[3px] border-[#123B91] rounded-full px-5 py-1 text-[#123B91] font-black text-[13px] shadow-[3px_3px_0_#123B91] mb-4"
                    style={{ animation: 'bounceIn .6s .5s ease both' }}>
                    ABOUT US
                  </div>
                </div>

                <h2 className="text-[#123B91] font-black leading-[1.1] text-[26px] sm:text-[32px] md:text-[40px] lg:text-[45px] tracking-[-0.5px]">
                  Building Strong Readers
                  <br />from the Start
                </h2>

                <p className="mt-4 text-[#444] text-[14px] sm:text-[15px] md:text-[17px] leading-[1.7] font-semibold max-w-[650px] mx-auto lg:mx-0">
                  At Crest and Core Phonics Classes, we believe every child can become
                  a confident reader. Our phonics-based programs are designed to make
                  learning fun, interactive and highly effective. We focus on building
                  strong reading foundations through engaging activities, sounds and stories.
                </p>

                {/* STATS ROW */}
{/* STATS ROW */}
<div
  className="
    flex
    flex-wrap

    justify-center
    lg:justify-start

    items-center

    gap-y-5
    gap-x-6
    sm:gap-x-8

    mt-7
    sm:mt-8
  "
>

  {[
    {
      icon: '🏆',
      val: '5+',
      label: 'Years Experience',
      suffix: ''
    },

    {
      icon: '😊',
      val: 1000,
      label: 'Happy Learners',
      suffix: '+'
    },

    {
      icon: '🎖️',
      text: 'Experienced',
      label: 'Educators'
    },

  ].map((s, i) => (

    <div
      key={i}
      className="
        flex
        items-center
        gap-3

        w-[190px]
        sm:w-auto

        justify-start
      "
      style={{
        animation:
          `slideInUp .5s ${.8 + i*.15}s ease both`
      }}
    >

      {/* ICON */}
      <div
        className="
          w-[42px]
          h-[42px]

          flex
          items-center
          justify-center

          text-[30px]
          sm:text-[36px]

          leading-none
          shrink-0
        "
        style={{
          animation:
            `floatY ${3.5 + i*.5}s ${i*.4}s ease-in-out infinite`
        }}
      >
        {s.icon}
      </div>

      {/* TEXT */}
      <div className="flex flex-col">

        <h4
          className="
            text-[#123B91]
            font-black

            text-[18px]
            md:text-[20px]

            leading-tight
          "
        >

          {s.val
            ? (
              typeof s.val === 'number'
                ? (
                  <Counter
                    target={s.val}
                    suffix={s.suffix}
                  />
                )
                : s.val
            )
            : s.text}

        </h4>

        <p
          className="
            text-[#444]

            text-[14px]

            font-semibold

            leading-[1.3]
          "
        >
          {s.label}
        </p>

      </div>

    </div>

  ))}

</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LEARNING PATH SECTION
      ═══════════════════════════════════════════ */}
      <section id="program" className="relative pt-[45px] pb-[70px] sm:pb-[85px] select-none bg-[#F8F5ED] overflow-hidden">

        {/* Animated bg */}
        <FloatingBg items={[
          { el: '🔠', left: '3%',  top: '20%', size: '2rem',  anim: 'floatY',     dur: 4,   delay: 0   },
          { el: '📝', left: '93%', top: '15%', size: '2rem',  anim: 'floatYR',    dur: 3.5, delay: .6  },
          { el: '🎪', left: '88%', top: '70%', size: '2.2rem',anim: 'drift',      dur: 6,   delay: 1   },
          { el: '🚀', left: '6%',  top: '75%', size: '2rem',  anim: 'floatY',     dur: 5,   delay: 1.2 },
          { el: '✦',  left: '48%', top: '8%',  size: '1.5rem',anim: 'starTwinkle',dur: 1.8, delay: .4  },
          { el: '⭐', left: '15%', top: '50%', size: '1.6rem',anim: 'pulse',      dur: 2.2, delay: .9  },
          { el: '💡', left: '80%', top: '40%', size: '1.8rem',anim: 'wiggle',     dur: 2.8, delay: .5  },
          { el: '🌟', left: '55%', top: '90%', size: '1.5rem',anim: 'floatYR',    dur: 4.2, delay: 1.8 },
        ]} />

        <div className="max-w-[1200px] mx-auto px-4 relative mb-[35px] sm:mb-[45px]">

          {/* Overhead dashed pathway */}
          <div className="absolute inset-x-0 top-0 h-[110px] hidden lg:block pointer-events-none z-0">
            <svg width="100%" height="110" viewBox="0 0 1200 110" fill="none" preserveAspectRatio="none">
              <path d="M 90,82 C 160,20 380,5 500,45 M 700,45 C 820,5 1040,20 1110,82"
                stroke="#9B88FF" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" className="opacity-60"/>
            </svg>
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-[20px] relative z-10"
            style={{ animation: 'bounceIn .6s ease both' }}>
            <div className="relative flex items-center justify-center bg-[#E1F2FF] border-[2px] border-[#123B91] rounded-xl px-5 py-2 shadow-[2px_2px_0_0_#123B91]">
              <div className="absolute inset-0 opacity-[0.08] rounded-xl bg-[radial-gradient(#123b91_1px,transparent_1px)] [background-size:4px_4px]" />
              <span className="text-[#123B91] font-black text-[12px] tracking-wide relative z-10">OUR PROGRAM</span>
            </div>
          </div>

          {/* Title row */}
          <div className="flex items-center justify-center w-full relative"
            style={{ animation: 'slideInUp .7s .2s ease both' }}>

            <div className="hidden lg:flex absolute right-[52%] top-1/2 transform -translate-y-1/2 items-center pointer-events-none select-none w-[400px] h-[100px]">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#FF7865" stroke="#123B91" strokeWidth="2.2" strokeLinejoin="round"
                className="absolute left-0 bottom-[10px] rotate-[-12deg] filter drop-shadow-[1.5px_2px_0_#123B91]"
                style={{ animation: 'spin 8s linear infinite' }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="absolute left-[55px] top-[32px] text-[#FCD34D] text-[15px]"
                style={{ animation: 'pulse 2s ease-in-out infinite' }}>✦</span>
              <span className="absolute left-[78px] top-[14px] text-[#FCD34D] text-[20px]"
                style={{ animation: 'pulse 1.5s .5s ease-in-out infinite' }}>✦</span>
              <div className="absolute left-[130px] top-[2px] transform -rotate-[8deg]"
                style={{ animation: 'floatY 3s ease-in-out infinite' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="#C5B5FF" stroke="#123B91" strokeWidth="2.2" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-[10px] sm:gap-[14px] z-10 px-4 relative">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFD633" stroke="#123B91" strokeWidth="2.5" strokeLinejoin="round"
                className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] rotate-[-8deg] filter drop-shadow-[1.5px_2px_0_#123B91] shrink-0"
                style={{ animation: 'spinR 6s linear infinite' }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <h2 className="text-[#123B91] font-black text-[26px] sm:text-[35px] lg:text-[44px] leading-none tracking-[-0.5px] text-center">
                Phonics Learning Path
              </h2>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFD633" stroke="#123B91" strokeWidth="2.5" strokeLinejoin="round"
                className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] rotate-[12deg] filter drop-shadow-[1.5px_2px_0_#123B91] shrink-0"
                style={{ animation: 'spin 6s linear infinite' }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>

            <div className="hidden lg:flex absolute left-[52%] top-1/2 transform -translate-y-1/2 items-center pointer-events-none select-none w-[400px] h-[100px]">
              <span className="absolute right-[145px] top-[18px] text-[#FCD34D] text-[18px]"
                style={{ animation: 'pulse 2s ease-in-out infinite' }}>✦</span>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#FFB039" stroke="#123B91" strokeWidth="2.2" strokeLinejoin="round"
                className="absolute right-[70px] top-[5px] rotate-[15deg] filter drop-shadow-[1.5px_2px_0_#123B91]"
                style={{ animation: 'spin 7s linear infinite' }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="absolute right-[45px] bottom-[28px] text-[#FCD34D] text-[13px]"
                style={{ animation: 'starTwinkle 1.5s ease-in-out infinite' }}>✦</span>
              <div className="absolute right-0 bottom-[14px] transform rotate-[28deg]"
                style={{ animation: 'floatYR 3.5s ease-in-out infinite' }}>
                <svg width="18" height="26" viewBox="0 0 18 26" fill="none">
                  <rect x="1" y="1" width="16" height="24" rx="8" fill="#BCE635" stroke="#123B91" strokeWidth="2.2"/>
                  <path d="M1 9 H17 M1 17 H17" stroke="#123B91" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* CARDS — Mobile: 2-col grid (all 5 visible) | lg+: 5-col grid */}
        <div className="max-w-[1080px] mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-[14px]">
            {[
              { img: '/images/abc-icon.png',     title: 'Letter Sounds',   text: 'Learn letter names and their sounds from A to Z.',         border: '#E7B23D', bg: '#FFF8E8' },
              { img: '/images/speaker-icon.png', title: 'Blending Sounds', text: 'Blend letters together to make simple words.',             border: '#7FD356', bg: '#F4FFEF' },
              { img: '/images/book-icon.png',    title: 'Sight Words',     text: 'Recognize and read commonly used sight words.',            border: '#FF89B2', bg: '#FFF1F6' },
              { img: '/images/puzzle-icon.png',  title: 'Reading Words',   text: 'Read simple words and build confidence.',                  border: '#B08AFF', bg: '#F7F2FF' },
              { img: '/images/rocket-icon.png',  title: 'Fun Activities',  text: 'Games, stories and activities that make learning fun!',    border: '#7BCBFF', bg: '#EEF8FF' },
            ].map((item, index) => (
              <div key={index}
                className="relative rounded-[24px] border-[3px] px-[14px] pt-[14px] pb-[14px] text-center overflow-hidden
                  hover:translate-y-[-6px] hover:scale-[1.03] transition-all duration-300 cursor-default group"
                style={{
                  borderColor: item.border,
                  background: `linear-gradient(180deg, #FFFDF9 0%, ${item.bg} 100%)`,
                  boxShadow: `0 5px 0 ${item.border}`,
                  animation: `cardPop .5s ${.1 + index * .12}s ease both`,
                }}>
                <div className="absolute inset-0 opacity-[0.16] pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, white 0%, transparent 45%)` }}/>
                <img src={item.img} alt="" className="relative z-10 w-[68px] h-[68px] object-contain mx-auto group-hover:scale-110 transition-transform duration-300"
                  style={{ animation: `floatY ${3 + index * .5}s ${index * .3}s ease-in-out infinite` }}/>
                <h3 className="relative z-10 mt-[10px] text-[#123B91] font-black text-[16px] sm:text-[18px] leading-[1.15]">{item.title}</h3>
                <p className="relative z-10 mt-[8px] text-[#444] text-[13px] leading-[1.6] font-semibold max-w-[120px] mx-auto">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



{/* ═══════════════════════════════════════════
    PROBLEM SOLUTION SECTION
═══════════════════════════════════════════ */}
<section className="relative py-[70px] sm:py-[90px] bg-[#F8F5ED] overflow-hidden">

  {/* Floating Background */}
  <FloatingBg items={[
    { el: '📚', left: '4%', top: '12%', size: '2rem', anim: 'floatY', dur: 4 },
    { el: '⭐', left: '90%', top: '15%', size: '1.8rem', anim: 'pulse', dur: 2 },
    { el: '✏️', left: '8%', top: '75%', size: '2rem', anim: 'wiggle', dur: 3 },
    { el: '🌈', left: '84%', top: '82%', size: '2rem', anim: 'drift', dur: 5 },
    { el: '💡', left: '50%', top: '5%', size: '1.5rem', anim: 'pulse', dur: 2 },
    { el: '✦', left: '30%', top: '20%', size: '1.2rem', anim: 'starTwinkle', dur: 2 },
    { el: '✦', left: '72%', top: '70%', size: '1rem', anim: 'starTwinkle', dur: 1.8 },
  ]} />

  <div className="max-w-[1240px] mx-auto px-5 relative z-10">

    <div
      className="
      relative
      bg-[#FAF6EE]
      rounded-[45px]
      border-[4px]
      border-[#E7B23D]
      shadow-[0_8px_0_#E7B23D]
      overflow-hidden"
      style={{ animation: 'slideInUp .7s ease both' }}
    >

      {/* Soft Background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#FFF9EF_0%,#FFFDF7_100%)] opacity-90" />

      {/* Decorative Shapes */}
      <div className="absolute top-[-50px] right-[-40px] w-[180px] h-[180px] rounded-full bg-[#FFE9A9]/40" />

      <div className="absolute bottom-[-70px] left-[-50px] w-[220px] h-[220px] rounded-full bg-[#D8F1FF]/50" />

      <div
        className="
        relative
        grid
        lg:grid-cols-[58%_42%]

        gap-10
        items-center

        px-8
        sm:px-14

        py-12
        sm:py-16"
      >

        {/* CONTENT */}
        <div
          className="text-center lg:text-left order-2 lg:order-1"
          style={{ animation: 'slideInLeft .8s ease both' }}
        >

          {/* Badge */}
          <div
            className="
            inline-flex
            items-center

            bg-[#FFD633]

            border-[3px]
            border-[#123B91]

            rounded-full

            px-5
            py-2

            text-[#123B91]

            font-black
            text-[12px]

            shadow-[3px_3px_0_#123B91]

            mb-5"
          >
            PHONICS SOLUTION
          </div>

          {/* Heading */}
          <h2
            className="
            text-[#123B91]

            font-black

            leading-[1.12]

            text-[28px]
            sm:text-[36px]
            lg:text-[42px]

            tracking-[-1px]"
          >
            Your Child Knows English…
            <br />

            But Still Can’t

            <span className="text-[#FF4F7A]">
              {' '}Read & Write?
            </span>
          </h2>

          {/* Description */}
          <p
            className="
            mt-5

            text-[#444]

            text-[17px]
            sm:text-[17px]

            leading-[1.9]

            font-semibold

            max-w-[560px]"
          >
            The problem is not grammar…
            it’s a weak phonics foundation.

            Our fun and engaging phonics classes help
            children become confident readers and writers.
          </p>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">

            {[
              'Master 44 Sounds',
              'Read Any Word',
              'Improve Spelling',
              'No More Guessing',
              'Help Kids Read Easily',
              'Basic to Advanced',
            ].map((item, idx) => (

              <div
                key={idx}
                className="
                flex
                items-center
                gap-3

                bg-white

                border-[2px]
                border-[#123B91]

                rounded-[18px]

                px-4
                py-3

                shadow-[2px_2px_0_#123B91]

                hover:translate-y-[-4px]
                hover:scale-[1.02]

                transition-all
                duration-300"
              >

                {/* Tick */}
                <div
                  className="
                  w-[32px]
                  h-[32px]

                  rounded-full

                  bg-[#19C339]

                  flex
                  items-center
                  justify-center

                  text-white
                  font-black
                  text-[15px]

                  shrink-0"
                >
                  ✓
                </div>

                {/* Text */}
                <span
                  className="
                  text-[#123B91]

                  font-black

                  text-[14px]
                  sm:text-[15px]"
                >
                  {item}
                </span>

              </div>

            ))}

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            {/* Join Button */}
            <a
              href="#contact"
              className="
              bg-[#19C339]
              text-white

              rounded-[18px]

              border-[4px]
              border-[#123B91]

              px-7
              py-4

              font-black
              text-[15px]

              shadow-[4px_4px_0_#123B91]

              hover:translate-y-[-4px]
              hover:shadow-[6px_6px_0_#123B91]

              transition-all
              duration-300

              text-center"
            >
              Join Phonics Classes
            </a>

            {/* Explore Button */}
            <a
              href="#program"
              className="
              bg-white
              text-[#123B91]

              rounded-[18px]

              border-[4px]
              border-[#123B91]

              px-7
              py-4

              font-black
              text-[15px]

              shadow-[4px_4px_0_#123B91]

              hover:translate-y-[-4px]
              hover:shadow-[6px_6px_0_#123B91]

              transition-all
              duration-300

              text-center"
            >
              Explore Program
            </a>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div
          className="
          relative
          flex
          justify-center
          items-center

          order-1
          lg:order-2"
          style={{ animation: 'slideInRight .8s ease both' }}
        >

          {/* Glow */}
          <div className="absolute inset-0 bg-[#EAF7FF] rounded-full blur-[40px] opacity-70 scale-110" />

          <div
            className="relative w-[260px] sm:w-[340px]"
            style={{ animation: 'floatY 4s ease-in-out infinite' }}
          >

            <img
              src="/images/phonics-solution-image.png"
              alt="phonics learning"
              className="w-full object-contain relative z-10"
            />

            {/* Floating Badge */}
            <div
              className="
              absolute
              top-2
              -right-2

              bg-[#FFD633]

              border-[3px]
              border-[#123B91]

              rounded-full

              px-4
              py-2

              shadow-[3px_3px_0_#123B91]"
              style={{ animation: 'bubblePop .7s ease both' }}
            >
              <span className="text-[#123B91] font-black text-[12px]">
                Learn With Fun 🎉
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

      {/* ═══════════════════════════════════════════
          BENEFITS SECTION
      ═══════════════════════════════════════════ */}
<section id="benefits" className="relative pt-[40px] pb-[80px] md:pb-[120px] bg-[#FAF6EE] overflow-hidden select-none w-full">

        {/* Animated bg */}
        <FloatingBg items={[
          { el: '📚', left: '2%',  top: '25%', size: '2.2rem',anim: 'floatY',     dur: 4,   delay: 0   },
          { el: '🧠', left: '92%', top: '30%', size: '2rem',  anim: 'floatYR',    dur: 3.8, delay: .5  },
          { el: '✏️', left: '88%', top: '65%', size: '2rem',  anim: 'wiggle',     dur: 2.5, delay: 1   },
          { el: '⭐', left: '5%',  top: '60%', size: '2rem',  anim: 'pulse',      dur: 2,   delay: .3  },
          { el: '🌟', left: '45%', top: '5%',  size: '1.8rem',anim: 'starTwinkle',dur: 1.5, delay: .6  },
          { el: '🎨', left: '15%', top: '85%', size: '2rem',  anim: 'floatY',     dur: 4.5, delay: 1.3 },
          { el: '💫', left: '75%', top: '85%', size: '1.6rem',anim: 'drift',      dur: 5,   delay: 1.8 },
          { el: '✦',  left: '30%', top: '12%', size: '1.4rem',anim: 'starTwinkle',dur: 2,   delay: .8  },
          { el: '✦',  left: '65%', top: '10%', size: '1.2rem',anim: 'starTwinkle',dur: 1.7, delay: 1.2 },
          { el: '🔴', left: '50%', top: '92%', size: '1.2rem',anim: 'pulse',      dur: 3,   delay: 2   },
        ]} />

        {/* Animated paper plane */}
        <div className="absolute right-[4%] top-[18%] pointer-events-none hidden lg:block"
          style={{ animation: 'floatY 4s ease-in-out infinite' }}>
          <img src="/images/paper-plane.png" alt="" className="w-[120px] h-auto object-contain opacity-90"
            onError={e => e.currentTarget.style.display = 'none'}/>
        </div>

        {/* BADGE */}
        <div className="flex justify-center mb-4 px-4" style={{ animation: 'bounceIn .6s ease both' }}>
          <div className="bg-[#E1F2FF] border-[2px] border-[#123B91] rounded-full px-6 py-1 text-[#123B91] font-black text-[11px] tracking-wider shadow-[0_3px_0_0_#123B91]">
            BENEFITS
          </div>
        </div>

        {/* HEADING */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-10 md:mb-16 px-4"
          style={{ animation: 'slideInUp .7s .1s ease both' }}>
          <div className="relative flex items-center justify-center w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] md:w-[48px] md:h-[48px] select-none shrink-0">
            <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 drop-shadow-[1.5px_2px_0_#123B91] absolute z-10"
              style={{ animation: 'spin 6s linear infinite' }} viewBox="0 0 24 24">
              <path d="M12 1l3.22 6.56 7.24 1.05-5.24 5.1 1.24 7.21L12 17.52l-6.46 3.4 1.24-7.21-5.24-5.1 7.24-1.05z" fill="#FFD000" stroke="#123B91" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 absolute -top-1 -left-2" style={{ animation: 'pulse 1.5s ease-in-out infinite' }} viewBox="0 0 24 24" fill="#22D3EE">
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/>
            </svg>
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 absolute -bottom-1 -left-3" style={{ animation: 'pulse 2s .5s ease-in-out infinite' }} viewBox="0 0 24 24" fill="#F472B6">
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/>
            </svg>
          </div>
          <h2 className="text-[#123B91] font-black text-[22px] sm:text-[32px] md:text-[42px] lg:text-[44px] text-center leading-[1.15] tracking-tight">
            Why Phonics is Important?
          </h2>
          <div className="relative flex items-center justify-center w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] md:w-[48px] md:h-[48px] select-none shrink-0">
            <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 drop-shadow-[1.5px_2px_0_#123B91] absolute z-10"
              style={{ animation: 'spinR 6s linear infinite' }} viewBox="0 0 24 24">
              <path d="M12 1l3.22 6.56 7.24 1.05-5.24 5.1 1.24 7.21L12 17.52l-6.46 3.4 1.24-7.21-5.24-5.1 7.24-1.05z" fill="#FFD000" stroke="#123B91" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 absolute -top-3 -right-2" style={{ animation: 'pulse 1.8s ease-in-out infinite' }} viewBox="0 0 24 24" fill="#FBBF24">
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/>
            </svg>
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 absolute top-1 -right-4" style={{ animation: 'pulse 2.2s .3s ease-in-out infinite' }} viewBox="0 0 24 24" fill="#22D3EE">
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/>
            </svg>
          </div>
        </div>

        {/* ICONS CONTAINER */}
        <div className="max-w-[1240px] mx-auto px-6 relative">
          
          {/* Wave Dotted Line Background - Ab ye Mobile se lekar Desktop tak sab par dikhegi */}
          <div className="absolute inset-x-0 top-[35px] sm:top-[45px] lg:top-[40px] h-[100px] pointer-events-none z-0 min-w-[1000px] lg:min-w-0">
            <svg width="100%" height="100%" viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none">
              <path d="M 60,35 Q 180,-10 300,55 T 540,55 T 780,55 T 1020,55 T 1140,35"
                stroke="#BCD4E6" strokeWidth="2.5" strokeDasharray="6 8" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Wrapper to hold overflow correctly on mobile */}
          <div className="flex flex-row flex-nowrap lg:grid lg:grid-cols-5 gap-y-12 sm:gap-y-16 overflow-x-auto lg:overflow-x-visible pb-4 pt-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden relative z-10 pl-4 pr-20 lg:px-0">
            {[
              { icon: '/images/book-image.png',   text: 'Builds Strong\nReading Foundation' },
              { icon: '/images/mouth-image.png',  text: 'Improves\nPronunciation' },
              { icon: '/images/pencil-image.png', text: 'Enhances\nSpelling Skills' },
              { icon: '/images/star-image.png',   text: 'Boosts\nConfidence' },
              { icon: '/images/brain-image.png',  text: 'Makes Learning\nFun & Easy' },
            ].map((item, idx) => (
              <div key={idx}
                className={`flex flex-col items-center text-center relative group shrink-0 w-[170px] sm:w-[210px] lg:w-auto snap-center mr-16 lg:mr-0
                  ${idx % 2 !== 0 ? 'lg:translate-y-[24px]' : ''}`}
                style={{ animation: `cardPop .5s ${.2 + idx * .12}s ease both` }}>
                
                <div className="w-[100px] h-[90px] sm:w-[130px] sm:h-[115px] md:w-[145px] md:h-[125px] flex items-center justify-center p-1 mb-3 sm:mb-4
                  group-hover:scale-110 transition-transform duration-300"
                  style={{ animation: `floatY ${3.5 + idx * .4}s ${idx * .35}s ease-in-out infinite` }}>
                  <img src={item.icon} alt="" className="w-full h-full object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.06)]"/>
                </div>

                <p className="whitespace-pre-line text-[#123B91] font-black text-[13px] sm:text-[15px] md:text-[16px] leading-[1.35] tracking-tight max-w-[160px] mx-auto">
                  {item.text}
                </p>

                {/* Vertical Divider and Star (✦) - Ab mobile/desktop dono par side-by-side cards ke exact beech me aayega */}
                {idx < 4 && (
                  <div className="flex flex-col items-center justify-center absolute top-[30px] sm:top-[45px] lg:top-[40px] -right-[36px] sm:-right-[44px] lg:-right-[12px] lg:transform lg:translate-x-1/2 pointer-events-none select-none h-[40px]">
                    <div className="w-[2px] h-[24px] bg-[#BCD4E6] relative rounded-full">
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#BCD4E6] text-[11px]"
                        style={{ animation: 'starTwinkle 2s ease-in-out infinite' }}>✦</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* MOBILE SWIPE INDICATOR HINT (Only visible on Mobile/Tablet screens) */}
          <div className="flex lg:hidden items-center justify-center gap-1.5 mt-5 text-[#123B91]/70 font-bold text-[12px] uppercase tracking-wider animate-pulse">
            <span>Swipe left to see more</span>
            <span className="animate-bounce-h">➔</span>
          </div>

        </div>
      </section>



<section className="relative py-[70px] sm:py-[90px] overflow-hidden">

  <div className="container">

    <div
      className="
        relative

        bg-[#F8F5ED]

        rounded-[35px]

        border-[4px]
        border-[#E7B23D]

        overflow-hidden

        px-6
        sm:px-10
        lg:px-14

        py-10
        sm:py-14

        shadow-[0_8px_0_#E7B23D]
      "
    >

      {/* DECORATIONS */}
      <div className="absolute top-[40px] right-[50px] text-[28px] rotate-12">
        ⭐
      </div>

      <div className="absolute bottom-[40px] left-[40px] text-[26px]">
        ✨
      </div>

      <div className="absolute top-[-60px] right-[-60px] w-[180px] h-[180px] rounded-full bg-[#FFE9A9]/40" />

      <div className="absolute bottom-[-70px] left-[-70px] w-[220px] h-[220px] rounded-full bg-[#D8F1FF]/50" />

      <div
        className="
          grid
          lg:grid-cols-2
          gap-12
          items-center
        "
      >

        {/* LEFT IMAGE */}
        <div
          className="
            relative
            flex
            justify-center
          "
        >

          <img
            src="/images/trial-kids.png"
            alt="Free Trial"
            className="
              w-full
              max-w-[360px]

              animate-[floatY_4s_ease-in-out_infinite]
            "
          />

        </div>

        {/* RIGHT CONTENT */}
        <div className="relative z-10">

          {/* BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-2

              bg-[#FFD633]
              text-[#123B91]

              px-5
              py-2

              rounded-full

              font-black
              text-[13px]

              border-[3px]
              border-[#123B91]

              shadow-[0_4px_0_#123B91]
            "
          >
            🎁 FREE 5-DAY TRIAL
          </div>

          {/* TITLE */}
          <h2
            className="
              mt-5

              text-[#123B91]

              font-black

              text-[30px]
              sm:text-[42px]

              leading-[1.15]
            "
          >
            Try Our Phonics Classes FREE for 5 Days!
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-5

              text-[#444]

              text-[16px]
              sm:text-[18px]

              leading-[1.8]

              max-w-[600px]
            "
          >
            Give your child a fun and engaging learning
            experience with zero risk. Improve reading,
            spelling, pronunciation, and confidence through
            interactive phonics activities.
          </p>

          {/* FEATURES */}
          <div
            className="
              mt-7

              grid
              sm:grid-cols-2

              gap-4
            "
          >

            {[
              'No Registration Fee',
              'Fun Interactive Classes',
              'Limited Seats Available',
            ].map((item, i) => (

              <div
                key={i}
                className="
                  flex
                  items-center
                  gap-3

                  bg-white

                  rounded-[18px]

                  px-4
                  py-3

                  border-[2px]
                  border-[#E7B23D]

                  shadow-[0_4px_0_#E7B23D]
                "
              >

                <div
                  className="
                    w-8
                    h-8

                    rounded-full

                    bg-[#19C339]

                    flex
                    items-center
                    justify-center

                    text-white
                    font-black

                    shrink-0
                  "
                >
                  ✓
                </div>

                <p
                  className="
                    text-[#123B91]
                    font-bold
                    text-[15px]
                  "
                >
                  {item}
                </p>

              </div>

            ))}

          </div>

          {/* BUTTONS */}
          <div
            className="
              flex
              flex-col
              sm:flex-row

              gap-4

              mt-8
            "
          >

            {/* FORM BUTTON */}
<button
  onClick={() => setShowForm(true)}
  className="
    bg-[#19C339]
    text-white

    font-black

    px-7
    py-4

    rounded-[20px]

    border-[3px]
    border-white

    text-center

    shadow-[0_5px_0_#107824]

    hover:translate-y-[2px]
    hover:shadow-[0_3px_0_#107824]

    transition-all
  "
>
  🚀 Book Free Demo
</button>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/919882620805?text=Hi,%20I%20am%20interested%20in%20Phonics%20Classes!"
              target="_blank"
              rel="noopener noreferrer"
              className="
                bg-white
                text-[#123B91]

                font-black

                px-7
                py-4

                rounded-[20px]

                border-[3px]
                border-[#123B91]

                text-center

                shadow-[0_5px_0_#123B91]

                hover:translate-y-[2px]
                hover:shadow-[0_3px_0_#123B91]

                transition-all
              "
            >
              💬 Contact on WhatsApp
            </a>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>


      {/* ═══════════════════════════════════════════
          VIDEO TESTIMONIALS SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative pt-[60px] sm:pt-[80px] pb-[60px] bg-[#F8F5ED] overflow-hidden select-none w-full">
        <FloatingBg items={[
          { el: '🎬', left: '3%',  top: '15%', size: '2rem',  anim: 'floatY',     dur: 4,   delay: 0   },
          { el: '⭐', left: '91%', top: '10%', size: '2rem',  anim: 'floatYR',    dur: 3.5, delay: .5  },
          { el: '🎥', left: '94%', top: '55%', size: '1.8rem',anim: 'wiggle',     dur: 2.5, delay: 1   },
          { el: '✦',  left: '20%', top: '8%',  size: '1.4rem',anim: 'starTwinkle',dur: 1.6, delay: 1.1 },
          { el: '💫', left: '70%', top: '85%', size: '1.5rem',anim: 'pulse',      dur: 2,   delay: .7  },
          { el: '🌟', left: '50%', top: '5%',  size: '1.6rem',anim: 'starTwinkle',dur: 2,   delay: .3  },
        ]} />

        {/* HEADING */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14 px-4 relative z-10" style={{ animation: 'slideInUp .7s ease both' }}>
          <svg className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] shrink-0 drop-shadow-[1.5px_2px_0_#123B91]"
            style={{ animation: 'spin 6s linear infinite' }} viewBox="0 0 24 24" fill="#FFD633" stroke="#123B91" strokeWidth="2.2" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <h2 className="text-[#123B91] font-black text-[26px] sm:text-[34px] md:text-[44px] text-center leading-[1.1] tracking-tight">
            Video Testimonials
          </h2>
          <svg className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] shrink-0 drop-shadow-[1.5px_2px_0_#123B91]"
            style={{ animation: 'spinR 6s linear infinite' }} viewBox="0 0 24 24" fill="#FFD633" stroke="#123B91" strokeWidth="2.2" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>

        {/* VIDEO CARDS — sirf video, koi text nahi */}
        <div className="max-w-[1140px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <VideoCard src="/videos/video-1.mp4" idx={0} />
            <VideoCard src="/videos/video-2.mp4" idx={1} />
            <VideoCard src="/videos/video-3.mp4" idx={2} />
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════
          TESTIMONIALS SECTION
      ═══════════════════════════════════════════ */}
      <section id="testimonials" className="relative pt-[60px] sm:pt-[80px] pb-[100px] sm:pb-[160px] bg-[#FAF6EE] overflow-hidden select-none w-full">

        {/* Animated bg */}
        <FloatingBg items={[
          { el: '💬', left: '3%',  top: '15%', size: '2.2rem',anim: 'floatY',     dur: 4,   delay: 0   },
          { el: '⭐', left: '90%', top: '10%', size: '2rem',  anim: 'floatYR',    dur: 3.5, delay: .5  },
          { el: '💛', left: '94%', top: '50%', size: '1.8rem',anim: 'pulse',      dur: 2.2, delay: 1   },
          { el: '🌟', left: '4%',  top: '60%', size: '2rem',  anim: 'starTwinkle',dur: 2,   delay: .3  },
          { el: '🎉', left: '50%', top: '5%',  size: '2rem',  anim: 'wiggle',     dur: 2.5, delay: .7  },
          { el: '✦',  left: '22%', top: '10%', size: '1.4rem',anim: 'starTwinkle',dur: 1.6, delay: 1.1 },
          { el: '✦',  left: '72%', top: '88%', size: '1.2rem',anim: 'starTwinkle',dur: 2,   delay: 1.5 },
          { el: '🎊', left: '8%',  top: '85%', size: '1.8rem',anim: 'floatY',     dur: 5,   delay: 2   },
          { el: '🌈', left: '85%', top: '80%', size: '1.6rem',anim: 'drift',      dur: 6,   delay: 1.8 },
        ]} />

        {/* Floating pencil decoration */}
        <div className="absolute right-[2%] bottom-[12%] pointer-events-none hidden xl:block z-20"
          style={{ animation: 'floatY 3.5s ease-in-out infinite' }}>
          <img src="/images/pencil-image.png" alt="" className="w-[110px] h-auto object-contain filter drop-shadow-[4px_6px_0px_#123B91]"
            onError={e => e.currentTarget.style.display = 'none'}/>
        </div>

        {/* HEADING */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-16 sm:mb-24 px-4 relative z-10"
          style={{ animation: 'slideInUp .7s ease both' }}>
          <div className="relative flex items-center justify-center w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 transform" style={{ animation: 'spin 5s linear infinite' }} viewBox="0 0 24 24" fill="#FFD000">
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/>
            </svg>
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 absolute -top-2 -left-2" style={{ animation: 'pulse 1.8s ease-in-out infinite' }} viewBox="0 0 24 24" fill="#F472B6">
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/>
            </svg>
          </div>
          <h2 className="text-[#123B91] font-black text-[26px] sm:text-[34px] md:text-[44px] lg:text-[46px] text-center leading-[1.1] tracking-tight">
            What Parents Say
          </h2>
          <div className="relative flex items-center justify-center w-[30px] h-[30px] sm:w-[36px] sm:h-[36px] shrink-0"
            style={{ animation: 'wiggle 2s ease-in-out infinite' }}>
            <svg className="w-6 h-6 sm:w-8 sm:h-8 filter drop-shadow-[1.5px_2px_0_#123B91]" viewBox="0 0 24 24" fill="none" stroke="#123B91" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#FFF"/>
              <circle cx="8" cy="10" r="1" fill="#123B91"/>
              <circle cx="12" cy="10" r="1" fill="#123B91"/>
              <circle cx="16" cy="10" r="1" fill="#123B91"/>
            </svg>
          </div>
        </div>

        {/* CARDS */}
        <div className="max-w-[1140px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 sm:gap-y-20">
            {[
              { avatar: '/images/girl-1.png', name: 'Priya S.',  color: '#F472B6', text: 'My child has improved so much in reading in just a few weeks. The classes are fun and teachers are amazing!' },
              { avatar: '/images/parent2.png', name: 'Rahul M.', color: '#4ADE80', text: 'Crest and Core Phonics Classes made learning easy and exciting for my son!' },
              { avatar: '/images/parent3.png', name: 'Amit T.',  color: '#F472B6', text: 'The phonics activities are very engaging. Highly recommend!' },
              { avatar: '', name: 'Krishav Bhardwaj',  color: '#F472B6', text: 'Children will enjoy the class and learn something good.'},
              { avatar: '', name: 'Shikha thakur', color: '#4ADE80', text: 'I really happy and fully satisfied about you thank u for being such an imortnt part in our child devlopmnt... 🙏' },
              { avatar: '', name: 'Mr. Rajneesh kumar',  color: '#F472B6', text: 'The class was very good...we also liked it, the children will also learn something new...thank you 🙏' },
            ].map((item, idx) => (
              <div key={idx}
                className="relative bg-white rounded-[32px] border-[3px] border-[#E5B84B] shadow-[0_8px_0_0_#E5B84B]
                  hover:shadow-[0_4px_0_0_#E5B84B] hover:translate-y-[4px] transition-all duration-300 px-6 pb-8 pt-14 group"
                style={{ paddingTop: item.avatar ? '56px' : '24px', animation: `cardPop .6s ${.1 + idx * .18}s ease both`, animationFillMode: 'rainbowBorder' }}>

                {/* Floating avatar */}
                {item.avatar && (
                  <div className="absolute -top-[42px] left-6 w-[84px] h-[84px] rounded-full bg-[#FAF6EE] border-[3px] border-[#123B91] p-1 shadow-[3px_4px_0px_0px_#123B91] overflow-hidden z-20 group-hover:scale-110 transition-transform duration-300"
                    style={{ animation: `floatY ${3 + idx * .6}s ${idx * .4}s ease-in-out infinite` }}>
                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover rounded-full bg-[#E1F2FF]"/>
                  </div>
                )}

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#FFC107]"
                      style={{ animation: `starTwinkle ${1.5 + i * .2}s ${i * .1}s ease-in-out infinite` }}
                      viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>

                <p className="text-[#333333] text-[16px] leading-[1.75] font-semibold tracking-tight min-h-[90px]">
                  "{item.text}"
                </p>

                <div className="mt-5 pt-4 border-t-2 border-dashed border-gray-100 flex items-center justify-between">
                  <h4 className="text-[#123B91] font-black text-[17px] tracking-tight">{item.name}</h4>
                  <span className="font-extrabold text-[12px] px-3 py-0.5 rounded-full uppercase tracking-wider"
                    style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                    Happy Parent
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ═══════════════════════════════════════════
          CTA / CONTACT SECTION
      ═══════════════════════════════════════════ */}
<section
  id="contact"
  className="
    py-[40px]
    sm:py-[60px]
    md:py-[80px]

    bg-[#FAF6EE]

    px-4
    md:px-8

    relative
    overflow-hidden
    select-none
    w-full
  "
>

  {/* Animated bg */}
  <FloatingBg
    items={[
      { el: '🎯', left: '1%', top: '20%', size: '2rem', anim: 'floatY', dur: 4, delay: 0 },
      { el: '📞', left: '93%', top: '25%', size: '2rem', anim: 'floatYR', dur: 3.5, delay: .5 },
      { el: '✉️', left: '6%', top: '70%', size: '2.2rem', anim: 'drift', dur: 5, delay: 1 },
      { el: '🌟', left: '90%', top: '65%', size: '2rem', anim: 'pulse', dur: 2, delay: .3 },
      { el: '✦', left: '45%', top: '5%', size: '1.4rem', anim: 'starTwinkle', dur: 1.8, delay: .6 },
      { el: '💌', left: '55%', top: '88%', size: '1.8rem', anim: 'floatY', dur: 4.5, delay: 1.5 },
      { el: '🎁', left: '75%', top: '10%', size: '1.8rem', anim: 'wiggle', dur: 2.5, delay: .9 },
    ]}
  />

  <div className="max-w-[1240px] mx-auto relative pt-4 md:pt-10 pb-4">

    <div
      className="
        relative

        bg-[#123B91]

        rounded-[28px]
        sm:rounded-[40px]
        md:rounded-[50px]

        py-10
        sm:py-12

        px-5
        sm:px-6

        lg:py-16
        lg:px-20

        text-center

        overflow-visible

        shadow-[0_12px_0_#0A245C]

        border-[3px]
        border-[#0A245C]

        z-10

        min-h-[auto]
        md:min-h-[260px]

        flex
        items-center
        justify-center
      "
      style={{ animation: 'slideInUp .7s ease both' }}
    >

      {/* Background circles */}
      <div
        className="
          absolute
          inset-0
          overflow-hidden

          rounded-[25px]
          sm:rounded-[37px]
          md:rounded-[47px]

          pointer-events-none
        "
      >

        <div
          className="
            absolute
            -left-12
            -top-12

            w-48
            h-48

            rounded-full

            bg-white
            opacity-[0.04]
          "
          style={{ animation: 'spin 20s linear infinite' }}
        />

        <div
          className="
            absolute
            right-24
            -bottom-24

            w-72
            h-72

            rounded-full

            bg-white
            opacity-[0.04]
          "
          style={{ animation: 'spinR 25s linear infinite' }}
        />

      </div>

      {/* LEFT IMAGE */}
      <div
        className="
          hidden
          md:block

          absolute

          w-[180px]
          lg:w-[340px]
          xl:w-[380px]

          md:top-1/2
          md:left-[-35px]

          xl:left-[-20px]

          md:-translate-y-1/2

          z-20

          pointer-events-none
        "
        style={{ animation: 'floatY 4s ease-in-out infinite' }}
      >

        <img
          src="/images/cta-boy-pencil.png"
          alt="boy"
          className="
            w-full
            h-auto
            object-contain

            filter
            drop-shadow-[0_12px_12px_rgba(0,0,0,0.25)]
          "
        />

      </div>

      {/* CENTER CONTENT */}
      <div
        className="
          z-10
          w-full

          max-w-[92%]
          sm:max-w-[80%]
          md:max-w-[70%]
          lg:max-w-[500px]
          xl:max-w-[580px]

          mx-auto
        "
      >

        {/* HEADING */}
        <h2
          className="
            text-white

            font-black

            text-[20px]
            sm:text-[30px]
            md:text-[34px]
            lg:text-[38px]
            xl:text-[42px]

            leading-[1.2]

            tracking-tight

            drop-shadow-md
          "
        >
          Ready to Build a Strong
          <br />
          Reading Foundation?
        </h2>

        {/* SUBTEXT */}
        <p
          className="
            text-[#FFD633]

            font-bold

            text-[13px]
            sm:text-[16px]

            mt-3

            tracking-wide

            drop-shadow-sm
          "
        >
          Let's make learning fun and effective together!
        </p>

        {/* BUTTONS WRAPPER */}
        <div
          className="
            flex
            flex-col
            items-center

            gap-3

            mt-7
            sm:mt-8
          "
        >

          {/* TOP BUTTONS */}
          <div
            className="
              flex
              flex-col
              sm:flex-row

              justify-center
              items-center

              gap-3
              sm:gap-4

              w-full
            "
          >

            {/* WHATSAPP */}
            <a
              href="https://wa.me/919882620805?text=Hi,%20I%20am%20interested%20in%20Phonics%20Classes!"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-[260px]
                sm:w-auto

                bg-[#19C339]
                text-white

                rounded-[20px]

                border-[3px]
                border-white

                px-5
                py-[11px]

                font-black
                text-[15px]

                flex
                items-center
                justify-center
                gap-3

                shadow-[0_5px_0_#107824]

                hover:translate-y-[2px]
                hover:shadow-[0_3px_0_#107824]

                active:translate-y-[5px]
                active:shadow-none

                transition-all
                duration-150

                no-underline
              "
            >

              <svg
                className="w-6 h-6 fill-white shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M12.004 2c-5.51 0-9.993 4.483-9.993 9.993 0 1.763.457 3.49 1.329 5.005L2 22l5.122-1.343c1.467.8 3.11 1.222 4.781 1.222 5.51 0 9.994-4.483 9.994-9.993C21.997 6.483 17.514 2 12.004 2z" />
              </svg>

              <div className="text-left leading-tight">

                <span className="block text-[15px] font-black">
                  WhatsApp Us
                </span>

                <span className="block text-[11px] opacity-90 font-medium">
                  Chat on WhatsApp
                </span>

              </div>

            </a>

            {/* EMAIL */}
            <a
              href="mailto:reenaminhas4426@gmail.com?subject=Inquiry%20About%20Phonics%20Classes"
              className="
                w-[260px]
                sm:w-auto

                bg-white
                text-[#123B91]

                rounded-[20px]

                border-[3px]
                border-white

                px-5
                py-[11px]

                font-black
                text-[15px]

                flex
                items-center
                justify-center
                gap-3

                shadow-[0_5px_0_#D5E1F2]

                hover:translate-y-[2px]
                hover:shadow-[0_3px_0_#D5E1F2]

                active:translate-y-[5px]
                active:shadow-none

                transition-all
                duration-150

                no-underline
              "
            >

              <svg
                className="w-6 h-6 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="#EAEAEA"/>
                <path d="M22 6v12c0 1.1-.9 2-2 2h-3V8l-5 4-5-4v12H4c-1.1 0-2-.9-2-2V6l10 7 10-7z" fill="#4285F4"/>
                <path d="M2 6v2l10 7 10-7V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2z" fill="#EA4335"/>
              </svg>

              <div className="text-left leading-tight">

                <span className="block text-[15px] font-black">
                  Email Us
                </span>

                <span className="block text-[11px] text-gray-500 font-medium">
                  Send us an Email
                </span>

              </div>

            </a>

          </div>

          {/* GOOGLE FORM POPUP BUTTON */}
          <button
            onClick={() => setShowForm(true)}
            className="
              w-[260px]

              bg-[#FFD633]
              text-[#123B91]

              rounded-[20px]

              border-[3px]
              border-white

              px-5
              py-[11px]

              font-black
              text-[15px]

              flex
              items-center
              justify-center
              gap-3

              shadow-[0_5px_0_#D9A900]

              hover:translate-y-[2px]
              hover:shadow-[0_3px_0_#D9A900]

              active:translate-y-[5px]
              active:shadow-none

              transition-all
              duration-150

              cursor-pointer
            "
          >

            <svg
              className="w-6 h-6 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 2H8a2 2 0 00-2 2v16l4-3 4 3 4-3 4 3V5a3 3 0 00-3-3z"
                fill="#123B91"
              />
            </svg>

            <div className="text-left leading-tight">

              <span className="block text-[15px] font-black">
                Free Demo Form
              </span>

              <span className="block text-[11px] opacity-90 font-medium">
                Enroll Your Child
              </span>

            </div>

          </button>

        </div>

      </div>

      {/* RIGHT IMAGE */}
      <div
        className="
          hidden
          md:block

          absolute

          w-[160px]
          lg:w-[300px]
          xl:w-[340px]

          md:top-1/2
          md:right-[-25px]

          xl:right-[-10px]

          md:-translate-y-1/2

          z-20

          pointer-events-none
        "
        style={{ animation: 'floatYR 4.5s ease-in-out infinite' }}
      >

        <img
          src="/images/cta-girl-book.png"
          alt="girl"
          className="
            w-full
            h-auto
            object-contain

            filter
            drop-shadow-[0_12px_12px_rgba(0,0,0,0.25)]
          "
        />

      </div>

    </div>

  </div>

  {/* GOOGLE FORM POPUP */}
  {
    showForm && (

      <div
        className="
          fixed
          inset-0
          z-[99999]

          bg-black/70
          backdrop-blur-sm

          flex
          items-center
          justify-center

          p-2
          sm:p-4
        "
      >

        {/* POPUP BOX */}
        <div
          className="
            relative

            w-full
            max-w-[950px]

            h-[92vh]

            bg-white

            rounded-[25px]

            overflow-hidden

            border-[5px]
            border-[#123B91]

            shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          "
        >

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setShowForm(false)}
            className="
              absolute
              top-3
              right-3

              z-20

              w-10
              h-10

              rounded-full

              bg-[#FF4F7A]

              text-white

              text-[26px]
              font-black

              flex
              items-center
              justify-center

              shadow-lg

              hover:scale-110

              transition-all
            "
          >
            ×
          </button>

          {/* TOP BAR */}
          <div
            className="
              bg-[#123B91]

              text-white

              px-5
              py-4

              font-black
              text-[18px]

              flex
              items-center
              gap-3
            "
          >
            🎉 Free Demo Registration Form
          </div>

          {/* FORM */}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSciwh59uRGjcw7l1TLxGR4MU6bj3qHRL_5sy34C40FByPweaA/viewform"
            width="100%"
            height="100%"
            className="border-0"
          >
            Loading…
          </iframe>

        </div>

      </div>

    )
  }

</section>

{/* GOOGLE FORM POPUP */}
{
  showForm && (

    <div
      className="
        fixed
        inset-0
        z-[99999]

        bg-black/70
        backdrop-blur-md

        flex
        items-center
        justify-center

        p-2
        sm:p-4
      "
    >

      {/* POPUP BOX */}
      <div
        className="
          relative

          w-full
          max-w-[980px]

          h-[95vh]

          bg-[#4285f4]

          rounded-[20px]
          sm:rounded-[28px]

          overflow-hidden

          border-[4px]
          sm:border-[5px]

          border-[#4285f4]

          shadow-[0_15px_50px_rgba(0,0,0,0.4)]
        "
      >

        {/* HEADER */}
        <div
          className="
            relative

            bg-[#4285f4]

            text-white

            px-4
            sm:px-6

            py-4
            sm:py-5

            font-black

            text-[16px]
            sm:text-[20px]

            flex
            items-center
            justify-center

            text-center

            border-b-[3px]
            border-[#5f9bff]
          "
        >

          {/* HEADING */}
          <div
            className="
              w-full

              pr-12
              sm:pr-0

              leading-tight
            "
          >
            Free Demo Registration Form
          </div>

        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setShowForm(false)}
          className="
            absolute

            top-3
            right-3

            sm:top-4
            sm:right-4

            z-[999999]

            w-10
            h-10

            sm:w-12
            sm:h-12

            rounded-full

            bg-[#FF4F7A]

            text-white

            text-[24px]
            sm:text-[30px]

            font-black

            flex
            items-center
            justify-center

            shadow-[0_6px_15px_rgba(0,0,0,0.3)]

            hover:scale-110
            active:scale-95

            transition-all

            cursor-pointer

            touch-manipulation

            shrink-0
          "
        >
          ×
        </button>

        {/* FORM WRAPPER */}
        <div
          className="
            w-full

            h-[calc(95vh-72px)]
            sm:h-[calc(95vh-82px)]

            bg-white

            overflow-hidden
          "
        >

          {/* GOOGLE FORM */}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSciwh59uRGjcw7l1TLxGR4MU6bj3qHRL_5sy34C40FByPweaA/viewform"
            width="100%"
            height="100%"
            className="
              border-0
              relative
              z-0
            "
          >
            Loading…
          </iframe>

        </div>

      </div>

    </div>

  )
}

    </main>
  )
}

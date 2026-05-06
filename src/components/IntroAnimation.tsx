'use client'

import { useEffect, useRef, useState} from 'react'
import { m, AnimatePresence } from 'framer-motion'

interface IntroAnimationProps {
  onComplete: () => void
}

const IMAGES = [
  {
    src:    '/images/intro/nickolodeon-universe.webp',
    label:  'Nickelodeon Universe',
    fromX:  -120, fromY: -120,
    toX:    -55,  toY:   -45,
    w: 320, h: 220,
    depth:  1.08,
    z: 2,
    rot: -6,
  },
  {
    src:    '/images/intro/maxresdefault.jpg',
    label:  'Theme Park',
    fromX:  120,  fromY: -120,
    toX:    30,   toY:   -50,
    w: 300, h: 210,
    depth:  1.06,
    z: 2,
    rot: 5,
  },
  {
    src:    '/images/intro/mall-aquarium.jpg',
    label:  'SEA LIFE',
    fromX:  -130, fromY: 120,
    toX:    -58,  toY:   30,
    w: 280, h: 200,
    depth:  1.05,
    z: 2,
    rot: -4,
  },
  {
    src:    '/images/intro/amusement-rides.jpg',
    label:  'Rides',
    fromX:  130,  fromY: 120,
    toX:    28,   toY:   28,
    w: 300, h: 210,
    depth:  1.07,
    z: 2,
    rot: 7,
  },
  {
    src:    '/images/intro/mall-interior.jpg',
    label:  'Mall Interior',
    fromX:  0,    fromY: -150,
    toX:    -10,  toY:   -55,
    w: 260, h: 180,
    depth:  1.04,
    z: 1,
    rot: -3,
  },
  {
    src:    '/images/intro/sealife.jpg',
    label:  'Sea Life',
    fromX:  -150, fromY: 0,
    toX:    -62,  toY:   -8,
    w: 240, h: 170,
    depth:  1.03,
    z: 1,
    rot: 4,
  },
  {
    src:    '/images/intro/events.jpg',
    label:  'Events',
    fromX:  150,  fromY: 0,
    toX:    32,   toY:   -5,
    w: 260, h: 180,
    depth:  1.04,
    z: 1,
    rot: -5,
  },
  {
    src:    '/images/intro/exterior.jpg',
    label:  'Exterior',
    fromX:  0,    fromY: 150,
    toX:    -8,   toY:   35,
    w: 280, h: 190,
    depth:  1.05,
    z: 1,
    rot: 3,
  },
]

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState(0)
  const canvasRef         = useRef<HTMLCanvasElement>(null)
  const animFrameRef      = useRef<number>(0)
  const particleIdRef     = useRef(0)
  const lastMouseRef      = useRef({ x: 0, y: 0 })
  const particlesRef      = useRef<{
    id: number
    x: number; y: number
    vx: number; vy: number
    color: string
    size: number
    life: number
    trail: { x: number; y: number }[]
  }[]>([])

  // ─── Phase sequencing ───────────────────────────────────────
  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []
    t.push(setTimeout(() => setPhase(1), 200))
    t.push(setTimeout(() => setPhase(2), 1200))
    t.push(setTimeout(() => setPhase(3), 2800))
    t.push(setTimeout(() => setPhase(4), 3800))
    t.push(setTimeout(() => setPhase(5), 5200))
    t.push(setTimeout(() => onComplete(), 5800))
    return () => t.forEach(clearTimeout)
  }, [onComplete])

  // ─── Particle canvas ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      if (!canvas) return
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COLORS = [
      '#C8A96E', '#e8c98a', '#FFD700',
      '#FF6B35', '#F7931E', '#FFF3B0',
    ]

    function spawnParticles(x: number, y: number, vx: number, vy: number) {
      const speed = Math.sqrt(vx * vx + vy * vy)
      const count = Math.min(Math.floor(speed * 0.6), 5)
      for (let i = 0; i < count; i++) {
        const angle  = Math.random() * Math.PI * 2
        const spread = Math.random() * speed * 0.4
        particlesRef.current.push({
          id:    particleIdRef.current++,
          x,     y,
          vx:    vx * 0.25 + Math.cos(angle) * spread,
          vy:    vy * 0.25 + Math.sin(angle) * spread,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size:  Math.random() * 5 + 2,
          life:  1,
          trail: [],
        })
      }
    }

    function drawFrame() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter(p => p.life > 0)

      for (const p of particlesRef.current) {
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 10) p.trail.shift()

        if (p.trail.length > 1) {
          for (let i = 1; i < p.trail.length; i++) {
            const alpha = (i / p.trail.length) * p.life * 0.5
            const hex   = Math.floor(alpha * 255).toString(16).padStart(2, '0')
            ctx.beginPath()
            ctx.moveTo(p.trail[i - 1].x, p.trail[i - 1].y)
            ctx.lineTo(p.trail[i].x,     p.trail[i].y)
            ctx.strokeStyle = p.color + hex
            ctx.lineWidth   = p.size * (i / p.trail.length) * p.life
            ctx.lineCap     = 'round'
            ctx.stroke()
          }
        }

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        grd.addColorStop(0, p.color + 'BB')
        grd.addColorStop(1, p.color + '00')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        p.x    += p.vx
        p.y    += p.vy
        p.vx   *= 0.93
        p.vy   *= 0.93
        p.life -= 0.02
      }

      animFrameRef.current = requestAnimationFrame(drawFrame)
    }

    drawFrame()

    function onMouseMove(e: MouseEvent) {
      const vx = e.clientX - lastMouseRef.current.x
      const vy = e.clientY - lastMouseRef.current.y
      spawnParticles(e.clientX, e.clientY, vx, vy)
      lastMouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize',    resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  const imagesVisible = phase >= 1
  const textVisible   = phase === 2 || phase === 3
  const converging    = phase >= 3
  const heroVisible   = phase >= 4
  const exiting       = phase >= 5

  // ─── Compute image animate state ────────────────────────────
  function getImageAnimate(img: typeof IMAGES[0]) {
    if (exiting) {
      return {
        x: '0%', y: '0%',
        opacity: 0,
        scale: 0.3,
        filter: 'blur(20px)',
        rotate: 0,
      }
    }
    if (converging) {
      return {
        x: `${img.toX * 0.3}%`,
        y: `${img.toY * 0.3}%`,
        opacity: heroVisible ? 0.12 : 0.65,
        scale: img.depth * 0.82,
        filter: heroVisible ? 'blur(10px) brightness(0.3)' : 'blur(3px)',
        rotate: 0,
      }
    }
    if (imagesVisible) {
      return {
        x: `${img.toX}%`,
        y: `${img.toY}%`,
        opacity: 0.88,
        scale: img.depth,
        filter: 'blur(0px)',
        rotate: 0,
      }
    }
    return {
      x: `${img.fromX}%`,
      y: `${img.fromY}%`,
      opacity: 0,
      scale: 0.7,
      filter: 'blur(4px)',
      rotate: img.rot,
    }
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <m.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position:       'fixed',
            inset:          0,
            zIndex:         9999,
            background:     'radial-gradient(ellipse at center, #0f0a00 0%, #080808 60%, #000 100%)',
            overflow:       'hidden',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}
        >
          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position:      'absolute',
              inset:         0,
              pointerEvents: 'none',
              zIndex:        10,
            }}
          />

          {/* Ambient glow */}
          <m.div
            animate={{
              opacity: heroVisible ? 0.7 : 0.25,
              scale:   heroVisible ? 1.5 : 1,
            }}
            transition={{ duration: 1.5 }}
            style={{
              position:      'absolute',
              width:         '700px',
              height:        '700px',
              borderRadius:  '50%',
              background:    'radial-gradient(circle, rgba(200,169,110,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Flying images */}
          {IMAGES.map((img, i) => (
            <m.div
              key={img.label}
              initial={{
                x:       `${img.fromX}%`,
                y:       `${img.fromY}%`,
                opacity: 0,
                scale:   0.7,
                rotate:  img.rot,
                filter:  'blur(4px)',
              }}
              animate={getImageAnimate(img)}
              transition={{
                duration: converging ? 1.0 : 1.4,
                delay:    converging ? 0 : i * 0.07,
                ease:     [0.22, 1, 0.36, 1],
              }}
              style={{
                position: 'absolute',
                width:    img.w,
                height:   img.h,
                zIndex:   img.z,
              }}
            >
              <div
                style={{
                  width:        '100%',
                  height:       '100%',
                  overflow:     'hidden',
                  borderRadius: '4px',
                  boxShadow:    '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(200,169,110,0.12)',
                }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  style={{
                    width:     '100%',
                    height:    '100%',
                    objectFit: 'cover',
                    display:   'block',
                  }}
                />
                <div
                  style={{
                    position:   'absolute',
                    inset:      0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.15) 0%, transparent 50%, rgba(0,0,0,0.25) 100%)',
                  }}
                />
              </div>
            </m.div>
          ))}

          {/* Center text */}
          <AnimatePresence>
            {textVisible && (
              <m.div
                key="text"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1,  scale: 1    }}
                exit={{    opacity: 0,  scale: 1.1, filter: 'blur(12px)' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position:       'absolute',
                  zIndex:         20,
                  textAlign:      'center',
                  pointerEvents:  'none',
                }}
              >
                {/* Eyebrow */}
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  style={{
                    fontFamily:     'var(--mono)',
                    fontSize:       '10px',
                    letterSpacing:  '0.3em',
                    textTransform:  'uppercase',
                    color:          'rgba(200,169,110,0.8)',
                    marginBottom:   '20px',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    gap:            '14px',
                  }}
                >
                  <m.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{
                      display:         'block',
                      width:           '28px',
                      height:          '1px',
                      background:      'var(--gold)',
                      transformOrigin: 'left',
                    }}
                  />
                  Bloomington, Minnesota
                  <m.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{
                      display:         'block',
                      width:           '28px',
                      height:          '1px',
                      background:      'var(--gold)',
                      transformOrigin: 'right',
                    }}
                  />
                </m.div>

                {/* Gradient headline */}
                <h1
                  style={{
                    fontFamily:          'var(--serif)',
                    fontSize:            'clamp(52px, 8vw, 108px)',
                    fontWeight:          300,
                    lineHeight:          0.9,
                    letterSpacing:       '-0.03em',
                    margin:              0,
                    background:          'linear-gradient(135deg, #C8A96E 0%, #fff8e8 35%, #e8c98a 55%, #C8A96E 75%, #fff3b0 100%)',
                    backgroundSize:      '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip:      'text',
                    animation:           'gradientShift 3s ease infinite',
                    filter:              'drop-shadow(0 0 40px rgba(200,169,110,0.35))',
                  }}
                >
                  Mall of<br />
                  <em style={{ fontStyle: 'italic' }}>America</em>
                </h1>

                {/* Subtext */}
                <m.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  style={{
                    fontFamily:    'var(--mono)',
                    fontSize:      '10px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color:         'rgba(248,245,238,0.35)',
                    marginTop:     '24px',
                  }}
                >
                  America's Destination
                </m.div>

                {/* Pulse rings */}
                {([1, 2, 3] as const).map((ring) => (
                  <m.div
                    key={ring}
                    initial={{ scale: 0.5, opacity: 0.6 }}
                    animate={{ scale: 2 + ring * 0.3, opacity: 0 }}
                    transition={{
                      duration:   2.8,
                      delay:      ring * 0.5,
                      repeat:     Infinity,
                      ease:       'easeOut',
                    }}
                    style={{
                      position:      'absolute',
                      top:           '50%',
                      left:          '50%',
                      transform:     'translate(-50%, -50%)',
                      width:         '160px',
                      height:        '160px',
                      borderRadius:  '50%',
                      border:        '1px solid rgba(200,169,110,0.4)',
                      pointerEvents: 'none',
                    }}
                  />
                ))}
              </m.div>
            )}
          </AnimatePresence>

          {/* Hero center image */}
          <AnimatePresence>
            {heroVisible && (
              <m.div
                key="hero-img"
                initial={{ opacity: 0, scale: 0.55, filter: 'blur(24px)' }}
                animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)'  }}
                exit={{    opacity: 0, scale: 1.2,  filter: 'blur(20px)' }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position:     'absolute',
                  zIndex:       30,
                  width:        'min(700px, 80vw)',
                  height:       'min(440px, 50vh)',
                  borderRadius: '6px',
                  overflow:     'hidden',
                  boxShadow:    '0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(200,169,110,0.3), 0 0 80px rgba(200,169,110,0.15)',
                }}
              >
                <img
                  src="/images/hero.webp"
                  alt="Mall of America"
                  style={{
                    width:      '100%',
                    height:     '100%',
                    objectFit:  'cover',
                    animation:  'heroZoom 5s ease-out forwards',
                  }}
                />
                <div
                  style={{
                    position:   'absolute',
                    inset:      0,
                    background: 'linear-gradient(to bottom, transparent 35%, rgba(8,8,8,0.88) 100%)',
                  }}
                />
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  style={{
                    position: 'absolute',
                    bottom:   '36px',
                    left:     '40px',
                    right:    '40px',
                  }}
                >
                  <div
                    style={{
                      fontFamily:    'var(--serif)',
                      fontSize:      'clamp(26px, 4vw, 46px)',
                      fontWeight:    300,
                      color:         'var(--white)',
                      lineHeight:    1.1,
                      letterSpacing: '-0.02em',
                      marginBottom:  '8px',
                    }}
                  >
                    America's{' '}
                    <span style={{ fontStyle: 'italic', color: 'var(--gold2)' }}>
                      Largest
                    </span>{' '}
                    Destination.
                  </div>
                  <div
                    style={{
                      fontFamily:    'var(--mono)',
                      fontSize:      '9px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color:         'rgba(200,169,110,0.65)',
                    }}
                  >
                    40M+ visitors · 520+ stores · Est. 1992
                  </div>
                </m.div>
              </m.div>
            )}
          </AnimatePresence>

          {/* Skip button */}
          <m.button
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 0.8 : 0 }}
            onClick={onComplete}
            style={{
              position:      'fixed',
              bottom:        '36px',
              right:         '40px',
              zIndex:        100,
              background:    'transparent',
              border:        '1px solid rgba(200,169,110,0.25)',
              color:         'rgba(200,169,110,0.6)',
              fontFamily:    'var(--mono)',
              fontSize:      '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding:       '10px 20px',
              cursor:        'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--gold)'
              e.currentTarget.style.color       = 'var(--gold2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(200,169,110,0.25)'
              e.currentTarget.style.color       = 'rgba(200,169,110,0.6)'
            }}
          >
            Skip intro →
          </m.button>

          {/* Progress bar */}
          <m.div
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min((phase / 4) * 100, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position:   'fixed',
              bottom:     0,
              left:       0,
              height:     '2px',
              background: 'linear-gradient(to right, var(--gold-dim), var(--gold2))',
              zIndex:     100,
            }}
          />

          <style>{`
            @keyframes gradientShift {
              0%   { background-position: 0% 50%; }
              50%  { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes heroZoom {
              from { transform: scale(1.08); }
              to   { transform: scale(1.0);  }
            }
          `}</style>
        </m.div>
      )}
    </AnimatePresence>
  )
}
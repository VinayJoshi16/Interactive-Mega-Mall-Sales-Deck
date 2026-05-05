// src/components/sections/Hero.tsx
'use client'

import { useEffect, useState } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { PROPERTY } from '@/lib/data'
import CTAButton from '@/components/ui/CTAButton'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [videoActive, setVideoActive] = useState(false)
  const { scrollY }           = useScroll()

  const scrollOpacity = useTransform(scrollY, [0, 200], [1, 0])
  const contentY      = useTransform(scrollY, [0, 600], [0, 120])

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  // ─── Load video only after page is fully interactive ─────
  useEffect(() => {
    if (!mounted) return
    // Delay iframe load by 3s — lets LCP image render first
    const t = setTimeout(() => setVideoActive(true), 3000)
    return () => clearTimeout(t)
  }, [mounted])

  const { hero, videos, images } = PROPERTY

  return (
    <section
      id="hero"
      style={{
        position:   'relative',
        minHeight:  '100svh',
        display:    'grid',
        placeItems: 'center',
        background: 'var(--black)',
        overflow:   'hidden',
      }}
    >
      {/* ══════════════════════════════════════════
          BACKGROUND — image first, video after 3s
      ══════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute',
          inset:    0,
          overflow: 'hidden',
          zIndex:   0,
        }}
      >
        {/* LCP image — loads immediately, high priority */}
        {!videoActive && (
          <Image
            src={images.hero}
            alt="Mall of America"
            fill
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEA/8QAIhAAAQQCAgMBAAAAAAAAAAAAAQIDBBEhBRIxQWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Amuz1pi3udBDAcksNqcBIPBzwM+KKKAOquHJSlIBAAGABRRQB/9k="
            priority
            sizes="100vw"
            style={{
              objectFit:      'cover',
              objectPosition: 'center',
            }}
          />
        )}

        {/* YouTube iframe — only loads after 3s delay */}
        {videoActive && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{
              position: 'absolute',
              inset:    0,
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videos.heroBg.youtubeId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playlist=${videos.heroBg.youtubeId}`}
              title={videos.heroBg.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              style={{
                position:      'absolute',
                top:           '50%',
                left:          '50%',
                width:         '177.78vh',
                height:        '100vh',
                minWidth:      '100%',
                minHeight:     '56.25vw',
                transform:     'translate(-50%, -50%)',
                pointerEvents: 'none',
                border:        'none',
              }}
            />
          </m.div>
        )}
      </div>

      {/* ══════════════════════════════════════════
          OVERLAYS
      ══════════════════════════════════════════ */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: `linear-gradient(
            135deg,
            rgba(8,8,8,0.88) 0%,
            rgba(8,8,8,0.55) 40%,
            rgba(8,8,8,0.30) 70%,
            rgba(8,8,8,0.72) 100%
          )`,
          zIndex: 1,
        }}
      />
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, transparent 35%)',
          zIndex:     2,
        }}
      />

      {/* ══════════════════════════════════════════
          HERO CONTENT
      ══════════════════════════════════════════ */}
      <m.div
        style={{
          position: 'relative',
          zIndex:   3,
          padding:  '0 80px',
          maxWidth: '1000px',
          width:    '100%',
          y:        contentY,
        }}
      >
        {/* Eyebrow */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily:    'var(--mono)',
            fontSize:      '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:         'var(--gold)',
            marginBottom:  '28px',
            display:       'flex',
            alignItems:    'center',
            gap:           '16px',
          }}
        >
          <m.span
            initial={{ scaleX: 0 }}
            animate={mounted ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              display:         'block',
              width:           '40px',
              height:          '1px',
              background:      'var(--gold)',
              transformOrigin: 'left',
              flexShrink:      0,
            }}
          />
          {hero.eyebrow}
        </m.div>

        {/* Headline */}
        <h1
          style={{
            fontFamily:    'var(--serif)',
            fontSize:      'clamp(60px, 9vw, 110px)',
            fontWeight:    300,
            lineHeight:    0.92,
            letterSpacing: '-0.02em',
            color:         'var(--white)',
            marginBottom:  '32px',
          }}
        >
          {hero.words.map((word, i) => (
            <span
              key={i}
              style={{
                display:     'inline-block',
                overflow:    'hidden',
                marginRight: i < hero.words.length - 1 ? '0.25em' : 0,
              }}
            >
              <m.span
                initial={{ y: '105%', opacity: 0 }}
                animate={mounted ? { y: '0%', opacity: 1 } : {}}
                transition={{
                  duration: 0.9,
                  delay:    0.6 + i * 0.15,
                  ease:     [0.22, 1, 0.36, 1],
                }}
                style={{
                  display:   'inline-block',
                  fontStyle: i === hero.accentIndex ? 'italic' : 'normal',
                  color:     i === hero.accentIndex ? 'var(--gold2)' : 'var(--white)',
                }}
              >
                {word}
              </m.span>
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize:     '15px',
            fontWeight:   300,
            color:        'rgba(248,245,238,0.65)',
            lineHeight:   1.75,
            maxWidth:     '480px',
            marginBottom: '48px',
          }}
        >
          {hero.subheadline}
        </m.p>

        {/* CTAs */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display:    'flex',
            gap:        '16px',
            flexWrap:   'wrap',
            alignItems: 'center',
          }}
        >
          {hero.ctas.map((cta) => (
            <CTAButton
              key={cta.label}
              label={cta.label}
              href={cta.href}
              variant={cta.variant as 'primary' | 'secondary'}
              arrow={cta.variant === 'primary'}
            />
          ))}
        </m.div>
      </m.div>

      {/* ══════════════════════════════════════════
          STAT BAR
      ══════════════════════════════════════════ */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:            'absolute',
          bottom:              0,
          left:                0,
          right:               0,
          display:             'grid',
          minHeight:           '88px',
          gridTemplateColumns: `repeat(${hero.statBar.length}, 1fr)`,
          borderTop:           '1px solid rgba(200,169,110,0.15)',
          background:          'rgba(8,8,8,0.7)',
          backdropFilter:      'blur(20px)',
          zIndex:              4,
        }}
      >
        {hero.statBar.map((stat, i) => (
          <m.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.9 + i * 0.08 }}
            style={{
              padding:     '24px 32px',
              borderRight: i < hero.statBar.length - 1
                ? '1px solid rgba(200,169,110,0.1)'
                : 'none',
            }}
          >
            <div
              style={{
                fontFamily:   'var(--serif)',
                fontSize:     '36px',
                fontWeight:   300,
                color:        'var(--gold2)',
                lineHeight:   1,
                marginBottom: '6px',
              }}
            >
              {stat.num}
            </div>
            <div
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '9px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         'var(--gray)',
              }}
            >
              {stat.label}
            </div>
          </m.div>
        ))}
      </m.div>

      {/* ══════════════════════════════════════════
          SCROLL INDICATOR
      ══════════════════════════════════════════ */}
      <m.div
        style={{
          position:      'absolute',
          bottom:        '140px',
          left:          '50%',
          transform:     'translateX(-50%)',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           '8px',
          zIndex:        4,
          opacity:       scrollOpacity,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily:    'var(--mono)',
            fontSize:      '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'var(--gray)',
          }}
        >
          Explore
        </span>
        <m.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width:           '1px',
            height:          '48px',
            background:      'linear-gradient(to bottom, var(--gold-dim), transparent)',
            transformOrigin: 'top',
          }}
        />
      </m.div>

      <style>{`
        @media (max-width: 640px) {
          #hero [style*="padding: 24px 32px"] {
            padding: 16px 20px !important;
          }
          #hero [style*="font-size: 36px"] {
            font-size: 26px !important;
          }
          #hero [style*="grid-template-columns"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
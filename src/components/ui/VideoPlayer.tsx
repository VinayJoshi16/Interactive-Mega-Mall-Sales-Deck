'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn, viewportConfig } from '../../lib/animations'

interface VideoPlayerProps {
  youtubeId: string
  title: string
  posterImage?: string        // fallback image shown before play
  tag?: string                // e.g. "Nickelodeon Universe"
  caption?: string            // e.g. "7 Acres of Indoor Theme Park"
  autoPlayOnScroll?: boolean  // muted autoplay when enters viewport
  showOverlay?: boolean       // show tag + caption overlay
  height?: string             // css height, default '480px'
  delay?: number
}

// ─── Play icon SVG ────────────────────────────────────────────
function PlayIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ marginLeft: '3px' }}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export default function VideoPlayer({
  youtubeId,
  title,
  posterImage,
  tag,
  caption,
  autoPlayOnScroll = false,
  showOverlay = true,
  height = '480px',
  delay = 0,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying]   = useState(false)
  const [isHovered, setIsHovered]   = useState(false)
  const wrapperRef                  = useRef<HTMLDivElement>(null)

  // ─── Auto-play muted version on scroll (bg video mode) ───
  useEffect(() => {
    if (!autoPlayOnScroll) return
    const el = wrapperRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsPlaying(true)
        else setIsPlaying(false)
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [autoPlayOnScroll])

  // ─── Build embed URL ──────────────────────────────────────
  const embedUrl = autoPlayOnScroll
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&controls=0&rel=0&iv_load_policy=3&modestbranding=1&playlist=${youtubeId}`
    : `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`

  return (
    <motion.div
      ref={wrapperRef}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay }}
      style={{
        position:   'relative',
        width:      '100%',
        height,
        overflow:   'hidden',
        background: 'var(--dark)',
        cursor:     'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Poster image (shown before play) ────────────── */}
      <AnimatePresence>
        {!isPlaying && posterImage && (
          <motion.img
            key="poster"
            src={posterImage}
            alt={title}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position:   'absolute',
              inset:      0,
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              objectPosition: 'center',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── YouTube iframe (shown when playing) ─────────── */}
      {isPlaying && (
        <iframe
          src={embedUrl}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            inset:    0,
            width:    '100%',
            height:   '100%',
            border:   'none',
          }}
        />
      )}

      {/* ── Dark overlay ────────────────────────────────── */}
      {!isPlaying && (
        <div
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.2) 50%, transparent 100%)',
            zIndex:     1,
          }}
        />
      )}

      {/* ── Play button ─────────────────────────────────── */}
      {!isPlaying && (
        <motion.button
          onClick={() => setIsPlaying(true)}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          aria-label={`Play ${title}`}
          style={{
            position:       'absolute',
            top:            '50%',
            left:           '50%',
            transform:      'translate(-50%, -50%)',
            zIndex:         2,
            width:          '64px',
            height:         '64px',
            borderRadius:   '50%',
            border:         `1.5px solid ${isHovered ? 'var(--gold)' : 'rgba(200,169,110,0.7)'}`,
            background:     isHovered ? 'var(--gold)' : 'rgba(8,8,8,0.4)',
            backdropFilter: 'blur(8px)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            cursor:         'none',
            color:          isHovered ? 'var(--black)' : 'var(--white)',
            transition:     'all 0.3s var(--ease-out)',
          }}
        >
          <PlayIcon size={22} />
        </motion.button>
      )}

      {/* ── Tag + Caption overlay (bottom-left) ─────────── */}
      {showOverlay && !isPlaying && (tag || caption) && (
        <div
          style={{
            position: 'absolute',
            bottom:   0,
            left:     0,
            right:    0,
            padding:  '28px',
            zIndex:   2,
          }}
        >
          {tag && (
            <div
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '9px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         'var(--gold)',
                marginBottom:  '6px',
              }}
            >
              {tag}
            </div>
          )}
          {caption && (
            <div
              style={{
                fontFamily: 'var(--serif)',
                fontSize:   '22px',
                fontWeight: 300,
                color:      'var(--white)',
                lineHeight: 1.2,
              }}
            >
              {caption}
            </div>
          )}
        </div>
      )}

      {/* ── Hover border glow ────────────────────────────── */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position:     'absolute',
          inset:        0,
          border:       '1px solid rgba(200,169,110,0.3)',
          zIndex:       3,
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  )
}
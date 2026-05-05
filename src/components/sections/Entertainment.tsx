'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { PROPERTY } from '../../lib/data'
import VideoPlayer from '../ui/VideoPlayer'
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  staggerContainer,
  viewportConfig,
} from '../../lib/animations'

export default function Entertainment() {
  const { entertainment, videos, images } = PROPERTY

  return (
    <section
      id="entertainment"
      style={{
        background: 'var(--black)',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      <div className="section-inner">

        {/* ── Eyebrow ──────────────────────────────────────── */}
        <motion.div
          className="section-eyebrow"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {entertainment.eyebrow}
        </motion.div>

        {/* ── Headline ─────────────────────────────────────── */}
        <motion.h2
          className="section-h2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.1 }}
        >
          The only mall in America<br />
          with a <em>theme park inside.</em>
        </motion.h2>

        {/* ── Body ─────────────────────────────────────────── */}
        <motion.p
          className="section-body"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.2 }}
        >
          {entertainment.body}
        </motion.p>

        {/* ══════════════════════════════════════════════════
            MAIN VIDEO ROW
        ══════════════════════════════════════════════════ */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '1.6fr 1fr',
            gap:                 '3px',
            marginTop:           '80px',
          }}
        >
          {/* ── Main video player ────────────────────────── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.2 }}
          >
            <VideoPlayer
              youtubeId={videos.entertainmentMain.youtubeId}
              title={videos.entertainmentMain.title}
              posterImage={images.hero}
              tag="Nickelodeon Universe"
              caption="7 Acres of Indoor Theme Park"
              height="480px"
              showOverlay
            />
          </motion.div>

          {/* ── Side thumbnails ──────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.3 }}
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           '3px',
            }}
          >
            {/* SEA LIFE thumb */}
            <SideThumbnail
              image={images.event}
              tag="Sea Life Aquarium"
              caption="1.2M Gallon Ocean Experience"
              youtubeId={videos.eventsHighlight.youtubeId}
            />

            {/* Events thumb */}
            <SideThumbnail
              image={images.dining}
              tag="Live Events"
              caption="400+ Events Annually"
            />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════
            YOUTUBE SHORTS STRIP
        ══════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.3 }}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap:                 '3px',
            marginTop:           '3px',
            height:              '240px',
          }}
        >
          {videos.shorts.map((short) => (
            <ShortCard key={short.youtubeId} short={short} />
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════════════
            ATTRACTION CARDS
        ══════════════════════════════════════════════════ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:                 '2px',
            marginTop:           '3px',
          }}
        >
          {entertainment.attractions.map((attr, i) => (
            <AttractionCard key={attr.title} attr={attr} delay={i * 0.1} />
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════════════
            BOTTOM IMPACT LINE
        ══════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.2 }}
          style={{
            marginTop:   '100px',
            paddingTop:  '60px',
            borderTop:   '1px solid rgba(200,169,110,0.1)',
            textAlign:   'center',
          }}
        >
          <div
            style={{
              fontFamily:    'var(--mono)',
              fontSize:      '9px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color:         'var(--gold-dim)',
              marginBottom:  '20px',
            }}
          >
            The Differentiator
          </div>
          <div
            style={{
              fontFamily:    'var(--serif)',
              fontSize:      'clamp(28px, 4vw, 56px)',
              fontWeight:    300,
              color:         'var(--white)',
              lineHeight:    1.1,
              letterSpacing: '-0.02em',
              maxWidth:      '900px',
              margin:        '0 auto 40px',
            }}
          >
            No competitor can put a{' '}
            <em
              style={{
                fontStyle: 'italic',
                color:     'var(--gold2)',
              }}
            >
              roller coaster
            </em>{' '}
            next to your storefront.
          </div>

          {/* Key attraction stats */}
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap:                 '2px',
              maxWidth:            '900px',
              margin:              '0 auto',
            }}
          >
            {[
              { num: '30+',    label: 'Rides & Attractions'  },
              { num: '10K+',   label: 'Sea Creatures'        },
              { num: '7',      label: 'Acres Indoor Park'    },
              { num: '1.2M',   label: 'Gallon Ocean'         },
            ].map(stat => (
              <div
                key={stat.label}
                style={{
                  background: 'var(--dark)',
                  padding:    '28px 20px',
                  textAlign:  'center',
                }}
              >
                <div
                  style={{
                    fontFamily:   'var(--serif)',
                    fontSize:     '36px',
                    fontWeight:   300,
                    color:        'var(--gold2)',
                    lineHeight:   1,
                    marginBottom: '8px',
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontFamily:    'var(--mono)',
                    fontSize:      '9px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color:         'var(--gray)',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── Responsive ───────────────────────────────────────── */}
      <style>{`
        @media (max-width: 1024px) {
          #entertainment [style*="grid-template-columns: 1.6fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          #entertainment [style*="flex-direction: column"][style*="gap: 3px"] {
            flex-direction: row !important;
            height: 240px;
          }
          #entertainment [style*="repeat(4, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          #entertainment [style*="grid-template-columns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          #entertainment [style*="height: 240px"] {
            height: auto !important;
          }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SIDE THUMBNAIL sub-component
// ─────────────────────────────────────────────────────────────
interface SideThumbnailProps {
  image:      string
  tag:        string
  caption:    string
  youtubeId?: string
}

function SideThumbnail({ image, tag, caption, youtubeId }: SideThumbnailProps) {
  return youtubeId ? (
    <VideoPlayer
      youtubeId={youtubeId}
      title={caption}
      posterImage={image}
      tag={tag}
      caption={caption}
      height="100%"
      showOverlay
    />
  ) : (
    <div
      style={{
        flex:     1,
        position: 'relative',
        overflow: 'hidden',
        cursor:   'none',
      }}
    >
      <Image
        src={image}
        alt={caption}
        fill
        style={{
          objectFit:      'cover',
          objectPosition: 'center',
          transition:     'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
        sizes="(max-width: 1024px) 100vw, 30vw"
      />
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.2) 50%, transparent 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom:   0,
          left:     0,
          right:    0,
          padding:  '20px 24px',
        }}
      >
        <div
          style={{
            fontFamily:    'var(--mono)',
            fontSize:      '9px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         'var(--gold)',
            marginBottom:  '4px',
          }}
        >
          {tag}
        </div>
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize:   '16px',
            fontWeight: 300,
            color:      'var(--white)',
            lineHeight: 1.2,
          }}
        >
          {caption}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SHORT CARD sub-component
// ─────────────────────────────────────────────────────────────
interface ShortCardProps {
  short: {
    youtubeId: string
    label:     string
    thumbnail: string
  }
}

function ShortCard({ short }: ShortCardProps) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor:   'none',
        height:   '100%',
      }}
    >
      <Image
        src={short.thumbnail}
        alt={short.label}
        fill
        style={{
          objectFit:      'cover',
          objectPosition: 'center top',
        }}
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      <div
        style={{
          position:       'absolute',
          inset:          0,
          background:     'linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 50%)',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'flex-end',
          padding:        '16px 20px',
        }}
      >
        {/* Play button */}
        <a
          href={`https://www.youtube.com/shorts/${short.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position:       'absolute',
            top:            '50%',
            left:           '50%',
            transform:      'translate(-50%, -50%)',
            width:          '44px',
            height:         '44px',
            borderRadius:   '50%',
            border:         '1px solid rgba(200,169,110,0.6)',
            background:     'rgba(8,8,8,0.4)',
            backdropFilter: 'blur(8px)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            cursor:         'none',
            textDecoration: 'none',
            color:          'var(--white)',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ marginLeft: '2px' }}
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </a>

        {/* Label */}
        <div
          style={{
            fontFamily:    'var(--mono)',
            fontSize:      '8px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         'var(--gold)',
          }}
        >
          {short.label}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// ATTRACTION CARD sub-component
// ─────────────────────────────────────────────────────────────
interface AttractionCardProps {
  attr: {
    emoji: string
    title: string
    body:  string
    stat:  string
  }
  delay?: number
}

function AttractionCard({ attr, delay = 0 }: AttractionCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay }}
      whileHover={{
        background: 'var(--dark2)',
        borderColor: 'rgba(200,169,110,0.18)',
      }}
      style={{
        background:    'var(--dark)',
        padding:       '28px 24px',
        border:        '1px solid rgba(200,169,110,0.06)',
        cursor:        'none',
        display:       'flex',
        flexDirection: 'column',
        gap:           '12px',
        transition:    'background 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div
        style={{
          display:        'flex',
          alignItems:     'flex-start',
          justifyContent: 'space-between',
          gap:            '12px',
        }}
      >
        <span style={{ fontSize: '28px', lineHeight: 1 }} aria-hidden>
          {attr.emoji}
        </span>
        <span
          style={{
            fontFamily:    'var(--mono)',
            fontSize:      '9px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--gold)',
            whiteSpace:    'nowrap',
          }}
        >
          {attr.stat}
        </span>
      </div>

      <div
        style={{
          fontFamily:   'var(--serif)',
          fontSize:     'clamp(18px, 1.5vw, 22px)',
          fontWeight:   300,
          color:        'var(--white)',
          lineHeight:   1.2,
        }}
      >
        {attr.title}
      </div>

      <p
        style={{
          margin:     0,
          fontSize:   '12px',
          fontWeight: 300,
          color:      'var(--gray)',
          lineHeight: 1.65,
        }}
      >
        {attr.body}
      </p>
    </motion.div>
  )
}
'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PROPERTY } from '../../lib/data'
import CTAButton from '../ui/CTAButton'
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  staggerContainer,
  viewportConfig,
} from '../../lib/animations'

export default function Events() {
  const { events, images, videos } = PROPERTY
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="events"
      style={{
        background: 'var(--dark)',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      <div className="section-inner">

        {/* ══════════════════════════════════════════════════
            FULL-WIDTH VIDEO HERO
        ══════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            position:  'relative',
            height:    '70vh',
            minHeight: '500px',
            overflow:  'hidden',
            margin:    '-120px -80px 0',
          }}
        >
          {/* Background image */}
          <Image
            src={images.event}
            alt="Major event at Mall of America"
            fill
            style={{
              objectFit:      'cover',
              objectPosition: 'center top',
            }}
            sizes="100vw"
          />

          {/* Gradient overlay */}
          <div
            style={{
              position:       'absolute',
              inset:          0,
              background:     'linear-gradient(to bottom, rgba(20,20,20,0.3) 0%, rgba(20,20,20,0.95) 100%)',
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'flex-end',
              paddingBottom:  '60px',
              textAlign:      'center',
            }}
          >
            {/* Play button */}
            <EventsPlayButton youtubeId={videos.eventsHighlight.youtubeId} />

            {/* Kicker */}
            <div
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '9px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color:         'var(--gold)',
                marginBottom:  '16px',
              }}
            >
              {events.eyebrow}
            </div>

            {/* Hero headline */}
            <h2
              style={{
                fontFamily:    'var(--serif)',
                fontSize:      'clamp(36px, 5vw, 64px)',
                fontWeight:    300,
                color:         'var(--white)',
                lineHeight:    1.05,
                maxWidth:      '800px',
                letterSpacing: '-0.02em',
              }}
            >
              400+ events per year.{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold2)' }}>
                One platform.
              </em>
            </h2>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            SECTION HEADLINE + BODY
        ══════════════════════════════════════════════════ */}
        <div style={{ paddingTop: '80px' }}>
          <motion.div
            className="section-eyebrow"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            Event & Venue Capabilities
          </motion.div>

          <motion.h2
            className="section-h2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
          >
            Book the stage that<br />
            America <em>watches.</em>
          </motion.h2>

          <motion.p
            className="section-body"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.2 }}
          >
            {events.body}
          </motion.p>
        </div>

        {/* ══════════════════════════════════════════════════
            VENUE CARDS
        ══════════════════════════════════════════════════ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '2px',
            marginTop:           '60px',
          }}
        >
          {events.venues.map((venue, i) => (
            <VenueCard key={venue.name} venue={venue} delay={i * 0.12} />
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════════════
            EVENT CAPABILITIES GRID
        ══════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.2 }}
          style={{
            marginTop:           '60px',
            display:             'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:                 '2px',
          }}
        >
          {[
            { icon: '🎤', label: 'Concerts & Live Music'      },
            { icon: '🚀', label: 'Product Launches'           },
            { icon: '🎪', label: 'Brand Activations'          },
            { icon: '🏢', label: 'Corporate & Conventions'    },
          ].map(cap => (
            <div
              key={cap.label}
              style={{
                background: 'var(--dark2)',
                padding:    '28px 24px',
                display:    'flex',
                alignItems: 'center',
                gap:        '16px',
                border:     '1px solid rgba(200,169,110,0.06)',
              }}
            >
              <span style={{ fontSize: '20px', flexShrink: 0 }}>{cap.icon}</span>
              <span
                style={{
                  fontFamily:    'var(--mono)',
                  fontSize:      '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         'var(--gray)',
                  lineHeight:    1.4,
                }}
              >
                {cap.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════════════
            PAST EVENTS STRIP
        ══════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.2 }}
          style={{
            marginTop:  '80px',
            borderTop:  '1px solid rgba(200,169,110,0.1)',
            paddingTop: '48px',
          }}
        >
          {/* Label */}
          <div
            style={{
              fontFamily:    'var(--mono)',
              fontSize:      '9px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color:         'var(--gold-dim)',
              marginBottom:  '32px',
            }}
          >
            Past Events & Moments
          </div>

          {/* Horizontal scroll */}
          <div
            ref={scrollRef}
            style={{
              display:    'flex',
              gap:        '2px',
              overflowX:  'auto',
              paddingBottom: '8px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--gold-dim) var(--dark)',
            }}
          >
            {events.pastEvents.map((event, i) => (
              <PastEventCard key={i} event={event} />
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.2 }}
          style={{
            marginTop:      '80px',
            padding:        '60px',
            background:     'var(--dark2)',
            border:         '1px solid rgba(200,169,110,0.1)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            gap:            '40px',
            flexWrap:       'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         'var(--gold-dim)',
                marginBottom:  '12px',
              }}
            >
              Ready to book?
            </div>
            <div
              style={{
                fontFamily:   'var(--serif)',
                fontSize:     'clamp(24px, 3vw, 40px)',
                fontWeight:   300,
                color:        'var(--white)',
                lineHeight:   1.1,
              }}
            >
              America's stage is{' '}
              <em style={{ color: 'var(--gold2)' }}>available.</em>
            </div>
          </div>
          <CTAButton
            label="Check Event Availability"
            href="#contact"
            variant="primary"
            size="lg"
          />
        </motion.div>

      </div>

      {/* ── Responsive ───────────────────────────────────────── */}
      <style>{`
        @media (max-width: 1024px) {
          #events [style*="margin: -120px -80px 0"] {
            margin: -80px -40px 0 !important;
          }
          #events [style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          #events [style*="repeat(4, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
          #events [style*="padding: 60px"] {
            padding: 36px !important;
          }
        }
        @media (max-width: 640px) {
          #events [style*="repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          #events [style*="height: 70vh"] {
            height: 50vh !important;
          }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// EVENTS PLAY BUTTON sub-component
// ─────────────────────────────────────────────────────────────
function EventsPlayButton({ youtubeId }: { youtubeId: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen,    setIsOpen]    = useState(false)

  return (
    <>
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
        animate={{
          background:   isHovered ? 'var(--gold)' : 'rgba(8,8,8,0.3)',
          borderColor:  isHovered
            ? 'var(--gold)'
            : 'rgba(200,169,110,0.6)',
          scale:        isHovered ? 1.08 : 1,
        }}
        style={{
          width:          '80px',
          height:         '80px',
          borderRadius:   '50%',
          border:         '1.5px solid rgba(200,169,110,0.6)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          marginBottom:   '40px',
          cursor:         'none',
          backdropFilter: 'blur(12px)',
          background:     'rgba(8,8,8,0.3)',
          color:          isHovered ? 'var(--black)' : 'var(--white)',
          transition:     'color 0.3s',
        }}
        aria-label="Play events video"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ marginLeft: '4px' }}
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </motion.button>

      {/* Inline modal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position:       'fixed',
            inset:          0,
            background:     'rgba(8,8,8,0.95)',
            zIndex:         1000,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width:     '90vw',
              maxWidth:  '1100px',
              aspectRatio: '16/9',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title="Events at Mall of America"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              position:      'fixed',
              top:           '32px',
              right:         '40px',
              fontFamily:    'var(--mono)',
              fontSize:      '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'var(--gray)',
              cursor:        'none',
              border:        '1px solid rgba(200,169,110,0.2)',
              padding:       '10px 20px',
              background:    'transparent',
              zIndex:        1001,
            }}
          >
            Close ✕
          </button>
        </div>
      )}
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// VENUE CARD sub-component
// ─────────────────────────────────────────────────────────────
interface VenueCardProps {
  venue: {
    name:     string
    title:    string
    capacity: string
    body:     string
    cta:      string
    href:     string
  }
  delay?: number
}

function VenueCard({ venue, delay = 0 }: VenueCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay }}
      whileHover={{ background: 'var(--dark3)' }}
      style={{
        background: 'var(--dark2)',
        padding:    '40px 36px',
        border:     '1px solid rgba(200,169,110,0.07)',
        cursor:     'none',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      {/* Top gold rule on hover */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{
          position:        'absolute',
          top:             0,
          left:            0,
          right:           0,
          height:          '2px',
          background:      'linear-gradient(to right, var(--gold-dim), var(--gold2))',
          transformOrigin: 'left',
        }}
      />

      {/* Capacity */}
      <div
        style={{
          fontFamily:   'var(--serif)',
          fontSize:     '52px',
          fontWeight:   300,
          color:        'var(--gold2)',
          lineHeight:   1,
          marginBottom: '8px',
        }}
      >
        {venue.capacity}
      </div>

      {/* Venue name tag */}
      <div
        style={{
          fontFamily:    'var(--mono)',
          fontSize:      '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'var(--gold-dim)',
          marginBottom:  '20px',
          paddingBottom: '20px',
          borderBottom:  '1px solid rgba(200,169,110,0.1)',
        }}
      >
        {venue.name}
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily:   'var(--serif)',
          fontSize:     '24px',
          fontWeight:   300,
          color:        'var(--white)',
          marginBottom: '12px',
          lineHeight:   1.2,
        }}
      >
        {venue.title}
      </div>

      {/* Body */}
      <p
        style={{
          fontSize:     '13px',
          color:        'var(--gray)',
          fontWeight:   300,
          lineHeight:   1.7,
          marginBottom: '28px',
        }}
      >
        {venue.body}
      </p>

      {/* CTA */}
      <CTAButton
        label={venue.cta}
        href={venue.href}
        variant="ghost"
        arrow
      />
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// PAST EVENT CARD sub-component
// ─────────────────────────────────────────────────────────────
interface PastEventCardProps {
  event: {
    year:       string
    name:       string
    attendance: string
  }
}

function PastEventCard({ event }: PastEventCardProps) {
  return (
    <motion.div
      whileHover={{ borderColor: 'rgba(200,169,110,0.28)' }}
      style={{
        background:  'var(--dark2)',
        padding:     '28px 32px',
        flexShrink:  0,
        minWidth:    '240px',
        border:      '1px solid rgba(200,169,110,0.07)',
        cursor:      'none',
        transition:  'border-color 0.3s',
      }}
    >
      <div
        style={{
          fontFamily:    'var(--mono)',
          fontSize:      '9px',
          letterSpacing: '0.15em',
          color:         'var(--gold-dim)',
          marginBottom:  '12px',
        }}
      >
        {event.year}
      </div>
      <div
        style={{
          fontFamily:   'var(--serif)',
          fontSize:     '20px',
          fontWeight:   300,
          color:        'var(--white)',
          marginBottom: '8px',
          lineHeight:   1.2,
        }}
      >
        {event.name}
      </div>
      <div
        style={{
          fontSize:   '12px',
          color:      'var(--gray)',
          fontWeight: 300,
          lineHeight: 1.5,
        }}
      >
        {event.attendance}
      </div>
    </motion.div>
  )
}
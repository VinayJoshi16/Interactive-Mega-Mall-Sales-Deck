'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { PROPERTY } from '../../lib/data'
import CTAButton from '../ui/CTAButton'
import {
  fadeUp,
  fadeLeft,
  staggerContainer,
  viewportConfig,
} from '../../lib/animations'

export default function Retail() {
  const { retail } = PROPERTY

  // Duplicate marquee items for seamless loop
  const marqueeItems = [...retail.tenantMarquee, ...retail.tenantMarquee]

  return (
    <section
      id="retail"
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
          {retail.eyebrow}
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
          520 stores.{' '}
          <em>One address.</em>
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
          {retail.body}
        </motion.p>

        {/* ══════════════════════════════════════════════════
            MARQUEE TENANT STRIP
        ══════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.3 }}
          style={{
            overflow:   'hidden',
            margin:     '60px -80px 0',
            padding:    '28px 0',
            borderTop:  '1px solid rgba(200,169,110,0.1)',
            borderBottom: '1px solid rgba(200,169,110,0.1)',
            position:   'relative',
          }}
        >
          {/* Left fade */}
          <div
            style={{
              position:   'absolute',
              top:        0,
              bottom:     0,
              left:       0,
              width:      '120px',
              background: 'linear-gradient(to right, var(--black), transparent)',
              zIndex:     2,
              pointerEvents: 'none',
            }}
          />
          {/* Right fade */}
          <div
            style={{
              position:   'absolute',
              top:        0,
              bottom:     0,
              right:      0,
              width:      '120px',
              background: 'linear-gradient(to left, var(--black), transparent)',
              zIndex:     2,
              pointerEvents: 'none',
            }}
          />

          {/* Scrolling track */}
          <div
            style={{
              display:   'flex',
              width:     'max-content',
              animation: 'marqueeScroll 30s linear infinite',
            }}
          >
            {marqueeItems.map((tenant, i) => (
              <span
                key={`${tenant}-${i}`}
                style={{
                  padding:       '0 40px',
                  fontFamily:    'var(--serif)',
                  fontSize:      '15px',
                  fontWeight:    300,
                  letterSpacing: '0.1em',
                  color:         'var(--gray2)',
                  borderRight:   '1px solid rgba(200,169,110,0.12)',
                  whiteSpace:    'nowrap',
                  transition:    'color 0.3s',
                  cursor:        'default',
                }}
                onMouseEnter={e => {
                  ;(e.target as HTMLElement).style.color = 'var(--gold2)'
                }}
                onMouseLeave={e => {
                  ;(e.target as HTMLElement).style.color = 'var(--gray2)'
                }}
              >
                {tenant}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            CATEGORY CARDS
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
            marginTop:           '80px',
          }}
        >
          {retail.categories.map((cat, i) => (
            <RetailCard key={cat.num} cat={cat} delay={i * 0.12} />
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════════════
            BOTTOM LEASING CTA ROW
        ══════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.3 }}
          style={{
            marginTop:      '80px',
            paddingTop:     '48px',
            borderTop:      '1px solid rgba(200,169,110,0.1)',
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
                fontFamily:    'var(--serif)',
                fontSize:      'clamp(24px, 3vw, 38px)',
                fontWeight:    300,
                color:         'var(--white)',
                marginBottom:  '8px',
                lineHeight:    1.1,
              }}
            >
              Ready to find your space?
            </div>
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontSize:   '14px',
                fontWeight: 300,
                color:      'var(--gray)',
              }}
            >
              Our leasing team is standing by.
            </div>
          </div>
          <CTAButton
            label="Start a Leasing Conversation"
            href="#contact"
            variant="primary"
            size="lg"
          />
        </motion.div>

      </div>

      {/* ── Marquee keyframe ─────────────────────────────────── */}
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track:hover {
          animation-play-state: paused !important;
        }
        @media (max-width: 1024px) {
          #retail [style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          #retail [style*="margin: 60px -80px 0"] {
            margin: 60px -40px 0 !important;
          }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// RETAIL CARD sub-component
// ─────────────────────────────────────────────────────────────
interface RetailCardProps {
  cat: {
    num:   string
    tag:   string
    title: string
    body:  string
    cta:   string
    href:  string
  }
  delay?: number
}

function RetailCard({ cat, delay = 0 }: RetailCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={cardRef}
      variants={fadeLeft}
      transition={{ delay }}
      whileHover={{
        y:           -6,
        borderColor: 'rgba(200,169,110,0.25)',
        background:  'var(--dark2)',
      }}
      style={{
        background:  'var(--dark)',
        padding:     '40px 36px',
        border:      '1px solid rgba(200,169,110,0.06)',
        transition:  'all 0.35s cubic-bezier(0.22,1,0.36,1)',
        cursor:      'none',
        display:     'flex',
        flexDirection: 'column',
      }}
    >
      {/* Tag row */}
      <div
        style={{
          fontFamily:    'var(--mono)',
          fontSize:      '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'var(--gold)',
          marginBottom:  '20px',
          paddingBottom: '16px',
          borderBottom:  '1px solid rgba(200,169,110,0.15)',
          display:       'flex',
          alignItems:    'center',
          gap:           '10px',
        }}
      >
        <span style={{ color: 'var(--gray2)' }}>{cat.num}</span>
        <span>—</span>
        <span>{cat.tag}</span>
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily:   'var(--serif)',
          fontSize:     '26px',
          fontWeight:   300,
          color:        'var(--white)',
          marginBottom: '12px',
          lineHeight:   1.2,
          flex:         1,
        }}
      >
        {cat.title}
      </div>

      {/* Body */}
      <p
        style={{
          fontSize:     '13px',
          fontWeight:   300,
          color:        'var(--gray)',
          lineHeight:   1.7,
          marginBottom: '28px',
          flex:         1,
        }}
      >
        {cat.body}
      </p>

      {/* Ghost CTA */}
      <CTAButton
        label={cat.cta}
        href={cat.href}
        variant="ghost"
        arrow
      />
    </motion.div>
  )
}
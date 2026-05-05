'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PROPERTY } from '../../lib/data'
import StatCard from '../ui/StatCard'
import {
  fadeUp,
  fadeRight,
  fadeLeft,
  staggerContainer,
  viewportConfig,
} from '../../lib/animations'

export default function WhyUs() {
  const barsRef = useRef<HTMLDivElement>(null)

  // ─── Animate demographic bars on scroll ──────────────────
  useEffect(() => {
    const bars = barsRef.current?.querySelectorAll<HTMLDivElement>('.demo-bar-fill')
    if (!bars) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bars.forEach(bar => {
            bar.style.width = bar.dataset.width ?? '0%'
          })
        }
      },
      { threshold: 0.3 }
    )

    if (barsRef.current) obs.observe(barsRef.current)
    return () => obs.disconnect()
  }, [])

  const { whyUs, demographics, images } = PROPERTY

  return (
    <section
      id="why"
      style={{
        background: 'var(--off-black)',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      <div className="section-inner">

        {/* ── Eyebrow ──────────────────────────────────────── */}
        <motion.div
          className="section-eyebrow reveal"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {whyUs.eyebrow}
        </motion.div>

        {/* ── Headline ─────────────────────────────────────── */}
        <motion.h2
          className="section-h2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.1 }}
          style={{ maxWidth: '700px' }}
        >
          Why{' '}
          <em>Mall of America</em>
          <br />
          is in a class of its own.
        </motion.h2>

        {/* ══════════════════════════════════════════════════
            TWO-COLUMN GRID
        ══════════════════════════════════════════════════ */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 '100px',
            alignItems:          'start',
            marginTop:           '80px',
          }}
        >
          {/* ── LEFT COLUMN ──────────────────────────────── */}
          <div>
            {/* Body copy */}
            <motion.p
              className="section-body"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{ delay: 0.2 }}
            >
              {whyUs.body}
            </motion.p>

            {/* Stat cards 2×2 grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              style={{
                display:             'grid',
                gridTemplateColumns: '1fr 1fr',
                gap:                 '2px',
                marginTop:           '48px',
              }}
            >
              {whyUs.statCards.map((card, i) => (
                <StatCard
                  key={card.label}
                  num={card.num}
                  label={card.label}
                  delay={i * 0.1}
                />
              ))}
            </motion.div>

            {/* Demographic bars */}
            <motion.div
              ref={barsRef}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{ delay: 0.3 }}
              style={{ marginTop: '48px' }}
            >
              {/* Bar section label */}
              <div
                style={{
                  fontFamily:    'var(--mono)',
                  fontSize:      '9px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         'var(--gold-dim)',
                  marginBottom:  '24px',
                }}
              >
                Visitor Demographics
              </div>

              {/* Bars */}
              {demographics.bars.map((bar, i) => (
                <div key={bar.label} style={{ marginBottom: '20px' }}>
                  {/* Bar header */}
                  <div
                    style={{
                      display:        'flex',
                      justifyContent: 'space-between',
                      marginBottom:   '8px',
                      fontFamily:     'var(--mono)',
                      fontSize:       '11px',
                      letterSpacing:  '0.05em',
                      color:          'rgba(248,245,238,0.6)',
                    }}
                  >
                    <span>{bar.label}</span>
                    <span>{bar.value}%</span>
                  </div>

                  {/* Bar track */}
                  <div
                    style={{
                      height:     '2px',
                      background: 'var(--dark3)',
                      position:   'relative',
                      overflow:   'hidden',
                    }}
                  >
                    <div
                      className="demo-bar-fill"
                      data-width={`${bar.value}%`}
                      style={{
                        position:   'absolute',
                        top:        0,
                        left:       0,
                        bottom:     0,
                        width:      '0%',
                        background: `linear-gradient(to right, var(--gold-dim), var(--gold2))`,
                        transition: `width 1.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — image stack ───────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.2 }}
            style={{ position: 'relative', height: '620px' }}
          >
            {/* Main image */}
            <div
              style={{
                position: 'absolute',
                top:      0,
                right:    0,
                width:    '82%',
                height:   '520px',
                overflow: 'hidden',
              }}
            >
              <Image
                src={images.hero}
                alt="Mall of America interior with Nickelodeon Universe"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Accent image (bottom-left) */}
            <div
              style={{
                position: 'absolute',
                bottom:   0,
                left:     0,
                width:    '52%',
                height:   '300px',
                overflow: 'hidden',
                border:   '4px solid var(--off-black)',
              }}
            >
              <Image
                src={images.sponsor}
                alt="Brand activation at Mall of America"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>

            {/* Gold badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportConfig}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position:   'absolute',
                bottom:     '140px',
                right:      0,
                background: 'var(--gold)',
                color:      'var(--black)',
                padding:    '20px 24px',
                textAlign:  'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize:   '28px',
                  fontWeight: 400,
                  display:    'block',
                  lineHeight: 1,
                }}
              >
                {whyUs.badge.num}
              </span>
              <span
                style={{
                  fontFamily:    'var(--mono)',
                  fontSize:      '8px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display:       'block',
                  marginTop:     '4px',
                  whiteSpace:    'pre-line',
                }}
              >
                {whyUs.badge.label}
              </span>
            </motion.div>

            {/* Decorative corner line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportConfig}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{
                position:        'absolute',
                top:             '-20px',
                left:            '18%',
                width:           '60px',
                height:          '1px',
                background:      'var(--gold-dim)',
                transformOrigin: 'left',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Responsive ───────────────────────────────────────── */}
      <style>{`
        @media (max-width: 1024px) {
          #why [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          #why [style*="height: 620px"] {
            height: 420px !important;
          }
          #why [style*="height: 520px"] {
            height: 360px !important;
          }
        }
        @media (max-width: 640px) {
          #why [style*="grid-template-columns: 1fr 1fr"]:not([style*="gap: 2px"]) {
            grid-template-columns: 1fr 1fr !important;
            gap: 2px !important;
          }
        }
      `}</style>
    </section>
  )
}
// src/components/sections/Luxury.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { PROPERTY } from '../../lib/data'
import CTAButton from '../ui/CTAButton'
import {
  fadeUp,
  fadeRight,
  staggerContainer,
  viewportConfig,
} from '../../lib/animations'

export default function Luxury() {
  const { luxury, images } = PROPERTY

  return (
    <section
      id="luxury"
      style={{
        background:    'var(--dark)',
        position:      'relative',
        overflow:      'hidden',
        display:       'flex',
        flexDirection: 'column',
        minHeight:     '100vh',
      }}
    >
      {/* ══════════════════════════════════════════════════
          FULL-BLEED IMAGE HERO
      ══════════════════════════════════════════════════ */}
      <div
        style={{
          position:  'relative',
          flex:      1,
          minHeight: '70vh',
          display:   'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src={images.luxury}
            alt="Luxury retail corridor at Mall of America"
            fill
            priority
            style={{
              objectFit:      'cover',
              objectPosition: 'center',
            }}
            sizes="100vw"
          />
        </div>

        {/* Left-side gradient overlay */}
        <div
          style={{
            position:   'absolute',
            inset:      0,
            background: `linear-gradient(
              to right,
              rgba(8,8,8,0.94) 0%,
              rgba(8,8,8,0.65) 40%,
              rgba(8,8,8,0.20) 70%,
              rgba(8,8,8,0.05) 100%
            )`,
            zIndex: 1,
          }}
        />

        {/* Bottom fade into next section */}
        <div
          style={{
            position:   'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            height:     '50%',
            background: 'linear-gradient(to top, var(--dark), transparent)',
            zIndex:     2,
          }}
        />

        {/* Content over image */}
        <div
          style={{
            position:  'relative',
            zIndex:    3,
            padding:   '80px 80px 60px',
            maxWidth:  '680px',
          }}
        >
          {/* Eyebrow */}
          <motion.div
            className="section-eyebrow"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            style={{ color: 'var(--gold2)' }}
          >
            {luxury.eyebrow}
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.15 }}
            style={{
              fontFamily:   'var(--serif)',
              fontSize:     'clamp(28px, 4vw, 52px)',
              fontWeight:   300,
              fontStyle:    'italic',
              lineHeight:   1.2,
              color:        'var(--white2)',
              margin:       '24px 0 32px',
              borderLeft:   'none',
              paddingLeft:  0,
            }}
          >
            "Where discerning shoppers expect to find the{' '}
            <em
              style={{
                fontStyle: 'normal',
                color:     'var(--gold2)',
              }}
            >
              world's finest.
            </em>
            "
          </motion.blockquote>

          {/* Body */}
          <motion.p
            className="section-body"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.25 }}
          >
            {luxury.body}
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.35 }}
            style={{ marginTop: '40px' }}
          >
            <CTAButton
              label={luxury.cta}
              href={luxury.href}
              variant="primary"
              size="md"
            />
          </motion.div>
        </div>

        {/* Decorative vertical rule */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position:        'absolute',
            top:             '80px',
            bottom:          '80px',
            left:            '76px',
            width:           '1px',
            background:      'linear-gradient(to bottom, transparent, var(--gold-dim), transparent)',
            zIndex:          3,
            transformOrigin: 'top',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════
          LUXURY BRAND STRIP
      ══════════════════════════════════════════════════ */}
      <div
        className="section-inner"
        style={{ paddingTop: '60px', paddingBottom: '60px' }}
      >
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            fontFamily:    'var(--mono)',
            fontSize:      '9px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color:         'var(--gold-dim)',
            marginBottom:  '32px',
            display:       'flex',
            alignItems:    'center',
            gap:           '14px',
          }}
        >
          <span
            style={{
              display:    'block',
              width:      '24px',
              height:     '1px',
              background: 'var(--gold-dim)',
              flexShrink: 0,
            }}
          />
          Anchored by the world's most coveted names
        </motion.div>

        {/* Brand name strip */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            display: 'flex',
            gap:     0,
            border:  '1px solid rgba(200,169,110,0.12)',
          }}
        >
          {luxury.brands.map((brand, i) => (
            <LuxuryBrand
              key={brand}
              name={brand}
              isLast={i === luxury.brands.length - 1}
            />
          ))}
        </motion.div>

        {/* Bottom stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.4 }}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '2px',
            marginTop:           '60px',
          }}
        >
          {[
            { num: '$87K',  label: 'Avg. household income of luxury shoppers' },
            { num: '68%',   label: 'Repeat visit rate among luxury customers'  },
            { num: '90+',   label: 'Countries represented in visitor base'     },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                background: 'var(--dark2)',
                padding:    '36px 32px',
                border:     '1px solid rgba(200,169,110,0.07)',
              }}
            >
              <div
                style={{
                  fontFamily:    'var(--serif)',
                  fontSize:      '48px',
                  fontWeight:    300,
                  color:         'var(--gold2)',
                  lineHeight:    1,
                  marginBottom:  '10px',
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
                  lineHeight:    1.6,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Responsive ───────────────────────────────────────── */}
      <style>{`
        @media (max-width: 1024px) {
          #luxury [style*="padding: 80px 80px 60px"] {
            padding: 60px 40px 40px !important;
            max-width: 100% !important;
          }
          #luxury [style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          #luxury [style*="left: 76px"] {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          #luxury [style*="display: flex"][style*="border"] {
            flex-direction: column !important;
          }
          #luxury [style*="border-right: 1px"] {
            border-right: none !important;
            border-bottom: 1px solid rgba(200,169,110,0.1) !important;
          }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// LUXURY BRAND sub-component
// ─────────────────────────────────────────────────────────────
interface LuxuryBrandProps {
  name:   string
  isLast: boolean
}

function LuxuryBrand({ name, isLast }: LuxuryBrandProps) {
  return (
    <motion.div
      variants={fadeRight}
      whileHover={{
        color:      'var(--gold2)',
        background: 'rgba(200,169,110,0.05)',
      }}
      style={{
        flex:          1,
        padding:       '28px 24px',
        textAlign:     'center',
        borderRight:   isLast ? 'none' : '1px solid rgba(200,169,110,0.1)',
        fontFamily:    'var(--serif)',
        fontSize:      '18px',
        fontWeight:    300,
        letterSpacing: '0.15em',
        color:         'var(--gray)',
        transition:    'all 0.3s',
        cursor:        'none',
      }}
    >
      {name}
    </motion.div>
  )
}

'use client'

import Image from 'next/image'
import { m } from 'framer-motion'
import { PROPERTY } from '../../lib/data'
import CTAButton from '../ui/CTAButton'
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  staggerContainer,
  viewportConfig,
} from '../../lib/animations'

export default function Dining() {
  const { dining, images } = PROPERTY

  return (
    <section
      id="dining"
      style={{
        background: 'var(--off-black)',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      <div className="section-inner">

        {/* ── Eyebrow ──────────────────────────────────────── */}
        <m.div
          className="section-eyebrow"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {dining.eyebrow}
        </m.div>

        {/* ── Headline ─────────────────────────────────────── */}
        <m.h2
          className="section-h2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.1 }}
        >
          Food as a <em>destination</em>,<br />
          not an afterthought.
        </m.h2>

        {/* ══════════════════════════════════════════════════
            TWO-COLUMN LAYOUT
        ══════════════════════════════════════════════════ */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap:                 '80px',
            alignItems:          'center',
            marginTop:           '80px',
          }}
        >
          {/* ── LEFT — image ─────────────────────────────── */}
          <m.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            {/* Main image */}
            <div
              style={{
                position: 'relative',
                width:    '100%',
                height:   '580px',
                overflow: 'hidden',
              }}
            >
              <Image
                src={images.dining}
                alt="Premium food hall at Mall of America"
                fill

                placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEA/8QAIhAAAQQCAgMBAAAAAAAAAAAAAQIDBBEhBRIxQWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Amuz1pi3udBDAcksNqcBIPBzwM+KKKAOquHJSlIBAAGABRRQB/9k="
                style={{
                  objectFit:      'cover',
                  objectPosition: 'center',
                }}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />

              {/* Subtle overlay */}
              <div
                style={{
                  position:   'absolute',
                  inset:      0,
                  background: 'linear-gradient(to top, rgba(8,8,8,0.4) 0%, transparent 50%)',
                }}
              />
            </div>

            {/* Floating stat badge */}
            <m.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={viewportConfig}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position:   'absolute',
                bottom:     '-24px',
                right:      '-24px',
                background: 'var(--gold)',
                color:      'var(--black)',
                padding:    '24px 28px',
                minWidth:   '160px',
              }}
            >
              <div
                style={{
                  fontFamily:   'var(--serif)',
                  fontSize:     '40px',
                  fontWeight:   300,
                  lineHeight:   1,
                  marginBottom: '6px',
                }}
              >
                50+
              </div>
              <div
                style={{
                  fontFamily:    'var(--mono)',
                  fontSize:      '9px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Dining options
              </div>
            </m.div>

            {/* Decorative border frame */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
              transition={{ delay: 0.6 }}
              style={{
                position: 'absolute',
                top:      '-12px',
                left:     '-12px',
                right:    '40px',
                bottom:   '40px',
                border:   '1px solid rgba(200,169,110,0.15)',
                zIndex:   -1,
                pointerEvents: 'none',
              }}
            />
          </m.div>

          {/* ── RIGHT — content ──────────────────────────── */}
          <m.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.2 }}
          >
            {/* Body */}
            <p
              className="section-body"
              style={{ marginBottom: '0' }}
            >
              {dining.body}
            </p>

            {/* Highlights list */}
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              style={{
                marginTop:     '48px',
                display:       'flex',
                flexDirection: 'column',
                gap:           0,
              }}
            >
              {dining.highlights.map((item, i) => (
                <DiningHighlight
                  key={item.num}
                  item={item}
                  isLast={i === dining.highlights.length - 1}
                />
              ))}
            </m.div>

            {/* Stat row */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{ delay: 0.5 }}
              style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap:                 '2px',
                marginTop:           '48px',
              }}
            >
              {dining.stats.map(stat => (
                <div
                  key={stat.label}
                  style={{
                    background: 'var(--dark)',
                    padding:    '28px 24px',
                    textAlign:  'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily:   'var(--serif)',
                      fontSize:     '38px',
                      fontWeight:   300,
                      color:        'var(--gold2)',
                      display:      'block',
                      lineHeight:   1,
                      marginBottom: '6px',
                    }}
                  >
                    {stat.num}
                  </span>
                  <span
                    style={{
                      fontFamily:    'var(--mono)',
                      fontSize:      '9px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color:         'var(--gray)',
                      lineHeight:    1.5,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </m.div>

            {/* CTA */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{ delay: 0.6 }}
              style={{ marginTop: '40px' }}
            >
              <CTAButton
                label="Explore F&B Opportunities"
                href="#contact"
                variant="secondary"
                size="md"
              />
            </m.div>
          </m.div>
        </div>

        {/* ══════════════════════════════════════════════════
            BOTTOM PULL QUOTE
        ══════════════════════════════════════════════════ */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.2 }}
          style={{
            marginTop:   '120px',
            padding:     '60px 80px',
            background:  'var(--dark)',
            border:      '1px solid rgba(200,169,110,0.1)',
            position:    'relative',
            overflow:    'hidden',
            textAlign:   'center',
          }}
        >
          {/* Large decorative background text */}
          <div
            style={{
              position:      'absolute',
              top:           '50%',
              left:          '50%',
              transform:     'translate(-50%, -50%)',
              fontFamily:    'var(--serif)',
              fontSize:      '18vw',
              fontWeight:    300,
              color:         'rgba(200,169,110,0.03)',
              whiteSpace:    'nowrap',
              pointerEvents: 'none',
              userSelect:    'none',
              letterSpacing: '-0.04em',
            }}
          >
            DINE
          </div>

          <div
            style={{
              position:      'relative',
              zIndex:        1,
              fontFamily:    'var(--mono)',
              fontSize:      '9px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color:         'var(--gold-dim)',
              marginBottom:  '24px',
            }}
          >
            The Data
          </div>

          <div
            style={{
              fontFamily:    'var(--serif)',
              fontSize:      'clamp(24px, 3.5vw, 44px)',
              fontWeight:    300,
              fontStyle:     'italic',
              color:         'var(--white)',
              lineHeight:    1.3,
              position:      'relative',
              zIndex:        1,
              maxWidth:      '800px',
              margin:        '0 auto',
            }}
          >
            Guests who dine on-site stay{' '}
            <span style={{ color: 'var(--gold2)', fontStyle: 'normal' }}>
              40% longer
            </span>{' '}
            and spend significantly more across every retail category.
          </div>
        </m.div>

      </div>

      {/* ── Responsive ───────────────────────────────────────── */}
      <style>{`
        @media (max-width: 1024px) {
          #dining [style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          #dining [style*="height: 580px"] {
            height: 400px !important;
          }
          #dining [style*="padding: 60px 80px"] {
            padding: 40px 32px !important;
          }
          #dining [style*="bottom: -24px"][style*="right: -24px"] {
            bottom: -16px !important;
            right: -16px !important;
          }
        }
        @media (max-width: 640px) {
          #dining [style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// DINING HIGHLIGHT sub-component
// ─────────────────────────────────────────────────────────────
interface DiningHighlightProps {
  item: {
    num:   string
    title: string
    body:  string
  }
  isLast: boolean
}

function DiningHighlight({ item, isLast }: DiningHighlightProps) {
  return (
    <m.div
      variants={fadeUp}
      whileHover={{ paddingLeft: '16px' }}
      style={{
        padding:       '24px 0',
        borderBottom:  isLast ? 'none' : '1px solid rgba(200,169,110,0.1)',
        display:       'flex',
        gap:           '24px',
        alignItems:    'flex-start',
        cursor:        'none',
        transition:    'padding-left 0.3s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Number */}
      <span
        style={{
          fontFamily:    'var(--mono)',
          fontSize:      '10px',
          color:         'var(--gold)',
          flexShrink:    0,
          marginTop:     '3px',
          letterSpacing: '0.1em',
        }}
      >
        {item.num}
      </span>

      {/* Content */}
      <div>
        <div
          style={{
            fontFamily:   'var(--serif)',
            fontSize:     '20px',
            fontWeight:   300,
            color:        'var(--white)',
            marginBottom: '6px',
            lineHeight:   1.2,
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            fontSize:   '13px',
            color:      'var(--gray)',
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          {item.body}
        </div>
      </div>
    </m.div>
  )
}
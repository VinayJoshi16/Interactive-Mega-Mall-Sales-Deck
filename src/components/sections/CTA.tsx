'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { PROPERTY } from '../../lib/data'
import CTAButton from '../ui/CTAButton'
import {
  fadeUp,
  fadeLeft,
  staggerContainer,
  viewportConfig,
} from '../../lib/animations'

function headlineParts(text: string) {
  const i = text.indexOf('. ')
  if (i === -1) return { lead: text, tail: '' }
  return { lead: text.slice(0, i).trim(), tail: text.slice(i + 2).trim() }
}

export default function CTA() {
  const { sponsorship, contact, images } = PROPERTY

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SPONSORSHIP
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="sponsorship"
        style={{
          background: 'var(--black)',
          position:   'relative',
          overflow:   'hidden',
        }}
      >
        <div className="section-inner">
          <motion.div
            className="section-eyebrow"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {sponsorship.eyebrow}
          </motion.div>

          <motion.h2
            className="section-h2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.1 }}
          >
            {(() => {
              const { lead, tail } = headlineParts(sponsorship.headline)
              return tail ? (
                <>
                  {lead}.
                  <br />
                  <em>{tail}</em>
                </>
              ) : (
                lead
              )
            })()}
          </motion.h2>

          <motion.p
            className="section-body"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.15 }}
            style={{ maxWidth: '720px' }}
          >
            {sponsorship.body}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily:    'var(--mono)',
              fontSize:      '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'var(--gold-dim)',
              marginTop:     '48px',
              marginBottom:  '20px',
            }}
          >
            {sponsorship.audienceTitle}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.25 }}
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap:                 '2px',
              maxWidth:            '900px',
            }}
          >
            {sponsorship.audienceMetrics.map(m => (
              <div
                key={m.label}
                style={{
                  background: 'var(--dark)',
                  padding:    '24px 20px',
                  textAlign:  'center',
                }}
              >
                <div
                  style={{
                    fontFamily:   'var(--serif)',
                    fontSize:     '32px',
                    fontWeight:   300,
                    color:        'var(--gold2)',
                    lineHeight:   1,
                    marginBottom: '8px',
                  }}
                >
                  {m.num}
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
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.3 }}
            style={{
              position:   'relative',
              marginTop:  '48px',
              height:     'min(360px, 50vw)',
              width:      '100%',
              border:     '1px solid rgba(200,169,110,0.08)',
            }}
          >
            <Image
              src={images.sponsor}
              alt="Sponsorship at Mall of America"
              fill
              placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEA/8QAIhAAAQQCAgMBAAAAAAAAAAAAAQIDBBEhBRIxQWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Amuz1pi3udBDAcksNqcBIPBzwM+KKKAOquHJSlIBAAGABRRQB/9k="
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width: 1024px) 100vw, 70vw"
            />
            <div
              style={{
                position:   'absolute',
                inset:      0,
                background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 55%)',
              }}
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap:                 '2px',
              marginTop:           '3px',
            }}
          >
            {sponsorship.tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={fadeLeft}
                transition={{ delay: i * 0.08 }}
                whileHover={{
                  background:  'var(--dark2)',
                  borderColor: 'rgba(200,169,110,0.2)',
                }}
                style={{
                  background:  tier.featured ? 'var(--dark2)' : 'var(--dark)',
                  padding:     '36px 28px',
                  border:      tier.featured
                    ? '1px solid rgba(200,169,110,0.25)'
                    : '1px solid rgba(200,169,110,0.06)',
                  display:     'flex',
                  flexDirection: 'column',
                  gap:         '16px',
                  transition:  'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <div
                  style={{
                    fontFamily:    'var(--mono)',
                    fontSize:      '10px',
                    letterSpacing: '0.25em',
                    color:         'var(--gold)',
                  }}
                >
                  Tier {tier.rank}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize:   '22px',
                    fontWeight: 300,
                    color:      'var(--white)',
                    lineHeight: 1.2,
                  }}
                >
                  {tier.name}
                </div>
                <p
                  style={{
                    margin:     0,
                    fontSize:   '13px',
                    fontWeight: 300,
                    color:      'var(--gray)',
                    lineHeight: 1.65,
                    flex:       1,
                  }}
                >
                  {tier.desc}
                </p>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize:   '20px',
                    color:      'var(--gold2)',
                  }}
                >
                  {tier.price}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.2 }}
            style={{ marginTop: '48px' }}
          >
            <CTAButton
              label={sponsorship.cta}
              href={sponsorship.href}
              variant="primary"
              size="lg"
            />
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            #sponsorship [style*="grid-template-columns: repeat(4, 1fr)"] {
              grid-template-columns: 1fr 1fr !important;
            }
            #sponsorship [style*="grid-template-columns: repeat(3, 1fr)"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CONTACT / GET STARTED
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        style={{
          background: 'var(--off-black)',
          position:   'relative',
          overflow:   'hidden',
          borderTop:  '1px solid rgba(200,169,110,0.08)',
        }}
      >
        <div className="section-inner">
          <motion.div
            className="section-eyebrow"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {contact.eyebrow}
          </motion.div>

          <motion.h2
            className="section-h2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.1 }}
          >
            {(() => {
              const { lead, tail } = headlineParts(contact.headline)
              return tail ? (
                <>
                  {lead}.
                  <br />
                  <em>{tail}</em>
                </>
              ) : (
                lead
              )
            })()}
          </motion.h2>

          <motion.p
            className="section-body"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.15 }}
            style={{ maxWidth: '720px', marginBottom: '60px' }}
          >
            {contact.body}
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap:                 '2px',
            }}
          >
            {contact.paths.map((path, i) => (
              <motion.div
                key={path.num}
                variants={fadeLeft}
                transition={{ delay: i * 0.1 }}
                whileHover={{ background: 'var(--dark2)' }}
                style={{
                  background: 'var(--dark)',
                  padding:    '40px 32px',
                  border:     '1px solid rgba(200,169,110,0.06)',
                  display:    'flex',
                  flexDirection: 'column',
                  gap:        '20px',
                  transition: 'background 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <div
                  style={{
                    fontFamily:    'var(--mono)',
                    fontSize:      '10px',
                    letterSpacing: '0.2em',
                    color:         'var(--gray2)',
                  }}
                >
                  {path.num}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize:   'clamp(22px, 2vw, 28px)',
                    fontWeight: 300,
                    color:      'var(--white)',
                    lineHeight: 1.2,
                  }}
                >
                  {path.title}
                </div>
                <p
                  style={{
                    margin:     0,
                    fontSize:   '13px',
                    fontWeight: 300,
                    color:      'var(--gray)',
                    lineHeight: 1.7,
                    flex:       1,
                  }}
                >
                  {path.body}
                </p>
                <CTAButton
                  label={path.cta}
                  href={path.href}
                  variant="secondary"
                  size="md"
                  fullWidth
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            #contact [style*="grid-template-columns: repeat(3, 1fr)"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
    </>
  )
}

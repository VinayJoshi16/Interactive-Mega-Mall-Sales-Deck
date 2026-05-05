    'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROPERTY } from '../lib/data'

export default function Nav() {
  const [activeSection, setActiveSection] = useState('hero')
  const [activeIndex,   setActiveIndex]   = useState(0)
  const [menuOpen,      setMenuOpen]       = useState(false)

  // ─── Track active section via IntersectionObserver ───────
  useEffect(() => {
    const sections = PROPERTY.nav.map(item =>
      document.getElementById(item.id)
    ).filter(Boolean) as HTMLElement[]

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id  = entry.target.id
            const idx = PROPERTY.nav.findIndex(n => n.id === id)
            setActiveSection(id)
            setActiveIndex(idx)
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  // ─── Smooth scroll to section ─────────────────────────────
  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const currentNum = PROPERTY.nav[activeIndex]?.num ?? '01'

  return (
    <>
      {/* ══════════════════════════════════════════════════
          DESKTOP SIDEBAR NAV
      ══════════════════════════════════════════════════ */}
      <nav
        style={{
          position:       'fixed',
          left:           0,
          top:            0,
          bottom:         0,
          width:          'var(--nav-w)',
          zIndex:         100,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        '40px 0',
          background:     'linear-gradient(to right, rgba(8,8,8,0.95), rgba(8,8,8,0))',
        }}
        aria-label="Section navigation"
      >
        {/* Logo mark */}
        <div
          style={{
            position:      'absolute',
            top:           '28px',
            writingMode:   'vertical-rl',
            fontFamily:    'var(--mono)',
            fontSize:      '9px',
            letterSpacing: '0.2em',
            color:         'var(--gold-dim)',
            textTransform: 'uppercase',
            transform:     'rotate(180deg)',
            userSelect:    'none',
          }}
        >
          MOA
        </div>

        {/* Nav dots */}
        <div
          style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           '28px',
            alignItems:    'center',
          }}
        >
          {PROPERTY.nav.map((item) => {
            const isActive = activeSection === item.id
            return (
              <div
                key={item.id}
                style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
              >
                {/* Dot */}
                <motion.button
                  onClick={() => scrollTo(item.id)}
                  aria-label={`Go to ${item.label}`}
                  animate={{
                    width:      isActive ? '8px' : '5px',
                    height:     isActive ? '8px' : '5px',
                    background: isActive ? 'var(--gold)' : 'var(--gray2)',
                    scale:      isActive ? 1.4 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    borderRadius: '50%',
                    border:       'none',
                    cursor:       'none',
                    padding:      0,
                    flexShrink:   0,
                    display:      'block',
                  }}
                  whileHover={{ background: 'var(--gold2)', scale: 1.5 }}
                />

                {/* Label pill — appears on hover / active */}
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    position:      'absolute',
                    left:          '20px',
                    fontFamily:    'var(--mono)',
                    fontSize:      '9px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color:         'var(--white)',
                    whiteSpace:    'nowrap',
                    background:    'rgba(8,8,8,0.9)',
                    padding:       '4px 10px 4px 8px',
                    borderRadius:  '2px',
                    pointerEvents: 'none',
                    userSelect:    'none',
                  }}
                >
                  {item.label}
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Bottom counter */}
        <div
          style={{
            position:      'absolute',
            bottom:        '28px',
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            gap:           '6px',
          }}
        >
          <motion.div
            style={{
              width:      '1px',
              background: 'linear-gradient(to bottom, transparent, var(--gold-dim))',
            }}
            animate={{ height: '48px' }}
            initial={{ height: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <div
            style={{
              fontFamily:    'var(--mono)',
              fontSize:      '9px',
              color:         'var(--gray2)',
              letterSpacing: '0.1em',
            }}
          >
            <motion.span
              key={currentNum}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentNum}
            </motion.span>
            /09
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════
          MOBILE HAMBURGER NAV
      ══════════════════════════════════════════════════ */}
      <div
        style={{
          display: 'none',
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 200,
          padding: '20px 24px',
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.95), transparent)',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        className="mobile-nav-bar"
      >
        {/* Brand */}
        <div
          style={{
            fontFamily:    'var(--serif)',
            fontSize:      '16px',
            fontWeight:    300,
            color:         'var(--gold2)',
            letterSpacing: '0.05em',
          }}
        >
          Mall of America
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{
            background: 'transparent',
            border:     'none',
            cursor:     'pointer',
            display:    'flex',
            flexDirection: 'column',
            gap:        '5px',
            padding:    '4px',
          }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={
                menuOpen
                  ? i === 0
                    ? { rotate: 45, y: 10 }
                    : i === 1
                    ? { opacity: 0 }
                    : { rotate: -45, y: -10 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              style={{
                display:      'block',
                width:        '22px',
                height:       '1px',
                background:   'var(--gold)',
                transformOrigin: 'center',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position:   'fixed',
              inset:      0,
              zIndex:     190,
              background: 'rgba(8,8,8,0.98)',
              backdropFilter: 'blur(16px)',
              display:    'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap:        '8px',
            }}
          >
            {PROPERTY.nav.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                onClick={() => scrollTo(item.id)}
                style={{
                  background:    'transparent',
                  border:        'none',
                  cursor:        'pointer',
                  fontFamily:    'var(--serif)',
                  fontSize:      activeSection === item.id ? '36px' : '28px',
                  fontWeight:    300,
                  color:         activeSection === item.id ? 'var(--gold2)' : 'var(--gray)',
                  letterSpacing: '-0.01em',
                  padding:       '8px 24px',
                  transition:    'all 0.2s',
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          nav { display: none !important; }
          .mobile-nav-bar { display: flex !important; }
        }
      `}</style>
    </>
  )
}
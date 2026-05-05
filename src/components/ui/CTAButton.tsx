'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface CTAButtonProps {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  arrow?: boolean
  delay?: number
  fullWidth?: boolean
  onClick?: () => void
}

const sizeMap = {
  sm: { padding: '10px 24px', fontSize: '10px' },
  md: { padding: '14px 32px', fontSize: '11px' },
  lg: { padding: '18px 44px', fontSize: '12px' },
}

export default function CTAButton({
  label,
  href,
  variant = 'primary',
  size = 'md',
  arrow = true,
  delay = 0,
  fullWidth = false,
  onClick,
}: CTAButtonProps) {
  const { padding, fontSize } = sizeMap[size]

  const base: React.CSSProperties = {
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            '10px',
    padding,
    fontFamily:     'var(--sans)',
    fontSize,
    fontWeight:     500,
    letterSpacing:  '0.12em',
    textTransform:  'uppercase',
    textDecoration: 'none',
    cursor:         'none',
    border:         'none',
    position:       'relative',
    overflow:       'hidden',
    width:          fullWidth ? '100%' : 'auto',
    whiteSpace:     'nowrap',
    transition:     'color 0.3s',
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--gold)',
      color:      'var(--black)',
    },
    secondary: {
      background: 'transparent',
      color:      'var(--white2)',
      border:     '1px solid rgba(200, 169, 110, 0.4)',
    },
    ghost: {
      background:    'transparent',
      color:         'var(--gold-dim)',
      border:        'none',
      padding:       '0',
      letterSpacing: '0.15em',
      fontSize:      '9px',
    },
  }

  const combined = { ...base, ...variantStyles[variant] }

  const isExternal = href.startsWith('http') || href.startsWith('mailto')
  const isAnchor   = href.startsWith('#')

  const Overlay = variant === 'primary' ? (
    <motion.span
      aria-hidden
      initial={{ x: '-101%' }}
      whileHover={{ x: '0%' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position:   'absolute',
        inset:      0,
        background: 'var(--white)',
        zIndex:     0,
      }}
    />
  ) : null

  const Inner = (
    <>
      {Overlay}
      <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
      {arrow && variant !== 'ghost' && (
        <span style={{ position: 'relative', zIndex: 1, fontSize: '14px', lineHeight: 1 }}>
          →
        </span>
      )}
      {arrow && variant === 'ghost' && (
        <span style={{ fontSize: '12px', lineHeight: 1 }}>→</span>
      )}
    </>
  )

  // ─── Ghost variant ───────────────────────────────────────
  if (variant === 'ghost') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
      >
        {isAnchor || isExternal ? (
          <a
            href={href}
            style={combined}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            onClick={onClick}
          >
            {Inner}
          </a>
        ) : (
          <Link href={href} style={combined} onClick={onClick}>
            {Inner}
          </Link>
        )}
      </motion.div>
    )
  }

  // ─── Primary / Secondary ─────────────────────────────────
  const motionProps = {
    initial:     { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true } as const,
    transition:  { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    whileHover:  variant === 'secondary'
      ? { borderColor: 'var(--gold)', color: 'var(--gold2)' }
      : {},
  }

  const content = isAnchor || isExternal ? (
    <a
      href={href}
      style={combined}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={onClick}
    >
      {Inner}
    </a>
  ) : (
    <Link href={href} style={combined} onClick={onClick}>
      {Inner}
    </Link>
  )

  return (
    <motion.div
      {...motionProps}
      style={{ display: fullWidth ? 'block' : 'inline-block' }}
    >
      {content}
    </motion.div>
  )
}
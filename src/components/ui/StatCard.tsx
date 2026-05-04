'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, viewportConfig } from '@/lib/animations'

interface StatCardProps {
  num: string        // e.g. "40M+", "$87K", "520+"
  label: string      // e.g. "Annual Visitors"
  delay?: number     // stagger delay in seconds
  variant?: 'default' | 'dark' | 'gold'
}

// ─── Parse numeric value out of a stat string for count-up ───
function parseNum(str: string): { prefix: string; value: number; suffix: string } {
  const prefix = str.match(/^[^0-9]*/)?.[0] ?? ''
  const suffix = str.match(/[^0-9]+$/)?.[0] ?? ''
  const raw    = str.replace(prefix, '').replace(suffix, '')
  const value  = parseFloat(raw.replace(/,/g, '')) || 0
  return { prefix, value, suffix }
}

// ─── Count-up hook ────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let startTime: number | null = null
    const startValue = 0

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp
      const elapsed  = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(startValue + eased * (target - startValue)))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }

    requestAnimationFrame(step)
  }, [target, duration, active])

  return count
}

// ─── Format display value ─────────────────────────────────────
function formatValue(value: number, originalNum: string): string {
  // If original had decimal (e.g. "2.87M"), show one decimal
  if (originalNum.includes('.')) {
    return value.toFixed(1)
  }
  // If >= 1000, add comma
  if (value >= 1000) {
    return value.toLocaleString()
  }
  return String(value)
}

export default function StatCard({
  num,
  label,
  delay = 0,
  variant = 'default',
}: StatCardProps) {
  const ref       = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const { prefix, value, suffix } = parseNum(num)
  const count     = useCountUp(value, 1800, active)

  // Trigger count-up when card enters viewport
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const bgMap = {
    default: 'var(--dark)',
    dark:    'var(--off-black)',
    gold:    'rgba(200, 169, 110, 0.06)',
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay }}
      style={{
        background:  bgMap[variant],
        padding:     '32px 28px',
        border:      '1px solid rgba(200, 169, 110, 0.08)',
        transition:  'border-color 0.3s',
        cursor:      'default',
      }}
      whileHover={{ borderColor: 'rgba(200, 169, 110, 0.28)' }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily:   'var(--serif)',
          fontSize:     '48px',
          fontWeight:   300,
          color:        'var(--gold2)',
          lineHeight:   1,
          marginBottom: '10px',
          letterSpacing: '-0.01em',
        }}
      >
        {prefix}
        {formatValue(count, num)}
        {suffix}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily:    'var(--mono)',
          fontSize:      '9px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color:         'var(--gray)',
          lineHeight:    1.6,
          whiteSpace:    'pre-line',
        }}
      >
        {label}
      </div>
    </motion.div>
  )
}
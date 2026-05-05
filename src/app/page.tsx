'use client'

import { useEffect, useRef } from 'react'
import Nav      from '@/components/Nav'
import Hero     from '@/components/sections/Hero'
import WhyUs    from '@/components/sections/WhyUs'
import Retail   from '@/components/sections/Retail'
import Luxury   from '@/components/sections/Luxury'
import Dining   from '@/components/sections/Dining'
import Entertainment from '@/components/sections/Entertainment'
import Events   from '@/components/sections/Events'
import CTA      from '@/components/sections/CTA'

export default function Page() {
  const cursorRef     = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const mouseX        = useRef(0)
  const mouseY        = useRef(0)
  const ringX         = useRef(0)
  const ringY         = useRef(0)
  const rafRef        = useRef<number>(0)

  // ─── Custom cursor ─────────────────────────────────────────
  useEffect(() => {
    const cursor = cursorRef.current
    const ring   = cursorRingRef.current
    if (!cursor || !ring) return

    // Track mouse position
    function onMouseMove(e: MouseEvent) {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
    }

    // Animate cursor + lagging ring
    function animate() {
      cursor!.style.left = `${mouseX.current}px`
      cursor!.style.top  = `${mouseY.current}px`

      // Ring lags behind with lerp
      ringX.current += (mouseX.current - ringX.current) * 0.12
      ringY.current += (mouseY.current - ringY.current) * 0.12
      ring!.style.left = `${ringX.current}px`
      ring!.style.top  = `${ringY.current}px`

      rafRef.current = requestAnimationFrame(animate)
    }

    // Hover effect on interactive elements
    function onMouseEnter() {
      document.body.classList.add('cursor-hover')
    }
    function onMouseLeave() {
      document.body.classList.remove('cursor-hover')
    }

    // Hide cursor when leaving window
    function onMouseOut(e: MouseEvent) {
      if (!e.relatedTarget) {
        cursor!.style.opacity = '0'
        ring!.style.opacity   = '0'
      }
    }
    function onMouseIn() {
      cursor!.style.opacity = '1'
      ring!.style.opacity   = '1'
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseout',  onMouseOut)
    document.addEventListener('mouseover', onMouseIn)
    rafRef.current = requestAnimationFrame(animate)

    // Attach hover listeners to all interactive elements
    function attachHoverListeners() {
      const els = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, [onclick]'
      )
      els.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter)
        el.addEventListener('mouseleave', onMouseLeave)
      })
    }
    attachHoverListeners()

    // Re-attach on DOM changes (for dynamically rendered elements)
    const obs = new MutationObserver(attachHoverListeners)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseout',  onMouseOut)
      document.removeEventListener('mouseover', onMouseIn)
      cancelAnimationFrame(rafRef.current)
      obs.disconnect()
    }
  }, [])

  // ─── Scroll reveal (CSS class-based fallback) ───────────────
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // ─── Keyboard navigation (Escape closes modals) ─────────────
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        // Dispatch custom event that modal components can listen to
        window.dispatchEvent(new CustomEvent('modal:close'))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      {/* ── Custom cursor ──────────────────────────────────── */}
      <div
        ref={cursorRef}
        className="cursor"
        aria-hidden="true"
      />
      <div
        ref={cursorRingRef}
        className="cursor-ring"
        aria-hidden="true"
      />

      {/* ── Fixed sidebar navigation ───────────────────────── */}
      <Nav />

      {/* ── Main content ───────────────────────────────────── */}
      <main
        style={{
          marginLeft: 'var(--nav-w)',
          position:   'relative',
        }}
      >
        <Hero />
        <WhyUs />
        <Retail />
        <Luxury />
        <Dining />
        <Entertainment />
        <Events />
        {/* CTA.tsx renders both Sponsorship + Contact sections */}
        <CTA />
      </main>
    </>
  )
}
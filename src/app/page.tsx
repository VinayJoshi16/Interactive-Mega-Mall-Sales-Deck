'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { LazyMotion, domAnimation } from 'framer-motion'
import Nav  from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import IntroAnimation from '@/components/IntroAnimation'

const WhyUs         = dynamic(() => import('@/components/sections/WhyUs'))
const Retail        = dynamic(() => import('@/components/sections/Retail'))
const Luxury        = dynamic(() => import('@/components/sections/Luxury'))
const Dining        = dynamic(() => import('@/components/sections/Dining'))
const Entertainment = dynamic(() => import('@/components/sections/Entertainment'))
const Events        = dynamic(() => import('@/components/sections/Events'))
const CTA           = dynamic(() => import('@/components/sections/CTA'))
const ChatBot       = dynamic(() => import('@/components/ui/ChatBot'), {
  ssr: false,
  loading: () => null,
})

export default function Page() {
  const [introComplete, setIntroComplete] = useState(false)
  const cursorRef     = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const mouseX        = useRef(0)
  const mouseY        = useRef(0)
  const ringX         = useRef(0)
  const ringY         = useRef(0)
  const rafRef        = useRef<number>(0)

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  // Skip heavy cinematic intro on small screens or for users
  // who prefer reduced motion — improves LCP on mobile / audits
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const prefersReduced = mq?.matches
    const isSmallScreen  = window.innerWidth < 768

    if (prefersReduced || isSmallScreen) {
      setIntroComplete(true)
    }
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    const ring   = cursorRingRef.current
    if (!cursor || !ring) return

    function onMouseMove(e: MouseEvent) {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
    }
    function animate() {
      cursor!.style.left = `${mouseX.current}px`
      cursor!.style.top  = `${mouseY.current}px`
      ringX.current += (mouseX.current - ringX.current) * 0.12
      ringY.current += (mouseY.current - ringY.current) * 0.12
      ring!.style.left = `${ringX.current}px`
      ring!.style.top  = `${ringY.current}px`
      rafRef.current = requestAnimationFrame(animate)
    }
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

    function onMouseOverDelegate(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.closest?.('a, button, [role="button"], input, select, textarea')) {
        document.body.classList.add('cursor-hover')
      }
    }
    function onMouseOutDelegate(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.closest?.('a, button, [role="button"], input, select, textarea')) {
        document.body.classList.remove('cursor-hover')
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseout',  onMouseOut)
    document.addEventListener('mouseover', onMouseIn)
    document.addEventListener('mouseover', onMouseOverDelegate)
    document.addEventListener('mouseout',  onMouseOutDelegate)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseout',  onMouseOut)
      document.removeEventListener('mouseover', onMouseIn)
      document.removeEventListener('mouseover', onMouseOverDelegate)
      document.removeEventListener('mouseout',  onMouseOutDelegate)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') window.dispatchEvent(new CustomEvent('modal:close'))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      <div ref={cursorRingRef} className="cursor-ring" aria-hidden="true" />

      {/* Cinematic intro */}
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Main content */}
      <Nav />

      <main style={{ marginLeft: 'var(--nav-w)', position: 'relative' }}>
        <Hero />
        <WhyUs />
        <Retail />
        <Luxury />
        <Dining />
        <Entertainment />
        <Events />
        <CTA />
      </main>

      {introComplete && <ChatBot />}
    </LazyMotion>
  )
}
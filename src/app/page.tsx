'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Nav  from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import ChatBot from '@/components/ui/ChatBot'

// Lazy load everything below the fold
const WhyUs        = dynamic(() => import('@/components/sections/WhyUs'))
const Retail       = dynamic(() => import('@/components/sections/Retail'))
const Luxury       = dynamic(() => import('@/components/sections/Luxury'))
const Dining       = dynamic(() => import('@/components/sections/Dining'))
const Entertainment = dynamic(() => import('@/components/sections/Entertainment'))
const Events       = dynamic(() => import('@/components/sections/Events'))
const CTA          = dynamic(() => import('@/components/sections/CTA'))

export default function Page() {
  const cursorRef     = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const mouseX        = useRef(0)
  const mouseY        = useRef(0)
  const ringX         = useRef(0)
  const ringY         = useRef(0)
  const rafRef        = useRef<number>(0)

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
    function onMouseEnter() { document.body.classList.add('cursor-hover')    }
    function onMouseLeave() { document.body.classList.remove('cursor-hover') }
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

    function attachHoverListeners() {
      document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea'
      ).forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter)
        el.addEventListener('mouseleave', onMouseLeave)
      })
    }
    attachHoverListeners()

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
    <>
      <div ref={cursorRef}     className="cursor"      aria-hidden="true" />
      <div ref={cursorRingRef} className="cursor-ring" aria-hidden="true" />
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
      <ChatBot />
    </>
  )
}
'use client'

import { useState, useRef, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'

interface Message {
  role:    'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  "What retail spaces are available?",
  "Tell me about event venues",
  "What are sponsorship tiers?",
  "Who visits Mall of America?",
]

const GREETING: Message = {
  role:    'assistant',
  content: "Hi, I'm Alex — your Mall of America partnerships guide. Whether you're exploring a retail location, planning a brand activation, or looking to book one of our venues, I'm here to help. What brings you here today?",
}

export default function ChatBot() {
  const [isOpen,    setIsOpen]    = useState(false)
  const [messages,  setMessages]  = useState<Message[]>([GREETING])
  const [input,     setInput]     = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [pulse,     setPulse]     = useState(true)

  const bottomRef   = useRef<HTMLDivElement>(null)
  const inputRef    = useRef<HTMLInputElement>(null)

  // Stop pulse after first open
  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true)
      setPulse(false)
    }
  }, [isOpen, hasOpened])

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    const updated = [...messages, userMessage]

    setMessages(updated)
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: updated }),
      })

      const data = await res.json()

      if (data.error) throw new Error(data.error)

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.text },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role:    'assistant',
          content: "I'm having trouble connecting right now. Please reach out directly at info@mallofamerica.com and our team will respond within 24 hours.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  function handleSuggestion(q: string) {
    sendMessage(q)
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════
          FLOATING TRIGGER BUTTON
      ══════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed',
          bottom:   '36px',
          right:    '36px',
          zIndex:   500,
        }}
      >
        {/* Pulse ring */}
        {pulse && (
          <m.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position:     'absolute',
              inset:        '-6px',
              borderRadius: '50%',
              border:       '1.5px solid var(--gold)',
              pointerEvents: 'none',
            }}
          />
        )}

        <m.button
          onClick={() => {
  if (isOpen) {
    
    setMessages([GREETING])
    setInput('')
  }
  setIsOpen(v => !v)
}}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Open leasing assistant"
          style={{
            width:          '60px',
            height:         '60px',
            borderRadius:   '50%',
            background:     isOpen ? 'var(--dark2)' : 'var(--gold)',
            border:         '1.5px solid rgba(200,169,110,0.5)',
            cursor:         'none',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            boxShadow:      '0 8px 32px rgba(0,0,0,0.4)',
            transition:     'background 0.3s',
            position:       'relative',
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <m.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{   rotate:  90,  opacity: 0 }}
                transition={{ duration: 0.2 }}
                width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="var(--white)" strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </m.svg>
            ) : (
              <m.svg
                key="chat"
                initial={{ rotate: 90,  opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{   rotate: -90,  opacity: 0 }}
                transition={{ duration: 0.2 }}
                width="22" height="22" viewBox="0 0 24 24"
                fill="none" stroke="var(--black)" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </m.svg>
            )}
          </AnimatePresence>
        </m.button>

        {/* Label tooltip */}
        {!isOpen && !hasOpened && (
          <m.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            style={{
              position:      'absolute',
              right:         '70px',
              top:           '50%',
              transform:     'translateY(-50%)',
              background:    'var(--dark2)',
              border:        '1px solid rgba(200,169,110,0.2)',
              padding:       '8px 14px',
              borderRadius:  '4px',
              whiteSpace:    'nowrap',
              fontFamily:    'var(--mono)',
              fontSize:      '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         'var(--gold2)',
              pointerEvents: 'none',
            }}
          >
            Ask about leasing
          </m.div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════
          CHAT PANEL
      ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 24,  scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position:      'fixed',
              bottom:        '112px',
              right:         '36px',
              width:         '380px',
              height:        '560px',
              zIndex:        499,
              background:    'var(--dark)',
              border:        '1px solid rgba(200,169,110,0.2)',
              display:       'flex',
              flexDirection: 'column',
              overflow:      'hidden',
              boxShadow:     '0 24px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* ── Header ─────────────────────────────────── */}
            <div
              style={{
                padding:        '18px 20px',
                borderBottom:   '1px solid rgba(200,169,110,0.12)',
                display:        'flex',
                alignItems:     'center',
                gap:            '12px',
                background:     'var(--dark2)',
                flexShrink:     0,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width:          '36px',
                  height:         '36px',
                  borderRadius:   '50%',
                  background:     'var(--gold)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize:   '14px',
                    fontWeight: 400,
                    color:      'var(--black)',
                  }}
                >
                  A
                </span>
              </div>

              {/* Name + status */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily:   'var(--serif)',
                    fontSize:     '16px',
                    fontWeight:   300,
                    color:        'var(--white)',
                    lineHeight:   1.2,
                  }}
                >
                  Alex
                </div>
                <div
                  style={{
                    fontFamily:    'var(--mono)',
                    fontSize:      '9px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color:         'var(--gold-dim)',
                    display:       'flex',
                    alignItems:    'center',
                    gap:           '5px',
                    marginTop:     '2px',
                  }}
                >
                  <span
                    style={{
                      width:        '5px',
                      height:       '5px',
                      borderRadius: '50%',
                      background:   '#4ade80',
                      display:      'inline-block',
                    }}
                  />
                  Partnerships Assistant
                </div>
              </div>

              {/* MOA badge */}
              <div
                style={{
                  fontFamily:    'var(--mono)',
                  fontSize:      '8px',
                  letterSpacing: '0.15em',
                  color:         'var(--gold-dim)',
                  border:        '1px solid rgba(200,169,110,0.2)',
                  padding:       '3px 8px',
                }}
              >
                MOA
              </div>
            </div>

            {/* ── Messages ───────────────────────────────── */}
            <div
              style={{
                flex:       1,
                overflowY:  'auto',
                padding:    '16px',
                display:    'flex',
                flexDirection: 'column',
                gap:        '12px',
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--gold-dim) var(--dark)',
              }}
            >
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}

              {/* Typing indicator */}
              {isLoading && <TypingIndicator />}

              {/* Suggested questions (only after greeting, before user replies) */}
              {messages.length === 1 && !isLoading && (
                <div
                  style={{
                    display:       'flex',
                    flexDirection: 'column',
                    gap:           '6px',
                    marginTop:     '4px',
                  }}
                >
                  {SUGGESTED_QUESTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => handleSuggestion(q)}
                      style={{
                        background:    'transparent',
                        border:        '1px solid rgba(200,169,110,0.18)',
                        color:         'var(--gold-dim)',
                        fontFamily:    'var(--mono)',
                        fontSize:      '10px',
                        letterSpacing: '0.08em',
                        padding:       '8px 12px',
                        textAlign:     'left',
                        cursor:        'none',
                        transition:    'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget
                        el.style.borderColor = 'rgba(200,169,110,0.45)'
                        el.style.color       = 'var(--gold2)'
                        el.style.background  = 'rgba(200,169,110,0.05)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget
                        el.style.borderColor = 'rgba(200,169,110,0.18)'
                        el.style.color       = 'var(--gold-dim)'
                        el.style.background  = 'transparent'
                      }}
                    >
                      {q} →
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Input ──────────────────────────────────── */}
            <form
              onSubmit={handleSubmit}
              style={{
                padding:      '12px 16px',
                borderTop:    '1px solid rgba(200,169,110,0.12)',
                display:      'flex',
                gap:          '10px',
                alignItems:   'center',
                background:   'var(--dark2)',
                flexShrink:   0,
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about leasing, events, sponsorship..."
                disabled={isLoading}
                style={{
                  flex:        1,
                  background:  'var(--dark3)',
                  border:      '1px solid rgba(200,169,110,0.15)',
                  color:       'var(--white)',
                  fontFamily:  'var(--sans)',
                  fontSize:    '13px',
                  fontWeight:  300,
                  padding:     '10px 14px',
                  outline:     'none',
                  cursor:      'none',
                  opacity:     isLoading ? 0.6 : 1,
                  transition:  'border-color 0.2s',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(200,169,110,0.45)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(200,169,110,0.15)'
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                style={{
                  width:          '38px',
                  height:         '38px',
                  background:     input.trim() && !isLoading ? 'var(--gold)' : 'var(--dark3)',
                  border:         '1px solid rgba(200,169,110,0.2)',
                  cursor:         'none',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                  transition:     'all 0.2s',
                }}
              >
                <svg
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none"
                  stroke={input.trim() && !isLoading ? 'var(--black)' : 'var(--gray2)'}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>

            {/* ── Footer ─────────────────────────────────── */}
            <div
              style={{
                padding:        '8px 16px',
                background:     'var(--dark2)',
                borderTop:      '1px solid rgba(200,169,110,0.08)',
                display:        'flex',
                justifyContent: 'center',
                flexShrink:     0,
              }}
            >
              <span
                style={{
                  fontFamily:    'var(--mono)',
                  fontSize:      '8px',
                  letterSpacing: '0.1em',
                  color:         'var(--gray2)',
                  textTransform: 'uppercase',
                }}
              >
                Powered by AI · Mall of America
              </span>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .chatbot-panel {
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100dvh !important;
            border-left: none !important;
            border-right: none !important;
          }
        }
      `}</style>
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// MESSAGE BUBBLE
// ─────────────────────────────────────────────────────────────
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ duration: 0.3 }}
      style={{
        display:        'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      <div
        style={{
          maxWidth:   '80%',
          padding:    '10px 14px',
          background: isUser
            ? 'var(--gold)'
            : 'var(--dark3)',
          color: isUser
            ? 'var(--black)'
            : 'var(--white)',
          fontFamily:  'var(--sans)',
          fontSize:    '13px',
          fontWeight:  300,
          lineHeight:  1.65,
          border:      isUser
            ? 'none'
            : '1px solid rgba(200,169,110,0.1)',
        }}
      >
        {message.content}
      </div>
    </m.div>
  )
}

// ─────────────────────────────────────────────────────────────
// TYPING INDICATOR
// ─────────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div
        style={{
          padding:    '12px 16px',
          background: 'var(--dark3)',
          border:     '1px solid rgba(200,169,110,0.1)',
          display:    'flex',
          gap:        '5px',
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map(i => (
          <m.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{
              duration: 1,
              repeat:   Infinity,
              delay:    i * 0.18,
              ease:     'easeInOut',
            }}
            style={{
              display:      'block',
              width:        '5px',
              height:       '5px',
              borderRadius: '50%',
              background:   'var(--gold)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
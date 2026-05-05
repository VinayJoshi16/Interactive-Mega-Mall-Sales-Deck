import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are Alex, the commercial partnerships assistant for Mall of America — the largest and most visited shopping mall in the United States, located in Bloomington, Minnesota, just 20 minutes from Minneapolis-Saint Paul International Airport.

Your role is to help prospective tenants, sponsors, and event partners understand the commercial opportunities at Mall of America and guide them toward booking a conversation with our team.

KEY PROPERTY FACTS:
- 5.6 million sq ft total / 2.87 million sq ft retail
- 40 million+ annual visitors from all 50 states and 90+ countries
- 520+ retail tenants across all categories
- 400+ events per year
- 342-room on-site hotel (Radisson Blu)
- Nickelodeon Universe: 7-acre indoor theme park, 30+ rides
- SEA LIFE Minnesota Aquarium: 1.2 million gallon ocean experience
- 50+ dining options
- 20 minutes from MSP Airport
- 30 million people within 1-day drive

VISITOR DEMOGRAPHICS:
- 40 million annual visitors
- 60% female, Median age: 34
- Average household income: $87,000
- 72% ages 18–44, 45% out-of-market visitors
- Average visit duration: 3 hours
- Repeat visit rate: 68%

RETAIL LEASING:
- Flagship/Anchor: 20,000–200,000 sq ft, category-defining presence
- Mid-tier retail: High-traffic corridors, cross-shopping synergy
- F&B: 50+ concepts, dwell time increases 40% for dining guests
- Pop-up/Experiential: 200–5,000 sq ft flexible short-term
- Luxury wing: Marble corridors, premium positioning
- Contact: leasing@mallofamerica.com

EVENT VENUES:
- Grand Atrium: Up to 10,000 capacity, soaring glass ceilings
- Rotunda Stage: Up to 5,000 capacity, 360-degree sightlines
- North Garden Hall: Up to 2,500 capacity, full AV, custom buildout
- 400+ events annually: concerts, product launches, brand activations
- Past events: Super Bowl activations, Taylor Swift fan experiences,
  Barbie World Tour, BTS Army conventions, Minnesota Vikings events
- Contact: events@mallofamerica.com

SPONSORSHIP TIERS:
- Presenting Partner: $500K+ — naming rights, full experiential access
- Premier Sponsor: $250K+ — activation zones, digital placements
- Brand Partner: $100K+ — event co-branding, signage
- Contact: partnerships@mallofamerica.com

TONE & BEHAVIOR:
- Be warm, confident, and knowledgeable — like a senior sales director, not a chatbot
- Keep responses concise: 2–4 sentences max per point
- Always end with either a question to understand their needs, or a clear next step CTA
- When someone shows serious interest say: "I would love to connect you with our team directly — what is your timeline?"
- Never fabricate specific pricing beyond the tier ranges above
- If asked something you do not know, direct to the relevant email above
- You represent a world-class property — match that energy`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request — messages array required' },
        { status: 400 }
      )
    }

    const validMessages = messages
      .filter((m: { role: string; content: string }) =>
        m.role === 'user' || m.role === 'assistant'
      )
      .map((m: { role: string; content: string }) => ({
        role:    m.role,
        content: m.content,
      }))

    const res = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model:       'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...validMessages,
          ],
          max_tokens:  512,
          temperature: 0.7,
        }),
      }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error('Groq error:', err)
      throw new Error('Groq API error')
    }

    const data = await res.json()

    const text =
      data?.choices?.[0]?.message?.content ??
      "I'm having trouble connecting right now. Please reach out at info@mallofamerica.com."

    return NextResponse.json({ text })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
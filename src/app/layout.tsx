import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
import '../styles/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://your-project.vercel.app'),
  title: 'Mall of America — Retail, Events & Partnership Opportunities',
  description:
    'America\'s largest destination. 40M+ annual visitors, 520+ stores, world-class events. Explore leasing, sponsorship, and venue opportunities at Mall of America.',
  keywords:
    'Mall of America, retail leasing, brand sponsorship, event venue, Nickelodeon Universe, Bloomington Minnesota',
  openGraph: {
    title: 'Mall of America — Retail, Events & Partnership Opportunities',
    description:
      '40 million visitors. 520 stores. One indoor theme park. Your brand belongs here.',
    url: 'https://mallofamerica.com',
    siteName: 'Mall of America',
    images: [
      {
        url: '/images/hero.webp',
        width: 1920,
        height: 1080,
        alt: 'Mall of America — Interior',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mall of America — Retail, Events & Partnership Opportunities',
    description:
      '40 million visitors. 520 stores. One indoor theme park. Your brand belongs here.',
    images: ['/images/hero.webp'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <meta name="theme-color" content="#080808" />
      </head>
      <body>{children}</body>
    </html>
  )
}
import type { Metadata } from 'next'
import '../styles/globals.css'

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
  rel="preconnect"
  href="https://fonts.googleapis.com"
/>
<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossOrigin="anonymous"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@300;400&display=optional"
  rel="stylesheet"
/>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <meta name="theme-color" content="#080808" />
      </head>
      <body>{children}</body>
    </html>
  )
}
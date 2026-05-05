
// Mall of America — Central Content & Data File
// All components import from here. Never hardcode content in components.

export const PROPERTY = {
  name: "Mall of America",
  shortName: "MOA",
  tagline: "America's Destination.",
  taglineSub:
    "40 million visitors. 520 stores. One indoor theme park. A platform unlike anything else in retail. Your brand belongs here.",
  location: "Bloomington, Minnesota",
  established: 1992,
  website: "https://mallofamerica.com",

  emails: {
    leasing:       "leasing@mallofamerica.com",
    partnerships:  "partnerships@mallofamerica.com",
    events:        "events@mallofamerica.com",
    general:       "info@mallofamerica.com",
  },

  
  // CORE STATS
  
  stats: {
    sqFtTotal:        "5.6M",
    sqFtRetail:       "2.87M",
    visitors:         "40M+",
    stores:           "520+",
    events:           "400+",
    hotelRooms:       342,
    airportMins:      20,
    catchmentPop:     "30M",
    catchmentDesc:    "people within 1-day drive",
    avgVisitDuration: "3hrs",
    dwellTimeBoost:   "+40%",
    repeatVisitRate:  "68%",
    countriesVisited: "90+",
    parkingSpaces:    "12,550",
  },

  
  // DEMOGRAPHICS
  
  demographics: {
    medianAge:     34,
    avgHHIncome:   "$87,000",
    femaleVisitors: "60%",
    ages18to44:    "72%",
    hhi75kPlus:    "65%",
    outOfMarket:   "45%",
    bars: [
      { label: "Female",                 value: 60 },
      { label: "Ages 18–44",             value: 72 },
      { label: "HHI $75K+",              value: 65 },
      { label: "Out-of-market visitors", value: 45 },
    ],
  },

  
  // HERO
  
  hero: {
    eyebrow: "Bloomington, Minnesota — Est. 1992",
    words: ["America's", "Largest", "Destination."],
    accentIndex: 1,
    subheadline:
      "40 million visitors. 520 stores. One indoor theme park. A platform unlike anything else in retail. Your brand belongs here.",
    ctas: [
      { label: "Explore Opportunities", href: "#contact", variant: "primary"   },
      { label: "Discover the Property", href: "#why",     variant: "secondary" },
    ],
    statBar: [
      { num: "40M+", label: "Annual Visitors" },
      { num: "5.6M", label: "Sq. Ft. Total"   },
      { num: "520+", label: "Retail Tenants"  },
      { num: "400+", label: "Events Per Year" },
    ],
  },

  
  // VIDEOS
  
  videos: {
    heroBg: {
      youtubeId: "XsSkOHbdG1o",
      title:     "Mall of America — Overview",
    },
    entertainmentMain: {
      youtubeId: "I19QSa2k05M",
      title:     "Nickelodeon Universe — Theme Park Experience",
    },
    eventsHighlight: {
      youtubeId: "7rqxb0BICj8",
      title:     "Events at Mall of America",
    },
    shorts: [
      {
        youtubeId: "sFX2Lug6s84",
        label:     "Inside the Park",
        thumbnail: "/images/hero.webp",
      },
      {
        youtubeId: "JRc3Aui4NrI",
        label:     "Event Moments",
        thumbnail: "/images/event.webp",
      },
    ],
  },

  
  // IMAGES  (place files in /public/images/)
  
  images: {
    hero:    "/images/hero.webp",
    luxury:  "/images/luxury.webp",
    event:   "/images/event.webp",
    dining:  "/images/dining.webp",
    sponsor: "/images/sponsor.webp",
  },

  
  // WHY US
  
  whyUs: {
    eyebrow:     "The Opportunity",
    headline:    "Why Mall of America is in a class of its own.",
    accentWord:  "Mall of America",
    body:
      "There is no comparable property in North America. Mall of America is not a mall — it's a city under glass. A destination that draws visitors from every state and 90+ countries, anchored by experiences that no standalone retail environment can match.",
    statCards: [
      { num: "30M",  label: "People within 1-day drive" },
      { num: "20",   label: "Minutes from MSP Airport"  },
      { num: "342",  label: "On-site hotel rooms"       },
      { num: "$87K", label: "Avg. household income"     },
    ],
    badge: {
      num:   "#1",
      label: "US Tourist Destination",
    },
  },

  
  // RETAIL
  
  retail: {
    eyebrow: "Retail Environment",
    headline: "520 stores. One address.",
    body:
      "From global flagships to beloved regional brands, Mall of America hosts a tenant mix that no other property in the country can replicate. With 40 million annual visitors, your brand reaches its audience at scale.",
    tenantMarquee: [
      "Nordstrom", "Apple", "Tesla", "Lego", "Sephora",
      "H&M", "Zara", "Coach", "Michael Kors", "Forever 21",
      "Nike", "Adidas", "Barnes & Noble", "Hard Rock Cafe", "Macy's",
    ],
    categories: [
      {
        num:   "01",
        tag:   "Flagship",
        title: "Flagship & Anchor Stores",
        body:
          "Premium real estate for global brands seeking category-defining presence. 20,000–200,000 sq ft footprints in America's most visited retail destination.",
        cta:   "Explore Flagship Space",
        href:  "#contact",
      },
      {
        num:   "02",
        tag:   "Mid-Tier",
        title: "Mid-Tier Retail",
        body:
          "High-traffic corridors designed for established brands. Surrounded by complementary tenants that drive cross-shopping and increase dwell time significantly.",
        cta:   "View Availability",
        href:  "#contact",
      },
      {
        num:   "03",
        tag:   "Pop-Up",
        title: "Pop-Up & Experiential",
        body:
          "Flexible short-term spaces from 200 to 5,000 sq ft. Ideal for product launches, limited drops, and brand activations. Fully customizable environments.",
        cta:   "Book a Pop-Up",
        href:  "#contact",
      },
    ],
  },

  
  // LUXURY
  
  luxury: {
    eyebrow: "Luxury Collection",
    quote:
      "Where discerning shoppers expect to find the world's finest.",
    body:
      "Mall of America's luxury corridor attracts the region's highest-net-worth consumers. Marble floors, curated lighting, and an atmosphere of elevation — this is where premium brands command attention and premium prices.",
    cta:    "Inquire — Luxury Leasing",
    href:   "#contact",
    brands: ["Chanel", "Saint Laurent", "Gucci", "Louis Vuitton", "Hermès"],
  },

  
  // DINING
  
  dining: {
    eyebrow:  "Dining & Lifestyle",
    headline: "Food as a destination, not an afterthought.",
    body:
      "Dining at Mall of America extends the visit. Guests who eat on-site stay 40% longer and spend significantly more across all categories. Our culinary offer spans fast-casual to full-service, food halls to celebrity-chef concepts.",
    stats: [
      { num: "50+",  label: "Dining options"      },
      { num: "+40%", label: "Dwell time increase" },
      { num: "3hrs", label: "Avg. visit duration" },
    ],
    highlights: [
      {
        num:   "01",
        title: "Premium Food Hall",
        body:
          "A curated marketplace of 20+ concepts under one roof. Counter service meets editorial presentation.",
      },
      {
        num:   "02",
        title: "Full-Service Restaurants",
        body:
          "Sit-down experiences from regional favorites to nationally recognized dining brands.",
      },
      {
        num:   "03",
        title: "Celebrity Chef Concepts",
        body:
          "High-profile culinary names that draw destination diners and generate media coverage independently.",
      },
    ],
  },

  
  // ENTERTAINMENT
  
  entertainment: {
    eyebrow:  "Entertainment & Attractions",
    headline: "The only mall in America with a theme park inside.",
    body:
      "Nickelodeon Universe, SEA LIFE Aquarium, mini-golf, escape rooms, comedy clubs, cinema — attractions that drive repeat visits and extend dwell time in ways no retail mix alone ever could.",
    attractions: [
      {
        emoji: "🎢",
        title: "Nickelodeon Universe",
        body:  "7 acres, 30+ rides and attractions. The largest indoor theme park in America.",
        stat:  "7 Acres",
      },
      {
        emoji: "🦈",
        title: "SEA LIFE Aquarium",
        body:  "Walk-through tunnel, touch pools, 10,000+ sea creatures in a 1.2M gallon ocean.",
        stat:  "1.2M Gal",
      },
      {
        emoji: "⛳",
        title: "Mini Golf & Gaming",
        body:  "Themed mini-golf courses, arcade entertainment, and next-gen gaming experiences.",
        stat:  "4 Courses",
      },
      {
        emoji: "🎭",
        title: "Comedy & Cinema",
        body:  "Live comedy clubs, escape rooms, and a 14-screen cinema that keeps guests on-site.",
        stat:  "14 Screens",
      },
    ],
  },

  
  // EVENTS
  
  events: {
    eyebrow:         "The Events Platform",
    heroHeadline:    "400+ events per year. One platform.",
    sectionHeadline: "Book the stage that America watches.",
    body:
      "From intimate product launches to 10,000-person spectaculars — Mall of America's event infrastructure is purpose-built for brands and promoters who need reach, spectacle, and results.",
    venues: [
      {
        name:     "East Atrium",
        title:    "Grand Atrium",
        capacity: "10K",
        body:
          "The crown jewel. Soaring glass ceilings, natural daylight, and the iconic Nickelodeon Universe backdrop. Perfect for expositions, product launches, and mega-activations.",
        cta:      "Book This Venue",
        href:     "#contact",
      },
      {
        name:     "The Rotunda",
        title:    "Rotunda Stage",
        capacity: "5K",
        body:
          "High foot traffic, 360-degree audience sightlines, and a built-in audience of tens of thousands of daily visitors. Concerts, celebrity appearances, brand takeovers.",
        cta:      "Book This Venue",
        href:     "#contact",
      },
      {
        name:     "North Garden",
        title:    "North Garden Hall",
        capacity: "2.5K",
        body:
          "Intimate yet high-impact. Ideal for corporate events, press launches, private brand experiences, and premium hospitality. Full AV infrastructure and custom buildout.",
        cta:      "Book This Venue",
        href:     "#contact",
      },
    ],
    pastEvents: [
      {
        year:       "2024",
        name:       "Super Bowl LVIII Activation",
        attendance: "85,000+ attendees over 4 days",
      },
      {
        year:       "2024",
        name:       "Taylor Swift Fan Experience",
        attendance: "12,000 fans in attendance",
      },
      {
        year:       "2023",
        name:       "Barbie Movie World Tour",
        attendance: "Brand activation, 40M+ impressions",
      },
      {
        year:       "2023",
        name:       "Minnesota Vikings Draft Party",
        attendance: "8,500 fans, national broadcast",
      },
      {
        year:       "2022",
        name:       "BTS Army Fan Convention",
        attendance: "15,000 attendees, sold out",
      },
      {
        year:       "Annual",
        name:       "Holiday Spectacular",
        attendance: "8M+ visitors, Nov–Jan season",
      },
    ],
  },

  
  // SPONSORSHIP
  
  sponsorship: {
    eyebrow:       "Sponsorship & Brand Partners",
    headline:      "40 million impressions. One address.",
    body:
      "Mall of America is not just a place to shop — it's a media platform. 40 million visitors per year translates to unmatched brand exposure, measurable activation results, and a captive audience that is actively spending.",
    audienceTitle: "Your audience, concentrated.",
    cta:           "View Partnership Deck",
    href:          "#contact",
    tiers: [
      {
        rank:     "I",
        name:     "Presenting Partner",
        desc:     "Exclusive naming rights, digital dominance, full experiential access",
        price:    "$500K+",
        featured: true,
      },
      {
        rank:     "II",
        name:     "Premier Sponsor",
        desc:     "Category exclusivity, activation zones, digital placements",
        price:    "$250K+",
        featured: false,
      },
      {
        rank:     "III",
        name:     "Brand Partner",
        desc:     "Event co-branding, signage, audience data reporting",
        price:    "$100K+",
        featured: false,
      },
    ],
    audienceMetrics: [
      { num: "40M+", label: "Annual impressions"    },
      { num: "$87K", label: "Avg. household income" },
      { num: "34",   label: "Median visitor age"    },
      { num: "3hrs", label: "Average dwell time"    },
    ],
  },

  
  // CONTACT / CTA
  
  contact: {
    eyebrow:  "Get Started",
    headline: "Your brand. America's stage.",
    body:
      "Whether you're looking to open a location, launch a campaign, or book a venue — our commercial team is ready to build the opportunity for you. Every conversation starts with a single message.",
    paths: [
      {
        num:   "01",
        title: "Open a Location",
        body:
          "Flagship, mid-tier, F&B, entertainment, or pop-up. We have the space, the traffic, and the team to make your retail presence in America's destination a success.",
        cta:   "Explore Leasing",
        href:  "mailto:leasing@mallofamerica.com?subject=Leasing Inquiry",
      },
      {
        num:   "02",
        title: "Become a Sponsor",
        body:
          "40 million visitors. Premium demographics. Proven activation results. Mall of America offers brand partners an unmatched platform for reach, engagement, and conversion.",
        cta:   "View Partnerships",
        href:  "mailto:partnerships@mallofamerica.com?subject=Sponsorship Inquiry",
      },
      {
        num:   "03",
        title: "Book a Venue",
        body:
          "From 2,500-person private affairs to 10,000-person spectaculars — our event infrastructure is ready. Concerts, launches, conventions, activations. Every format. Every scale.",
        cta:   "Check Availability",
        href:  "mailto:events@mallofamerica.com?subject=Event Booking Inquiry",
      },
    ],
  },

  
  // NAV
  
  nav: [
    { id: "hero",          label: "Welcome",       num: "01" },
    { id: "why",           label: "Why Us",        num: "02" },
    { id: "retail",        label: "Retail",        num: "03" },
    { id: "luxury",        label: "Luxury",        num: "04" },
    { id: "dining",        label: "Dining",        num: "05" },
    { id: "entertainment", label: "Entertainment", num: "06" },
    { id: "events",        label: "Events",        num: "07" },
    { id: "sponsorship",   label: "Sponsorship",   num: "08" },
    { id: "contact",       label: "Get Started",   num: "09" },
  ],
} as const

export type Property = typeof PROPERTY
// Framer Motion variants — shared across all section components.
// Import the variant you need; pass to motion.* elements.

import type { Variants } from 'framer-motion'


// FADE UP  —  primary reveal for headings, paragraphs, cards

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}


// FADE IN  —  no movement, pure opacity (overlays, bg images)

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

// FADE LEFT  —  slides in from the right

export const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// FADE RIGHT  —  slides in from the left

export const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// SCALE IN  —  subtle zoom for cards, images, badges

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

 
// STAGGER CONTAINER  —  wrap a list; children animate in sequence

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}


// STAGGER CONTAINER FAST  —  tighter stagger for small items

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
}


// STAGGER CONTAINER SLOW  —  wider stagger for large sections

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
}


// WORD REVEAL  —  per-word hero headline animation

export const wordReveal: Variants = {
  hidden: {
    opacity: 0,
    y: '100%',
  },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}


// LINE REVEAL  —  for decorative lines / dividers

export const lineReveal: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}


// BAR FILL  —  for demographic / stat progress bars
// Usage: pass custom 'width' via style on the fill element,
// animate opacity + scaleX from hidden → visible

export const barFill: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}


// SHARED VIEWPORT CONFIG
// Pass to whileInView on every motion element for consistency

export const viewportConfig = {
  once: true,
  margin: '-80px',
} as const
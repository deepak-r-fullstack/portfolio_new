import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register once, import from here everywhere (keeps plugin setup in one place)
gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Media queries used with gsap.matchMedia() — DESIGN.md §5 */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const IS_PHONE = '(max-width: 767px)'

export { gsap, ScrollTrigger, useGSAP }

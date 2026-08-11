import type { Transition } from "motion/react";

/** Glimpse's premium motion language: calm, controlled, and free of default bounce. */
export const GLIMPSE_EASE = [0.4, 0, 0.2, 1] as const;

export const motionDuration = {
  quick: 0.14,
  standard: 0.28,
  slow: 0.48,
} as const;

export const motionTransition = {
  quick: {
    duration: motionDuration.quick,
    ease: GLIMPSE_EASE,
  } satisfies Transition,
  standard: {
    duration: motionDuration.standard,
    ease: GLIMPSE_EASE,
  } satisfies Transition,
  slow: {
    duration: motionDuration.slow,
    ease: GLIMPSE_EASE,
  } satisfies Transition,
} as const;

/** GSAP equivalents keep both animation engines visually consistent. */
export const gsapMotion = {
  ease: "power2.inOut",
  enterEase: "power2.out",
  exitEase: "power2.in",
  duration: motionDuration,
} as const;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

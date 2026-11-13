import React from "react";
import { SHOP } from "@kmartshop/api/data/shop";

/** Kmart wordmark: the yellow cart, a bold red K, "mart" and the tagline. Swap for the logo file when it arrives. */
export function Logo({ inverted = false, className = "" }: { inverted?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-label={SHOP.legalName}>
      <svg viewBox="0 0 40 40" aria-hidden className="w-10 h-10 shrink-0">
        <rect width="40" height="40" rx="11" className="fill-brand" />
        <path d="M8 11h4l3.2 13.5h14.3l2.5-9.5H14" fill="none" stroke="#FFB81C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="30" r="2.4" fill="#FFB81C" />
        <circle cx="27.5" cy="30" r="2.4" fill="#FFB81C" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-[24px] font-extrabold tracking-[-0.03em] ${inverted ? "text-white" : "text-brand"}`}>
          K<span className="italic font-bold">mart</span>
        </span>
        <span className={`block text-[11px] font-medium tracking-wide ${inverted ? "text-white/70" : "text-subtle"}`}>{SHOP.tagline}</span>
      </span>
    </span>
  );
}

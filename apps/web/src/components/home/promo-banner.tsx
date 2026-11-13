"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { FREE_DELIVERY_THRESHOLD } from "@kmartshop/api/pricing";
import { formatGHS } from "@/components/shop/money";

const SLIDES = [
  {
    image: "/images/hero-fresh.jpg",
    alt: "A shopper choosing fresh oranges in a supermarket",
    focus: "70% center",
    kicker: "Groceries & more",
    title: "Your weekly shop, without the queue",
    text: "Drinks, pantry staples, household essentials and homeware from Kmart, packed and ready for you.",
    cta: { label: "Start shopping", href: "/menu" },
  },
  {
    image: "/images/hero-produce.jpg",
    alt: "Tomatoes, green beans, peppers and greens at a market",
    focus: "50% center",
    kicker: "Kitchen staples",
    title: "Everything for jollof night",
    text: "Rice, oil, tomato paste, pepper and onions: the whole list in one basket.",
    cta: { label: "Shop the pantry", href: "/menu" },
  },
  {
    image: "/images/hero-delivery.jpg",
    alt: "A smiling delivery rider holding a box of fresh groceries",
    focus: "40% 30%",
    kicker: "Delivery around Adenta",
    title: `Free delivery over ${formatGHS(FREE_DELIVERY_THRESHOLD)}`,
    text: "Order online and we bring it to your door, or pick it up at your nearest Kmart.",
    cta: { label: "Order now", href: "/menu" },
  },
  {
    image: "/images/hero-home.jpg",
    alt: "Shelves of colourful mugs, plates and bowls",
    focus: "55% center",
    kicker: "Home & Kitchen",
    title: "Plates, storage and all things home",
    text: "Upstairs at Big Kmart: tableware, storage boxes, coolers and kitchen kit for every home.",
    cta: { label: "Shop home & kitchen", href: "/menu" },
  },
  {
    image: "/images/hero-cleaning.jpg",
    alt: "A row of bright cleaning and laundry bottles",
    focus: "60% center",
    kicker: "Household",
    title: "Stock up on the cleaning cupboard",
    text: "Washing powder, dishwashing liquid, bin bags and toilet roll, delivered with the rest of your shop.",
    cta: { label: "Shop household", href: "/menu" },
  },
];

const SLIDE_MS = 6000;

/** The big rotating banner beside two fixed offers, like a supermarket's front window. */
export function PromoBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduceMotion]);

  const slide = SLIDES[index]!;

  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6 grid lg:grid-cols-[2fr_1fr] gap-3 sm:gap-4">
      <div
        className="relative isolate overflow-hidden rounded-3xl bg-brand-deep text-white h-[360px] sm:h-[420px] lg:h-[460px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label="Kmart offers"
      >
        {SLIDES.map((s, i) => (
          <m.div
            key={s.image}
            aria-hidden={i !== index}
            className="absolute inset-0 -z-10"
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={s.image}
              alt={i === index ? s.alt : ""}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              sizes="(min-width: 1024px) 880px, 100vw"
              className="object-cover"
              style={{ objectPosition: s.focus }}
            />
          </m.div>
        ))}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t sm:bg-gradient-to-r from-night/90 via-night/55 to-transparent" />

        <div className="relative h-full flex flex-col justify-end sm:justify-center p-6 sm:p-10 lg:p-12 max-w-[560px] gap-3 sm:gap-4">
          <m.div key={index} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col gap-3 sm:gap-4">
            <span className="self-start rounded-full bg-gold text-ink px-3 py-1 text-xs sm:text-sm font-bold">{slide.kicker}</span>
            <h1 className="font-display font-extrabold text-[30px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.02em]">{slide.title}</h1>
            <p className="text-[15px] sm:text-lg text-white/85 max-w-[460px]">{slide.text}</p>
            <Link href={slide.cta.href as "/"} className="self-start mt-1 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold">
              {slide.cta.label} <ArrowRight className="w-4 h-4" />
            </Link>
          </m.div>
        </div>

        <div className="absolute bottom-4 right-5 flex gap-2" role="tablist" aria-label="Choose an offer">
          {SLIDES.map((s, i) => (
            <button
              key={s.image}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show offer ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${i === index ? "w-8 bg-gold" : "w-2.5 bg-white/60 hover:bg-white"}`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
        <SideOffer image="/images/tile-storage.jpg" title="Home & Kitchen" text="Storage, plates, coolers and more" href="/menu" tone="bg-leaf" />
        <SideOffer image="/images/tile-grains.jpg" title="Pantry staples" text="Rice, oil, tomato paste and more" href="/menu" tone="bg-brand" />
      </div>
    </section>
  );
}

function SideOffer({ image, title, text, href, tone }: { image: string; title: string; text: string; href: string; tone: string }) {
  return (
    <Link href={href as "/"} className="group relative isolate overflow-hidden rounded-3xl min-h-[170px] lg:min-h-0 text-white flex">
      <Image src={image} alt="" fill sizes="(min-width: 1024px) 420px, 50vw" className="object-cover -z-10 transition-transform duration-500 group-hover:scale-[1.03]" />
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night/85 via-night/35 to-transparent" />
      <span className="mt-auto p-4 sm:p-6">
        <span className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${tone}`}>Shop now</span>
        <span className="block mt-2 font-display text-xl sm:text-2xl font-extrabold leading-tight">{title}</span>
        <span className="block text-sm text-white/80">{text}</span>
      </span>
    </Link>
  );
}

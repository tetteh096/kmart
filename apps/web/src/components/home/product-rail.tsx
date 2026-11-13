"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { CategoryId, Product } from "@kmartshop/api/data/catalog";
import { ProductCard } from "@/components/shop/product-card";
import { useCart } from "@/components/shop/cart-context";

/** A titled row of products you swipe (phones) or page with arrows (desktop). */
export function ProductRail({ title, subtitle, products, category }: { title: string; subtitle?: string; products: Product[]; category?: CategoryId }) {
  const track = useRef<HTMLDivElement>(null);
  const { setSelectedCategory } = useCart();
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.85, behavior: "smooth" });

  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 mt-10 sm:mt-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-[-0.02em]">{title}</h2>
          {subtitle && <p className="mt-1 text-subtle">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/menu"
            onClick={() => setSelectedCategory(category ?? "all")}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline underline-offset-4 mr-1"
          >
            See all <ArrowRight className="w-4 h-4" />
          </Link>
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll back" className="hidden sm:flex w-10 h-10 rounded-full border border-line hover:border-ink items-center justify-center cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll on" className="hidden sm:flex w-10 h-10 rounded-full border border-line hover:border-ink items-center justify-center cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div
        ref={track}
        className="mt-5 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div key={p.id} className="snap-start shrink-0 w-[44%] sm:w-[30%] md:w-[23%] lg:w-[18.5%]">
            <ProductCard product={p} compact />
          </div>
        ))}
      </div>
    </section>
  );
}

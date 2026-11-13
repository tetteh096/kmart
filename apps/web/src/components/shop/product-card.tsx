"use client";

import React from "react";
import Link from "next/link";
import { Heart, MessageCircle, Minus, Plus } from "lucide-react";
import type { Product } from "@kmartshop/api/data/catalog";
import { MAX_QUANTITY_PER_ITEM } from "@kmartshop/api/pricing";
import { useBranch } from "../branch";
import { useCart } from "./cart-context";
import { ProductArt } from "./product-art";
import { formatGHS } from "./money";

const BADGE_STYLE: Record<NonNullable<Product["badge"]>, string> = {
  "Best seller": "bg-brand text-white",
  New: "bg-gold text-ink",
  Promo: "bg-leaf text-white",
};

export function whatsappOrderLink(whatsapp: string, product: Product) {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi Kmart, I'd like to order ${product.name}. What sizes and prices do you have?`)}`;
}

/**
 * A grocery tile: square picture, name, size, price, and "Add" that turns into a
 * − 1 + stepper once it's in the basket, so a whole shop can be done from the grid.
 */
export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { items, addToCart, updateQuantity, isInWishlist, toggleWishlist } = useCart();
  const { contact } = useBranch();
  const saved = isInWishlist(product.id);
  const href = `/menu/${product.id}` as "/";
  const line = items.find((item) => item.product.id === product.id);

  return (
    <article className="group relative flex flex-col rounded-2xl bg-card border border-line hover:border-brand/30 hover:shadow-[0_8px_20px_-14px_rgba(35,24,23,0.35)] transition-[border-color,box-shadow]">
      <Link href={href} aria-label={`View ${product.name}`} className="relative block aspect-square m-2 rounded-xl overflow-hidden bg-tint">
        <ProductArt
          product={product}
          sizes="(min-width: 1280px) 240px, (min-width: 768px) 25vw, 45vw"
          className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      {product.badge && (
        <span className={`absolute top-4 left-4 rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${BADGE_STYLE[product.badge]}`}>
          {product.badge}
        </span>
      )}
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-label={saved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
        aria-pressed={saved}
        className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-ink/60 hover:text-brand cursor-pointer"
      >
        <Heart className={`w-4 h-4 ${saved ? "fill-brand text-brand" : ""}`} strokeWidth={2} />
      </button>

      <div className="flex-1 flex flex-col px-3 pb-3">
        <p className="font-display text-lg font-bold text-ink">{product.askPrice ? "Ask for price" : formatGHS(product.price)}</p>
        <h3 className={`mt-0.5 font-medium leading-snug line-clamp-2 ${compact ? "text-sm" : "text-[15px]"}`}>
          <Link href={href} className="hover:text-brand">
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-[13px] text-subtle line-clamp-1">{product.notes}</p>

        <div className="mt-auto pt-3">
          {product.askPrice ? (
            <a
              href={whatsappOrderLink(contact.whatsapp, product)}
              target="_blank"
              rel="noreferrer"
              className="w-full h-10 rounded-full bg-brand-deep text-white hover:bg-night inline-flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
            </a>
          ) : !product.inStock ? (
            <span className="w-full h-10 rounded-full bg-tint text-subtle inline-flex items-center justify-center text-sm font-medium">Out of stock</span>
          ) : line ? (
            <div className="w-full h-10 rounded-full bg-brand text-white flex items-center justify-between px-1">
              <button
                type="button"
                onClick={() => updateQuantity(line.key, line.quantity - 1)}
                aria-label={`One fewer ${product.name}`}
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer"
              >
                <Minus className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <span className="font-semibold tabular-nums" aria-live="polite">
                {line.quantity} in basket
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(line.key, Math.min(MAX_QUANTITY_PER_ITEM, line.quantity + 1))}
                aria-label={`One more ${product.name}`}
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product)}
              aria-label={`Add ${product.name} to basket`}
              className="w-full h-10 rounded-full border-2 border-brand text-brand hover:bg-brand hover:text-white inline-flex items-center justify-center gap-1.5 text-sm font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" strokeWidth={3} /> Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

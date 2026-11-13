"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Apple, Baby, Camera, Clock, Coffee, Cookie, CookingPot, CupSoda, Croissant, Leaf, MapPin, Navigation, MessageCircle, Milk, Phone, ShieldCheck, Sparkles, SprayCan, Truck, Wallet, Wheat, type LucideIcon } from "lucide-react";
import { FOOD_CATEGORIES, FOOD_ITEMS, type CategoryId } from "@kmartshop/api/data/catalog";
import { FREE_DELIVERY_THRESHOLD } from "@kmartshop/api/pricing";
import { lowestDeliveryFee } from "@kmartshop/api/branch-menu";
import { BRANCHES, SHOP } from "@kmartshop/api/data/shop";
import { PromoBanner } from "@/components/home/promo-banner";
import { ProductRail } from "@/components/home/product-rail";
import { useCart } from "@/components/shop/cart-context";
import { formatGHS } from "@/components/shop/money";
import { useBranch } from "@/components/branch";

const AISLE_ICONS: Record<string, { icon: LucideIcon; bg: string }> = {
  produce: { icon: Apple, bg: "#E5F3E1" },
  pantry: { icon: Wheat, bg: "#FBEFD9" },
  drinks: { icon: CupSoda, bg: "#E1F0FA" },
  dairy: { icon: Milk, bg: "#EEF2F6" },
  bakery: { icon: Croissant, bg: "#FBE9D6" },
  snacks: { icon: Cookie, bg: "#FCEBD0" },
  household: { icon: SprayCan, bg: "#E3EEFA" },
  personal: { icon: Sparkles, bg: "#FCE4EA" },
  baby: { icon: Baby, bg: "#E6F0FB" },
  breakfast: { icon: Coffee, bg: "#F6E6D8" },
  home: { icon: CookingPot, bg: "#FDE3E0" },
};

const BEST_SELLERS = FOOD_ITEMS.filter((p) => p.badge);
const STAPLES = FOOD_ITEMS.filter((p) => p.category === "pantry" || p.category === "breakfast");
const HOME = FOOD_ITEMS.filter((p) => p.category === "home" || p.category === "household");

export default function HomePage() {
  const router = useRouter();
  const { setSelectedCategory, setSearchQuery } = useCart();
  const { branch, contact, setBranchId } = useBranch();
  const fromFee = lowestDeliveryFee(branch);

  const goToAisle = (id: CategoryId) => {
    setSearchQuery("");
    setSelectedCategory(id);
    router.push("/menu");
  };

  const promises = [
    { icon: Leaf, title: "Groceries & more", text: "Food, drinks and homeware" },
    { icon: Truck, title: fromFee !== null ? `Delivery from ${formatGHS(fromFee)}` : "Delivery", text: `Free over ${formatGHS(FREE_DELIVERY_THRESHOLD)}` },
    { icon: Wallet, title: "Pay your way", text: "MoMo, card or bank transfer" },
    { icon: ShieldCheck, title: "Fair prices", text: "The same as in our shops" },
  ];

  return (
    <div className="pb-20">
      <PromoBanner />

      {/* Promises */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 mt-4">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 rounded-3xl bg-tint p-3 sm:p-4">
          {promises.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3 rounded-2xl bg-white px-3 sm:px-4 py-3">
              <span className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm sm:text-[15px] font-semibold leading-tight">{title}</span>
                <span className="block text-xs sm:text-[13px] text-subtle leading-tight mt-0.5">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Shop by aisle */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 mt-10 sm:mt-14">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-[-0.02em]">Shop by aisle</h2>
        <div className="mt-5 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-3 sm:gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-11 lg:overflow-visible">
          {FOOD_CATEGORIES.map((c) => {
            const { icon: Icon, bg } = AISLE_ICONS[c.id] ?? { icon: Apple, bg: "#FFF3E6" };
            return (
              <button key={c.id} type="button" onClick={() => goToAisle(c.id)} className="group shrink-0 w-[92px] lg:w-auto flex flex-col items-center gap-2 cursor-pointer">
                <span className="w-[84px] h-[84px] lg:w-full lg:h-auto lg:aspect-square rounded-full flex items-center justify-center transition-transform group-hover:-translate-y-0.5" style={{ background: bg }}>
                  <Icon className="w-9 h-9 text-brand-deep" strokeWidth={1.6} />
                </span>
                <span className="text-[13px] sm:text-sm font-medium text-center leading-tight">{c.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      <ProductRail title="Best sellers" subtitle="What Adenta is buying this week" products={BEST_SELLERS} />
      <ProductRail title="Pantry & breakfast" subtitle="Rice, oil, cereal, cocoa drink and more" products={STAPLES} category="pantry" />

      {/* WhatsApp order banner */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 mt-10 sm:mt-14">
        <div className="relative isolate overflow-hidden rounded-3xl bg-brand text-white grid md:grid-cols-[1.2fr_1fr]">
          <div className="p-6 sm:p-10 flex flex-col gap-4 items-start">
            <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">Got a long list?</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight tracking-[-0.02em]">Send it on WhatsApp and we&apos;ll pack it for you</h2>
            <p className="text-white/85 max-w-md">Snap your shopping list, send it to {branch ? branch.name : "your nearest Kmart"}, and we&apos;ll call you with the total.</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hi Kmart, here's my shopping list:")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gold text-ink hover:bg-[#f5a800] font-semibold"
              >
                <MessageCircle className="w-5 h-5" /> Send my list
              </a>
              <a href={contact.telHref} className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/50 hover:bg-white hover:text-brand font-semibold transition-colors">
                <Phone className="w-5 h-5" /> {contact.phone}
              </a>
            </div>
          </div>
          <div className="relative min-h-[220px]">
            <Image src="/images/story-trolley.jpg" alt="A smiling shopper pushing a trolley full of groceries" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover object-[45%_center]" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-brand via-brand/10 to-transparent" />
          </div>
        </div>
      </section>

      <ProductRail title="Home, kitchen & cleaning" subtitle="Storage, coolers, plates and the cleaning cupboard" products={HOME} category="home" />

      {/* Visit Big Kmart */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 mt-10 sm:mt-14">
        <div className="rounded-3xl bg-brand-deep text-white overflow-hidden grid md:grid-cols-2">
          <div className="relative min-h-[240px] md:min-h-[340px]">
            <Image src="/images/kmart-storefront.jpg" alt="The red front of Big Kmart in Adenta, with groceries downstairs and homeware upstairs" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="p-6 sm:p-10 flex flex-col justify-center gap-4">
            <span className="self-start rounded-full bg-gold text-ink px-3 py-1 text-sm font-bold">Visit us</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] leading-tight">Two floors of groceries and more</h2>
            <p className="text-white/80">
              Groceries and drinks downstairs, homeware upstairs: storage, coolers, plastics and kitchen kit. Big Kmart is on Dodowa Road, next to the Puma fuel station in Adenta.
            </p>
            <ul className="flex flex-col gap-2 text-[15px] text-white/85">
              {SHOP.hours.map((h) => (
                <li key={h.days} className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" /> {h.days}: {h.time}
                </li>
              ))}
            </ul>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${BRANCHES[0]!.location.lat},${BRANCHES[0]!.location.lng}`}
              target="_blank"
              rel="noreferrer"
              className="self-start inline-flex items-center gap-2 h-12 px-6 rounded-full bg-brand hover:bg-brand-dark font-semibold"
            >
              <Navigation className="w-4 h-4" /> Get directions
            </a>
          </div>
        </div>
      </section>

      {/* Shops */}
      <section id="branches" className="max-w-[1320px] mx-auto px-4 sm:px-6 mt-10 sm:mt-14 scroll-mt-40">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-[-0.02em]">Our shops</h2>
        <p className="mt-1 text-subtle">Pick your shop and we&apos;ll pack and deliver from there.</p>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          {BRANCHES.map((b) => {
            const mine = branch?.id === b.id;
            return (
              <div key={b.id} className={`rounded-3xl border-2 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 ${mine ? "border-brand bg-tomato-soft/40" : "border-line bg-white"}`}>
                <span className="w-14 h-14 rounded-2xl bg-brand text-gold flex items-center justify-center shrink-0">
                  <MapPin className="w-7 h-7" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-xl font-bold">{b.name}</p>
                  <p className="text-sm text-subtle">{b.address}</p>
                  <a href={b.telHref} className="mt-1 inline-block font-semibold text-brand hover:underline underline-offset-4">
                    {b.phone}
                  </a>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setBranchId(b.id)}
                    className={`h-11 px-5 rounded-full text-sm font-semibold cursor-pointer ${mine ? "bg-brand text-white" : "bg-brand-deep text-white hover:bg-night"}`}
                  >
                    {mine ? "Your shop ✓" : "Shop here"}
                  </button>
                  <a href={`https://wa.me/${b.whatsapp}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${b.name}`} className="w-11 h-11 rounded-full border border-line hover:border-ink flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Instagram */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 mt-10 sm:mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-[-0.02em]">Follow Kmart</h2>
            <p className="mt-1 text-subtle">Offers, new stock and festive deals first on Instagram, Facebook and TikTok.</p>
          </div>
          <a href={SHOP.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-11 px-5 rounded-full border-2 border-brand text-brand hover:bg-brand hover:text-white font-semibold transition-colors">
            <Camera className="w-4 h-4" /> {SHOP.instagramHandle}
          </a>
        </div>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          {["/images/kmart-storefront.jpg", "/images/vibes-shelf.jpg", "/images/tile-storage.jpg", "/images/tile-tomatoes.jpg"].map((src) => (
            <a key={src} href={SHOP.instagram} target="_blank" rel="noreferrer" className="relative aspect-square rounded-2xl overflow-hidden group">
              <Image src={src} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

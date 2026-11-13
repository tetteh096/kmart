"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Phone, Search, ShoppingCart, Truck } from "lucide-react";
import { FOOD_CATEGORIES } from "@kmartshop/api/data/catalog";
import { FREE_DELIVERY_THRESHOLD } from "@kmartshop/api/pricing";
import { SHOP } from "@kmartshop/api/data/shop";
import UserMenu from "./user-menu";
import { useFeatures } from "./features";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { useCart } from "./shop/cart-context";
import { formatGHS } from "./shop/money";
import { BranchButton, useBranch } from "./branch";

const NAV_ITEMS = [
  { label: "Shop all", href: "/menu" },
  { label: "Our shops", href: "/#branches" },
  { label: "Contact", href: "/contact" },
];

/** Kept for components that import it; the header itself uses a cart. */
export function BagIcon({ className = "w-6 h-6" }: { className?: string }) {
  return <ShoppingCart className={className} strokeWidth={1.8} />;
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsCartOpen, totalItems, subtotal, wishlist, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useCart();
  const { contact } = useBranch();
  const { accountsEnabled } = useFeatures();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuFocusSearch, setMenuFocusSearch] = useState(false);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const openMobileMenu = (focusSearch: boolean) => {
    setMenuFocusSearch(focusSearch);
    setMobileMenuOpen(true);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedCategory("all");
    router.push("/menu");
  };

  const goToAisle = (id: (typeof FOOD_CATEGORIES)[number]["id"]) => {
    setSelectedCategory(id);
    setSearchQuery("");
    router.push("/menu");
  };

  const onShop = pathname.startsWith("/menu");

  return (
    <header id="top" className="sticky top-0 z-40 w-full bg-white shadow-[0_1px_0_0_var(--color-line)]">
      {/* Top bar */}
      <div className="hidden sm:block bg-brand text-white text-[13px]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-9 flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 truncate">
            <Truck className="w-4 h-4 shrink-0" />
            <span className="truncate">
              Delivery around Adenta · <strong className="font-semibold">free over {formatGHS(FREE_DELIVERY_THRESHOLD)}</strong>
            </span>
          </p>
          <span className="hidden sm:flex items-center gap-5 shrink-0">
            <Link href={"/#branches" as "/"} className="hover:underline underline-offset-2">Our shops</Link>
            <Link href={"/contact" as "/"} className="hover:underline underline-offset-2">Contact</Link>
            <a href={contact.telHref} className="flex items-center gap-1.5 font-semibold hover:underline underline-offset-2">
              <Phone className="w-3.5 h-3.5" /> {contact.phone}
            </a>
          </span>
        </div>
      </div>

      {/* Main row */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-14 sm:h-[68px] lg:h-[76px] flex items-center gap-2 sm:gap-3 lg:gap-6">
        <button
          type="button"
          onClick={() => openMobileMenu(false)}
          className="lg:hidden -ml-1.5 w-11 h-11 rounded-full hover:bg-tint flex items-center justify-center cursor-pointer"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="w-[22px] h-4">
            <path d="M0 1h22M0 8h22M0 15h22" />
          </svg>
        </button>

        <Link href="/" aria-label={`${SHOP.legalName} home`} className="shrink-0">
          <Logo />
        </Link>

        <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-[640px] mx-auto">
          <label className="flex-1 flex items-center h-12 rounded-l-full border-2 border-r-0 border-line focus-within:border-brand bg-tint/60 pl-4">
            <Search className="w-5 h-5 text-subtle shrink-0" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rice, oil, milk, soap…"
              aria-label="Search products"
              className="flex-1 min-w-0 bg-transparent px-3 text-[15px] placeholder:text-subtle/80 focus:outline-none"
            />
          </label>
          <button type="submit" className="h-12 px-6 rounded-r-full bg-brand hover:bg-brand-dark text-white font-semibold cursor-pointer">
            Search
          </button>
        </form>

        <div className="flex items-center gap-1 ml-auto md:ml-0 shrink-0">
          <span className="hidden xl:block mr-1">
            <BranchButton />
          </span>
          <Link href={"/wishlist" as "/"} aria-label={`Saved, ${wishlist.length}`} className="hidden sm:flex relative w-11 h-11 rounded-full hover:bg-tint items-center justify-center">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && <Badge n={wishlist.length} />}
          </Link>
          {accountsEnabled && (
            <div className="hidden sm:block">
              <UserMenu />
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Basket, ${totalItems} items`}
            className="relative ml-1 h-11 pl-3 pr-3 sm:pr-4 rounded-full bg-gold hover:bg-[#f5a800] text-ink flex items-center gap-2 font-semibold cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" strokeWidth={2} />
            <span className="hidden sm:inline tabular-nums">{formatGHS(subtotal)}</span>
            {totalItems > 0 && <Badge n={totalItems} dark />}
          </button>
        </div>
      </div>

      {/* Phones and small tablets: search and the shop, always in view */}
      <div className="md:hidden max-w-[1320px] mx-auto px-4 pb-2.5 flex items-center gap-2">
        <form onSubmit={submitSearch} className="flex-1 min-w-0">
          <label className="flex items-center h-11 rounded-full bg-tint border border-line focus-within:border-brand px-3.5">
            <Search className="w-[18px] h-[18px] text-subtle shrink-0" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search groceries"
              aria-label="Search products"
              enterKeyHint="search"
              className="flex-1 min-w-0 bg-transparent px-2.5 text-base placeholder:text-subtle/80 focus:outline-none"
            />
          </label>
        </form>
        <BranchButton className="shrink-0 max-w-[46%] h-11 min-h-11" />
      </div>

      {/* Aisles */}
      <nav aria-label="Aisles" className="hidden lg:block border-t border-line">
        <div className="max-w-[1320px] mx-auto px-6 h-12 flex items-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_ITEMS.slice(0, 1).map((item) => (
            <Link
              key={item.href}
              href={item.href as "/"}
              onClick={() => setSelectedCategory("all")}
              className={`h-9 px-4 rounded-full flex items-center shrink-0 whitespace-nowrap text-sm font-semibold ${onShop && selectedCategory === "all" ? "bg-brand text-white" : "hover:bg-tint"}`}
            >
              {item.label}
            </Link>
          ))}
          {FOOD_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => goToAisle(c.id)}
              className={`h-9 px-3 rounded-full shrink-0 text-sm font-medium whitespace-nowrap cursor-pointer ${
                onShop && selectedCategory === c.id ? "bg-brand text-white" : "hover:bg-tint"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </nav>

      <MobileMenu open={mobileMenuOpen} onClose={closeMobileMenu} items={NAV_ITEMS} focusSearch={menuFocusSearch} />
    </header>
  );
}

function Badge({ n, dark = false }: { n: number; dark?: boolean }) {
  return (
    <span
      className={`absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 rounded-full text-[11px] font-bold flex items-center justify-center ring-2 ring-white ${
        dark ? "bg-brand text-white" : "bg-brand text-white"
      }`}
    >
      {n}
    </span>
  );
}

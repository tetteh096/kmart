"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Select } from "@kmartshop/ui/components/select";
import { FOOD_CATEGORIES, FOOD_ITEMS, categoryName, type CategoryId } from "@kmartshop/api/data/catalog";
import { isAvailableAt } from "@kmartshop/api/branch-menu";
import { Breadcrumb } from "@/components/arrow-button";
import { ProductCard } from "@/components/shop/product-card";
import { useCart } from "@/components/shop/cart-context";
import { useBranch } from "@/components/branch";

const SORT_OPTIONS = {
  featured: "Popular first",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  name: "Name: A to Z",
} as const;
type SortKey = keyof typeof SORT_OPTIONS;
const SORT_SELECT_OPTIONS = (Object.keys(SORT_OPTIONS) as SortKey[]).map((value) => ({ value, label: SORT_OPTIONS[value] }));

const COUNTS = Object.fromEntries(FOOD_CATEGORIES.map((c) => [c.id, FOOD_ITEMS.filter((p) => p.category === c.id).length])) as Record<CategoryId, number>;

export default function ShopPage() {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useCart();
  const { branch, openPicker } = useBranch();
  const [sortBy, setSortBy] = useState<SortKey>("featured");
  const topRef = useRef<HTMLDivElement>(null);

  const q = searchQuery.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      FOOD_ITEMS.filter((p) => {
        if (!isAvailableAt(p, branch)) return false;
        if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
        if (!q) return true;
        return [p.name, p.notes, categoryName(p.category)].some((f) => f.toLowerCase().includes(q));
      }).sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return Number(Boolean(b.badge)) - Number(Boolean(a.badge));
      }),
    [q, branch, selectedCategory, sortBy]
  );

  // Arriving from an aisle link elsewhere: start at the products.
  useEffect(() => {
    if (selectedCategory !== "all") topRef.current?.scrollIntoView({ block: "start" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (id: CategoryId | "all") => {
    setSelectedCategory(id);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const aisle = FOOD_CATEGORIES.find((c) => c.id === selectedCategory);
  const title = q ? `Results for “${searchQuery.trim()}”` : (aisle?.name ?? "All groceries");

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-4 pb-24">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop" }, ...(aisle ? [{ label: aisle.name }] : [])]} />

      <div ref={topRef} className="scroll-mt-40 mt-4 grid lg:grid-cols-[240px_1fr] gap-6 lg:gap-8">
        {/* Aisles: a sidebar on desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-44 rounded-2xl border border-line bg-white p-2">
            <p className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-[0.12em] text-subtle">Aisles</p>
            <AisleButton active={selectedCategory === "all"} onClick={() => choose("all")} label="All groceries" count={FOOD_ITEMS.length} />
            {FOOD_CATEGORIES.map((c) => (
              <AisleButton key={c.id} active={selectedCategory === c.id} onClick={() => choose(c.id)} label={c.name} count={COUNTS[c.id]} />
            ))}
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-[28px] sm:text-4xl font-extrabold tracking-[-0.02em] leading-tight">{title}</h1>
              <p className="mt-1 text-subtle">
                {aisle?.blurb ?? "Everything Kmart stocks, ready to pack."} {branch ? `Shopping at ${branch.name}.` : ""}
                {!branch && (
                  <button type="button" onClick={openPicker} className="ml-1 font-semibold text-brand underline underline-offset-4 cursor-pointer">
                    Choose your shop
                  </button>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-subtle" />
              <Select aria-label="Sort by" value={sortBy} onValueChange={setSortBy} options={SORT_SELECT_OPTIONS} className="rounded-full" popupClassName="min-w-52" />
            </div>
          </div>

          {/* Phones: aisles as chips (search lives in the header) */}
          <div className="lg:hidden mt-3 -mx-4 px-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[{ id: "all" as const, name: "All" }, ...FOOD_CATEGORIES].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => choose(c.id)}
                aria-pressed={selectedCategory === c.id}
                className={`shrink-0 h-10 px-4 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${
                  selectedCategory === c.id ? "bg-brand text-white" : "bg-white border border-line"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          {q && (
            <p className="mt-4 text-sm text-subtle">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
              <button type="button" onClick={() => setSearchQuery("")} className="ml-3 font-semibold text-brand underline underline-offset-4 cursor-pointer">
                Clear search
              </button>
            </p>
          )}

          {filtered.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-line bg-white p-10 text-center">
              <p className="font-display text-2xl font-bold">We couldn&apos;t find that</p>
              <p className="mt-2 text-subtle">Try another word, or send your list on WhatsApp and we&apos;ll check the shelves.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-6 h-12 px-6 rounded-full bg-brand text-white font-semibold cursor-pointer"
              >
                Show all groceries
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AisleButton({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`w-full flex items-center justify-between h-11 px-3 rounded-xl text-[15px] cursor-pointer ${active ? "bg-brand text-white font-semibold" : "hover:bg-tint"}`}
    >
      {label}
      <span className={`text-xs ${active ? "text-white/80" : "text-subtle"}`}>{count}</span>
    </button>
  );
}

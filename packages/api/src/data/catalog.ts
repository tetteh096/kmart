// The catalogue lives in @kmartshop/api so the server prices orders from the same list the
// storefront shows. MOCK: these items and prices are placeholders until Kmart sends its
// product list. Every item is sold as listed (kind "food": no drink options).

/** Kept from the shared shop template; Kmart has no made-to-order drinks. */
export type DrinkCategoryId = never;
export type FoodCategoryId =
  | "drinks"
  | "pantry"
  | "breakfast"
  | "dairy"
  | "snacks"
  | "household"
  | "home"
  | "personal"
  | "baby"
  | "bakery";
export type CategoryId = DrinkCategoryId | FoodCategoryId;
export type MenuKind = "drink" | "food";

export interface Category {
  id: CategoryId;
  kind: MenuKind;
  name: string;
  blurb: string;
}

export type SizeId = "regular" | "large";
export type SweetnessId = "0" | "25" | "50" | "75" | "100";
export type IceId = "none" | "less" | "regular" | "hot";
export type ToppingId = "pearls" | "foam" | "pudding" | "lychee-jelly" | "popping-strawberry" | "popping-mango";

export interface Product {
  id: string;
  /** Drinks are made to order with size, sweetness, ice and toppings; food comes as listed. */
  kind: MenuKind;
  name: string;
  category: CategoryId;
  /** Price of a regular cup, including anything in `included`. */
  price: number;
  /** One line for cards. */
  notes: string;
  description: string;
  caffeine: "None" | "Low" | "Medium" | "High";
  /** Colour of the drink, used for the illustrated cup until there's a photo. */
  color: string;
  /** Toppings that come in the drink at no extra cost. */
  included?: ToppingId[];
  /** Fruit teas and slushies can't be served hot. */
  canBeHot: boolean;
  dairyFree?: boolean;
  badge?: "Best seller" | "New" | "Promo";
  inStock: boolean;
  /** Photo of the item; drinks without one show an illustrated cup. */
  image?: string;
  /** Price depends on pieces or options we don't have yet: shown, but ordered on WhatsApp. */
  askPrice?: boolean;
}

export interface DrinkOptions {
  size: SizeId;
  sweetness: SweetnessId;
  ice: IceId;
  toppings: ToppingId[];
}

export const CATEGORIES: Category[] = [
  { id: "drinks", kind: "food", name: "Drinks", blurb: "Water, soft drinks, juice and malt by the pack" },
  { id: "pantry", kind: "food", name: "Rice, Oil & Pantry", blurb: "The staples for every Ghanaian kitchen" },
  { id: "breakfast", kind: "food", name: "Breakfast", blurb: "Cereal, cocoa drink, tea and milk powder" },
  { id: "dairy", kind: "food", name: "Dairy & Eggs", blurb: "Milk, butter, yoghurt and eggs" },
  { id: "snacks", kind: "food", name: "Snacks", blurb: "Biscuits, chips and nuts" },
  { id: "household", kind: "food", name: "Household", blurb: "Cleaning, laundry and paper" },
  { id: "home", kind: "food", name: "Home & Kitchen", blurb: "Storage, tableware, coolers and kitchen kit" },
  { id: "personal", kind: "food", name: "Personal Care", blurb: "Soap, toothpaste and lotion" },
  { id: "baby", kind: "food", name: "Baby", blurb: "Diapers, wipes and baby food" },
  { id: "bakery", kind: "food", name: "Bread", blurb: "Sliced and tea bread" },
];

export const SIZES: { id: SizeId; name: string; extra: number }[] = [
  { id: "regular", name: "Regular", extra: 0 },
  { id: "large", name: "Large (700ml)", extra: 8 },
];

export const SWEETNESS: { id: SweetnessId; name: string }[] = [
  { id: "0", name: "0%" },
  { id: "25", name: "25%" },
  { id: "50", name: "50%" },
  { id: "75", name: "75%" },
  { id: "100", name: "100%" },
];

export const ICE: { id: IceId; name: string }[] = [
  { id: "none", name: "No ice" },
  { id: "less", name: "Less ice" },
  { id: "regular", name: "Regular ice" },
  { id: "hot", name: "Hot" },
];

// Placeholder toppings and prices until the shop confirms its list.
export const TOPPINGS: { id: ToppingId; name: string; price: number }[] = [
  { id: "pearls", name: "Brown sugar pearls", price: 6 },
  { id: "popping-strawberry", name: "Strawberry popping pearls", price: 7 },
  { id: "popping-mango", name: "Mango popping pearls", price: 7 },
  { id: "lychee-jelly", name: "Lychee jelly", price: 6 },
  { id: "foam", name: "Cheese foam", price: 8 },
  { id: "pudding", name: "Egg pudding", price: 7 },
];

export const MAX_TOPPINGS = 3;

/** Kmart doesn't sell made-to-order drinks; the shared template still expects the list. */
export const DRINKS: Product[] = [];

export const FOOD_ITEMS: Product[] = [
  { id: "water-12", kind: "food", name: "Bottled Water", category: "drinks", price: 30, notes: "12 × 500 ml", description: "Bottled Water, 12 × 500 ml.", caffeine: "None", color: "#7EC3E6", canBeHot: false, inStock: true, badge: "Best seller" },
  { id: "water-1500-6", kind: "food", name: "Bottled Water, large", category: "drinks", price: 32, notes: "6 × 1.5 L", description: "Bottled Water, large, 6 × 1.5 L.", caffeine: "None", color: "#8DCBEA", canBeHot: false, inStock: true },
  { id: "soft-drink-6", kind: "food", name: "Soft Drinks", category: "drinks", price: 42, notes: "6 × 350 ml, mixed flavours", description: "Soft Drinks, 6 × 350 ml, mixed flavours.", caffeine: "None", color: "#E04A3C", canBeHot: false, inStock: true },
  { id: "malt-6", kind: "food", name: "Malt Drink", category: "drinks", price: 48, notes: "6 × 330 ml", description: "Malt Drink, 6 × 330 ml.", caffeine: "None", color: "#7A4A2B", canBeHot: false, inStock: true, badge: "Best seller" },
  { id: "orange-juice-1l", kind: "food", name: "Orange Juice", category: "drinks", price: 28, notes: "1 litre", description: "Orange Juice, 1 litre.", caffeine: "None", color: "#F5A340", canBeHot: false, inStock: true },
  { id: "energy-drink-4", kind: "food", name: "Energy Drink", category: "drinks", price: 40, notes: "4 × 250 ml", description: "Energy Drink, 4 × 250 ml.", caffeine: "None", color: "#3E6FD8", canBeHot: false, inStock: true },
  { id: "long-grain-rice-5kg", kind: "food", name: "Long Grain Rice", category: "pantry", price: 145, notes: "5 kg bag", description: "Long Grain Rice, 5 kg bag.", caffeine: "None", color: "#E9DCC2", canBeHot: false, inStock: true, badge: "Best seller" },
  { id: "perfumed-rice-5kg", kind: "food", name: "Perfumed Rice", category: "pantry", price: 170, notes: "5 kg bag", description: "Perfumed Rice, 5 kg bag.", caffeine: "None", color: "#EFE4CF", canBeHot: false, inStock: true },
  { id: "vegetable-oil-1l", kind: "food", name: "Vegetable Oil", category: "pantry", price: 45, notes: "1 litre", description: "Vegetable Oil, 1 litre.", caffeine: "None", color: "#F2C14E", canBeHot: false, inStock: true },
  { id: "vegetable-oil-5l", kind: "food", name: "Vegetable Oil, family size", category: "pantry", price: 190, notes: "5 litres", description: "Vegetable Oil, family size, 5 litres.", caffeine: "None", color: "#F0B93A", canBeHot: false, inStock: true },
  { id: "tomato-paste", kind: "food", name: "Tomato Paste", category: "pantry", price: 12, notes: "400 g tin", description: "Tomato Paste, 400 g tin.", caffeine: "None", color: "#D3402F", canBeHot: false, inStock: true, badge: "Best seller" },
  { id: "spaghetti-500g", kind: "food", name: "Spaghetti", category: "pantry", price: 14, notes: "500 g pack", description: "Spaghetti, 500 g pack.", caffeine: "None", color: "#EED7A1", canBeHot: false, inStock: true },
  { id: "sugar-1kg", kind: "food", name: "White Sugar", category: "pantry", price: 22, notes: "1 kg", description: "White Sugar, 1 kg.", caffeine: "None", color: "#F3EEE6", canBeHot: false, inStock: true },
  { id: "gari-1kg", kind: "food", name: "Gari", category: "pantry", price: 16, notes: "1 kg, fine", description: "Gari, 1 kg, fine.", caffeine: "None", color: "#EFE2C0", canBeHot: false, inStock: true },
  { id: "sardines", kind: "food", name: "Sardines in Oil", category: "pantry", price: 15, notes: "125 g tin", description: "Sardines in Oil, 125 g tin.", caffeine: "None", color: "#9FB3C8", canBeHot: false, inStock: true },
  { id: "instant-noodles-5", kind: "food", name: "Instant Noodles", category: "pantry", price: 20, notes: "Pack of 5", description: "Instant Noodles, pack of 5.", caffeine: "None", color: "#F4C552", canBeHot: false, inStock: true },
  { id: "cornflakes-500g", kind: "food", name: "Corn Flakes", category: "breakfast", price: 45, notes: "500 g box", description: "Corn Flakes, 500 g box.", caffeine: "None", color: "#F1B245", canBeHot: false, inStock: true },
  { id: "cocoa-drink-400g", kind: "food", name: "Chocolate Drink Powder", category: "breakfast", price: 55, notes: "400 g tin", description: "Chocolate Drink Powder, 400 g tin.", caffeine: "None", color: "#7B4A2E", canBeHot: false, inStock: true, badge: "Best seller" },
  { id: "milk-powder-400g", kind: "food", name: "Milk Powder", category: "breakfast", price: 60, notes: "400 g tin", description: "Milk Powder, 400 g tin.", caffeine: "None", color: "#E8EEF4", canBeHot: false, inStock: true },
  { id: "tea-bags-50", kind: "food", name: "Black Tea", category: "breakfast", price: 18, notes: "50 tea bags", description: "Black Tea, 50 tea bags.", caffeine: "None", color: "#B4553A", canBeHot: false, inStock: true },
  { id: "oats-500g", kind: "food", name: "Rolled Oats", category: "breakfast", price: 30, notes: "500 g", description: "Rolled Oats, 500 g.", caffeine: "None", color: "#E4D2A8", canBeHot: false, inStock: true },
  { id: "fresh-milk-1l", kind: "food", name: "Fresh Milk", category: "dairy", price: 32, notes: "1 litre", description: "Fresh Milk, 1 litre.", caffeine: "None", color: "#E7EEF3", canBeHot: false, inStock: true },
  { id: "eggs-30", kind: "food", name: "Eggs", category: "dairy", price: 65, notes: "Crate of 30", description: "Eggs, crate of 30.", caffeine: "None", color: "#EBC99A", canBeHot: false, inStock: true, badge: "Best seller" },
  { id: "butter-250g", kind: "food", name: "Butter", category: "dairy", price: 35, notes: "250 g", description: "Butter, 250 g.", caffeine: "None", color: "#F6DC7A", canBeHot: false, inStock: true },
  { id: "yoghurt-500ml", kind: "food", name: "Yoghurt", category: "dairy", price: 25, notes: "500 ml, plain", description: "Yoghurt, 500 ml, plain.", caffeine: "None", color: "#F1EDE4", canBeHot: false, inStock: true },
  { id: "evaporated-milk-6", kind: "food", name: "Evaporated Milk", category: "dairy", price: 42, notes: "6 × 160 g tins", description: "Evaporated Milk, 6 × 160 g tins.", caffeine: "None", color: "#EEE6D4", canBeHot: false, inStock: true },
  { id: "biscuits", kind: "food", name: "Cream Biscuits", category: "snacks", price: 10, notes: "Family pack", description: "Cream Biscuits, family pack.", caffeine: "None", color: "#E8C07A", canBeHot: false, inStock: true },
  { id: "plantain-chips", kind: "food", name: "Plantain Chips", category: "snacks", price: 8, notes: "150 g", description: "Plantain Chips, 150 g.", caffeine: "None", color: "#F1C24B", canBeHot: false, inStock: true },
  { id: "groundnuts", kind: "food", name: "Roasted Groundnuts", category: "snacks", price: 10, notes: "250 g", description: "Roasted Groundnuts, 250 g.", caffeine: "None", color: "#C98A55", canBeHot: false, inStock: true },
  { id: "chocolate-bar", kind: "food", name: "Chocolate Bar", category: "snacks", price: 12, notes: "100 g", description: "Chocolate Bar, 100 g.", caffeine: "None", color: "#6B3E2A", canBeHot: false, inStock: true },
  { id: "washing-powder-1kg", kind: "food", name: "Washing Powder", category: "household", price: 40, notes: "1 kg", description: "Washing Powder, 1 kg.", caffeine: "None", color: "#6EA8DC", canBeHot: false, inStock: true, badge: "Best seller" },
  { id: "dish-soap", kind: "food", name: "Dishwashing Liquid", category: "household", price: 18, notes: "750 ml", description: "Dishwashing Liquid, 750 ml.", caffeine: "None", color: "#8CCB6A", canBeHot: false, inStock: true },
  { id: "toilet-roll-10", kind: "food", name: "Toilet Roll", category: "household", price: 45, notes: "Pack of 10", description: "Toilet Roll, pack of 10.", caffeine: "None", color: "#E9EEF3", canBeHot: false, inStock: true, badge: "Best seller" },
  { id: "bin-bags", kind: "food", name: "Bin Bags", category: "household", price: 15, notes: "Roll of 20", description: "Bin Bags, roll of 20.", caffeine: "None", color: "#555B66", canBeHot: false, inStock: true },
  { id: "bleach-1l", kind: "food", name: "Bleach", category: "household", price: 15, notes: "1 litre", description: "Bleach, 1 litre.", caffeine: "None", color: "#BFE3F2", canBeHot: false, inStock: true },
  { id: "insect-spray", kind: "food", name: "Insect Spray", category: "household", price: 35, notes: "300 ml", description: "Insect Spray, 300 ml.", caffeine: "None", color: "#7BBF6A", canBeHot: false, inStock: true },
  { id: "storage-box-30l", kind: "food", name: "Storage Box with Lid", category: "home", price: 85, notes: "30 litres, clear", description: "Storage Box with Lid, 30 litres, clear.", caffeine: "None", color: "#CFE3F1", canBeHot: false, inStock: true, badge: "New" },
  { id: "plastic-drawers-3", kind: "food", name: "Plastic Drawer Unit", category: "home", price: 320, notes: "3 drawers", description: "Plastic Drawer Unit, 3 drawers.", caffeine: "None", color: "#E6EEF4", canBeHot: false, inStock: true },
  { id: "cooler-box-25l", kind: "food", name: "Cooler Box", category: "home", price: 250, notes: "25 litres", description: "Cooler Box, 25 litres.", caffeine: "None", color: "#4F8FD1", canBeHot: false, inStock: true },
  { id: "bucket-20l", kind: "food", name: "Bucket with Handle", category: "home", price: 35, notes: "20 litres", description: "Bucket with Handle, 20 litres.", caffeine: "None", color: "#E2554A", canBeHot: false, inStock: true },
  { id: "dinner-plates-6", kind: "food", name: "Dinner Plates", category: "home", price: 120, notes: "Set of 6", description: "Dinner Plates, set of 6.", caffeine: "None", color: "#F1ECE4", canBeHot: false, inStock: true },
  { id: "food-flask", kind: "food", name: "Food Flask", category: "home", price: 150, notes: "2.5 litres, keeps food warm", description: "Food Flask, 2.5 litres, keeps food warm.", caffeine: "None", color: "#D9413A", canBeHot: false, inStock: true, badge: "New" },
  { id: "plastic-chair", kind: "food", name: "Plastic Chair", category: "home", price: 95, notes: "Stackable, white", description: "Plastic Chair, stackable, white.", caffeine: "None", color: "#F2F2F2", canBeHot: false, inStock: true },
  { id: "bar-soap-3", kind: "food", name: "Bar Soap", category: "personal", price: 18, notes: "Pack of 3", description: "Bar Soap, pack of 3.", caffeine: "None", color: "#F2A7B5", canBeHot: false, inStock: true },
  { id: "toothpaste", kind: "food", name: "Toothpaste", category: "personal", price: 15, notes: "150 g", description: "Toothpaste, 150 g.", caffeine: "None", color: "#8FD1E6", canBeHot: false, inStock: true },
  { id: "body-lotion", kind: "food", name: "Body Lotion", category: "personal", price: 38, notes: "400 ml", description: "Body Lotion, 400 ml.", caffeine: "None", color: "#F4D9C6", canBeHot: false, inStock: true },
  { id: "shower-gel", kind: "food", name: "Shower Gel", category: "personal", price: 30, notes: "500 ml", description: "Shower Gel, 500 ml.", caffeine: "None", color: "#B7A3D8", canBeHot: false, inStock: true },
  { id: "diapers", kind: "food", name: "Baby Diapers", category: "baby", price: 95, notes: "Pack of 40, size 3", description: "Baby Diapers, pack of 40, size 3.", caffeine: "None", color: "#B8D8F0", canBeHot: false, inStock: true },
  { id: "baby-wipes", kind: "food", name: "Baby Wipes", category: "baby", price: 20, notes: "Pack of 80", description: "Baby Wipes, pack of 80.", caffeine: "None", color: "#DDEBF5", canBeHot: false, inStock: true },
  { id: "baby-cereal", kind: "food", name: "Baby Cereal", category: "baby", price: 55, notes: "400 g, from 6 months", description: "Baby Cereal, 400 g, from 6 months.", caffeine: "None", color: "#F2D9A6", canBeHot: false, inStock: true },
  { id: "sliced-bread", kind: "food", name: "Sliced Bread", category: "bakery", price: 20, notes: "Large loaf", description: "Sliced Bread, large loaf.", caffeine: "None", color: "#E2B072", canBeHot: false, inStock: true },
  { id: "tea-bread", kind: "food", name: "Tea Bread", category: "bakery", price: 15, notes: "Soft and sweet", description: "Tea Bread, soft and sweet.", caffeine: "None", color: "#E8BE7E", canBeHot: false, inStock: true },
];

/** Everything on the menu, drinks first. */
export const PRODUCTS: Product[] = [...DRINKS, ...FOOD_ITEMS];

export const DRINK_CATEGORIES = CATEGORIES.filter((c) => c.kind === "drink");
export const FOOD_CATEGORIES = CATEGORIES.filter((c) => c.kind === "food");

export function findProduct(id: string) {
  return PRODUCTS.find((product) => product.id === id);
}

export function categoryName(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)?.name ?? id;
}

export function toppingName(id: ToppingId) {
  return TOPPINGS.find((t) => t.id === id)?.name ?? id;
}

/** Food has no options; its lines carry this fixed set so the bag and orders stay one shape. */
export const FOOD_OPTIONS: DrinkOptions = { size: "regular", sweetness: "50", ice: "regular", toppings: [] };

/** What an item comes with if the customer doesn't change anything. */
export function defaultOptions(product: Product): DrinkOptions {
  if (product.kind === "food") return { ...FOOD_OPTIONS };
  return { size: "regular", sweetness: "50", ice: "less", toppings: [...(product.included ?? [])] };
}

/** Why a set of options can't be ordered, or null when it can. Shared by browser and server. */
export function optionsProblem(product: Product, options: DrinkOptions): string | null {
  if (product.askPrice) return "price depends on your choice, so order it on WhatsApp";
  if (product.kind === "food") {
    const o = options;
    const plain = o.size === "regular" && o.sweetness === FOOD_OPTIONS.sweetness && o.ice === FOOD_OPTIONS.ice && o.toppings.length === 0;
    return plain ? null : "food comes as listed";
  }
  if (!SIZES.some((s) => s.id === options.size)) return "Choose a size";
  if (!SWEETNESS.some((s) => s.id === options.sweetness)) return "Choose a sweetness";
  if (!ICE.some((i) => i.id === options.ice)) return "Choose how much ice";
  if (options.ice === "hot" && !product.canBeHot) return `${product.name} can't be served hot`;
  if (new Set(options.toppings).size !== options.toppings.length) return "A topping is listed twice";
  if (options.toppings.some((t) => !TOPPINGS.some((x) => x.id === t))) return "One of those toppings isn't on the menu";
  const extras = options.toppings.filter((t) => !product.included?.includes(t));
  if (extras.length > MAX_TOPPINGS) return `Up to ${MAX_TOPPINGS} extra toppings per drink`;
  return null;
}

/** Price of one cup with these options: base, plus size, plus any toppings it doesn't already include. */
export function unitPrice(product: Product, options: DrinkOptions) {
  if (product.kind === "food") return product.price;
  const size = SIZES.find((s) => s.id === options.size)?.extra ?? 0;
  const toppings = options.toppings
    .filter((t) => !product.included?.includes(t))
    .reduce((sum, t) => sum + (TOPPINGS.find((x) => x.id === t)?.price ?? 0), 0);
  return product.price + size + toppings;
}

/** Toppings in menu order, so the same choices always make the same cart line. */
export function normaliseOptions(options: DrinkOptions): DrinkOptions {
  const order = TOPPINGS.map((t) => t.id);
  return { ...options, toppings: [...options.toppings].sort((a, b) => order.indexOf(a) - order.indexOf(b)) };
}

/** "Large · 50% sweet · Less ice · Brown sugar pearls" */
export function describeOptions(options: DrinkOptions, product?: Product) {
  if (product?.kind === "food") return "";
  const size = SIZES.find((s) => s.id === options.size)?.name;
  const ice = ICE.find((i) => i.id === options.ice)?.name;
  const parts = [size, `${options.sweetness}% sweet`, ice, ...options.toppings.map(toppingName)];
  return parts.filter(Boolean).join(" · ");
}

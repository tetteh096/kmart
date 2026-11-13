// Everything that names or describes the business lives here, so rebranding is one file.
// Shop names and numbers are from Kmart Groceries' Instagram and posters (Nov 2026).
// Addresses for Rowi, email and opening hours are still placeholders.

export interface BranchDelivery {
  enabled: boolean;
  /** Cedis charged for any delivery, before distance. */
  baseFee: number;
  /** Cedis per kilometre of road from the branch. */
  perKm: number;
  /** Furthest the branch delivers, in road kilometres. */
  maxKm: number;
}

export interface Branch {
  id: string;
  /** Short name customers use: "East Legon". */
  name: string;
  address: string;
  phone: string;
  telHref: string;
  /** International format without "+", for wa.me links. */
  whatsapp: string;
  mapQuery: string;
  /** Where the shop is; delivery is priced by distance from here. */
  location: { lat: number; lng: number };
  /** False while the branch isn't taking online orders (closed, or busy). */
  orderingOpen: boolean;
  closedMessage?: string;
  delivery: BranchDelivery;
  /** "full": the whole range. "bites": a smaller shop (kept from the shared template). */
  kitchen: "full" | "bites";
}

function branch(
  id: string,
  name: string,
  address: string,
  phone: string,
  mapQuery: string,
  rest: Pick<Branch, "location" | "delivery" | "kitchen"> & Partial<Pick<Branch, "orderingOpen" | "closedMessage">>
): Branch {
  const local = phone.replace(/\s/g, "");
  const intl = `233${local.replace(/^0/, "")}`;
  return { id, name, address, phone, telHref: `tel:+${intl}`, whatsapp: intl, mapQuery, orderingOpen: true, ...rest };
}

/*
 * MOCK branch settings, until the shop confirms them: pin locations are approximate (the
 * Rowi shop's address isn't known yet), and delivery prices and ranges are placeholders.
 * Set `orderingOpen: false` on a branch to see how the site behaves when it isn't taking orders.
 */
export const BRANCHES: Branch[] = [
  branch("big-kmart", "Big Kmart (Puma)", "Dodowa Road, next to the Puma fuel station, Adenta", "0530 466 020", "Puma fuel station Dodowa Road Adenta", {
    location: { lat: 5.7095, lng: -0.1676 },
    delivery: { enabled: true, baseFee: 10, perKm: 3, maxKm: 12 },
    kitchen: "full",
  }),
  branch("rowi", "Kmart Rowi", "Rowi shop (address to confirm)", "0240 705 538", "Adenta Accra", {
    location: { lat: 5.7186, lng: -0.1578 },
    delivery: { enabled: true, baseFee: 10, perKm: 3, maxKm: 10 },
    kitchen: "full",
  }),
];

/** Used where no branch has been chosen yet. */
const MAIN = BRANCHES[0]!;

export const SHOP = {
  name: "Kmart",
  tagline: "Groceries & more",
  legalName: "Kmart Groceries",
  description:
    "Groceries, drinks, household essentials and homeware, at fair prices. Shop online for pickup or delivery around Adenta.",
  phone: MAIN.phone,
  telHref: MAIN.telHref,
  whatsapp: MAIN.whatsapp,
  /** Also on Kmart's posters. */
  otherPhone: "0558 525 681",
  instagram: "https://www.instagram.com/kmartgroceries/",
  instagramHandle: "@kmartgroceries",
  facebook: "https://www.facebook.com/k-martgroceries",
  email: "hello@example.com",
  address: `${BRANCHES.length} shops in Adenta`,
  ghanaPostGps: "",
  hours: [
    { days: "Monday – Saturday", time: "8:00 AM – 9:00 PM" },
    { days: "Sunday", time: "10:00 AM – 6:00 PM" },
  ],
  /** Roughly how long a pickup order takes to pack. */
  pickupMinutes: 30,
  mapQuery: MAIN.mapQuery,
} as const;

export function findBranch(id: string | null | undefined) {
  return BRANCHES.find((b) => b.id === id);
}


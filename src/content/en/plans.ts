import type { Plan, comparison as comparisonIt, generalFaq as generalFaqIt } from "../plans";

/* Piani, confronto e domande frequenti in inglese. I prezzi stanno in src/config/prezzi.ts; le condizioni sono le stesse dell'italiano. */
export const plans: Plan[] = [
  {
    id: "base",
    name: "Base",
    desc: "For a digital menu done properly.",
    highlights: ["QR code digital menu", "AI menu import", "Opening hours, holidays and closures", "Your logo and colours", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    desc: "For venues doing takeaway and taking bookings.",
    popular: true,
    highlights: ["Everything in Base", "WhatsApp orders", "Bookings and floor plan", "Menu translated into 4 languages", "Voice assistant on Telegram"],
  },
  {
    id: "premium",
    name: "Premium",
    desc: "For bringing customers back, automatically.",
    highlights: ["Everything in Pro", "Customer profiles", "WhatsApp automations", "Messages to customer groups", "Your own domain"],
  },
];

export const comparison: typeof comparisonIt = [
  {
    group: "Menu",
    rows: [
      { label: "QR code digital menu", base: true, pro: true, premium: true },
      { label: "AI import from photos and PDFs", base: true, pro: true, premium: true },
      { label: "Allergens, options and extras", base: true, pro: true, premium: true },
      { label: "Sold-out dishes in one tap", base: true, pro: true, premium: true },
      { label: "Translations into English, French, German and Spanish", base: false, pro: true, premium: true },
      { label: "Timed menus", base: false, pro: true, premium: true },
      { label: "Your own domain", base: false, pro: false, premium: true },
    ],
  },
  {
    group: "Bookings and floor",
    rows: [
      { label: "Opening hours, holidays and closures", base: true, pro: true, premium: true },
      { label: "Online bookings with no commission", base: false, pro: true, premium: true },
      { label: "Floor plan and tables", base: false, pro: true, premium: true },
      { label: "High chairs and waiting list", base: false, pro: true, premium: true },
    ],
  },
  {
    group: "Sales and customers",
    rows: [
      { label: "Takeaway orders on WhatsApp", base: false, pro: true, premium: true },
      { label: "Commission on orders", base: "0%", pro: "0%", premium: "0%" },
      { label: "Customer profiles", base: false, pro: false, premium: true },
      { label: "Reminders, reviews and birthday wishes on WhatsApp", base: false, pro: false, premium: true },
      { label: "Messages to customer groups", base: false, pro: false, premium: true },
    ],
  },
  {
    group: "Management",
    rows: [
      { label: "Analytics", base: "Basic", pro: "Full", premium: "Full" },
      { label: "Voice assistant on Telegram", base: false, pro: true, premium: true },
      { label: "Supplier order list", base: false, pro: true, premium: true },
      { label: "Staff logins", base: "1", pro: "3", premium: "Unlimited" },
      { label: "Staff rotas", base: false, pro: false, premium: true },
      { label: "Support", base: "By email", pro: "Email and WhatsApp", premium: "Priority" },
    ],
  },
];

export const generalFaq: typeof generalFaqIt = [
  { q: "Do I have to change my venue's WhatsApp number?", a: "No. You use the number you already have and keep replying from the WhatsApp Business app on your phone." },
  { q: "How long does it take to get started?", a: "With the photo import your menu is ready in a few minutes. Logo, colours and opening hours take an afternoon, and if you like we do it together during the demo." },
  { q: "Do you take a percentage of orders or bookings?", a: "No. You only pay the subscription. Some WhatsApp messages have a cost set by Meta, of a few cents, which you always see in the dashboard." },
  { q: "Is there a minimum term?", a: "No. On the monthly plan you can cancel whenever you like, from the dashboard. The subscription stays active until the end of the period you have already paid for." },
  { q: "How does the free trial work?", a: "14 days free with the plan you choose, or Pro if you don't choose one. No card needed." },
  { q: "Does it also work for a fresh pasta shop, a café or a deli?", a: "Yes. It works for any food and drink business: those with tables, and those selling takeaway, by weight or to order." },
  { q: "Where is my data kept?", a: "On servers in Europe. Your customers' data is yours: you can export it whenever you like." },
];

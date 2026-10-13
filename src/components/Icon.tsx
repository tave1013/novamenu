const paths = {
  camera: "M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 1 0 0-8a4 4 0 1 0 0 8z",
  video: "M3 7h12v10H3zM15 10.5l6-3.5v10l-6-3.5",
  image: "M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M9 10a1.5 1.5 0 1 0 0-3a1.5 1.5 0 1 0 0 3z",
  qr: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2M18 14h2v2M14 18h2v2M18 20h2",
  sparkle: "M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8zM19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z",
  globe: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18",
  clock: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 7v5l3 2",
  calendarCheck: "M4 5h16v16H4zM16 3v4M8 3v4M4 10h16M9 15l2 2 4-4",
  calendarX: "M4 5h16v16H4zM16 3v4M8 3v4M4 10h16M10 14l4 4M14 14l-4 4",
  tables: "M4 4h7v7H4zM15 7.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0zM13 15h7v5h-7zM4 17.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0z",
  bag: "M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2",
  users: "M9 11a3.5 3.5 0 1 0 0-7a3.5 3.5 0 1 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18.5 14a6 6 0 0 1 3 6",
  chat: "M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.6A8 8 0 1 1 21 12zM8 12h.01M12 12h.01M16 12h.01",
  chart: "M4 20V10M10 20V4M16 20v-7M2 20h20",
  badge: "M8 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0zM4 21a8 8 0 0 1 16 0",
  mic: "M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3",
  pizza: "M12 3l9 17H3zM10 12h.01M14 15h.01M11 17h.01",
  fork: "M7 3v8a2 2 0 0 0 2 2v8M5 3v5M9 3v5M17 3c-2 2-2 6 0 8v10",
  beer: "M6 8h10v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM16 11h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2M6 8a3 3 0 0 1 5-2.2A3 3 0 0 1 16 8",
  coffee: "M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v2M12 3v2",
  icecream: "M7 10a5 5 0 0 1 10 0zM7 10l5 11 5-11",
  wheat: "M12 21V9M12 9c-3 0-4-3-4-6c3 0 4 3 4 6zM12 9c3 0 4-3 4-6c-3 0-4 3-4 6zM12 15c-3 0-5-2-5-5c3 0 5 2 5 5zM12 15c3 0 5-2 5-5c-3 0-5 2-5 5z",
  bread: "M4 14a8 6 0 0 1 16 0v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM9 10l1 3M14 10l-1 3",
  scissors: "M3 6a3 3 0 1 0 6 0a3 3 0 1 0-6 0zM3 18a3 3 0 1 0 6 0a3 3 0 1 0-6 0zM8.6 7.6L20 18M8.6 16.4L20 6",
  flower: "M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2",
  check: "M5 12.5l4.5 4.5L19 7.5",
  x: "M6 6l12 12M18 6L6 18",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 6l-6 6 6 6",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 6l6 6-6 6",
  chevronLeft: "M15 6l-6 6 6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 7.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z",
  star: "M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z",
  shield: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 1 2-2h13",
  send: "M21 3L3 10.5l7 2.5 2.5 7zM10 13l11-10",
  search: "M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14zM20 20l-4-4",
  home: "M4 11l8-7 8 7v9H4zM10 20v-5h4v5",
  settings: "M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 13.7H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
  play: "M7 4l13 8-13 8z",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
  euro: "M17 6.5A7 7 0 0 0 6.5 12 7 7 0 0 0 17 17.5M4 10h9M4 14h9",
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  size = 20,
  stroke = 1.8,
  className,
  title,
}: {
  name: IconName;
  size?: number;
  stroke?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path d={paths[name]} />
    </svg>
  );
}

export const toneClass: Record<string, { bg: string; ink: string }> = {
  green: { bg: "bg-p-green", ink: "text-p-green-ink" },
  blue: { bg: "bg-p-blue", ink: "text-p-blue-ink" },
  pink: { bg: "bg-p-pink", ink: "text-p-pink-ink" },
  amber: { bg: "bg-p-amber", ink: "text-p-amber-ink" },
  violet: { bg: "bg-p-violet", ink: "text-p-violet-ink" },
  orange: { bg: "bg-p-orange", ink: "text-p-orange-ink" },
  red: { bg: "bg-p-red", ink: "text-p-red-ink" },
  grey: { bg: "bg-[#ebebef]", ink: "text-text" },
};

export function IconTile({
  name,
  tone,
  size = 40,
  radius = 12,
}: {
  name: IconName;
  tone: string;
  size?: number;
  radius?: number;
}) {
  const t = toneClass[tone] ?? toneClass.grey;
  return (
    <span
      className={`inline-flex flex-none items-center justify-center ${t.bg} ${t.ink}`}
      style={{ width: size, height: size, borderRadius: radius }}
    >
      <Icon name={name} size={Math.round(size * 0.5)} />
    </span>
  );
}

import type { Sector } from "../sectors";

/* Contenuti in inglese: stessa forma del file italiano, generati a partire da quello. */
export const sectors: Omit<Sector, "slug">[] = [
  {
    id: "pizzerie",
    name: "Pizzerias",
    short: "Takeaway and full evenings",
    icon: "pizza",
    tone: "red",
    seo: {
      title: "Pizzeria digital menu and takeaway ordering",
      description:
        "A pizzeria digital menu with takeaway orders on WhatsApp: collection slots, sold-out pizzas hidden at once, tables booked. Zero commission. Try it free.",
    },
    hero: {
      title: "More takeaway pizzas, fewer phone calls.",
      hl: "fewer phone calls",
      lead: "NovaMenu is the digital menu for pizzerias that takes takeaway orders for you: they arrive in writing on WhatsApp, with the collection time. Bookings are confirmed in one tap, and when the buffalo mozzarella runs out you remove it in a second.",
    },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Pizzeria da Mario",
        status: "Takeaway open until 22:30",
        tabs: ["Red", "White", "Fried", "Drinks"],
        items: [
          { name: "Margherita", desc: "Tomato, fior di latte, basil", price: "7,00", c: "#fde68a" },
          { name: "Bufala", desc: "Tomato, PDO buffalo mozzarella, basil", price: "9,50", out: true, c: "#fecaca" },
          { name: "Diavola", desc: "Spicy salami, fior di latte", price: "8,50", tag: "Spicy", c: "#fca5a5" },
          { name: "Wholemeal dough", desc: "On any pizza", price: "+1,00", c: "#e7d5b5" },
        ],
      },
      floats: [
        { icon: "bag", t: "New takeaway order", d: "Collection 19:45, 3 pizzas" },
        { icon: "clock", t: "The 20:00 slot is full", d: "Customers see the next ones" },
      ],
    },
    showcase: [
      {
        tag: "Collection slots",
        title: "The oven never gets swamped: every slot has its limit.",
        text: "You decide how many orders to accept every quarter of an hour. When a slot is full the customer only sees the free ones, and you don't have to call anyone back to move their collection.",
        points: ["An order limit per slot", "Pause orders in one tap", "Different hours at the weekend"],
        art: {
          kind: "slots",
          title: "Choose when to collect",
          days: [{ d: "Fri", n: "17" }, { d: "Sat", n: "18" }, { d: "Sun", n: "19" }],
          slots: [
            { t: "19:00", s: "free" }, { t: "19:15", s: "few" }, { t: "19:30", s: "full" },
            { t: "19:45", s: "sel" }, { t: "20:00", s: "full" }, { t: "20:15", s: "free" },
          ],
          note: "Collection Saturday at 19:45",
        },
      },
      {
        tag: "Order on WhatsApp",
        title: "The order arrives in writing, with options and total.",
        text: "No orders dictated in the middle of service and no wrong names on a scrap of paper. The order arrives with options, notes and total, and the pizza chef reads it already in order of collection.",
        points: ["Options and extras with their own price", "Customer notes highlighted", "0% commission"],
        art: {
          kind: "order",
          who: "Luca Bianchi",
          lines: ["2 × Margherita", "1 × Diavola, wholemeal dough", "1 × Chips"],
          total: "£ 27,50",
          when: "Collection Saturday 19:45",
          extra: "Note: cut into slices, thanks",
        },
      },
    ],
    day: [
      { time: "17:30", text: "The first orders for 19:30 come in, already written and in order of collection." },
      { time: "19:45", text: "The buffalo mozzarella runs out: you mark it sold out from your phone and it disappears from the menu." },
      { time: "20:30", text: "Oven full: you pause orders for half an hour with one tap." },
      { time: "Sunday", text: "The pizza-of-the-month message goes out to your regulars." },
    ],
    uses: [
      { feature: "ordini-whatsapp", text: "Takeaway with collection slots and an order limit per slot, so the oven never gets swamped." },
      { feature: "menu-digitale", text: "Pizzas with options, special doughs and paid extras." },
      { feature: "prenotazioni", text: "Weekend tables confirmed without phone calls, high chairs included." },
      { feature: "assistente", text: "\"Bufala's finished\", said out loud while you stretch the dough." },
    ],
    faq: [
      { q: "Can I manage different doughs and extras?", a: "Yes, you can manage different doughs and extras: every pizza can have options (dough, size) and extras with their own price." },
      { q: "How many orders can I take per slot?", a: "You decide how many orders to take for each collection slot. When a slot is full, the customer only sees the following ones." },
    ],
  },
  {
    id: "ristoranti",
    name: "Restaurants and trattorias",
    short: "Dining room, bookings, tourists",
    icon: "fork",
    tone: "blue",
    seo: {
      title: "Restaurant software: bookings and floor plan",
      description:
        "Restaurant management software: online bookings with no commission, a floor plan of your dining room and a digital menu translated for tourists. Try it free.",
    },
    hero: {
      title: "A full dining room. Even on a Tuesday.",
      hl: "Even on a Tuesday",
      lead: "NovaMenu is the management software for restaurants and trattorias that brings bookings, dining room and menu together. No per-cover commission, the menu in tourists' own language and a reminder that reduces empty tables.",
    },
    photo: { src: "/images/settori/ristorante.webp", alt: "A waiter serving a dish to a guest in an elegant, warmly lit dining room", caption: "A full dining room, a calm service.", pos: "50% 40%", layout: "center" },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Trattoria del Borgo",
        status: "Kitchen open 12:00 to 14:30, 19:00 to 22:30",
        tabs: ["Starters", "Pasta", "Mains", "Desserts"],
        items: [
          { name: "Tajarin al ragù", desc: "Hand-rolled egg pasta", price: "12,00", c: "#fde68a" },
          { name: "Agnolotti del plin", desc: "With roast meat jus", price: "13,00", tag: "House special", c: "#fed7aa" },
          { name: "Brasato al Barolo", desc: "With soft polenta", price: "18,00", c: "#d6b8a8" },
          { name: "Tasting menu", desc: "5 courses, wine not included", price: "45,00", c: "#e0e7ff" },
        ],
      },
      floats: [
        { icon: "calendarCheck", t: "Booking confirmed", d: "Saturday 20:30, 4 people" },
        { icon: "globe", t: "Menu read in English", d: "12 times tonight" },
      ],
    },
    showcase: [
      {
        tag: "Bookings",
        title: "You see the evening in the morning, cover by cover.",
        text: "Bookings come in from your website and from Google, within the covers you decide. Allergies and high chairs are written next to the name.",
        points: ["Maximum covers per sitting", "Reminder the day before", "No commission per booking"],
        art: {
          kind: "booking",
          title: "Saturday evening",
          sub: "20:00 sitting",
          used: 62,
          total: 80,
          list: [
            { name: "Rossi family", n: 6, time: "20:00", note: "High chair" },
            { name: "Marco and Giulia", n: 2, time: "20:15", note: "Anniversary" },
            { name: "Anna Ferrero", n: 4, time: "20:30", note: "Coeliac" },
          ],
        },
      },
      {
        tag: "Tourists",
        title: "The traditional dish stays in Italian. The explanation doesn't.",
        text: "The menu opens in the phone's language. The name of the dish stays the real one, and underneath there's a clear explanation for visitors.",
        points: ["English, French, German and Spanish", "Allergens translated correctly", "Edit by hand whenever you like"],
        art: {
          kind: "langs",
          dish: "Agnolotti del plin",
          lines: [
            { flag: "🇬🇧", text: "Small pinched ravioli filled with roast meat" },
            { flag: "🇩🇪", text: "Kleine Ravioli mit Bratenfüllung" },
            { flag: "🇫🇷", text: "Petits raviolis farcis à la viande rôtie" },
          ],
        },
      },
    ],
    day: [
      { time: "10:00", text: "You check the evening's bookings: they're already confirmed." },
      { time: "12:00", text: "The lunch menu switches on by itself." },
      { time: "20:15", text: "A couple without a booking: the floor plan tells you where to seat them." },
      { time: "The next day", text: "The request for a Google review goes out." },
    ],
    uses: [
      { feature: "prenotazioni", text: "Sittings, maximum covers and automatic confirmation for small tables." },
      { feature: "sala-e-tavoli", text: "The real plan of your dining room, with the status of every table." },
      { feature: "traduzioni", text: "A menu in four languages for visitors." },
      { feature: "automazioni-whatsapp", text: "Reminders and review requests, automatically." },
    ],
    faq: [
      { q: "Does it replace booking portals?", a: "Yes, for direct bookings you can use it instead of the portals, with no commission. You can also run it alongside them at first and decide in your own time." },
      { q: "Can I manage several rooms?", a: "Yes, you can manage several rooms: indoor rooms, outdoor seating and private rooms, each with its own floor plan." },
    ],
  },
  {
    id: "pub",
    name: "Pubs and beer halls",
    short: "Taps, match nights, themed evenings",
    icon: "beer",
    tone: "amber",
    seo: {
      title: "Pub digital menu with beers on tap and events",
      description:
        "A digital menu for pubs and beer halls: taps updated from your phone, happy hour that starts by itself, tables booked for match nights. Try it free.",
    },
    hero: {
      title: "New beers on tap, full evenings.",
      hl: "full evenings",
      lead: "NovaMenu is the digital menu for pubs and beer halls that you update from behind the bar: remove a finished keg in one tap, open bookings for the match with a set number of seats, and let customers know about themed evenings.",
    },
    photo: { src: "/images/settori/pub.webp", alt: "A smiling bartender taking a payment by phone at the bar of a pub", caption: "Behind the bar, not on the phone.", pos: "50% 35%", layout: "left", text: "You pull pints, serve, chat with customers. Match bookings, new beers on tap and themed evenings are managed from your phone, without leaving the bar.", points: ["Taps updated in an instant", "Limited seats for events", "Invitations to evenings for those who want them"] },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "The Old Barrel",
        status: "Open until 1:00",
        tabs: ["On tap", "Bottles", "Kitchen"],
        items: [
          { name: "House IPA", desc: "6.5% · bitter and citrusy", price: "6,00", unit: "0.4 L", c: "#fcd34d" },
          { name: "Weiss", desc: "5.2% · banana and clove", price: "5,50", unit: "0.4 L", c: "#fde68a" },
          { name: "Stout", desc: "4.8% · coffee and cocoa", price: "6,00", unit: "0.4 L", out: true, c: "#57534e" },
          { name: "Pub burger", desc: "With chips", price: "13,00", c: "#d6b8a8" },
        ],
      },
      floats: [
        { icon: "calendarCheck", t: "Saturday's match", d: "34 of 40 seats booked" },
        { icon: "sparkle", t: "New beer on tap online", d: "Red Ale, 5.4%" },
      ],
    },
    showcase: [
      {
        tag: "Evenings and events",
        title: "For the match, seats run out. And you know in advance.",
        text: "You open bookings for the event with the number of seats you have. When they're gone, booking closes by itself.",
        points: ["Limited seats per event", "Tables for 2 to 12 people", "Reminder on match day"],
        art: {
          kind: "booking",
          title: "Saturday's match",
          sub: "Kick-off 21:00",
          used: 34,
          total: 40,
          list: [
            { name: "Andrea and friends", n: 8, time: "20:30", note: "Near the screen" },
            { name: "Fabio Costa", n: 4, time: "20:45" },
            { name: "Sara Gallo", n: 6, time: "20:45", note: "Birthday" },
          ],
        },
      },
      {
        tag: "Timed menus",
        title: "Happy hour and kitchen, each at its own time.",
        text: "The menu changes by itself: happy hour at 18:00, the kitchen opens at 19:00, and at midnight only the beers remain.",
        points: ["Several menus in a single QR code", "Different hours at the weekend", "Taps updated from your phone"],
        art: {
          kind: "dayparts",
          rows: [
            { t: "Happy hour", time: "18:00 to 20:00", on: true, items: "Pint £4, sharing board" },
            { t: "Kitchen", time: "19:00 to 23:30", on: true, items: "Burgers, fried food, hot dishes" },
            { t: "Late night", time: "23:30 to 1:00", on: false, items: "Beers and snacks" },
          ],
        },
      },
    ],
    day: [
      { time: "Tuesday", text: "You change two taps: you update them from your phone with strength and style." },
      { time: "Thursday", text: "Bookings open for Saturday's match, with a limit on seats." },
      { time: "18:00", text: "The happy hour menu switches on by itself." },
      { time: "Saturday", text: "A message to customers about quiz night." },
    ],
    uses: [
      { feature: "menu-digitale", text: "Beers with style, strength and size, always up to date." },
      { feature: "menu-a-orari", text: "Happy hour and kitchen at different times." },
      { feature: "prenotazioni", text: "Tables for matches and events, with limited seats." },
      { feature: "automazioni-whatsapp", text: "Invitations to evenings for those who have given consent." },
    ],
    faq: [{ q: "Can I show the strength and style of the beers?", a: "Yes, for every beer you can show the alcohol content, style and size." }],
  },
  {
    id: "bar",
    name: "Cafés and bars",
    short: "From breakfast to aperitivo",
    icon: "coffee",
    tone: "orange",
    seo: {
      title: "QR code digital menu for cafés and bars",
      description:
        "A digital menu for cafés and bars: breakfast, lunch and aperitivo switch by themselves with a single QR code, translated for tourists. Try it free.",
    },
    hero: {
      title: "From breakfast to aperitivo, the menu changes by itself.",
      hl: "by itself",
      lead: "NovaMenu is the digital menu for cafés and bars that follows your day: breakfast, lunch and aperitivo take turns by themselves. Tourists read it in their own language and tables order faster.",
    },
    photo: { src: "/images/settori/bar.webp", alt: "A barista handing over a bag of pastries behind a counter full of croissants", caption: "From the first croissant to the last spritz.", pos: "50% 45%", layout: "right", text: "The menu changes by itself through the day, tourists read it in their own language, and you serve coffee instead of explaining the price list.", points: ["Breakfast, lunch and aperitivo in one QR code", "A menu in four languages", "Today's products always at the top"] },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Caffè Centrale",
        status: "Breakfast menu until 11:30",
        tabs: ["Breakfast", "Lunch", "Aperitivo"],
        items: [
          { name: "Cappuccino", desc: "Plant-based milk available", price: "1,60", c: "#e7d5b5" },
          { name: "Custard croissant", desc: "Baked this morning", price: "1,40", tag: "Today's", c: "#fde68a" },
          { name: "Fresh orange juice", price: "3,50", c: "#fdba74" },
          { name: "Ham and cheese toastie", price: "4,50", c: "#fed7aa" },
        ],
      },
      floats: [
        { icon: "clock", t: "Aperitivo starts at 18:00", d: "The menu changes by itself" },
        { icon: "globe", t: "Menu opened in German", d: "Table 6" },
      ],
    },
    showcase: [
      {
        tag: "Timed menus",
        title: "One QR code on the table, three menus through the day.",
        text: "At 7:00 the customer finds breakfast, at midday a quick lunch, at 18:00 the cocktail list. You don't touch a thing.",
        points: ["Time slots for every menu", "Today's products highlighted", "Sold-out items marked in one tap"],
        art: {
          kind: "dayparts",
          rows: [
            { t: "Breakfast", time: "7:00 to 11:30", on: true, items: "Coffee, pastries, fresh juices" },
            { t: "Quick lunch", time: "12:00 to 15:00", on: true, items: "Toasties, salads, dish of the day" },
            { t: "Aperitivo", time: "18:00 to 21:00", on: true, items: "Spritz, cocktails, sharing boards" },
          ],
        },
      },
      {
        tag: "Tourists",
        title: "A spritz is understood in every language. We translate the rest.",
        text: "The menu opens by itself in the phone's language. In a tourist area that means fewer explanations at the counter and faster orders.",
        points: ["Four languages included", "Allergens always clear", "No reprints"],
        art: {
          kind: "langs",
          dish: "Custard croissant",
          lines: [
            { flag: "🇬🇧", text: "Croissant filled with custard cream" },
            { flag: "🇩🇪", text: "Hörnchen mit Vanillecreme" },
            { flag: "🇪🇸", text: "Cruasán relleno de crema pastelera" },
          ],
        },
      },
    ],
    day: [
      { time: "7:00", text: "The breakfast menu switches on, with the day's pastries." },
      { time: "12:00", text: "Quick lunch: dishes of the day highlighted." },
      { time: "18:00", text: "Aperitivo arrives, with the cocktail list." },
      { time: "Always", text: "Tourists read the menu in English or German." },
    ],
    uses: [
      { feature: "menu-a-orari", text: "Three menus in one QR code, changing by themselves." },
      { feature: "traduzioni", text: "For tourists in the town centre or at the seaside." },
      { feature: "menu-digitale", text: "Today's products and sold-out items updated on the spot." },
      { feature: "statistiche", text: "Find out which products people look at most." },
    ],
    faq: [{ q: "Is it worth it for a small café?", a: "Yes, it's worth it even for a small café: the timed digital menu alone saves time and reprints." }],
  },
  {
    id: "gelaterie",
    name: "Ice cream shops",
    short: "Today's flavours and tubs",
    icon: "icecream",
    tone: "pink",
    seo: {
      title: "Digital menu for ice cream shops and gelaterias",
      description:
        "A digital menu for ice cream shops: today's flavours updated, tubs and ice cream cakes ordered on WhatsApp with a collection day and time. Try it free.",
    },
    hero: {
      title: "Today's flavours, already on your customers' phones.",
      hl: "Today's flavours",
      lead: "NovaMenu is the digital menu for ice cream shops: update today's flavours in one tap, take orders for tubs and ice cream cakes on WhatsApp, and show allergens without signs on the counter.",
    },
    photo: { src: "/images/settori/gelateria.webp", alt: "A waitress carrying three cups of ice cream across an Italian square", caption: "Today's flavours, already on your customers' phones.", pos: "50% 55%", layout: "center" },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Gelateria Polo Nord",
        status: "Flavours updated at 10:12",
        tabs: ["Today's flavours", "Tubs", "Ice cream cakes"],
        items: [
          { name: "Bronte pistachio", desc: "Contains tree nuts", price: "", out: true, c: "#bef264" },
          { name: "Piedmont PGI hazelnut", desc: "Contains tree nuts, milk", price: "", tag: "New", c: "#e7d5b5" },
          { name: "Strawberry", desc: "Sorbet, dairy-free", price: "", c: "#fda4af" },
          { name: "1 kg tub", desc: "Up to 4 flavours", price: "22,00", c: "#fce7f3" },
        ],
      },
      floats: [
        { icon: "bag", t: "Ice cream cake for Saturday", d: "8 people, collection at 16:00" },
        { icon: "x", t: "Pistachio sold out", d: "Marked from the phone" },
      ],
    },
    showcase: [
      {
        tag: "Tubs and cakes",
        title: "An ice cream cake is ordered with a collection day and time.",
        text: "The customer chooses flavours, number of people and the message on the cake, and says when they'll come by. You find it all in writing, even days ahead.",
        points: ["Orders up to weeks in advance", "Flavours of your choice for the tub", "Notes for the message on the cake"],
        art: {
          kind: "order",
          who: "Chiara Moretti",
          lines: ["1 × Ice cream cake, 8 people", "Flavours: hazelnut and strawberry", "1 × 500 g tub"],
          total: "£ 46,00",
          when: "Collection Saturday 16:00",
          extra: "Message: Happy birthday Sofia!",
        },
      },
      {
        tag: "Season",
        title: "You close in September. Your site says so by itself.",
        text: "You schedule the winter closure and the reopening. The menu shows the notice and orders stop on the right days.",
        points: ["Seasonal closures scheduled", "Automatic notice on the menu", "Summer and winter opening hours"],
        art: {
          kind: "dayparts",
          rows: [
            { t: "Summer hours", time: "June to September", on: true, items: "Every day 12:00 to 24:00" },
            { t: "Winter hours", time: "October to November", on: false, items: "Weekends only 14:00 to 20:00" },
            { t: "Closed", time: "December to February", on: false, items: "Notice on the menu, orders paused" },
          ],
        },
      },
    ],
    day: [
      { time: "10:00", text: "You mark today's flavours: pistachio, hazelnut, strawberry." },
      { time: "15:00", text: "An order comes in for an ice cream cake for Saturday." },
      { time: "21:00", text: "The pistachio runs out: you mark it sold out." },
      { time: "September", text: "You set the winter closure and the notice for customers." },
    ],
    uses: [
      { feature: "menu-digitale", text: "Today's flavours and sold-out ones in real time." },
      { feature: "ordini-whatsapp", text: "Tubs and ice cream cakes with a collection date and time." },
      { feature: "ferie-e-chiusure", text: "Seasonal closure scheduled." },
      { feature: "traduzioni", text: "Flavours explained to tourists." },
    ],
    faq: [{ q: "Can I take orders days in advance?", a: "Yes, you can take orders days in advance: the customer chooses the collection date and time, for the following days too." }],
  },
  {
    id: "pastifici",
    name: "Fresh pasta shops",
    short: "Fresh pasta by weight",
    icon: "wheat",
    tone: "amber",
    seo: {
      title: "Online ordering for fresh pasta shops, by weight",
      description:
        "Online ordering for fresh pasta shops: pasta sold by weight with a collection day and time, a daily limit over the holidays and messages to regulars.",
    },
    hero: {
      title: "At Christmas they order online. You roll the pasta.",
      hl: "online",
      lead: "NovaMenu brings online ordering to your fresh pasta shop: customers order by weight with a collection day and time, you see how much pasta to make, and before the holidays you let everyone know with one message.",
    },
    photo: { src: "/images/settori/pastificio.webp", alt: "Two pasta makers rolling out a sheet of fresh pasta in their workshop", caption: "You roll the pasta, the orders arrive by themselves.", pos: "50% 40%", layout: "left", text: "Orders arrive in writing, with the weights and the collection time. Every morning you know how much pasta to make, even in the weeks around the holidays.", points: ["Price per kilo or per pack", "An order limit per day", "A summary of what to prepare"] },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Pastificio Gallo",
        status: "Orders for tomorrow until 18:00",
        tabs: ["Fresh pasta", "Filled pasta", "Sauces"],
        items: [
          { name: "Tajarin", desc: "40 egg yolks per kg", price: "14,00", unit: "kg", c: "#fde68a" },
          { name: "Agnolotti del plin", desc: "Three-meat filling", price: "26,00", unit: "kg", c: "#fed7aa" },
          { name: "Ravioli di magro", desc: "Ricotta and spinach", price: "24,00", unit: "kg", tag: "Fridays only", c: "#d9f99d" },
          { name: "House ragù", desc: "Jar", price: "8,00", unit: "500 g", c: "#fca5a5" },
        ],
      },
      floats: [
        { icon: "calendarCheck", t: "Christmas orders open", d: "23 December almost full" },
        { icon: "bag", t: "New order", d: "1 kg of plin, collection Saturday" },
      ],
    },
    showcase: [
      {
        tag: "Holiday orders",
        title: "Every day has its limit. 23 December doesn't boil over.",
        text: "You decide how many orders you accept per day and per slot. When a day is full the customer picks the day before, without calling you.",
        points: ["An order limit per day", "Half-hour collection slots", "A summary of what to prepare"],
        art: {
          kind: "slots",
          title: "Collection for Christmas",
          days: [{ d: "Sat", n: "20" }, { d: "Sun", n: "21" }, { d: "Mon", n: "22" }, { d: "Tue", n: "23", full: true }],
          slots: [
            { t: "9:00", s: "full" }, { t: "9:30", s: "few" }, { t: "10:00", s: "sel" },
            { t: "10:30", s: "free" }, { t: "11:00", s: "free" }, { t: "11:30", s: "few" },
          ],
          note: "Collection Monday 22 at 10:00",
        },
      },
      {
        tag: "Sold by weight",
        title: "The customer chooses how much. You see how much to make.",
        text: "Price per kilo or per pack, any quantity. The order reaches you with the weights already written and the total worked out.",
        points: ["Price per kg or per item", "Products on certain days only", "Regulars and repeat orders"],
        art: {
          kind: "order",
          who: "Giovanna Ricci",
          lines: ["1 kg × Agnolotti del plin", "500 g × Tajarin", "1 × House ragù, 500 g"],
          total: "£ 41,00",
          when: "Collection Monday 22 at 10:00",
        },
      },
    ],
    day: [
      { time: "November", text: "You open Christmas orders, with a limit per day." },
      { time: "Every morning", text: "You see the summary of what to prepare and for when." },
      { time: "23 December", text: "Collection moves quickly: the orders are already made up." },
      { time: "January", text: "A message to customers about the ravioli of the month." },
    ],
    uses: [
      { feature: "ordini-whatsapp", text: "Orders with a collection day and time, even weeks ahead." },
      { feature: "menu-digitale", text: "Products sold by weight or per item, available on certain days only." },
      { feature: "clienti", text: "Your regulars and their repeat orders." },
      { feature: "automazioni-whatsapp", text: "A heads-up before the holidays." },
    ],
    faq: [{ q: "Can I sell by weight?", a: "Yes, you can sell by weight: you set the price per kilo or per pack and the customer chooses the quantity." }],
  },
  {
    id: "panetterie",
    name: "Bakeries and patisseries",
    short: "Bread and cakes to order",
    icon: "bread",
    tone: "orange",
    seo: {
      title: "Online ordering for bakeries: bread and cakes",
      description:
        "Online pre-orders for bakeries and patisseries: bread ordered the evening before with a collection slot, cakes to order, a catalogue with prices per kilo.",
    },
    hero: {
      title: "Bread ordered in the evening, ready in the morning.",
      hl: "ordered",
      lead: "NovaMenu brings pre-orders to your bakery: a catalogue with prices per kilo and allergens, bread and cakes ordered with a collection slot, and no more scraps of paper stuck to the counter.",
    },
    photo: { src: "/images/settori/panetteria.webp", alt: "A smiling baker at the door of his bakery with his arms full of bread", caption: "Bread pre-ordered, ready on the counter.", pos: "50% 35%", layout: "right", text: "Customers order in the evening, and in the morning you find the list already split by collection slot. Less leftover bread, fewer scraps of paper on the counter.", points: ["Pre-orders up to the time you decide", "Collection slots from first thing", "Cakes to order with notice"] },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Forno San Guido",
        status: "Order by 20:00 for tomorrow morning",
        tabs: ["Bread", "Focaccia", "Cakes", "Seasonal"],
        items: [
          { name: "Semolina bread", desc: "Sourdough, 24 hours", price: "4,20", unit: "kg", c: "#e7d5b5" },
          { name: "Hand-stretched grissini", price: "12,00", unit: "kg", c: "#fde68a" },
          { name: "Focaccia genovese", desc: "Whole tray", price: "9,00", unit: "each", c: "#fef08a" },
          { name: "Hazelnut cake", desc: "To order", price: "24,00", unit: "kg", tag: "2 days' notice", c: "#d6b8a8" },
        ],
      },
      floats: [
        { icon: "clock", t: "Bread ordered for tomorrow", d: "Collection 7:30, 1 kg semolina bread" },
        { icon: "sparkle", t: "Easter colomba cakes", d: "Orders open" },
      ],
    },
    showcase: [
      {
        tag: "Collection slots",
        title: "Pre-ordered bread, split by collection time.",
        text: "The customer orders in the evening and chooses when to come by. In the morning you have the list already split by slot: you wrap and prepare without thinking about it.",
        points: ["Slots from opening time", "Orders close at the time you decide", "Bread by weight or per item"],
        art: {
          kind: "slots",
          title: "Collection tomorrow morning",
          days: [{ d: "Tue", n: "14" }, { d: "Wed", n: "15" }, { d: "Thu", n: "16" }],
          slots: [
            { t: "7:00", s: "few" }, { t: "7:30", s: "sel" }, { t: "8:00", s: "full" },
            { t: "8:30", s: "free" }, { t: "9:00", s: "free" }, { t: "9:30", s: "free" },
          ],
          note: "Collection Wednesday at 7:30",
        },
      },
      {
        tag: "Cakes to order",
        title: "The birthday cake arrives with its message and number of people.",
        text: "The customer picks the cake, says how many people it's for and what to write on it. No more details lost between phone calls and sticky notes.",
        points: ["Minimum notice for each product", "Notes for messages and decorations", "Clear allergens for every cake"],
        art: {
          kind: "order",
          who: "Paolo Marino",
          lines: ["1 × Hazelnut cake, 1.5 kg", "12 people", "1 kg × Semolina bread"],
          total: "£ 40,20",
          when: "Collection Saturday 10:30",
          extra: "Message: Happy birthday Grandma Rina",
        },
      },
    ],
    day: [
      { time: "In the evening", text: "Bread orders come in for the next morning." },
      { time: "7:00", text: "The pre-ordered bread is already split by collection slot." },
      { time: "Monday", text: "An order comes in for a cake for Saturday's birthday." },
      { time: "March", text: "You open orders for Easter colomba cakes." },
    ],
    uses: [
      { feature: "ordini-whatsapp", text: "Bread and cakes to order, with a collection date and slot." },
      { feature: "menu-digitale", text: "A catalogue with prices per kilo, ingredients and allergens." },
      { feature: "menu-a-orari", text: "Products available on certain days only." },
      { feature: "clienti", text: "Who always orders, and what." },
    ],
    faq: [
      { q: "Can I show the price per kilo?", a: "Yes, you can show the price per kilo: every product can be priced per kilo, per item or per pack." },
      { q: "Can I ask for details for a cake?", a: "Yes, for every cake the customer can write a note with the message, flavours and number of people." },
    ],
  },
  {
    id: "gastronomie",
    name: "Delis and rotisseries",
    short: "Ready-made dishes to take away",
    icon: "bag",
    tone: "green",
    seo: {
      title: "Online ordering for delis and rotisseries",
      description:
        "Online ordering for delis and rotisseries: dishes of the day by weight or by portion, lunch pre-ordered with a collection slot, festive menus. Try it free.",
    },
    hero: {
      title: "Ordered at ten, ready at midday.",
      hl: "ready",
      lead: "NovaMenu brings online ordering to your deli: dishes of the day published every morning, orders by weight or by portion with a collection time, and lunch ready and waiting when the customer arrives.",
    },
    photo: { src: "/images/settori/gastronomia.webp", alt: "Nests of fresh tagliatelle on a floured tray, next to a sheet of pasta and the pasta machine", caption: "Made by hand, already ordered.", pos: "50% 60%", layout: "center" },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Gastronomia Vercelli",
        status: "Lunch orders until 11:30",
        tabs: ["Dishes of the day", "Rotisserie", "Sides"],
        items: [
          { name: "Baked lasagne", desc: "Ragù and béchamel", price: "18,00", unit: "kg", tag: "Today", c: "#fca5a5" },
          { name: "Vitello tonnato", desc: "House sauce", price: "32,00", unit: "kg", c: "#e7d5b5" },
          { name: "Roast chicken", desc: "Whole, with potatoes", price: "12,00", unit: "each", c: "#fde68a" },
          { name: "Russian salad", price: "16,00", unit: "kg", out: true, c: "#d9f99d" },
        ],
      },
      floats: [
        { icon: "bag", t: "Lunch to collect", d: "12:30, 4 portions of lasagne" },
        { icon: "calendarCheck", t: "Christmas menu", d: "Orders open until the 20th" },
      ],
    },
    showcase: [
      {
        tag: "Takeaway lunch",
        title: "They order at 10. By 12:30 it's already wrapped.",
        text: "The customer chooses the dishes of the day and a collection slot. You prepare in order of time, and the queue at the counter gets shorter.",
        points: ["Collection slots for lunch", "Portions or weight, as they prefer", "Orders close at the time you decide"],
        art: {
          kind: "slots",
          title: "Collection today",
          days: [{ d: "Today", n: "14" }, { d: "Wed", n: "15" }, { d: "Thu", n: "16" }],
          slots: [
            { t: "12:00", s: "full" }, { t: "12:15", s: "few" }, { t: "12:30", s: "sel" },
            { t: "12:45", s: "free" }, { t: "13:00", s: "free" }, { t: "13:15", s: "free" },
          ],
          note: "Collection today at 12:30",
        },
      },
      {
        tag: "Holidays and Sunday lunches",
        title: "The festive menu is ordered in advance, by weight.",
        text: "Vitello tonnato, starters, roasts: the customer orders for the number of people and you see the total quantities to prepare.",
        points: ["Special menus on certain days only", "Quantities by weight already worked out", "A message to customers before the holidays"],
        art: {
          kind: "order",
          who: "Bertola family",
          lines: ["800 g × Vitello tonnato", "1.5 kg × Baked lasagne", "2 × Roast chicken"],
          total: "£ 76,60",
          when: "Collection 24 December 11:00",
          extra: "Note: lasagne in two trays",
        },
      },
    ],
    day: [
      { time: "8:30", text: "You publish the dishes of the day from your phone, with the price per kilo." },
      { time: "10:00", text: "Lunch orders come in, already split by slot." },
      { time: "12:30", text: "The customer comes by, the order is ready, no queue." },
      { time: "December", text: "You open the festive menu and let your regulars know." },
    ],
    uses: [
      { feature: "ordini-whatsapp", text: "Takeaway lunches with a collection slot and a limit per slot." },
      { feature: "menu-digitale", text: "Dishes of the day by weight or by portion, updated every morning." },
      { feature: "clienti", text: "Your regulars and what they usually order." },
      { feature: "automazioni-whatsapp", text: "A heads-up before the holidays to customers who have given consent." },
    ],
    faq: [
      { q: "Can I change the dishes every day?", a: "Yes, you can change the dishes every day: you switch them on and off from your phone in a few seconds, or by voice with the assistant." },
      { q: "Can I sell by weight and by portion?", a: "Yes, you can sell both by weight and by portion: every dish can be priced per kilo, per portion or per item." },
    ],
  },
];

import type { Feature } from "../features";

/* Contenuti in inglese: stessa forma del file italiano, generati a partire da quello. */
export const features: Omit<Feature, "slug">[] = [
  {
    id: "menu-digitale",
    name: "Digital menu and QR code",
    short: "Always up to date, no reprints",
    group: "Menu",
    icon: "qr",
    tone: "grey",
    plan: "Base",
    visual: "menu",
    seo: {
      title: "QR code digital menu for restaurants and cafés",
      description:
        "A QR code digital menu for your restaurant: change a price or hide a sold-out dish from your phone, no reprinting. Allergens included. Try it free.",
    },
    hero: {
      title: "Your venue's menu, always right.",
      lead:
        "The NovaMenu digital menu is a page with your logo and colours that customers open from the QR code on the table, with nothing to download. Change a price or mark a dish as sold out from your phone and it updates straight away, with no reprints.",
    },
    steps: [
      { title: "Upload your menu", text: "From a photo of your paper menu, from a PDF, or by typing the dishes in." },
      { title: "Choose the style", text: "Logo, colours, cover photo and the order of the categories." },
      { title: "Print the QR code", text: "Download the QR code for tables, windows and flyers. It never changes." },
    ],
    sections: [
      {
        title: "Made to be read one-handed, at the table",
        text:
          "Customers don't download an app. They open the menu from the QR code, scroll the categories at the top and find what they want straight away. Every dish has a photo, description, price and allergens.",
        points: [
          "Categories stay fixed at the top while scrolling",
          "Large photos and text that's readable even by candlelight",
          "Search by dish name and filter by allergen",
          "A fast page even on 4G out on the terrace",
        ],
      },
      {
        title: "Sold out? Mark it in one tap",
        text:
          "When the burrata runs out or the catch of the day arrives, you change it from your phone while you're in the kitchen. The menu updates for every table at the same moment.",
        points: [
          "Sold-out dishes hidden or marked as unavailable",
          "Dishes of the day and off-menu specials highlighted",
          "Options, extras and sizes, each with its own price",
          "Different prices for eating in and takeaway",
        ],
      },
      {
        title: "Allergens always in order",
        text:
          "For each dish you pick from the 14 allergens set out in EU rules with one tap. Customers see them next to the dish and can filter the menu.",
        points: [
          "The 14 allergens of EU Regulation 1169/2011",
          "Clear icons, and text translated into your menu's languages",
          "A note on traces and cross-contamination",
        ],
      },
    ],
    benefits: [
      { title: "No reprints", text: "One QR code for good. Change the menu as often as you like." },
      { title: "Your brand", text: "Logo, colours and, if you want, your venue's own domain." },
      { title: "Faster than paper", text: "Customers choose while they wait, and your waiter takes the order sooner." },
      { title: "Ready in an afternoon", text: "And if you like, we upload it for you during the demo." },
    ],
    faq: [
      { q: "Do customers have to download an app?", a: "No, customers don't need to download any app: the menu opens in their phone's browser when they scan the QR code, like any normal web page." },
      { q: "Can I use my venue's own domain?", a: "Yes, on the Premium plan your menu can sit on your venue's own domain, for example menu.yourvenue.com." },
      { q: "If I change the menu, do I have to reprint the QR code?", a: "No, the QR code never needs reprinting: it always points to the same address, so you change the dishes and the QR code stays the same." },
      { q: "Can I have one menu for eating in and one for takeaway?", a: "Yes, you can have different dishes and prices for eating in and for takeaway: you decide what to show in each." },
    ],
    related: ["importa-menu-ai", "traduzioni", "menu-a-orari"],
  },
  {
    id: "importa-menu-ai",
    name: "AI menu import",
    short: "From a photo to an online menu",
    group: "Menu",
    icon: "sparkle",
    tone: "green",
    plan: "Base",
    visual: "ai",
    seo: {
      title: "Create a digital menu from a photo in minutes",
      description:
        "Create your digital menu from a photo of your paper menu or a PDF: dishes, prices and allergens fall into place. You check and publish. Try it free.",
    },
    hero: {
      title: "Take a photo of your menu. We'll do the rest.",
      lead:
        "Menu import means you don't retype anything by hand: upload a photo of your paper menu or the printer's PDF and within minutes dishes, descriptions, prices, categories and allergens are in place. You check and publish.",
    },
    steps: [
      { title: "Upload a photo or PDF", text: "Several pages at once, even ones taken on your phone." },
      { title: "Check", text: "See everything in a table: correct a price or a name with one tap." },
      { title: "Publish", text: "The menu is online and the QR code is ready to print." },
    ],
    sections: [
      {
        title: "It even reads handwritten menus",
        text:
          "Artificial intelligence recognises the structure of the menu: it understands what's a category, what's a dish, which is the price and what the ingredients are.",
        points: [
          "Crooked photos, shadows and chalkboards",
          "Prices with options, such as small and large",
          "Several pages in a single upload",
          "Allergens suggested from the ingredients, for you to confirm",
        ],
      },
      {
        title: "You always have the final say",
        text:
          "Nothing is published without your check. Every line can be corrected, moved or deleted before it goes online.",
        points: [
          "A preview of the menu before publishing",
          "Doubtful lines highlighted for you to check",
          "You can add a new menu without touching the current one",
        ],
      },
    ],
    benefits: [
      { title: "Minutes, not days", text: "An 80-dish menu is imported in a few minutes." },
      { title: "No retyping", text: "No more hours spent rewriting dishes and prices." },
      { title: "Suggested allergens", text: "A starting point to confirm, not to make up." },
      { title: "Works for everyone", text: "Pizzerias, pasta shops, cafés: any price list." },
    ],
    faq: [
      { q: "What if the AI gets a price wrong?", a: "You correct it before publishing: you see every dish in a table, and the less certain lines are highlighted." },
      { q: "Can I import a price list in PDF?", a: "Yes, you can import a PDF price list, as well as photos and images, even several files at once." },
      { q: "Are the allergens reliable?", a: "The allergens are a suggestion to confirm: they are proposed from the ingredients written on the menu, and you check them, because you know the recipes." },
    ],
    related: ["menu-digitale", "traduzioni", "assistente"],
  },
  {
    id: "traduzioni",
    name: "Translated menu",
    short: "Four languages in one tap",
    group: "Menu",
    icon: "globe",
    tone: "blue",
    plan: "Pro",
    visual: "lingue",
    seo: {
      title: "Translated restaurant menu in four languages",
      description:
        "A restaurant menu translated into English, French, German and Spanish in one tap: it opens in the tourist's phone language. Edit any sentence. Try it free.",
    },
    hero: {
      title: "Tourists read the menu in their own language.",
      lead:
        "The translated menu puts all your dishes into English, French, German and Spanish in one tap. It opens by itself in the language of the customer's phone, so your waiter no longer has to translate every dish. Traditional names stay in Italian, if you want them to.",
    },
    steps: [
      { title: "Choose the languages", text: "English, French, German, Spanish: switch on the ones you need." },
      { title: "Translate", text: "Every dish, description and allergen, in one tap." },
      { title: "Fine-tune", text: "Correct any sentence by hand. Your corrections stay." },
    ],
    sections: [
      {
        title: "Translations made for hospitality",
        text:
          "It isn't a generic translator. It knows that carbonara stays carbonara and that fior di latte isn't \"flower milk\". It explains the ingredients without spoiling the names.",
        points: [
          "Traditional names left in Italian, with an explanation",
          "Allergens translated with the correct terminology",
          "New dishes translated automatically as soon as you add them",
        ],
      },
      {
        title: "It opens in the right language",
        text:
          "The menu recognises the phone's language and opens already translated. Customers can always change language from the selector at the top.",
        points: ["Automatic language detection", "A flag selector that's always visible", "The basket and bookings are translated too"],
      },
    ],
    benefits: [
      { title: "Fewer questions at the table", text: "Your waiter doesn't have to translate every dish." },
      { title: "More orders from tourists", text: "People who understand what they're ordering order more." },
      { title: "Always in sync", text: "Change a price and it applies in every language." },
      { title: "Full control", text: "Every sentence can be corrected by hand." },
    ],
    faq: [
      { q: "How many languages can I switch on?", a: "You can switch on four languages besides Italian: English, French, German and Spanish. Turn on only the ones you need." },
      { q: "If I add a dish, do I have to translate it myself?", a: "No, every new dish is translated automatically as soon as you add it. You can fine-tune it afterwards if you like." },
      { q: "Will my corrections be overwritten?", a: "No, your corrections are not overwritten: the sentences you edit by hand stay as they are even if you retranslate the rest of the menu." },
    ],
    related: ["menu-digitale", "importa-menu-ai", "prenotazioni"],
  },
  {
    id: "menu-a-orari",
    name: "Timed menus",
    short: "Lunch, aperitivo, dinner",
    group: "Menu",
    icon: "clock",
    tone: "orange",
    plan: "Pro",
    visual: "orari",
    seo: {
      title: "Timed menus: lunch, aperitivo and dinner",
      description:
        "Timed menus for cafés and restaurants: lunch, aperitivo and dinner switch by themselves by time and day, with a single QR code. Try it free.",
    },
    hero: {
      title: "Lunch at midday. At six, aperitivo.",
      lead:
        "Timed menus show every customer the right menu for that time of day. You set once which menus apply at which times and on which days: the QR code on the table does the rest, without anyone having to remember to change it.",
    },
    steps: [
      { title: "Create the menus", text: "Lunch, aperitivo, dinner, Sunday brunch: as many as you need." },
      { title: "Set the times", text: "For each menu, choose the days and time slots." },
      { title: "Forget about it", text: "The switch happens by itself, on bank holidays too." },
    ],
    sections: [
      {
        title: "One QR code, all your menus",
        text:
          "Customers see the menu that's active at that moment, and can look at the others too. No more signs to flip or chalkboards to rewrite.",
        points: ["Time slots for each day of the week", "Special menus for specific dates, such as Christmas or Easter", "Wine and cocktail list always visible"],
      },
    ],
    benefits: [
      { title: "No mistakes", text: "Never again the lunch menu at nine in the evening." },
      { title: "More aperitivi", text: "The right offer appears exactly when it's needed." },
      { title: "Special events", text: "A Valentine's Day menu, active that evening only." },
      { title: "Zero effort", text: "You set it once, then it runs by itself." },
    ],
    faq: [
      { q: "Can customers see the other menus too?", a: "Yes, customers can see the other menus too: the active one is in the foreground, and the others remain available to browse." },
      { q: "Can I create a menu for one date only?", a: "Yes, you can create a menu valid for a single date, for example a New Year's Eve menu active on 31 December from 20:00." },
    ],
    related: ["menu-digitale", "ferie-e-chiusure", "statistiche"],
  },
  {
    id: "prenotazioni",
    name: "Online bookings",
    short: "Confirmed in one tap",
    group: "Prenotazioni e sala",
    icon: "calendarCheck",
    tone: "pink",
    plan: "Pro",
    visual: "prenotazioni",
    seo: {
      title: "Online table booking system, no commission",
      description:
        "An online table booking system from your link, Google and social media: confirm in one tap and the customer hears on WhatsApp. No per-cover fees. Try it free.",
    },
    hero: {
      title: "Bookings come in. You confirm with one tap.",
      lead:
        "With online bookings, a customer books a table from your link in thirty seconds: day, time, number of people, high chairs. You accept the request or suggest another time, and they get the confirmation on WhatsApp. With no per-cover fees.",
    },
    steps: [
      { title: "Set your sittings", text: "Times, table duration and maximum covers per slot." },
      { title: "Share the link", text: "On Google, Instagram, your website and in the digital menu." },
      { title: "Confirm", text: "Accept, decline or suggest a time. The customer knows straight away." },
    ],
    sections: [
      {
        title: "Booking is as easy as sending a message",
        text:
          "The customer picks the day from a strip of dates, sees only the times still free, and says how many people and whether high chairs are needed. No sign-up.",
        points: ["Only the times that are really available", "High chairs and notes for allergies or birthdays", "In the customer's language", "Can be linked to Google's Reserve button"],
      },
      {
        title: "Automatic or manual acceptance",
        text:
          "You decide: you can confirm automatically up to a certain number of people and keep only the large requests for yourself, or check everything by hand.",
        points: ["Automatic confirmation for small tables", "Groups and special evenings always by hand", "Suggest an alternative time in one tap", "A waiting list when you're full"],
      },
      {
        title: "Fewer empty tables",
        text:
          "The day before, the customer gets a reminder on WhatsApp with Confirm and Cancel buttons. If they cancel, the table is free again straight away.",
        points: ["Automatic reminder the day before", "Cancellation in one tap, without a phone call", "A record of customers who don't turn up"],
      },
    ],
    benefits: [
      { title: "Zero commission", text: "No per-cover fees, unlike booking portals." },
      { title: "Fewer phone calls", text: "The phone rings less during service." },
      { title: "Fewer no-shows", text: "Reminders and easy cancellation reduce empty tables." },
      { title: "Customers stay yours", text: "Names and numbers go into your own customer list." },
    ],
    faq: [
      { q: "How much does each booking cost?", a: "Each booking costs nothing: bookings are included in the Pro plan, with no per-cover fees." },
      { q: "Can I block bookings for one evening?", a: "Yes, you can block bookings for a whole day or a single sitting, from the dashboard or with a message to the assistant on Telegram." },
      { q: "Does the customer have to sign up?", a: "No, the customer doesn't have to sign up: they leave a name and phone number and get the confirmation on WhatsApp." },
      { q: "Can I manage high chairs?", a: "Yes, you can manage high chairs: you say how many you have, and no more requests are accepted than you can meet." },
    ],
    related: ["sala-e-tavoli", "ferie-e-chiusure", "automazioni-whatsapp"],
  },
  {
    id: "sala-e-tavoli",
    name: "Floor plan and tables",
    short: "Your dining room in real time",
    group: "Prenotazioni e sala",
    icon: "tables",
    tone: "violet",
    plan: "Pro",
    visual: "sala",
    seo: {
      title: "Restaurant table management and floor plan",
      description:
        "Restaurant table management with your own floor plan: assign bookings and see who's seated, who's arriving and what's freeing up. Try it free for 14 days.",
    },
    hero: {
      title: "The whole dining room under control, at a glance.",
      lead:
        "Floor plan and tables is the map of your venue, on your phone or tablet. You draw the room once, with your real tables, then drag bookings onto tables and see at any moment who's seated, who's due and what's freeing up.",
    },
    steps: [
      { title: "Draw the room", text: "Round and square tables, indoor rooms and outdoor seating." },
      { title: "Assign", text: "Drag the booking onto the table, joining several tables if needed." },
      { title: "Follow the service", text: "Arrived, seated, paying, free: the colours say it all." },
    ],
    sections: [
      {
        title: "The evening at a glance",
        text:
          "Each table changes colour according to its status. Your front-of-house manager sees straight away where to seat walk-ins.",
        points: ["Table statuses in clear colours", "A timeline of the evening", "Several rooms and outdoor areas", "Works on tablet and phone"],
      },
    ],
    benefits: [
      { title: "More covers", text: "Fit tables together better and get an extra sitting." },
      { title: "Less chaos", text: "The whole team sees the same room." },
      { title: "Walk-ins handled", text: "You know straight away whether and where to seat them." },
      { title: "On every device", text: "Tablet at the till, phone on the floor." },
    ],
    faq: [
      { q: "Can I join several tables together?", a: "Yes, you can join several tables: select the ones to join and the booking takes up all of them." },
      { q: "Do I need a dedicated tablet?", a: "No, you don't need a dedicated tablet: it works on any tablet, phone or computer with a browser." },
    ],
    related: ["prenotazioni", "staff-e-turni", "clienti"],
  },
  {
    id: "ferie-e-chiusure",
    name: "Holidays and closures",
    short: "Set up once and for all",
    group: "Prenotazioni e sala",
    icon: "calendarX",
    tone: "amber",
    plan: "Base",
    visual: "chiusure",
    seo: {
      title: "Restaurant opening hours, holidays and closures",
      description:
        "Restaurant opening hours, holidays and closures set once: orders and bookings pause and restart by themselves, and customers see when you reopen. Try it free.",
    },
    hero: {
      title: "Close for the holidays. Your site already knows.",
      lead:
        "Holidays and closures is your venue's calendar: you set opening hours, closing days, holidays and one-off closures just once. Orders and bookings pause and restart by themselves, and customers see a notice with your reopening date.",
    },
    steps: [
      { title: "Weekly hours", text: "Lunch and dinner, day by day." },
      { title: "Holidays and closures", text: "Pick the dates on the calendar and write a message." },
      { title: "Done", text: "Everything pauses and restarts by itself." },
    ],
    sections: [
      {
        title: "One place for your opening hours",
        text:
          "The hours you set apply everywhere: menu, takeaway orders and bookings. You don't have to remember to change three different things.",
        points: ["Different hours for lunch and dinner", "One-off closures for a single sitting", "Holidays scheduled months ahead", "A personalised notice for customers"],
      },
    ],
    benefits: [
      { title: "No wrong bookings", text: "Nobody books when you're closed." },
      { title: "Informed customers", text: "They see when you reopen." },
      { title: "Plan ahead", text: "August holidays are set up in June." },
      { title: "From your phone too", text: "Or with a voice note to the assistant." },
    ],
    faq: [
      { q: "Can I close just for dinner on one day?", a: "Yes, you can close just for dinner: you choose whether to pause a whole day or a single sitting." },
      { q: "What do customers see?", a: "Customers see a notice with your message and the reopening date. The menu stays available to browse." },
    ],
    related: ["prenotazioni", "ordini-whatsapp", "assistente"],
  },
  {
    id: "ordini-whatsapp",
    name: "WhatsApp orders",
    short: "Takeaway without commission",
    group: "Vendite e clienti",
    icon: "bag",
    tone: "green",
    plan: "Pro",
    visual: "ordini",
    seo: {
      title: "WhatsApp restaurant ordering with no commission",
      description:
        "Restaurant online ordering on WhatsApp from your digital menu: takeaway orders arrive in writing, with collection time. Zero commission. Try it free.",
    },
    hero: {
      title: "Takeaway orders on WhatsApp. Zero commission.",
      lead:
        "With WhatsApp orders, the customer chooses from your digital menu, picks a collection time and sends you the order already written, with the total. You also find it in the dashboard, in order of collection. With no commission: you only pay the subscription.",
    },
    steps: [
      { title: "The customer chooses", text: "From the digital menu, with options and extras." },
      { title: "They pick a time", text: "Only the collection slots you can really handle." },
      { title: "It arrives on WhatsApp", text: "A tidy message, with total and time." },
    ],
    sections: [
      {
        title: "No more orders dictated over the phone",
        text:
          "Every order arrives in writing, with the dishes, the extras, the total and the time. No misunderstandings in the middle of service.",
        points: ["A ready-made message with all the details", "Orders saved in the dashboard even if the message isn't sent", "Notes for allergies and requests"],
      },
      {
        title: "You decide how many orders to accept",
        text:
          "You set the collection slots and the maximum number of orders per slot. If the kitchen is full, pause orders for half an hour with one tap.",
        points: ["Collection slots every 15 minutes", "An order limit per slot", "Temporary pause on orders", "Minimum notice required"],
      },
    ],
    benefits: [
      { title: "0% commission", text: "You only pay the subscription: the takings are all yours." },
      { title: "Fewer phone calls", text: "The lines stay free at peak times." },
      { title: "Bigger orders", text: "With photos, it's easier to add a drink or a dessert." },
      { title: "Your own customers", text: "Every order creates the customer's profile." },
    ],
    faq: [
      { q: "Do you take a percentage of orders?", a: "No, we don't take any percentage of orders: you only pay the monthly or yearly subscription." },
      { q: "Can I pause orders?", a: "Yes, you can pause orders for as long as you decide, from the dashboard or with a message to the assistant." },
      { q: "Do I need WhatsApp Business?", a: "It isn't compulsory: it works with your venue's WhatsApp number. We do recommend WhatsApp Business, which is free." },
      { q: "Does the customer pay online?", a: "No, for now the customer pays on collection, in cash or with your venue's card machine." },
    ],
    related: ["menu-digitale", "clienti", "automazioni-whatsapp"],
  },
  {
    id: "clienti",
    name: "Customers",
    short: "Profiles, notes and contacts",
    group: "Vendite e clienti",
    icon: "users",
    tone: "blue",
    plan: "Premium",
    visual: "clienti",
    seo: {
      title: "Restaurant CRM: customer profiles and history",
      description:
        "A restaurant CRM that builds itself: every order and booking creates a profile with visits, preferences, allergies and birthday. The data stays yours.",
    },
    hero: {
      title: "Remember every customer the way your best waiter does.",
      lead:
        "Customer profiles create themselves, with every booking and every order. You see how many times a customer has been, what they order, whether they have allergies and when their birthday is: you recognise them before they even sit down.",
    },
    steps: [
      { title: "It creates itself", text: "From orders and bookings, with nothing to type in." },
      { title: "It grows richer", text: "Add notes: favourite table, allergies, wine." },
      { title: "You use it", text: "Recognise the customer on the phone and write to them at the right moment." },
    ],
    sections: [
      {
        title: "Everything you know about a customer, in one profile",
        text: "Visits, average spend, favourite dishes, staff notes. When they book again, the floor team already knows who's coming.",
        points: ["History of visits and orders", "Tags such as regular, VIP, to call back", "Birthday and privacy consents", "Export to Excel whenever you like"],
      },
    ],
    benefits: [
      { title: "Regulars recognised", text: "Their favourite table is already waiting." },
      { title: "Your data", text: "It doesn't stay locked inside an external portal." },
      { title: "Privacy in order", text: "Consents collected and recorded." },
      { title: "The basis for automations", text: "Reminders, birthday wishes and targeted messages." },
    ],
    faq: [
      { q: "Do I have to enter customers by hand?", a: "No, you don't have to enter customers by hand: profiles are created from bookings and orders. You can also import an existing list." },
      { q: "Is the data safe?", a: "Yes, the data is safe: it sits on servers in Europe and only you and the staff you authorise can see it." },
    ],
    related: ["automazioni-whatsapp", "prenotazioni", "statistiche"],
  },
  {
    id: "automazioni-whatsapp",
    name: "WhatsApp automations",
    short: "Reminders, reviews, campaigns",
    group: "Vendite e clienti",
    icon: "chat",
    tone: "pink",
    plan: "Premium",
    visual: "automazioni",
    seo: {
      title: "Automatic WhatsApp messages for restaurants",
      description:
        "Automatic WhatsApp messages from your venue's own number: booking reminders, review requests, birthday wishes and a hello to lapsed customers. Try it free.",
    },
    hero: {
      title: "The right messages go out on their own.",
      lead:
        "WhatsApp automations are messages that send themselves from your venue's number: a reminder the day before, a review request the day after, birthday wishes, a hello to anyone who hasn't been back for two months. You choose them just once.",
    },
    steps: [
      { title: "Connect WhatsApp", text: "The number you've always used, in a few minutes." },
      { title: "Choose the automations", text: "Switch them on with a toggle and fine-tune the text." },
      { title: "Watch the results", text: "How many confirmations, how many reviews, how many return visits." },
    ],
    sections: [
      {
        title: "Ready-made automations, well written",
        text: "They start with text already written for hospitality. You can change it however you like.",
        points: [
          "Reminder with Confirm and Cancel buttons",
          "Request for a Google review after the visit",
          "Birthday wishes with a little gift",
          "A message to anyone who hasn't been back for 60 days",
        ],
      },
      {
        title: "Messages to customer groups",
        text: "A new menu, a themed evening, the pizza of the month: choose who to write to among the customers who have given consent.",
        points: ["Groups by tag, visits or spend", "Only to those who have given consent", "Message cost shown before sending"],
      },
    ],
    benefits: [
      { title: "More reviews", text: "Asking at the right moment makes the difference." },
      { title: "Fewer no-shows", text: "The reminder cuts down absences." },
      { title: "Customers who come back", text: "A message at the right moment brings them back." },
      { title: "From your number", text: "Customers see your venue's name." },
    ],
    faq: [
      { q: "Do I have to change WhatsApp number?", a: "No, you don't have to change number: you connect the one you already use and keep replying from the WhatsApp Business app." },
      { q: "How much do the messages cost?", a: "Some WhatsApp messages have a cost set by Meta, of a few cents each. You always see it before sending." },
      { q: "Is it compliant with privacy rules?", a: "Yes: promotional messages only go to people who have given consent, which is recorded in the customer's profile." },
    ],
    related: ["clienti", "prenotazioni", "statistiche"],
  },
  {
    id: "statistiche",
    name: "Analytics",
    short: "What you sell and when",
    group: "Gestione",
    icon: "chart",
    tone: "violet",
    plan: "Pro",
    visual: "statistiche",
    seo: {
      title: "Restaurant analytics: dishes and peak hours",
      description:
        "Clear restaurant analytics: your most viewed and most ordered dishes, peak hours, covers and orders for the week. Simple to read. Try it free for 14 days.",
    },
    hero: {
      title: "Simple numbers, for better decisions.",
      lead: "Analytics tell you which dishes people look at most, which they order, at what time and where customers come from. All on one screen you understand in ten seconds, with no jargon.",
    },
    steps: [
      { title: "They collect themselves", text: "Every menu view, order and booking." },
      { title: "You read them", text: "Clear charts, no jargon." },
      { title: "You decide", text: "Change the menu, prices or opening hours with the numbers in hand." },
    ],
    sections: [
      {
        title: "The questions you really ask yourself",
        text: "Which pizza should I drop? Is it worth opening on Mondays? How much is takeaway worth? Analytics answer exactly that.",
        points: ["Most viewed and most ordered dishes", "Peak hours and days", "Covers and orders per week", "Visitors' languages"],
      },
    ],
    benefits: [
      { title: "A leaner menu", text: "Drop what nobody looks at." },
      { title: "The right prices", text: "See what really sells." },
      { title: "The right staffing", text: "Know when you need more hands." },
      { title: "Monthly report", text: "A clear summary every month." },
    ],
    faq: [
      { q: "Do the analytics respect privacy?", a: "Yes, the analytics respect privacy: they are aggregated, anonymous data on menu views." },
      { q: "Can I export them?", a: "Yes, you can export the analytics to Excel." },
    ],
    related: ["menu-digitale", "ordini-whatsapp", "clienti"],
  },
  {
    id: "staff-e-turni",
    name: "Staff and rotas",
    short: "Logins and rotas for the team",
    group: "Gestione",
    icon: "badge",
    tone: "grey",
    plan: "Premium",
    visual: "staff",
    seo: {
      title: "Restaurant staff rota and logins for your team",
      description:
        "A restaurant staff rota that everyone sees on their phone, and a login for each team member with the right permissions. No shared passwords.",
    },
    hero: {
      title: "The team always knows who's working and when.",
      lead: "Staff and rotas gives every team member their own login, with the right permissions, and puts the week's rota on everyone's phone. You prepare it once, and they stop asking you.",
    },
    steps: [
      { title: "Invite your team", text: "An invitation by email or WhatsApp." },
      { title: "Choose the permissions", text: "Who sees the bookings, who changes the menu." },
      { title: "Publish the rota", text: "The week for floor and kitchen, always up to date." },
    ],
    sections: [
      {
        title: "Everyone sees only what they need",
        text: "The waiter confirms bookings, the chef marks dishes as sold out, and only you see takings and settings.",
        points: ["Ready-made roles: owner, floor, kitchen", "Custom permissions", "A log of who changed what"],
      },
    ],
    benefits: [
      { title: "No shared passwords", text: "Everyone has their own login." },
      { title: "Clear rotas", text: "No more confusing WhatsApp groups." },
      { title: "More independence", text: "The team updates the menu without calling you." },
      { title: "Security", text: "Remove access for anyone who no longer works with you." },
    ],
    faq: [
      { q: "How many team members can I add?", a: "On the Premium plan you can add as many team members as you like: there is no limit on the number of logins." },
    ],
    related: ["sala-e-tavoli", "prenotazioni", "assistente"],
  },
  {
    id: "assistente",
    name: "Voice assistant",
    short: "Manage everything with a voice note",
    group: "Gestione",
    icon: "mic",
    tone: "blue",
    plan: "Pro",
    visual: "assistente",
    seo: {
      title: "Voice assistant for restaurant management",
      description:
        "A voice assistant for your restaurant: send a voice note on Telegram and it updates the menu, opening hours and bookings once you confirm. Try it free.",
    },
    hero: {
      title: "Say it with your voice. Your venue updates itself.",
      lead:
        "The voice assistant lets you run your venue with a message on Telegram while you're in the kitchen: \"mark the tonnarelli as sold out\", \"we close at 22:00 tonight\", \"table for four at 20:00, name Rossi\". It understands, asks you to confirm and updates everything.",
    },
    steps: [
      { title: "Connect Telegram", text: "From the dashboard, in one tap." },
      { title: "Speak or type", text: "The way you'd say it to a colleague." },
      { title: "Confirm", text: "The assistant sums it up and you confirm." },
    ],
    sections: [
      {
        title: "Everything you'd do from the dashboard",
        text: "Without opening anything, with your hands full. The assistant knows your menu, your opening hours and your bookings.",
        points: [
          "Mark dishes as sold out or available again",
          "Add, move or cancel bookings",
          "Close a sitting or block bookings",
          "Pause orders for half an hour",
          "Ask \"how many covers tonight?\"",
        ],
      },
      {
        title: "Safe by design",
        text: "Before every important change the assistant shows you what it's about to do and waits for your yes. Only the people you've connected can use it.",
        points: ["Confirmation before every change", "Authorised numbers only", "A history of every action"],
      },
    ],
    benefits: [
      { title: "Hands free", text: "A voice note while you knead." },
      { title: "Ten seconds", text: "Faster than any menu." },
      { title: "For the whole team", text: "Each person with their own permissions." },
      { title: "It speaks your venue's language", text: "It knows the names of your dishes." },
    ],
    faq: [
      { q: "Does it work on WhatsApp too?", a: "For now the assistant works on Telegram, which is free. WhatsApp will come later." },
      { q: "What if it misunderstands?", a: "If it misunderstands, nothing happens: before changing anything it shows you the summary and waits for your confirmation." },
      { q: "Who can use it?", a: "Only the people you connect from the dashboard can use it, with the permissions you choose." },
    ],
    related: ["ferie-e-chiusure", "prenotazioni", "menu-digitale"],
  },
];

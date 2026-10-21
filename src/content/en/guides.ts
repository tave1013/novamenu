import type { Guide } from "../guides";
import { sectorGuides } from "./guides-settori";
import { formatoPrezzo, prezzoMensile } from "@/config/prezzi";

/* Contenuti in inglese: stessa forma del file italiano, generati a partire da quello. */
const baseGuides: Omit<Guide, "slug">[] = [
  {
    id: "come-creare-menu-digitale-qr",
    seo: {
      title: "How to create a QR code menu for your restaurant",
      description:
        "How to create a QR code digital menu starting from your paper menu: what you need, how to organise it, where to put the QR code and what to avoid.",
    },
    title: "How to create a QR code digital menu for your venue",
    description:
      "A practical guide to moving from a paper menu to a QR code digital menu: what you need, how to organise it, where to put the QR code and the mistakes to avoid.",
    date: "2026-10-01",
    readMinutes: 10,
    related: ["menu-digitale", "importa-menu-ai", "traduzioni"],
    arts: {
      scheda: {
        kind: "catalog",
        shop: "Trattoria del Borgo",
        status: "Kitchen open until 22:30",
        tabs: ["Starters", "Pasta", "Mains", "Desserts"],
        items: [
          { name: "Tajarin al ragù", desc: "Hand-rolled egg pasta, veal ragù. Gluten, eggs, celery", price: "12,00", c: "#fde68a" },
          { name: "Agnolotti del plin", desc: "Three-meat filling, roast meat jus. Gluten, eggs, milk", price: "13,00", tag: "House special", c: "#fed7aa" },
          { name: "Vitello tonnato", desc: "House sauce with capers. Eggs, fish", price: "11,00", c: "#e7d5b5" },
        ],
      },
    },
    html: `
<p>A QR code digital menu is a web page that customers open by scanning a code on the table. There's no app to download: the phone's camera is enough. For the venue, it means being able to change dishes and prices at any time, without reprinting anything.</p>
<p>In this guide we look at how to create a good one, from organising the dishes to printing the QR code.</p>

<h2>1. Start from the menu you already have</h2>
<p>You don't need to rewrite everything from scratch. The latest platforms let you <a href="/funzionalita/importa-menu-ai/">import your menu from a photo or a PDF</a>: artificial intelligence recognises categories, dishes, descriptions and prices, and you only have to check.</p>
<p>Before importing it, though, it's worth tidying up. A digital menu has no space limits, but a menu that's too long is still hard to read, even on a screen.</p>

<h2>2. Organise the categories the way customers look for them</h2>
<p>At the table, customers scroll with their thumb. Categories should be few, clear and in the order people eat.</p>
<ul>
<li><strong>Starters, pasta, mains, sides, desserts, drinks</strong> for a restaurant.</li>
<li><strong>Classic pizzas, special pizzas, fried starters, soft drinks, desserts</strong> for a pizzeria.</li>
<li>Avoid categories with a single dish: it's better to merge them.</li>
</ul>

<h2>3. Every dish: name, short description, price, allergens</h2>
<p>A good dish entry has a recognisable name, a one-line description with the main ingredients, the price and the allergens. Photos help, but only if they're good: a dark photo does more harm than no photo at all.</p>
<p>For allergens you can follow our guide on <a href="/guide/allergeni-nel-menu/">how to show the 14 allergens on your menu</a>.</p>

<h3>How to write a description that makes people hungry</h3>
<p>A good description says in one line what's in the dish and why it's special. Compare:</p>
<ul>
<li><strong>Before</strong>: "Tajarin al ragù."</li>
<li><strong>After</strong>: "Hand-rolled tajarin made with 40 egg yolks, veal ragù cooked for six hours."</li>
</ul>
<p>You don't need to be poetic: a quality ingredient, a method or a place of origin is enough. And always the allergens at the end.</p>
{{art:scheda}}

<h2>4. Think about tourists</h2>
<p>If your venue serves foreign customers, a translated menu makes a difference. The advantage of digital is that the menu can open by itself in the phone's language. Be careful with generic automatic translations: the names of traditional dishes, such as carbonara or fior di latte, should be left in Italian and explained.</p>

<h2>5. Where to put the QR code</h2>
<ul>
<li><strong>On the table</strong>, on a stable stand or a hard-wearing sticker.</li>
<li><strong>In the window</strong>, for people looking at the menu before coming in.</li>
<li><strong>On receipts, flyers and pizza boxes</strong>, for takeaway orders.</li>
<li><strong>Online</strong>: on Google, Instagram and Facebook you post the link, not the QR code.</li>
</ul>
<p>Next to the QR code, always write a clear phrase such as "Scan to see the menu". Not everyone understands it at first glance.</p>

<h2>6. The most common mistakes</h2>
<ul>
<li><strong>The PDF of the paper menu</strong> put online: on a phone it's hard to read and has to be zoomed.</li>
<li><strong>A QR code linked to an address that changes</strong>: if you change supplier you have to reprint everything. An address that stays yours is better.</li>
<li><strong>Prices not updated</strong>: the whole advantage of digital is changing them in a second.</li>
<li><strong>No paper alternative</strong>: always keep a few printed menus for those who prefer them.</li>
</ul>

<h2>7. Keep it alive</h2>
<p>A digital menu is at its best when it changes. A few simple habits:</p>
<ul>
<li><strong>The dish of the day</strong> at the top, updated every morning.</li>
<li><strong>Sold-out dishes</strong> marked as soon as they run out, not at the end of the evening.</li>
<li><strong>Seasonal additions</strong> with a "New" tag for a few weeks.</li>
<li><strong>A review once a month</strong>: remove the dishes nobody orders and fix the descriptions that prompt questions.</li>
</ul>

<div class="box">
<p>Checklist before printing your QR codes</p>
<ol>
<li>Every dish has a name, a short description, a price and allergens.</li>
<li>The categories follow the order in which people eat.</li>
<li>The menu opens well on an old phone and with a poor connection.</li>
<li>The menu's address is yours and won't change.</li>
<li>Next to the QR code it says "Scan to see the menu".</li>
<li>A few printed copies remain in the venue for those who prefer them.</li>
</ol>
</div>

<h2>How much it costs</h2>
<p>A good digital menu costs less than one reprint a year. With {{brand}} you start from the Base plan at ${formatoPrezzo(prezzoMensile("base", "eur"), "eur", "en-GB")} a month excl. VAT (${formatoPrezzo(prezzoMensile("base", "gbp"), "gbp", "en-GB")} in the UK), with AI import, QR code and unlimited updates. You can try it free for 14 days.</p>
`,
  },
  {
    id: "allergeni-nel-menu",
    seo: {
      title: "Allergens on your menu: the 14 to declare",
      description:
        "Allergens on a restaurant menu, digital or paper: the 14 listed in EU Regulation 1169/2011 and how to show them clearly in a restaurant or pizzeria.",
    },
    title: "Allergens on your menu: the 14 you must declare and how to show them",
    description:
      "The 14 allergens set out in EU Regulation 1169/2011, how to show them on a restaurant or pizzeria menu and how to keep them clear on a digital menu too.",
    date: "2026-09-24",
    readMinutes: 9,
    related: ["menu-digitale", "traduzioni", "importa-menu-ai"],
    html: `
<p>Anyone who serves food must inform customers about the presence of allergens. In Europe the reference rule is <strong>EU Regulation 1169/2011</strong>, which lists 14 substances or products that can cause allergies or intolerances.</p>
<p>This guide is a practical summary and is no substitute for professional advice: for the details of your own case, check with your trade association or your local health authority.</p>

<h2>The 14 allergens to declare</h2>
<table>
<thead><tr><th>Allergen</th><th>Where it's often found</th></tr></thead>
<tbody>
<tr><td>Cereals containing gluten</td><td>Bread, pasta, pizza, breadcrumb coatings, beer</td></tr>
<tr><td>Crustaceans</td><td>Prawns, langoustines, crabs</td></tr>
<tr><td>Eggs</td><td>Fresh pasta, desserts, mayonnaise</td></tr>
<tr><td>Fish</td><td>Anchovies, anchovy sauce, some stocks</td></tr>
<tr><td>Peanuts</td><td>Desserts, sauces, seed oils</td></tr>
<tr><td>Soya</td><td>Sauces, plant-based products, margarines</td></tr>
<tr><td>Milk</td><td>Cheese, butter, cream, mozzarella</td></tr>
<tr><td>Tree nuts</td><td>Pistachios, walnuts, hazelnuts, almonds</td></tr>
<tr><td>Celery</td><td>Soffritto, stocks, sauces</td></tr>
<tr><td>Mustard</td><td>Sauces and dressings</td></tr>
<tr><td>Sesame seeds</td><td>Bread, grissini, breadcrumb coatings</td></tr>
<tr><td>Sulphur dioxide and sulphites</td><td>Wine, dried fruit, vinegar</td></tr>
<tr><td>Lupin</td><td>Flours and some baked goods</td></tr>
<tr><td>Molluscs</td><td>Mussels, clams, squid, octopus</td></tr>
</tbody>
</table>

<h2>How to show them on the menu</h2>
<p>The clearest way is to show the allergens next to each dish, by name or with an icon accompanied by a key. Other solutions accepted in practice, such as a register available on request, make life harder for both the customer and the staff.</p>
<ul>
<li><strong>Next to the dish</strong>: the customer sees straight away what it contains.</li>
<li><strong>With icons</strong>: always with a key, because not everyone recognises them.</li>
<li><strong>With a note on cross-contamination</strong>: for example "Tree nuts and sesame are also used in our kitchen".</li>
</ul>

<h2>The advantage of a digital menu</h2>
<p>In a <a href="/funzionalita/menu-digitale/">digital menu</a> the allergens are updated together with the recipe, they are translated into the menu's languages and customers can filter the dishes, for example hiding everything that contains milk.</p>
<p>When you change an ingredient, you update the allergens at the same moment: it's the simplest way to avoid old information lying around.</p>

<h2>A quick checklist</h2>
<ol>
<li>For every dish, check the ingredients of all the prepared components (sauces, doughs, bases).</li>
<li>Mark allergens for drinks and desserts too.</li>
<li>Train your staff: they need to know where to find the information and what to answer.</li>
<li>Review the menu every time a supplier or a recipe changes.</li>
</ol>

<h2>Cross-contamination: what to write</h2>
<p>Even if a dish doesn't have an allergen among its ingredients, it can come into contact with it in the kitchen: the same fryer, the same worktop, the same flour in the air. It's good practice to say so clearly, with a general note at the bottom of the menu and, where needed, next to the dish.</p>
<blockquote><p>Gluten, tree nuts and sesame are also used in our kitchen. If you have an allergy or intolerance, please speak to our staff before ordering.</p></blockquote>
<p>Be careful with wording such as "gluten-free": it has precise rules. If you don't have a dedicated process, it's more accurate to talk about dishes "prepared with gluten-free ingredients", explaining the risk of cross-contamination.</p>

<h2>What your staff should answer</h2>
<p>The question "is there anything without milk?" always comes at the least convenient moment. Staff need to know three things: where to find the information, what to say and when to call the kitchen.</p>
<ol>
<li><strong>Check the dish's allergens</strong> on the menu or on the tablet.</li>
<li><strong>Don't improvise</strong>: "I don't think so" is not an answer. If there's any doubt, ask the kitchen.</li>
<li><strong>Tell the kitchen</strong> about the allergy together with the order, in writing, not out loud.</li>
</ol>

<h2>An example of a well-made menu</h2>
<table>
<thead><tr><th>Dish</th><th>Allergens</th></tr></thead>
<tbody>
<tr><td>Margherita pizza</td><td>Gluten, milk</td></tr>
<tr><td>Tajarin al ragù</td><td>Gluten, eggs, celery</td></tr>
<tr><td>Vitello tonnato</td><td>Eggs, fish</td></tr>
<tr><td>Tiramisù</td><td>Gluten, eggs, milk</td></tr>
<tr><td>Lemon sorbet</td><td>None of the 14</td></tr>
</tbody>
</table>

<div class="box">
<p>To do this week</p>
<ul>
<li>Print the table of the 14 allergens and hang it in the kitchen.</li>
<li>Check the specification sheets of the prepared products you buy: sauces, bases, ice creams, coatings.</li>
<li>Add the cross-contamination note at the bottom of the menu.</li>
<li>Run a test with your staff: "A customer is allergic to hazelnuts, what do you recommend?"</li>
</ul>
</div>
`,
  },
  {
    id: "ordini-asporto-whatsapp-senza-commissioni",
    seo: {
      title: "Takeaway orders on WhatsApp: how to run them",
      description:
        "How to take takeaway orders on WhatsApp with a collection time and without paying commission to delivery apps. Practical advice for pizzerias and restaurants.",
    },
    title: "Takeaway orders on WhatsApp without commission: how to organise them",
    description:
      "How to take takeaway orders on WhatsApp in an orderly way, with a collection time and without paying commission to delivery apps. Practical advice for pizzerias and restaurants.",
    date: "2026-09-17",
    readMinutes: 10,
    related: ["ordini-whatsapp", "menu-digitale", "clienti"],
    arts: {
      ordine: {
        kind: "order",
        who: "Marta Conti",
        lines: ["2 × Margherita", "1 × Capricciosa, no mushrooms", "1 × Coca-Cola 33 cl"],
        total: "£ 25,50",
        when: "Collection Friday 20:15",
        extra: "Note: buzzer Conti, coming on foot",
      },
    },
    html: `
<p>Delivery apps bring visibility, but they generally keep a significant percentage of every order. For customers who already know you, the ones who order every week, that commission is a cost you can avoid.</p>
<p>WhatsApp is the channel your customers already use. The problem is that, without organisation, it becomes chaos: voice messages, incomplete orders, unclear times.</p>

<h2>The problem with orders taken "by hand"</h2>
<ul>
<li>The customer writes "two margheritas and a diavola for tonight", with no time.</li>
<li>You have to reply, ask, confirm: time taken away from the kitchen.</li>
<li>Extras and options get lost between one message and the next.</li>
<li>At peak times the messages pile up and someone gets left behind.</li>
</ul>

<h2>The solution: the customer orders from the menu, you receive the order already written</h2>
<p>With a <a href="/funzionalita/ordini-whatsapp/">WhatsApp ordering system</a> the customer opens your digital menu, adds dishes to the basket, chooses a collection time from those available and sends. On WhatsApp you get a tidy message with dishes, options, total and time.</p>
<p>This is what an order looks like when it arrives complete: no questions, no calling back.</p>
{{art:ordine}}

<h2>How to organise collection slots</h2>
<ol>
<li><strong>Divide the evening into slots</strong> of 15 minutes.</li>
<li><strong>Decide how many orders you can handle per slot</strong>, based on your oven and your staff.</li>
<li><strong>Set a minimum notice</strong>, for example 30 minutes.</li>
<li><strong>Keep a pause button</strong> for the moments when the kitchen is full.</li>
</ol>

<h2>How much you can save</h2>
<p>Let's take an example. If every week you receive 80 takeaway orders of £25, and a platform keeps 20 per cent, you pay about £400 a month in commission. By moving even just half of those orders to your own direct channels, you save about £200 a month, far more than the cost of a subscription.</p>

<h2>How to let people know about the new channel</h2>
<ul>
<li>A QR code on the pizza box and on receipts: "Next time, order here".</li>
<li>The link in your Instagram bio and on your Google profile.</li>
<li>A message to regulars who have given consent.</li>
</ul>

<h2>Set up WhatsApp Business properly</h2>
<p>If you still use ordinary WhatsApp for your venue, switch to WhatsApp Business: it's free and gives you useful tools for orders.</p>
<ul>
<li><strong>A complete profile</strong>: opening hours, address, link to the menu.</li>
<li><strong>A greeting message</strong> for people writing for the first time, with the link to order.</li>
<li><strong>An away message</strong> outside opening hours, explaining when you reopen and how to place an order for tomorrow.</li>
<li><strong>Quick replies</strong> for the phrases you write most often, such as the order confirmation.</li>
</ul>
<blockquote><p>Hi! To order, use our menu: choose your pizzas and collection time, and it all reaches us here. [link] We reply within a few minutes.</p></blockquote>

<h2>Always confirm, in a few seconds</h2>
<p>A customer who has ordered wants to know the order has arrived. A short confirmation, with the time, is enough. If there's a problem, such as a product that has run out, suggest an alternative straight away instead of asking "what would you like to do?".</p>
<blockquote><p>Got it Marta, see you at 20:15. The capricciosa will be without mushrooms, as you asked.</p></blockquote>

<h2>Mistakes to avoid</h2>
<ul>
<li><strong>Accepting voice orders</strong>: they have to be listened to, interpreted and often called back. Reply with the link.</li>
<li><strong>Not asking for a time</strong>: every order must have its slot.</li>
<li><strong>Using a personal number</strong>: the venue's number must stay with the venue, even when staff change.</li>
<li><strong>Sending promotions to everyone</strong>: promotional messages go only to those who have given consent.</li>
</ul>
`,
  },
  {
    id: "ridurre-no-show-ristorante",
    seo: {
      title: "How to reduce no-shows at your restaurant",
      description:
        "5 practical ways to reduce restaurant no-shows: WhatsApp reminders, easy cancellation, a waiting list and confirmation for groups. Fewer empty tables.",
    },
    title: "How to reduce empty tables caused by no-show bookings",
    description:
      "Five practical ways to reduce no-shows at your restaurant: WhatsApp reminders, easy cancellation, a waiting list, confirmation for groups and customer history.",
    date: "2026-09-10",
    readMinutes: 9,
    related: ["prenotazioni", "automazioni-whatsapp", "clienti"],
    arts: {
      sera: {
        kind: "booking",
        title: "Saturday evening",
        sub: "Reminders sent yesterday at 11:00",
        used: 58,
        total: 70,
        list: [
          { name: "Rossi family", n: 6, time: "20:00", note: "Confirmed" },
          { name: "Marco and Giulia", n: 2, time: "20:15", note: "Confirmed" },
          { name: "Luca Ferrero", n: 4, time: "20:30", note: "Cancelled, table reassigned" },
        ],
      },
    },
    html: `
<p>A table that's booked and left empty hurts twice: you lose the takings and you've said no to someone else. It's called a <em>no-show</em>, and it happens to every venue. It can't be eliminated altogether, but it can be cut right down.</p>

<h2>1. A reminder the day before</h2>
<p>The most effective way is the simplest. A WhatsApp message the day before, with two buttons, <strong>Confirm</strong> and <strong>Cancel</strong>. Those who had forgotten remember, and those who can't come say so with one tap instead of vanishing.</p>
<p>An example of a reminder that works: short, with the booking details and a simple way to reply.</p>
<blockquote><p>Hi Luca, a reminder of your booking tomorrow, Saturday, at 20:30 for 4 people at Trattoria del Borgo. Reply YES to confirm or NO if you can't make it: we'll free the table for someone else. Thank you!</p></blockquote>
{{art:sera}}

<h2>2. Make it easy to cancel</h2>
<p>Many people don't turn up because phoning to cancel is a nuisance. If cancelling takes one tap, they do it. And the table is free again in time to be reassigned.</p>

<h2>3. A waiting list</h2>
<p>When you're full, don't just say no: take a name and number. If a table frees up, you let the people on the list know straight away.</p>

<h2>4. Compulsory confirmation for groups</h2>
<p>Large tables weigh more. For groups above a certain number of people you can decide always to confirm by hand and to ask for an explicit confirmation the day before.</p>

<h2>5. Customer history</h2>
<p>With a <a href="/funzionalita/clienti/">profile for every customer</a> you know who always turns up and who has already skipped two bookings. With the latter you can ask for one more confirmation.</p>

<h2>Where to start</h2>
<p>If you take bookings by phone today, the first step is an <a href="/funzionalita/prenotazioni/">online booking system</a> that collects the customer's number. From there, reminders and easy cancellation are switched on with a toggle.</p>

<h2>A deposit: yes or no?</h2>
<p>For special evenings, such as Valentine's Day, New Year's Eve or holiday lunches, many venues ask for a deposit at the time of booking. It works, but it should be used in moderation: for an ordinary Friday dinner it risks sending people to another restaurant. A middle way is to ask for it only for large groups and for dates when you already know you'll be turning many people away.</p>

<h2>Don't make up for it with overbooking</h2>
<p>Accepting more bookings than you have seats, counting on a few absences, looks like a clever solution. But on the evening when everyone turns up, someone waits standing or is sent away, and that customer doesn't come back. It's better to work on reminders, easy cancellation and a waiting list.</p>

<h2>Measure the results</h2>
<p>For a month, note down every evening how many bookings you had and how many people didn't turn up without letting you know. Then switch on reminders and easy cancellation and compare the following month. It's the simplest way to see how much you're winning back.</p>

<div class="box">
<p>In short</p>
<ol>
<li>Always collect a phone number with the booking.</li>
<li>Send a reminder the day before, late in the morning.</li>
<li>Make cancelling as easy as confirming.</li>
<li>Keep a waiting list for full evenings.</li>
<li>Ask for an explicit confirmation from groups and from anyone who has already skipped a booking.</li>
</ol>
</div>
`,
  },
];

/** Dalla più recente alla più vecchia, come in italiano. */
export const guides: Omit<Guide, "slug">[] = [...sectorGuides, ...baseGuides].sort((a, b) => b.date.localeCompare(a.date));

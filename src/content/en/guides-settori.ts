import type { Guide } from "../guides";

/* Contenuti in inglese: stessa forma del file italiano, generati a partire da quello. */
export const sectorGuides: Omit<Guide, "slug">[] = [
  {
    id: "pizzeria-ore-perse-al-telefono",
    seo: {
      title: "Pizzeria takeaway: hours lost on the phone",
      description:
        "Work out how long your pizzeria spends on takeaway phone calls and find 7 practical ways to cut them: written orders, collection slots and a pause button.",
    },
    title: "Pizzeria: how many hours you lose on the phone every month (and how to win them back)",
    description:
      "Work out the time spent on takeaway phone calls and find 7 practical ways to cut them: written orders, collection slots, your link everywhere and a pause when the oven is full.",
    date: "2026-10-12",
    readMinutes: 11,
    sector: "pizzerie",
    related: ["ordini-whatsapp", "menu-digitale", "assistente"],
    arts: {
      conti: {
        kind: "calc",
        title: "Takeaway phone calls in a month",
        rows: [
          { label: "Phone calls in one evening", value: "25" },
          { label: "Minutes per call, including details and repeats", value: "3 min" },
          { label: "Evenings open per month", value: "22" },
        ],
        result: { label: "Hours on the phone per month", value: "about 27 hours" },
        note: "Example calculation. Try it with your own numbers: just count the calls on one Saturday.",
      },
      fasce: {
        kind: "slots",
        title: "Choose when to collect",
        days: [{ d: "Fri", n: "17" }, { d: "Sat", n: "18" }, { d: "Sun", n: "19" }],
        slots: [
          { t: "19:00", s: "free" }, { t: "19:15", s: "few" }, { t: "19:30", s: "full" },
          { t: "19:45", s: "sel" }, { t: "20:00", s: "full" }, { t: "20:15", s: "free" },
        ],
        note: "Collection Saturday at 19:45",
      },
      ordine: {
        kind: "order",
        who: "Luca Bianchi",
        lines: ["2 × Margherita", "1 × Diavola, wholemeal dough", "1 × Chips"],
        total: "£ 27,50",
        when: "Collection Saturday 19:45",
        extra: "Note: cut into slices, thanks",
      },
    },
    html: `
<p>On a Saturday night the pizzeria's phone rings non-stop. Each call seems short, but between "what pizzas do you have?", "how much is the bufala?", "can you repeat the total?" and the name to write on a scrap of paper, the minutes add up. And often the person answering is exactly the one who should be at the oven or the counter.</p>
<p>In this guide we do the maths first, then look at seven practical ways to move orders from the phone to writing, without losing the customers who prefer to call.</p>

<h2>First of all, do the maths</h2>
<p>Take any Saturday and note on a sheet of paper how many takeaway calls you receive. Then estimate how long a call lasts on average, counting the ones where the customer rings back to change something.</p>
{{art:conti}}
<p>Even with cautious numbers you easily get to more than twenty hours a month spent on the phone, almost always at peak times. Those are hours in which one person isn't making dough, serving or watching the oven. And they're also the hours when mistakes are made: a name misheard, a pizza forgotten, a collection time that overlaps with ten others.</p>

<h2>1. Move the order from voice to writing</h2>
<p>The first step is to give customers a way to order in writing. A written order is read in five seconds, doesn't have to be repeated and stays there: if there's a doubt you check it again, you don't have to remember it.</p>
<p>The simplest channel in Italy is WhatsApp, because everyone uses it, older customers included. The customer chooses from the online menu, the basket turns into a ready-written message and you receive it on your venue's number. We cover this in detail in the guide on <a href="/guide/ordini-asporto-whatsapp-senza-commissioni/">how to organise takeaway orders on WhatsApp without commission</a>.</p>
{{art:ordine}}

<h2>2. Let the menu answer for you</h2>
<p>For one evening, listen to the questions you're asked on the phone. They're almost always the same: the prices, the doughs available, whether an ingredient can be left out, whether there's anything gluten-free, how late you can collect. Every recurring question is a piece of information your online menu isn't giving clearly enough.</p>
<ul>
<li><strong>Prices always visible</strong>, including extras and special doughs.</li>
<li><strong>Options written down</strong>: size, dough, "without" and "with", each with its price.</li>
<li><strong>Allergens shown</strong> for every pizza, as we explain in the guide on the <a href="/guide/allergeni-nel-menu/">14 allergens on your menu</a>.</li>
<li><strong>Takeaway hours</strong> at the top, not hidden at the bottom of the page.</li>
</ul>

<h2>3. Give every collection slot a limit</h2>
<p>The problem on Saturdays isn't the number of orders, it's that they all want 20:00. If the oven turns out at most ten pizzas every quarter of an hour, accepting thirty orders for 20:00 means customers waiting and pizzas going cold.</p>
<p>The solution is to divide the evening into slots, for example every fifteen minutes, and decide how many pizzas you accept in each. When a slot is full the customer only sees the free ones and chooses a different time by themselves.</p>
{{art:fasce}}
<p>At first it feels like giving up orders. In reality the opposite happens: the customer who finds 20:00 full chooses 20:15, instead of calling, finding the line busy and ordering elsewhere.</p>

<h2>4. Put the link everywhere, not just on your website</h2>
<p>An ordering system only works if customers find it. The link to the menu must be everywhere your phone number is today:</p>
<ul>
<li>Your Google profile, in the field for orders and as the website.</li>
<li>Your Instagram bio and Facebook page.</li>
<li>A QR code on the pizza box and on the receipt: the next order starts from there.</li>
<li>A sticker in the window, for people walking past when you're closed.</li>
<li>The automatic reply on WhatsApp Business: "Hi! To order, use this link and we'll reply in a moment."</li>
</ul>

<h2>5. Pause orders when the oven is full</h2>
<p>There are evenings when, because of a table of twenty or an oven that's struggling, you can't keep up with everything. Instead of letting the phone ring, pause online orders for half an hour. The customer sees a clear message and the first available slot, and you don't build up delays that drag on until the end of the evening.</p>

<h2>6. Mark sold-out items in real time</h2>
<p>Has the bufala run out at 20:15? If the online menu keeps offering it, you'll get orders you have to correct, with a phone call. Marking it sold out from your phone takes two seconds and removes it from the choices. With a voice assistant you can even do it out loud, with your hands in the dough: "bufala's finished".</p>

<h2>7. Don't switch off the phone, change the script</h2>
<p>Some customers will keep calling, and that's fine. But you can change the way you answer: "If you like I'll send you the link on WhatsApp, so you can choose at your own pace and see the free times". After two or three times many regulars order directly in writing.</p>
<p>You can also record a voicemail message for the moments when you can't answer, giving the link to order.</p>

<h2>A script for whoever answers the phone</h2>
<p>Whoever answers the phone on a Saturday night needs ready-made phrases, short and always the same. Write them on a sheet next to the till:</p>
<blockquote><p>"Good evening! If you like I'll send you the link on WhatsApp right now: you can choose at your own pace, see the free times and find everything ready."</p></blockquote>
<blockquote><p>"We're full for 20:00 tonight, I can give you 20:15 or 20:30. Or from the link you can see all the times still free."</p></blockquote>
<p>The second phrase is important: don't just say "we're full". Always offer an alternative time, otherwise the customer orders elsewhere.</p>

<h2>Use the slow days to move orders</h2>
<p>On Tuesdays and Wednesdays the oven works at half speed. You can use those evenings to get customers used to ordering in writing, with offers that only apply online:</p>
<ul>
<li><strong>The pizza of the month</strong>, available only from the online menu, with seasonal ingredients.</li>
<li><strong>A fixed-price combination</strong>, for example two classic pizzas and a soft drink, for online orders only from Tuesday to Thursday.</li>
<li><strong>The early slots</strong>: anyone collecting between 19:00 and 19:30 finds a little surprise, such as a portion of chips. It helps you fill the empty slots and ease the 20:00 ones.</li>
</ul>

<h2>The box that brings the next order</h2>
<p>The pizza box stays on the customer's table at home for the whole of dinner. It's the best place for your link. A sticker with the QR code and a simple phrase is enough:</p>
<blockquote><p>"Did you enjoy it? Next time, order from here in 30 seconds, without phoning."</p></blockquote>

<div class="box">
<p>Checklist for your first Saturday</p>
<ol>
<li>Online menu complete with prices, options and allergens.</li>
<li>15-minute collection slots with a pizza limit agreed with your pizza chef.</li>
<li>Link on your Google profile, on Instagram and in the WhatsApp Business automatic reply.</li>
<li>Stickers with the QR code on the boxes and in the window.</li>
<li>Phone script next to the till.</li>
<li>A count of this Saturday's phone calls, to compare in a month's time.</li>
</ol>
</div>

<h2>Mistakes to avoid</h2>
<ul>
<li><strong>Accepting orders without a time</strong>: every order must have its collection slot, even those taken by phone.</li>
<li><strong>Slots that are too wide</strong>: "between 19:00 and 21:00" is no use at all. Quarter-hours are better.</li>
<li><strong>Not updating sold-out items</strong>: a customer who orders the bufala and finds it changed at collection won't order online again.</li>
<li><strong>Replying to messages one by one</strong>: if the basket arrives complete, confirming is enough.</li>
</ul>

<h2>What to expect in the first weeks</h2>
<p>The switch isn't immediate. In the first two or three weeks written orders will be a part of the total, then they'll grow as the link gets around and customers get used to it. It's worth measuring: count the calls on a Saturday before you start and on a Saturday a month later. It's the most honest way to see how many hours you've won back.</p>

<h2>How to do it with {{brand}}</h2>
<p>With {{brand}}, the online menu, WhatsApp orders with collection slots, the order pause and sold-out items are all in one place, and you pay no commission on orders. If you'd like to see how it would work with your menu, <a href="/demo/">book a 20-minute demo</a> or read the page for <a href="/settori/pizzerie/">pizzerias</a>.</p>
`,
  },
  {
    id: "gastronomia-vendere-di-piu-a-pranzo",
    seo: {
      title: "Deli: 8 ideas to sell more at lunchtime",
      description:
        "8 ideas for your deli or rotisserie: dishes of the day published early, pre-orders with a collection slot, orders from nearby offices and festive menus.",
    },
    title: "Delis and rotisseries: 8 practical ideas to sell more at lunchtime",
    description:
      "Dishes of the day published early, pre-orders with a collection slot, group orders from offices and festive menus in advance: 8 practical ideas for your deli.",
    date: "2026-10-11",
    readMinutes: 12,
    sector: "gastronomie",
    related: ["ordini-whatsapp", "menu-digitale", "clienti"],
    arts: {
      conti: {
        kind: "calc",
        title: "What lunch pre-orders are worth",
        rows: [
          { label: "Extra pre-orders per day", value: "10" },
          { label: "Average spend at lunch", value: "£ 14" },
          { label: "Days open per month", value: "24" },
        ],
        result: { label: "Extra takings per month", value: "£ 3.360" },
        note: "Example calculation. The point isn't the exact number: even a few more orders a day, repeated for a month, add up to a meaningful amount.",
      },
      fasce: {
        kind: "slots",
        title: "Collection today",
        days: [{ d: "Today", n: "14" }, { d: "Wed", n: "15" }, { d: "Thu", n: "16" }],
        slots: [
          { t: "12:00", s: "full" }, { t: "12:15", s: "few" }, { t: "12:30", s: "sel" },
          { t: "12:45", s: "free" }, { t: "13:00", s: "free" }, { t: "13:15", s: "free" },
        ],
        note: "Collection today at 12:30",
      },
      giornata: {
        kind: "dayparts",
        rows: [
          { t: "Lunch", time: "11:30 to 14:30", on: true, items: "Dishes of the day, pre-orders by 11:30" },
          { t: "End of lunch", time: "14:30 to 15:30", on: true, items: "Remaining portions at 30% off" },
          { t: "Dinner box", time: "17:00 to 19:30", on: true, items: "Pasta, main and side to heat up at home" },
        ],
      },
      feste: {
        kind: "order",
        who: "Bertola family",
        lines: ["800 g × Vitello tonnato", "1.5 kg × Baked lasagne", "2 × Roast chicken"],
        total: "£ 76,60",
        when: "Collection 24 December 11:00",
        extra: "Note: lasagne in two trays",
      },
    },
    html: `
<p>In a deli, lunch is decided in an hour and a half. Between 12:00 and 13:30 there's a queue, the counter empties and anyone who comes in at 13:15 finds half the dishes gone. The rest of the day is quieter, but that's exactly where you can prepare the ground to sell more.</p>
<p>Here are eight practical ideas, none of which requires you to change the way you cook.</p>

<h2>Why it pays to work on pre-orders</h2>
<p>A customer who orders at 10:00 to collect at 12:30 doesn't queue, doesn't find the dish sold out and doesn't go somewhere else because it was too busy. For you it's a certain order, already paid for or nearly, that you can prepare calmly.</p>
{{art:conti}}

<h2>1. Publish the dishes of the day by 9:00</h2>
<p>Customers decide where to have lunch between 9:00 and 11:00, often on their phone. If at that time they don't know what's on your counter, they choose out of habit or convenience. Publishing the dishes of the day early, with the price per kilo or per portion, puts you on their list.</p>
<ul>
<li>Update the online menu from your phone as soon as the dishes are ready.</li>
<li>Share the same link in your WhatsApp status and Instagram stories.</li>
<li>A photo of the real counter, even one taken on your phone, is worth more than ten catalogue photos.</li>
</ul>

<h2>2. Let customers choose a collection slot</h2>
<p>Divide lunch into quarter-hour slots and decide how many orders you accept in each. The customer chooses when to come by, you prepare in order of time and the counter doesn't jam.</p>
{{art:fasce}}
<p>Close pre-orders at a fixed time, for example 11:30, so you know exactly what to put aside before the queue arrives.</p>

<h2>3. Weight or portion: offer both</h2>
<p>The price per kilo is right for you, but for someone ordering on a phone it's hard to picture 300 grams of lasagne. Next to the price per kilo, offer a standard portion at a fixed price, for example "portion about 350 g, £6.50". Those who want a precise quantity write it in, and those in a hurry choose the portion.</p>

<h2>4. Offer a "complete lunch"</h2>
<p>A pasta dish, a side and a small bottle of water at a single price work better than three separate products. The customer doesn't have to think, the average spend goes up and you know in advance how many portions of sides to prepare.</p>

<h2>5. Look for nearby offices</h2>
<p>Practices, shops, building sites, clinics: the people who work around you have lunch every day, and often as a group. Bring a card with the menu QR code and suggest a group order with a single collection: one person gathers colleagues' choices by 11:00, comes by at 12:30 and collects everything together.</p>
<p>These are customers who, if they're happy, come back every week.</p>

<h2>6. Open the festive menu well in advance</h2>
<p>Christmas, Easter, Palm Sunday, the mid-August holiday: these are the days when a deli works hardest, but also the ones when orders pile on top of each other. Opening orders two or three weeks ahead lets you know the quantities and buy your ingredients at the right time.</p>
{{art:feste}}
<p>With written orders you also get the total per product: how many kilos of vitello tonnato, how many trays of lasagne, how many chickens. It's your shopping list, already done.</p>

<h2>7. Keep a list of your regulars</h2>
<p>Every order brings a name and a number. With the customer's consent, you can send a message when there's a dish they usually order or when you open the festive menu. One targeted message a month works much better than a flyer.</p>
<p>Mind the consent: promotional messages should be sent only to people who have agreed to receive them.</p>

<h2>8. Reduce end-of-day waste</h2>
<p>The more orders arrive early, the more predictable production becomes. Prepare what's already ordered plus a margin for the counter, and watch for a few weeks how much is left over. Often it's enough to move one tray from one day to another to turn waste into profit.</p>

<h2>9. Publish the week's calendar</h2>
<p>Many customers choose a deli for one specific dish: Tuesday's tripe, Friday's salt cod, Sunday's lasagne. If on Monday you publish the calendar of the week's dishes, customers plan around it and you already know how many portions to prepare.</p>
<table>
<tr><th>Day</th><th>Regular dish</th></tr>
<tr><td>Tuesday</td><td>Stewed tripe</td></tr>
<tr><td>Wednesday</td><td>Bollito misto with sauces</td></tr>
<tr><td>Friday</td><td>Salt cod and fish dishes</td></tr>
<tr><td>Sunday</td><td>Lasagne, roasts and sides to order by Saturday</td></tr>
</table>

<h2>10. After lunch: end of day and dinner box</h2>
<p>Lunch isn't the only moment of the day. What's left at 14:30 can become an end-of-lunch offer, and the afternoon can bring a second round of takings with dinner to take home.</p>
{{art:giornata}}
<ul>
<li><strong>End of lunch at a reduced price</strong>, always at the same time, only on the day's portions.</li>
<li><strong>A dinner box</strong> at a fixed price, designed for people who finish work late: pasta, main and side with instructions for heating them.</li>
<li><strong>An announcement at 17:00</strong> in your WhatsApp status, with a photo of the box and the collection time.</li>
</ul>

<h2>Sample messages to copy</h2>
<p>Every morning, in your WhatsApp status or stories:</p>
<blockquote><p>🍝 On the counter today: baked lasagne, vitello tonnato, roast chicken and grilled vegetables. Order by 11:30 and collect without queuing: yourvenue.novamenu.eu</p></blockquote>
<p>To nearby offices, just once, with the card and the QR code:</p>
<blockquote><p>Hi! We're the deli next door. If you often have lunch together at the office, you can order from our menu by 11:00 and come and collect everything in one go at 12:30.</p></blockquote>

<h2>Mistakes to avoid</h2>
<ul>
<li><strong>Publishing the dishes at 12:00</strong>: by then the customer has already decided.</li>
<li><strong>Only the price per kilo</strong>: someone ordering on a phone wants to know what a portion costs.</li>
<li><strong>No closing time for pre-orders</strong>: getting an order at 12:25 for 12:30 creates more problems than benefits.</li>
<li><strong>Boxes and offers that are always different</strong>: to become a habit they have to be recognisable.</li>
</ul>

<h2>Where to start</h2>
<p>You don't have to do everything at once. The first step that brings the quickest results is number 1, the dishes of the day online every morning, followed by collection slots. Offices and holidays come later, once the system is running smoothly.</p>

<h2>How to do it with {{brand}}</h2>
<p>With {{brand}} you publish the dishes of the day from your phone with a price per kilo or per portion, receive pre-orders on WhatsApp with a collection slot and keep your customer list, with no commission on orders. You'll find all the details on the page for <a href="/settori/gastronomie/">delis and rotisseries</a>.</p>
`,
  },
  {
    id: "panetteria-pane-prenotato-meno-spreco",
    seo: {
      title: "Bakery pre-orders: sell more, waste less bread",
      description:
        "How much bread a bakery has left over and how to cut it: pre-orders the evening before, morning collection slots, repeat orders and cakes with notice.",
    },
    title: "Bakery: how to get bread pre-ordered in the evening and throw less away",
    description:
      "How much bread is left over each month and how to cut it: pre-orders the evening before, morning collection slots, repeat orders and cakes with notice. A practical guide for bakeries and patisseries.",
    date: "2026-10-10",
    readMinutes: 12,
    sector: "panetterie",
    related: ["ordini-whatsapp", "menu-digitale", "menu-a-orari"],
    arts: {
      conti: {
        kind: "calc",
        title: "The bread left over in a month",
        rows: [
          { label: "Unsold bread at the end of the day", value: "4 kg" },
          { label: "Average price per kilo", value: "£ 4,20" },
          { label: "Days open per month", value: "26" },
        ],
        result: { label: "Value of the unsold bread", value: "£ 437" },
        note: "Example calculation at selling price. Weigh your unsold bread for a week and redo the sum with your own figures.",
      },
      fasce: {
        kind: "slots",
        title: "Collection tomorrow morning",
        days: [{ d: "Tue", n: "14" }, { d: "Wed", n: "15" }, { d: "Thu", n: "16" }],
        slots: [
          { t: "7:00", s: "few" }, { t: "7:30", s: "sel" }, { t: "8:00", s: "full" },
          { t: "8:30", s: "free" }, { t: "9:00", s: "free" }, { t: "9:30", s: "free" },
        ],
        note: "Collection Wednesday at 7:30",
      },
      catalogo: {
        kind: "catalog",
        shop: "Forno San Guido",
        status: "Order by 20:00 for tomorrow morning",
        tabs: ["Bread", "Focaccia", "Cakes", "Seasonal"],
        items: [
          { name: "Semolina bread", desc: "Loaf, about 500 g", price: "4,20", unit: "kg", c: "#e7d5b5" },
          { name: "Hand-stretched grissini", desc: "Bag, about 250 g", price: "12,00", unit: "kg", c: "#fde68a" },
          { name: "Hazelnut cake", desc: "To order, 2 days' notice", price: "24,00", unit: "kg", c: "#d6b8a8" },
        ],
      },
      finesera: {
        kind: "dayparts",
        rows: [
          { t: "Today's bread", time: "7:00 to 18:00", on: true, items: "Full price, whole catalogue" },
          { t: "End of day", time: "18:00 to 19:30", on: true, items: "Today's bread and focaccia at 30% off" },
          { t: "Surprise bag", time: "19:00 to 19:30", on: true, items: "About 2 kg of mixed products for £5" },
        ],
      },
      torta: {
        kind: "order",
        who: "Paolo Marino",
        lines: ["1 × Hazelnut cake, 1.5 kg", "12 people", "1 kg × Semolina bread"],
        total: "£ 40,20",
        when: "Collection Saturday 10:30",
        extra: "Message: Happy birthday Grandma Rina",
      },
    },
    html: `
<p>Every bakery knows the problem: at 19:00 there are loaves, focaccia and grissini left on the shelves that can't be sold at the same price tomorrow. You try to guess production from experience, but one rainy day or a local festival is enough to get it wrong.</p>
<p>Pre-orders don't eliminate the problem, but they move part of your production from estimate to certainty. Let's see how to make them really work.</p>

<h2>What unsold bread costs you</h2>
<p>For a week, weigh the bread left at the end of the day. Then multiply by the average price and by the days you're open.</p>
{{art:conti}}
<p>Recovering even part of it, with pre-orders and more precise production, means a few hundred pounds a month that today ends up in the stale-bread bag.</p>

<h2>1. Get bread ordered the evening before</h2>
<p>Many customers buy the same bread every day. If they can order it in the evening, from the sofa, you know in the morning how much is needed. Set a closing time for pre-orders, for example 20:00, and when it's time to make the dough you already have the list.</p>
<p>For the customer the advantage is just as clear: the bread they want is put aside, even if they come by at 9:30 when the shelf is half empty.</p>

<h2>2. Split collection into slots</h2>
<p>Mornings in a bakery have two peaks: people coming by before work and people coming by after the school run. Collection slots let you prepare the bags in order of time, with the name written on them.</p>
{{art:fasce}}

<h2>3. Write the price per kilo and the approximate weight</h2>
<p>Online, the customer can't look at the loaf. Next to the price per kilo, give the approximate weight of one item: "loaf, about 500 g". That way they know what they'll spend and you avoid questions and surprises at the till.</p>
{{art:catalogo}}

<h2>4. Offer a repeat order</h2>
<p>Someone who buys a kilo of bread every day doesn't want to order it every evening. Offer a standing order, for example "Monday to Saturday, 1 kg of semolina bread at 7:30", which they can pause when they're on holiday. For you it's the base of each day's production, already certain.</p>

<h2>5. Cakes to order with minimum notice</h2>
<p>Cakes to order are an excellent source of income, but also a source of stress if they arrive on Friday afternoon for Saturday morning. Set a minimum notice for each product, for example two days, and ask for everything you need in one go: weight or number of people, flavour, message, any allergies.</p>
{{art:torta}}

<h2>6. Prepare the calendar of seasonal products</h2>
<p>Easter colomba, panettone, Carnival fritters, All Souls' biscuits, cakes for first communions: every year they come round at the same times. Mark on the calendar when to open orders, at least three weeks ahead, and let your regulars know with a message. Knowing the quantities in advance lets you organise shifts and ingredients.</p>

<h2>7. End-of-day offers, done properly</h2>
<p>Some unsold bread will always remain, even with pre-orders. The difference lies in what you do with it in the last hour and a half of opening. An end-of-day offer works if it's <strong>always at the same time</strong>, <strong>always with the same rules</strong> and <strong>announced beforehand</strong>: that way it becomes a habit for some of your customers, instead of an improvised discount.</p>
{{art:finesera}}
<p>A few practical rules:</p>
<ul>
<li><strong>Don't start too early.</strong> If the discount starts at 17:00, customers who would pay full price learn to wait. Between 18:00 and 19:30 the buyers are mostly people leaving work who wouldn't otherwise have come by.</li>
<li><strong>A simple discount.</strong> "30% off today's bread and focaccia" is understood at a glance. Avoid complicated rules like "the second one half price, on half-kilo items only".</li>
<li><strong>The surprise bag.</strong> In the last half hour, a bag of mixed products at a fixed price, for example about 2 kg for £5, empties the shelves and introduces products the customer wouldn't have tried.</li>
<li><strong>Exclude cakes and products made to order.</strong> The offer only covers what would otherwise be lost.</li>
<li><strong>Show the shelf.</strong> At 17:45 a photo of the shelf in your WhatsApp status and Instagram stories, with the time of the offer, brings in people who live nearby.</li>
</ul>
<blockquote><p>🥖 From 18:00 to 19:30, today's bread and focaccia at 30% off. From 19:00 there's also the surprise bag: about 2 kg of mixed products for £5. See you there!</p></blockquote>
<p>With a timed online menu, the "End of day" section appears by itself at 18:00 and disappears at closing time: the customer who opens it at 18:10 sees exactly what they'll find.</p>

<h2>8. Turn yesterday's bread into a new product</h2>
<p>What's left after the evening offer doesn't have to become waste. Many bakeries have a small corner of "rescued" products that sell well:</p>
<ul>
<li><strong>Breadcrumbs</strong>, also flavoured with herbs and lemon zest, in 250 g bags.</li>
<li><strong>Croutons and bread for bruschetta</strong>, toasted and packaged.</li>
<li><strong>Bread cake</strong> or bread pudding, sold by the slice.</li>
<li><strong>Panzanella kits</strong> in summer: stale bread, a printed recipe and a few ingredients.</li>
</ul>
<p>Put them in a separate category in the catalogue, priced per item: they mustn't be confused with fresh bread.</p>

<h2>9. Donate what you can't sell</h2>
<p>For the bread that really is left over, consider working with a local charity or soup kitchen. In Italy, Law 166 of 2016, known as the Gadda law, simplified donations of surplus food by businesses. For details on paperwork and tax, ask your trade association or your accountant.</p>

<h2>A typical week, organised</h2>
<table>
<tr><th>When</th><th>What you do</th></tr>
<tr><td>Every evening at 20:00</td><td>Bread pre-orders for the next day close</td></tr>
<tr><td>Every morning</td><td>You make the pre-ordered dough plus a margin for the counter</td></tr>
<tr><td>Every day at 17:45</td><td>Photo of the shelf and announcement of the end-of-day offer</td></tr>
<tr><td>Every day 18:00 to 19:30</td><td>End-of-day offer, then the surprise bag</td></tr>
<tr><td>Every Monday</td><td>You look at the week's unsold bread and adjust the margin</td></tr>
</table>

<h2>Mistakes to avoid</h2>
<ul>
<li><strong>Accepting pre-orders until midnight</strong>: if you make the dough at 3:00, close pre-orders at a time that lets you get organised.</li>
<li><strong>Not giving the weight</strong>: "1 loaf" is clear to you, not to the customer.</li>
<li><strong>Discounting different products every day</strong>: the customer doesn't know what to expect and stops coming by.</li>
<li><strong>Forgetting who has pre-ordered</strong>: pre-ordered bags must be kept aside with the name clearly visible, until closing time.</li>
</ul>

<h2>Where to start</h2>
<p>Begin with evening pre-orders and a clearly visible price per kilo. After a month, look at the data: how many orders arrive, at what time, which products. Then add repeat orders and the seasonal calendar.</p>

<h2>How to do it with {{brand}}</h2>
<p>With {{brand}} you get a catalogue with prices per kilo and allergens, pre-orders with a collection slot that arrive on WhatsApp, and orders closing at the time you decide. See how it works on the page for <a href="/settori/panetterie/">bakeries and patisseries</a>.</p>
`,
  },
  {
    id: "pastificio-ordini-di-natale",
    seo: {
      title: "Fresh pasta shop: organising Christmas orders",
      description:
        "Christmas orders in a fresh pasta shop: when to open them, how to set a limit per day and per slot, how much pasta to make and how to keep collection moving.",
    },
    title: "Fresh pasta shop: how to organise Christmas orders without losing your mind",
    description:
      "When to open orders, how to set a limit per day and per slot, how to work out how much pasta to make and how to keep collection moving on 23 and 24 December. A guide for fresh pasta shops.",
    date: "2026-10-09",
    readMinutes: 12,
    sector: "pastifici",
    related: ["ordini-whatsapp", "menu-digitale", "automazioni-whatsapp"],
    arts: {
      conti: {
        kind: "calc",
        title: "How many orders you can handle per slot",
        rows: [
          { label: "Orders expected for Christmas", value: "220" },
          { label: "Collection days (20 to 24 December)", value: "5" },
          { label: "Half-hour slots per day", value: "14" },
        ],
        result: { label: "Orders per slot", value: "about 3" },
        note: "Example calculation. With 3 orders every half hour, collection flows; with 15, a queue forms outside the door.",
      },
      fasce: {
        kind: "slots",
        title: "Collection for Christmas",
        days: [{ d: "Sat", n: "20" }, { d: "Sun", n: "21" }, { d: "Mon", n: "22" }, { d: "Tue", n: "23", full: true }],
        slots: [
          { t: "9:00", s: "full" }, { t: "9:30", s: "few" }, { t: "10:00", s: "sel" },
          { t: "10:30", s: "free" }, { t: "11:00", s: "free" }, { t: "11:30", s: "few" },
        ],
        note: "Collection Monday 22 at 10:00",
      },
      produzione: {
        kind: "kpis",
        title: "To prepare for Monday 22",
        items: [
          { value: "38 kg", label: "Agnolotti del plin" },
          { value: "21 kg", label: "Tajarin" },
          { value: "64", label: "Jars of ragù" },
        ],
        note: "The summary comes from adding up the day's orders.",
      },
      ordine: {
        kind: "order",
        who: "Giovanna Ricci",
        lines: ["1 kg × Agnolotti del plin", "500 g × Tajarin", "1 × House ragù, 500 g"],
        total: "£ 41,00",
        when: "Collection Monday 22 at 10:00",
      },
    },
    html: `
<p>For a fresh pasta shop, December is worth two or three normal months. The problem isn't the amount of work: you're prepared for that. The problem is that orders arrive from every direction, in person, by phone, in a notebook, and on 23 December you find yourself with a queue outside and a few orders written down wrong.</p>
<p>This guide helps you organise the holidays starting in October, when there's still time to do it calmly.</p>

<h2>1. Decide when to open orders</h2>
<p>Opening too early means orders that later change; too late means a phone ringing non-stop in mid-December. For many pasta shops the right moment is the second half of November. Choose a date and announce it: "From 20 November you can order your Christmas pasta".</p>

<h2>2. Do the maths on your capacity</h2>
<p>Before opening, estimate how many orders you'll receive, looking at last year, and how many collection days you offer. Then divide by the time slots. The result tells you how many orders you can accept every half hour without creating a queue.</p>
{{art:conti}}

<h2>3. Set a limit per day and per slot</h2>
<p>Everyone wants 23 and 24 December. If you don't set a limit, you end up with twice the orders on the last two days and the first ones almost empty. With a limit per day, when the 23rd is full the customer chooses the 22nd, without having to call and ask.</p>
{{art:fasce}}
<p>Early collection works well for fresh pasta: it keeps in the fridge or can be frozen, and you can say so clearly on the product page.</p>

<h2>4. Prepare a short holiday catalogue</h2>
<p>At Christmas you don't need to put everything you make during the year online. A shorter catalogue, with the holiday products and the sauces, makes orders simpler and production tidier.</p>
<ul>
<li><strong>Price per kilo</strong> for fresh and filled pasta.</li>
<li><strong>Minimum quantity</strong>, for example 250 or 500 grams, to avoid 100-gram orders.</li>
<li><strong>Products priced per item</strong> for sauces, lasagne and jars.</li>
<li><strong>Allergens</strong> clearly shown: eggs, gluten, milk, tree nuts in the fillings.</li>
</ul>

<h2>5. Get everything in writing</h2>
<p>An order written down with weights, day and collection slot removes most mistakes. The customer puts it together from the catalogue, and you receive it on WhatsApp already in order.</p>
{{art:ordine}}

<h2>6. Turn orders into a production list</h2>
<p>Every morning you need just one thing: to know how much to make for the next day's collections. If the orders are written and tidy, the total per product takes a moment.</p>
{{art:produzione}}

<h2>7. Prepare collection like a production line</h2>
<ul>
<li>Pack the orders the day before, with a label showing name, slot and total.</li>
<li>Arrange the packs by time slot, not in alphabetical order.</li>
<li>Have one person dedicated only to handing over orders, separate from whoever serves at the counter.</li>
<li>For the largest orders, consider a deposit at the time of ordering: it reduces forgotten collections.</li>
</ul>

<h2>8. Let customers know, before and after</h2>
<p>A message to your regulars a few days before orders open, only to those who have given consent, is worth more than any sign. And after the holidays a thank-you message, perhaps with January's product, brings back into the shop those who only came by for Christmas.</p>

<h2>9. Decide the rules for changes and cancellations</h2>
<p>In December orders change: an extra guest arrives, dinner moves to a relative's house. If you don't have clear rules, every change becomes a phone call. Write them in the catalogue, under the products:</p>
<ul>
<li><strong>Changes up to 48 hours before collection</strong>, by replying to the confirmation message.</li>
<li><strong>After that, additions only</strong>, if products are still available.</li>
<li><strong>Cancellations</strong> by a specific date, for example 18 December.</li>
<li><strong>Uncollected orders</strong>: say how late you stay open and what happens afterwards.</li>
</ul>

<h2>10. Prepare the messages in advance</h2>
<p>In December you won't have time to write calmly. In October, prepare the three messages you'll need.</p>
<p>For the opening of orders, to customers who have given consent:</p>
<blockquote><p>🎄 From tomorrow you can order your Christmas pasta! Agnolotti del plin, tajarin, ravioli di magro and our sauces. Choose your collection day from 20 to 24 December: places for the 23rd go quickly. yourvenue.novamenu.eu</p></blockquote>
<p>As an order confirmation:</p>
<blockquote><p>Thank you Giovanna, your order is confirmed for Monday 22 at 10:00. You can change it until Saturday by replying to this message.</p></blockquote>
<p>In January, to bring back those who only came by for the holidays:</p>
<blockquote><p>Thank you for choosing our pasta for Christmas! In January the pumpkin ravioli are back, on Fridays only. We look forward to seeing you.</p></blockquote>

<h2>Mistakes to avoid</h2>
<ul>
<li><strong>Accepting every order for the 23rd and 24th</strong>: it's the main cause of queues and mistakes.</li>
<li><strong>Products with no minimum quantity</strong>: a hundred 200-gram orders take the same work as a hundred one-kilo orders.</li>
<li><strong>The notebook alongside the online system</strong>: all orders, including those taken at the counter, go in the same place.</li>
<li><strong>No rule on changes</strong>: without a deadline, changes arrive right up to the evening before.</li>
</ul>

<h2>The calendar in brief</h2>
<table>
<tr><th>When</th><th>What to do</th></tr>
<tr><td>End of October</td><td>Estimate orders, choose collection days and slots</td></tr>
<tr><td>Early November</td><td>Holiday catalogue online, with prices and minimum quantities</td></tr>
<tr><td>Mid-November</td><td>Message to regulars and opening of orders</td></tr>
<tr><td>December</td><td>Production list every morning, packs labelled by slot</td></tr>
<tr><td>January</td><td>Thank-you message and product of the month</td></tr>
</table>

<h2>How to do it with {{brand}}</h2>
<p>With {{brand}} you publish your catalogue with prices per kilo, receive orders on WhatsApp with a collection day and slot, set a limit for each day and let your regulars know. See the page for <a href="/settori/pastifici/">fresh pasta shops</a> or <a href="/demo/">book a demo</a> before November arrives.</p>
`,
  },
  {
    id: "bar-scontrino-medio-colazione-aperitivo",
    seo: {
      title: "Café: 6 ways to raise your average spend",
      description:
        "6 ideas to raise the average spend in your café: the right menu at the right time, fixed-price combinations, a product of the day and a translated menu.",
    },
    title: "Cafés and bars: 6 ways to raise your average spend from breakfast to aperitivo",
    description:
      "The right menu at the right time, fixed-price combinations, a highlighted product of the day and a menu translated for tourists: 6 practical ideas to get every customer spending a little more.",
    date: "2026-10-08",
    readMinutes: 11,
    sector: "bar",
    related: ["menu-a-orari", "traduzioni", "statistiche"],
    arts: {
      conti: {
        kind: "calc",
        title: "Forty cents per bill",
        rows: [
          { label: "Bills per day", value: "180" },
          { label: "Average increase per bill", value: "£ 0,40" },
          { label: "Days open per month", value: "26" },
        ],
        result: { label: "Extra per month", value: "£ 1.872" },
        note: "Example calculation. In a café, margins are made on small numbers multiplied by many customers.",
      },
      orari: {
        kind: "dayparts",
        rows: [
          { t: "Breakfast", time: "7:00 to 11:30", on: true, items: "Coffee, pastries, fresh juices" },
          { t: "Quick lunch", time: "12:00 to 15:00", on: true, items: "Toasties, salads, dish of the day" },
          { t: "Aperitivo", time: "18:00 to 21:00", on: true, items: "Spritz, cocktails, sharing boards" },
        ],
      },
      lingue: {
        kind: "langs",
        dish: "Custard croissant",
        lines: [
          { flag: "🇬🇧", text: "Croissant filled with custard cream" },
          { flag: "🇩🇪", text: "Hörnchen mit Vanillecreme" },
          { flag: "🇪🇸", text: "Cruasán relleno de crema pastelera" },
        ],
      },
    },
    html: `
<p>In a café each customer spends little, but there are many customers. That's why even a small increase in the average spend, a few dozen cents, makes a visible difference at the end of the month.</p>
{{art:conti}}
<p>It isn't about raising prices, but about letting customers find the right thing at the right moment. Here are six practical ways.</p>

<h2>1. Show the right menu at the right time</h2>
<p>At 8:00 in the morning nobody needs to see the cocktail list, and at 19:00 the list of pastries is just in the way. A menu that changes by itself through the day puts what the customer is looking for front and centre, and makes them notice things they wouldn't have asked for.</p>
{{art:orari}}
<p>With a digital menu the same QR code on the table shows breakfast, lunch or aperitivo according to the time, without reprinting anything.</p>

<h2>2. Create fixed-price combinations</h2>
<p>"Cappuccino and croissant £2.80" sells more than a cappuccino at 1.60 and a croissant at 1.40 written on two different lines. The combination makes choosing simpler and nudges someone who would only have had a coffee to add something.</p>
<ul>
<li><strong>Breakfast</strong>: coffee plus pastry, fresh juice plus toastie.</li>
<li><strong>Lunch</strong>: dish of the day, water and coffee.</li>
<li><strong>Aperitivo</strong>: two spritzes and a small sharing board.</li>
</ul>

<h2>3. Put the product of the day at the top</h2>
<p>The croissant fresh from the oven, the home-made cake, the seasonal juice: if they're at the bottom of the list nobody sees them. Highlight them at the top of the menu, with a line of description. Changing them every day from your phone takes a few seconds.</p>

<h2>4. Use photos only where they count</h2>
<p>A menu with fifty photos is hard to read. Three or four photos of the products you most want to sell are enough: the aperitivo board, the cake of the day, the house cocktail. They must be real photos, in good light, even taken on a phone next to a window.</p>

<h2>5. Speak the tourists' language</h2>
<p>If your café is in the town centre, near a station or in a tourist area, some of your customers don't read Italian. A tourist who doesn't understand the menu orders the simplest thing, often a coffee. If the menu opens in their language, they see the rest too.</p>
{{art:lingue}}
<p>Leave the names of traditional products in Italian, such as spritz, cornetto or tramezzino, and add a short explanation: they're part of the experience.</p>

<h2>6. Look at what customers look at</h2>
<p>A digital menu tells you which products are opened most. If a cocktail is looked at a lot but ordered little, perhaps the price or the description isn't convincing. If nobody opens a product, perhaps it should go. This is information a paper menu can't give you.</p>

<h2>7. Fill the dead hours of the afternoon</h2>
<p>Between 15:00 and 17:00 many cafés are almost empty, but staff and lights cost the same. A few ideas to give those hours a reason to come in:</p>
<ul>
<li><strong>Afternoon tea break</strong>: coffee or tea with a slice of the cake of the day at a fixed price, from 15:00 to 17:00 only.</li>
<li><strong>People working on laptops</strong>: a table, a socket and a connection, with a "second coffee half price" offer.</li>
<li><strong>Students and parents after school</strong>: juice and a pastry, or a wrapped ice cream, at a single price.</li>
</ul>
<p>With a timed menu, the afternoon offer appears only in that slot: it doesn't confuse people who come in the morning.</p>

<h2>8. The aperitivo that sells itself</h2>
<p>Aperitivo is the moment with the highest spend of the day. A few touches make the difference:</p>
<ul>
<li><strong>A short list</strong>: five or six well-made cocktails sell more than a list of twenty.</li>
<li><strong>The board on show</strong>: a photo of the real board, at the top of the aperitivo section, and a version for two at a clear price.</li>
<li><strong>The 17:30 announcement</strong>: in your WhatsApp status and stories, with a photo of the counter and the cocktail of the week.</li>
</ul>
<blockquote><p>🍹 From tonight the cocktail of the week is the Garibaldi with Sicilian oranges. Aperitivo from 18:00, sharing board for two at £12. Shall we keep you a table?</p></blockquote>

<h2>Examples of combinations</h2>
<table>
<tr><th>Moment</th><th>Combination</th><th>Guide price</th></tr>
<tr><td>Breakfast</td><td>Cappuccino and croissant</td><td>£2.80</td></tr>
<tr><td>Breakfast</td><td>Fresh juice and toastie</td><td>£7.50</td></tr>
<tr><td>Lunch</td><td>Dish of the day, water and coffee</td><td>£11.00</td></tr>
<tr><td>Afternoon</td><td>Coffee and a slice of cake</td><td>£4.00</td></tr>
<tr><td>Aperitivo</td><td>Two spritzes and a small board</td><td>£16.00</td></tr>
</table>
<p>The prices are only a guide: work them out on your own costs, but always keep the combination slightly better value than the products bought separately.</p>

<h2>Mistakes to avoid</h2>
<ul>
<li><strong>One long menu for the whole day</strong>: customers struggle to find what they're looking for.</li>
<li><strong>Prices not updated</strong>: a coffee that costs more than what's written creates mistrust.</li>
<li><strong>Too many photos</strong>: they slow the menu down and confuse.</li>
<li><strong>A damaged QR code</strong>: check every week that the stickers on the tables are readable.</li>
</ul>

<h2>In practice, from tomorrow</h2>
<ol>
<li>Divide the menu into three moments of the day.</li>
<li>Create two combinations for breakfast and one for aperitivo.</li>
<li>Every morning, choose a product of the day to highlight.</li>
<li>After a month, compare the average spend with the month before.</li>
</ol>

<h2>How to do it with {{brand}}</h2>
<p>With {{brand}} the menu changes by itself according to the time, is translated into four languages and shows you which products are looked at most. Find out more on the page for <a href="/settori/bar/">cafés and bars</a>.</p>
`,
  },
  {
    id: "gelateria-vaschette-torte-gelato",
    seo: {
      title: "Ice cream shop: sell more tubs and cakes",
      description:
        "Practical ideas for ice cream shops: today's flavours online, tubs pre-ordered for Sunday, ice cream cakes with notice and a well-planned cold season.",
    },
    title: "Ice cream shop: how to sell more tubs and ice cream cakes, even when it's cold",
    description:
      "Today's flavours online, tubs pre-ordered for Sunday lunch, birthday ice cream cakes with notice and a planned cold season. Practical ideas for ice cream shops.",
    date: "2026-10-07",
    readMinutes: 11,
    sector: "gelaterie",
    related: ["menu-digitale", "ordini-whatsapp", "ferie-e-chiusure"],
    arts: {
      conti: {
        kind: "calc",
        title: "Ice cream cakes in a month",
        rows: [
          { label: "Ice cream cakes per week", value: "6" },
          { label: "Average price of a cake", value: "£ 32" },
          { label: "Weeks", value: "4" },
        ],
        result: { label: "Takings per month", value: "£ 768" },
        note: "Example calculation. Cakes sell all year round, even when nobody's buying a cone.",
      },
      gusti: {
        kind: "catalog",
        shop: "Gelateria Polo Nord",
        status: "Flavours updated at 10:12",
        tabs: ["Today's flavours", "Tubs", "Ice cream cakes"],
        items: [
          { name: "Bronte pistachio", desc: "Contains tree nuts", price: "", out: true, c: "#bef264" },
          { name: "Piedmont PGI hazelnut", desc: "Contains tree nuts, milk", price: "", tag: "New", c: "#e7d5b5" },
          { name: "Strawberry", desc: "Sorbet, dairy-free", price: "", c: "#fda4af" },
        ],
      },
      torta: {
        kind: "order",
        who: "Chiara Moretti",
        lines: ["1 × Ice cream cake, 8 people", "Flavours: hazelnut and strawberry", "1 × 500 g tub"],
        total: "£ 46,00",
        when: "Collection Saturday 16:00",
        extra: "Message: Happy birthday Sofia!",
      },
    },
    html: `
<p>An ice cream shop lives by the seasons and the weather. A week of rain in June hits the accounts as hard as a month's closure. The cone remains the main product, but tubs and ice cream cakes are the part you can plan: they're ordered in advance, they sell even when it's cold and the spend is much higher.</p>

<h2>Why focus on tubs and cakes</h2>
<p>An ice cream cake is worth ten or fifteen cones, but takes just one sale. And someone who orders it for a birthday does so days ahead, so you can prepare it calmly.</p>
{{art:conti}}

<h2>1. Publish today's flavours every morning</h2>
<p>"What flavours do you have today?" is the most frequent question, at the counter and on the phone. If today's flavours are online, updated every morning, the customer decides before leaving home. And if the pistachio runs out at 21:00, you mark it sold out and avoid disappointing someone who comes specially.</p>
{{art:gusti}}
<p>Always show the allergens: tree nuts, milk, eggs. For an ice cream shop it's information customers actively look for.</p>

<h2>2. Get tubs pre-ordered for Sunday</h2>
<p>The tub to take to Sunday lunch is a classic. If the customer can order it on Saturday evening, with the flavours chosen and a collection time, you find it ready in the freezer and they skip the 13:00 queue.</p>
<ul>
<li>Offer clear sizes: 500 g, 750 g, 1 kg, with the number of flavours for each.</li>
<li>Say how late orders can be placed for the next day.</li>
<li>Add a paid cool bag for people with a journey ahead.</li>
</ul>

<h2>3. Ice cream cakes are ordered with notice</h2>
<p>An ice cream cake takes time. Set a minimum notice, for example 48 hours, and ask for everything in one go: number of people, flavours, message, any allergies.</p>
{{art:torta}}
<p>With a written order there are no misunderstandings about the message or the flavours, and the customer knows exactly when to collect.</p>

<h2>4. Plan the cold season</h2>
<p>If you stay open in winter, change what you offer instead of waiting for summer. Semifreddo, ice cream cakes for the holidays, hot chocolate, tubs of ice cream for Christmas lunches. If you close, schedule the closure and communicate it well: the online menu must say when you reopen, and orders must stop by themselves on the days you're closed.</p>

<h2>5. Remember birthdays</h2>
<p>Someone who ordered a cake for a birthday will do it again the following year, if you remind them. With the customer's consent, a message a week before the date, "Last year you celebrated with one of our cakes: would you like to order it again this year?", brings almost certain orders.</p>

<h2>6. Think about tourists</h2>
<p>In tourist areas, ice cream is one of the products foreign visitors look for most. A translated flavour menu, with an explanation of gianduia, stracciatella or fior di latte, helps the customer choose and makes them feel welcome.</p>

<h2>7. The flavour of the week</h2>
<p>A special flavour that changes every week gives regulars a reason to come back and gives you something to talk about. Announce it on Monday, always in the same way:</p>
<blockquote><p>🍨 The flavour of the week is ricotta, fig and walnut. You'll find it until Sunday, while it lasts!</p></blockquote>
<p>It works even better if the flavour is tied to the local area or the season: peaches from the valley, hazelnuts from the Langhe, chestnuts in autumn.</p>

<h2>8. Rainy days and the end of the season</h2>
<p>A rainy day in the middle of summer doesn't have to be a lost day. You can prepare a "rain" offer to switch on only when needed, for example a 1 kg tub at a special price to collect by the evening. Announce it at 16:00 in your WhatsApp status: people stuck indoors fancy an ice cream on the sofa.</p>
<p>At the end of the season, before closing, empty the display cases with a final week of tubs at a reduced price and announce your reopening date. Whoever bought the last tub is the first one back in spring.</p>

<h2>9. Cakes for every occasion, not just birthdays</h2>
<p>Ice cream cakes also sell for first communions, confirmations, graduations, company dinners and end-of-school-year parties. Create a category in the catalogue for each occasion, with clear sizes and prices:</p>
<table>
<tr><th>Size</th><th>People</th><th>Notice</th></tr>
<tr><td>Small cake</td><td>6 to 8</td><td>48 hours</td></tr>
<tr><td>Medium cake</td><td>10 to 14</td><td>48 hours</td></tr>
<tr><td>Large or tiered cake</td><td>20 or more</td><td>5 days</td></tr>
<tr><td>Individual semifreddo</td><td>per item</td><td>24 hours</td></tr>
</table>

<h2>Mistakes to avoid</h2>
<ul>
<li><strong>Online flavours not updated</strong>: the customer who comes for the pistachio and doesn't find it remembers the disappointment, not the menu.</li>
<li><strong>Cakes with no minimum notice</strong>: an order for 9:00 tomorrow received at 22:00 puts the whole workshop under pressure.</li>
<li><strong>Closing without telling anyone</strong>: a sign on the door isn't enough; the online menu must say when you reopen.</li>
<li><strong>Allergens shown only at the counter</strong>: tree nuts and milk are the first things customers look for.</li>
</ul>

<h2>Where to start</h2>
<p>The simplest starting point is today's flavours online, because they save you questions straight away. Then add tubs pre-ordered for the weekend and, before winter, the cake catalogue with its notice period.</p>

<h2>How to do it with {{brand}}</h2>
<p>With {{brand}} you update today's flavours from your phone, receive orders for tubs and cakes on WhatsApp with a collection day and time, and schedule the seasonal closure. You'll find it all on the page for <a href="/settori/gelaterie/">ice cream shops</a>.</p>
`,
  },
];

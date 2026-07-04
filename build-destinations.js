// Generates /destinations/*.html from structured data.
const fs = require("fs");
const path = require("path");

const D = [
  {
    slug: "caribbean", name: "Caribbean Vacations", short: "Caribbean", grad: "g-caribbean",
    tagline: "Turquoise water, powder-soft sand, and a resort chosen just for you.",
    title: "Caribbean Vacations & All-Inclusive Resorts | Travels by Val",
    desc: "Plan the perfect Caribbean vacation with a personal travel advisor. All-inclusive resorts, island hopping, adults-only escapes, and family trips — free consultation.",
    overview: [
      "The Caribbean isn't one destination — it's dozens, each with its own personality. Jamaica's lush hills and reggae warmth. The Bahamas' swimmable pigs and quick-hop convenience. St. Lucia's dramatic Pitons for romance. Turks and Caicos' impossibly clear Grace Bay for pure, unplugged calm.",
      "The difference between a good Caribbean trip and a great one is matching the island — and the resort — to how you actually vacation. That's where Val comes in: she narrows dozens of islands and hundreds of resorts to the handful that genuinely fit your travelers, your budget, and your definition of paradise."
    ],
    best: [
      ["December – April", "Peak season: driest weather, warm days, highest demand — book 6–12 months ahead."],
      ["May – June", "Sweet spot: great weather, thinner crowds, gentler prices."],
      ["July – August", "Family-vacation prime time; watch for resort kids-stay-free offers."],
      ["September – November", "Deepest deals; hurricane season, so travel protection is a must — Val handles it."]
    ],
    itins: [
      ["7 days", "Adults-Only Reset — St. Lucia or Turks & Caicos", "An adults-only all-inclusive with swim-up suites, a catamaran sunset sail, and exactly zero alarm clocks."],
      ["5 days", "Family Splash — Jamaica or Bahamas", "Kid-clubs and water parks by day, beachfront family dinners by night, with a dolphin encounter your kids will retell for years."]
    ],
    tips: [
      "Not all 'all-inclusive' is equal — top-shelf drinks, à-la-carte dining, and resort credits vary hugely by brand. Val knows which ones over-deliver.",
      "Direct flights matter more than you think; Val builds itineraries around the easiest routes from your home airport.",
      "Book cabanas and specialty dining before you fly — Val pre-arranges the ones worth paying for.",
      "Traveling September–November? Never skip travel protection. It's cheap insurance for hurricane season."
    ],
    faqs: [
      ["Which Caribbean island is best for a first visit?", "For first-timers, Val often suggests Jamaica or the Dominican Republic for value and variety, Turks and Caicos for pure beach relaxation, or the Bahamas for short flights from the U.S. East Coast. The 'best' island depends on your travel style — that's exactly what the free consultation figures out."],
      ["Are all-inclusive resorts actually worth it?", "For most travelers, yes — when the resort is well matched. One upfront price covers rooms, meals, drinks, and entertainment, which makes budgeting stress-free. The key is choosing a property whose dining and vibe fit you, which is where an advisor's first-hand knowledge pays off."],
      ["When is hurricane season in the Caribbean?", "Officially June through November, with peak activity from mid-August to October. Travel during those months can offer excellent value — paired with travel protection and flexible planning, which Val arranges as part of every booking."],
      ["Do I need a passport for the Caribbean?", "Yes — for nearly all Caribbean destinations U.S. travelers need a passport valid for at least six months beyond travel dates. Val double-checks entry requirements for every traveler on your booking."]
    ],
    related: ["mexico", "cruises", "honeymoons"]
  },
  {
    slug: "europe", name: "Europe Vacations", short: "Europe", grad: "g-europe",
    tagline: "Centuries of history, unforgettable food, and an itinerary that flows like a story.",
    title: "Europe Trip Planning — Italy, Spain, France & More | Travels by Val",
    desc: "Custom European vacations planned by an advisor who's been there. Italy, Spain, France, river cruises, and multi-country itineraries — free consultation.",
    overview: [
      "Europe rewards good planning like nowhere else. The difference between standing in a three-hour Vatican line and walking straight in; between a tourist-trap dinner and the trattoria the locals fight over — it all comes down to knowing what to book, when, and where to stay.",
      "Val has traveled Spain and Italy herself, and she plans Europe the way it deserves: unhurried mornings, well-placed hotels you don't have to repack out of every night, skip-the-line access to the icons, and room for the serendipity that makes Europe, Europe."
    ],
    best: [
      ["April – June", "Spring: blooming cities, mild weather, manageable crowds — a favorite window."],
      ["July – August", "High summer: peak energy and peak crowds; book landmark tickets far ahead."],
      ["September – October", "Harvest season: warm light, wine festivals, thinner lines — arguably Europe at its best."],
      ["November – March", "Christmas markets, opera season, and museum-lover pricing; pack layers."]
    ],
    itins: [
      ["10 days", "Italy Classic — Rome, Florence & the Amalfi Coast", "Ancient Rome with a private guide, Renaissance Florence at golden hour, then limoncello sunsets over the Tyrrhenian Sea."],
      ["9 days", "Spain in Full Color — Barcelona, Seville & Madrid", "Gaudí's Barcelona, flamenco and orange blossoms in Seville, and tapas crawls through Madrid's old quarters."]
    ],
    tips: [
      "Book major sights (Vatican, Alhambra, Uffizi, Sagrada Família) weeks or months ahead — Val secures timed entries so you never queue.",
      "Trains beat planes for most intra-Europe hops; first-class rail is one of Europe's best-kept comfort secrets.",
      "Three nights minimum per city. One-night stops feel like moving day, every day.",
      "Shoulder season (May, September, October) buys you better weather-to-crowd ratios and better hotel value."
    ],
    faqs: [
      ["How far in advance should I plan a Europe trip?", "Eight to fourteen months for peak summer travel, especially for popular hotels in Italy and iconic experiences that sell out. Shoulder-season trips can come together in four to six months. The earlier Val starts, the more options you have."],
      ["Is a multi-country Europe trip realistic in one vacation?", "Yes — with restraint. Two countries in 10–12 days is comfortable; three is possible with smart geography (like Spain and Portugal, or Italy and France). Val designs routes that minimize transit days so you spend your vacation in Europe, not in stations."],
      ["Should I consider a European river cruise?", "River cruises are one of the best ways to see Europe's heartland — you unpack once and wake up in a new town daily, with excursions included. They're ideal for travelers who want depth without logistics. Val matches you to the right river and line."],
      ["Do Americans need a visa for Europe?", "For short tourist stays, U.S. citizens don't need a traditional visa for most of Europe, but travel authorization requirements are evolving (ETIAS). Val confirms current entry requirements for every itinerary she books."]
    ],
    related: ["cruises", "honeymoons", "caribbean"]
  },
  {
    slug: "hawaii", name: "Hawaii Vacations", short: "Hawaii", grad: "g-hawaii",
    tagline: "Volcanoes, waterfalls, and beaches that don't look real — until you're standing on one.",
    title: "Hawaii Vacation Planning — Maui, Oahu, Kauai & Big Island | Travels by Val",
    desc: "Plan your Hawaii vacation with a personal travel advisor: island pairings, resort picks, luaus, and helicopter tours — free consultation.",
    overview: [
      "Each Hawaiian island is its own trip. Oahu blends city energy with legendary surf. Maui is the honeymooner's classic — road-to-Hana waterfalls and Haleakalā sunrises. Kauai is raw, green, and cinematic. The Big Island gives you an active volcano and stargazing from Mauna Kea in the same day.",
      "The most common Hawaii mistake is cramming too many islands into too few days. Val builds island pairings that match your pace — and books the resorts, luaus, and once-in-a-lifetime experiences (helicopter over the Nā Pali Coast, anyone?) before they sell out."
    ],
    best: [
      ["April – May", "Post-spring-break calm: superb weather, better rates, blooming trails."],
      ["June – August", "Family season: sunny and lively; book resorts 8+ months out."],
      ["September – October", "Locals' favorite: warm ocean, thin crowds, strong value."],
      ["December – March", "Whale-watching season on Maui; holiday weeks book a year ahead."]
    ],
    itins: [
      ["8 days", "Classic Duo — Oahu + Maui", "Pearl Harbor and Waikīkī sunsets, then Maui's Road to Hana, a traditional luau, and a Haleakalā sunrise."],
      ["10 days", "Wild Hawaii — Kauai + Big Island", "Nā Pali Coast by catamaran, Waimea Canyon hikes, then live lava landscapes and manta-ray night snorkeling."]
    ],
    tips: [
      "Inter-island flights are short but add real transit time — two islands per week of vacation is the golden ratio.",
      "Book luaus, Haleakalā sunrise permits, and top snorkel sails weeks ahead; the best ones sell out.",
      "Ocean-view versus ocean-front matters in Hawaii more than most places — Val knows which buildings and floors deliver.",
      "Rental cars are essential on Maui, Kauai, and the Big Island; reserve early in peak seasons."
    ],
    faqs: [
      ["Which Hawaiian island should I visit first?", "For a first trip, Oahu or Maui (or both) offer the classic Hawaii mix of beaches, culture, and iconic sights. Couples lean Maui; families often love Oahu's variety. Val pairs islands to your travel style in the free consultation."],
      ["How many days do I need in Hawaii?", "Seven to ten days is the sweet spot — long enough to settle into island time and visit two islands without rushing. Five days works beautifully for a single-island escape."],
      ["Is Hawaii good for a honeymoon?", "Exceptional — no passport required, world-class resorts, and experiences from private waterfall picnics to sunset sails. Val arranges honeymoon touches like room upgrades, couples' spa time, and welcome amenities."],
      ["When can you see whales in Hawaii?", "Humpback season runs roughly December through April, peaking January to March, with Maui's Auau Channel the best viewing in the islands."]
    ],
    related: ["honeymoons", "alaska", "cruises"]
  },
  {
    slug: "alaska", name: "Alaska Cruises & Tours", short: "Alaska", grad: "g-alaska",
    tagline: "Calving glaciers, breaching whales, and wilderness on a scale you have to see to believe.",
    title: "Alaska Cruise & Land Tour Planning | Travels by Val",
    desc: "Plan an Alaska cruise or cruisetour with an expert advisor: glaciers, wildlife, the right ship, the right side of the ship — free consultation.",
    overview: [
      "Alaska is the trip people describe in hushed tones afterward. Glaciers the size of cities calving into the sea. Humpbacks bubble-net feeding beside your ship. Bald eagles as common as pigeons. It's America's last true wilderness — and the cruise is the way most travelers unlock it.",
      "But Alaska rewards insider planning: the right itinerary (Glacier Bay versus Hubbard), the right cabin side, the right shore excursions booked before they vanish, and whether to add a land 'cruisetour' into Denali. Val sorts all of it, so you just show up and gasp."
    ],
    best: [
      ["May", "Season opening: fewer ships, crisp air, snow-capped everything, strong value."],
      ["June – July", "Peak wildlife and near-endless daylight — the classic window; book 9–12 months out."],
      ["August", "Warmest seas and salmon runs, which mean bears; occasional rain, big rewards."],
      ["September", "Golden tundra, northern-lights chances, season-end pricing."]
    ],
    itins: [
      ["7 days", "Inside Passage Classic — Juneau, Skagway & Glacier Bay", "Whale watching in Juneau, the White Pass railway in Skagway, and a full day drifting past Glacier Bay's tidewater giants."],
      ["11 days", "Cruise + Denali Cruisetour", "Seven days at sea plus four days inland by glass-domed rail to Denali National Park — the full Alaska, sea to summit."]
    ],
    tips: [
      "Glacier Bay itineraries carry limited permits — if it's on your list, book early and Val will confirm the itinerary includes it.",
      "Balcony cabins earn their keep in Alaska more than anywhere; scenery happens all day, right off your rail.",
      "Book marquee excursions (helicopter dog-sledding, bear viewing) the day bookings open — they sell out first.",
      "Pack layers, not parkas: summer days run 55–70°F, and ship-side glacier viewing gets breezy."
    ],
    faqs: [
      ["When is the best time to cruise Alaska?", "Late May through early September, with June and July the peak for wildlife and daylight. May and September offer excellent value with cooler temperatures and thinner crowds."],
      ["Which side of the ship is best for an Alaska cruise?", "It varies by itinerary and direction — a detail most booking sites never mention. When Val books your cabin, she picks the side and location with the best scenery odds for your specific route."],
      ["Should I add a land tour to my Alaska cruise?", "If you can spare 3–4 extra days, a Denali cruisetour is emphatically worth it — the interior's wildlife and scale are different from the coast. It's the version of Alaska most travelers wish they'd done the first time."],
      ["Will I see the northern lights on an Alaska cruise?", "Summer's long daylight makes aurora rare; your best odds come with late-August or September sailings. For dedicated aurora viewing, ask Val about fall and winter Fairbanks land packages."]
    ],
    related: ["cruises", "hawaii", "europe"]
  },
  {
    slug: "mexico", name: "Mexico Resorts & Escapes", short: "Mexico", grad: "g-mexico",
    tagline: "World-class beaches, five-star all-inclusives, and flavor in every direction.",
    title: "Mexico All-Inclusive Resorts — Cancun, Riviera Maya, Cabo | Travels by Val",
    desc: "Plan a Mexico vacation with a personal advisor: Cancun, Riviera Maya, Playa del Carmen, Cabo, and Puerto Vallarta all-inclusives — free consultation.",
    overview: [
      "Mexico delivers more five-star vacation per dollar than almost anywhere on earth. The Riviera Maya's jungle-wrapped resorts and cenotes. Cancun's easy flights and endless energy. Cabo's dramatic desert-meets-sea drama. Puerto Vallarta's old-town charm and Pacific sunsets.",
      "It's also a market flooded with lookalike resorts — and the gap between the great ones and the merely photogenic ones is enormous. Val knows which properties actually deliver on service, food, and beach quality, and she matches you to the coast and resort that fit your crew."
    ],
    best: [
      ["December – April", "Dry season perfection across both coasts; the most demand — book early."],
      ["May – June", "Warm, sunny, and noticeably better priced; great couples' window."],
      ["July – August", "Family season with whale sharks off the Yucatán and resort kids' programming in full swing."],
      ["September – November", "Value season on the Caribbean side; Pacific-coast Cabo shines in November."]
    ],
    itins: [
      ["6 days", "Riviera Maya Recharge", "A five-star all-inclusive with cenote swims, a Tulum ruins morning, and swim-up-bar afternoons on repeat."],
      ["5 days", "Cabo Long Weekend, Upgraded", "Oceanview suite, Arch of Cabo San Lucas by private boat, a tasting dinner and one flawless spa day."]
    ],
    tips: [
      "Cancun/Riviera Maya versus Cabo is the first fork: Caribbean-flat turquoise water versus Pacific drama (where many beaches aren't swimmable). Val matches you to the right coast.",
      "Adults-only and family-friendly resorts sit side by side here — a mismatch can define the whole trip; Val gets it right the first time.",
      "Resort tiers within brands vary widely; the same logo doesn't mean the same experience.",
      "November through early December is a quietly perfect window: dry-season weather at value-season prices."
    ],
    faqs: [
      ["Is it safe to vacation in Mexico's resort areas?", "Mexico's major resort corridors — Cancun, the Riviera Maya, Los Cabos, Puerto Vallarta — host tens of millions of travelers annually and are heavily oriented around visitor safety. Val books vetted resorts and reputable, insured transfers, and briefs every client on smart travel practices."],
      ["Cancun or Cabo — how do I choose?", "Choose Cancun/Riviera Maya for swimmable turquoise Caribbean water, cenotes, and Mayan ruins; choose Cabo for dramatic scenery, golf, sportfishing, and a chic dining scene. Val's consultation sorts this in about five minutes of conversation."],
      ["Do I need a passport for Mexico?", "Yes — all air travelers to Mexico need a valid passport. Val verifies documentation requirements for every traveler at booking."],
      ["When is hurricane risk in Mexico?", "June through November on both coasts, peaking August–October on the Caribbean side. Val pairs value-season bookings with travel protection so weather never wrecks the investment."]
    ],
    related: ["caribbean", "honeymoons", "disney"]
  },
  {
    slug: "disney", name: "Disney & Universal Vacations", short: "Disney & Universal", grad: "g-disney",
    tagline: "All the magic. None of the meltdowns. A theme-park trip that's planned like a pro.",
    title: "Disney World & Universal Trip Planning | Travels by Val",
    desc: "Disney World, Disneyland, Universal Orlando, and Disney Cruise Line planning from a personal advisor: resorts, dining, park strategy — free consultation.",
    overview: [
      "A Disney or Universal trip is equal parts vacation and operation. Park reservations, dining that books up months out, ride strategies, resort tiers, party tickets, early entry — done cold, it's a part-time job. Done right, it's genuinely magical.",
      "Val plans theme parks like a strategist: which park on which day, which dining is worth locking at the 60-day mark, whether a monorail resort earns its premium for your family, and how Universal's Epic Universe changes the Orlando math. Your only job is enjoying the look on your kids' faces."
    ],
    best: [
      ["Late January – February", "Lowest crowds of the year, cool mornings, festival season at EPCOT."],
      ["April – May", "Flower & Garden season: warm, bright, and manageable between holiday spikes."],
      ["September – early November", "Halloween parties and food festivals with post-summer crowd relief."],
      ["Early December", "Peak holiday magic — decorations and parties — before the Christmas-week surge."]
    ],
    itins: [
      ["6 days", "Walt Disney World, the Strategist's Way", "Four parks in five days with rope-drop plans, locked-in character dining, a resort day, and fireworks from a dessert party."],
      ["7 days", "Orlando Grand Slam — Disney + Universal", "Disney's icons plus Universal's thrill tier and Epic Universe, sequenced so the big rides never eat your day."]
    ],
    tips: [
      "Dining reservations open ~60 days out and the marquee tables go in minutes — Val sets alarms so you don't have to.",
      "Park-day order matters: the right sequence around party nights and crowd patterns saves hours of standing.",
      "On-site resorts buy real advantages (early entry, transportation) — but only some tiers are worth it for your party size; Val runs that math.",
      "A mid-trip pool/resort day is the veteran move — it's the difference between a magical trip and an exhausted one."
    ],
    faqs: [
      ["Is a Disney travel agent really free?", "Yes — advisors are paid commission by Disney and Universal, so their planning help costs you nothing extra. You pay the same package price, and Val also monitors for discounts after booking and re-books you automatically when prices drop."],
      ["When is the cheapest time to go to Disney World?", "Typically late January through February and the weeks after Labor Day — lower crowds and better room rates. Val tracks promotional windows and applies any discount that fits your dates, even after you've booked."],
      ["Disney World or Disneyland — which is better for us?", "Disney World is the full-immersion week (four parks, resort bubble); Disneyland is the charming, walkable original that pairs well with a broader California trip. Party size, kid ages, and trip length decide it — consultation territory."],
      ["Is Disney Cruise Line worth it?", "For families, it's consistently among the best-reviewed products in travel — Broadway-caliber shows, legendary kids' clubs, and adult-exclusive spaces. Val matches ships and itineraries (including castaway days) to your family's ages and interests."]
    ],
    related: ["cruises", "mexico", "caribbean"]
  },
  {
    slug: "cruises", name: "Ocean & River Cruises", short: "Cruises", grad: "g-cruise",
    tagline: "Unpack once. Wake up somewhere new. The right ship changes everything.",
    title: "Cruise Planning — Ocean & River, Every Major Line | Travels by Val",
    desc: "Find your perfect cruise with an expert advisor: Caribbean, Alaska, Mediterranean, and European river cruises, with the right ship, cabin, and perks.",
    overview: [
      "Here's the truth about cruising: the ship *is* the destination, and lines differ as much as hotel brands. The megaship with a go-kart track and the intimate ship with a butler on every deck both sail the same Caribbean — and attract entirely different vacations.",
      "Val matches you to the line, ship, itinerary, and even the specific cabin location that fits how you travel — then layers on advisor perks like onboard credit and upgrades. First cruise or fiftieth, the difference is night and day."
    ],
    best: [
      ["Winter", "Caribbean and Mexican Riviera prime time; holiday sailings book nearly a year out."],
      ["Spring", "Transatlantic repositioning value, Japan in bloom, and the Mediterranean waking up."],
      ["Summer", "Alaska and Northern Europe at their peak; family megaship season."],
      ["Fall", "Canada/New England foliage, Mediterranean shoulder-season gold, river-cruise wine harvests."]
    ],
    itins: [
      ["7 days", "Caribbean, Matched to You", "Eastern for beaches, Western for adventure, Southern for depth — on the ship personality that fits your crew."],
      ["8 days", "Danube River Cruise — Vienna to Budapest", "Storybook towns by day, chandeliered capitals by night, wine tastings included, unpacking exactly once."]
    ],
    tips: [
      "Cabin location is a science: midship-low for motion sensitivity, aft for wake views, never under the pool deck. Val picks precisely.",
      "The advertised fare is rarely the real comparison — drink packages, Wi-Fi, gratuities, and excursions change the math by line. Val compares total cost.",
      "Book the next cruise while onboard pricing is tempting — but route it through your advisor to stack perks.",
      "River and ocean cruising are different vacations entirely; plenty of travelers who 'don't like cruises' love rivers."
    ],
    faqs: [
      ["How do I choose the right cruise line?", "By matching the line's personality to yours: megaship energy versus small-ship intimacy, family programming versus adults-focused luxury, included-everything versus à-la-carte. Val's consultation identifies your fit fast — it's the single highest-value decision in cruising."],
      ["Is a balcony cabin worth the extra cost?", "In scenic regions like Alaska, the Mediterranean, and rivers — usually yes. On port-intensive Caribbean runs where you're rarely in the room, an oceanview can be the smarter spend. Val advises per itinerary."],
      ["What does a cruise travel agent cost?", "Nothing extra — advisors are compensated by the cruise lines, and you frequently pay less overall once Val applies promotions, group rates, and onboard credit that booking sites don't stack."],
      ["Ocean cruise or river cruise — what's the difference?", "Ocean cruises are floating resorts with sea days and big entertainment; river cruises are intimate journeys through a region's heart, docking in town centers daily with excursions included. Different rhythms, both wonderful — Val helps you pick."]
    ],
    related: ["alaska", "europe", "caribbean"]
  },
  {
    slug: "honeymoons", name: "Honeymoons & Romance Travel", short: "Honeymoons", grad: "g-honeymoon",
    tagline: "You planned a wedding. Let Val plan the part that's just for the two of you.",
    title: "Honeymoon & Anniversary Trip Planning | Travels by Val",
    desc: "Honeymoons, anniversaries, and romantic escapes planned personally: overwater bungalows, Amalfi Coast, Maui, and more — free consultation.",
    overview: [
      "After months of wedding logistics, the last thing you two should do is spend evenings comparing resort reviews. A honeymoon deserves to be the easiest beautiful thing you've ever done: tell Val what romance looks like for you, then go get married.",
      "Overwater bungalows in the South Pacific or the Maldives. Cliffside Santorini. An Amalfi Coast slow-burn. A Maui classic or a two-island 'relax + explore' pairing. Val designs it, books it, arranges the champagne-on-arrival details — and quietly tells every resort it's your honeymoon, which in this industry is the magic word."
    ],
    best: [
      ["Consider your season", "The 'best' month depends on the destination — Val steers you to where the weather is perfect *when you're traveling*."],
      ["Right after the wedding", "The classic. Val coordinates timing so you're not redlining to the airport the morning after."],
      ["The delayed honeymoon", "Increasingly popular: recover from the wedding first, then take the trip in its ideal season."],
      ["Anniversaries & minimoons", "Romance travel isn't only for newlyweds — vow renewals, babymoons, and milestone anniversaries all get the Val treatment."]
    ],
    itins: [
      ["9 days", "Greek Isles Romance — Athens, Santorini & Mykonos", "Caldera-view suite with a private plunge pool, sunset catamaran, and slow island mornings that blur together beautifully."],
      ["8 days", "Maui + Kauai — Relax & Explore", "Beachfront luxury and couples' spa days on Maui, then Nā Pali Coast adventure and waterfall picnics on Kauai."]
    ],
    tips: [
      "Say the word 'honeymoon' everywhere — upgrades, amenities, and surprises follow. Val makes sure every supplier on your trip knows.",
      "Split-stay honeymoons (beach + city, or two islands) give you both rest and adventure without choosing.",
      "A honeymoon registry can let wedding guests gift experiences — sunset sails, spa days — instead of another serving bowl.",
      "Book 8–14 months out for overwater bungalows and peak-season Europe; the dreamiest rooms are the first to go."
    ],
    faqs: [
      ["How much does a honeymoon typically cost?", "Most of Val's honeymoon clients invest between $5,000 and $15,000 depending on destination, length, and luxury level — with unforgettable options at every point on that range. The free consultation starts with your budget and builds the best possible trip inside it."],
      ["Where are the best overwater bungalows?", "Bora Bora and the Maldives are the icons, with Fiji and Jamaica offering closer-to-home takes. Each differs in flight time, cost, and vibe — Val matches the splurge to your priorities."],
      ["When should we book our honeymoon?", "Eight to fourteen months before travel for peak destinations and overwater categories; six months can work for the Caribbean and Mexico. Booking alongside your wedding planning calendar keeps the best rooms in reach."],
      ["What honeymoon perks can a travel advisor get us?", "Room upgrades where available, honeymoon amenities like champagne and spa credits, late checkout, and welcome touches — plus the intangible perk of someone else handling every logistic while you're mid-wedding."]
    ],
    related: ["caribbean", "hawaii", "europe"]
  }
];

const destBySlug = Object.fromEntries(D.map(d => [d.slug, d]));

function faqSchema(d) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": d.faqs.map(([q, a]) => ({
      "@type": "Question", "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a }
    }))
  }, null, 1);
}
function breadcrumbSchema(d) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://travelsbyval.com/" },
      { "@type": "ListItem", "position": 2, "name": "Destinations", "item": "https://travelsbyval.com/#destinations" },
      { "@type": "ListItem", "position": 3, "name": d.short, "item": `https://travelsbyval.com/destinations/${d.slug}` }
    ]
  }, null, 1);
}

function page(d) {
  const related = d.related.map(s => {
    const r = destBySlug[s];
    return `<a class="dest-tile ${r.grad}" href="/destinations/${r.slug}">
        <div class="dest-tile-body"><h3>${r.short}</h3><p>${r.tagline.split(".")[0]}.</p><span class="dest-tile-cta">Explore &rarr;</span></div>
      </a>`;
  }).join("\n      ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.title}</title>
<meta name="description" content="${d.desc}">
<link rel="canonical" href="https://travelsbyval.com/destinations/${d.slug}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0d1b2a">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Travels by Val">
<meta property="og:title" content="${d.title}">
<meta property="og:description" content="${d.desc}">
<meta property="og:url" content="https://travelsbyval.com/destinations/${d.slug}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/assets/style.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='46' fill='%230d1b2a'/%3E%3Ctext x='50' y='66' font-size='48' text-anchor='middle' fill='%23c19a3f' font-family='Georgia'%3EV%3C/text%3E%3C/svg%3E">
<script type="application/ld+json">
${faqSchema(d)}
</script>
<script type="application/ld+json">
${breadcrumbSchema(d)}
</script>
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>

<header class="site-header">
  <nav class="nav" aria-label="Main navigation">
    <a class="brand" href="/">Travels <em>by</em> Val</a>
    <button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    <ul class="nav-links">
      <li><a href="/#destinations">Destinations</a></li>
      <li><a href="/#specialties">Specialties</a></li>
      <li><a href="/#process">How It Works</a></li>
      <li><a href="/#faq">FAQ</a></li>
      <li><a class="btn btn-gold" href="/#inquiry">Plan My Trip</a></li>
    </ul>
  </nav>
</header>

<main id="main">

<section class="dest-hero ${d.grad}">
  <div class="wrap">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/#destinations">Destinations</a> / ${d.short}</nav>
    <h1>${d.name}</h1>
    <p class="lede" style="color:rgba(255,255,255,.88); margin-top:14px;">${d.tagline}</p>
    <div class="dest-meta">
      <span class="chip">Free consultation</span>
      <span class="chip">Custom itineraries</span>
      <span class="chip">Advisor-only perks</span>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap" style="max-width:820px;">
    <p class="eyebrow">Overview</p>
    <h2 style="margin:16px 0 22px;">Why ${d.short.toLowerCase().startsWith("disney") || d.short.toLowerCase().startsWith("cruis") || d.short.toLowerCase().startsWith("honeymoon") ? d.short.toLowerCase() : d.short} belongs on your list</h2>
    ${d.overview.map(p => `<p style="color:var(--ink-mute); margin-bottom:18px; font-size:1.05rem;">${p}</p>`).join("\n    ")}
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Timing</p>
      <h2>Best times to visit</h2>
    </div>
    <div class="grid grid-2">
      ${d.best.map(([when, why]) => `<div class="card"><h3 style="margin-top:0; font-size:1.15rem; color:var(--gold);">${when}</h3><p>${why}</p></div>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap" style="max-width:860px;">
    <div class="section-head">
      <p class="eyebrow">Sample Itineraries</p>
      <h2>Trips Val loves to build here</h2>
      <p class="lede">Starting points, not templates — every itinerary is customized to your travelers, dates, and budget.</p>
    </div>
    ${d.itins.map(([days, name, blurb]) => `<div class="itin"><span class="days">${days}</span><h3>${name}</h3><p>${blurb}</p></div>`).join("\n    ")}
  </div>
</section>

<section class="section section-ink">
  <div class="wrap" style="max-width:860px;">
    <div class="section-head">
      <p class="eyebrow" style="color:var(--gold-soft);">Insider Tips</p>
      <h2>What Val tells her clients</h2>
    </div>
    <ul style="list-style:none; display:grid; gap:20px;">
      ${d.tips.map(t => `<li style="display:flex; gap:16px; color:rgba(255,255,255,.82);"><span aria-hidden="true" style="color:var(--gold-soft); font-weight:700;">&#10022;</span><span>${t}</span></li>`).join("\n      ")}
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap" style="max-width:840px;">
    <div class="section-head">
      <p class="eyebrow">FAQ</p>
      <h2>${d.short} questions, answered</h2>
    </div>
    ${d.faqs.map(([q, a]) => `<details class="faq-item"><summary>${q}</summary><div class="faq-body">${a}</div></details>`).join("\n    ")}
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <div class="cta-band">
      <div>
        <h2>Ready to start planning?</h2>
        <p>Tell Val about your dream ${d.short} trip — the consultation is free, and the itinerary is built entirely around you.</p>
      </div>
      <a class="btn btn-gold" href="/#inquiry">Plan My ${d.short} Trip</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Keep Exploring</p>
      <h2>You might also love</h2>
    </div>
    <div class="grid grid-3">
      ${related}
    </div>
  </div>
</section>

</main>

<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <a class="brand" href="/" style="color:#fff;">Travels <em>by</em> Val</a>
        <p style="margin-top:16px; max-width:34ch; font-size:.95rem;">Custom vacations, cruises, and celebrations — planned personally, perfected completely.</p>
      </div>
      <div>
        <h4>Destinations</h4>
        <ul>
          <li><a href="/destinations/caribbean">Caribbean</a></li>
          <li><a href="/destinations/europe">Europe</a></li>
          <li><a href="/destinations/hawaii">Hawaii</a></li>
          <li><a href="/destinations/alaska">Alaska</a></li>
          <li><a href="/destinations/mexico">Mexico</a></li>
        </ul>
      </div>
      <div>
        <h4>Trip Types</h4>
        <ul>
          <li><a href="/destinations/cruises">Cruises</a></li>
          <li><a href="/destinations/disney">Disney &amp; Universal</a></li>
          <li><a href="/destinations/honeymoons">Honeymoons</a></li>
          <li><a href="/#specialties">Group Travel</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact Val</h4>
        <ul>
          <li><a href="https://wa.me/13053393588?text=Hi%20Val!">WhatsApp: (305) 339-3588</a></li>
          <li><a href="mailto:valeriadelgado995@gmail.com">valeriadelgado995@gmail.com</a></li>
          <li><a href="https://www.tiktok.com/@val3riadelgado" rel="noopener" target="_blank">TikTok @val3riadelgado</a></li>
          <li><a href="https://www.youtube.com/@TravelByVal" rel="noopener" target="_blank">YouTube @TravelByVal</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Travels by Val. All rights reserved.</span>
      <span>Valeria Delgado &middot; Certified InteleTravel Independent Advisor &middot; St. Petersburg, FL</span>
    </div>
  </div>
</footer>

<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

const outDir = path.join(__dirname, "destinations");
fs.mkdirSync(outDir, { recursive: true });
for (const d of D) {
  fs.writeFileSync(path.join(outDir, d.slug + ".html"), page(d));
  console.log("built destinations/" + d.slug + ".html");
}

// sitemap.xml
const today = "2026-07-03";
const urls = ["https://travelsbyval.com/"]
  .concat(D.map(d => `https://travelsbyval.com/destinations/${d.slug}`));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(__dirname, "sitemap.xml"), sitemap);
console.log("built sitemap.xml (" + urls.length + " urls)");

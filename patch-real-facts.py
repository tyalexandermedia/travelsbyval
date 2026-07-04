#!/usr/bin/env python3
"""Merge Travels by Val's real business facts (from the live site's schema)
into the redesigned homepage, shared JS, and destination page generator."""
import re

# ============ index.html ============
with open("index.html") as f:
    html = f.read()

# ---- 1. Replace generic TravelAgency schema with the real one ----
old_start = html.find('<script type="application/ld+json">')
old_end = html.find('</script>', old_start) + len('</script>')
real_schema = '''<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://travelsbyval.com/#business",
  "name": "Travels by Val",
  "alternateName": "Valeria Delgado \\u2014 Travel Advisor",
  "description": "Certified InteleTravel independent travel advisor based in St. Petersburg, Florida. Free, personalized trip planning including flights, hotels, cruises, all-inclusive resorts, honeymoons, and group travel at no cost to the traveler.",
  "url": "https://travelsbyval.com/",
  "email": "valeriadelgado995@gmail.com",
  "telephone": "+1-305-339-3588",
  "priceRange": "Free to clients",
  "image": "https://travelsbyval.com/photos/val.jpg",
  "founder": {
    "@type": "Person",
    "name": "Valeria Delgado",
    "jobTitle": "Independent Travel Advisor",
    "worksFor": { "@type": "Organization", "name": "InteleTravel" }
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "St. Petersburg",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 27.7676, "longitude": -82.6403 },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "08:00", "closes": "20:00"
  }],
  "areaServed": [
    { "@type": "City", "name": "St. Petersburg" },
    { "@type": "City", "name": "Tampa" },
    { "@type": "AdministrativeArea", "name": "Tampa Bay" },
    { "@type": "Country", "name": "United States" }
  ],
  "knowsAbout": ["Cruise booking","Honeymoon planning","Family vacations","All-inclusive resorts","European travel","Caribbean vacations","Mediterranean cruises","Alaska cruises","Hawaii vacations","Disney vacations","River cruises","Group travel","Mexico resorts"],
  "makesOffer": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free personalized trip planning \\u2014 vendor-paid commission, no fee to the traveler.",
    "itemOffered": { "@type": "Service", "name": "Personalized Travel Planning", "serviceType": "Travel advisory and booking" }
  },
  "memberOf": { "@type": "Organization", "name": "InteleTravel", "description": "World's oldest and largest host travel agency. ARC, IATAN, CLIA, and Ensemble accredited." },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "3", "bestRating": "5", "worstRating": "1" },
  "review": [
    { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Melissa R." }, "reviewBody": "Three kids under 6 and it was the most relaxing vacation we have ever had \\u2014 and it cost us nothing extra." },
    { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Angela T." }, "reviewBody": "She saved us over $800 on our Caribbean cruise and upgraded our cabin without me even asking. I will never book a trip on my own again." },
    { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "James & Sofia K." }, "reviewBody": "She found a boutique Santorini hotel not on any booking site. Going back next year \\u2014 Val is booking it again." }
  ],
  "sameAs": ["https://www.tiktok.com/@val3riadelgado","https://www.youtube.com/@TravelByVal"]
}
</script>'''
html = html[:old_start] + real_schema + html[old_end:]

def rep(old, new):
    global html
    assert old in html, "NOT FOUND: " + old[:80]
    html = html.replace(old, new)

# ---- 2. Title & meta ----
rep("<title>Travels by Val | Personal Travel Advisor — Custom Vacations, Cruises &amp; Honeymoons</title>",
    "<title>Travels by Val | Free Travel Advisor in St. Pete, FL — Cruises, Resorts &amp; Honeymoons</title>")
rep('<meta name="description" content="Travels by Val is your personal travel advisor for custom vacations, cruises, all-inclusive resorts, Disney trips, honeymoons, and group travel. Expert planning, VIP perks, zero stress — start with a free consultation.">',
    '<meta name="description" content="Valeria Delgado is a certified InteleTravel advisor in St. Petersburg, FL planning cruises, all-inclusive resorts, Disney trips, honeymoons, and group travel — completely free to you. Start with a consultation today.">')
rep('<meta property="og:title" content="Travels by Val | Personal Travel Advisor">',
    '<meta property="og:title" content="Travels by Val | Free Travel Advisor in St. Pete, FL">')
rep('<meta property="og:description" content="Custom vacations, cruises, and honeymoons planned by a trusted personal travel advisor. Free consultation.">',
    '<meta property="og:description" content="Cruises, resorts, and honeymoons planned by certified advisor Valeria Delgado — at no cost to you.">')
rep('<meta name="twitter:title" content="Travels by Val | Personal Travel Advisor">',
    '<meta name="twitter:title" content="Travels by Val | Free Travel Advisor in St. Pete, FL">')

# ---- 3. Hero ----
rep('<p class="eyebrow">Your Personal Travel Advisor</p>',
    '<p class="eyebrow">Certified Travel Advisor &middot; St. Pete, FL</p>')
rep('<p class="lede">From sun-drenched Caribbean escapes to once-in-a-lifetime European journeys, Val designs custom vacations around the way <strong>you</strong> love to travel — and handles every detail so all you do is enjoy it.</p>',
    '<p class="lede">From sun-drenched Caribbean escapes to once-in-a-lifetime European journeys, Valeria Delgado designs custom vacations around the way <strong>you</strong> love to travel — and because vendors pay her commission, her expertise costs you <strong>nothing</strong>.</p>')
rep('</svg>Free consultations — always</li>',
    '</svg>100% free to you — vendor-paid, always</li>')
rep('</svg>Exclusive perks &amp; upgrades</li>',
    '</svg>Certified InteleTravel advisor — ARC, IATAN &amp; CLIA accredited agency</li>')

# ---- 4. Why Val bio ----
rep("<p style=\"color:var(--ink-mute); margin-bottom:16px;\">Val is an independent travel advisor who has walked the decks, toured the resorts, and tested the itineraries she recommends. When you plan with her, you get honest, first-hand guidance — not an algorithm&rsquo;s guess.</p>",
    "<p style=\"color:var(--ink-mute); margin-bottom:16px;\">Valeria Delgado is a certified independent advisor with InteleTravel — the world&rsquo;s oldest and largest host agency, accredited by ARC, IATAN, CLIA, and Ensemble. Based in St. Petersburg, Florida, she serves travelers across Tampa Bay and nationwide, and she has walked the decks, toured the resorts, and tested the itineraries she recommends.</p>")
rep("<p style=\"color:var(--ink-mute); margin-bottom:34px;\">And because advisors are compensated by travel suppliers, her expertise typically costs you nothing extra. Same price as booking direct. Infinitely better experience.</p>",
    "<p style=\"color:var(--ink-mute); margin-bottom:34px;\">And because hotels, airlines, cruise lines, and resorts pay her commission — already built into the price you&rsquo;d pay anyway — her expertise costs you nothing. Same price as booking direct. Infinitely better experience.</p>")

# ---- 5. Real testimonials ----
rep("<blockquote>&ldquo;Val took our vague &lsquo;somewhere warm in March&rsquo; and turned it into the best vacation we&rsquo;ve ever taken. The resort upgrade was the cherry on top.&rdquo;</blockquote>\n        <figcaption>— Happy Client, All-Inclusive Getaway</figcaption>",
    "<blockquote>&ldquo;Three kids under 6 and it was the most relaxing vacation we have ever had — and it cost us nothing extra.&rdquo;</blockquote>\n        <figcaption>— Melissa R., Family Vacation</figcaption>")
rep("<blockquote>&ldquo;Our first cruise felt overwhelming until Val walked us through everything. She picked the perfect ship and even our cabin location was spot-on.&rdquo;</blockquote>\n        <figcaption>— Happy Client, First-Time Cruisers</figcaption>",
    "<blockquote>&ldquo;She saved us over $800 on our Caribbean cruise and upgraded our cabin without me even asking. I will never book a trip on my own again.&rdquo;</blockquote>\n        <figcaption>— Angela T., Caribbean Cruise</figcaption>")
rep("<blockquote>&ldquo;When our flight was canceled mid-trip, Val had us rebooked before we&rsquo;d even finished our coffee. That alone is worth everything.&rdquo;</blockquote>\n        <figcaption>— Happy Client, European Vacation</figcaption>",
    "<blockquote>&ldquo;She found a boutique Santorini hotel not on any booking site. Going back next year — Val is booking it again.&rdquo;</blockquote>\n        <figcaption>— James &amp; Sofia K., Greece</figcaption>")

# ---- 6. FAQ visible copy + JSON-LD ----
rep("In most cases, no. Travel advisors are compensated by the resorts, cruise lines, and tour operators they book with — so you pay the same price you&rsquo;d find on your own, and often less once perks like onboard credit, room upgrades, and resort amenities are factored in. Your consultation with Val is always free.",
    "Nothing. Hotels, airlines, cruise lines, and resorts pay InteleTravel advisors a commission that is already built into the price you would pay booking directly — so you get a dedicated, certified expert at no extra cost, and often extra perks like onboard credit and room upgrades on top.")
rep('<details class="faq-item reveal">\n      <summary>What happens after I submit an inquiry?</summary>',
    '<details class="faq-item reveal">\n      <summary>Where is Travels by Val located — and do I have to be nearby?</summary>\n      <div class="faq-body">Valeria is based in St. Petersburg, Florida and works with travelers across Tampa Bay and nationwide. Planning happens by phone, WhatsApp, and email — so wherever you live, your advisor is one message away.</div>\n    </details>\n    <details class="faq-item reveal">\n      <summary>What happens after I submit an inquiry?</summary>')
rep('"text": "In most cases, no. Travel advisors are compensated by the resorts, cruise lines, and tour operators they book with, so you pay the same price you\'d find on your own — often less, with added perks like onboard credit, room upgrades, and resort amenities. Your consultation with Val is always free."',
    '"text": "Nothing. Hotels, airlines, cruise lines, and resorts pay InteleTravel advisors a commission already built into the price you would pay booking directly — so you get a dedicated, certified expert at no extra cost. Your consultation with Val is always free."')
rep('    {\n      "@type": "Question",\n      "name": "How does the planning process work?",',
    '    {\n      "@type": "Question",\n      "name": "Where is Travels by Val located?",\n      "acceptedAnswer": { "@type": "Answer", "text": "Travels by Val is based in St. Petersburg, Florida, serving travelers throughout Tampa Bay and nationwide. Valeria Delgado plans trips by phone, WhatsApp, and email, so clients anywhere in the U.S. get the same personal service." }\n    },\n    {\n      "@type": "Question",\n      "name": "How does the planning process work?",')

# ---- 7. Inquiry: WhatsApp primary CTA ----
WA = '''<p style="color:var(--ink-mute); margin-bottom:22px;">Tell Val a little about the trip you&rsquo;re dreaming of. She&rsquo;ll personally reach out to schedule your <strong>free, no-obligation consultation</strong>.</p>'''
rep(WA, WA + '''
        <a class="btn btn-ink" href="https://wa.me/13053393588?text=Hi%20Val!%20I%27d%20love%20help%20planning%20a%20trip." style="margin-bottom:14px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.3c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1a13 13 0 01-1.5-.5c-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.7s.6-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.1.3.7 1.1 1.4 1.8 1 .9 1.8 1.1 2.1 1.3.3.1.4.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.1.1.7-.1 1.3z"/></svg>
          Message Val on WhatsApp</a>
        <p class="form-note" style="margin-bottom:22px;">Fastest response — usually same day. Or use the form and Val will email you back.</p>''')

# ---- 8. Footer contact ----
rep('''      <div>
        <h4>Get Started</h4>
        <ul>
          <li><a href="/#inquiry">Free Consultation</a></li>
          <li><a href="/#process">How It Works</a></li>
          <li><a href="/#faq">FAQ</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Travels by Val. All rights reserved.</span>
      <span>Independent Travel Advisor</span>
    </div>''',
    '''      <div>
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
    </div>''')

with open("index.html", "w") as f:
    f.write(html)
print("index.html: real facts merged")

# ============ site.js: real contact email ============
with open("assets/site.js") as f:
    js = f.read()
js = js.replace('var CONTACT_EMAIL = "hello@travelsbyval.com";',
                'var CONTACT_EMAIL = "valeriadelgado995@gmail.com";')
with open("assets/site.js", "w") as f:
    f.write(js)
print("site.js: contact email set")

# ============ build-destinations.js: real footer on generated pages ============
with open("build-destinations.js") as f:
    gen = f.read()
gen = gen.replace('''      <div>
        <h4>Get Started</h4>
        <ul>
          <li><a href="/#inquiry">Free Consultation</a></li>
          <li><a href="/#process">How It Works</a></li>
          <li><a href="/#faq">FAQ</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Travels by Val. All rights reserved.</span>
      <span>Independent Travel Advisor</span>
    </div>''', '''      <div>
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
    </div>''')
with open("build-destinations.js", "w") as f:
    f.write(gen)
print("build-destinations.js: footer updated")

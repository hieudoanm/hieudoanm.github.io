export const DOC = `# Instagram Infographic Creator — Template Reference

96 templates across 16 categories, each with a unique YAML schema. Template components receive
\`{ data: Record<string, unknown> }\` and extract their own fields.

## Full YAML (Multi-Post Editing)

The right sidebar's **Full YAML** tab shows all posts in a single multi-document YAML stream.
Each post is separated by \`---\` with a comment header indicating its index and template.

This view is **editable** — changes to content, template, post count, or order are reflected
in the carousel, sidebar, and Single YAML editor.

**Format example:**

\`\`\`yaml
# Post 1 (Minimal)
minimal:
  headline: The Art of Focus
  text: A body paragraph here.
  imageUrl: ""

---

# Post 2 (Bold Quote)
bold-quote:
  quote: A meaningful quote.
  author: Seneca
  imageUrl: ""
\`\`\`

Each document must use the template ID as its root key. Supported template IDs are listed
in each section below. Unknown template IDs produce an error.

> **Limit:** Maximum of **20 posts** per carousel. The ideal number for Instagram is **8 images**
> (most carousels perform best with 8 slides or fewer).

---

## 1. Minimal

**Description:** Clean serif headline with body text and bottom image.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`text\` | string | Body paragraph |
| \`imageUrl\` | string | URL to an image |

**Default content:**

\`\`\`yaml
minimal:
  headline: The Art of Focus
  text: In a world of constant distraction, the ability to concentrate on what truly matters has become a superpower.
  imageUrl: ""
\`\`\`

---

## 2. Bold Quote

**Description:** Large italic quote with attribution and optional portrait.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`quote\` | string | The quoted text |
| \`author\` | string | Person or source |
| \`imageUrl\` | string | Optional portrait URL |

**Default content:**

\`\`\`yaml
bold-quote:
  quote: The happiness of your life depends upon the quality of your thoughts.
  author: Marcus Aurelius
  imageUrl: ""
\`\`\`

---

## 3. Split Screen

**Description:** Image on the left, headline and text on the right with a red accent bar.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`text\` | string | Body paragraph |
| \`imageUrl\` | string | URL to an image |

**Default content:**

\`\`\`yaml
split-screen:
  headline: Less is More
  text: Simplicity is the ultimate sophistication. Every element must earn its place through purpose.
  imageUrl: ""
\`\`\`

---

## 4. Card Overlay

**Description:** Full-bleed background image with a floating rounded text card overlay.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`text\` | string | Body paragraph |
| \`imageUrl\` | string | Background image URL |

**Default content:**

\`\`\`yaml
card-overlay:
  headline: New Horizons
  text: The future belongs to those who believe in the beauty of their dreams.
  imageUrl: ""
\`\`\`

---

## 5. Timeline

**Description:** Chronological entries with date and event, optional bottom image.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`title\` | string | Timeline title |
| \`entries\` | array of \`{date, event}\` | Chronological entries |
| \`imageUrl\` | string | Optional bottom image URL |

**Default content:**

\`\`\`yaml
timeline:
  title: Project Milestones
  entries:
    - date: Q1 2024
      event: Research phase complete
    - date: Q2 2024
      event: MVP development started
    - date: Q3 2024
      event: Beta launch
    - date: Q4 2024
      event: Public release
  imageUrl: ""
\`\`\`

---

## 6. Listicle

**Description:** Numbered list items with headline and optional bottom image.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`text\` | string | Supporting paragraph |
| \`items\` | array of string | List of points |
| \`imageUrl\` | string | Optional bottom image URL |

**Default content:**

\`\`\`yaml
listicle:
  headline: 3 Daily Habits
  text: Small daily improvements over time lead to massive results.
  items:
    - Wake up at 5 AM
    - Read for 30 minutes
    - Exercise daily
  imageUrl: ""
\`\`\`

---

## 7. Comparison

**Description:** Side-by-side Before and After columns with labels.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`before\` | object \`{label, text}\` | Before column |
| \`after\` | object \`{label, text}\` | After column |
| \`imageUrl\` | string | Optional shared image URL |

**Default content:**

\`\`\`yaml
comparison:
  headline: Before vs After
  before:
    label: Before
    text: Manual process took 4 hours per report with frequent errors.
  after:
    label: After
    text: Automated pipeline runs in 5 minutes with 99.9% accuracy.
  imageUrl: ""
\`\`\`

---

## 8. Step by Step

**Description:** Three numbered step cards displayed horizontally.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`text\` | string | Supporting paragraph |
| \`steps\` | array of \`{label}\` | Step definitions |

**Default content:**

\`\`\`yaml
step-by-step:
  headline: Getting Started
  text: Follow these three steps to begin your journey.
  steps:
    - label: Discover
    - label: Learn
    - label: Apply
\`\`\`

---

## 9. Data/Stats

**Description:** Large centered statistic with supporting text and optional background image.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`stat\` | string | Large statistic (e.g. "84%") |
| \`headline\` | string | Main title |
| \`text\` | string | Supporting paragraph |
| \`imageUrl\` | string | Optional background image URL |

**Default content:**

\`\`\`yaml
data-stats:
  stat: 84%
  headline: User Satisfaction
  text: Based on survey responses from over 10,000 active users across 50 countries.
  imageUrl: ""
\`\`\`

---

## 10. Full Bleed

**Description:** Full background image with semi-transparent overlay and centered text.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`text\` | string | Body paragraph |
| \`imageUrl\` | string | Background image URL |

**Default content:**

\`\`\`yaml
full-bleed:
  headline: Dream Bigger
  text: The only limit to your impact is your imagination and commitment to act.
  imageUrl: ""
\`\`\`

---

## 11. Checklist

**Description:** A list of items with checkmark icons.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`items\` | array of string | Checklist items |

**Default content:**

\`\`\`yaml
checklist:
  headline: Launch Checklist
  items:
    - Write final copy
    - Review analytics
    - Test on mobile
    - Schedule social posts
\`\`\`

---

## 12. Myth vs Fact

**Description:** Side-by-side myth busting with X and checkmark icons.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`myth\` | string | The misconception |
| \`fact\` | string | The truth |

**Default content:**

\`\`\`yaml
myth-vs-fact:
  headline: Common Misconceptions
  myth: Eating at night causes weight gain by itself.
  fact: Total calorie intake matters most, not the time of day you eat.
\`\`\`

---

## 13. Announcement

**Description:** Badge, headline, body text, and date — great for product launches.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`badge\` | string | Chip label (e.g. "New", "Launch") |
| \`headline\` | string | Main title |
| \`text\` | string | Body paragraph |
| \`date\` | string | Date or timeline label |

**Default content:**

\`\`\`yaml
announcement:
  badge: Launching Soon
  headline: A New Way to Work
  text: We are building a platform that reimagines how teams collaborate across time zones.
  date: Coming Q1 2025
\`\`\`

---

## 14. Profile Card

**Description:** Avatar, name, title, and bio — ideal for team or speaker spotlights.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`name\` | string | Full name |
| \`title\` | string | Job title or role |
| \`bio\` | string | Short biography |
| \`imageUrl\` | string | Profile photo URL |

**Default content:**

\`\`\`yaml
profile-card:
  name: Alex Chen
  title: Product Designer
  bio: Designing meaningful experiences at the intersection of simplicity and functionality.
  imageUrl: ""
\`\`\`

---

## 15. Glossary

**Description:** Term, definition, and optional example sentence.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`term\` | string | The word or phrase |
| \`definition\` | string | Clear explanation |
| \`example\` | string | Usage example sentence |

**Default content:**

\`\`\`yaml
glossary:
  term: Synergy
  definition: The interaction of two or more elements that produces a combined effect greater than the sum of their separate effects.
  example: The synergy between the design and engineering teams led to a breakthrough product.
\`\`\`

---

## 16. Question

**Description:** A poll or quiz question with lettered answer options.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | The question |
| \`options\` | array of string | Answer choices |

**Default content:**

\`\`\`yaml
question:
  headline: What matters most in a product?
  options:
    - User experience
    - Performance
    - Design
    - Price
\`\`\`

---

## 17. Steps Horizontal

**Description:** Horizontally connected step flow with numbered circles.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`steps\` | array of \`{label}\` | Step definitions |

**Default content:**

\`\`\`yaml
steps-horizontal:
  headline: How It Works
  steps:
    - label: Plan
    - label: Build
    - label: Launch
\`\`\`

---

## 18. Takeaway

**Description:** Key insight with red left border and optional source attribution.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`text\` | string | Key insight text |
| \`source\` | string | Attribution source |

**Default content:**

\`\`\`yaml
takeaway:
  headline: Attention is the New Currency
  text: In an information-rich world, the scarcest resource is not information but attention.
  source: Herbert Simon, 1971
\`\`\`

---

## 19. Feature Grid

**Description:** A 2x2 grid of feature blocks with numbered icons.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`features\` | array of \`{label, desc}\` | Feature definitions (max 4 shown) |

**Default content:**

\`\`\`yaml
feature-grid:
  headline: Why Choose Us
  features:
    - label: Fast
      desc: Optimized for speed and performance
    - label: Secure
      desc: End-to-end encryption by default
    - label: Simple
      desc: Minimal learning curve
    - label: Scalable
      desc: Grows with your needs
\`\`\`

---

## 20. Testimonial

**Description:** Star rating, quote, avatar, name, and title.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`quote\` | string | Customer testimonial |
| \`name\` | string | Customer name |
| \`title\` | string | Customer role or company |
| \`rating\` | number | Star rating 1-5 |
| \`imageUrl\` | string | Optional photo URL |

**Default content:**

\`\`\`yaml
testimonial:
  quote: This tool completely transformed our workflow. We went from chaos to clarity in days.
  name: Sarah Mitchell
  title: CEO, Brightside Inc.
  rating: 5
  imageUrl: ""
\`\`\`

---

## 21. Pricing Card

**Description:** Plan name, price, feature list, and CTA button.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`plan\` | string | Plan name (e.g. "Pro") |
| \`price\` | string | Price display (e.g. "$29/mo") |
| \`features\` | array of string | Feature list items |

**Default content:**

\`\`\`yaml
pricing-card:
  plan: Pro Plan
  price: $29
  features:
    - Unlimited projects
    - Priority support
    - Advanced analytics
    - Team collaboration
\`\`\`

---

## 22. Tip Card

**Description:** Large number, headline, and body text — great for tip series.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`number\` | string | Display number (e.g. "01") |
| \`headline\` | string | Main title |
| \`text\` | string | Body paragraph |

**Default content:**

\`\`\`yaml
tip-card:
  number: "01"
  headline: Start Small
  text: Break your goals into tiny, manageable steps. Consistency beats intensity every time.
\`\`\`

---

## 23. Stat Row

**Description:** Row of 3 statistics with values and labels.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`stats\` | array of \`{value, label}\` | Statistics (max 3 shown) |

**Default content:**

\`\`\`yaml
stat-row:
  headline: By the Numbers
  stats:
    - value: 10K+
      label: Users
    - value: 99.9%
      label: Uptime
    - value: 24/7
      label: Support
\`\`\`

---

## 24. FAQ

**Description:** Question and answer pairs in bordered cards.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`items\` | array of \`{q, a}\` | Question-answer pairs |

**Default content:**

\`\`\`yaml
faq:
  headline: Frequently Asked
  items:
    - q: How does it work?
      a: Sign up, customize your template, and download your image in seconds.
    - q: Is it free?
      a: Yes, all templates are free to use with no hidden fees.
\`\`\`

---

## 25. Pull Quote

**Description:** Large decorative pull quote with opening mark.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`quote\` | string | The quoted text |
| \`author\` | string | Author name |
| \`source\` | string | Attribution source |

**Default content:**

\`\`\`yaml
pull-quote:
  quote: The only way to do great work is to love what you do.
  author: Steve Jobs
  source: Stanford commencement address, 2005
\`\`\`

---

## 26. Haiku

**Description:** Three-line poetic format with title.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`title\` | string | Poem title |
| \`line1\` | string | First line (5 syllables) |
| \`line2\` | string | Second line (7 syllables) |
| \`line3\` | string | Third line (5 syllables) |

**Default content:**

\`\`\`yaml
haiku:
  title: Silence
  line1: An old silent pond
  line2: A frog jumps into the pond
  line3: Splash! Silence again
\`\`\`

---

## 27. Bullet List

**Description:** Simple bullet point list with headline.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`items\` | array of string | List of points |

**Default content:**

\`\`\`yaml
bullet-list:
  headline: Key Points
  items:
    - Increased productivity
    - Better collaboration
    - Reduced costs
    - Faster delivery
\`\`\`

---

## 28. Ranking

**Description:** Ranked positions with labels.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`items\` | array of \`{rank, label}\` | Ranked items |

**Default content:**

\`\`\`yaml
ranking:
  headline: Top Priorities
  items:
    - rank: 1st
      label: Innovation
    - rank: 2nd
      label: Quality
    - rank: 3rd
      label: Speed
\`\`\`

---

## 29. Pros & Cons

**Description:** Two-column pros and cons comparison.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`pros\` | array of string | Advantages |
| \`cons\` | array of string | Disadvantages |

**Default content:**

\`\`\`yaml
proscons:
  headline: Pros & Cons
  pros:
    - Fast setup
    - Low cost
    - Easy to use
  cons:
    - Limited features
    - Steep learning curve
\`\`\`

---

## 30. Versus

**Description:** Two-item feature-by-feature comparison.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`optionA\` | object \`{label, desc}\` | First option |
| \`optionB\` | object \`{label, desc}\` | Second option |
| \`features\` | array of \`{a, b}\` | Feature rows |

**Default content:**

\`\`\`yaml
versus:
  headline: Versus
  optionA:
    label: Free
    desc: ""
  optionB:
    label: Pro
    desc: ""
  features:
    - a: Basic analytics
      b: Advanced analytics
    - a: 1 user
      b: Unlimited users
    - a: Email support
      b: Priority support
\`\`\`

---

## 31. Rating Scale

**Description:** Star rating display with label and caption.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`rating\` | number | Rating value 1-5 |
| \`scaleMax\` | number | Maximum rating (default 5) |
| \`label\` | string | Rating label |
| \`sublabel\` | string | Rating sublabel |

**Default content:**

\`\`\`yaml
rating-scale:
  headline: Customer Rating
  rating: 4
  scaleMax: 5
  label: Excellent
  sublabel: Based on 2,500+ reviews
\`\`\`

---

## 32. Progress List

**Description:** Items with progress bars and percentages.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`items\` | array of \`{label, pct}\` | Progress items |

**Default content:**

\`\`\`yaml
progress-list:
  headline: Progress
  items:
    - label: Design
      pct: 90
    - label: Development
      pct: 65
    - label: Testing
      pct: 40
    - label: Deployment
      pct: 20
\`\`\`

---

## 33. Counter

**Description:** Single large number counter display.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`number\` | string | Counter number (e.g. 10K+) |
| \`headline\` | string | Main title |
| \`text\` | string | Supporting text |
| \`suffix\` | string | Suffix label |

**Default content:**

\`\`\`yaml
counter:
  number: 10K+
  headline: Users Worldwide
  text: Join a growing community of creators and innovators.
  suffix: Active users
\`\`\`

---

## 34. Mosaic

**Description:** 2x2 image grid layout.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`images\` | array of string | 4 image URLs |

**Default content:**

\`\`\`yaml
mosaic:
  images:
    - ""
    - ""
    - ""
    - ""
\`\`\`

---

## 35. Video Still

**Description:** Video player mockup with play button.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`imageUrl\` | string | Thumbnail image URL |
| \`headline\` | string | Video title |
| \`duration\` | string | Duration display (e.g. 12:34) |

**Default content:**

\`\`\`yaml
video-still:
  imageUrl: ""
  headline: Product Demo
  duration: 3:45
\`\`\`

---

## 36. Cinema Banner

**Description:** Wide letterbox banner with centered text overlay.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`imageUrl\` | string | Background image URL |
| \`headline\` | string | Main title |
| \`text\` | string | Body text |
| \`caption\` | string | Bottom caption |

**Default content:**

\`\`\`yaml
cinema-banner:
  imageUrl: ""
  headline: A New Chapter
  text: Every great story begins with a single step into the unknown.
  caption: Coming this summer
\`\`\`

---

## 37. Collage

**Description:** Overlapping image arrangement.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`images\` | array of string | 3 image URLs |

**Default content:**

\`\`\`yaml
collage:
  images:
    - ""
    - ""
    - ""
\`\`\`

---

## 38. Team Row

**Description:** Horizontal team member row with avatars.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Section title |
| \`members\` | array of \`{name, role, imageUrl}\` | Team members |

**Default content:**

\`\`\`yaml
team-row:
  headline: Our Team
  members:
    - name: Alice
      role: Designer
    - name: Bob
      role: Developer
    - name: Carol
      role: Manager
\`\`\`

---

## 39. Event Card

**Description:** Event details with date, time, and location.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`title\` | string | Event title |
| \`date\` | string | Event date |
| \`time\` | string | Event time |
| \`location\` | string | Event location |
| \`description\` | string | Event description |

**Default content:**

\`\`\`yaml
event-card:
  title: Design Summit 2025
  date: JAN 15
  time: 10:00 AM — 4:00 PM
  location: San Francisco, CA
  description: Join industry leaders for a day of talks, workshops, and networking.
\`\`\`

---

## 40. Share CTA

**Description:** Call to action for sharing content.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`text\` | string | Body paragraph |
| \`buttonLabel\` | string | Button text |
| \`hashtag\` | string | Associated hashtag |

**Default content:**

\`\`\`yaml
share-cta:
  headline: Share This
  text: Help others discover this content by sharing it with your network.
  buttonLabel: Share Now
  hashtag: "#Infographic"
\`\`\`

---

## 41. Mention

**Description:** Social media mention card with engagement.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`handle\` | string | Social media handle |
| \`quote\` | string | Post content |
| \`name\` | string | Display name |
| \`avatarUrl\` | string | Avatar image URL |
| \`likes\` | string | Like count |

**Default content:**

\`\`\`yaml
mention:
  handle: "@designer"
  quote: Great content! Really insightful perspective on this topic.
  name: Designer Pro
  avatarUrl: ""
  likes: "124"
\`\`\`

---

## 42. Offer Banner

**Description:** Discount or promo banner with badge and CTA.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`badge\` | string | Offer badge label |
| \`headline\` | string | Main title |
| \`text\` | string | Body paragraph |
| \`code\` | string | Promo code |
| \`cta\` | string | Call to action text |

**Default content:**

\`\`\`yaml
offer-banner:
  badge: Limited Offer
  headline: Special Offer
  text: Get 30% off your first month. No commitment required.
  code: WELCOME30
  cta: Claim Offer
\`\`\`

---

## 43. Affirmation

**Description:** Positive "I am" affirmation statement.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`affirmation\` | string | The affirmation text |
| \`subtitle\` | string | Supporting subtitle |

**Default content:**

\`\`\`yaml
affirmation:
  affirmation: Resilient
  subtitle: Every setback is a setup for a comeback.
\`\`\`

---

## 44. Manifesto

**Description:** Bold list of principles or beliefs.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`principles\` | array | Array of principle strings |

**Default content:**

\`\`\`yaml
manifesto:
  headline: Our Manifesto
  principles:
    - Design with purpose
    - Build for people
    - Iterate relentlessly
    - Stay curious
\`\`\`

---

## 45. Vision Board

**Description:** Image collage with overlay title and body text.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`text\` | string | Body paragraph |
| \`imageUrl\` | string | URL to an image |

**Default content:**

\`\`\`yaml
vision-board:
  headline: Dream Big
  text: Visualise your goals, then work backwards from the future you want to create.
  imageUrl: ""
\`\`\`

---

## 46. Daily Wisdom

**Description:** Short wisdom quote with author attribution.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`wisdom\` | string | The wisdom text |
| \`author\` | string | Author name |

**Default content:**

\`\`\`yaml
daily-wisdom:
  wisdom: The only limit to our realisation of tomorrow is our doubts of today.
  author: Franklin D. Roosevelt
\`\`\`

---

## 47. Mission Statement

**Description:** Mission and vision pair with headline.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Section headline |
| \`mission\` | string | Mission statement |
| \`vision\` | string | Vision statement |

**Default content:**

\`\`\`yaml
mission-statement:
  headline: Our Mission
  mission: Empower every person and organisation on the planet to achieve more.
  vision: A world where everyone has access to the tools they need to succeed.
\`\`\`

---

## 48. Belief Card

**Description:** "I believe" statement with author and context.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`belief\` | string | The belief statement |
| \`author\` | string | Person who holds this belief |
| \`context\` | string | Optional context |

**Default content:**

\`\`\`yaml
belief-card:
  belief: Simplicity is the ultimate sophistication.
  author: Leonardo da Vinci
  context: Renaissance artist and inventor
\`\`\`

---

## 49. Poll Vote

**Description:** Poll question with percentage bars.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`question\` | string | Poll question |
| \`options\` | array | Array of {label, percentage} objects |

**Default content:**

\`\`\`yaml
poll-vote:
  question: What matters most in design?
  options:
    - label: Usability
      percentage: 45
    - label: Aesthetics
      percentage: 30
    - label: Performance
      percentage: 25
\`\`\`

---

## 50. Quiz Question

**Description:** Multiple choice quiz with lettered options.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`question\` | string | Quiz question |
| \`options\` | array | Array of answer strings |

**Default content:**

\`\`\`yaml
quiz-question:
  question: Which colour scheme is best for accessibility?
  options:
    - High contrast with text labels
    - Pastel on pastel
    - Neon on black
    - All lowercase letters
\`\`\`

---

## 51. This or That

**Description:** Binary choice comparison with VS divider.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Main title |
| \`optionA\` | string | Left option |
| \`optionB\` | string | Right option |

**Default content:**

\`\`\`yaml
this-or-that:
  headline: Which do you choose?
  optionA: Remote Work
  optionB: Office Culture
\`\`\`

---

## 52. Challenge Card

**Description:** Challenge prompt with day count.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`headline\` | string | Challenge title |
| \`description\` | string | Challenge description |
| \`days\` | string | Duration (e.g. 30) |

**Default content:**

\`\`\`yaml
challenge-card:
  headline: Write Every Day
  description: Build a writing habit one day at a time.
  days: "30"
\`\`\`

---

## 53. Fill in the Blank

**Description:** Text with a blank to fill in.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`text\` | string | Text with ___ marker |
| \`blank\` | string | The answer |
| \`hint\` | string | Optional hint |
| \`author\` | string | Optional attribution |

**Default content:**

\`\`\`yaml
fill-blank:
  text: The only thing we have to fear is ___ itself.
  blank: fear
  hint: Franklin D. Roosevelt
  author: Franklin D. Roosevelt
\`\`\`

---

## 54. Q&A

**Description:** Question and answer card with category.

**Fields:**

| Key | Type | Description |
|---|---|---|
| \`question\` | string | The question |
| \`answer\` | string | The answer |
| \`category\` | string | Topic category |

**Default content:**

\`\`\`yaml
q-and-a:
  question: What is design thinking?
  answer: A human-centred approach to innovation that integrates the needs of people, technology, and business.
  category: Design
\`\`\`

---

}

---

## 55. Study Tips

**Category:** Education & Learning
**Description:** Study technique with numbered steps.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`technique\` | string | Study technique name |
| \`description\` | string | Brief explanation |
| \`steps\` | array | Array of step strings |
| \`subject\` | string | Subject or topic |

**Default content:**

\`\`\`yaml
study-tips:
  technique: Pomodoro Technique
  description: A time management method that uses focused work intervals followed by short breaks.
  steps:
    - Choose a task to work on
    - Set a 25-minute timer
    - Work until the timer rings
    - Take a 5-minute break
  subject: Study Skills
\`\`\`

---

## 56. Flash Card

**Category:** Education & Learning
**Description:** Term and definition card with example.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`term\` | string | The word or concept |
| \`definition\` | string | Clear definition |
| \`category\` | string | Topic category |
| \`example\` | string | Usage example |

**Default content:**

\`\`\`yaml
flash-card:
  term: Photosynthesis
  definition: The process by which plants convert light energy into chemical energy to fuel their growth.
  category: Biology
  example: Plants use chlorophyll to capture sunlight during photosynthesis.
\`\`\`

---

## 57. Subject Summary

**Category:** Education & Learning
**Description:** Topic overview with key points and summary.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`subject\` | string | Subject name |
| \`topic\` | string | Specific topic |
| \`keyPoints\` | array | Array of key point strings |
| \`summary\` | string | Concluding summary |

**Default content:**

\`\`\`yaml
subject-summary:
  subject: Science
  topic: The Water Cycle
  keyPoints:
    - Water evaporates from oceans and lakes
    - Vapour rises and condenses into clouds
    - Precipitation returns water to the surface
    - Runoff carries water back to oceans
  summary: The water cycle is a continuous process that distributes water across the planet.
\`\`\`

---

## 58. Learning Path

**Category:** Education & Learning
**Description:** Connected step-by-step learning roadmap.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Path title |
| \`steps\` | array | Array of {level, label, desc} objects |

**Default content:**

\`\`\`yaml
learning-path:
  title: Learn Web Development
  steps:
    - level: "1"
      label: HTML & CSS
      desc: Build static web pages
    - level: "2"
      label: JavaScript
      desc: Add interactivity
    - level: "3"
      label: React
      desc: Build modern UIs
    - level: "4"
      label: Backend
      desc: APIs and databases
\`\`\`

---

## 59. Quick Quiz

**Category:** Education & Learning
**Description:** Multiple choice question with answer reveal.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`question\` | string | Quiz question |
| \`options\` | array | Array of answer strings |
| \`answer\` | string | Correct answer |
| \`explanation\` | string | Why the answer is correct |

**Default content:**

\`\`\`yaml
quick-quiz:
  question: What is the capital of Japan?
  options:
    - Seoul
    - Beijing
    - Tokyo
    - Bangkok
  answer: Tokyo
  explanation: Tokyo has been the capital of Japan since 1868, during the Meiji Restoration.
\`\`\`

---

## 60. Course Highlight

**Category:** Education & Learning
**Description:** Course overview with module list and badges.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Course title |
| \`instructor\` | string | Instructor name |
| \`modules\` | array | Array of module name strings |
| \`duration\` | string | Course duration |
| \`level\` | string | Difficulty level |

**Default content:**

\`\`\`yaml
course-highlight:
  title: JavaScript Fundamentals
  instructor: Jane Doe
  modules:
    - Variables & Types
    - Functions & Scope
    - Objects & Arrays
    - Async Programming
  duration: 8 weeks
  level: Beginner
\`\`\`

---

## 61. Budget Tracker

**Category:** Finance
**Description:** Income, expenses, and savings overview with bars.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Budget title |
| \`income\` | string | Income amount |
| \`expenses\` | string | Expenses amount |
| \`savings\` | string | Savings amount |
| \`period\` | string | Time period |

**Default content:**

\`\`\`yaml
budget-tracker:
  title: Monthly Budget
  income: $5,000
  expenses: $3,200
  savings: $1,800
  period: March 2025
\`\`\`

---

## 62. Savings Goal

**Category:** Finance
**Description:** Goal tracking with progress bar and deadline.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`goal\` | string | Savings goal name |
| \`target\` | string | Target amount |
| \`current\` | string | Current saved amount |
| \`deadline\` | string | Goal deadline |
| \`note\` | string | Optional note |

**Default content:**

\`\`\`yaml
savings-goal:
  goal: Emergency Fund
  target: $10,000
  current: $6,500
  deadline: Dec 2025
  note: Saving $500 per month
\`\`\`

---

## 63. Expense Log

**Category:** Finance
**Description:** Recent expense entries with categories and amounts.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Log title |
| \`expenses\` | array | Array of {category, amount, date} objects |

**Default content:**

\`\`\`yaml
expense-log:
  title: Recent Expenses
  expenses:
    - category: Groceries
      amount: $85
      date: Mar 15
    - category: Transport
      amount: $35
      date: Mar 14
    - category: Dining
      amount: $52
      date: Mar 13
    - category: Utilities
      amount: $120
      date: Mar 12
\`\`\`

---

## 64. Investment Tip

**Category:** Finance
**Description:** Investment advice with risk level badge.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`tip\` | string | Investment tip |
| \`category\` | string | Investment category |
| \`description\` | string | Detailed explanation |
| \`risk\` | string | Risk level (Low/Medium/High) |

**Default content:**

\`\`\`yaml
investment-tip:
  tip: Diversify your portfolio
  category: Strategy
  description: Spread investments across different asset classes to reduce risk and stabilise returns over time.
  risk: Low
\`\`\`

---

## 65. Financial Plan

**Category:** Finance
**Description:** Numbered financial planning steps.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Plan title |
| \`steps\` | array | Array of {label, desc} objects |

**Default content:**

\`\`\`yaml
financial-plan:
  title: Debt Payoff Plan
  steps:
    - label: List all debts
      desc: Include balances and interest rates
    - label: Prioritise by rate
      desc: Pay highest interest first
    - label: Set monthly payment
      desc: Allocate extra funds each month
    - label: Track progress
      desc: Celebrate each debt paid off
\`\`\`

---

## 66. Bill Reminder

**Category:** Finance
**Description:** Upcoming bills with paid/unpaid status.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Reminder title |
| \`bills\` | array | Array of {name, amount, dueDate, paid} objects |

**Default content:**

\`\`\`yaml
bill-reminder:
  title: Upcoming Bills
  bills:
    - name: Rent
      amount: $1,500
      dueDate: Apr 1
      paid: false
    - name: Electricity
      amount: $95
      dueDate: Apr 5
      paid: true
    - name: Internet
      amount: $60
      dueDate: Apr 10
      paid: false
    - name: Insurance
      amount: $120
      dueDate: Apr 15
      paid: false
\`\`\`

---

## 67. Workout Routine

**Category:** Fitness & Exercise
**Description:** Exercise list with sets, reps, and duration.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Routine title |
| \`exercises\` | array | Array of {name, sets, reps} objects |
| \`duration\` | string | Total duration |

**Default content:**

\`\`\`yaml
workout-routine:
  title: Full Body Strength
  exercises:
    - name: Squats
      sets: "4"
      reps: "12"
    - name: Push Ups
      sets: "3"
      reps: "15"
    - name: Rows
      sets: "4"
      reps: "10"
    - name: Planks
      sets: "3"
      reps: 30s
  duration: 45 min
\`\`\`

---

## 68. Exercise Guide

**Category:** Fitness & Exercise
**Description:** Single exercise with numbered form steps.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`name\` | string | Exercise name |
| \`target\` | string | Target muscle group |
| \`steps\` | array | Array of instruction strings |
| \`tips\` | string | Form tips |
| \`imageUrl\` | string | Optional image URL |

**Default content:**

\`\`\`yaml
exercise-guide:
  name: Deadlift
  target: Posterior Chain
  steps:
    - Stand with feet hip-width apart, bar over midfoot
    - Hinge at hips, grip bar just outside knees
    - Drive through heels, pull bar close to body
    - Stand tall, squeeze glutes at top
  tips: Keep your back neutral throughout the movement. Brace your core before each rep.
  imageUrl: ""
\`\`\`

---

## 69. Fitness Progress

**Category:** Fitness & Exercise
**Description:** Large progress number with start-to-goal bar.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Tracker title |
| \`metric\` | string | Metric name |
| \`startValue\` | string | Starting value |
| \`currentValue\` | string | Current value |
| \`goalValue\` | string | Target value |
| \`unit\` | string | Unit of measurement |

**Default content:**

\`\`\`yaml
progress-tracker:
  title: Running Progress
  metric: 5K Time
  startValue: 32:00
  currentValue: 24:15
  goalValue: 22:00
  unit: min
\`\`\`

---

## 70. Yoga Pose

**Category:** Fitness & Exercise
**Description:** Pose with difficulty, benefits, and instructions.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`name\` | string | Pose name |
| \`difficulty\` | string | Difficulty level |
| \`benefits\` | array | Array of benefit strings |
| \`duration\` | string | Hold duration |
| \`instructions\` | array | Array of instruction strings |

**Default content:**

\`\`\`yaml
yoga-pose:
  name: Downward Dog
  difficulty: Beginner
  benefits:
    - Stretches hamstrings
    - Strengthens arms
    - Improves posture
  duration: 5 breaths
  instructions:
    - Start on hands and knees
    - Lift hips toward the ceiling
    - Press heels toward the mat
    - Hold while breathing deeply
\`\`\`

---

## 71. Challenge Calendar

**Category:** Fitness & Exercise
**Description:** Monthly challenge with daily activities.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Challenge title |
| \`month\` | string | Month label |
| \`days\` | array | Array of {day, activity} objects |

**Default content:**

\`\`\`yaml
challenge-calendar:
  title: Plank Challenge
  month: April
  days:
    - day: "1"
      activity: 20s plank
    - day: "2"
      activity: 25s plank
    - day: "3"
      activity: 30s plank
    - day: "4"
      activity: Rest
    - day: "5"
      activity: 35s plank
\`\`\`

---

## 72. Fitness Goal

**Category:** Fitness & Exercise
**Description:** Goal card with target, plan steps, and motivation.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`goal\` | string | Fitness goal |
| \`target\` | string | Target metric |
| \`deadline\` | string | Goal deadline |
| \`plan\` | array | Array of plan step strings |
| \`motivation\` | string | Motivational quote |

**Default content:**

\`\`\`yaml
fitness-goal:
  goal: Run a 10K
  target: Under 60 min
  deadline: June 2025
  plan:
    - Run 3x per week
    - Increase distance by 10% weekly
    - Rest and recover properly
    - Fuel with balanced nutrition
  motivation: The body achieves what the mind believes.
\`\`\`

---

## 73. Recipe Card

**Category:** Food & Drink
**Description:** Recipe with ingredients, steps, and time info.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Recipe title |
| \`prepTime\` | string | Preparation time |
| \`cookTime\` | string | Cooking time |
| \`ingredients\` | array | Array of ingredient strings |
| \`steps\` | array | Array of step strings |
| \`imageUrl\` | string | Optional image URL |

**Default content:**

\`\`\`yaml
recipe-card:
  title: Avocado Toast
  prepTime: 5 min
  cookTime: 3 min
  ingredients:
    - 2 slices sourdough bread
    - 1 ripe avocado
    - Salt and pepper
    - Red pepper flakes
    - Lemon juice
  steps:
    - Toast the bread until golden
    - Mash avocado with lemon juice
    - Spread on toast
    - Season and garnish
  imageUrl: ""
\`\`\`

---

## 74. Menu Highlights

**Category:** Food & Drink
**Description:** Restaurant menu with featured items and prices.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`restaurant\` | string | Restaurant name |
| \`items\` | array | Array of {name, price, desc} objects |

**Default content:**

\`\`\`yaml
menu-highlights:
  restaurant: The Green Bowl
  items:
    - name: Buddha Bowl
      price: $14
      desc: Quinoa, greens, sweet potato
    - name: Poke Bowl
      price: $16
      desc: Fresh salmon, rice, avocado
    - name: Acai Bowl
      price: $11
      desc: Acai, banana, granola
\`\`\`

---

## 75. Nutrition Facts

**Category:** Food & Drink
**Description:** Nutrition label-style display with values.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`item\` | string | Food item name |
| \`calories\` | string | Calorie count |
| \`fat\` | string | Fat content |
| \`carbs\` | string | Carbohydrate content |
| \`protein\` | string | Protein content |
| \`serving\` | string | Serving size |

**Default content:**

\`\`\`yaml
nutrition-facts:
  item: Greek Yogurt
  calories: "150"
  fat: 4g
  carbs: 8g
  protein: 20g
  serving: 1 cup (245g)
\`\`\`

---

## 76. Ingredient Spotlight

**Category:** Food & Drink
**Description:** Single ingredient with benefits and uses.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`name\` | string | Ingredient name |
| \`benefits\` | array | Array of benefit strings |
| \`uses\` | array | Array of use strings |
| \`imageUrl\` | string | Optional image URL |

**Default content:**

\`\`\`yaml
ingredient-spotlight:
  name: Turmeric
  benefits:
    - Anti-inflammatory
    - Rich in antioxidants
    - Supports immune function
  uses:
    - Curries and stews
    - Golden milk latte
    - Smoothies
    - Rice dishes
  imageUrl: ""
\`\`\`

---

## 77. Cocktail Recipe

**Category:** Food & Drink
**Description:** Drink recipe with ingredients, method, and garnish.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`name\` | string | Cocktail name |
| \`ingredients\` | array | Array of ingredient strings |
| \`instructions\` | string | Preparation method |
| \`garnish\` | string | Garnish suggestion |
| \`glass\` | string | Glass type |

**Default content:**

\`\`\`yaml
cocktail-recipe:
  name: Espresso Martini
  ingredients:
    - 50ml vodka
    - 30ml coffee liqueur
    - 30ml fresh espresso
    - 10ml simple syrup
  instructions: Shake all ingredients with ice for 15 seconds. Strain into a chilled martini glass.
  garnish: Coffee beans
  glass: Martini glass
\`\`\`

---

## 78. Food Review

**Category:** Food & Drink
**Description:** Dish review with star rating and description.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`dish\` | string | Dish name |
| \`restaurant\` | string | Restaurant name |
| \`rating\` | number | Star rating 1-5 |
| \`review\` | string | Review text |
| \`imageUrl\` | string | Optional image URL |

**Default content:**

\`\`\`yaml
food-review:
  dish: Margherita Pizza
  restaurant: Napoli's
  rating: 5
  review: Perfectly crisp crust, fresh mozzarella, and the most flavourful tomato sauce I have had outside of Italy.
  imageUrl: ""
\`\`\`

---

## 79. Meditation Guide

**Category:** Health & Wellness
**Description:** Step-by-step meditation with duration and tip.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Meditation title |
| \`duration\` | string | Duration display |
| \`instructions\` | array | Array of instruction strings |
| \`tip\` | string | Helpful tip |

**Default content:**

\`\`\`yaml
meditation-guide:
  title: Mindful Breathing
  duration: 5 min
  instructions:
    - Find a comfortable seated position
    - Close your eyes and relax your shoulders
    - Breathe in slowly through your nose for 4 counts
    - Hold for 4 counts
    - Exhale through your mouth for 6 counts
    - Repeat for 5 minutes
  tip: If your mind wanders, gently bring focus back to your breath without judgement.
\`\`\`

---

## 80. Exercise Card

**Category:** Health & Wellness
**Description:** Single exercise with sets, reps, and rest.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Workout title |
| \`exercise\` | string | Exercise name |
| \`reps\` | string | Number of reps |
| \`sets\` | string | Number of sets |
| \`rest\` | string | Rest period |
| \`note\` | string | Optional note |

**Default content:**

\`\`\`yaml
workout-card:
  title: Exercise of the Day
  exercise: Pull Ups
  reps: "10"
  sets: "3"
  rest: 60 sec
  note: Use assisted band if needed
\`\`\`

---

## 81. Water Tracker

**Category:** Health & Wellness
**Description:** Daily water intake with glass tracker.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`goal\` | string | Daily goal (glasses) |
| \`current\` | string | Current glasses consumed |
| \`unit\` | string | Unit label |
| \`tip\` | string | Hydration tip |

**Default content:**

\`\`\`yaml
water-tracker:
  goal: "8"
  current: "5"
  unit: glasses
  tip: Keep a water bottle on your desk as a visual reminder to sip throughout the day.
\`\`\`

---

## 82. Sleep Tips

**Category:** Health & Wellness
**Description:** Sleep hygiene tips with featured tip and quote.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Section title |
| \`tip\` | string | Featured tip |
| \`tips\` | array | Array of tip strings |
| \`quote\` | string | Motivational quote |

**Default content:**

\`\`\`yaml
sleep-tips:
  title: Better Sleep Tonight
  tip: Avoid screens 30 minutes before bed. Blue light suppresses melatonin production.
  tips:
    - Keep a consistent sleep schedule
    - Make your bedroom cool and dark
    - Avoid caffeine after 2 PM
    - Limit alcohol before bed
  quote: Sleep is the golden chain that ties health and our bodies together.
\`\`\`

---

## 83. Mood Tracker

**Category:** Health & Wellness
**Description:** Daily mood logging with emoji and note.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Tracker title |
| \`mood\` | string | Mood label (great/good/okay/low/bad) |
| \`note\` | string | Journal note |
| \`date\` | string | Date string |

**Default content:**

\`\`\`yaml
mood-tracker:
  title: How are you feeling?
  mood: good
  note: Had a productive morning and a nice walk in the park during lunch.
  date: Mar 15, 2025
\`\`\`

---

## 84. Wellness Tip

**Category:** Health & Wellness
**Description:** Health and wellness advice with source.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`tip\` | string | Wellness tip |
| \`category\` | string | Tip category |
| \`description\` | string | Detailed explanation |
| \`source\` | string | Attribution source |

**Default content:**

\`\`\`yaml
wellness-tip:
  tip: Movement is medicine
  category: Exercise
  description: Even 10 minutes of moderate activity can boost mood, improve focus, and reduce stress.
  source: World Health Organisation
\`\`\`

---

## 85. Destination Guide

**Category:** Travel
**Description:** Place guide with highlights and best time to visit.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`destination\` | string | Destination name |
| \`highlights\` | array | Array of highlight strings |
| \`bestTime\` | string | Best time to visit |
| \`tip\` | string | Travel tip |
| \`imageUrl\` | string | Optional image URL |

**Default content:**

\`\`\`yaml
destination-guide:
  destination: Kyoto, Japan
  highlights:
    - Fushimi Inari Shrine with thousands of torii gates
    - Bamboo Grove in Arashiyama
    - Historic Gion district
    - Kinkaku-ji Golden Pavilion
  bestTime: March–May or Oct–Nov
  tip: Visit popular temples early in the morning to avoid crowds.
  imageUrl: ""
\`\`\`

---

## 86. Packing List

**Category:** Travel
**Description:** Travel packing checklist with item count.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Trip title |
| \`items\` | array | Array of item strings |
| \`tip\` | string | Packing tip |

**Default content:**

\`\`\`yaml
packing-list:
  title: Weekend Getaway
  items:
    - Passport & ID
    - Phone charger
    - Toiletries bag
    - 2 outfits per day
    - Comfortable walking shoes
    - Reusable water bottle
    - Travel pillow
    - Snacks
  tip: Roll your clothes instead of folding to save space and reduce wrinkles.
\`\`\`

---

## 87. Trip Itinerary

**Category:** Travel
**Description:** Day-by-day travel schedule with connected steps.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | Trip title |
| \`days\` | array | Array of {day, activities} objects |
| \`totalDays\` | string | Total duration label |

**Default content:**

\`\`\`yaml
trip-itinerary:
  title: Paris Explorer
  days:
    - day: "1"
      activities: Arrive, Eiffel Tower, Seine cruise
    - day: "2"
      activities: Louvre Museum, Tuileries Garden
    - day: "3"
      activities: Montmartre, Sacré-Coeur
    - day: "4"
      activities: Versailles day trip
  totalDays: 4 Days
\`\`\`

---

## 88. Bucket List

**Category:** Travel
**Description:** Numbered travel bucket list with reasons.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`title\` | string | List title |
| \`items\` | array | Array of {place, reason} objects |

**Default content:**

\`\`\`yaml
bucket-list:
  title: Travel Dreams
  items:
    - place: Northern Lights
      reason: Witness the aurora borealis in Iceland
    - place: Machu Picchu
      reason: Hike the Inca Trail to ancient ruins
    - place: Santorini
      reason: Watch sunset over white-washed villages
    - place: Bali
      reason: Experience rice terraces and temple culture
\`\`\`

---

## 89. Travel Tip

**Category:** Travel
**Description:** Travel advice with category and hashtag.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`tip\` | string | Travel tip |
| \`category\` | string | Tip category |
| \`description\` | string | Detailed explanation |
| \`hashtag\` | string | Related hashtag |

**Default content:**

\`\`\`yaml
travel-tip:
  tip: Pack a portable charger
  category: Packing
  description: A portable power bank is a lifesaver during long travel days when outlets are scarce.
  hashtag: "#TravelSmart"
\`\`\`

---

## 90. Landmark Spotlight

**Category:** Travel
**Description:** Famous landmark with location and fun fact.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`name\` | string | Landmark name |
| \`location\` | string | Location |
| \`description\` | string | Landmark description |
| \`funFact\` | string | Interesting fact |
| \`imageUrl\` | string | Optional image URL |

**Default content:**

\`\`\`yaml
landmark-spotlight:
  name: Colosseum
  location: Rome, Italy
  description: The largest ancient amphitheatre ever built, capable of holding up to 80,000 spectators.
  funFact: The Colosseum had a retractable awning system called the velarium to shield spectators from the sun.
  imageUrl: ""
\`\`\`

---

## 91. Mobile

**Category:** Devices & Tech
**Description:** Portrait phone mockup with notch, image, and swipe-up hint.

**Schema:**

| Field | Type | Description |
|---|---|---|---|
| \`headline\` | string | App name or headline |
| \`description\` | string | Description text |
| \`image\` | string | 9:16 content image URL |

**Default content:**

\`\`\`yaml
mobile:
  headline: FitTrack
  description: Track your daily activity and stay motivated
  image: ""
\`\`\`

---

## 92. File Tree

**Category:** Devices & Tech
**Description:** Explorer-style file tree showing project structure.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`headline\` | string | Project headline |
| \`description\` | string | Description text |
| \`tree\` | string | Indented file/folder tree (2 spaces per depth) |

**Default content:**

\`\`\`yaml
desktop:
  headline: Project Structure
  description: Well-organised codebase with clear separation of concerns.
  tree: |
    src/
      components/
        Button.tsx
        Header.tsx
      hooks/
        useAuth.ts
      utils/
        api.ts
      App.tsx
      index.ts
    package.json
    tsconfig.json
\`\`\`

---

## 93. Smart Watch

**Category:** Devices & Tech
**Description:** Round watch face with image, battery, and fitness metrics.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`headline\` | string | Watch headline |
| \`description\` | string | Description text |
| \`image\` | string | 1:1 watch face image URL |

**Default content:**

\`\`\`yaml
smart-watch:
  headline: Health Watch
  description: Track your fitness goals with style
  image: ""
\`\`\`

---

## 94. Terminal

**Category:** Devices & Tech
**Description:** Dark terminal window with command, output, and syntax block.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`headline\` | string | Terminal title |
| \`description\` | string | Description text |
| \`command\` | string | Shell command |
| \`output\` | string | Command output |
| \`syntax\` | string | Code or syntax block |

**Default content:**

\`\`\`yaml
terminal:
  headline: Deploy Script
  description: A quick deployment script for your project
  command: npm run deploy
  output: Deploying to production...
  syntax: |
    ✓ Build complete
    ✓ Tests passed
    ✓ Deployed v2.4.1
\`\`\`

---

## 95. Browser

**Category:** Devices & Tech
**Description:** Browser window with URL bar and 16:9 content image.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`url\` | string | Website URL |
| \`pageTitle\` | string | Browser tab title |
| \`headline\` | string | Page headline |
| \`description\` | string | Description text |
| \`image\` | string | 16:9 content image URL |

**Default content:**

\`\`\`yaml
browser:
  url: example.com
  pageTitle: Welcome
  headline: Your Site
  description: A modern web experience for everyone
  image: ""
\`\`\`

---

## 96. Code

**Category:** Devices & Tech
**Description:** Code snippet card with syntax block and line numbers.

**Schema:**

| Field | Type | Description |
|---|---|---|
| \`headline\` | string | Code headline |
| \`description\` | string | Description text |
| \`code\` | string | Multi-line code snippet |
| \`language\` | string | Programming language label |

**Default content:**

\`\`\`yaml
laptop:
  headline: Snippet
  description: Clean and readable code example.
  code: |
    import { useState } from "react";

    const App = () => {
      const [count, setCount] = useState(0);
      return <div>{count}</div>;
    };
  language: TypeScript
\`\`\`

---

## Technical Notes

- **Stack:** Next.js Pages Router, Tailwind v4 + daisyUI "nothing" theme
- **Palette:** Monochrome with red #ff0030 as the only accent color
- **Rounded corners:** \`rounded-box\` (2rem pill) and \`rounded-full\` used within templates
- **Download:** Uses html2canvas-pro at 2x scale with #000000 background
- **Aspect ratios supported:** 9:16 (portrait), 1:1 (square), 16:9 (landscape), A4 (99:140)
- **Layout:** 3-panel — left sidebar (template selector), center (preview + aspect controls), right sidebar (JSON editor)
- **Search:** Template selector includes real-time search/filter by name, category, and category dropdown
- **Template interface:** Components accept \`{ data: Record<string, unknown> }\` and extract typed fields internally with fallback defaults
- **Default content:** When a field is missing/empty, each template renders sensible placeholder text
- **Icon convention:** SVG inline icons from Heroicons (outline set)`;

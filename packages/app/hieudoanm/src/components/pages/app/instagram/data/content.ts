import type { TemplateDef } from '../types';

export const TEMPLATES: TemplateDef[] = [
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Clean serif headline with body text and bottom image',
    category: 'text',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Body paragraph' },
      { key: 'imageUrl', type: 'string', description: 'URL to an image' },
    ],
    defaultContent: {
      headline: 'The Art of Focus',
      text: 'In a world of constant distraction, the ability to concentrate on what truly matters has become a superpower.',
      imageUrl: '',
    },
  },
  {
    id: 'bold-quote',
    label: 'Bold Quote',
    description: 'Large italic quote with attribution',
    category: 'text',
    schema: [
      { key: 'quote', type: 'string', description: 'The quoted text' },
      { key: 'author', type: 'string', description: 'Person or source' },
      { key: 'imageUrl', type: 'string', description: 'Optional portrait' },
    ],
    defaultContent: {
      quote:
        'The happiness of your life depends upon the quality of your thoughts.',
      author: 'Marcus Aurelius',
      imageUrl: '',
    },
  },
  {
    id: 'pull-quote',
    label: 'Pull Quote',
    description: 'Large decorative pull quote with opening mark',
    category: 'text',
    schema: [
      { key: 'quote', type: 'string', description: 'The quoted text' },
      { key: 'author', type: 'string', description: 'Author name' },
      { key: 'source', type: 'string', description: 'Attribution source' },
    ],
    defaultContent: {
      quote: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
      source: 'Stanford commencement address, 2005',
    },
  },
  {
    id: 'haiku',
    label: 'Haiku',
    description: 'Three-line poetic format with title',
    category: 'text',
    schema: [
      { key: 'title', type: 'string', description: 'Poem title' },
      { key: 'line1', type: 'string', description: 'First line (5 syllables)' },
      {
        key: 'line2',
        type: 'string',
        description: 'Second line (7 syllables)',
      },
      { key: 'line3', type: 'string', description: 'Third line (5 syllables)' },
    ],
    defaultContent: {
      title: 'Silence',
      line1: 'An old silent pond',
      line2: 'A frog jumps into the pond',
      line3: 'Splash! Silence again',
    },
  },
  {
    id: 'takeaway',
    label: 'Takeaway',
    description: 'Key insight with red left border and source',
    category: 'text',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Key insight text' },
      { key: 'source', type: 'string', description: 'Attribution source' },
    ],
    defaultContent: {
      headline: 'Attention is the New Currency',
      text: 'In an information-rich world, the scarcest resource is not information but attention.',
      source: 'Herbert Simon, 1971',
    },
  },
  {
    id: 'tip-card',
    label: 'Tip Card',
    description: 'Large number, headline, and body text',
    category: 'text',
    schema: [
      {
        key: 'number',
        type: 'string',
        description: 'Display number (e.g. 01)',
      },
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Body paragraph' },
    ],
    defaultContent: {
      number: '01',
      headline: 'Start Small',
      text: 'Break your goals into tiny, manageable steps. Consistency beats intensity every time.',
    },
  },
  {
    id: 'split-screen',
    label: 'Split Screen',
    description: 'Image left, headline and text right',
    category: 'compare',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Body paragraph' },
      { key: 'imageUrl', type: 'string', description: 'URL to an image' },
    ],
    defaultContent: {
      headline: 'Less is More',
      text: 'Simplicity is the ultimate sophistication. Every element must earn its place through purpose.',
      imageUrl: '',
    },
  },
  {
    id: 'comparison',
    label: 'Comparison',
    description: 'Side-by-side Before and After columns',
    category: 'compare',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'before', type: 'object', description: '{label, text}' },
      { key: 'after', type: 'object', description: '{label, text}' },
      { key: 'imageUrl', type: 'string', description: 'Optional shared image' },
    ],
    defaultContent: {
      headline: 'Before vs After',
      before: {
        label: 'Before',
        text: 'Manual process took 4 hours per report with frequent errors.',
      },
      after: {
        label: 'After',
        text: 'Automated pipeline runs in 5 minutes with 99.9% accuracy.',
      },
      imageUrl: '',
    },
  },
  {
    id: 'myth-vs-fact',
    label: 'Myth vs Fact',
    description: 'Side-by-side myth busting with X and checkmark icons',
    category: 'compare',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'myth', type: 'string', description: 'The misconception' },
      { key: 'fact', type: 'string', description: 'The truth' },
    ],
    defaultContent: {
      headline: 'Common Misconceptions',
      myth: 'Eating at night causes weight gain by itself.',
      fact: 'Total calorie intake matters most, not the time of day you eat.',
    },
  },
  {
    id: 'proscons',
    label: 'Pros & Cons',
    description: 'Two-column pros and cons comparison',
    category: 'compare',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'pros', type: 'array', description: 'Array of pro strings' },
      { key: 'cons', type: 'array', description: 'Array of con strings' },
    ],
    defaultContent: {
      headline: 'Pros & Cons',
      pros: ['Fast setup', 'Low cost', 'Easy to use'],
      cons: ['Limited features', 'Steep learning curve'],
    },
  },
  {
    id: 'versus',
    label: 'Versus',
    description: 'Two-item feature-by-feature comparison',
    category: 'compare',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'optionA', type: 'object', description: '{label, desc}' },
      { key: 'optionB', type: 'object', description: '{label, desc}' },
      {
        key: 'features',
        type: 'array',
        description: 'Array of {a, b} objects',
      },
    ],
    defaultContent: {
      headline: 'Versus',
      optionA: { label: 'Free', desc: '' },
      optionB: { label: 'Pro', desc: '' },
      features: [
        { a: 'Basic analytics', b: 'Advanced analytics' },
        { a: '1 user', b: 'Unlimited users' },
        { a: 'Email support', b: 'Priority support' },
      ],
    },
  },
  {
    id: 'rating-scale',
    label: 'Rating Scale',
    description: 'Star rating display with label and caption',
    category: 'compare',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'rating', type: 'number', description: 'Rating value 1-5' },
      {
        key: 'scaleMax',
        type: 'number',
        description: 'Maximum rating (default 5)',
      },
      { key: 'label', type: 'string', description: 'Rating label' },
      { key: 'sublabel', type: 'string', description: 'Rating sublabel' },
    ],
    defaultContent: {
      headline: 'Customer Rating',
      rating: 4,
      scaleMax: 5,
      label: 'Excellent',
      sublabel: 'Based on 2,500+ reviews',
    },
  },
  {
    id: 'card-overlay',
    label: 'Card Overlay',
    description: 'Full-bleed background image with floating text card',
    category: 'media',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Body paragraph' },
      { key: 'imageUrl', type: 'string', description: 'Background image' },
    ],
    defaultContent: {
      headline: 'New Horizons',
      text: 'The future belongs to those who believe in the beauty of their dreams.',
      imageUrl: '',
    },
  },
  {
    id: 'full-bleed',
    label: 'Full Bleed',
    description: 'Full background image with centered text overlay',
    category: 'media',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Body paragraph' },
      { key: 'imageUrl', type: 'string', description: 'Background image' },
    ],
    defaultContent: {
      headline: 'Dream Bigger',
      text: 'The only limit to your impact is your imagination and commitment to act.',
      imageUrl: '',
    },
  },
  {
    id: 'mosaic',
    label: 'Mosaic',
    description: '2x2 image grid layout',
    category: 'media',
    schema: [
      { key: 'images', type: 'array', description: 'Array of 4 image URLs' },
    ],
    defaultContent: {
      images: ['', '', '', ''],
    },
  },
  {
    id: 'video-still',
    label: 'Video Still',
    description: 'Video player mockup with play button',
    category: 'media',
    schema: [
      { key: 'imageUrl', type: 'string', description: 'Thumbnail image URL' },
      { key: 'headline', type: 'string', description: 'Video title' },
      {
        key: 'duration',
        type: 'string',
        description: 'Duration display (e.g. 12:34)',
      },
    ],
    defaultContent: {
      imageUrl: '',
      headline: 'Product Demo',
      duration: '3:45',
    },
  },
  {
    id: 'cinema-banner',
    label: 'Cinema Banner',
    description: 'Wide letterbox banner with centered text overlay',
    category: 'media',
    schema: [
      { key: 'imageUrl', type: 'string', description: 'Background image URL' },
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Body text' },
      { key: 'caption', type: 'string', description: 'Bottom caption' },
    ],
    defaultContent: {
      imageUrl: '',
      headline: 'A New Chapter',
      text: 'Every great story begins with a single step into the unknown.',
      caption: 'Coming this summer',
    },
  },
  {
    id: 'collage',
    label: 'Collage',
    description: 'Overlapping image arrangement',
    category: 'media',
    schema: [
      { key: 'images', type: 'array', description: 'Array of 3 image URLs' },
    ],
    defaultContent: {
      images: ['', '', ''],
    },
  },
  {
    id: 'timeline',
    label: 'Timeline',
    description: 'Chronological entries with date and event',
    category: 'data',
    schema: [
      { key: 'title', type: 'string', description: 'Timeline title' },
      {
        key: 'entries',
        type: 'array',
        description: 'Array of {date, event} objects',
      },
      { key: 'imageUrl', type: 'string', description: 'Optional bottom image' },
    ],
    defaultContent: {
      title: 'Project Milestones',
      entries: [
        { date: 'Q1 2024', event: 'Research phase complete' },
        { date: 'Q2 2024', event: 'MVP development started' },
        { date: 'Q3 2024', event: 'Beta launch' },
        { date: 'Q4 2024', event: 'Public release' },
      ],
      imageUrl: '',
    },
  },
  {
    id: 'data-stats',
    label: 'Data/Stats',
    description: 'Large centered statistic with supporting text',
    category: 'data',
    schema: [
      {
        key: 'stat',
        type: 'string',
        description: 'Large statistic (e.g. 84%)',
      },
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Supporting paragraph' },
      {
        key: 'imageUrl',
        type: 'string',
        description: 'Optional background image',
      },
    ],
    defaultContent: {
      stat: '84%',
      headline: 'User Satisfaction',
      text: 'Based on survey responses from over 10,000 active users across 50 countries.',
      imageUrl: '',
    },
  },
  {
    id: 'feature-grid',
    label: 'Feature Grid',
    description: 'A 2x2 grid of feature blocks with icons',
    category: 'data',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      {
        key: 'features',
        type: 'array',
        description: 'Array of {label, desc} objects',
      },
    ],
    defaultContent: {
      headline: 'Why Choose Us',
      features: [
        { label: 'Fast', desc: 'Optimized for speed and performance' },
        { label: 'Secure', desc: 'End-to-end encryption by default' },
        { label: 'Simple', desc: 'Minimal learning curve' },
        { label: 'Scalable', desc: 'Grows with your needs' },
      ],
    },
  },
  {
    id: 'stat-row',
    label: 'Stat Row',
    description: 'Row of 3 statistics with values and labels',
    category: 'data',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      {
        key: 'stats',
        type: 'array',
        description: 'Array of {value, label} objects',
      },
    ],
    defaultContent: {
      headline: 'By the Numbers',
      stats: [
        { value: '10K+', label: 'Users' },
        { value: '99.9%', label: 'Uptime' },
        { value: '24/7', label: 'Support' },
      ],
    },
  },
  {
    id: 'progress-list',
    label: 'Progress List',
    description: 'Items with progress bars and percentages',
    category: 'data',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      {
        key: 'items',
        type: 'array',
        description: 'Array of {label, pct} objects',
      },
    ],
    defaultContent: {
      headline: 'Progress',
      items: [
        { label: 'Design', pct: 90 },
        { label: 'Development', pct: 65 },
        { label: 'Testing', pct: 40 },
        { label: 'Deployment', pct: 20 },
      ],
    },
  },
  {
    id: 'counter',
    label: 'Counter',
    description: 'Single large number counter display',
    category: 'data',
    schema: [
      {
        key: 'number',
        type: 'string',
        description: 'Counter number (e.g. 10K+)',
      },
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Supporting text' },
      { key: 'suffix', type: 'string', description: 'Suffix label' },
    ],
    defaultContent: {
      number: '10K+',
      headline: 'Users Worldwide',
      text: 'Join a growing community of creators and innovators.',
      suffix: 'Active users',
    },
  },
  {
    id: 'listicle',
    label: 'Listicle',
    description: 'Numbered items with headline and bottom image',
    category: 'list',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Supporting paragraph' },
      { key: 'items', type: 'array', description: 'Array of strings' },
      { key: 'imageUrl', type: 'string', description: 'Optional bottom image' },
    ],
    defaultContent: {
      headline: '3 Daily Habits',
      text: 'Small daily improvements over time lead to massive results.',
      items: ['Wake up at 5 AM', 'Read for 30 minutes', 'Exercise daily'],
      imageUrl: '',
    },
  },
  {
    id: 'checklist',
    label: 'Checklist',
    description: 'A list of items with checkmark icons',
    category: 'list',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'items', type: 'array', description: 'Array of strings' },
    ],
    defaultContent: {
      headline: 'Launch Checklist',
      items: [
        'Write final copy',
        'Review analytics',
        'Test on mobile',
        'Schedule social posts',
      ],
    },
  },
  {
    id: 'step-by-step',
    label: 'Step by Step',
    description: 'Three numbered steps with icons',
    category: 'list',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Supporting paragraph' },
      { key: 'steps', type: 'array', description: 'Array of {label} objects' },
    ],
    defaultContent: {
      headline: 'Getting Started',
      text: 'Follow these three steps to begin your journey.',
      steps: [{ label: 'Discover' }, { label: 'Learn' }, { label: 'Apply' }],
    },
  },
  {
    id: 'steps-horizontal',
    label: 'Steps Horizontal',
    description: 'Horizontal connected step flow with numbers',
    category: 'list',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'steps', type: 'array', description: 'Array of {label} objects' },
    ],
    defaultContent: {
      headline: 'How It Works',
      steps: [{ label: 'Plan' }, { label: 'Build' }, { label: 'Launch' }],
    },
  },
  {
    id: 'bullet-list',
    label: 'Bullet List',
    description: 'Simple bullet point list with headline',
    category: 'list',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'items', type: 'array', description: 'Array of strings' },
    ],
    defaultContent: {
      headline: 'Key Points',
      items: [
        'Increased productivity',
        'Better collaboration',
        'Reduced costs',
        'Faster delivery',
      ],
    },
  },
  {
    id: 'ranking',
    label: 'Ranking',
    description: 'Ranked positions with labels',
    category: 'list',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      {
        key: 'items',
        type: 'array',
        description: 'Array of {rank, label} objects',
      },
    ],
    defaultContent: {
      headline: 'Top Priorities',
      items: [
        { rank: '1st', label: 'Innovation' },
        { rank: '2nd', label: 'Quality' },
        { rank: '3rd', label: 'Speed' },
      ],
    },
  },
  {
    id: 'announcement',
    label: 'Announcement',
    description: 'Badge, headline, body text, and date',
    category: 'marketing',
    schema: [
      {
        key: 'badge',
        type: 'string',
        description: 'Chip label (e.g. New, Launch)',
      },
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Body paragraph' },
      { key: 'date', type: 'string', description: 'Date or timeline label' },
    ],
    defaultContent: {
      badge: 'Launching Soon',
      headline: 'A New Way to Work',
      text: 'We are building a platform that reimagines how teams collaborate across time zones.',
      date: 'Coming Q1 2025',
    },
  },
  {
    id: 'faq',
    label: 'FAQ',
    description: 'Question and answer pair',
    category: 'marketing',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'items', type: 'array', description: 'Array of {q, a} objects' },
    ],
    defaultContent: {
      headline: 'Frequently Asked',
      items: [
        {
          q: 'How does it work?',
          a: 'Sign up, customize your template, and download your image in seconds.',
        },
        {
          q: 'Is it free?',
          a: 'Yes, all templates are free to use with no hidden fees.',
        },
      ],
    },
  },
  {
    id: 'glossary',
    label: 'Glossary',
    description: 'Term, definition, and example sentence',
    category: 'marketing',
    schema: [
      { key: 'term', type: 'string', description: 'The word or phrase' },
      { key: 'definition', type: 'string', description: 'Clear explanation' },
      { key: 'example', type: 'string', description: 'Usage example' },
    ],
    defaultContent: {
      term: 'Synergy',
      definition:
        'The interaction of two or more elements that produces a combined effect greater than the sum of their separate effects.',
      example:
        'The synergy between the design and engineering teams led to a breakthrough product.',
    },
  },
  {
    id: 'pricing-card',
    label: 'Pricing Card',
    description: 'Plan name, price, feature list, and CTA button',
    category: 'marketing',
    schema: [
      { key: 'plan', type: 'string', description: 'Plan name (e.g. Pro)' },
      {
        key: 'price',
        type: 'string',
        description: 'Price display (e.g. $29/mo)',
      },
      {
        key: 'features',
        type: 'array',
        description: 'Array of feature strings',
      },
    ],
    defaultContent: {
      plan: 'Pro Plan',
      price: '$29',
      features: [
        'Unlimited projects',
        'Priority support',
        'Advanced analytics',
        'Team collaboration',
      ],
    },
  },
  {
    id: 'question',
    label: 'Question',
    description: 'A poll or quiz question with answer options',
    category: 'marketing',
    schema: [
      { key: 'headline', type: 'string', description: 'The question' },
      { key: 'options', type: 'array', description: 'Array of answer strings' },
    ],
    defaultContent: {
      headline: 'What matters most in a product?',
      options: ['User experience', 'Performance', 'Design', 'Price'],
    },
  },
  {
    id: 'offer-banner',
    label: 'Offer Banner',
    description: 'Discount or promo banner with badge and CTA',
    category: 'marketing',
    schema: [
      { key: 'badge', type: 'string', description: 'Offer badge label' },
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Body paragraph' },
      { key: 'code', type: 'string', description: 'Promo code' },
      { key: 'cta', type: 'string', description: 'Call to action text' },
    ],
    defaultContent: {
      badge: 'Limited Offer',
      headline: 'Special Offer',
      text: 'Get 30% off your first month. No commitment required.',
      code: 'WELCOME30',
      cta: 'Claim Offer',
    },
  },
  {
    id: 'profile-card',
    label: 'Profile Card',
    description: 'Avatar, name, title, and bio',
    category: 'social',
    schema: [
      { key: 'name', type: 'string', description: 'Full name' },
      { key: 'title', type: 'string', description: 'Job title or role' },
      { key: 'bio', type: 'string', description: 'Short biography' },
      { key: 'imageUrl', type: 'string', description: 'Profile photo URL' },
    ],
    defaultContent: {
      name: 'Alex Chen',
      title: 'Product Designer',
      bio: 'Designing meaningful experiences at the intersection of simplicity and functionality.',
      imageUrl: '',
    },
  },
  {
    id: 'testimonial',
    label: 'Testimonial',
    description: 'Star rating, quote, avatar, name, and title',
    category: 'social',
    schema: [
      { key: 'quote', type: 'string', description: 'Customer testimonial' },
      { key: 'name', type: 'string', description: 'Customer name' },
      { key: 'title', type: 'string', description: 'Customer role or company' },
      { key: 'rating', type: 'number', description: 'Star rating 1-5' },
      { key: 'imageUrl', type: 'string', description: 'Optional photo URL' },
    ],
    defaultContent: {
      quote:
        'This tool completely transformed our workflow. We went from chaos to clarity in days.',
      name: 'Sarah Mitchell',
      title: 'CEO, Brightside Inc.',
      rating: 5,
      imageUrl: '',
    },
  },
  {
    id: 'team-row',
    label: 'Team Row',
    description: 'Horizontal team member row with avatars',
    category: 'social',
    schema: [
      { key: 'headline', type: 'string', description: 'Section title' },
      {
        key: 'members',
        type: 'array',
        description: 'Array of {name, role, imageUrl} objects',
      },
    ],
    defaultContent: {
      headline: 'Our Team',
      members: [
        { name: 'Alice', role: 'Designer' },
        { name: 'Bob', role: 'Developer' },
        { name: 'Carol', role: 'Manager' },
      ],
    },
  },
  {
    id: 'event-card',
    label: 'Event Card',
    description: 'Event details with date, time, and location',
    category: 'social',
    schema: [
      { key: 'title', type: 'string', description: 'Event title' },
      { key: 'date', type: 'string', description: 'Event date' },
      { key: 'time', type: 'string', description: 'Event time' },
      { key: 'location', type: 'string', description: 'Event location' },
      { key: 'description', type: 'string', description: 'Event description' },
    ],
    defaultContent: {
      title: 'Design Summit 2025',
      date: 'JAN 15',
      time: '10:00 AM — 4:00 PM',
      location: 'San Francisco, CA',
      description:
        'Join industry leaders for a day of talks, workshops, and networking.',
    },
  },
  {
    id: 'share-cta',
    label: 'Share CTA',
    description: 'Call to action for sharing content',
    category: 'social',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Body paragraph' },
      { key: 'buttonLabel', type: 'string', description: 'Button text' },
      { key: 'hashtag', type: 'string', description: 'Associated hashtag' },
    ],
    defaultContent: {
      headline: 'Share This',
      text: 'Help others discover this content by sharing it with your network.',
      buttonLabel: 'Share Now',
      hashtag: '#Infographic',
    },
  },
  {
    id: 'mention',
    label: 'Mention',
    description: 'Social media mention card with engagement',
    category: 'social',
    schema: [
      { key: 'handle', type: 'string', description: 'Social media handle' },
      { key: 'quote', type: 'string', description: 'Post content' },
      { key: 'name', type: 'string', description: 'Display name' },
      { key: 'avatarUrl', type: 'string', description: 'Avatar image URL' },
      { key: 'likes', type: 'string', description: 'Like count' },
    ],
    defaultContent: {
      handle: '@designer',
      quote: 'Great content! Really insightful perspective on this topic.',
      name: 'Designer Pro',
      avatarUrl: '',
      likes: '124',
    },
  },
  {
    id: 'affirmation',
    label: 'Affirmation',
    description: 'Positive "I am" affirmation statement',
    category: 'inspirational',
    schema: [
      {
        key: 'affirmation',
        type: 'string',
        description: 'The affirmation text',
      },
      { key: 'subtitle', type: 'string', description: 'Supporting subtitle' },
    ],
    defaultContent: {
      affirmation: 'Resilient',
      subtitle: 'Every setback is a setup for a comeback.',
    },
  },
  {
    id: 'manifesto',
    label: 'Manifesto',
    description: 'Bold list of principles or beliefs',
    category: 'inspirational',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      {
        key: 'principles',
        type: 'array',
        description: 'Array of principle strings',
      },
    ],
    defaultContent: {
      headline: 'Our Manifesto',
      principles: [
        'Design with purpose',
        'Build for people',
        'Iterate relentlessly',
        'Stay curious',
      ],
    },
  },
  {
    id: 'vision-board',
    label: 'Vision Board',
    description: 'Image collage with overlay title and body text',
    category: 'inspirational',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'text', type: 'string', description: 'Body paragraph' },
      { key: 'imageUrl', type: 'string', description: 'URL to an image' },
    ],
    defaultContent: {
      headline: 'Dream Big',
      text: 'Visualise your goals, then work backwards from the future you want to create.',
      imageUrl: '',
    },
  },
  {
    id: 'daily-wisdom',
    label: 'Daily Wisdom',
    description: 'Short wisdom quote with author attribution',
    category: 'inspirational',
    schema: [
      { key: 'wisdom', type: 'string', description: 'The wisdom text' },
      { key: 'author', type: 'string', description: 'Author name' },
    ],
    defaultContent: {
      wisdom:
        'The only limit to our realisation of tomorrow is our doubts of today.',
      author: 'Franklin D. Roosevelt',
    },
  },
  {
    id: 'mission-statement',
    label: 'Mission Statement',
    description: 'Mission and vision pair with headline',
    category: 'inspirational',
    schema: [
      { key: 'headline', type: 'string', description: 'Section headline' },
      { key: 'mission', type: 'string', description: 'Mission statement' },
      { key: 'vision', type: 'string', description: 'Vision statement' },
    ],
    defaultContent: {
      headline: 'Our Mission',
      mission:
        'Empower every person and organisation on the planet to achieve more.',
      vision:
        'A world where everyone has access to the tools they need to succeed.',
    },
  },
  {
    id: 'belief-card',
    label: 'Belief Card',
    description: '"I believe" statement with author and context',
    category: 'inspirational',
    schema: [
      { key: 'belief', type: 'string', description: 'The belief statement' },
      {
        key: 'author',
        type: 'string',
        description: 'Person who holds this belief',
      },
      { key: 'context', type: 'string', description: 'Optional context' },
    ],
    defaultContent: {
      belief: 'Simplicity is the ultimate sophistication.',
      author: 'Leonardo da Vinci',
      context: 'Renaissance artist and inventor',
    },
  },
  {
    id: 'poll-vote',
    label: 'Poll Vote',
    description: 'Poll question with percentage bars',
    category: 'interactive',
    schema: [
      { key: 'question', type: 'string', description: 'Poll question' },
      {
        key: 'options',
        type: 'array',
        description: 'Array of {label, percentage} objects',
      },
    ],
    defaultContent: {
      question: 'What matters most in design?',
      options: [
        { label: 'Usability', percentage: 45 },
        { label: 'Aesthetics', percentage: 30 },
        { label: 'Performance', percentage: 25 },
      ],
    },
  },
  {
    id: 'quiz-question',
    label: 'Quiz Question',
    description: 'Multiple choice quiz with lettered options',
    category: 'interactive',
    schema: [
      { key: 'question', type: 'string', description: 'Quiz question' },
      { key: 'options', type: 'array', description: 'Array of answer strings' },
    ],
    defaultContent: {
      question: 'Which colour scheme is best for accessibility?',
      options: [
        'High contrast with text labels',
        'Pastel on pastel',
        'Neon on black',
        'All lowercase letters',
      ],
    },
  },
  {
    id: 'this-or-that',
    label: 'This or That',
    description: 'Binary choice comparison with VS divider',
    category: 'interactive',
    schema: [
      { key: 'headline', type: 'string', description: 'Main title' },
      { key: 'optionA', type: 'string', description: 'Left option' },
      { key: 'optionB', type: 'string', description: 'Right option' },
    ],
    defaultContent: {
      headline: 'Which do you choose?',
      optionA: 'Remote Work',
      optionB: 'Office Culture',
    },
  },
  {
    id: 'challenge-card',
    label: 'Challenge Card',
    description: 'Challenge prompt with day count',
    category: 'interactive',
    schema: [
      { key: 'headline', type: 'string', description: 'Challenge title' },
      {
        key: 'description',
        type: 'string',
        description: 'Challenge description',
      },
      { key: 'days', type: 'string', description: 'Duration (e.g. 30)' },
    ],
    defaultContent: {
      headline: 'Write Every Day',
      description: 'Build a writing habit one day at a time.',
      days: '30',
    },
  },
  {
    id: 'fill-blank',
    label: 'Fill in the Blank',
    description: 'Text with a blank to fill in',
    category: 'interactive',
    schema: [
      { key: 'text', type: 'string', description: 'Text with ___ marker' },
      { key: 'blank', type: 'string', description: 'The answer' },
      { key: 'hint', type: 'string', description: 'Optional hint' },
      { key: 'author', type: 'string', description: 'Optional attribution' },
    ],
    defaultContent: {
      text: 'The only thing we have to fear is ___ itself.',
      blank: 'fear',
      hint: 'Franklin D. Roosevelt',
      author: 'Franklin D. Roosevelt',
    },
  },
  {
    id: 'q-and-a',
    label: 'Q&A',
    description: 'Question and answer card with category',
    category: 'interactive',
    schema: [
      { key: 'question', type: 'string', description: 'The question' },
      { key: 'answer', type: 'string', description: 'The answer' },
      { key: 'category', type: 'string', description: 'Topic category' },
    ],
    defaultContent: {
      question: 'What is design thinking?',
      answer:
        'A human-centred approach to innovation that integrates the needs of people, technology, and business.',
      category: 'Design',
    },
  },
  {
    id: 'study-tips',
    label: 'Study Tips',
    description: 'Study technique with numbered steps',
    category: 'education',
    schema: [
      { key: 'technique', type: 'string', description: 'Study technique name' },
      { key: 'description', type: 'string', description: 'Brief explanation' },
      { key: 'steps', type: 'array', description: 'Array of step strings' },
      { key: 'subject', type: 'string', description: 'Subject or topic' },
    ],
    defaultContent: {
      technique: 'Pomodoro Technique',
      description:
        'A time management method that uses focused work intervals followed by short breaks.',
      steps: [
        'Choose a task to work on',
        'Set a 25-minute timer',
        'Work until the timer rings',
        'Take a 5-minute break',
      ],
      subject: 'Study Skills',
    },
  },
  {
    id: 'flash-card',
    label: 'Flash Card',
    description: 'Term and definition card with example',
    category: 'education',
    schema: [
      { key: 'term', type: 'string', description: 'The word or concept' },
      { key: 'definition', type: 'string', description: 'Clear definition' },
      { key: 'category', type: 'string', description: 'Topic category' },
      { key: 'example', type: 'string', description: 'Usage example' },
    ],
    defaultContent: {
      term: 'Photosynthesis',
      definition:
        'The process by which plants convert light energy into chemical energy to fuel their growth.',
      category: 'Biology',
      example:
        'Plants use chlorophyll to capture sunlight during photosynthesis.',
    },
  },
  {
    id: 'subject-summary',
    label: 'Subject Summary',
    description: 'Topic overview with key points and summary',
    category: 'education',
    schema: [
      { key: 'subject', type: 'string', description: 'Subject name' },
      { key: 'topic', type: 'string', description: 'Specific topic' },
      {
        key: 'keyPoints',
        type: 'array',
        description: 'Array of key point strings',
      },
      { key: 'summary', type: 'string', description: 'Concluding summary' },
    ],
    defaultContent: {
      subject: 'Science',
      topic: 'The Water Cycle',
      keyPoints: [
        'Water evaporates from oceans and lakes',
        'Vapour rises and condenses into clouds',
        'Precipitation returns water to the surface',
        'Runoff carries water back to oceans',
      ],
      summary:
        'The water cycle is a continuous process that distributes water across the planet.',
    },
  },
  {
    id: 'learning-path',
    label: 'Learning Path',
    description: 'Connected step-by-step learning roadmap',
    category: 'education',
    schema: [
      { key: 'title', type: 'string', description: 'Path title' },
      {
        key: 'steps',
        type: 'array',
        description: 'Array of {level, label, desc} objects',
      },
    ],
    defaultContent: {
      title: 'Learn Web Development',
      steps: [
        { level: '1', label: 'HTML & CSS', desc: 'Build static web pages' },
        { level: '2', label: 'JavaScript', desc: 'Add interactivity' },
        { level: '3', label: 'React', desc: 'Build modern UIs' },
        { level: '4', label: 'Backend', desc: 'APIs and databases' },
      ],
    },
  },
  {
    id: 'quick-quiz',
    label: 'Quick Quiz',
    description: 'Multiple choice question with answer reveal',
    category: 'education',
    schema: [
      { key: 'question', type: 'string', description: 'Quiz question' },
      { key: 'options', type: 'array', description: 'Array of answer strings' },
      { key: 'answer', type: 'string', description: 'Correct answer' },
      {
        key: 'explanation',
        type: 'string',
        description: 'Why the answer is correct',
      },
    ],
    defaultContent: {
      question: 'What is the capital of Japan?',
      options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
      answer: 'Tokyo',
      explanation:
        'Tokyo has been the capital of Japan since 1868, during the Meiji Restoration.',
    },
  },
  {
    id: 'course-highlight',
    label: 'Course Highlight',
    description: 'Course overview with module list and badges',
    category: 'education',
    schema: [
      { key: 'title', type: 'string', description: 'Course title' },
      { key: 'instructor', type: 'string', description: 'Instructor name' },
      {
        key: 'modules',
        type: 'array',
        description: 'Array of module name strings',
      },
      { key: 'duration', type: 'string', description: 'Course duration' },
      { key: 'level', type: 'string', description: 'Difficulty level' },
    ],
    defaultContent: {
      title: 'JavaScript Fundamentals',
      instructor: 'Jane Doe',
      modules: [
        'Variables & Types',
        'Functions & Scope',
        'Objects & Arrays',
        'Async Programming',
      ],
      duration: '8 weeks',
      level: 'Beginner',
    },
  },
  {
    id: 'budget-tracker',
    label: 'Budget Tracker',
    description: 'Income, expenses, and savings overview with bars',
    category: 'finance',
    schema: [
      { key: 'title', type: 'string', description: 'Budget title' },
      { key: 'income', type: 'string', description: 'Income amount' },
      { key: 'expenses', type: 'string', description: 'Expenses amount' },
      { key: 'savings', type: 'string', description: 'Savings amount' },
      { key: 'period', type: 'string', description: 'Time period' },
    ],
    defaultContent: {
      title: 'Monthly Budget',
      income: '$5,000',
      expenses: '$3,200',
      savings: '$1,800',
      period: 'March 2025',
    },
  },
  {
    id: 'savings-goal',
    label: 'Savings Goal',
    description: 'Goal tracking with progress bar and deadline',
    category: 'finance',
    schema: [
      { key: 'goal', type: 'string', description: 'Savings goal name' },
      { key: 'target', type: 'string', description: 'Target amount' },
      { key: 'current', type: 'string', description: 'Current saved amount' },
      { key: 'deadline', type: 'string', description: 'Goal deadline' },
      { key: 'note', type: 'string', description: 'Optional note' },
    ],
    defaultContent: {
      goal: 'Emergency Fund',
      target: '$10,000',
      current: '$6,500',
      deadline: 'Dec 2025',
      note: 'Saving $500 per month',
    },
  },
  {
    id: 'expense-log',
    label: 'Expense Log',
    description: 'Recent expense entries with categories and amounts',
    category: 'finance',
    schema: [
      { key: 'title', type: 'string', description: 'Log title' },
      {
        key: 'expenses',
        type: 'array',
        description: 'Array of {category, amount, date} objects',
      },
    ],
    defaultContent: {
      title: 'Recent Expenses',
      expenses: [
        { category: 'Groceries', amount: '$85', date: 'Mar 15' },
        { category: 'Transport', amount: '$35', date: 'Mar 14' },
        { category: 'Dining', amount: '$52', date: 'Mar 13' },
        { category: 'Utilities', amount: '$120', date: 'Mar 12' },
      ],
    },
  },
  {
    id: 'investment-tip',
    label: 'Investment Tip',
    description: 'Investment advice with risk level badge',
    category: 'finance',
    schema: [
      { key: 'tip', type: 'string', description: 'Investment tip' },
      { key: 'category', type: 'string', description: 'Investment category' },
      {
        key: 'description',
        type: 'string',
        description: 'Detailed explanation',
      },
      {
        key: 'risk',
        type: 'string',
        description: 'Risk level (Low/Medium/High)',
      },
    ],
    defaultContent: {
      tip: 'Diversify your portfolio',
      category: 'Strategy',
      description:
        'Spread investments across different asset classes to reduce risk and stabilise returns over time.',
      risk: 'Low',
    },
  },
  {
    id: 'financial-plan',
    label: 'Financial Plan',
    description: 'Numbered financial planning steps',
    category: 'finance',
    schema: [
      { key: 'title', type: 'string', description: 'Plan title' },
      {
        key: 'steps',
        type: 'array',
        description: 'Array of {label, desc} objects',
      },
    ],
    defaultContent: {
      title: 'Debt Payoff Plan',
      steps: [
        {
          label: 'List all debts',
          desc: 'Include balances and interest rates',
        },
        { label: 'Prioritise by rate', desc: 'Pay highest interest first' },
        {
          label: 'Set monthly payment',
          desc: 'Allocate extra funds each month',
        },
        { label: 'Track progress', desc: 'Celebrate each debt paid off' },
      ],
    },
  },
  {
    id: 'bill-reminder',
    label: 'Bill Reminder',
    description: 'Upcoming bills with paid/unpaid status',
    category: 'finance',
    schema: [
      { key: 'title', type: 'string', description: 'Reminder title' },
      {
        key: 'bills',
        type: 'array',
        description: 'Array of {name, amount, dueDate, paid} objects',
      },
    ],
    defaultContent: {
      title: 'Upcoming Bills',
      bills: [
        { name: 'Rent', amount: '$1,500', dueDate: 'Apr 1', paid: false },
        { name: 'Electricity', amount: '$95', dueDate: 'Apr 5', paid: true },
        { name: 'Internet', amount: '$60', dueDate: 'Apr 10', paid: false },
        { name: 'Insurance', amount: '$120', dueDate: 'Apr 15', paid: false },
      ],
    },
  },
  {
    id: 'workout-routine',
    label: 'Workout Routine',
    description: 'Exercise list with sets, reps, and duration',
    category: 'fitness',
    schema: [
      { key: 'title', type: 'string', description: 'Routine title' },
      {
        key: 'exercises',
        type: 'array',
        description: 'Array of {name, sets, reps} objects',
      },
      { key: 'duration', type: 'string', description: 'Total duration' },
    ],
    defaultContent: {
      title: 'Full Body Strength',
      exercises: [
        { name: 'Squats', sets: '4', reps: '12' },
        { name: 'Push Ups', sets: '3', reps: '15' },
        { name: 'Rows', sets: '4', reps: '10' },
        { name: 'Planks', sets: '3', reps: '30s' },
      ],
      duration: '45 min',
    },
  },
  {
    id: 'exercise-guide',
    label: 'Exercise Guide',
    description: 'Single exercise with numbered form steps',
    category: 'fitness',
    schema: [
      { key: 'name', type: 'string', description: 'Exercise name' },
      { key: 'target', type: 'string', description: 'Target muscle group' },
      {
        key: 'steps',
        type: 'array',
        description: 'Array of instruction strings',
      },
      { key: 'tips', type: 'string', description: 'Form tips' },
      { key: 'imageUrl', type: 'string', description: 'Optional image URL' },
    ],
    defaultContent: {
      name: 'Deadlift',
      target: 'Posterior Chain',
      steps: [
        'Stand with feet hip-width apart, bar over midfoot',
        'Hinge at hips, grip bar just outside knees',
        'Drive through heels, pull bar close to body',
        'Stand tall, squeeze glutes at top',
      ],
      tips: 'Keep your back neutral throughout the movement. Brace your core before each rep.',
      imageUrl: '',
    },
  },
  {
    id: 'progress-tracker',
    label: 'Fitness Progress',
    description: 'Large progress number with start-to-goal bar',
    category: 'fitness',
    schema: [
      { key: 'title', type: 'string', description: 'Tracker title' },
      { key: 'metric', type: 'string', description: 'Metric name' },
      { key: 'startValue', type: 'string', description: 'Starting value' },
      { key: 'currentValue', type: 'string', description: 'Current value' },
      { key: 'goalValue', type: 'string', description: 'Target value' },
      { key: 'unit', type: 'string', description: 'Unit of measurement' },
    ],
    defaultContent: {
      title: 'Running Progress',
      metric: '5K Time',
      startValue: '32:00',
      currentValue: '24:15',
      goalValue: '22:00',
      unit: 'min',
    },
  },
  {
    id: 'yoga-pose',
    label: 'Yoga Pose',
    description: 'Pose with difficulty, benefits, and instructions',
    category: 'fitness',
    schema: [
      { key: 'name', type: 'string', description: 'Pose name' },
      { key: 'difficulty', type: 'string', description: 'Difficulty level' },
      {
        key: 'benefits',
        type: 'array',
        description: 'Array of benefit strings',
      },
      { key: 'duration', type: 'string', description: 'Hold duration' },
      {
        key: 'instructions',
        type: 'array',
        description: 'Array of instruction strings',
      },
    ],
    defaultContent: {
      name: 'Downward Dog',
      difficulty: 'Beginner',
      benefits: [
        'Stretches hamstrings',
        'Strengthens arms',
        'Improves posture',
      ],
      duration: '5 breaths',
      instructions: [
        'Start on hands and knees',
        'Lift hips toward the ceiling',
        'Press heels toward the mat',
        'Hold while breathing deeply',
      ],
    },
  },
  {
    id: 'challenge-calendar',
    label: 'Challenge Calendar',
    description: 'Monthly challenge with daily activities',
    category: 'fitness',
    schema: [
      { key: 'title', type: 'string', description: 'Challenge title' },
      { key: 'month', type: 'string', description: 'Month label' },
      {
        key: 'days',
        type: 'array',
        description: 'Array of {day, activity} objects',
      },
    ],
    defaultContent: {
      title: 'Plank Challenge',
      month: 'April',
      days: [
        { day: '1', activity: '20s plank' },
        { day: '2', activity: '25s plank' },
        { day: '3', activity: '30s plank' },
        { day: '4', activity: 'Rest' },
        { day: '5', activity: '35s plank' },
      ],
    },
  },
  {
    id: 'fitness-goal',
    label: 'Fitness Goal',
    description: 'Goal card with target, plan steps, and motivation',
    category: 'fitness',
    schema: [
      { key: 'goal', type: 'string', description: 'Fitness goal' },
      { key: 'target', type: 'string', description: 'Target metric' },
      { key: 'deadline', type: 'string', description: 'Goal deadline' },
      { key: 'plan', type: 'array', description: 'Array of plan step strings' },
      { key: 'motivation', type: 'string', description: 'Motivational quote' },
    ],
    defaultContent: {
      goal: 'Run a 10K',
      target: 'Under 60 min',
      deadline: 'June 2025',
      plan: [
        'Run 3x per week',
        'Increase distance by 10% weekly',
        'Rest and recover properly',
        'Fuel with balanced nutrition',
      ],
      motivation: 'The body achieves what the mind believes.',
    },
  },
  {
    id: 'recipe-card',
    label: 'Recipe Card',
    description: 'Recipe with ingredients, steps, and time info',
    category: 'food',
    schema: [
      { key: 'title', type: 'string', description: 'Recipe title' },
      { key: 'prepTime', type: 'string', description: 'Preparation time' },
      { key: 'cookTime', type: 'string', description: 'Cooking time' },
      {
        key: 'ingredients',
        type: 'array',
        description: 'Array of ingredient strings',
      },
      { key: 'steps', type: 'array', description: 'Array of step strings' },
      { key: 'imageUrl', type: 'string', description: 'Optional image URL' },
    ],
    defaultContent: {
      title: 'Avocado Toast',
      prepTime: '5 min',
      cookTime: '3 min',
      ingredients: [
        '2 slices sourdough bread',
        '1 ripe avocado',
        'Salt and pepper',
        'Red pepper flakes',
        'Lemon juice',
      ],
      steps: [
        'Toast the bread until golden',
        'Mash avocado with lemon juice',
        'Spread on toast',
        'Season and garnish',
      ],
      imageUrl: '',
    },
  },
  {
    id: 'menu-highlights',
    label: 'Menu Highlights',
    description: 'Restaurant menu with featured items and prices',
    category: 'food',
    schema: [
      { key: 'restaurant', type: 'string', description: 'Restaurant name' },
      {
        key: 'items',
        type: 'array',
        description: 'Array of {name, price, desc} objects',
      },
    ],
    defaultContent: {
      restaurant: 'The Green Bowl',
      items: [
        {
          name: 'Buddha Bowl',
          price: '$14',
          desc: 'Quinoa, greens, sweet potato',
        },
        {
          name: 'Poke Bowl',
          price: '$16',
          desc: 'Fresh salmon, rice, avocado',
        },
        { name: 'Acai Bowl', price: '$11', desc: 'Acai, banana, granola' },
      ],
    },
  },
  {
    id: 'nutrition-facts',
    label: 'Nutrition Facts',
    description: 'Nutrition label-style display with values',
    category: 'food',
    schema: [
      { key: 'item', type: 'string', description: 'Food item name' },
      { key: 'calories', type: 'string', description: 'Calorie count' },
      { key: 'fat', type: 'string', description: 'Fat content' },
      { key: 'carbs', type: 'string', description: 'Carbohydrate content' },
      { key: 'protein', type: 'string', description: 'Protein content' },
      { key: 'serving', type: 'string', description: 'Serving size' },
    ],
    defaultContent: {
      item: 'Greek Yogurt',
      calories: '150',
      fat: '4g',
      carbs: '8g',
      protein: '20g',
      serving: '1 cup (245g)',
    },
  },
  {
    id: 'ingredient-spotlight',
    label: 'Ingredient Spotlight',
    description: 'Single ingredient with benefits and uses',
    category: 'food',
    schema: [
      { key: 'name', type: 'string', description: 'Ingredient name' },
      {
        key: 'benefits',
        type: 'array',
        description: 'Array of benefit strings',
      },
      { key: 'uses', type: 'array', description: 'Array of use strings' },
      { key: 'imageUrl', type: 'string', description: 'Optional image URL' },
    ],
    defaultContent: {
      name: 'Turmeric',
      benefits: [
        'Anti-inflammatory',
        'Rich in antioxidants',
        'Supports immune function',
      ],
      uses: [
        'Curries and stews',
        'Golden milk latte',
        'Smoothies',
        'Rice dishes',
      ],
      imageUrl: '',
    },
  },
  {
    id: 'cocktail-recipe',
    label: 'Cocktail Recipe',
    description: 'Drink recipe with ingredients, method, and garnish',
    category: 'food',
    schema: [
      { key: 'name', type: 'string', description: 'Cocktail name' },
      {
        key: 'ingredients',
        type: 'array',
        description: 'Array of ingredient strings',
      },
      {
        key: 'instructions',
        type: 'string',
        description: 'Preparation method',
      },
      { key: 'garnish', type: 'string', description: 'Garnish suggestion' },
      { key: 'glass', type: 'string', description: 'Glass type' },
    ],
    defaultContent: {
      name: 'Espresso Martini',
      ingredients: [
        '50ml vodka',
        '30ml coffee liqueur',
        '30ml fresh espresso',
        '10ml simple syrup',
      ],
      instructions:
        'Shake all ingredients with ice for 15 seconds. Strain into a chilled martini glass.',
      garnish: 'Coffee beans',
      glass: 'Martini glass',
    },
  },
  {
    id: 'food-review',
    label: 'Food Review',
    description: 'Dish review with star rating and description',
    category: 'food',
    schema: [
      { key: 'dish', type: 'string', description: 'Dish name' },
      { key: 'restaurant', type: 'string', description: 'Restaurant name' },
      { key: 'rating', type: 'number', description: 'Star rating 1-5' },
      { key: 'review', type: 'string', description: 'Review text' },
      { key: 'imageUrl', type: 'string', description: 'Optional image URL' },
    ],
    defaultContent: {
      dish: 'Margherita Pizza',
      restaurant: "Napoli's",
      rating: 5,
      review:
        'Perfectly crisp crust, fresh mozzarella, and the most flavourful tomato sauce I have had outside of Italy.',
      imageUrl: '',
    },
  },
  {
    id: 'meditation-guide',
    label: 'Meditation Guide',
    description: 'Step-by-step meditation with duration and tip',
    category: 'health',
    schema: [
      { key: 'title', type: 'string', description: 'Meditation title' },
      { key: 'duration', type: 'string', description: 'Duration display' },
      {
        key: 'instructions',
        type: 'array',
        description: 'Array of instruction strings',
      },
      { key: 'tip', type: 'string', description: 'Helpful tip' },
    ],
    defaultContent: {
      title: 'Mindful Breathing',
      duration: '5 min',
      instructions: [
        'Find a comfortable seated position',
        'Close your eyes and relax your shoulders',
        'Breathe in slowly through your nose for 4 counts',
        'Hold for 4 counts',
        'Exhale through your mouth for 6 counts',
        'Repeat for 5 minutes',
      ],
      tip: 'If your mind wanders, gently bring focus back to your breath without judgement.',
    },
  },
  {
    id: 'workout-card',
    label: 'Exercise Card',
    description: 'Single exercise with sets, reps, and rest',
    category: 'health',
    schema: [
      { key: 'title', type: 'string', description: 'Workout title' },
      { key: 'exercise', type: 'string', description: 'Exercise name' },
      { key: 'reps', type: 'string', description: 'Number of reps' },
      { key: 'sets', type: 'string', description: 'Number of sets' },
      { key: 'rest', type: 'string', description: 'Rest period' },
      { key: 'note', type: 'string', description: 'Optional note' },
    ],
    defaultContent: {
      title: 'Exercise of the Day',
      exercise: 'Pull Ups',
      reps: '10',
      sets: '3',
      rest: '60 sec',
      note: 'Use assisted band if needed',
    },
  },
  {
    id: 'water-tracker',
    label: 'Water Tracker',
    description: 'Daily water intake with glass tracker',
    category: 'health',
    schema: [
      { key: 'goal', type: 'string', description: 'Daily goal (glasses)' },
      {
        key: 'current',
        type: 'string',
        description: 'Current glasses consumed',
      },
      { key: 'unit', type: 'string', description: 'Unit label' },
      { key: 'tip', type: 'string', description: 'Hydration tip' },
    ],
    defaultContent: {
      goal: '8',
      current: '5',
      unit: 'glasses',
      tip: 'Keep a water bottle on your desk as a visual reminder to sip throughout the day.',
    },
  },
  {
    id: 'sleep-tips',
    label: 'Sleep Tips',
    description: 'Sleep hygiene tips with featured tip and quote',
    category: 'health',
    schema: [
      { key: 'title', type: 'string', description: 'Section title' },
      { key: 'tip', type: 'string', description: 'Featured tip' },
      { key: 'tips', type: 'array', description: 'Array of tip strings' },
      { key: 'quote', type: 'string', description: 'Motivational quote' },
    ],
    defaultContent: {
      title: 'Better Sleep Tonight',
      tip: 'Avoid screens 30 minutes before bed. Blue light suppresses melatonin production.',
      tips: [
        'Keep a consistent sleep schedule',
        'Make your bedroom cool and dark',
        'Avoid caffeine after 2 PM',
        'Limit alcohol before bed',
      ],
      quote:
        'Sleep is the golden chain that ties health and our bodies together.',
    },
  },
  {
    id: 'mood-tracker',
    label: 'Mood Tracker',
    description: 'Daily mood logging with emoji and note',
    category: 'health',
    schema: [
      { key: 'title', type: 'string', description: 'Tracker title' },
      {
        key: 'mood',
        type: 'string',
        description: 'Mood label (great/good/okay/low/bad)',
      },
      { key: 'note', type: 'string', description: 'Journal note' },
      { key: 'date', type: 'string', description: 'Date string' },
    ],
    defaultContent: {
      title: 'How are you feeling?',
      mood: 'good',
      note: 'Had a productive morning and a nice walk in the park during lunch.',
      date: 'Mar 15, 2025',
    },
  },
  {
    id: 'wellness-tip',
    label: 'Wellness Tip',
    description: 'Health and wellness advice with source',
    category: 'health',
    schema: [
      { key: 'tip', type: 'string', description: 'Wellness tip' },
      { key: 'category', type: 'string', description: 'Tip category' },
      {
        key: 'description',
        type: 'string',
        description: 'Detailed explanation',
      },
      { key: 'source', type: 'string', description: 'Attribution source' },
    ],
    defaultContent: {
      tip: 'Movement is medicine',
      category: 'Exercise',
      description:
        'Even 10 minutes of moderate activity can boost mood, improve focus, and reduce stress.',
      source: 'World Health Organisation',
    },
  },
  {
    id: 'destination-guide',
    label: 'Destination Guide',
    description: 'Place guide with highlights and best time to visit',
    category: 'travel',
    schema: [
      { key: 'destination', type: 'string', description: 'Destination name' },
      {
        key: 'highlights',
        type: 'array',
        description: 'Array of highlight strings',
      },
      { key: 'bestTime', type: 'string', description: 'Best time to visit' },
      { key: 'tip', type: 'string', description: 'Travel tip' },
      { key: 'imageUrl', type: 'string', description: 'Optional image URL' },
    ],
    defaultContent: {
      destination: 'Kyoto, Japan',
      highlights: [
        'Fushimi Inari Shrine with thousands of torii gates',
        'Bamboo Grove in Arashiyama',
        'Historic Gion district',
        'Kinkaku-ji Golden Pavilion',
      ],
      bestTime: 'March–May or Oct–Nov',
      tip: 'Visit popular temples early in the morning to avoid crowds.',
      imageUrl: '',
    },
  },
  {
    id: 'packing-list',
    label: 'Packing List',
    description: 'Travel packing checklist with item count',
    category: 'travel',
    schema: [
      { key: 'title', type: 'string', description: 'Trip title' },
      { key: 'items', type: 'array', description: 'Array of item strings' },
      { key: 'tip', type: 'string', description: 'Packing tip' },
    ],
    defaultContent: {
      title: 'Weekend Getaway',
      items: [
        'Passport & ID',
        'Phone charger',
        'Toiletries bag',
        '2 outfits per day',
        'Comfortable walking shoes',
        'Reusable water bottle',
        'Travel pillow',
        'Snacks',
      ],
      tip: 'Roll your clothes instead of folding to save space and reduce wrinkles.',
    },
  },
  {
    id: 'trip-itinerary',
    label: 'Trip Itinerary',
    description: 'Day-by-day travel schedule with connected steps',
    category: 'travel',
    schema: [
      { key: 'title', type: 'string', description: 'Trip title' },
      {
        key: 'days',
        type: 'array',
        description: 'Array of {day, activities} objects',
      },
      { key: 'totalDays', type: 'string', description: 'Total duration label' },
    ],
    defaultContent: {
      title: 'Paris Explorer',
      days: [
        { day: '1', activities: 'Arrive, Eiffel Tower, Seine cruise' },
        { day: '2', activities: 'Louvre Museum, Tuileries Garden' },
        { day: '3', activities: 'Montmartre, Sacré-Coeur' },
        { day: '4', activities: 'Versailles day trip' },
      ],
      totalDays: '4 Days',
    },
  },
  {
    id: 'bucket-list',
    label: 'Bucket List',
    description: 'Numbered travel bucket list with reasons',
    category: 'travel',
    schema: [
      { key: 'title', type: 'string', description: 'List title' },
      {
        key: 'items',
        type: 'array',
        description: 'Array of {place, reason} objects',
      },
    ],
    defaultContent: {
      title: 'Travel Dreams',
      items: [
        {
          place: 'Northern Lights',
          reason: 'Witness the aurora borealis in Iceland',
        },
        {
          place: 'Machu Picchu',
          reason: 'Hike the Inca Trail to ancient ruins',
        },
        {
          place: 'Santorini',
          reason: 'Watch sunset over white-washed villages',
        },
        {
          place: 'Bali',
          reason: 'Experience rice terraces and temple culture',
        },
      ],
    },
  },
  {
    id: 'travel-tip',
    label: 'Travel Tip',
    description: 'Travel advice with category and hashtag',
    category: 'travel',
    schema: [
      { key: 'tip', type: 'string', description: 'Travel tip' },
      { key: 'category', type: 'string', description: 'Tip category' },
      {
        key: 'description',
        type: 'string',
        description: 'Detailed explanation',
      },
      { key: 'hashtag', type: 'string', description: 'Related hashtag' },
    ],
    defaultContent: {
      tip: 'Pack a portable charger',
      category: 'Packing',
      description:
        'A portable power bank is a lifesaver during long travel days when outlets are scarce.',
      hashtag: '#TravelSmart',
    },
  },
  {
    id: 'landmark-spotlight',
    label: 'Landmark Spotlight',
    description: 'Famous landmark with location and fun fact',
    category: 'travel',
    schema: [
      { key: 'name', type: 'string', description: 'Landmark name' },
      { key: 'location', type: 'string', description: 'Location' },
      {
        key: 'description',
        type: 'string',
        description: 'Landmark description',
      },
      { key: 'funFact', type: 'string', description: 'Interesting fact' },
      { key: 'imageUrl', type: 'string', description: 'Optional image URL' },
    ],
    defaultContent: {
      name: 'Colosseum',
      location: 'Rome, Italy',
      description:
        'The largest ancient amphitheatre ever built, capable of holding up to 80,000 spectators.',
      funFact:
        'The Colosseum had a retractable awning system called the velarium to shield spectators from the sun.',
      imageUrl: '',
    },
  },
  {
    id: 'mobile',
    label: 'Mobile',
    description: 'Phone mockup with app metrics and stats',
    category: 'device',
    schema: [
      { key: 'headline', type: 'string', description: 'App name or headline' },
      { key: 'description', type: 'string', description: 'Description text' },
      { key: 'image', type: 'string', description: '9:16 content image URL' },
    ],
    defaultContent: {
      headline: 'FitTrack',
      description: 'Track your daily activity and stay motivated',
      image: '',
    },
  },
  {
    id: 'desktop',
    label: 'File Tree',
    description: 'Explorer-style file tree showing project structure',
    category: 'device',
    schema: [
      { key: 'headline', type: 'string', description: 'Project headline' },
      { key: 'description', type: 'string', description: 'Description text' },
      {
        key: 'tree',
        type: 'string',
        description: 'Indented file/folder tree (2 spaces per depth)',
      },
    ],
    defaultContent: {
      headline: 'Project Structure',
      description: 'Well-organised codebase with clear separation of concerns.',
      tree: [
        'src/',
        '  components/',
        '    Button.tsx',
        '    Header.tsx',
        '  hooks/',
        '    useAuth.ts',
        '  utils/',
        '    api.ts',
        '  App.tsx',
        '  index.ts',
        'package.json',
        'tsconfig.json',
      ].join('\n'),
    },
  },
  {
    id: 'smart-watch',
    label: 'Smart Watch',
    description: 'Watch face showing time and fitness metrics',
    category: 'device',
    schema: [
      { key: 'headline', type: 'string', description: 'Watch headline' },
      { key: 'description', type: 'string', description: 'Description text' },
      { key: 'image', type: 'string', description: '1:1 watch face image URL' },
    ],
    defaultContent: {
      headline: 'Health Watch',
      description: 'Track your fitness goals with style',
      image: '',
    },
  },
  {
    id: 'terminal',
    label: 'Terminal',
    description: 'Dark terminal window with command and output',
    category: 'device',
    schema: [
      { key: 'headline', type: 'string', description: 'Terminal title' },
      { key: 'description', type: 'string', description: 'Description text' },
      { key: 'command', type: 'string', description: 'Shell command' },
      { key: 'output', type: 'string', description: 'Command output' },
      { key: 'syntax', type: 'string', description: 'Code or syntax block' },
    ],
    defaultContent: {
      headline: 'Deploy Script',
      description: 'A quick deployment script for your project',
      command: 'npm run deploy',
      output: 'Deploying to production...',
      syntax: '✓ Build complete\n✓ Tests passed\n✓ Deployed v2.4.1',
    },
  },
  {
    id: 'browser',
    label: 'Browser',
    description: 'Browser window with URL bar and page content',
    category: 'device',
    schema: [
      { key: 'url', type: 'string', description: 'Website URL' },
      { key: 'pageTitle', type: 'string', description: 'Browser tab title' },
      { key: 'headline', type: 'string', description: 'Page headline' },
      { key: 'description', type: 'string', description: 'Description text' },
      { key: 'image', type: 'string', description: '16:9 content image URL' },
    ],
    defaultContent: {
      url: 'example.com',
      pageTitle: 'Welcome',
      headline: 'Your Site',
      description: 'A modern web experience for everyone',
      image: '',
    },
  },
  {
    id: 'laptop',
    label: 'Code',
    description: 'Code snippet card with syntax block and line numbers',
    category: 'device',
    schema: [
      { key: 'headline', type: 'string', description: 'Code headline' },
      { key: 'description', type: 'string', description: 'Description text' },
      { key: 'code', type: 'string', description: 'Multi-line code snippet' },
      {
        key: 'language',
        type: 'string',
        description: 'Programming language label',
      },
    ],
    defaultContent: {
      headline: 'Snippet',
      description: 'Clean and readable code example.',
      code: [
        'import { useState } from "react";',
        '',
        'const App = () => {',
        '  const [count, setCount] = useState(0);',
        '  return <div>{count}</div>;',
        '};',
      ].join('\n'),
      language: 'TypeScript',
    },
  },
];

export const DEFAULT_CONTENT_MAP: Record<
  string,
  Record<string, unknown>
> = Object.fromEntries(TEMPLATES.map((t) => [t.id, t.defaultContent]));

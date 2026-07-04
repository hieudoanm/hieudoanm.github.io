export interface WriteToolConfig {
  id: string;
  title: string;
  emoji: string;
  description: string;
  systemPrompt: string;
  placeholder: string;
  buttonLabel?: string;
  configFields?: {
    id: string;
    label: string;
    options: { value: string; label: string }[];
    placeholder: string;
  }[];
}

let preselectedToolId: string | null = null;

export const preselectWriteTool = (id: string | null) => {
  preselectedToolId = id;
};

export const popPreselectedTool = (): string | null => {
  const id = preselectedToolId;
  preselectedToolId = null;
  return id;
};

export const TOOLS: WriteToolConfig[] = [
  // ── Article ──────────────────────────────────────────
  {
    id: 'write-article',
    title: 'Article',
    emoji: '📝',
    description: 'Write a complete article',
    systemPrompt:
      'Write a complete article on the following topic with headings, subheadings, and engaging content.',
    placeholder: 'Enter an article topic...',
  },
  {
    id: 'write-article-rewriter',
    title: 'Article Rewriter',
    emoji: '🔄',
    description: 'Rewrite an article for clarity and flow',
    systemPrompt:
      'You are an editor. Rewrite the given article to improve clarity, flow, and quality while preserving the original meaning.',
    placeholder: 'Paste text to rewrite...',
    buttonLabel: 'Rewrite Article',
  },
  {
    id: 'write-blog-ideas',
    title: 'Blog Ideas',
    emoji: '💡',
    description: 'Generate 10 blog post ideas',
    systemPrompt:
      'Generate 10 blog post ideas about the following topic or niche. Include a brief description for each.',
    placeholder: 'Enter your blog niche...',
  },
  {
    id: 'write-blog-outline',
    title: 'Blog Outline',
    emoji: '📋',
    description: 'Create a detailed blog outline',
    systemPrompt:
      'Create a detailed blog post outline with headings and subheadings for the following topic.',
    placeholder: 'Enter your blog topic...',
  },
  {
    id: 'write-blog-post',
    title: 'Blog Post',
    emoji: '📄',
    description: 'Write a complete blog post',
    systemPrompt:
      'You are a blog writer. Write a complete blog post based on the topic and outline provided.',
    placeholder: 'Describe your topic and outline...',
    buttonLabel: 'Generate Blog Post',
  },
  {
    id: 'write-essay',
    title: 'Essay',
    emoji: '✍️',
    description: 'Write a well-structured essay',
    systemPrompt:
      'Write a well-structured essay on the following topic. Include an introduction, body paragraphs, and a conclusion.',
    placeholder: 'Enter an essay topic...',
  },
  {
    id: 'write-listicle',
    title: 'Listicle',
    emoji: '📋',
    description: 'Write a list-style article',
    systemPrompt:
      'You are a listicle writer. Write engaging list-style articles based on the topic provided.',
    placeholder: 'Enter a topic for a listicle...',
    buttonLabel: 'Generate Listicle',
  },
  {
    id: 'write-paragraph',
    title: 'Paragraph',
    emoji: '📃',
    description: 'Write a single paragraph',
    systemPrompt:
      'Write a coherent paragraph about the following topic. Keep it to one paragraph.',
    placeholder: 'Enter a topic for a paragraph...',
  },
  {
    id: 'write-story',
    title: 'Story',
    emoji: '📖',
    description: 'Write a creative short story',
    systemPrompt:
      'Write a creative short story based on the following prompt or idea.',
    placeholder: 'Enter a story prompt...',
  },
  {
    id: 'write-story-ideas',
    title: 'Story Ideas',
    emoji: '✨',
    description: 'Generate unique story ideas',
    systemPrompt:
      'You are a creative writing coach. Generate unique story ideas based on the genre or theme described.',
    placeholder: 'Describe the genre or theme...',
    buttonLabel: 'Generate Ideas',
  },
  {
    id: 'write-youtube-script',
    title: 'YouTube Script',
    emoji: '🎬',
    description: 'Write a YouTube video script',
    systemPrompt:
      'Write a YouTube video script for the following topic. Include intro, main content sections, and outro.',
    placeholder: 'Enter a video topic...',
  },

  // ── Business ──────────────────────────────────────────
  {
    id: 'write-bill-of-sale',
    title: 'Bill of Sale',
    emoji: '📜',
    description: 'Draft a Bill of Sale document',
    systemPrompt:
      'You are a legal document writer. Draft a Bill of Sale document based on the item and parties described.',
    placeholder: 'Describe the item and parties involved...',
    buttonLabel: 'Generate Bill of Sale',
  },
  {
    id: 'write-business-name',
    title: 'Business Name',
    emoji: '🏢',
    description: 'Generate 20 creative business name ideas',
    systemPrompt:
      'Generate 20 creative business name ideas for the following industry or description. Check that names are memorable and brandable.',
    placeholder: 'Describe your business or industry...',
  },
  {
    id: 'write-business-plan',
    title: 'Business Plan',
    emoji: '📊',
    description: 'Write a professional business plan',
    systemPrompt:
      'You are a business plan writer. Write a professional business plan based on the description provided.',
    placeholder: 'Describe your business...',
    buttonLabel: 'Generate Business Plan',
  },
  {
    id: 'write-business-slogan',
    title: 'Business Slogan',
    emoji: '🏷️',
    description: 'Generate catchy business slogans',
    systemPrompt:
      'You are a branding expert. Generate catchy business slogans based on the business description.',
    placeholder: 'Describe your business...',
    buttonLabel: 'Generate Slogan',
  },
  {
    id: 'write-cold-email',
    title: 'Cold Email',
    emoji: '📧',
    description: 'Write professional cold emails',
    systemPrompt:
      'You are a sales copywriter. Write professional cold emails based on the context provided.',
    placeholder: 'Describe your context and goals...',
    buttonLabel: 'Generate Cold Email',
  },
  {
    id: 'write-landing-page',
    title: 'Landing Page',
    emoji: '🖥️',
    description: 'Write compelling landing page copy',
    systemPrompt:
      'You are a copywriter. Write compelling landing page copy based on the product/service description.',
    placeholder: 'Describe your product or service...',
    buttonLabel: 'Generate Landing Page',
  },
  {
    id: 'write-nda',
    title: 'NDA',
    emoji: '🔒',
    description: 'Draft a Non-Disclosure Agreement',
    systemPrompt:
      'You are a legal document writer. Draft a Non-Disclosure Agreement based on the context provided.',
    placeholder: 'Describe the context for the NDA...',
    buttonLabel: 'Generate NDA',
  },
  {
    id: 'write-podcast-script',
    title: 'Podcast Script',
    emoji: '🎙️',
    description: 'Write an engaging podcast script',
    systemPrompt:
      'You are a podcast script writer. Write an engaging podcast script based on the topic and format described.',
    placeholder: 'Describe the topic and format...',
    buttonLabel: 'Generate Podcast Script',
  },
  {
    id: 'write-press-release',
    title: 'Press Release',
    emoji: '📰',
    description: 'Write a press release',
    systemPrompt:
      'You are a PR professional. Write a press release based on the news/event described.',
    placeholder: 'Describe the news or event...',
    buttonLabel: 'Generate Press Release',
  },
  {
    id: 'write-privacy-policy',
    title: 'Privacy Policy',
    emoji: '🛡️',
    description: 'Write a privacy policy',
    systemPrompt:
      'You are a legal document writer. Write a privacy policy based on the business/website description provided.',
    placeholder: 'Describe your business or website...',
    buttonLabel: 'Generate Privacy Policy',
  },
  {
    id: 'write-purchase-agreement',
    title: 'Purchase Agreement',
    emoji: '📝',
    description: 'Generate a purchase agreement contract',
    systemPrompt:
      'Generate a purchase agreement contract for buying or selling goods. Customize the terms as needed.',
    placeholder:
      'Describe the purchase details (item, price, parties, terms)...',
  },

  // ── Content ──────────────────────────────────────────
  {
    id: 'write-content-brief',
    title: 'Content Brief',
    emoji: '📋',
    description: 'Create a detailed content brief',
    systemPrompt:
      'You are a content strategist. Create a detailed content brief for a piece of content based on the topic and target audience.',
    placeholder: 'Describe the topic and target audience...',
    buttonLabel: 'Generate Content Brief',
  },
  {
    id: 'write-content-planner',
    title: 'Content Planner',
    emoji: '📅',
    description: 'Create a content plan / calendar',
    systemPrompt:
      'You are a content manager. Create a content plan/calendar based on the niche and goals described.',
    placeholder: 'Describe your niche and goals...',
    buttonLabel: 'Generate Content Plan',
  },
  {
    id: 'write-faq',
    title: 'FAQ Generator',
    emoji: '❓',
    description: 'Generate FAQs with answers',
    systemPrompt:
      'You are a content writer. Generate frequently asked questions (FAQs) with answers based on the topic or product described.',
    placeholder: 'Describe the topic or product...',
    buttonLabel: 'Generate FAQs',
  },
  {
    id: 'write-poll',
    title: 'Poll Questions',
    emoji: '📊',
    description: 'Create engaging poll questions',
    systemPrompt:
      'You are a community manager. Create engaging poll questions with multiple choices based on the topic provided.',
    placeholder: 'Describe the topic for the poll...',
    buttonLabel: 'Generate Poll',
  },
  {
    id: 'write-trivia',
    title: 'Trivia Questions',
    emoji: '🧠',
    description: 'Generate trivia questions with answers',
    systemPrompt:
      'You are a trivia creator. Generate interesting trivia questions with answers based on the topic provided.',
    placeholder: 'Describe for the trivia...',
    buttonLabel: 'Generate Trivia',
  },

  // ── Edit ──────────────────────────────────────────
  {
    id: 'write-complete',
    title: 'Complete Text',
    emoji: '✏️',
    description: 'Continue and complete a partial paragraph',
    systemPrompt:
      'Continue and complete the following partial paragraph or sentence naturally.',
    placeholder: 'Enter partial text to complete...',
    buttonLabel: 'Complete',
  },
  {
    id: 'write-grammar',
    title: 'Grammar Fix',
    emoji: '✅',
    description: 'Fix grammar, spelling, and punctuation',
    systemPrompt:
      'Fix all grammar, spelling, and punctuation errors in the following text.',
    placeholder: 'Paste text with errors...',
    buttonLabel: 'Fix Grammar',
  },
  {
    id: 'write-humanizer',
    title: 'Humanizer',
    emoji: '🤖',
    description: 'Make AI text sound more human',
    systemPrompt:
      'Rewrite the following AI-generated text to sound more natural, human, and less robotic.',
    placeholder: 'Paste AI-generated text...',
    buttonLabel: 'Humanize',
  },
  {
    id: 'write-improve-text',
    title: 'Improve Text',
    emoji: '⬆️',
    description: 'Make text more engaging and professional',
    systemPrompt:
      'Improve the following text to make it more engaging, clear, and professional.',
    placeholder: 'Paste text to improve...',
    buttonLabel: 'Improve',
  },
  {
    id: 'write-paraphrase',
    title: 'Paraphrase',
    emoji: '🔁',
    description: 'Paraphrase while preserving meaning',
    systemPrompt:
      'Paraphrase the following paragraph while preserving its meaning. Use different vocabulary and sentence structures.',
    placeholder: 'Paste text to paraphrase...',
    buttonLabel: 'Paraphrase',
  },
  {
    id: 'write-rewrite',
    title: 'Rewrite',
    emoji: '🔄',
    description: 'Rewrite in multiple different ways',
    systemPrompt:
      'Rewrite the following sentences in multiple different ways while preserving the original meaning.',
    placeholder: 'Paste text to rewrite...',
    buttonLabel: 'Rewrite',
  },
  {
    id: 'write-shorten',
    title: 'Shorten',
    emoji: '✂️',
    description: 'Shorten text to half its length',
    systemPrompt:
      'Shorten the following text to about half its length while preserving the essential meaning.',
    placeholder: 'Paste text to shorten...',
    buttonLabel: 'Shorten',
  },
  {
    id: 'write-summarize',
    title: 'Summarize',
    emoji: '📝',
    description: 'Summarize text concisely',
    systemPrompt:
      'Summarize the following text concisely while preserving all key points and main ideas.',
    placeholder: 'Paste text to summarize...',
    buttonLabel: 'Summarize',
  },
  {
    id: 'write-tone',
    title: 'Tone Rewriter',
    emoji: '🎭',
    description: 'Rewrite text in a specific tone',
    systemPrompt: 'Rewrite the following text in a {tone} tone.',
    placeholder: 'Enter text to rewrite...',
    configFields: [
      {
        id: 'tone',
        label: 'Tone',
        placeholder: 'Professional',
        options: [
          { value: 'Professional', label: 'Professional' },
          { value: 'Casual', label: 'Casual' },
          { value: 'Friendly', label: 'Friendly' },
          { value: 'Formal', label: 'Formal' },
          { value: 'Humorous', label: 'Humorous' },
          { value: 'Empathetic', label: 'Empathetic' },
          { value: 'Inspirational', label: 'Inspirational' },
          { value: 'Authoritative', label: 'Authoritative' },
        ],
      },
    ],
  },
  {
    id: 'write-translate',
    title: 'Translate',
    emoji: '🌐',
    description: 'Translate text to another language',
    systemPrompt: 'Translate the following text to {language}.',
    placeholder: 'Paste text to translate...',
    buttonLabel: 'Translate',
    configFields: [
      {
        id: 'language',
        label: 'Language',
        placeholder: 'Vietnamese',
        options: [
          { value: 'Vietnamese', label: 'Vietnamese' },
          { value: 'Spanish', label: 'Spanish' },
          { value: 'French', label: 'French' },
          { value: 'German', label: 'German' },
          { value: 'Italian', label: 'Italian' },
          { value: 'Portuguese', label: 'Portuguese' },
          { value: 'Russian', label: 'Russian' },
          { value: 'Japanese', label: 'Japanese' },
          { value: 'Korean', label: 'Korean' },
          { value: 'Chinese', label: 'Chinese' },
          { value: 'Arabic', label: 'Arabic' },
          { value: 'Hindi', label: 'Hindi' },
          { value: 'Dutch', label: 'Dutch' },
        ],
      },
    ],
  },

  // ── Misc ──────────────────────────────────────────
  {
    id: 'write-ai-detector',
    title: 'AI Detector',
    emoji: '🔍',
    description: 'Analyze if text was written by AI',
    systemPrompt:
      'Analyze whether a piece of text was written by AI or by a human. Provide detailed analysis and confidence score.',
    placeholder: 'Paste text to analyze...',
    buttonLabel: 'Analyze',
  },
  {
    id: 'write-explain',
    title: "Explain Like I'm 5",
    emoji: '👶',
    description: 'Explain a concept in simple terms',
    systemPrompt:
      'Explain the following concept in simple terms as if explaining to a 5-year-old. Use analogies and simple language.',
    placeholder: 'Enter a concept to explain...',
    buttonLabel: 'Explain',
  },
  {
    id: 'write-summarize-podcast',
    title: 'Podcast Summarizer',
    emoji: '🎧',
    description: 'Summarize a podcast transcript',
    systemPrompt:
      'Summarize the following podcast transcript. Extract key topics, insights, and notable quotes.',
    placeholder: 'Paste podcast transcript...',
    buttonLabel: 'Summarize Podcast',
  },
  {
    id: 'write-summarize-youtube',
    title: 'YouTube Summarizer',
    emoji: '📺',
    description: 'Summarize a YouTube transcript',
    systemPrompt:
      'Summarize the following YouTube video transcript. Extract key points, main arguments, and conclusions.',
    placeholder: 'Paste YouTube transcript...',
    buttonLabel: 'Summarize Video',
  },
  {
    id: 'write-title',
    title: 'Title Generator',
    emoji: '🏆',
    description: 'Generate 5 compelling title options',
    systemPrompt:
      'Rewrite the following title to make it more compelling and clickable. Provide 5 different options.',
    placeholder: 'Enter a title to rewrite...',
    buttonLabel: 'Generate Titles',
  },

  // ── Real Estate ──────────────────────────────────────────
  {
    id: 'write-real-estate-bio',
    title: 'Agent Bio',
    emoji: '👤',
    description: 'Write a professional agent biography',
    systemPrompt:
      'Write a professional real estate agent biography. Highlight experience, specialties, local market knowledge, and a personal touch.',
    placeholder: "Describe the agent's experience and specialties...",
    buttonLabel: 'Generate Bio',
  },
  {
    id: 'write-real-estate-description',
    title: 'Property Description',
    emoji: '🏠',
    description: 'Write a detailed property description',
    systemPrompt:
      'Write a detailed property description for a real estate website or brochure. Cover architecture, interiors, outdoor spaces, and neighborhood amenities.',
    placeholder: 'Describe the property details...',
    buttonLabel: 'Generate Description',
  },
  {
    id: 'write-real-estate-listing',
    title: 'Property Listing',
    emoji: '📋',
    description: 'Write a compelling property listing',
    systemPrompt:
      'Write a compelling real estate listing for the following property. Include key features, location highlights, and a call to action.',
    placeholder: 'Describe the property for listing...',
    buttonLabel: 'Generate Listing',
  },

  // ── Social ──────────────────────────────────────────
  {
    id: 'write-caption',
    title: 'Instagram Caption',
    emoji: '📸',
    description: 'Generate 5 creative captions with hashtags',
    systemPrompt:
      'Generate 5 creative Instagram caption ideas for the following topic or photo description. Include relevant hashtags.',
    placeholder: 'Describe the photo or topic...',
    buttonLabel: 'Generate Captions',
  },
  {
    id: 'write-headline',
    title: 'Facebook Headline',
    emoji: '📘',
    description: 'Generate 10 engaging headlines',
    systemPrompt:
      'Generate 10 engaging Facebook headline variations for the following topic or product.',
    placeholder: 'Describe the topic or product...',
    buttonLabel: 'Generate Headlines',
  },
  {
    id: 'write-linkedin-post',
    title: 'LinkedIn Post',
    emoji: '💼',
    description: 'Write a professional LinkedIn post',
    systemPrompt:
      'Write a professional LinkedIn post about the following topic. Include a hook, personal insight, and call to action.',
    placeholder: 'Describe the topic for your post...',
    buttonLabel: 'Generate Post',
  },
  {
    id: 'write-meta-description',
    title: 'SEO Meta Description',
    emoji: '🔎',
    description: 'Write compelling meta descriptions',
    systemPrompt:
      'You are an SEO copywriter. Write compelling meta descriptions for web pages based on the content provided.',
    placeholder: 'Describe the page content...',
    buttonLabel: 'Generate Meta Description',
  },
  {
    id: 'write-tiktok-script',
    title: 'TikTok Script',
    emoji: '🎵',
    description: 'Write a TikTok video script',
    systemPrompt:
      'Write a TikTok video script based on your topic. Include hook, body, call-to-action, and timing suggestions.',
    placeholder: 'Describe the topic for your TikTok...',
    buttonLabel: 'Generate Script',
  },
  {
    id: 'write-twitter-generator',
    title: 'Twitter / X Post',
    emoji: '🐦',
    description: 'Generate engaging Twitter posts',
    systemPrompt:
      'Generate engaging Twitter posts. Include hashtag suggestions and optimal posting strategies.',
    placeholder: 'Describe the topic or message...',
    buttonLabel: 'Generate Posts',
  },
];

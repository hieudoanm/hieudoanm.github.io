import { yaml as yamlLang } from '@codemirror/lang-yaml';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas-pro';
import { PDFDocument } from 'pdf-lib';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import yaml from 'yaml';

/* =========================
   Types
========================= */
type SlideBlock =
  | { type: 'title'; text: string }
  | { type: 'subtitle'; text: string }
  | { type: 'text'; text: string }
  | {
      type: 'bullets';
      items: { emoji?: string; title?: string; description?: string }[];
    }
  | { type: 'highlight'; text?: string; subtext?: string }
  | { type: 'pricing-plan'; name: string; price: string; frequency: string }
  | { type: 'center'; blocks: SlideBlock[] };

type SlideLayout = { kicker?: string; blocks: SlideBlock[] };
type PitchDeck = {
  title?: { product?: string; tagline?: string; audience?: string };
  problems?: {
    title?: string;
    subtitle?: string;
    items?: {
      emoji?: string;
      title?: string;
      description?: string;
      impact?: string;
      severity?: string;
      userType?: string;
    }[];
  };
  solutions?: {
    title?: string;
    subtitle?: string;
    items?: {
      step?: number;
      emoji?: string;
      title?: string;
      description?: string;
    }[];
  };
  product?: {
    title?: string;
    subtitle?: string;
    features?: { emoji?: string; title?: string; description?: string }[];
  };
  pricing?: {
    title?: string;
    subtitle?: string;
    model?: string;
    currency?: string;
    plans?: {
      name?: string;
      amount?: number;
      frequency?: string;
      description?: string;
    }[];
  };
};

type ValidationError = { path: string; message: string; hint?: string };

/* =========================
   Constants
========================= */
const INITIAL_CONTENT = `title:
  product: PitchDeckGen
  tagline: Create stunning pitch decks in minutes
  audience: Startup founders & entrepreneurs, early-stage startups, and solo founders

problems:
  title: The Core Problems Founders Face
  subtitle: Why creating a strong pitch deck is harder than it should be
  items:
    - emoji: ⏱️
      title: Time-consuming slide creation
      description: Creating slides manually takes hours, slowing down fundraising
      impact: Delays investor meetings
      severity: high
      userType: founders
    - emoji: 🛠️
      title: Complex or generic tools
      description: Existing tools are either too complex or too generic
      impact: Waste time learning software
      severity: medium
      userType: early-stage startups
    - emoji: 🎨
      title: Design challenges
      description: Non-designers struggle to make slides visually appealing
      impact: Decks fail to capture attention
      severity: high
      userType: solo founders

solutions:
  title: How it works
  subtitle: A simple workflow for busy founders
  items:
    - step: 1
      emoji: 📝
      title: Input your idea
      description: Add your key points, company info, and metrics
    - step: 2
      emoji: 📤
      title: Export
      description: Export your deck to PDF
    - step: 3
      emoji: 🔗
      title: Share
      description: Share your deck with investors easily

product:
  title: Everything you need to pitch
  subtitle: What users can do with it
  features:
    - emoji: 🤖
      title: AI-assisted slide creation
      description: Turn simple prompts into professional slides
    - emoji: 🎨
      title: Customizable templates
      description: Adjust colors, fonts, and layout
    - emoji: 📤
      title: Export to PDF
      description: Export your pitch deck to PDF

pricing:
  title: Simple Pricing
  subtitle: Choose a plan that fits how often you pitch
  model: one-time
  currency: USD
  plans:
    - name: Free
      amount: 0.00
      frequency: free
      description: Create and export your first pitch deck
    - name: Pay As You Go
      amount: 1.99
      frequency: per deck
      description: Pay only when you export
    - name: Lifetime
      amount: 9.99
      frequency: one-time
      description: Unlimited pitch decks
`;

/* =========================
   Utils
========================= */
const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    amount
  );

const oklchToHex = (oklch: string): string => {
  const match = oklch.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
  if (!match) return '#000000';
  const [, L, C] = match.map(Number);
  let [, , , H] = match.map(Number);
  H = (H * Math.PI) / 180;
  const a = C * Math.cos(H);
  const b = C * Math.sin(H);
  let l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  let m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  let s_ = L - 0.0894841775 * a - 1.291485548 * b;
  l_ = Math.pow(l_, 3);
  m_ = Math.pow(m_, 3);
  s_ = Math.pow(s_, 3);
  let r = 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_;
  let g = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_;
  let b2 = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_;
  const toSRGB = (x: number) =>
    x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
  r = Math.min(255, Math.max(0, toSRGB(r) * 255));
  g = Math.min(255, Math.max(0, toSRGB(g) * 255));
  b2 = Math.min(255, Math.max(0, toSRGB(b2) * 255));
  return (
    '#' +
    [r, g, b2].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
  );
};

const labToHex = (lab: string): string => {
  const match = lab.match(/lab\(\s*([\d.]+)\s*([\d.-]+)\s*([\d.-]+)\s*\)/i);
  if (!match) return '#000000';
  const L = parseFloat(match[1]);
  const a = parseFloat(match[2]);
  const b_ = parseFloat(match[3]);
  let y = (L + 16) / 116;
  let x = a / 500 + y;
  let z = y - b_ / 200;
  const xyzPivot = (t: number) =>
    Math.pow(t, 3) > 0.008856 ? Math.pow(t, 3) : (t - 16 / 116) / 7.787;
  x = xyzPivot(x) * 0.95047;
  y = xyzPivot(y) * 1.0;
  z = xyzPivot(z) * 1.08883;
  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let b = x * 0.0557 + y * -0.204 + z * 1.057;
  const gamma = (u: number) =>
    u <= 0.0031308 ? 12.92 * u : 1.055 * Math.pow(u, 1 / 2.4) - 0.055;
  r = Math.min(1, Math.max(0, gamma(r)));
  g = Math.min(1, Math.max(0, gamma(g)));
  b = Math.min(1, Math.max(0, gamma(b)));
  const toHex = (v: number) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const inlineTailwindStyles = (root: HTMLElement) => {
  const props = [
    'width',
    'height',
    'minWidth',
    'minHeight',
    'padding',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'margin',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'gap',
    'fontSize',
    'fontWeight',
    'lineHeight',
    'letterSpacing',
    'color',
    'backgroundColor',
    'borderColor',
    'borderWidth',
    'borderRadius',
    'backgroundImage',
  ];
  root.querySelectorAll<HTMLElement>('*').forEach((el) => {
    const computed = getComputedStyle(el);
    props.forEach((prop) => {
      let value = computed.getPropertyValue(prop);
      if (!value) return;
      if (value.includes('oklch(')) value = oklchToHex(value);
      if (value.includes('lab(')) value = labToHex(value);
      el.style.setProperty(
        prop.replace(/([A-Z])/g, '-$1').toLowerCase(),
        value
      );
    });
  });
};

const applyExportSafeColors = (root: HTMLElement) => {
  const modified: Array<{ element: HTMLElement; style: string }> = [];
  const htmlElements = Array.from(
    root.querySelectorAll<HTMLElement>('*')
  ).concat(root);
  htmlElements.forEach((el) => {
    const style = getComputedStyle(el);
    for (let i = 0; i < style.length; i++) {
      const prop = style[i];
      const value = style.getPropertyValue(prop);
      if (!value) continue;
      if (value.includes('oklch(')) {
        modified.push({ element: el, style: el.getAttribute('style') || '' });
        el.style.setProperty(prop, oklchToHex(value));
      } else if (value.includes('lab(')) {
        modified.push({ element: el, style: el.getAttribute('style') || '' });
        el.style.setProperty(prop, labToHex(value));
      } else if (value.includes('color(')) {
        modified.push({ element: el, style: el.getAttribute('style') || '' });
        el.style.setProperty(prop, '#000000');
      }
    }
  });
  return () => {
    modified.forEach(({ element, style }) => {
      if (style) element.setAttribute('style', style);
      else element.removeAttribute('style');
    });
  };
};

const validate = (data: PitchDeck): ValidationError[] => {
  if (!data || typeof data !== 'object') {
    return [
      {
        path: '',
        message: 'Root YAML must be an object',
        hint: 'Start with keys like `title`, `problems`',
      },
    ];
  }
  const errors: ValidationError[] = [];
  if (!data.title)
    errors.push({
      path: 'title',
      message: 'Missing title section',
      hint: 'Add a `title:` section',
    });
  if (typeof data.title?.product !== 'string')
    errors.push({
      path: 'title.product',
      message: 'Product name is required',
      hint: 'Example: product: InvoiceMate',
    });
  if (typeof data.title?.tagline !== 'string')
    errors.push({ path: 'title.tagline', message: 'Tagline is required' });
  if (typeof data.title?.audience !== 'string')
    errors.push({ path: 'title.audience', message: 'Audience is required' });
  return errors;
};

const mapYamlToSlides = (data: PitchDeck): SlideLayout[] => [
  {
    kicker: 'Introduction',
    blocks: [
      {
        type: 'center',
        blocks: [
          { type: 'title', text: data.title?.product ?? '' },
          { type: 'subtitle', text: data.title?.tagline ?? '' },
          { type: 'text', text: data.title?.audience ?? '' },
        ],
      },
    ],
  },
  {
    kicker: 'Problems',
    blocks: [
      { type: 'title', text: data.problems?.title ?? '' },
      { type: 'subtitle', text: data.problems?.subtitle ?? '' },
      {
        type: 'bullets',
        items: (data.problems?.items ?? []).map((p) => ({
          emoji: p.emoji,
          title: p.title,
          description: p.description,
        })),
      },
    ],
  },
  {
    kicker: 'Solution',
    blocks: [
      { type: 'title', text: data.solutions?.title ?? '' },
      { type: 'subtitle', text: data.solutions?.subtitle ?? '' },
      {
        type: 'bullets',
        items: (data.solutions?.items ?? []).map((item) => ({
          emoji: item.emoji,
          title: item.title,
          description: item.description,
        })),
      },
    ],
  },
  {
    kicker: 'Product',
    blocks: [
      { type: 'title', text: data.product?.title ?? '' },
      { type: 'subtitle', text: data.product?.subtitle ?? '' },
      {
        type: 'bullets',
        items: (data.product?.features ?? []).map((f) => ({
          emoji: f.emoji,
          title: f.title,
          description: f.description,
        })),
      },
    ],
  },
  {
    kicker: 'Pricing Model',
    blocks: [
      {
        type: 'center',
        blocks: [
          { type: 'title', text: data.pricing?.title ?? '' },
          { type: 'subtitle', text: data.pricing?.subtitle ?? '' },
          ...(data.pricing?.plans ?? []).map((plan) => ({
            type: 'pricing-plan' as const,
            name: plan?.name ?? '',
            price: formatCurrency(
              plan?.amount ?? 0,
              data?.pricing?.currency ?? ''
            ),
            frequency: plan?.frequency ?? '',
          })),
        ],
      },
    ],
  },
];

/* =========================
   Block Components
========================= */
const TextBlock: FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => (
  <div className={className}>
    <pre className="m-0 inline pb-8 break-words whitespace-pre-wrap">
      {text}
    </pre>
  </div>
);

const CenterBlock: FC<{ block: SlideBlock }> = ({ block }) => {
  switch (block.type) {
    case 'title':
      return (
        <TextBlock
          text={block.text}
          className="text-base-content mb-8 text-5xl font-bold"
        />
      );
    case 'subtitle':
      return (
        <TextBlock
          text={block.text}
          className="text-primary mb-8 text-3xl font-semibold"
        />
      );
    case 'text':
      return (
        <TextBlock
          text={block.text}
          className="text-neutral-content mb-8 text-xl"
        />
      );
    case 'pricing-plan':
      return (
        <div className="mt-8 flex w-full max-w-sm flex-col items-center">
          <div className="text-base-content mb-8 text-xl font-bold">
            <TextBlock text={block.name} />
          </div>
          <div className="text-primary mb-8 text-6xl font-extrabold">
            <TextBlock text={block.price} />
          </div>
        </div>
      );
    default:
      return null;
  }
};

/* =========================
   SlidePreview Component
========================= */
const SlidePreviewComponent: FC<{ slide: SlideLayout; index: number }> = ({
  slide,
  index,
}) => (
  <div className="group bg-base-100 border-primary-content relative mx-auto aspect-video h-[720px] w-[1280px] cursor-default border p-14 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500 to-transparent opacity-0 transition-opacity group-hover:opacity-20" />
    <div className="flex items-start justify-between">
      {slide.kicker && (
        <div className="text-secondary mb-8 text-lg font-semibold uppercase">
          <TextBlock text={slide.kicker} />
        </div>
      )}
      <div className="text-base-content font-mono text-lg">
        <TextBlock text={`${index + 1} / 5`} />
      </div>
    </div>
    <div className="flex h-full flex-col">
      {slide.blocks.map((block, i) => {
        switch (block.type) {
          case 'title':
            return (
              <TextBlock
                key={i}
                text={block.text}
                className="text-base-content mb-8 text-5xl font-bold"
              />
            );
          case 'subtitle':
            return (
              <TextBlock
                key={i}
                text={block.text}
                className="text-primary mb-8 text-2xl font-semibold"
              />
            );
          case 'text':
            return (
              <TextBlock
                key={i}
                text={block.text}
                className="text-neutral-content text-2xl"
              />
            );
          case 'center': {
            const pricingPlans = block.blocks.filter(
              (b) => b.type === 'pricing-plan'
            );
            const contentBlocks = block.blocks.filter(
              (b) => b.type !== 'pricing-plan'
            );
            return (
              <div className="-mt-16 flex h-full flex-col items-center justify-center text-center">
                {contentBlocks.map((child, ci) => (
                  <CenterBlock key={`text-${ci}`} block={child} />
                ))}
                {pricingPlans.length > 0 && (
                  <div className="mt-12 flex items-center justify-center">
                    {pricingPlans.map((plan, pi) => (
                      <div key={pi} className="flex items-start">
                        <CenterBlock block={plan} />
                        {pi < pricingPlans.length - 1 && (
                          <span className="text-base-100 mx-12 text-9xl font-light">
                            |
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          case 'bullets':
            return (
              <ul key={i} className="space-y-6">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-4">
                    <span className="text-3xl">{item.emoji}</span>
                    <div>
                      <div className="text-base-content text-2xl font-bold">
                        <TextBlock text={item.title ?? ''} />
                      </div>
                      {item.description && (
                        <div className="text-neutral-content text-xl">
                          <TextBlock text={item.description ?? ''} />
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  </div>
);

/* =========================
   Landing Component
========================= */
const LandingComponent: FC<{ data: PitchDeck }> = ({ data }) => {
  const { title, problems, solutions, product, pricing } = data;
  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      <section className="bg-base-200 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {title?.product ?? ''}
          </h1>
          <p className="mb-4 text-lg opacity-80 sm:text-xl">
            {title?.tagline ?? ''}
          </p>
          <p className="mb-8 opacity-70">Built for {title?.audience ?? ''}</p>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {problems?.title && (
            <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl lg:text-4xl">
              {problems.title}
            </h2>
          )}
          {problems?.subtitle && (
            <p className="mb-12 text-center text-base opacity-70 sm:text-lg">
              {problems.subtitle}
            </p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(problems?.items ?? []).map((p, i) => (
              <div
                key={i}
                className="card border-base-300 bg-base-200 border shadow-xl">
                <div className="card-body">
                  <div className="mb-2 text-3xl">{p.emoji}</div>
                  <h3 className="card-title">{p.title}</h3>
                  <p className="opacity-80">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-base-200 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          {solutions?.title && (
            <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl lg:text-4xl">
              {solutions.title}
            </h2>
          )}
          {solutions?.subtitle && (
            <p className="mb-12 text-center text-base opacity-70 sm:text-lg">
              {solutions.subtitle}
            </p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(solutions?.items ?? []).map((s, i) => (
              <div
                key={i}
                className="card border-base-300 bg-base-100 border text-center shadow-xl">
                <div className="card-body">
                  <div className="mb-4 text-4xl">{s.emoji}</div>
                  <span className="badge badge-primary mx-auto mb-2">
                    Step {s.step}
                  </span>
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {s.title}
                  </h3>
                  <p className="opacity-80">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {product?.title && (
            <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl lg:text-4xl">
              {product.title}
            </h2>
          )}
          {product?.subtitle && (
            <p className="mb-12 text-center text-base opacity-70 sm:text-lg">
              {product.subtitle}
            </p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(product?.features ?? []).map((f, i) => (
              <div
                key={i}
                className="card border-base-300 bg-base-200 border shadow-xl">
                <div className="card-body">
                  <div className="mb-2 text-3xl">{f.emoji}</div>
                  <h3 className="card-title">{f.title}</h3>
                  <p className="opacity-80">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-base-200 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {pricing?.title && (
            <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl lg:text-4xl">
              {pricing.title}
            </h2>
          )}
          {pricing?.subtitle && (
            <p className="mb-12 text-center text-base opacity-70 sm:text-lg">
              {pricing.subtitle}
            </p>
          )}
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(pricing?.plans ?? []).map((plan, i) => (
              <div key={i} className="card bg-base-100 text-center shadow-lg">
                <div className="card-body">
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {plan.name}
                  </h3>
                  <p className="my-4 text-3xl font-bold sm:text-4xl">
                    {formatCurrency(plan?.amount ?? 0, pricing?.currency ?? '')}
                  </p>
                  <p className="mb-2 text-sm opacity-60">{plan.frequency}</p>
                  <p className="mb-6 opacity-80">{plan.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="footer footer-center bg-base-300 text-base-content p-6">
        <aside>
          <p className="font-semibold">{title?.product}</p>
          <p className="text-sm opacity-60">
            &copy; {new Date().getFullYear()} — All rights reserved
          </p>
        </aside>
      </footer>
    </div>
  );
};

/* =========================
   Toast
========================= */
type ToastType = 'success' | 'error' | 'info' | 'loading';
type ToastItem = {
  id: number;
  type: ToastType;
  message: string;
  duration?: number;
};

const TOAST_EMOJI: Record<ToastType, string> = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  loading: '⌛',
};

const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const dismiss = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));
  const show = (
    type: ToastType,
    message: string,
    duration = type === 'loading' ? undefined : 2500
  ) => {
    const id = Date.now();
    setToasts((prev) => [
      ...prev.slice(-2),
      { id, type, message: `${TOAST_EMOJI[type]} ${message}`, duration },
    ]);
    if (duration) setTimeout(() => dismiss(id), duration);
    return id;
  };
  return { toasts, show, dismiss };
};

const Toast: FC<{ toasts: ToastItem[]; onDismiss: (id: number) => void }> = ({
  toasts,
  onDismiss,
}) => (
  <div className="toast toast-bottom toast-end z-50 space-y-2">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        onClick={() => onDismiss(toast.id)}
        className={`alert animate-toast-in cursor-pointer transition-all duration-300 ease-out ${
          toast.type === 'success'
            ? 'alert-success'
            : toast.type === 'error'
              ? 'alert-error'
              : 'alert-info'
        }`}>
        <div className="flex items-center gap-2">
          {toast.type === 'loading' && (
            <span className="loading loading-spinner loading-sm" />
          )}
          <span>{toast.message}</span>
        </div>
      </div>
    ))}
  </div>
);

/* =========================
   Slides Modal
========================= */
export const SlidesModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { toasts, show, dismiss } = useToast();

  const getInitialInput = () => {
    if (typeof window === 'undefined') return INITIAL_CONTENT;
    return new URLSearchParams(location.search).get('yaml') ?? INITIAL_CONTENT;
  };

  const [input, setInput] = useState(getInitialInput);
  const [showInput, setShowInput] = useState(true);
  const [tab, setTab] = useState<'pitch' | 'landing'>('pitch');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const encoded = encodeURIComponent(input);
    if (encoded.length > 4000) return;
    const url = `${location.pathname}?yaml=${encoded}`;
    window.history.replaceState(null, '', url);
  }, [input]);

  const parsed = useMemo(() => {
    try {
      const result = yaml.parse(input) as PitchDeck;
      return { data: result, errors: validate(result) };
    } catch {
      return {
        data: null,
        errors: [{ path: '', message: 'Invalid YAML' }] as ValidationError[],
      };
    }
  }, [input]);

  const slides = useMemo(
    () => (parsed.data ? mapYamlToSlides(parsed.data) : []),
    [parsed.data]
  );

  /* =========================
     CodeMirror
  ========================= */
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    const state = EditorState.create({
      doc: input,
      extensions: [
        oneDark,
        yamlLang(),
        EditorView.lineWrapping,
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-editor': { height: '100%' },
          '.cm-scroller': { overflow: 'auto', fontFamily: 'monospace' },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) setInput(update.state.doc.toString());
        }),
      ],
    });
    viewRef.current = new EditorView({ state, parent: editorRef.current });
    return () => viewRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== input) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: input },
      });
    }
  }, [input]);

  /* =========================
     PDF Export
  ========================= */
  const exportPDF = async () => {
    if (!parsed.data || parsed.errors.length > 0) {
      show('error', 'Fix YAML errors before exporting');
      return;
    }
    const loadingId = show('loading', 'Generating PDF…');
    try {
      const preview = document.getElementById('pitch-preview');
      if (!preview) throw new Error('#pitch-preview not found');

      const styleSheets = Array.from(document.styleSheets)
        .map((sheet) => {
          try {
            return Array.from(sheet.cssRules)
              .map((rule) => rule.cssText)
              .join('\n');
          } catch {
            return '';
          }
        })
        .join('\n');

      const styleTag = document.createElement('style');
      styleTag.textContent = styleSheets;

      const exportContainer = preview.cloneNode(true) as HTMLElement;
      exportContainer.style.position = 'fixed';
      exportContainer.style.top = '-9999px';
      exportContainer.style.left = '-9999px';
      exportContainer.style.width = '100%';
      exportContainer.style.height = '100%';
      exportContainer.prepend(styleTag);
      document.body.appendChild(exportContainer);

      inlineTailwindStyles(exportContainer);

      const originalHtmlBg = getComputedStyle(
        document.documentElement
      ).backgroundColor;
      const originalBodyBg = getComputedStyle(document.body).backgroundColor;

      document.documentElement.style.backgroundColor = originalHtmlBg.includes(
        'lab('
      )
        ? labToHex(originalHtmlBg)
        : originalHtmlBg;
      document.body.style.backgroundColor = originalBodyBg.includes('lab(')
        ? labToHex(originalBodyBg)
        : originalBodyBg;

      const restoreColors = applyExportSafeColors(exportContainer);

      const slideElements = Array.from(
        exportContainer.querySelectorAll<HTMLElement>('.aspect-video')
      );
      if (slideElements.length === 0) throw new Error('No slides found');

      const pdfDoc = await PDFDocument.create();

      for (let i = 0; i < slideElements.length; i++) {
        const canvas = await html2canvas(slideElements[i], {
          scale: 2,
          useCORS: true,
          backgroundColor: null,
          width: 1280,
          height: 720,
          windowWidth: 1280,
          windowHeight: 720,
        });

        const pngData = canvas.toDataURL('image/png');
        const pngBytes = await fetch(pngData).then((r) => r.arrayBuffer());
        const pngImage = await pdfDoc.embedPng(new Uint8Array(pngBytes));

        const page =
          i === 0 ? pdfDoc.addPage([1280, 720]) : pdfDoc.addPage([1280, 720]);
        page.drawImage(pngImage, { x: 0, y: 0, width: 1280, height: 720 });
      }

      restoreColors();
      document.body.removeChild(exportContainer);

      const pdfBytes = await pdfDoc.save();
      saveAs(
        new Blob([pdfBytes as BlobPart], { type: 'application/pdf' }),
        `${parsed.data.title?.product ?? 'pitch-deck'}.pdf`
      );

      show('success', 'PDF exported successfully');
    } catch {
      show('error', 'PDF export failed');
    } finally {
      dismiss(loadingId);
    }
  };

  /* =========================
     Share Link
  ========================= */
  const shareURL = () => {
    const encoded = encodeURIComponent(input);
    if (encoded.length > 4000) {
      show('error', 'Shareable link is too long to copy (max 4000 chars)');
      return;
    }
    const url = `${location.origin}${location.pathname}?yaml=${encoded}`;
    navigator.clipboard.writeText(url);
    show('success', 'Shareable link copied');
  };

  const isNotExportable = !parsed.data || parsed.errors.length > 0;
  const isSharable = encodeURIComponent(input).length <= 4000;

  /* =========================
     UI
  ========================= */
  return (
    <ModalWrapper
      onClose={onClose}
      title="Pitch Deck Slides"
      size="max-w-6xl"
      fullHeight>
      <Toast toasts={toasts} onDismiss={dismiss} />
      <div className="divide-base-300 flex min-h-0 flex-1 divide-x overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col items-center gap-2 p-2">
          <div
            className="tooltip tooltip-right"
            data-tip={showInput ? 'Hide Editor' : 'Show Editor'}>
            <button
              className={`btn btn-xs rounded ${showInput ? 'btn-accent' : 'bg-base-300'}`}
              onClick={() => setShowInput((v) => !v)}>
              📝
            </button>
          </div>
          <div className="tooltip tooltip-right" data-tip="Export PDF">
            <button
              className="btn btn-xs btn-primary rounded"
              disabled={isNotExportable}
              onClick={exportPDF}>
              📄
            </button>
          </div>
          <div className="tooltip tooltip-right" data-tip="Copy Shareable Link">
            <button
              className="btn btn-xs btn-secondary rounded"
              disabled={!isSharable}
              onClick={shareURL}>
              🔗
            </button>
          </div>
        </div>

        {/* YAML Editor */}
        {showInput && (
          <div className="flex min-w-0 flex-1 overflow-hidden">
            <div className="bg-base-100 border-base-300 h-full w-full overflow-auto border-r">
              <div
                ref={editorRef}
                className="h-full w-full flex-1 overflow-auto text-sm"
              />
            </div>
          </div>
        )}

        {/* Preview */}
        <div
          className={`flex min-w-0 flex-1 flex-col overflow-hidden ${showInput ? '' : 'flex-1'}`}>
          <div className="flex h-full flex-col overflow-auto p-4">
            {!parsed.data && parsed.errors.length > 0 && (
              <div className="alert alert-error mb-4">Invalid YAML</div>
            )}

            {parsed && (
              <>
                {parsed.errors.length > 0 && (
                  <div className="alert alert-error mb-4">
                    <ul className="list-disc space-y-1 pl-4 text-sm">
                      {parsed.errors.map((e, i) => (
                        <li key={i}>
                          <strong>{e.path || 'YAML'}:</strong> {e.message}
                          {e.hint && (
                            <span className="opacity-70"> — {e.hint}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="tabs tabs-box mb-4 w-full">
                  <button
                    className={`tab w-1/2 rounded ${tab === 'pitch' ? 'tab-active' : ''}`}
                    onClick={() => setTab('pitch')}>
                    Pitch Deck
                  </button>
                  <button
                    className={`tab w-1/2 rounded ${tab === 'landing' ? 'tab-active' : ''}`}
                    onClick={() => setTab('landing')}>
                    Landing Page
                  </button>
                </div>

                {tab === 'pitch' && (
                  <div id="pitch-preview" className="flex flex-col gap-8">
                    {slides.map((slide, i) => (
                      <SlidePreviewComponent
                        key={slide.kicker ?? i}
                        index={i}
                        slide={slide}
                      />
                    ))}
                  </div>
                )}

                {tab === 'landing' && parsed.data && (
                  <div className="border-primary-content overflow-hidden rounded border shadow-2xl">
                    <LandingComponent data={parsed.data} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

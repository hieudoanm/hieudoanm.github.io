import { createSignal } from 'solid-js';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  badgeColor?: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Ergonomic Chair',
    category: 'Furniture',
    price: 349,
    originalPrice: 429,
    rating: 4.5,
    reviewCount: 128,
    badge: 'Sale',
    badgeColor: 'badge-error',
  },
  {
    id: '2',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 159,
    rating: 4.8,
    reviewCount: 94,
    badge: 'Best seller',
    badgeColor: 'badge-warning',
  },
  {
    id: '3',
    name: 'Studio Headphones',
    category: 'Audio',
    price: 89,
    rating: 4.3,
    reviewCount: 215,
    badge: 'New',
    badgeColor: 'badge-info',
  },
  {
    id: '4',
    name: 'Minimal Desk Lamp',
    category: 'Furniture',
    price: 59,
    rating: 4.6,
    reviewCount: 73,
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 79,
    rating: 4.4,
    reviewCount: 186,
  },
  {
    id: '6',
    name: 'Canvas Backpack',
    category: 'Accessories',
    price: 129,
    originalPrice: 159,
    rating: 4.7,
    reviewCount: 52,
    badge: 'Sale',
    badgeColor: 'badge-error',
  },
  {
    id: '7',
    name: 'Ceramic Mug Set',
    category: 'Accessories',
    price: 34,
    rating: 4.2,
    reviewCount: 309,
    badge: 'Eco',
    badgeColor: 'badge-success',
  },
  {
    id: '8',
    name: 'Laptop Stand',
    category: 'Furniture',
    price: 69,
    rating: 4.1,
    reviewCount: 98,
  },
  {
    id: '9',
    name: 'USB-C Hub',
    category: 'Electronics',
    price: 45,
    rating: 4.0,
    reviewCount: 144,
  },
  {
    id: '10',
    name: 'Desk Mat',
    category: 'Accessories',
    price: 39,
    rating: 4.9,
    reviewCount: 67,
    badge: 'Premium',
    badgeColor: 'badge-neutral',
  },
  {
    id: '11',
    name: 'Portable Speaker',
    category: 'Audio',
    price: 119,
    originalPrice: 149,
    rating: 4.6,
    reviewCount: 231,
    badge: 'Sale',
    badgeColor: 'badge-error',
  },
  {
    id: '12',
    name: 'LED Monitor 27"',
    category: 'Electronics',
    price: 449,
    rating: 4.7,
    reviewCount: 412,
    badge: 'Popular',
    badgeColor: 'badge-primary',
  },
];

const categories = ['All', 'Furniture', 'Electronics', 'Audio', 'Accessories'];

const StarRating = (props: { rating: number }) => (
  <span class="text-warning text-xs">
    {'★'.repeat(Math.floor(props.rating))}
    {'☆'.repeat(5 - Math.floor(props.rating))}
  </span>
);

const Nav = (props: { cartCount: number }) => (
  <div class="navbar bg-base-100/85 border-base-300 sticky top-0 z-50 min-h-[60px] border-b px-4 backdrop-blur-xl lg:px-12">
    <div class="navbar-start">
      <a
        href="/store"
        class="text-primary font-serif text-2xl font-bold tracking-widest">
        Forma
      </a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal text-base-content/60 gap-2 px-1 text-sm">
        <li>
          <a href="#products" class="hover:text-base-content">
            Products
          </a>
        </li>
        <li>
          <a href="#categories" class="hover:text-base-content">
            Categories
          </a>
        </li>
        <li>
          <a href="#deals" class="hover:text-base-content">
            Deals
          </a>
        </li>
        <li>
          <a href="#newsletter" class="hover:text-base-content">
            Newsletter
          </a>
        </li>
      </ul>
    </div>
    <div class="navbar-end gap-2">
      <button class="btn btn-ghost btn-sm">
        <span class="text-lg">🔍</span>
      </button>
      <button class="btn btn-ghost btn-sm relative">
        <span class="text-lg">🛒</span>
        {props.cartCount > 0 && (
          <span class="badge badge-error badge-xs absolute -top-1 -right-1 h-4 min-w-4 p-0 text-[10px]">
            {props.cartCount}
          </span>
        )}
      </button>
      <button class="btn btn-primary btn-sm">Sign in</button>
    </div>
  </div>
);

const HeroBanner = () => (
  <section class="relative mx-auto max-w-5xl px-4 py-24 text-center lg:px-12">
    <div class="bg-primary/5 pointer-events-none absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-3xl" />
    <p class="text-primary mb-4 text-xs tracking-[0.2em] uppercase">
      Spring collection · Free shipping
    </p>
    <h1 class="mb-6 font-serif text-5xl leading-[1.05] font-black tracking-tight lg:text-7xl">
      Workspace essentials
      <br />
      <span class="text-primary">curated for you</span>
    </h1>
    <p class="text-base-content/60 mx-auto mb-10 max-w-xl text-base leading-relaxed lg:text-lg">
      Thoughtfully designed tools and accessories for your everyday workflow.
      From ergonomic furniture to premium audio.
    </p>
    <div class="flex flex-wrap justify-center gap-3">
      <a href="#products" class="btn btn-primary">
        Shop now
      </a>
      <a href="#deals" class="btn btn-ghost">
        View deals →
      </a>
    </div>
  </section>
);

const ProductCard = (props: { product: Product }) => (
  <a
    href={`/store/${props.product.id}`}
    class="card bg-base-200 border-base-300 hover:border-primary/40 group border transition-all">
    <figure class="bg-base-300 flex h-48 items-center justify-center">
      <span class="text-base-content/20 text-5xl">◻</span>
    </figure>
    <div class="card-body p-5">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0 flex-1">
          <p class="text-base-content/40 text-xs">{props.product.category}</p>
          <h3 class="card-title mt-0.5 text-sm font-medium">
            {props.product.name}
          </h3>
        </div>
        {props.product.badge && (
          <span class={`badge ${props.product.badgeColor} badge-sm shrink-0`}>
            {props.product.badge}
          </span>
        )}
      </div>
      <div class="mt-2 flex items-center gap-2">
        <StarRating rating={props.product.rating} />
        <span class="text-base-content/40 text-xs">
          ({props.product.reviewCount})
        </span>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <span class="text-lg font-bold">${props.product.price}</span>
        {props.product.originalPrice && (
          <span class="text-base-content/30 text-sm line-through">
            ${props.product.originalPrice}
          </span>
        )}
      </div>
    </div>
  </a>
);

const ProductGrid = (props: { filter: string }) => {
  const filtered =
    props.filter === 'All'
      ? products
      : products.filter((p) => p.category === props.filter);
  return (
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filtered.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

const NewsletterSection = () => (
  <section
    id="newsletter"
    class="mx-auto max-w-5xl px-4 py-24 text-center lg:px-12">
    <div class="card bg-base-200 border-base-300 border">
      <div class="card-body items-center py-16">
        <h2 class="mb-4 font-serif text-3xl leading-snug font-bold lg:text-4xl">
          Stay in the loop
        </h2>
        <p class="text-base-content/60 mb-8 max-w-md text-base leading-relaxed">
          Get early access to new products, exclusive deals, and workspace
          inspiration.
        </p>
        <div class="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="jane@forma.io"
            class="input input-bordered flex-1"
          />
          <button class="btn btn-primary">Subscribe</button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer class="border-base-300 border-t py-12 text-center">
    <p class="text-primary mb-3 font-serif text-3xl">Forma</p>
    <p class="text-base-content/30 text-sm">
      © 2026 Forma Store · Built with care
    </p>
  </footer>
);

export const StoreFrontTemplate = (props: { cartCount?: number }) => {
  const [activeCategory, setActiveCategory] = createSignal('All');

  return (
    <div
      class="bg-base-100 text-base-content min-h-screen font-sans"
      data-theme="luxury">
      <Nav cartCount={props.cartCount ?? 2} />
      <HeroBanner />
      <div class="border-base-300 mx-4 border-t lg:mx-12" />
      <section id="products" class="mx-auto max-w-5xl px-4 py-24 lg:px-12">
        <p class="text-primary mb-3 text-xs font-medium tracking-[0.14em] uppercase">
          Products
        </p>
        <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 class="font-serif text-3xl leading-snug font-bold lg:text-4xl">
            Browse all
          </h2>
          <div class="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                onClick={() => setActiveCategory(cat)}
                class={`btn btn-sm ${activeCategory() === cat ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <ProductGrid filter={activeCategory()} />
      </section>
      <div class="border-base-300 mx-4 border-t lg:mx-12" />
      <section id="deals" class="mx-auto max-w-5xl px-4 py-24 lg:px-12">
        <p class="text-primary mb-3 text-xs font-medium tracking-[0.14em] uppercase">
          Deals
        </p>
        <h2 class="mb-8 font-serif text-3xl leading-snug font-bold lg:text-4xl">
          On sale now
        </h2>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((p) => p.originalPrice)
            .map((product) => (
              <ProductCard product={product} />
            ))}
        </div>
      </section>
      <div class="border-base-300 mx-4 border-t lg:mx-12" />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

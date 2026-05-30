import Link from 'next/link';
import { FC, useState } from 'react';

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

const StarRating: FC<{ rating: number }> = ({ rating }) => (
  <span className="text-warning text-xs">
    {'★'.repeat(Math.floor(rating))}
    {'☆'.repeat(5 - Math.floor(rating))}
  </span>
);

const Nav: FC<{ cartCount: number }> = ({ cartCount }) => (
  <div className="navbar bg-base-100/85 border-base-300 sticky top-0 z-50 min-h-[60px] border-b px-4 backdrop-blur-xl lg:px-12">
    <div className="navbar-start">
      <Link
        href="/store"
        className="text-primary font-serif text-2xl font-bold tracking-widest">
        Forma
      </Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal text-base-content/60 gap-2 px-1 text-sm">
        <li>
          <a href="#products" className="hover:text-base-content">
            Products
          </a>
        </li>
        <li>
          <a href="#categories" className="hover:text-base-content">
            Categories
          </a>
        </li>
        <li>
          <a href="#deals" className="hover:text-base-content">
            Deals
          </a>
        </li>
        <li>
          <a href="#newsletter" className="hover:text-base-content">
            Newsletter
          </a>
        </li>
      </ul>
    </div>
    <div className="navbar-end gap-2">
      <button className="btn btn-ghost btn-sm">
        <span className="text-lg">🔍</span>
      </button>
      <button className="btn btn-ghost btn-sm relative">
        <span className="text-lg">🛒</span>
        {cartCount > 0 && (
          <span className="badge badge-error badge-xs absolute -top-1 -right-1 h-4 min-w-4 p-0 text-[10px]">
            {cartCount}
          </span>
        )}
      </button>
      <button className="btn btn-primary btn-sm">Sign in</button>
    </div>
  </div>
);

const HeroBanner: FC = () => (
  <section className="relative mx-auto max-w-5xl px-4 py-24 text-center lg:px-12">
    <div className="bg-primary/5 pointer-events-none absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-3xl" />
    <p className="text-primary mb-4 text-xs tracking-[0.2em] uppercase">
      Spring collection · Free shipping
    </p>
    <h1 className="mb-6 font-serif text-5xl leading-[1.05] font-black tracking-tight lg:text-7xl">
      Workspace essentials
      <br />
      <span className="text-primary">curated for you</span>
    </h1>
    <p className="text-base-content/60 mx-auto mb-10 max-w-xl text-base leading-relaxed lg:text-lg">
      Thoughtfully designed tools and accessories for your everyday workflow.
      From ergonomic furniture to premium audio.
    </p>
    <div className="flex flex-wrap justify-center gap-3">
      <a href="#products" className="btn btn-primary">
        Shop now
      </a>
      <a href="#deals" className="btn btn-ghost">
        View deals →
      </a>
    </div>
  </section>
);

const ProductCard: FC<{ product: Product }> = ({ product }) => (
  <Link
    href={`/store/${product.id}`}
    className="card bg-base-200 border-base-300 hover:border-primary/40 group border transition-all">
    <figure className="bg-base-300 flex h-48 items-center justify-center">
      <span className="text-base-content/20 text-5xl">◻</span>
    </figure>
    <div className="card-body p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-base-content/40 text-xs">{product.category}</p>
          <h3 className="card-title mt-0.5 text-sm font-medium">
            {product.name}
          </h3>
        </div>
        {product.badge && (
          <span className={`badge ${product.badgeColor} badge-sm shrink-0`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <StarRating rating={product.rating} />
        <span className="text-base-content/40 text-xs">
          ({product.reviewCount})
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-lg font-bold">${product.price}</span>
        {product.originalPrice && (
          <span className="text-base-content/30 text-sm line-through">
            ${product.originalPrice}
          </span>
        )}
      </div>
    </div>
  </Link>
);

const ProductGrid: FC<{ filter: string }> = ({ filter }) => {
  const filtered =
    filter === 'All' ? products : products.filter((p) => p.category === filter);
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const NewsletterSection: FC = () => (
  <section
    id="newsletter"
    className="mx-auto max-w-5xl px-4 py-24 text-center lg:px-12">
    <div className="card bg-base-200 border-base-300 border">
      <div className="card-body items-center py-16">
        <h2 className="mb-4 font-serif text-3xl leading-snug font-bold lg:text-4xl">
          Stay in the loop
        </h2>
        <p className="text-base-content/60 mb-8 max-w-md text-base leading-relaxed">
          Get early access to new products, exclusive deals, and workspace
          inspiration.
        </p>
        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="jane@forma.io"
            className="input input-bordered flex-1"
          />
          <button className="btn btn-primary">Subscribe</button>
        </div>
      </div>
    </div>
  </section>
);

const Footer: FC = () => (
  <footer className="border-base-300 border-t py-12 text-center">
    <p className="text-primary mb-3 font-serif text-3xl">Forma</p>
    <p className="text-base-content/30 text-sm">
      © 2026 Forma Store · Built with care
    </p>
  </footer>
);

export const StoreFrontTemplate: FC<{ cartCount?: number }> = ({
  cartCount = 2,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div
      className="bg-base-100 text-base-content min-h-screen font-sans"
      data-theme="luxury">
      <Nav cartCount={cartCount} />
      <HeroBanner />
      <div className="border-base-300 mx-4 border-t lg:mx-12" />
      <section id="products" className="mx-auto max-w-5xl px-4 py-24 lg:px-12">
        <p className="text-primary mb-3 text-xs font-medium tracking-[0.14em] uppercase">
          Products
        </p>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-serif text-3xl leading-snug font-bold lg:text-4xl">
            Browse all
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <ProductGrid filter={activeCategory} />
      </section>
      <div className="border-base-300 mx-4 border-t lg:mx-12" />
      <section id="deals" className="mx-auto max-w-5xl px-4 py-24 lg:px-12">
        <p className="text-primary mb-3 text-xs font-medium tracking-[0.14em] uppercase">
          Deals
        </p>
        <h2 className="mb-8 font-serif text-3xl leading-snug font-bold lg:text-4xl">
          On sale now
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((p) => p.originalPrice)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
      <div className="border-base-300 mx-4 border-t lg:mx-12" />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

StoreFrontTemplate.displayName = 'StoreFrontTemplate';

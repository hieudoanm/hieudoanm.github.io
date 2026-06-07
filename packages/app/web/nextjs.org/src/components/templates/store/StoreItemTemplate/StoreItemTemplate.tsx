import Link from 'next/link';
import { FC, useState } from 'react';

interface Review {
  author: string;
  initials: string;
  avatarColor: string;
  rating: number;
  date: string;
  body: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
}

const product: Product = {
  id: '2',
  name: 'Mechanical Keyboard',
  category: 'Electronics',
  price: 159,
  rating: 4.8,
  reviewCount: 94,
};

const reviews: Review[] = [
  {
    author: 'Alex Rivera',
    initials: 'AR',
    avatarColor: 'bg-primary/20 text-primary',
    rating: 5,
    date: '2 weeks ago',
    body: 'Best keyboard I have ever used. The switches are incredibly smooth and the build quality is outstanding. The RGB lighting is also a nice touch.',
  },
  {
    author: 'Jordan Lee',
    initials: 'JL',
    avatarColor: 'bg-success/20 text-success',
    rating: 5,
    date: '1 month ago',
    body: 'Great for both work and gaming. The hot-swappable switches make it easy to customize. Highly recommend the tactile variant.',
  },
  {
    author: 'Morgan Patel',
    initials: 'MP',
    avatarColor: 'bg-info/20 text-info',
    rating: 4,
    date: '2 months ago',
    body: 'Solid keyboard with a premium feel. Only giving 4 stars because I wish it came with USB-C instead of mini-USB. Otherwise fantastic.',
  },
  {
    author: 'Sam Thompson',
    initials: 'ST',
    avatarColor: 'bg-error/20 text-error',
    rating: 5,
    date: '3 months ago',
    body: 'Upgraded from a membrane keyboard and the difference is night and day. Typing feels effortless now. The software for key remapping is intuitive.',
  },
];

const relatedProducts: Product[] = [
  {
    id: '1',
    name: 'Ergonomic Chair',
    category: 'Furniture',
    price: 349,
    originalPrice: 429,
    rating: 4.5,
    reviewCount: 128,
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
  },
];

const StarRating: FC<{ rating: number; size?: 'sm' | 'md' }> = ({
  rating,
  size = 'sm',
}) => (
  <span className={`text-warning ${size === 'md' ? 'text-base' : 'text-xs'}`}>
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
        DaisyX
      </Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal text-base-content/60 gap-2 px-1 text-sm">
        <li>
          <a href="/store" className="hover:text-base-content">
            Store
          </a>
        </li>
      </ul>
    </div>
    <div className="navbar-end gap-2">
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

const ReviewCard: FC<{ review: Review }> = ({ review }) => (
  <div className="border-base-300 border-b pb-6 last:border-b-0">
    <div className="mb-3 flex items-center gap-3">
      <div className={`avatar placeholder`}>
        <div className={`w-9 rounded-full ${review.avatarColor}`}>
          <span className="text-xs font-medium">{review.initials}</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">{review.author}</p>
        <div className="flex items-center gap-2">
          <StarRating rating={review.rating} />
          <span className="text-base-content/30 text-xs">{review.date}</span>
        </div>
      </div>
    </div>
    <p className="text-base-content/60 text-sm leading-relaxed">
      {review.body}
    </p>
  </div>
);

const Footer: FC = () => (
  <footer className="border-base-300 border-t py-12 text-center">
    <p className="text-primary mb-3 font-serif text-3xl">DaisyX</p>
    <p className="text-base-content/30 text-sm">
      © 2026 DaisyX Store · Built with care
    </p>
  </footer>
);

export const StoreItemTemplate: FC<{
  cartCount?: number;
  quantity?: number;
  onQuantityChange?: (qty: number) => void;
  onAddToCart?: () => void;
}> = ({
  cartCount = 2,
  quantity: controlledQuantity,
  onQuantityChange,
  onAddToCart,
}) => {
  const [localQuantity, setLocalQuantity] = useState(1);
  const quantity = controlledQuantity ?? localQuantity;
  const setQuantity = onQuantityChange ?? setLocalQuantity;

  return (
    <div
      className="bg-base-100 text-base-content min-h-screen font-sans"
      data-theme="luxury">
      <Nav cartCount={cartCount} />

      <main className="mx-auto max-w-5xl px-4 py-10 lg:px-12 lg:py-14">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-base-content/50 mb-8 text-sm">
          <ul>
            <li>
              <Link href="/store" className="hover:text-primary">
                Store
              </Link>
            </li>
            <li>
              <Link href="/store" className="hover:text-primary">
                Products
              </Link>
            </li>
            <li className="text-base-content">{product.name}</li>
          </ul>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="bg-base-200 border-base-300 flex h-80 items-center justify-center rounded-2xl border lg:h-96">
            <span className="text-base-content/20 text-7xl">◻</span>
          </div>

          {/* Info */}
          <div>
            <p className="text-base-content/40 mb-2 text-xs tracking-wider uppercase">
              {product.category}
            </p>
            <h1 className="mb-3 font-serif text-3xl leading-snug font-bold lg:text-4xl">
              {product.name}
            </h1>

            <div className="mb-4 flex items-center gap-3">
              <StarRating rating={product.rating} size="md" />
              <span className="text-base-content/40 text-sm">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <span className="text-3xl font-bold">${product.price}</span>
            </div>

            <p className="text-base-content/60 mb-8 text-sm leading-relaxed">
              Precision-engineered for peak productivity. Features hot-swappable
              mechanical switches, per-key RGB backlighting, and a compact
              tenkeyless layout. The aircraft-grade aluminum frame ensures
              durability while the USB-C connection delivers reliable
              performance.
            </p>

            {/* Variant selector */}
            <div className="mb-5">
              <p className="text-base-content/50 mb-2 text-xs font-medium tracking-wider uppercase">
                Switch type
              </p>
              <div className="flex flex-wrap gap-2">
                {['Tactile', 'Linear', 'Clicky'].map((type) => (
                  <button
                    key={type}
                    className={`btn btn-sm ${type === 'Tactile' ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="mb-5 flex items-center gap-4">
              <div className="join">
                <button
                  className="join-item btn btn-sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}>
                  −
                </button>
                <span className="join-item flex min-w-[3rem] items-center justify-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  className="join-item btn btn-sm"
                  onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            <button
              className="btn btn-primary w-full lg:w-auto lg:px-12"
              onClick={onAddToCart}>
              Add to cart — ${product.price * quantity}
            </button>
          </div>
        </div>

        {/* Reviews */}
        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-bold">
            Customer reviews
          </h2>
          <div className="card bg-base-200 border-base-300 border">
            <div className="card-body p-6 lg:p-8">
              {reviews.map((review) => (
                <ReviewCard key={review.author} review={review} />
              ))}
            </div>
          </div>
        </section>

        {/* Related products */}
        <section>
          <h2 className="mb-6 font-serif text-2xl font-bold">
            You might also like
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((rp) => (
              <Link
                key={rp.id}
                href={`/store/${rp.id}`}
                className="card bg-base-200 border-base-300 hover:border-primary/40 group border transition-all">
                <figure className="bg-base-300 flex h-32 items-center justify-center">
                  <span className="text-base-content/20 text-3xl">◻</span>
                </figure>
                <div className="card-body p-4">
                  <p className="text-base-content/40 text-xs">{rp.category}</p>
                  <h3 className="card-title text-sm font-medium">{rp.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating rating={rp.rating} />
                    <span className="text-base-content/40 text-xs">
                      ({rp.reviewCount})
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-base font-bold">${rp.price}</span>
                    {rp.originalPrice && (
                      <span className="text-base-content/30 text-sm line-through">
                        ${rp.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

StoreItemTemplate.displayName = 'StoreItemTemplate';

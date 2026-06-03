import { createSignal } from 'solid-js';

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

const StarRating = (props: { rating: number; size?: 'sm' | 'md' }) => (
  <span
    class={`text-warning ${(props.size || 'sm') === 'md' ? 'text-base' : 'text-xs'}`}>
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
          <a href="/store" class="hover:text-base-content">
            Store
          </a>
        </li>
      </ul>
    </div>
    <div class="navbar-end gap-2">
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

const ReviewCard = (props: { review: Review }) => (
  <div class="border-base-300 border-b pb-6 last:border-b-0">
    <div class="mb-3 flex items-center gap-3">
      <div class="avatar placeholder">
        <div class={`w-9 rounded-full ${props.review.avatarColor}`}>
          <span class="text-xs font-medium">{props.review.initials}</span>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium">{props.review.author}</p>
        <div class="flex items-center gap-2">
          <StarRating rating={props.review.rating} />
          <span class="text-base-content/30 text-xs">{props.review.date}</span>
        </div>
      </div>
    </div>
    <p class="text-base-content/60 text-sm leading-relaxed">
      {props.review.body}
    </p>
  </div>
);

const Footer = () => (
  <footer class="border-base-300 border-t py-12 text-center">
    <p class="text-primary mb-3 font-serif text-3xl">Forma</p>
    <p class="text-base-content/30 text-sm">
      © 2026 Forma Store · Built with care
    </p>
  </footer>
);

export const StoreItemTemplate = (props: {
  cartCount?: number;
  quantity?: number;
  onQuantityChange?: (qty: number) => void;
  onAddToCart?: () => void;
}) => {
  const [localQuantity, setLocalQuantity] = createSignal(1);
  const quantity = () => props.quantity ?? localQuantity();
  const setQuantity = props.onQuantityChange ?? setLocalQuantity;

  return (
    <div
      class="bg-base-100 text-base-content min-h-screen font-sans"
      data-theme="luxury">
      <Nav cartCount={props.cartCount ?? 2} />

      <main class="mx-auto max-w-5xl px-4 py-10 lg:px-12 lg:py-14">
        {/* Breadcrumb */}
        <div class="breadcrumbs text-base-content/50 mb-8 text-sm">
          <ul>
            <li>
              <a href="/store" class="hover:text-primary">
                Store
              </a>
            </li>
            <li>
              <a href="/store" class="hover:text-primary">
                Products
              </a>
            </li>
            <li class="text-base-content">{product.name}</li>
          </ul>
        </div>

        <div class="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Image */}
          <div class="bg-base-200 border-base-300 flex h-80 items-center justify-center rounded-2xl border lg:h-96">
            <span class="text-base-content/20 text-7xl">◻</span>
          </div>

          {/* Info */}
          <div>
            <p class="text-base-content/40 mb-2 text-xs tracking-wider uppercase">
              {product.category}
            </p>
            <h1 class="mb-3 font-serif text-3xl leading-snug font-bold lg:text-4xl">
              {product.name}
            </h1>

            <div class="mb-4 flex items-center gap-3">
              <StarRating rating={product.rating} size="md" />
              <span class="text-base-content/40 text-sm">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div class="mb-6 flex items-center gap-3">
              <span class="text-3xl font-bold">${product.price}</span>
            </div>

            <p class="text-base-content/60 mb-8 text-sm leading-relaxed">
              Precision-engineered for peak productivity. Features hot-swappable
              mechanical switches, per-key RGB backlighting, and a compact
              tenkeyless layout. The aircraft-grade aluminum frame ensures
              durability while the USB-C connection delivers reliable
              performance.
            </p>

            {/* Variant selector */}
            <div class="mb-5">
              <p class="text-base-content/50 mb-2 text-xs font-medium tracking-wider uppercase">
                Switch type
              </p>
              <div class="flex flex-wrap gap-2">
                {['Tactile', 'Linear', 'Clicky'].map((type) => (
                  <button
                    class={`btn btn-sm ${type === 'Tactile' ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div class="mb-5 flex items-center gap-4">
              <div class="join">
                <button
                  class="join-item btn btn-sm"
                  onClick={() => setQuantity(Math.max(1, quantity() - 1))}
                  disabled={quantity() <= 1}>
                  −
                </button>
                <span class="join-item flex min-w-[3rem] items-center justify-center text-sm font-medium">
                  {quantity()}
                </span>
                <button
                  class="join-item btn btn-sm"
                  onClick={() => setQuantity(quantity() + 1)}>
                  +
                </button>
              </div>
            </div>

            <button
              class="btn btn-primary w-full lg:w-auto lg:px-12"
              onClick={props.onAddToCart}>
              Add to cart — ${product.price * quantity()}
            </button>
          </div>
        </div>

        {/* Reviews */}
        <section class="mb-16">
          <h2 class="mb-6 font-serif text-2xl font-bold">Customer reviews</h2>
          <div class="card bg-base-200 border-base-300 border">
            <div class="card-body p-6 lg:p-8">
              {reviews.map((review) => (
                <ReviewCard review={review} />
              ))}
            </div>
          </div>
        </section>

        {/* Related products */}
        <section>
          <h2 class="mb-6 font-serif text-2xl font-bold">
            You might also like
          </h2>
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((rp) => (
              <a
                href={`/store/${rp.id}`}
                class="card bg-base-200 border-base-300 hover:border-primary/40 group border transition-all">
                <figure class="bg-base-300 flex h-32 items-center justify-center">
                  <span class="text-base-content/20 text-3xl">◻</span>
                </figure>
                <div class="card-body p-4">
                  <p class="text-base-content/40 text-xs">{rp.category}</p>
                  <h3 class="card-title text-sm font-medium">{rp.name}</h3>
                  <div class="mt-1 flex items-center gap-2">
                    <StarRating rating={rp.rating} />
                    <span class="text-base-content/40 text-xs">
                      ({rp.reviewCount})
                    </span>
                  </div>
                  <div class="mt-2 flex items-center gap-2">
                    <span class="text-base font-bold">${rp.price}</span>
                    {rp.originalPrice && (
                      <span class="text-base-content/30 text-sm line-through">
                        ${rp.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

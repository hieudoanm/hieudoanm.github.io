import { FC } from 'react';

export const PricingCard: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 border shadow-sm">
    <div className="card-body">
      <div className="tabs tabs-box bg-base-300 inline-flex flex-nowrap self-center">
        <input
          type="radio"
          name="pricing"
          className="tab"
          aria-label="Monthly"
        />
        <input
          type="radio"
          name="pricing"
          className="tab"
          aria-label="Yearly"
          defaultChecked
        />
      </div>
      <div className="indicator">
        <span className="indicator-item badge badge-warning badge-xs">
          SALE
        </span>
        <h3 className="text-xl font-bold">Starter Plan</h3>
      </div>
      <div className="my-2 text-4xl font-bold">
        $200
        <span className="text-base-content/50 text-sm font-normal">/month</span>
      </div>
      <ul className="my-4 flex flex-col gap-2 text-sm">
        <li>✓ 20 Tokens per day</li>
        <li>✓ 10 Projects</li>
        <li>✓ API Access</li>
        <li className="text-base-content/40">✕ Priority Support</li>
      </ul>
      <button className="btn btn-accent w-full">Buy Now</button>
    </div>
  </div>
);

PricingCard.displayName = 'PricingCard';

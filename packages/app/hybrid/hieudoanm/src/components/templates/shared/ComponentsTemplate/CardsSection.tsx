import { FC } from 'react';
import { Section } from './Section';

export const CardsSection: FC = () => {
  return (
    <Section
      id="cards"
      label="Cards & stats"
      title="Surface what matters"
      sub="Cards, stats, and pricing tiles — structured surfaces that organize information at a glance.">
      <div className="mb-10 grid grid-cols-3 gap-5">
        <div className="card bg-base-200 border-base-300 border">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
              className="h-48 w-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Nike Shoes</h2>
            <p className="text-base-content/50 text-sm leading-relaxed">
              Premium sneakers with breathable mesh and responsive cushioning.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-200 border-base-300 border">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Starter</h2>
            <p className="font-serif text-4xl font-bold">$29</p>
            <p className="text-base-content/60 text-sm">/month</p>
            <ul className="text-base-content/50 text-left text-sm">
              <li className="before:text-primary before:content-['✓_']">
                10 projects
              </li>
              <li className="before:text-primary before:content-['✓_']">
                5GB storage
              </li>
              <li className="before:text-primary before:content-['✓_']">
                Email support
              </li>
            </ul>
            <div className="card-actions">
              <button className="btn btn-primary btn-sm btn-block">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-base-200 border-base-300 border">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Avatar"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Jane Doe</h3>
                <p className="text-base-content/60 text-sm">Product Designer</p>
              </div>
            </div>
            <p className="text-base-content/50 mt-3 text-sm leading-relaxed">
              &ldquo;This tool transformed our workflow. Highly
              recommended!&rdquo;
            </p>
          </div>
        </div>
      </div>
      <div className="stats stats-vertical lg:stats-horizontal w-full shadow">
        <div className="stat">
          <div className="stat-title">Revenue</div>
          <div className="stat-value">$12,450</div>
          <div className="stat-desc">↑ 15% from last month</div>
        </div>
        <div className="stat">
          <div className="stat-title">Users</div>
          <div className="stat-value">2,340</div>
          <div className="stat-desc">↗︎ 120 new this week</div>
        </div>
        <div className="stat">
          <div className="stat-title">Page Score</div>
          <div className="stat-value">91</div>
          <div className="stat-desc">↘︎ 2 points behind target</div>
        </div>
      </div>
    </Section>
  );
};
CardsSection.displayName = 'CardsSection';

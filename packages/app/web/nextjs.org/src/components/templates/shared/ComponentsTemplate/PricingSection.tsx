import { Section } from './Section';

export const PricingSection = () => {
  const plans = [
    {
      tier: 'Starter',
      price: 'Free',
      period: 'forever',
      features: ['47 base components', 'Community support', 'MIT license'],
      cta: 'Get started',
      featured: false,
      primary: false,
    },
    {
      tier: 'Pro',
      price: '$29',
      period: 'per seat / month',
      features: [
        'Everything in Starter',
        'Figma kit included',
        'Priority support',
        'Private Slack channel',
      ],
      cta: 'Start free trial',
      featured: true,
      primary: true,
    },
    {
      tier: 'Enterprise',
      price: 'Custom',
      period: 'talk to us',
      features: [
        'Everything in Pro',
        'White-label rights',
        'SLA & dedicated support',
        'Custom token generation',
      ],
      cta: 'Contact sales',
      featured: false,
      primary: false,
    },
  ];
  return (
    <Section
      id="pricing"
      label="Pricing"
      title="Simple, honest pricing"
      sub="No hidden fees. Cancel anytime. Every plan includes the full component library."
      center>
      <div className="grid grid-cols-3 gap-5">
        {plans.map(
          ({ tier, price, period, features, cta, featured, primary }) => (
            <div
              key={tier}
              className={`card border ${featured ? 'border-primary relative' : 'border-base-300'} bg-base-200`}>
              {featured && (
                <div className="bg-primary text-primary-content absolute -top-px right-5 rounded-b-lg px-3 py-1 text-[11px] font-semibold tracking-wider">
                  POPULAR
                </div>
              )}
              <div className="card-body p-8">
                <p className="text-base-content/40 mb-3 text-xs font-medium tracking-widest uppercase">
                  {tier}
                </p>
                <p
                  className={`mb-1 font-serif text-4xl font-bold ${featured ? 'text-primary' : ''}`}>
                  {price}
                </p>
                <p className="text-base-content/40 mb-7 text-sm">{period}</p>
                <ul className="text-base-content/50 mb-7 flex flex-col gap-2 text-sm">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="before:text-primary before:font-semibold before:content-['✓_']">
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn w-full ${primary ? 'btn-primary' : 'btn-ghost border-base-300'}`}>
                  {cta}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </Section>
  );
};

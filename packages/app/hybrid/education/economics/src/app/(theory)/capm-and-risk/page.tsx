'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const CAPMPage: NextPage = () => (
  <TheoryTemplate
    title="CAPM & Risk"
    subtitle="Putting a price on risk: how the expected return of an asset is determined."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            The <strong>Capital Asset Pricing Model (CAPM)</strong> describes
            the relationship between the risk of an asset and its expected
            return. Its core insight: investors are only rewarded for{' '}
            <strong>systematic risk</strong>—the market-wide risk that cannot be
            diversified away—not for the asset-specific risk that a diversified
            portfolio eliminates. Return is measured by the asset&rsquo;s{' '}
            <strong>beta</strong>.
          </p>
        ),
      },
      {
        title: 'The key concept: beta',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Systematic vs specific risk:</strong> Some risk moves with
              the whole market (recessions, rate changes); other risk is unique
              to one company (a bad product launch). Diversification washes out
              the specific risk, leaving only systematic risk.
            </p>
            <p>
              <strong>Beta:</strong> Measures an asset&rsquo;s sensitivity to
              the market. A beta of 1 moves with the market; above 1 is more
              volatile, below 1 is calmer. High-beta assets must offer higher
              expected returns.
            </p>
            <p>
              <strong>The SML:</strong> The Security Market Line plots expected
              return against beta—the pricing relationship at the heart of CAPM.
            </p>
          </div>
        ),
      },
      {
        title: 'The formula',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>
                Expected return = Risk-free rate + beta × (Market return −
                Risk-free rate).
              </strong>{' '}
              The first term rewards waiting; the second rewards bearing
              systematic risk.
            </p>
            <p>
              <strong>The risk premium:</strong> The gap between the
              market&rsquo;s expected return and the risk-free rate is the price
              of bearing market risk overall, scaled by each asset&rsquo;s beta.
            </p>
            <p>
              <strong>Risk-free proxy:</strong> Government bond yields are
              typically used as the risk-free rate, standing in for a return
              with no default risk.
            </p>
          </div>
        ),
      },
      {
        title: 'Uses and limits',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Cost of equity:</strong> Firms and investors use CAPM to
              estimate the required return on equity and to discount project
              cash flows.
            </p>
            <p>
              <strong>Simplicity tradeoff:</strong> CAPM reduces risk to a
              single number (beta); reality is richer, and models like the
              Fama-French factors add size and value as additional priced risks.
            </p>
            <p>
              <strong>Estimation challenges:</strong> Betas and the market risk
              premium are estimated from history and can be unstable, so
              CAPM&rsquo;s outputs are useful guides rather than precise prices.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Capital_asset_pricing_model',
        label: 'Wikipedia: Capital Asset Pricing Model',
        description:
          'Derivation and discussion of CAPM, beta, and the Security Market Line.',
      },
      {
        href: 'https://www.investopedia.com/terms/c/capm.asp',
        label: 'Investopedia: CAPM',
        description:
          'Entry defining CAPM, its formula, and its use in estimating cost of equity.',
      },
      {
        href: 'https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.1964.tb02865.x',
        label: 'Sharpe (1964): Capital Asset Prices',
        description:
          "William Sharpe's foundational paper establishing the capital asset pricing model.",
      },
    ]}
  />
);

export default CAPMPage;

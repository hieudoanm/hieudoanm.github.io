'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const MarketFailuresPage: NextPage = () => (
  <TheoryTemplate
    title="Market Failures"
    subtitle="The situations where free markets alone produce socially inefficient outcomes."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            A <strong>market failure</strong> occurs when the free market, left
            to itself, fails to allocate resources efficiently—producing too
            much of some things and too little of others relative to what
            society wants. It is the economic justification for government
            intervention. The main sources are <strong>externalities</strong>,{' '}
            <strong>public goods</strong>, <strong>market power</strong>, and{' '}
            <strong>imperfect information</strong>.
          </p>
        ),
      },
      {
        title: 'The main sources',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Externalities:</strong> Costs or benefits spill onto third
              parties, so private prices don&rsquo;t reflect social costs or
              benefits—pollution is overproduced, education underprovided (see
              Externalities).
            </p>
            <p>
              <strong>Public goods:</strong> Goods that are non-excludable and
              non-rivalrous, like defense, suffer free-riding and are
              under-provided by markets (see Public Goods Dilemma).
            </p>
            <p>
              <strong>Market power:</strong> Monopolies and oligopolies charge
              above competitive prices and restrict output, creating deadweight
              loss (see Monopoly &amp; Market Power).
            </p>
            <p>
              <strong>Imperfect information:</strong> When buyers and sellers
              can&rsquo;t know what they&rsquo;re getting, markets may collapse
              (see Adverse Selection) or over- or under-insure against risk (see
              Moral Hazard).
            </p>
          </div>
        ),
      },
      {
        title: 'When markets still fail',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Efficiency vs. the ideal:</strong> Even smooth markets can
              deliver outcomes that maximize surplus yet are unequal—a
              distribution that many judge unfair, prompting redistribution (see
              Economic Inequality).
            </p>
            <p>
              <strong>Merit goods:</strong> Society may want more of some goods
              (health, education) than individuals choose to buy, even without a
              textbook failure.
            </p>
            <p>
              <strong>Information problems at scale:</strong> Complex products
              and systemic risk make it hard for individuals to make fully
              informed choices.
            </p>
          </div>
        ),
      },
      {
        title: 'The remedy—and its limits',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Government responses:</strong> Taxes on negative
              externalities, subsidies for positive ones, provision of public
              goods, antitrust enforcement, and regulations that correct
              information problems.
            </p>
            <p>
              <strong>Not always the cure:</strong> Government itself can fail
              (see Public Choice), so intervention must be weighed against its
              own costs and distortions.
            </p>
            <p>
              <strong>The judgment call:</strong> Whether a market failure
              warrants intervention—and what form it should take—is a central
              and contested policy question.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/market-failures/policies',
        label: 'Market Failure Fixer',
        description:
          'Match the right policy to each market failure, then set a Pigouvian tax to restore optimal output.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Market_failure',
        label: 'Wikipedia: Market Failure',
        description:
          'Overview of market failure types including externalities, public goods, and market power.',
      },
      {
        href: 'https://www.investopedia.com/terms/m/marketfailure.asp',
        label: 'Investopedia: Market Failure',
        description:
          'Entry defining market failure and its causes and remedies.',
      },
      {
        href: 'https://www.britannica.com/topic/market-failure',
        label: 'Encyclopedia Britannica: Market Failure',
        description:
          'Encyclopedia entry on when free markets fail to allocate resources efficiently.',
      },
    ]}
  />
);

export default MarketFailuresPage;

'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const KeynesianPage: NextPage = () => (
  <TheoryTemplate
    title="Keynesian Economics"
    subtitle="Why economies can get stuck in recessions—and what governments can do about it."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Keynesian economics</strong>, from John Maynard
            Keynes&rsquo;s 1936 <em>General Theory</em>, argues that aggregate
            demand—total spending in the economy—is the dominant driver of
            output and employment in the short run. During recessions, spending
            can fall short, leaving the economy stuck below full employment.
            Because markets don&rsquo;t automatically snap back, Keynes
            advocated active government intervention to stabilize demand.
          </p>
        ),
      },
      {
        title: 'The core problem: demand',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Sluggish adjustment:</strong> Wages and prices are sticky
              in the short run, so they don&rsquo;t fall fast enough to clear
              markets. A drop in demand thus leads to unemployment, not just
              lower prices.
            </p>
            <p>
              <strong>Sticky wages:</strong> Workers resist nominal pay cuts, so
              firms respond to falling demand by laying people off, which cuts
              spending further—a downward spiral.
            </p>
            <p>
              <strong>The paradox of thrift:</strong> When everyone saves more
              in a downturn, aggregate demand falls and total income falls, so
              overall saving may not rise. Individually sensible, collectively
              harmful.
            </p>
          </div>
        ),
      },
      {
        title: 'The policy response',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Fiscal policy:</strong> Government spending and taxation
              can boost demand. If the private sector won&rsquo;t spend, the
              state can spend instead—through infrastructure, transfers, or tax
              cuts—to lift output back toward full employment.
            </p>
            <p>
              <strong>The multiplier:</strong> A dollar of government spending
              ripples through the economy—each recipient spends some of it
              again. The total boost to demand can be a multiple of the original
              spending.
            </p>
            <p>
              <strong>Monetary policy:</strong> Central banks can support demand
              by lowering interest rates, making borrowing cheaper and spending
              more attractive.
            </p>
            <p>
              <strong>Countercyclical stance:</strong> Governments should run
              deficits in recessions and surpluses in booms—spending against the
              grain of the business cycle.
            </p>
          </div>
        ),
      },
      {
        title: 'Debates and legacy',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Crowding out:</strong> Critics argue that government
              borrowing raises interest rates and displaces private investment,
              weakening the stimulus. Keynesians reply this matters less when
              the economy is far below capacity.
            </p>
            <p>
              <strong>Supply-side critique:</strong> Classical economists
              contend that expansionary policy mainly causes inflation and
              misallocation.
            </p>
            <p>
              <strong>The middle ground:</strong> Most modern macroeconomics
              blends Keynesian short-run demand management with supply-side
              realities—the neoclassical synthesis. Central banks now routinely
              manage demand as part of mainstream policy.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/keynesian-economics/cross',
        label: 'Keynesian Cross',
        description:
          'Set MPC and autonomous spending to find equilibrium output, then close an output gap with the right dose of government spending.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Keynesian_economics',
        label: 'Wikipedia: Keynesian Economics',
        description:
          'Comprehensive overview of Keynesian theory and its policy implications.',
      },
      {
        href: 'https://www.investopedia.com/terms/k/keynesianeconomics.asp',
        label: 'Investopedia: Keynesian Economics',
        description:
          'Entry defining aggregate demand, the multiplier, and countercyclical policy.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/1999/summary/',
        label: 'Nobel Prize: Robert Mundell 1999',
        description:
          'Nobel citation for work on monetary and fiscal policy in the Keynesian tradition.',
      },
    ]}
  />
);

export default KeynesianPage;

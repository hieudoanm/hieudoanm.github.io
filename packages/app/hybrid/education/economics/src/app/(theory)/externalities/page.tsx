'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const ExternalitiesPage: NextPage = () => (
  <TheoryTemplate
    title="Externalities"
    subtitle="When your actions affect strangers who never asked—for better or worse."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            An <strong>externality</strong> is a cost or benefit from a
            transaction that spills over to people who are not part of the deal.
            A <strong>negative externality</strong> (like pollution from a
            factory) imposes costs on others; a{' '}
            <strong>positive externality</strong> (like a vaccinated neighbor)
            bestows benefits on others. Because these effects occur outside the
            market price, they cause markets to produce too much of the harmful
            activity or too little of the beneficial one.
          </p>
        ),
      },
      {
        title: 'Negative externalities',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Costs borne by others:</strong> The factory&rsquo;s smoke
              harms nearby residents, but the factory doesn&rsquo;t pay for that
              damage—so it treats the cost as if it doesn&rsquo;t exist.
            </p>
            <p>
              <strong>Market failure:</strong> The private cost to the producer
              is lower than the true social cost. The result is overproduction:
              too much pollution, congestion, and resource depletion relative to
              what society would want.
            </p>
            <p>
              <strong>Examples:</strong> Factory emissions, traffic congestion,
              secondhand smoke, and loud noise are all familiar negative
              externalities.
            </p>
          </div>
        ),
      },
      {
        title: 'Positive externalities',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Benefits to others:</strong> When benefits spill over
              without the producer being compensated, the market under-provides
              the activity—too little of a good thing.
            </p>
            <p>
              <strong>Examples:</strong> Education makes society more
              productive, vaccines protect the unvaccinated, R&amp;D benefits
              other firms, and well-maintained gardens raise neighborhood
              property values.
            </p>
            <p>
              <strong>The gap:</strong> Because individuals reap only part of
              the benefit, they invest too little. This is why public education,
              immunization campaigns, and research funding are subsidized.
            </p>
          </div>
        ),
      },
      {
        title: 'The solutions',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Pigouvian taxes:</strong> Arthur Pigou proposed taxing
              activities with negative externalities so producers pay the true
              social cost. Carbon taxes are the modern example—they make
              polluters internalize the harm.
            </p>
            <p>
              <strong>Subsidies:</strong> Paying for positive externalities
              (education grants, vaccine subsidies, research tax credits) pushes
              provision up toward the socially optimal level.
            </p>
            <p>
              <strong>Coase theorem:</strong> Ronald Coase showed that if
              property rights are clear and bargaining is costless, parties can
              negotiate to the efficient outcome without government—though in
              reality transaction costs usually prevent this.
            </p>
            <p>
              <strong>Regulation and cap-and-trade:</strong> Command-and-control
              rules or tradable permits directly limit harmful activity while
              letting the market allocate who reduces emissions.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default ExternalitiesPage;

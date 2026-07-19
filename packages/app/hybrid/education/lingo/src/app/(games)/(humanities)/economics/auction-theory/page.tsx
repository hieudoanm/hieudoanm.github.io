'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const AuctionTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Auction Theory"
    subtitle="How the rules of bidding shape who wins—and how much they pay."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Auction theory</strong> studies how different auction
            formats allocate goods and determine prices. The central question:
            given that bidders have private valuations and act strategically,
            which auction design produces the best outcome for the seller—or for
            society? The answer depends on information, risk, and the rules of
            the game.
          </p>
        ),
      },
      {
        title: 'Main auction formats',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>English (ascending):</strong> Bidders openly raise each
              other&rsquo;s bids until only one remains. The winner pays their
              final bid. Simple, intuitive, and the most common format online
              and in art sales.
            </p>
            <p>
              <strong>Dutch (descending):</strong> The auctioneer starts at a
              high price and lowers it until someone bids. The winner pays their
              own bid. Fast but risks a low final price.
            </p>
            <p>
              <strong>First-price sealed-bid:</strong> Everyone submits a single
              secret bid. The highest bidder wins and pays exactly what they
              bid. Common in government procurement.
            </p>
            <p>
              <strong>Vickrey (second-price sealed-bid):</strong> The highest
              bidder wins but pays the second-highest bid. Truthful bidding is
              the dominant strategy—which is the deep insight of Vickrey&rsquo;s
              Nobel-winning work.
            </p>
          </div>
        ),
      },
      {
        title: 'Key results',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Revenue equivalence:</strong> Under certain conditions,
              all four standard auction formats yield the same expected revenue
              for the seller—bidders adjust strategies to compensate for format
              differences.
            </p>
            <p>
              <strong>The winner&rsquo;s curse:</strong> In common-value
              auctions (where the item is worth the same to all bidders but each
              estimates it differently), the winner tends to be the most
              optimistic—and often overpays.
            </p>
            <p>
              <strong>Entry and number of bidders:</strong> More competition
              drives up the seller&rsquo;s revenue and reduces bidders&rsquo;
              surplus—entry fees and reserve prices are tools to control this.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world applications',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Spectrum auctions:</strong> Governments sell radio
              frequencies to telecoms using complex combinatorial auctions
              designed to maximize efficiency and revenue.
            </p>
            <p>
              <strong>Online advertising:</strong> Google and Meta run real-time
              second-price auctions billions of times a day to place ads—each
              impression is a tiny auction.
            </p>
            <p>
              <strong>Carbon permits:</strong> Cap-and-trade systems auction
              emission allowances—designing the auction determines how
              efficiently pollution is allocated across firms.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/auction-theory/auction',
        label: 'Auction Simulator',
        description:
          'Bid against three AI bidders across four auction formats and discover revenue equivalence.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Auction_theory',
        label: 'Wikipedia: Auction Theory',
        description:
          'Survey of auction theory, formats, and key results like revenue equivalence.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2020/milgrom-wilson/summary/',
        label: 'Nobel Prize: 2020 (Milgrom & Wilson)',
        description:
          'Nobel Prize page for auction theory pioneers Paul Milgrom and Robert Wilson.',
      },
      {
        href: 'https://www.investopedia.com/terms/v/vickrey-auction.asp',
        label: 'Investopedia: Vickrey Auction',
        description:
          'Entry explaining the second-price sealed-bid auction and its truthful bidding property.',
      },
    ]}
  />
);

export default AuctionTheoryPage;

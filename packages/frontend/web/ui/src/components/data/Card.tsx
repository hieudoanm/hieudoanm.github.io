import card from '@atomic-ui/assets/card.jpg';
import { H3, H6, Paragraph } from '@atomic-ui/components/Typography';
import { FC } from 'react';

export const Card: FC = () => {
  return (
    <div className="w-full max-w-md divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 shadow dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-neutral-100/10">
      <div
        className="aspect-video w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${card.src})` }}
      />
      <div className="flex flex-col gap-y-2 p-6">
        <H3>Card Title</H3>
        <H6 className="text-neutral-700 dark:text-neutral-300">
          Card Subtitle
        </H6>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          tincidunt interdum sapien non viverra. Donec ac nunc volutpat, blandit
          nibh pellentesque, sodales nulla. In ante arcu, finibus in lobortis
          vitae, fringilla sit amet urna. Proin sit amet turpis nec justo
          sollicitudin faucibus. Proin pharetra fringilla dolor, sit amet
          hendrerit velit.
        </Paragraph>
      </div>
      <div className="flex justify-end p-6">
        <button className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white shadow hover:bg-red-800 focus:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 dark:bg-red-700 dark:shadow-neutral-100/10">
          Button
        </button>
      </div>
    </div>
  );
};

import card from '@atom-ui/assets/card.jpg';
import { FC } from 'react';
import { H3, H6, Paragraph } from './Typography';
import { Button } from './form/Button';

export const Card: FC = () => {
  return (
    <div className="w-full max-w-md overflow-hidden rounded border border-neutral-200 bg-white shadow-md">
      <div
        className="aspect-video w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${card.src})` }}
      />
      <div className="flex flex-col gap-y-2 border-t border-b border-neutral-200 p-6">
        <H3>Card Title</H3>
        <H6 className="text-neutral-700">Card Subtitle</H6>
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
        <Button>Button</Button>
      </div>
    </div>
  );
};

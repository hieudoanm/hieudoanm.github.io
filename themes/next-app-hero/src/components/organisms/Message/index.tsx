import content from '@/content';
import Image from 'next/image';
import Link from 'next/link';

export const Message: React.FC = () => {
  return (
    <div className="flex w-full flex-col justify-center overflow-y-hidden">
      <h1 className="slide-in-bottom-h1 mb-8 text-center text-3xl font-bold leading-tight text-purple-800 md:text-left md:text-5xl">
        {content.message.title}
      </h1>
      <p className="slide-in-bottom-subtitle mb-8 text-center text-base leading-normal text-gray-900 md:text-left md:text-2xl">
        {content.message.subtitle}
      </p>
      <p className="fade-in mb-8 text-center font-bold capitalize text-blue-400 md:text-left">
        Download our app
      </p>
      <div className="fade-in flex w-full justify-center gap-4 md:justify-start md:gap-8">
        {content.apps.map(({ id, url, image, title }) => {
          return (
            <Link key={id} href={url} className="w-48" target={'_blank'}>
              <Image src={image} className="bounce-top-icons" alt={title} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Message;

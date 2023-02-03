import Image, { StaticImageData } from 'next/image';

const Service: React.FC<{
  image: string | StaticImageData;
  title: string;
  description: string;
  tools: string[];
}> = ({ image, title = '', description = '', tools = [] }) => {
  return (
    <div className="rounded-xl border p-8 text-center shadow-md transition-all hover:shadow-2xl dark:border-gray-900 dark:bg-gray-800 dark:text-white">
      <Image src={image} alt={title} className="mx-auto mb-8" />
      <h3 className="mb-8 text-lg font-medium">{title}</h3>
      <p className="mb-8">{description}</p>
      <h4 className="mb-8 text-teal-600">Develop Tools I Use</h4>
      {tools.map((tool) => {
        return (
          <p
            key={`tool-${tool.toLowerCase().split(' ').join('-')}`}
            className="py-1 text-gray-800 dark:text-white"
          >
            {tool}
          </p>
        );
      })}
    </div>
  );
};

export default Service;

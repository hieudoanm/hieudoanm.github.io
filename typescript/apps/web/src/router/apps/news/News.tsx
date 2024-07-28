import { Article } from '@web/clients/news/news.dto';
import { Category, Country } from '@web/clients/news/news.enums';
import { Layout } from '@web/layout';
import { QueryTemplate } from '@web/templates/QueryTemplate';
import { trpc } from '@web/utils/trpc';
import Link from 'next/link';
import { FC } from 'react';

export const PublishedAt: FC<{ publishedAt: string }> = ({
  publishedAt = '',
}) => {
  if (!publishedAt) return <></>;

  const oneSecond: number = 1000;
  const oneMinute: number = oneSecond * 60;
  const oneHour: number = oneMinute * 60;
  const oneDay: number = oneHour * 24;
  const oneMonth: number = oneDay * 30;
  const oneYear: number = oneDay * 365;

  const time: number = Date.now();
  const publishedTime: number = new Date(publishedAt).getTime();
  const delta: number = time - publishedTime;

  if (delta < oneHour) {
    return <span title={publishedAt}>{Math.round(delta / oneMinute)}m</span>;
  }

  if (delta < oneDay) {
    return <span title={publishedAt}>{Math.round(delta / oneHour)}h</span>;
  }

  if (delta < oneMonth) {
    return <span title={publishedAt}>{Math.round(delta / oneDay)}D</span>;
  }

  if (delta < oneYear) {
    return <span title={publishedAt}>{Math.round(delta / oneMonth)}M</span>;
  }

  return <span title={publishedAt}>{Math.round(delta / oneYear)}Y</span>;
};

export type ContentProps = {
  url: string;
  title: string;
  description: string;
  author: string;
  source: { name: string };
  publishedAt: string;
};

export const Content: FC<ContentProps> = ({
  url = '',
  title = '',
  description = '',
  author = '',
  publishedAt = '',
  source = { name: '' },
}) => {
  return (
    <div className='flex grow flex-col gap-y-4'>
      <Link href={url} target='_blank'>
        <h2 className='line-clamp-3 text-xl'>{title ?? ''}</h2>
      </Link>
      {description ? <p className='line-clamp-3'>{description}</p> : <></>}
      <div className='text-sm'>
        {author ? <span>{author} - </span> : <></>}
        {source.name ? <span>{source.name} - </span> : <></>}
        <PublishedAt publishedAt={publishedAt} />
      </div>
    </div>
  );
};

export type ArticleBlockProps = {
  urlToImage: string;
  url: string;
  title: string;
  description: string;
  author: string;
  source: { name: string };
  publishedAt: string;
};

export const ArticleBlock: FC<ArticleBlockProps> = ({
  urlToImage = '',
  url = '',
  title = '',
  description = '',
  author = '',
  publishedAt = '',
  source = { name: '' },
}) => {
  return (
    <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:gap-8'>
      <div className='aspect-video w-full rounded-xl md:aspect-square md:w-32'>
        <div className='h-full w-full overflow-hidden rounded-xl border border-base-content md:w-32'>
          {urlToImage ? (
            <div
              className='h-full w-full bg-cover bg-center bg-no-repeat'
              style={{
                backgroundImage: `url(${urlToImage})`,
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <Content
        url={url}
        title={title}
        description={description}
        author={author}
        publishedAt={publishedAt}
        source={source}
      />
    </div>
  );
};

export const Articles: FC<{ articles?: Article[] }> = ({ articles = [] }) => {
  return (
    <>
      {articles
        .filter(({ title }) => title !== '[Removed]')
        .map(
          ({
            title,
            description,
            url,
            urlToImage,
            author,
            source,
            publishedAt,
          }: Article) => {
            return (
              <div key={title} className='border-t border-base-content'>
                <div className='container mx-auto'>
                  <div className='p-4 md:p-8'>
                    <ArticleBlock
                      urlToImage={urlToImage}
                      url={url}
                      title={title}
                      description={description}
                      author={author}
                      publishedAt={publishedAt}
                      source={source}
                    />
                  </div>
                </div>
              </div>
            );
          }
        )}
    </>
  );
};

export const NewsQuery: FC<{ category: Category; country: Country }> = ({
  category = Category.GENERAL,
  country = Country.UNITED_STATES,
}) => {
  const {
    isPending,
    error,
    data: articles,
  } = trpc.news.useQuery({
    category,
    country,
  });

  return (
    <QueryTemplate
      isPending={isPending}
      error={error}
      noData={!articles || articles.length === 0}>
      <Layout full nav navBorder>
        <div className='h-full overflow-auto'>
          <Articles articles={articles} />
        </div>
      </Layout>
    </QueryTemplate>
  );
};

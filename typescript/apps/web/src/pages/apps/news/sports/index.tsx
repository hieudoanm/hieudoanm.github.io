import { getTopHeadlines } from '@web/clients/news/news.client';
import { Article } from '@web/clients/news/news.dto';
import { Category, Country } from '@web/clients/news/news.enums';
import { useIsOnline } from '@web/hooks/use-is-online';
import { Layout } from '@web/layout/Layout';
import { Articles, NewsQuery } from '@web/router/apps/news';
import { GetStaticProps, NextPage } from 'next';

const NewsPage: NextPage<{ articles: Article[] }> = ({
  articles: defaultArticles = [],
}) => {
  const isOnline: boolean = useIsOnline();

  if (!isOnline) {
    return (
      <Layout full nav navBorder>
        <Articles articles={defaultArticles} />
      </Layout>
    );
  }

  return (
    <NewsQuery category={Category.SPORTS} country={Country.UNITED_KINGDOM} />
  );
};

export const getStaticProps: GetStaticProps<{
  articles: Article[];
}> = async () => {
  try {
    const options = {
      category: Category.SPORTS,
      country: Country.UNITED_KINGDOM,
      page: 1,
      pageSize: 20,
    };
    const { articles = [] } = await getTopHeadlines(options);
    return { props: { articles } };
  } catch {
    return { props: { articles: [] } };
  }
};

export default NewsPage;

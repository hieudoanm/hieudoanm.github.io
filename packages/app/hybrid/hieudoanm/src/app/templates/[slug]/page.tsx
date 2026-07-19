import { TemplateSlugClient } from './_client';

const TEMPLATE_SLUGS = [
  'landing-marketing',
  'landing-downloads',
  'chat',
  'dashboard',
  'version',
  'sign-in',
  'sign-up',
  'profile',
  'password-reset',
  'password-forget',
  'blog',
  'blogs',
  'components',
  'error',
  'store',
  'store-item',
];

const TemplatePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <TemplateSlugClient slug={slug} />;
};

export function generateStaticParams() {
  return TEMPLATE_SLUGS.map((slug) => ({ slug }));
}

export default TemplatePage;

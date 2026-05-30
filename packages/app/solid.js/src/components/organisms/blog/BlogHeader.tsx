import { A } from '@solidjs/router';

interface BlogHeaderProps {
  title?: string;
  description?: string;
}

export const BlogHeader = (props: BlogHeaderProps) => {
  const title = props.title ?? 'Blog';
  const description =
    props.description ??
    'Thoughts, tutorials, and insights on software engineering and design.';
  return (
    <div class="border-base-300 mx-12 border-b">
      <div class="mx-auto flex max-w-5xl flex-col items-start px-12 py-24 text-left">
        <p class="text-primary mb-3 text-xs tracking-[0.2em] uppercase">
          /blog
        </p>
        <h1 class="mb-4 font-serif text-5xl leading-[1.05] font-black tracking-tight">
          {title}
        </h1>
        <p class="text-base-content/60 mb-8 max-w-xl text-base leading-relaxed">
          {description}
        </p>
        <div class="flex items-center gap-3 text-xs">
          <A
            href="/"
            class="text-base-content/40 hover:text-primary transition-colors">
            Home
          </A>
          <span class="text-base-content/20">/</span>
          <span class="text-base-content/60">Blog</span>
        </div>
      </div>
    </div>
  );
};

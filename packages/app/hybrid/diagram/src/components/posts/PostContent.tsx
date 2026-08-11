import type { Post } from '@/lib/posts';
import { FC, Fragment, ReactNode } from 'react';

const renderInline = (text: string): ReactNode[] =>
  text.split(/(`[^`]+`)/g).map((part, index) =>
    part.startsWith('`') && part.endsWith('`') ? (
      <code key={index} className="bg-base-300 rounded px-1 font-mono text-sm">
        {part.slice(1, -1)}
      </code>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  );

interface PostContentProps {
  post: Post;
}

const PostContent: FC<PostContentProps> = ({ post }) => (
  <article>
    <header className="mb-8">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.description && (
        <p className="text-base-content/70 mt-2">{post.description}</p>
      )}
      <p className="text-base-content/50 mt-3 text-sm">
        {post.author} · <span className="capitalize">{post.difficulty}</span> ·{' '}
        <span className="capitalize">{post.category}</span>
      </p>
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span className="badge badge-outline badge-sm" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>

    {post.questions.length > 0 && (
      <section>
        <h2 className="mb-2 text-xl font-semibold">Interview Questions</h2>
        <ul className="list-disc space-y-1 pl-6">
          {post.questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>
    )}

    {post.answers.length > 0 && (
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Answers</h2>
        <div className="space-y-6">
          {post.answers.map((answer) => (
            <div key={answer.question}>
              <h3 className="mb-2 font-semibold">{answer.question}</h3>
              {answer.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-2 leading-relaxed">
                  {renderInline(paragraph)}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    )}

    {post.diagramText && (
      <details className="mt-8">
        <summary className="cursor-pointer font-medium">Diagram source</summary>
        <pre className="bg-base-200 mt-2 overflow-x-auto rounded-lg p-4 font-mono text-xs">
          {post.diagramText}
        </pre>
      </details>
    )}
  </article>
);

export default PostContent;

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData: { id: string; title: string; date: string }[] =
    fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data } = matter(fileContents);

      return {
        id,
        title: data.title,
        date: data.date,
      };
    });

  return allPostsData.sort(
    (
      a: { date: string; title: string },
      b: { date: string; title: string }
    ) => {
      if (a.date === b.date) {
        return a.title > b.title ? 1 : -1;
      }
      return a.date < b.date ? 1 : -1;
    }
  );
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Helper function to recursively read directories and get file names
function getFilesRecursively(dir: string): string[] {
  const files = fs.readdirSync(dir);
  let allFiles: string[] = [];

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // If the file is a directory, recursively fetch its files
      allFiles = allFiles.concat(getFilesRecursively(fullPath));
    } else {
      // If it's a file, add it to the list
      allFiles.push(fullPath);
    }
  });

  return allFiles;
}

const postsDirectory = path.join(process.cwd(), 'src/posts');

export function getSortedPostsData() {
  const filePaths = getFilesRecursively(postsDirectory);

  const allPostsData: { id: string; title: string; date: string }[] =
    filePaths.map((filePath) => {
      const id = filePath
        .replace(`${postsDirectory}/`, '')
        .replace(/\.md$/, '');
      const fileContents = fs.readFileSync(filePath, 'utf8');

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

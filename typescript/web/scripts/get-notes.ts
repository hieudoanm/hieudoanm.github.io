import { readdirSync, statSync, writeFileSync } from 'node:fs';

const getFiles = (dir: string, files: string[] = []) => {
  const fileList = readdirSync(dir);
  for (const file of fileList) {
    const name: string = `${dir}/${file}`;
    if (statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      files.push(name);
    }
  }
  return files;
};

const main = () => {
  const mainPath: string = './docs';
  const mainFile: string = 'README.md';
  const files = getFiles(mainPath, []);
  const markdownFiles = files
    .filter((file: string) => file.includes(mainFile))
    .map((file: string) =>
      file.replaceAll(`/${mainFile}`, '').replaceAll(`${mainPath}/`, '')
    );
  writeFileSync(
    './src/json/notes.json',
    JSON.stringify(markdownFiles, null, 2)
  );
};

main();

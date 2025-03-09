import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const main = () => {
  const scripts = readdirSync('src');
  // Write to Markdown
  const markdownContent: string = scripts
    .map((script: string) => {
      const name = script.replace('.bash', '');
      const content = readFileSync(`src/${script}`, 'utf-8');
      return `## ${name}\n\n\`\`\`bash\n${content}\`\`\``;
    })
    .join('\n\n');
  const markdown = `# Bash

${markdownContent}
`;
  writeFileSync('README.md', markdown);
  // Write to bash file
  const bashContent: string = scripts
    .map((script: string) => {
      const content = readFileSync(`src/${script}`, 'utf-8')
        .replace('#!/bin/bash', '')
        .trim();
      return content;
    })
    .join('\n\n');
  const bash = `#!/bin/bash

${bashContent}
`;
  writeFileSync('dist/hieu.bash', bash);
};

main();

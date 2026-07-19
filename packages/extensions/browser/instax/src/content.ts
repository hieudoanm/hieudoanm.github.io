let lastRightClick = 0;

document.addEventListener('contextmenu', (event) => {
  const now = Date.now();

  if (now - lastRightClick > 400) {
    lastRightClick = now;
    return;
  }

  lastRightClick = now;
  event.preventDefault();

  const target = event.target;

  if (!(target instanceof Element)) return;

  const siblings = [...(target.parentElement?.children ?? [])].filter(
    (element) => element !== target
  );

  const images = [
    ...(target.matches('img') ? [target] : []),
    ...target.querySelectorAll('img'),

    ...siblings.flatMap((sibling) => [
      ...(sibling.matches('img') ? [sibling] : []),
      ...sibling.querySelectorAll('img'),
    ]),
  ];

  const sources = [...new Set(images.map((img) => img.src).filter(Boolean))];

  console.log('Images found:', sources);

  sources.forEach((src) => {
    const link = document.createElement('a');

    link.href = src;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    document.body.appendChild(link);
    link.click();
    link.remove();
  });
});

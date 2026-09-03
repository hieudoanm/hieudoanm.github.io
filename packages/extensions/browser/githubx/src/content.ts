const isGitHubUrl = (url: string) => {
  return url.includes('github.com');
};

const getAbsoluteUrl = (href: string) => {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href;
  }

  if (href.startsWith('/')) {
    return 'https://github.com' + href;
  }

  const currentPath = window.location.pathname;
  const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
  return 'https://github.com' + currentDir + href;
};

document.addEventListener('click', (event) => {
  const link = (event.target as HTMLElement).closest('a');

  if (link) {
    const href = link.getAttribute('href');

    if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
      return;
    }

    const absoluteUrl = getAbsoluteUrl(href);

    if (!isGitHubUrl(absoluteUrl)) {
      event.preventDefault();
      window.open(absoluteUrl, '_blank');
    }
  }
});

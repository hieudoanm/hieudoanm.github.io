interface BlogFooterProps {
  name?: string;
  year?: number;
}

export const BlogFooter = (props: BlogFooterProps) => {
  const resolvedName = props.name ?? 'Blog';
  const resolvedYear = props.year ?? new Date().getFullYear();
  return (
    <footer class="border-base-300 border-t py-12 text-center">
      <p class="text-primary mb-3 font-serif text-2xl font-bold tracking-widest">
        {resolvedName}
      </p>
      <p class="text-base-content/30 text-sm">
        &copy; {resolvedYear} {resolvedName} &middot; Built with care
      </p>
    </footer>
  );
};

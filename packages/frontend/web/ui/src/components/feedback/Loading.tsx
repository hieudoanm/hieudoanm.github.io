export const Loading = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-8">
      <div className="aspect-square w-16 animate-spin rounded-full border-8 border-purple-600 border-b-white bg-white dark:border-purple-700 dark:border-b-neutral-900 dark:bg-neutral-900" />
      <div className="aspect-square w-16 animate-spin rounded-full border-8 border-green-600 border-b-white bg-white dark:border-green-700 dark:border-b-neutral-900 dark:bg-neutral-900" />
      <div className="aspect-square w-16 animate-spin rounded-full border-8 border-blue-600 border-b-white bg-white dark:border-blue-700 dark:border-b-neutral-900 dark:bg-neutral-900" />
      <div className="aspect-square w-16 animate-spin rounded-full border-8 border-yellow-600 border-b-white bg-white dark:border-yellow-700 dark:border-b-neutral-900 dark:bg-neutral-900" />
      <div className="aspect-square w-16 animate-spin rounded-full border-8 border-orange-600 border-b-white bg-white dark:border-orange-700 dark:border-b-neutral-900 dark:bg-neutral-900" />
      <div className="aspect-square w-16 animate-spin rounded-full border-8 border-red-600 border-b-white bg-white dark:border-red-700 dark:border-b-neutral-900 dark:bg-neutral-900" />
    </div>
  );
};

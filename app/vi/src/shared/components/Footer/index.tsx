export const Footer: React.FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <footer className="border-t shadow">
      <div className="container mx-auto">
        <div className="px-8 py-4">
          <p>&copy; VI {year}</p>
        </div>
      </div>
    </footer>
  );
};

export default function Header() {
  return (
    <header className="text-primary-background">
      <div className="container mx-auto px-4 py-4 flex justify-between">
        <h1 className="text-2xl font-bold">Speedsters</h1>
        <button>Logout</button>
      </div>
    </header>
  );
}

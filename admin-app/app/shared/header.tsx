import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="text-primary-background">
      <div className="container mx-auto px-4 py-4 flex justify-between">
        <Link to="/" className="text-2xl font-bold">
          Speedsters
        </Link>
        <button>Logout</button>
      </div>
    </header>
  );
}

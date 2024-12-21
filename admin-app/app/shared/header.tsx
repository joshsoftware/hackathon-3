import { Link, useNavigate } from "@remix-run/react";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="text-primary-background">
      <div className="container mx-auto px-4 py-4 flex justify-between">
        <Link to="/" className="text-2xl font-bold">
          <h1 className="text-2xl font-bold">Speedsters</h1>
        </Link>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

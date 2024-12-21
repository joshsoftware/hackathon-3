import { Link, useNavigate } from "@remix-run/react";
import { useIsLoggedIn } from "./hooks/useIsLoggedIn";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();

  return (
    <header className="text-primary-background">
      <div className="container mx-auto px-4 py-4 flex justify-between">
        <Link to="/" className="text-2xl font-bold">
          <h1 className="text-2xl font-bold">Speedsters</h1>
        </Link>

        {isLoggedIn ? (
          <div className="flex gap-4 justify-center align-middle">
            <div>
              <Link to="/events" className="block">
                Events
              </Link>
            </div>
            <div>
              <Link to="/metrics" className="block">
                Metrics
              </Link>
            </div>
            <div>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/", {
                    replace: true,
                  });
                }}
                className="block"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </header>
  );
}

import { Link, useNavigate } from "@remix-run/react";
import { LogOutIcon } from "lucide-react";

export default function Header({ userToken }: { userToken: string | null }) {
  const navigate = useNavigate();

  return (
    <header className="text-primary-background">
      <div className="container mx-auto px-4 py-4 flex justify-between">
        <Link to="/" className="text-2xl flex items-center gap-1">
          <img
            src="logo.png"
            alt="Trackters"
            width={60}
            height={42}
            className="rotate-90"
          />
          <h1 className="font-bold">Trackster</h1>
        </Link>

        {userToken ? (
          <div className="flex gap-4 justify-center items-center">
            <div>
              <Link
                to="/events"
                className="block with-border px-4 hover:bg-slate-300 rounded p-3"
              >
                Events
              </Link>
            </div>
            <div>
              <Link
                to="/metrics"
                className="block px-2 hover:bg-slate-300 rounded p-3"
              >
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
              >
                <LogOutIcon />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Link className="text-bold" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

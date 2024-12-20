import { Link } from "@remix-run/react";

export default function AdminPage() {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <Link to="/">Home Page</Link>
      <h1>Admin Page</h1>
    </div>
  );
}

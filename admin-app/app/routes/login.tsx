import { Link } from "@remix-run/react";

export default function LoginPage() {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <Link to="/">Home</Link>
      <h1>Login</h1>
    </div>
  );
}

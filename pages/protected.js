import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthUser } from "../hooks/useAuthUser";

export default function ProtectedPage() {
  const { user, loading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 32 }}>
      <h2>Protected Content</h2>
      <p>Welcome, {user.email}!</p>
      <p>This page is only visible to authenticated users.</p>
    </div>
  );
} 
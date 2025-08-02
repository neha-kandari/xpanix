import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface AuthUser {
  user: User | null;
  loading: boolean;
}

export function useAuthUser(): AuthUser {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading };
} 
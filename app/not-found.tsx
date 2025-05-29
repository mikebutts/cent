"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseClient"; // adjust path if needed

export default function NotFound() {
  const [user, setUser] = useState<User | null>(null);
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientReady(true);

      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });

      return () => unsubscribe();
    }
  }, []);

  if (!clientReady) return null;

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      {user ? (
        <p>Hello {user.email}, this page doesn't exist.</p>
      ) : (
        <p>Oops! We couldn’t find what you were looking for.</p>
      )}
    </div>
  );
}

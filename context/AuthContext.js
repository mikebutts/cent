"use client";

import { auth, db } from "@/firebaseClient";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { wrapSubscription } from "@/utils/subscriptionWrapper";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true); // start in loading state

  // ✅ Sign up
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // ✅ Login
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // ✅ Logout
  const logout = () => {
    setCurrentUser(null);
    setSubscriptions([]);
    return signOut(auth);
  };

  // ✅ Fetch subscriptions
  async function fetchSubscriptions(userId) {
    try {
      const q = query(
        collection(db, "subscriptions"),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(q);
      const subs = snapshot.docs.map((doc) =>
        wrapSubscription({ id: doc.id, ...doc.data() })
      );
      setSubscriptions(subs);
    } catch (err) {
      console.error("Error loading subscriptions:", err.message);
    }
  }

  // ✅ Add subscription
  async function handleAddSubscription(newSubscription) {
    if (!currentUser?.uid) {
      console.error("❌ No currentUser — can't save to Firestore");
      return;
    }

    try {
      const cleanedData = {
        ...newSubscription,
        premium: !!newSubscription.premium,
        userId: currentUser.uid,
        cost: parseFloat(newSubscription.cost || "0"),
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "subscriptions"), cleanedData);
      const wrapped = wrapSubscription({ id: docRef.id, ...cleanedData });
      setSubscriptions((prev) => [...prev, wrapped]);

      console.log("✅ Subscription added to Firestore:", docRef.id);
    } catch (err) {
      console.error("❌ Failed to save subscription:", err.message);
    }
  }

  // ✅ Update subscription
  async function handleUpdateSubscription(subscriptionId, updatedData) {
    try {
      const subRef = doc(db, "subscriptions", subscriptionId);
      const { id, ...dataToSave } = updatedData;

      await updateDoc(subRef, {
        ...dataToSave,
        cost: parseFloat(dataToSave.cost || "0"),
        updatedAt: new Date(),
      });

      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === subscriptionId
            ? { ...sub, ...dataToSave, id: subscriptionId }
            : sub
        )
      );

      console.log(`✅ Updated subscription ${subscriptionId}`);
    } catch (err) {
      console.error("❌ Failed to update subscription:", err.message);
    }
  }

  // ✅ Delete subscription
  async function handleDeleteSubscription(subscriptionId) {
    try {
      await deleteDoc(doc(db, "subscriptions", subscriptionId));
      setSubscriptions((prev) =>
        prev.filter((sub) => sub.id !== subscriptionId)
      );
    } catch (err) {
      console.error("Failed to delete subscription:", err.message);
    }
  }

  // ✅ Listen to Firebase Auth changes
  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ SSR guard

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        setLoading(true);
        await fetchSubscriptions(user.uid);
        setLoading(false);
      } else {
        setSubscriptions([]);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    subscriptions,
    loading,
    signup,
    login,
    logout,
    handleAddSubscription,
    handleUpdateSubscription,
    handleDeleteSubscription,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

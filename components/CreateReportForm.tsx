"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const categories = ["All", "Streaming", "Music", "Fitness", "Other"];

export default function CreateReportForm() {
  const { currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser?.uid) {
      alert("You must be logged in to generate a report.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/generatereports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          userId: currentUser.uid,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate report");
      }

      alert(`✅ Report saved! Total: $${data.total.toFixed(2)}`);
      setTitle("");
      setCategory("All");
    } catch (err: any) {
      console.error("Report creation failed:", err);
      alert("❌ Failed to create report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded max-w-md">
      <h2 className="text-lg font-bold">Generate Summary Report</h2>

      <input
        className="border p-2 w-full"
        placeholder="Report Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select
        className="border p-2 w-full"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>
    </form>
  );
}

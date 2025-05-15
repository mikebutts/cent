'use client';

import { useAuth } from "@/context/AuthContext";
import { calculateSubscriptionMetrics } from "@/utils";

export default function SubscriptionSummary() {
  const { subscriptions } = useAuth();
  const summary = calculateSubscriptionMetrics(subscriptions || []);

  const emojis = ['🔥', '✅', '⭐️', '⚡️', '🎉', '✨', '🏆', '🌼', '🌱', '🐛', '🐙', '🪼'];

  return (
    <section>
      <h2>Subscription Analytics</h2>
      <div className="analytics-card">
        {Object.keys(summary).map((metric, metricIndex) => (
          <div key={metricIndex} className="analytics-item">
            <p>{emojis[metricIndex % emojis.length]} {metric.replaceAll('_', ' ')}</p>
            <h4>{summary[metric]}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

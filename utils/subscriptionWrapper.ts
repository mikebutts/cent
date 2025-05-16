// utils/subscriptionWrapper.ts

export function wrapSubscription(sub: any) {
  const cost = typeof sub.cost === "string" ? parseFloat(sub.cost) : sub.cost;
  const startDate =
    typeof sub.startDate === "string" ? new Date(sub.startDate) : sub.startDate;

  return {
    id: sub.id,
    name: sub.name || "",
    category: sub.category || "Other",
    cost: isNaN(cost) ? 0 : cost,
    currency: sub.currency || "USD",
    billingFrequency: sub.billingFrequency || "Monthly",
    startDate: startDate instanceof Date && !isNaN(startDate.getTime())
      ? startDate.toISOString().split("T")[0]
      : "",
    notes: sub.notes || "",
    status: sub.status || "Active",
    paymentMethod: sub.paymentMethod || "Credit Card",
    createdAt: sub.createdAt?.toDate?.() ?? new Date(),
    premium: sub.premium || false,
  };
}

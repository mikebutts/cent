'use client';

import { useAuth } from "@/context/AuthContext";
import { Suspense, useEffect, useState } from "react";
import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubscriptionSummary from "@/components/SubscriptionsSummary";
import Link from "next/link";

const blankSubscription = {
  name: '',
  category: 'Web Services',
  cost: '',
  currency: 'USD',
  billingFrequency: 'Monthly',
  nextBillingData: '',
  paymentMethod: 'Credit Card',
  startDate: '',
  renewalType: '',
  notes: '',
  status: 'Active'
};

export default function DashboardPage() {
  const {
    currentUser,
    subscriptions,
    loading,
    handleDeleteSubscription
  } = useAuth();

  const [isAddEntry, setIsAddEntry] = useState(false);
  const [formData, setFormData] = useState(blankSubscription);
  const [editingId, setEditingId] = useState(null);


  const isAuthenticated = !!currentUser;

  useEffect(() => {
    console.log("🔐 currentUser:", currentUser);
  }, [currentUser]);

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleResetForm() {
    setFormData(blankSubscription);
    setEditingId(null);

  }

  function handleToggleInput() {
    setIsAddEntry(prev => !prev);
  }

  function handleEditSubscription(subscription) {
    setFormData(subscription);
    setIsAddEntry(true);
    setEditingId(subscription.id);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <Login />
      </Suspense>
    );
  }

  return (
    <>
      <SubscriptionSummary />
      <SubscriptionsDisplay
        handleEditSubscription={handleEditSubscription}
        handleShowInput={isAddEntry ? () => {} : handleToggleInput}
      />
      {isAddEntry && (
        <SubscriptionForm
        currentUser={currentUser} 
          handleResetForm={handleResetForm}
          closeInput={handleToggleInput}
          formData={formData}
          handleChangeInput={handleChangeInput}
          editingId={editingId}
        />
      )}
<div className="hard-line"></div>
<div className="flex justify-center">
  <Link href="/reports">
    <button>Reports</button>
  </Link>
</div>
    </>
  );
}

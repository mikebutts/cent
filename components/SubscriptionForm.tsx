'use client';

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function SubscriptionForm(props) {
  const {
    closeInput,
    formData,
    handleChangeInput,
    handleResetForm,
    currentUser,
    editingId
  } = props;

  const { handleAddSubscription, handleUpdateSubscription } = useAuth();


  async function handleFormSubmit(e) {
    e.preventDefault();
  
    if (!currentUser || !currentUser.uid) {
      console.error("❌ Cannot submit without user");
      return;
    }
  
    const enrichedData = {
      ...formData,
      userId: currentUser.uid,
      cost: parseFloat(formData.cost),
    };
  
    try {
      if (editingId) {
        // Editing existing
        await handleUpdateSubscription(editingId, enrichedData);
      } else {
        // Creating new
        await handleAddSubscription(enrichedData);
      }
  
      handleResetForm();
      closeInput();
    } catch (err) {
      console.error("❌ Submit failed:", err);
    }
  }
  

  return (
    <section>
      <h2>Add a new subscription</h2>

      <form onSubmit={handleFormSubmit}>
        <label>
          <span>Subscription Name</span>
          <input
            value={formData.name}
            onChange={handleChangeInput}
            type="text"
            name="name"
            placeholder="e.g. Netflix, Spotify, AWS Hosting"
            required
          />
        </label>

        <label>
          <span>Category</span>
          <select value={formData.category} onChange={handleChangeInput} name="category">
            {['Entertainment', 'Music', 'Software', 'Web Services', 'Health & Fitness', 'Other'].map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Cost</span>
          <input
            value={formData.cost}
            onChange={handleChangeInput}
            type="number"
            name="cost"
            step="0.01"
            placeholder="e.g. 12.00"
            required
            inputMode="decimal"
          />
        </label>

        <label>
          <span>Currency</span>
          <select value={formData.currency} onChange={handleChangeInput} name="currency">
            {['USD', 'EUR', 'GBP', 'NZD', 'AUD', 'Other'].map((cur, index) => (
              <option key={index} value={cur}>{cur}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Billing Frequency</span>
          <select value={formData.billingFrequency} onChange={handleChangeInput} name="billingFrequency">
            {['Monthly', 'Yearly', 'Quarterly', 'One-time'].map((freq, index) => (
              <option key={index} value={freq}>{freq}</option>
            ))}
          </select>
        </label>
        <label >
          <input
            type="checkbox"
            name="premium"
            checked={formData.premium || false}
            onChange={(e) =>
              handleChangeInput({
                target: {
                  name: "premium",
                  value: e.target.checked,
                },
              })
            }
          />
          Premium Subscription
        </label>

        <label>
          <span>Payment Method</span>
          <select value={formData.paymentMethod} onChange={handleChangeInput} name="paymentMethod">
            {['Credit Card', 'Debit Card', 'Paypal', 'Bank Transfer', 'Other'].map((method, index) => (
              <option key={index} value={method}>{method}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Subscription Start Date</span>
          <input
            value={formData.startDate}
            onChange={handleChangeInput}
            type="date"
            name="startDate"
            required
          />
        </label>

        <label>
          <span>Status</span>
          <select value={formData.status} onChange={handleChangeInput} name="status">
            {['Active', 'Paused', 'Cancelled'].map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
        </label>

        <label className="fat-column">
          <span>Notes</span>
          <textarea
            value={formData.notes}
            onChange={handleChangeInput}
            name="notes"
            placeholder="e.g. Shared with family, includes cloud storage"
          />
        </label>

        <div className="fat-column form-submit-btns">
          <button type="button" onClick={closeInput}>Cancel</button>
          <button type="submit">Add Subscription</button>
        </div>
      </form>
    </section>
  );
}

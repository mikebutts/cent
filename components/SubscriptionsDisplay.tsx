'use client';

import { useAuth } from "@/context/AuthContext";
import { getDaysUntilNextCharge } from "@/utils";

export default function SubscriptionsDisplay({ handleShowInput, handleEditSubscription }) {
  const { handleDeleteSubscription, subscriptions } = useAuth();

  // Utility to safely format cost
  const safeCurrency = (value: any): string => {
    const number = typeof value === "number" ? value : parseFloat(value);
    const formatted = !isNaN(number) ? number.toFixed(2) : "0.00";
    if (formatted === "NaN") {
      console.warn("🚨 Invalid cost value detected:", value);
    }
    return formatted;
  };

  return (
    <section>
      <h2>Your Subscriptions</h2>
      <div className="card-container">

        {subscriptions && subscriptions.length > 0 ? (
          subscriptions.map((sub, index) => {
            const {
              id,
              name,
              category,
              cost,
              currency,
              billingFrequency,
              startDate,
              notes,
              status
            } = sub;

            console.log(`💬 Debug cost for ${name}:`, cost, typeof cost);

            return (
              <div key={id || index} className="card subscription-card">
                <div>
                  <h3>{name}  {sub.premium && (
                  <span className="text-yellow-500 ml-2 font-semibold">⭐ Premium</span>
                )}</h3>
                  <div className={'status ' + (status === 'Active' ? ' card-button-primary' : ' card-button-secondary')}>
                    <small>{status}</small>
                  </div>
                </div>

                <p><i>{category}</i></p>
     
                 <div className="sub-cost">
                  <h2>${safeCurrency(cost)}</h2>
                  <p>{currency}</p>
                </div>
                <small>per {billingFrequency}</small>

                <div className="sub-renewal">
                  <div>
                    <p>Started</p>
                    <h4>{startDate}</h4>
                  </div>
                  <div>
                    <p>Due</p>
                    <h4>{getDaysUntilNextCharge(startDate, billingFrequency)}</h4>
                  </div>
                </div>

                <div className="white-line" />
                <p>{notes}</p>

                <div className="subscription-actions">
                  <button onClick={() => handleEditSubscription(sub)} className="button-card">
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                  <button onClick={() => handleDeleteSubscription(id)} className="button-card">
                    <i className="fa-solid fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ marginBottom: "1rem" }}>You have no subscriptions yet.</p>
        )}

        <button onClick={handleShowInput} className="button-card add-subscriptions">
          <i className="fa-solid fa-plus"></i>
          <h5>Add new subscription</h5>
        </button>
      </div>
    </section>
  );
}

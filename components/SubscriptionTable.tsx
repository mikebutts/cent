// components/SubscriptionTable.tsx
'use client';

type Props = {
  subscriptions: any[];
};

export default function SubscriptionTable({ subscriptions }: Props) {
  return (
    <div className="mt-6">
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Category</th>
            <th className="text-left p-2">Cost</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Type</th>
            <th className="text-left p-2">Created</th> 
          </tr>
        </thead>
        <tbody>
          {subscriptions.map(sub => (
            <tr key={sub.id} className="border-t">
              <td className="p-2">{sub.name}</td>
              <td className="p-2">{sub.category}</td>
              <td className="p-2">${parseFloat(sub.cost).toFixed(2)}</td>
              <td className="p-2">{sub.status}</td>
              <td>
               {sub.premium ? "Premium" : "Standard"}
              </td>
              <td className="p-2">
        {sub.createdAt?.toDate
          ? sub.createdAt.toDate().toLocaleDateString()
          : 'N/A'}

      </td>
            </tr>
          ))}
          {subscriptions.length === 0 && (
            <tr>
              <td className="p-2" colSpan={4}>No matching subscriptions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

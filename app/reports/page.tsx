'use client';

import { useEffect, useRef, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseClient';
import { useAuth } from '@/context/AuthContext';
import SubscriptionTable from '@/components/SubscriptionTable';
import SubscriptionPieChart from '@/components/SubscriptionPieChart';

export default function ReportsPage() {
  const { currentUser } = useAuth();
  const reportRef = useRef<HTMLDivElement>(null);

  const [allSubs, setAllSubs] = useState([]);
  const [filteredSubs, setFilteredSubs] = useState([]);

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('All');

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!currentUser?.uid) return;

      const q = query(collection(db, 'subscriptions'), where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        premium: !!doc.data().premium,
      }));

      setAllSubs(results);
    };

    fetchSubscriptions();
  }, [currentUser]);

  useEffect(() => {
    let subs = [...allSubs];

    if (categoryFilter !== 'All') {
      subs = subs.filter(sub => sub.category === categoryFilter);
    }

    if (statusFilter !== 'All') {
      subs = subs.filter(sub => sub.status === statusFilter);
    }

    if (searchTerm.trim() !== '') {
      subs = subs.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (planFilter !== 'All') {
      subs = subs.filter(sub =>
        planFilter === 'Premium' ? sub.premium : !sub.premium
      );
    }

    setFilteredSubs(subs);
  }, [allSubs, categoryFilter, statusFilter, searchTerm, planFilter]);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Filtered Reports</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="border p-2 w-full"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            {['All', 'Streaming', 'Music', 'Web Services', 'Fitness', 'Other'].map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="border p-2 w-full"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            {['All', 'Active', 'Paused', 'Cancelled'].map(status => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            className="border p-2 w-full"
            type="text"
            placeholder="e.g. Netflix"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Plan</label>
          <select
            className="border p-2 w-full"
            value={planFilter}
            onChange={e => setPlanFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Premium">Premium</option>
            <option value="Standard">Standard</option>
          </select>
        </div>
      </div>

      <div ref={reportRef}>
        <div className="grid grid-cols-2 gap-4">
          <SubscriptionPieChart subscriptions={filteredSubs} />
          <SubscriptionTable subscriptions={filteredSubs} />
        </div>
      </div>
    </main>
  );
}

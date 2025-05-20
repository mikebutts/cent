import { wrapSubscription as Subscription}  from '../subscriptionWrapper';

describe('Subscription class', () => {
  const sampleData = {
    id: 'xxx',
    name: 'Spotify',
    category: 'Music',
    cost: 9.99,
    currency: 'USD',
    status: 'Active',
    createdAt: new Date('2024-01-01'),
  };

  it('creates a subscription and formats cost', () => {
    const sub = new Subscription(sampleData);
    console.log(sub)
    expect(sub.name).toBe('Spotify');
    expect(sub.cost).toBe(9.99);
  });

  it('correctly identifies active status', () => {
    const sub = new Subscription(sampleData);
    expect(sub.status).toBe("Active");
  });
});

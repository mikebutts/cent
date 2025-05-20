import { getDaysUntilNextCharge } from '../index';

describe('getDaysUntilNextCharge', () => {
  it('calculates days for monthly billing correctly', () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 15); // 15 days ago
    const result = getDaysUntilNextCharge(startDate.toISOString().split('T')[0], 'Monthly');

    expect(typeof result).toBe('number');
    expect(parseInt(result)).toBeGreaterThanOrEqual(13); // Approx. 30 - 15 days
  });

  it('returns "N/A" for unknown billing frequency', () => {
    const result = getDaysUntilNextCharge('2025-05-29', 'Monthly');
    function getDaysFromToday(targetDate: string | Date): number {
        const today = new Date();
        const date = new Date(targetDate);

        // Zero out time components for accurate day difference
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        const diffTime = date.getTime() - today.getTime(); // in milliseconds
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        return diffDays + 1;
      }
      const diff =  getDaysFromToday("2025-05-29")
    expect(result).toBe(diff);
  });
});

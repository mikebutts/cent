

import { Subscription, SubscriptionProps } from './Subscription';

export class PremiumSubscription extends Subscription {
  constructor(props: SubscriptionProps) {
    super(props);
  }

  // ✅ Polymorphism — overrides base behavior
  isActive(): boolean {
    return super.isActive() && this._props.cost > 20;
  }

  get premiumBadge(): string {
    return '🔥 Premium';
  }
}

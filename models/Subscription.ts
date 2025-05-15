export interface SubscriptionProps {
    id?: string;
    name: string;
    category: string;
    cost: number;
    currency: string;
    status: string;
    createdAt: Date;
    type?: 'premium' | 'standard'; 
  }
  // ✅ Encapsulation
  export class Subscription {
    protected _props: SubscriptionProps;
  
    constructor(props: SubscriptionProps) {
      this._props = props;
    }
  
    // Encapsulated access
    get name() {
      return this._props.name;
    }
  
    get status() {
      return this._props.status;
    }
  
    get formattedCost(): string {
      return `$${this._props.cost.toFixed(2)} ${this._props.currency}`;
    }
  
    get createdAt(): string {
      return this._props.createdAt.toLocaleDateString();
    }
  
    isActive(): boolean {
      return this._props.status === 'Active';
    }
  
    // ✅ Convert to Firestore-compatible plain object
    toFirestore(userId: string) {
        return {
          name: this._props.name,
          category: this._props.category,
          cost: this._props.cost,
          currency: this._props.currency,
          status: this._props.status,
          createdAt: this._props.createdAt,
          userId,
          type: this._props.type || 'standard', 
        };
      }
  }
  
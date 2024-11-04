// TODO must be in a repository linked to a PIM
export const getPriceFromId = (id: string): number => {
  let price;
  switch (id) {
    case 'trousers_467FJCFD':
      price = 3000;
      break;
    case 'trousers_96834DU':
      price = 6000;
      break;
    case 'new_trouser_9GJ7423':
      price = 7000;
      break;
    default:
      price = 1500;
      break;
  }

  return price;
};

export class BasketItemEntity {
  readonly id: string;
  readonly price: number;
  readonly quantity: number;

  get isNew(): boolean {
    return this.id.startsWith('new');
  }

  constructor(id: string, price: number, quantity: number) {
    if (!id || typeof id !== 'string') {
      throw new Error('ID is required and must be a non-empty string.');
    }

    if (typeof price !== 'number' || price <= 0) {
      throw new Error('Price is required and must be a positive number.');
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
      throw new Error('Quantity is required and must be a positive number.');
    }

    this.id = id;
    this.price = price;
    this.quantity = quantity;
  }

  // Méthode pour comparer deux objets BasketItemValueObject
  equals(other: BasketItemEntity): boolean {
    if (!(other instanceof BasketItemEntity)) {
      return false;
    }
    return this.id === other.id;
  }

  // Méthode statique pour additionner plusieurs objets BasketItemValueObject
  static addPrice(items: BasketItemEntity[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  increaseQuantity(quantity = 1): BasketItemEntity {
    return new BasketItemEntity(this.id, this.price, this.quantity + quantity);
  }
}

import { Logger, NotFoundException } from '@nestjs/common';
import { BasketItemEntity } from '../entities/basket-item.entity';
import { ulid } from 'ulid';
import { AttributesOnly, RemoveReadonly } from '@shared/types/attributes-only';
import { BasketDto } from '@contexts/shopping-basket/drivers/rest/basket.dto';

export class BasketAggregate {
  id!: string;
  items!: BasketItemEntity[];
  freeShipping: any;

  private constructor(value: RemoveReadonly<AttributesOnly<BasketAggregate>>) {
    this.id = value.id;
    this.items = value.items;
    this.freeShipping = value.freeShipping;
  }

  static create(basket: { id: string }): BasketAggregate {
    Logger.log('Create basket');

    const basketAggregate = new BasketAggregate({
      id: basket.id,
      items: [],
      freeShipping: false,
    });

    Logger.log('Basket created');

    return basketAggregate;
  }

  removeOneItemForAllQuantity(itemId: string): void {
    Logger.log('Remove basket item', { itemId });

    // TODO improve this with arrayUtils
    const index = this.findItemIndex(itemId);
    if (index === -1) {
      throw new NotFoundException(
        `Item ${itemId} not found in basket ${this.id}`,
      );
    }

    this.items.splice(index, 1);
    Logger.log('Basket item removed', { itemId });
  }

  addOneItem(item: BasketItemEntity): void {
    Logger.log('Add basket item', { item });

    const index = this.findItemIndex(item.id);
    if (index === -1) {
      this.items.push(item);
    } else {
      this.items[index] = this.items[index].increaseQuantity();
    }

    Logger.log('Basket item added', { item });
  }

  computeShippingCost() {
    Logger.log('Compute shipping cost');

    const hasNewProduct = this.items.some((i) => i.isNew);
    if (hasNewProduct) {
      this.freeShipping = false;
    } else {
      const sumProduct = BasketItemEntity.addPrice(this.items);
      this.freeShipping = sumProduct > 5000;
    }

    Logger.log('Shipping cost computed', { freeShipping: this.freeShipping });
  }

  private findItemIndex(itemId: string): number {
    return this.items.findIndex((i) => i.id === itemId);
  }

  serialize(): BasketDto {
    // TODO better serialization
    return this;
  }
}

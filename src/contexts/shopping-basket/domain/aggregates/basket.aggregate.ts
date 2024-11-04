import { Logger } from '@nestjs/common';
import { BasketItemEntity } from '../entities/basket-item.entity';
import { AttributesOnly } from '@shared/types/attributes-only';
import { BasketDto } from '@contexts/shopping-basket/drivers/rest/basket.dto';

export class BasketAggregate {
  id!: string;
  items!: BasketItemEntity[];
  freeShipping: any;

  private constructor(value: AttributesOnly<BasketAggregate>) {
    this.id = value.id;
    this.items = value.items;
    this.freeShipping = value.freeShipping;
  }

  static create(
    basket: Partial<AttributesOnly<BasketAggregate>>,
  ): BasketAggregate {
    Logger.log('Create basket');

    const basketAggregate = new BasketAggregate({
      id: basket.id,
      items: basket.items ?? [],
      freeShipping: basket.freeShipping ?? false,
    });

    Logger.log('Basket created');

    return basketAggregate;
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

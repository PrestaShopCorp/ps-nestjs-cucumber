import { BasketAggregate } from '../aggregates/basket.aggregate';
import { BasketItemEntity } from '../entities/basket-item.entity';
import { BasketRepository } from '../ports/basket.repository';

export interface AddOneBasketItemCommand {
  basketId: string;
  itemId: string;
}

export const addOneBasketItem = async (
  command: AddOneBasketItemCommand,
  services: { basketRepository: BasketRepository },
): Promise<BasketAggregate> => {
  const { basketRepository } = services;
  const { basketId, itemId } = command;

  const basket = await basketRepository.getById(basketId);
  // TODO replace by repository call to retrieve the price
  const item = new BasketItemEntity(itemId, 3499, 1);

  basket.addOneItem(item);

  await basketRepository.save(basket);

  return basket;
};

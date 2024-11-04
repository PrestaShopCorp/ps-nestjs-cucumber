import { BasketAggregate } from '../aggregates/basket.aggregate';
import {
  BasketItemEntity,
  getPriceFromId,
} from '../entities/basket-item.entity';
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
  // TODO improve this by retrieving the price from a product context, a PIM for example
  const itemPrice = getPriceFromId(itemId);
  const item = new BasketItemEntity(itemId, itemPrice, 1);

  basket.addOneItem(item);

  await basketRepository.save(basket);

  return basket;
};

import { BasketAggregate } from '../aggregates/basket.aggregate';
import { BasketRepository } from '../ports/basket.repository';

export const createBasket = async (
  basket: { id: string },
  services: {
    basketRepository: BasketRepository;
  },
): Promise<BasketAggregate> => {
  const { basketRepository } = services;

  const basketAggregate = BasketAggregate.create(basket);

  await basketRepository.save(basketAggregate);

  return basketAggregate;
};

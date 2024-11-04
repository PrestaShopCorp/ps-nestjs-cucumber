import { BasketAggregate } from '../aggregates/basket.aggregate';
import { BasketRepository } from '../ports/basket.repository';

export interface ComputeBasketShippingCostCommand {
  basketId: string;
}

export const computeBasketShippingCost = async (
  command: ComputeBasketShippingCostCommand,
  services: {
    basketRepository: BasketRepository;
  },
): Promise<BasketAggregate> => {
  const { basketRepository } = services;
  const { basketId } = command;

  const basket = await basketRepository.getById(basketId);

  basket.computeShippingCost();

  await basketRepository.save(basket);

  return basket;
};

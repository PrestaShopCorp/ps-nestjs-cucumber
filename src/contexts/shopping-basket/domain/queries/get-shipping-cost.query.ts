import { ShippingCostDto } from '@contexts/shopping-basket/drivers/rest/shipping-cost.dto';
import { BasketRepository } from '../ports/basket.repository';

export interface GetShippingCostQuery {
  basketId: string;
}

export const getShippingCost = async (
  command: GetShippingCostQuery,
  services: { basketRepository: BasketRepository },
): Promise<ShippingCostDto> => {
  const { basketRepository } = services;
  const { basketId } = command;

  const basket = await basketRepository.getById(basketId);

  return { isFree: basket.freeShipping };
};

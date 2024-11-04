import { BasketRepository } from '@contexts/shopping-basket/domain/ports/basket.repository';
import { computeBasketShippingCost } from '@contexts/shopping-basket/domain/use-cases/compute-basket-shipping-cost.command';
import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ShippingCostDto } from './shipping-cost.dto';
import { getShippingCost } from '@contexts/shopping-basket/domain/queries/get-shipping-cost.query';

@Controller('basket/:basketId')
export class BasketShippingCostController {
  constructor(
    @Inject(BasketRepository)
    private readonly basketRepository: BasketRepository,
  ) {}

  @Get('shipping-cost')
  async getShippingCost(
    @Param('basketId') basketId: string,
  ): Promise<ShippingCostDto> {
    const shippingCost = await getShippingCost(
      { basketId },
      { basketRepository: this.basketRepository },
    );

    return shippingCost;
  }

  @Post('shipping-cost')
  async computeShippingCost(
    @Param('basketId') basketId: string,
  ): Promise<ShippingCostDto> {
    const basket = await computeBasketShippingCost(
      { basketId },
      { basketRepository: this.basketRepository },
    );

    return { isFree: basket.freeShipping };
  }
}

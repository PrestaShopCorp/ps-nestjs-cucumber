import { BasketRepository } from '@contexts/shopping-basket/domain/ports/basket.repository';
import { addOneBasketItem } from '@contexts/shopping-basket/domain/use-cases/add-one-basket-item.command';
import { createBasket } from '@contexts/shopping-basket/domain/use-cases/create-basket.command';
import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { BasketDto } from './basket.dto';

@Controller('basket')
export class BasketController {
  constructor(
    @Inject(BasketRepository)
    private readonly basketRepository: BasketRepository,
  ) {}

  @Post('')
  async createBasket(
    @Body() basketPayload: { id: string },
  ): Promise<BasketDto> {
    const basket = await createBasket(
      { id: basketPayload.id },
      {
        basketRepository: this.basketRepository,
      },
    );

    return basket.serialize();
  }

  @Post(':basketId/item')
  async addOneItemToBasket(
    @Param('basketId') basketId: string,
    @Body() item: { id: string },
  ): Promise<BasketDto> {
    const basket = await addOneBasketItem(
      { basketId, itemId: item.id },
      {
        basketRepository: this.basketRepository,
      },
    );

    return basket.serialize();
  }
}

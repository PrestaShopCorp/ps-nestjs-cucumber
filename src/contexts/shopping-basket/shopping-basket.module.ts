import { Module } from '@nestjs/common';
import { BasketRepository } from './domain/ports/basket.repository';
import { Provider } from '@nestjs/common';
import { BasketController } from './drivers/rest/basket.controller';
import { BasketShippingCostController } from './drivers/rest/basket-shipping-cost.controller';
import { BasketPostgresRepository } from './adapters/basket-postgres.repository';

const controllers = [BasketController, BasketShippingCostController];

const repositories: Provider[] = [
  // { provide: BasketRepository, useClass: BasketInMemoryRepository },
  { provide: BasketRepository, useClass: BasketPostgresRepository },
];

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...repositories],
})
export class ShoppingBasketModule {}

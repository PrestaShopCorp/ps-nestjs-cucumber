import { Module } from '@nestjs/common';
import { BasketRepository } from './domain/ports/basket.repository';
import { BasketInMemoryRepository } from './adapters/basket-in-memory.repository';
import { Provider } from '@nestjs/common';
import { BasketController } from './drivers/rest/basket.controller';

const controllers = [BasketController];

const repositories: Provider[] = [
  { provide: BasketRepository, useClass: BasketInMemoryRepository },
];

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...repositories],
})
export class ShoppingBasketModule {}

import { InMemoryRepository } from '@shared/adapters/in-memory.repository';
import { BasketAggregate } from '../domain/aggregates/basket.aggregate';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BasketInMemoryRepository extends InMemoryRepository<BasketAggregate> {
  constructor() {
    super('basket');
  }
}

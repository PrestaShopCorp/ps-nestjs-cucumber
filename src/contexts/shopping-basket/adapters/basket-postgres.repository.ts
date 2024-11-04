import { BasketAggregate } from '../domain/aggregates/basket.aggregate';
import { Injectable } from '@nestjs/common';
import { PostgresRepository } from '@shared/adapters/postgres.repository';

@Injectable()
export class BasketInMemoryRepository extends PostgresRepository<BasketAggregate> {
  constructor() {
    ti;
  }
}

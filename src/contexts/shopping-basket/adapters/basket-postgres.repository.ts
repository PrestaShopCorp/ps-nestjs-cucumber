import { Injectable } from '@nestjs/common';
import {
  PostgresDatabase,
  PostgresRepository,
} from '@shared/adapters/postgres.repository';
import { InjectKysely } from 'nestjs-kysely';
import { BasketAggregate } from '../domain/aggregates/basket.aggregate';

@Injectable()
export class BasketPostgresRepository extends PostgresRepository<BasketAggregate> {
  constructor(@InjectKysely() database: PostgresDatabase) {
    super(database, 'basket');
  }

  async getById(id: string): Promise<BasketAggregate | undefined> {
    const basket = await super.getById(id);

    if (!basket) {
      return;
    }

    if (!basket.items?.length) {
      delete basket.items;
    }
    return BasketAggregate.create(basket);
  }

  async save(basket: BasketAggregate): Promise<void> {
    if (basket.items?.length === undefined) {
      basket.items = [];
    }
    await super.save({ ...basket, items: JSON.stringify(basket.items) } as any);
  }
}

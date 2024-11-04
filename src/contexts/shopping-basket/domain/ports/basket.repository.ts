import { BaseRepository } from '@shared/domain/ports/base.repository';
import { BasketAggregate } from '../aggregates/basket.aggregate';

export interface BasketRepository extends BaseRepository<BasketAggregate> {
  getById: (id: string) => Promise<BasketAggregate | undefined>;
  save(item: BasketAggregate): Promise<BasketAggregate>;
  findAll(): Promise<BasketAggregate[]>;
}

// eslint-disable-next-line no-redeclare, @typescript-eslint/no-redeclare
export const BasketRepository = Symbol('BasketRepository');

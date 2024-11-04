export interface BaseRepository<T> {
  save(item: T): Promise<T>;
  getById(id: string): Promise<T | undefined>;
  findAll(): Promise<T[]>;
}

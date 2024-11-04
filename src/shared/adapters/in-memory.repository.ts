import { Injectable, Logger } from '@nestjs/common';
import { BaseRepository } from '@shared/domain/ports/base.repository';

@Injectable()
export class InMemoryRepository<T extends { readonly id: string }>
  implements BaseRepository<T>
{
  protected readonly logger: Logger = new Logger(InMemoryRepository.name);

  private databases: Map<string, Map<string, T>> = new Map<
    string,
    Map<string, T>
  >();
  private databaseName: string;

  protected constructor(databaseName: string) {
    this.databaseName = databaseName;
    this.databases.set(databaseName, new Map<string, T>());
  }

  private getDatabase(): Map<string, T> {
    return this.databases.get(this.databaseName) as Map<string, T>;
  }

  async save(item: T): Promise<T> {
    const db = this.getDatabase();
    db.set(item.id, item);
    return item;
  }

  async getById(id: string): Promise<T | undefined> {
    const db = this.getDatabase();
    return db.get(id) ?? undefined;
  }
}

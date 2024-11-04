export interface BaseRepository<TTableTuple> {
  save(value: TTableTuple): Promise<void>;
  getById(id: string): Promise<TTableTuple | undefined>;
}

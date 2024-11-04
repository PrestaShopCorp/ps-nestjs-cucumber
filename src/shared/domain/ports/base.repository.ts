// export type Database = Record<string, Record<string, any>>;
// export type TableName<DBSchema extends Database> = keyof DBSchema;

// export type DatabaseSelectable<TDatabase extends Database> = {
//   [TableName in keyof TDatabase]: TDatabase[TableName]; // Sélection de toutes les colonnes d'une table
// };

// export type DatabaseInsertable<TDatabase extends Database> = {
//   [TableName in keyof TDatabase]: Partial<TDatabase[TableName]>;
// };

// export type DatabaseUpdateable<TDatabase extends Database> = {
//   [TableName in keyof TDatabase]: Partial<TDatabase[TableName]>;
// };

export interface BaseRepository<TTableTuple> {
  save(value: TTableTuple): Promise<void>;
  getById(id: string): Promise<TTableTuple | undefined>;
}

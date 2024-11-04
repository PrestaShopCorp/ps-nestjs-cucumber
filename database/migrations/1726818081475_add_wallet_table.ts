import { WalletStatusEnum } from '@shared/common/domain/types/wallet';
import { PayoutExecutorCountryCodeWalletEnum } from '@contexts/payingout-context/common/domain/types/country';
import { sql, type Kysely } from 'kysely';

export async function up(database: Kysely<any>): Promise<void> {
  await sql`DO $$ BEGIN
    CREATE TYPE "WalletStatus" AS ENUM (${sql.join(
      Object.values(WalletStatusEnum).map((element) => sql.lit(element)),
    )});
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;`.execute(database);

  await sql`DO $$ BEGIN
    CREATE TYPE "CountryCodeWallet" AS ENUM (${sql.join(
      Object.values(PayoutExecutorCountryCodeWalletEnum).map((element) => sql.lit(element)),
    )});
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;`.execute(database);

  await database.schema
    .createTable('wallet')
    .addColumn('id', 'varchar(50)', (col) => col.primaryKey())
    .addColumn('status', sql`"WalletStatus"`, (col) => col.notNull())
    .addColumn('addonsPartnerId', 'varchar(20)', (col) => col.notNull())
    .addColumn('email', 'text', (col) => col.notNull())
    .addColumn('country', sql`"CountryCodeWallet"`, (col) => col.notNull())
    .addColumn('payoutExecutor', 'jsonb', (col) => col.notNull())
    .addColumn('settings', 'jsonb', (col) => col.notNull())
    .addColumn('capabilities', 'jsonb')
    .addColumn('balance', 'jsonb')
    .addColumn('missingInformationAt', 'bigint')
    .addColumn('createdAt', 'bigint')
    .addColumn('metaUpdatedAt', 'timestamp')
    .addColumn('metaCreatedAt', 'timestamp')
    .execute();
}

export async function down(database: Kysely<any>): Promise<void> {
  await database.schema.dropTable('wallet').ifExists().cascade().execute();
  await database.schema.dropType('WalletStatus').ifExists().execute();
  await database.schema.dropType('CountryCodeWallet').ifExists().execute();
}

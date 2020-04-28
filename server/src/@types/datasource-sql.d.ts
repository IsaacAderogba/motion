declare module 'datasource-sql' {
  import Knex from 'knex'
  import { KeyValueCache } from 'apollo-server-caching'
  import { DataSource, DataSourceConfig } from 'apollo-datasource'

  declare module 'knex' {
    interface QueryBuilder {
      cache<TRecord, TResult>(ttl: number): QueryBuilder<TRecord, TResult>
    }
  }

  export type SQLDataSourceConfig = Knex.Config
  export type SQLDataSourceQuery = Knex.QueryBuilder

  export declare abstract class SQLDataSource<TContext = any> extends DataSource<TContext> {
    protected db: Knex
    private cache: KeyValueCache
    protected context: TContext

    constructor(knexConfig: Knex.Config)
    initialize(config: DataSourceConfig<TContext>): void
    protected cacheQuery(ttl: number, query: Knex): Knex.QueryBuilder
  }
}
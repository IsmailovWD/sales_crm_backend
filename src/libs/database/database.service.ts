import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { ClsService } from 'nestjs-cls';

import { Tenant } from '../tenancy/entities/tenant.entity';
import { TENANT_KEY } from '../tenancy/tenancy.constants';
import { DataSourceConfig } from './datasource.config';

@Injectable()
export class DatabaseService implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  private tenantConnections = new Map<string, DataSource>();
  private defaultDataSource: DataSource;

  constructor(
    @Inject(DataSourceConfig.KEY)
    private readonly dataSourceConfig: ConfigType<typeof DataSourceConfig>,
    private readonly cls: ClsService,
  ) {}

  private async initializeDefaultConnection() {
    const defaultDataSourceOptions: DataSourceOptions = {
      type: this.dataSourceConfig.type,
      host: this.dataSourceConfig.host,
      username: this.dataSourceConfig.username,
      password: this.dataSourceConfig.password,
      database: this.dataSourceConfig.database,
      port: this.dataSourceConfig.port,
      logging: this.dataSourceConfig.logging,
      entities: [__dirname + '/../tenancy/entities/*.entity{.ts,.js}'],
      migrations: [`${__dirname}/system-migrations/*{.ts,.js}`],
      migrationsRun: true,
      synchronize: false,
    };

    this.defaultDataSource = new DataSource(defaultDataSourceOptions);
    await this.defaultDataSource.initialize();
    this.logger.log('Default connection initialized');
  }

  async onModuleInit() {
    await this.initializeDefaultConnection();
    await this._createTenantConnections();
  }

  async onModuleDestroy() {
    for (const [tenantId, dataSource] of this.tenantConnections) {
      await dataSource.destroy();
      this.logger.log(`Closed connection for tenant ${tenantId}`);
    }
  }

  private _createConnectionString(tenant: Tenant): string {
    return `${this.dataSourceConfig.type}://${this.dataSourceConfig.username}:${this.dataSourceConfig.password}@${this.dataSourceConfig.host}:${this.dataSourceConfig.port}/${tenant.database_name}`;
  }

  private async _createTenantConnections() {
    const tenantRepository: Repository<Tenant> =
      this.defaultDataSource.getRepository(Tenant);
    const tenants = await tenantRepository.find();

    for (const tenant of tenants) {
      const connectionsString = this._createConnectionString(tenant);
      await this._createTenantConnection(tenant, connectionsString);
    }

    await this.defaultDataSource.destroy();
    this.logger.log('Default connection closed');
  }

  private async _createTenantConnection(
    tenant: Tenant,
    connectionString: string,
  ) {
    await this._createDatabaseIfNotExists(tenant.database_name);
    const dataSourceOptions: DataSourceOptions = {
      type: 'postgres',
      url: connectionString,
      synchronize: this.dataSourceConfig.logging,
      migrationsRun: true,
      entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
      logging: this.dataSourceConfig.logging,
      // migrations: [__dirname + '/migrations/*{.ts,.js}'],
    };

    const dataSource = new DataSource(dataSourceOptions);
    await dataSource.initialize();

    this.tenantConnections.set(tenant.hostnames, dataSource);
    this.logger.log(`Initialized connection ${tenant.database_name}`);
  }

  private async _createDatabaseIfNotExists(database: string) {
    const result = await this.defaultDataSource.query(
      `SELECT 1 FROM pg_database WHERE datname = '${database}'`,
    );

    if (!result.length) {
      this.logger.log(`Creating database ${database}`);
      await this.defaultDataSource.query(`CREATE DATABASE ${database}`);
    }
  }

  /**
   * Get the data source for the current tenant
   */
  getDataSource() {
    const tenantId = this.cls.get(TENANT_KEY);
    const connection = this.tenantConnections.get(tenantId);
    if (!connection) {
      throw new Error(`No connection found for tenant 🆔 ${tenantId}`);
    }

    return connection;
  }
}

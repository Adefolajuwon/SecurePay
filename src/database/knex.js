import knex from 'knex';
import config from '../config/database.js';

export const db = knex({
	client: config.DB_CONNECTION || 'mysql',
	connection: {
		host: config.DB_HOST || '127.0.0.1',
		port: config.DB_PORT || 3306,
		user: config.username || 'root',
		password: config.password || '',
		database: config.database || 'default',
	},
	migrations: {
		tableName: 'knex_migrations',
	},
});

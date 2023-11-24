// Update with your config settings.

import config from './src/config/database.js';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
	client: 'pg',
	connection: {
		host: config.DB_HOST,
		port: 5432,
		user: config.username || 'root',
		password: config.password || '',
		database: config.database || 'default',
	},
	migrations: {
		tableName: 'knex_migrations',
	},
};
export const staging = {
	client: 'postgresql',
	connection: {
		database: 'my_db',
		user: 'username',
		password: 'password',
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		tableName: 'knex_migrations',
	},
};
export const production = {
	client: 'postgresql',
	connection: {
		database: 'my_db',
		user: 'username',
		password: 'password',
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		tableName: 'knex_migrations',
	},
};

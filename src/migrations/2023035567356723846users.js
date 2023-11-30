/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.createTable('users', function (table) {
		table.bigIncrements('id').unsigned().primary();
		table.string('email').unique().notNullable();
		table.string('password').notNullable();
		table
			.decimal('account_balance', 19, 4)
			.unsigned()
			.notNullable()
			.defaultTo(0);
		table.timestamps(true, true);
	});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.dropTableIfExists('users');
}

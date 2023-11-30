/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.createTable('transfers', function (table) {
		table.bigIncrements('id').unsigned().primary();
		table
			.bigInteger('credit_id')
			.unsigned()
			.references('id')
			.inTable('transactions')
			.onDelete('SET NULL'); // Changed 'set null' to 'SET NULL'
		table
			.bigInteger('debit_id')
			.unsigned()
			.references('id')
			.inTable('transactions')
			.onDelete('SET NULL'); // Changed 'set null' to 'SET NULL'
		table.decimal('amount', 19, 4).notNullable();
		table.timestamps(true, true);
	});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.dropTableIfExists('transfers'); // Changed to 'dropTableIfExists'
}

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('recipient_id')
        .unsigned()
        .references('id')
        .inTable('recipients')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('deliveryman_id')
        .unsigned()
        .references('id')
        .inTable('deliverymans')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .notNullable()
      table.integer('signature_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('product').notNullable()
      table.date('canceled_at')
      table.date('start_date')
      table.date('end_date ')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema

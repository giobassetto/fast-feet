'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeliverymanSchema extends Schema {
  up () {
    this.create('deliverymans', (table) => {
      table.increments()
      table.string('name').notNullable()
      table
        .integer('avatar_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('email')
      table.timestamps()
    })
  }

  down () {
    this.drop('deliverymans')
  }
}

module.exports = DeliverymanSchema

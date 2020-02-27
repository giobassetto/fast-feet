'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RecipientSchema extends Schema {
  up () {
    this.create('recipients', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('street').notNullable()
      table.integer('number').notNullable()
      table.string('complement').nullable()
      table.string('uf').notNullable()
      table.string('city').notNullable()
      table.string('cep').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('recipients')
  }
}

module.exports = RecipientSchema

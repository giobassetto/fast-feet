'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Deliveryman extends Model {
  static get table () {
    return 'deliverymans'
  }

  file () {
    return this.belongsTo('App/Models/File', 'avatar_id', 'id')
  }
}

module.exports = Deliveryman

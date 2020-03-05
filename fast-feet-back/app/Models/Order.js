'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  static get table () {
    return 'orders'
  }

  deliveryman () {
    return this.hasOne('App/Models/Deliveryman', 'deliveryman_id', 'id')
  }

  recipient () {
    return this.hasOne('App/Models/Recipient', 'recipient_id', 'id')
  }

  file () {
    return this.hasOne('App/Models/File', 'signature_id', 'id')
  }
}

module.exports = Order

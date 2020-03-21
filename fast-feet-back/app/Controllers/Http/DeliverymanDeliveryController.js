'use strict'

const Deliveryman = use('App/Models/Deliveryman')
const Order = use('App/Models/Order')

class DeliverymanDeliveryController {
  async index ({ request, response, params }) {
    const deliveryman = await Deliveryman.find(params.id)
    if (!deliveryman) {
      response.status(422).json({ message: 'Deliveryman not exists' })
    }

    if (JSON.parse(request.qs.delivered)) {
      const deliveries = await Order.query().where('deliveryman_id', '=', params.id).whereNotNull('end_date').fetch()

      return deliveries
    }

    const deliveries = await Order.query().where('deliveryman_id', '=', params.id).whereNull('end_date').whereNull('canceled_at').fetch()

    return deliveries
  }
}

module.exports = DeliverymanDeliveryController

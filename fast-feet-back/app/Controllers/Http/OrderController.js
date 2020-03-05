'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Order = use('App/Models/Order')
const Deliveryman = use('App/Models/Deliveryman')
const Mail = use('Mail')
const { validateAll } = use('Validator')
const Helpers = use('Helpers')

class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    const orders = await Order.query().with('deliveryman').with('recipient').fetch()

    return orders
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const rules = {
      recipient_id: 'required',
      deliveryman_id: 'required',
      product: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return response.status(422).json(validation.messages())
    }

    const order = await Order.create(request.all())

    const deliveryman = await Deliveryman.find(order.deliveryman_id)

    await Mail.send(['emails.info_deliveryman'], { deliveryman: deliveryman.name }, message => {
      message
        .embed(Helpers.resourcesPath('logo.png'), 'logo')
        .to(deliveryman.email)
        .from('naoresponda@fastfeet.com')
        .subject('Nova encomenda')
    })

    return order
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    const order = await Order.findOrFail(params.id)

    return order
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const rules = {
      recipient_id: 'required',
      deliveryman_id: 'required',
      product: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return response.status(422).json(validation.messages())
    }

    const order = await Order.findOrFail(params.id)

    await order.merge(request.all())

    return order
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const order = await Order.findOrFail(params.id)

    await order.delete()

    return order
  }
}

module.exports = OrderController

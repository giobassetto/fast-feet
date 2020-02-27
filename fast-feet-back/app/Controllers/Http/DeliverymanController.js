'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validateAll } = use('Validator')
const Deliveryman = use('App/Models/Deliveryman')

class DeliverymanController {
  /**
   * Show a list of all deliverymans.
   * GET deliverymans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const deliverymans = await Deliveryman.query().with('file').fetch()

    return deliverymans
  }

  /**
   * Create/save a new deliveryman.
   * POST deliverymans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['name', 'avatar_id', 'email'])
    const rules = {
      name: 'required',
      email: 'required'
    }

    const validation = await validateAll(data, rules)

    if (validation.fails()) {
      return response.status(422).json(validation.messages())
    }

    const deliveryman = await Deliveryman.create(data)

    return deliveryman
  }

  /**
   * Display a single deliveryman.
   * GET deliverymans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const deliveryman = await Deliveryman.findOrFail(params.id)

    await deliveryman.load('file')

    return deliveryman
  }

  /**
   * Update deliveryman details.
   * PUT or PATCH deliverymans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only(['name', 'avatar_id', 'email'])
    const rules = {
      name: 'required',
      email: 'required'
    }

    const validation = await validateAll(data, rules)

    if (validation.fails()) {
      return response.status(422).json(validation.messages())
    }

    const deliveryman = await Deliveryman.findOrFail(params.id)

    deliveryman.merge(data)

    await deliveryman.save()

    return deliveryman
  }

  /**
   * Delete a deliveryman with id.
   * DELETE deliverymans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const deliveryman = await Deliveryman.findOrFail(params.id)

    await deliveryman.delete()
  }
}

module.exports = DeliverymanController

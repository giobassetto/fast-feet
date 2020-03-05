'use strict'

const Recipient = use('App/Models/Recipient')
const { validateAll } = use('Validator')

class RecipientController {
  async index () {
    const recipients = await Recipient.query().fetch()

    return recipients
  }

  async show ({ params }) {
    const recipient = await Recipient.find(params.id)

    return recipient
  }

  async store ({ request, response }) {
    const rules = {
      name: 'required',
      street: 'required',
      number: 'required',
      uf: 'required',
      city: 'required',
      cep: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return response.status(422).json(validation.messages())
    }

    const recipient = await Recipient.create(request.all())

    return recipient
  }

  async update ({ params, request, response }) {
    const rules = {
      name: 'required',
      street: 'required',
      number: 'required',
      uf: 'required',
      city: 'required',
      cep: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return response.status(422).json(validation.messages())
    }

    const recipient = await Recipient.findOrFail(params.id)

    await recipient.merge(request.all())

    return recipient
  }

  async destroy ({ params }) {
    const recipient = await Recipient.find(params.id)

    await recipient.delete()

    return recipient
  }
}

module.exports = RecipientController

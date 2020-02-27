'use strict'

const Recipient = use('App/Models/Recipient')
const { validateAll } = use('Validator')

class RecipientController {
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
}

module.exports = RecipientController


const { test, trait } = use('Test/Suite')('Orders')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

trait('Test/ApiClient')
trait('Auth/Client')

const Factory = use('Factory')
const User = use('App/Models/User')

test('Criar encomenda', async ({ client, assert }) => {
  const user = await User.findOrFail(1)

  const deliveryman = await Factory.model('App/Models/Deliveryman').create()

  const recipient = await Factory.model('App/Models/Recipient').create()

  const response = await client.post('/orders').loginVia(user).send({
    recipient_id: recipient.id,
    deliveryman_id: deliveryman.id,
    product: 'Celular Xiaomi'
  }).end()

  response.assertStatus(200)
  assert.exists(response.body)
})

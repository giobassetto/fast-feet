const { test, trait } = use('Test/Suite')('Orders')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

trait('Test/ApiClient')
trait('Auth/Client')

const Factory = use('Factory')
const User = use('App/Models/User')
const Order = use('App/Models/Order')
const Mail = use('Mail')

test('Criar encomenda', async ({ client, assert }) => {
  const user = await User.find(1)

  const deliveryman = await Factory.model('App/Models/Deliveryman').create()

  const recipient = await Factory.model('App/Models/Recipient').create()

  Mail.fake()

  const response = await client
    .post('/orders')
    .loginVia(user)
    .send({
      recipient_id: recipient.id,
      deliveryman_id: deliveryman.id,
      product: 'Celular Xiaomi'
    })
    .end()

  const recentEmail = Mail.pullRecent()

  assert.equal(recentEmail.message.to[0].address, deliveryman.email)

  response.assertStatus(200)
  assert.exists(response.body)
})

test('Listar encomendas', async ({ client, assert }) => {
  const user = await User.find(1)

  const response = await client
    .get('/orders')
    .loginVia(user)
    .send()
    .end()

  response.assertStatus(200)
  assert.exists(response.body)
})

test('Listar uma encomenda por id', async ({ client, assert }) => {
  const user = await User.find(1)

  const response = await client
    .get('/orders/1')
    .loginVia(user)
    .send()
    .end()

  response.assertStatus(200)
  assert.exists(response.body)
})

test('Atualizar encomenda', async ({ client, assert }) => {
  const user = await User.find(1)

  const order = await Order.find(1)

  const response = await client
    .put(`/orders/${order.id}`)
    .loginVia(user)
    .send({
      deliveryman_id: order.deliveryman_id,
      recipient_id: order.recipient_id,
      product: 'Ipad Pro 2'
    })
    .end()

  response.assertStatus(200)
  assert.exists(response.body)
})

test('Apagar encomenda', async ({ client, assert }) => {
  const user = await User.find(1)

  const response = await client
    .delete('/orders/1')
    .loginVia(user)
    .send()
    .end()

  response.assertStatus(200)
  assert.exists(response.body)
})

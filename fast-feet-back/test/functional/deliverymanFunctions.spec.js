const { test, trait } = use('Test/Suite')('Deliveryman Functions')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

trait('Test/ApiClient')
trait('Auth/Client')

const User = use('App/Models/User')

test('Listar encomendas não entregues', async ({ client, assert }) => {
  const user = await User.find(1)

  const response = await client
    .get('/deliverymans/1/deliveries?delivered=false')
    .loginVia(user)
    .send()
    .end()

  response.assertStatus(200)
  assert.exists(response.body)
})

test('Listar encomendas entregues', async ({ client, assert }) => {
  const user = await User.find(1)

  const response = await client
    .get('/deliverymans/1/deliveries?delivered=true')
    .loginVia(user)
    .send()
    .end()

  response.assertStatus(200)
  assert.exists(response.body)
})


const { test, trait } = use('Test/Suite')('Deliveryman')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

trait('Test/ApiClient')
trait('Auth/Client')

const Factory = use('Factory')
const Helpers = use('Helpers')
const User = use('App/Models/User')

test('Criar entregador', async ({ client, assert }) => {
  const { id } = await client.post('/uploads').attach('file', Helpers.resourcesPath('test_image.png')).end()

  const user = await User.find(1)

  const response = await client.post('/deliverymans').loginVia(user).send({
    name: 'Um nome qualquer',
    avatar_id: id,
    email: 'joaodasneves@gmail.com'
  }).end()

  response.assertStatus(200)
  assert.exists(response.body)
})

test('Atualizar entregador', async ({ client, assert }) => {
  const user = await User.find(1)

  const deliveryman = await Factory
    .model('App/Models/Deliveryman')
    .create()

  const response = await client.put(`/deliverymans/${deliveryman.id}`).loginVia(user).send({
    name: 'Nome de teste',
    avatar_id: deliveryman.avatar_id,
    email: deliveryman.email
  })
    .end()

  response.assertStatus(200)
  assert.exists(response.body)
})

test('Remover entregador', async ({ client }) => {
  const user = await User.find(1)

  const deliveryman = await Factory
    .model('App/Models/Deliveryman')
    .create()

  const response = await client.delete(`/deliverymans/${deliveryman.id}`).loginVia(user).end()

  response.assertStatus(204)
})

test('Listar todos entregadores', async ({ client, assert }) => {
  const user = await User.findOrFail(1)

  await Factory
    .model('App/Models/Deliveryman')
    .create()

  const response = await client.get('/deliverymans').loginVia(user).end()

  response.assertStatus(200)
  assert.exists(response.body)
})

test('Listar entregador por id', async ({ client, assert }) => {
  const user = await User.findOrFail(1)

  const deliveryman = await Factory
    .model('App/Models/Deliveryman')
    .create()

  const response = await client.get(`/deliverymans/${deliveryman.id}`).loginVia(user).end()

  response.assertStatus(200)
  assert.exists(response.body)
})

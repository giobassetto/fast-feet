
const { test, trait } = use('Test/Suite')('Recipient')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

trait('Test/ApiClient')
trait('Auth/Client')

const User = use('App/Models/User')
const Recipient = use('App/Models/Recipient')

test('Cadastrar novo recipient', async ({ client, assert }) => {
  let user = await User.find(1)

  if (user === null) {
    user = await User.find(1)
  }

  const response = await client
    .post('/recipients')
    .loginVia(user)
    .send({
      name: 'Giovanni',
      street: 'Rua 1299',
      number: '22',
      uf: 'PR',
      city: 'Itambaracá',
      cep: '86375000'
    })
    .end()

  response.assertStatus(200)
})

test('Listar recipients', async ({ client, assert }) => {
  const user = await User.find(1)

  const response = await client
    .get('/recipients')
    .loginVia(user)
    .send()
    .end()

  response.assertStatus(200)
  assert.exists(response.body)
})

test('Listar recipient por id', async ({ client, assert }) => {
  const user = await User.find(1)

  const response = await client
    .get('/recipients/1')
    .loginVia(user)
    .send()
    .end()

  response.assertStatus(200)
  assert.exists(response.body)
})

test('Atualizar recipient', async ({ client, assert }) => {
  const user = await User.find(1)
  const recipient = await Recipient.find(1)

  const response = await client
    .put(`/recipients/${recipient.id}`)
    .loginVia(user)
    .send({
      name: 'Giovanni Bassetto',
      street: 'Rua 1550',
      number: recipient.number,
      uf: recipient.uf,
      city: recipient.city,
      cep: recipient.cep
    })
    .end()

  response.assertStatus(200)
  assert.exists(response.body)
})

test('Excluir recipient', async ({ client, assert }) => {
  const user = await User.find(1)

  const response = await client
    .delete('/recipients/1')
    .loginVia(user)
    .send()
    .end()

  response.assertStatus(200)
  assert.exists(response.body)
})

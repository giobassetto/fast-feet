
const { test, trait } = use('Test/Suite')('Recipient')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

trait('Test/ApiClient')
trait('Auth/Client')

const Factory = use('Factory')

test('Cadastrar novo recipient', async ({ client, assert }) => {
  const user = await Factory
    .model('App/Models/User')
    .create()

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

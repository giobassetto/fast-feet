
const { test, trait } = use('Test/Suite')('Recipient')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

trait('Test/ApiClient')
trait('Auth/Client')

const User = use('App/Models/User')

test('Cadastrar novo recipient', async ({ client, assert }) => {
  const user = await User.findOrFail(1)

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

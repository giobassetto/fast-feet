
const { test, trait } = use('Test/Suite')('Session')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

trait('Test/ApiClient')

test('Login na aplicação', async ({ client, assert }) => {
  const response = await client.post('/sessions').send({
    email: 'admin@fastfeet.com',
    password: '123456'
  }).end()

  response.assertStatus(200)
  assert.exists(response.body.token)
})

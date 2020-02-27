
const { test, trait } = use('Test/Suite')('Upload')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

trait('Test/ApiClient')
trait('Auth/Client')

const Helpers = use('Helpers')
const User = use('App/Models/User')

test('Upload de imagem', async ({ client, assert }) => {
  const user = await User.findOrFail(1)
  const response = await client.post('/uploads').loginVia(user).attach('file', Helpers.resourcesPath('test_image.png')).end()

  response.assertStatus(200)
  assert.exists(response.body.file)
})

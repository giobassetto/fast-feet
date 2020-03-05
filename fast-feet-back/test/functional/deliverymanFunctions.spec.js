const { test, trait } = use('Test/Suite')('Deliveryman Functions')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

trait('Test/ApiClient')
trait('Auth/Client')

const User = use('App/Models/User')

test('Listar encomendas', async ({ client, assert }) => {
  const user = await User.find(1)
})

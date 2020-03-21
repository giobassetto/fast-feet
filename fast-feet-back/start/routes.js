'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/sessions', 'SessionController.store')

Route.group(() => {
  Route.post('/uploads', 'FileController.store')
  Route.resource('/recipients', 'RecipientController').apiOnly()
  Route.resource('/deliverymans', 'DeliverymanController').apiOnly()
  Route.resource('/orders', 'OrderController').apiOnly()
  Route.get('/deliverymans/:id/deliveries', 'DeliverymanDeliveryController.index')
}).middleware('auth')

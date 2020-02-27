'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    User.create({
      name: 'Distruidora FastFeet',
      email: 'admin@fastfeet.com',
      password: '123456'
    })
  }
}

module.exports = UserSeeder

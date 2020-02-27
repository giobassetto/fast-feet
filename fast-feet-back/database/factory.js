'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    email: faker.email(),
    password: faker.string(),
    ...data
  }
})

Factory.blueprint('App/Models/Deliveryman', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    email: faker.email(),
    ...data
  }
})

Factory.blueprint('App/Models/Recipient', (faker, i, data = {}) => {
  return {
    name: faker.sentence(),
    street: faker.email(),
    number: faker.natural({ min: 1, max: 5 }),
    uf: faker.state(),
    city: faker.city(),
    cep: faker.zip(),
    ...data
  }
})

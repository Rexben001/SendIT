exports.seed = function(knex, Promise) {
  return knex('shows').del() // Deletes ALL existing entries
    .then(function() { // Inserts seed entries one by one in series
      return knex('shows').insert({
        name: 'Ben',
        email: 'rexben.rb@gmail.com',
        country: 'Laos',
        phone: "45678990",
        password: "45890tyu"
      });
    }).then(function () {
      return knex('shows').insert({
        name: 'Ben2',
        email: 'rexben.rb@gmail.com',
        country: 'Laos',
        phone: "45678990",
        password: "45890tyu"
      });
    })
};
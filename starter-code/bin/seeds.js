const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/starter-code', {
    useNewUrlParser: true
  });

const celebrities = [
    {
        name: 'John Legend',
        occupation: 'singer',
        catchPhrase: 'All men should be feminists.'
    }, 
    {
        name: 'Sarah Jessica Parker',
        occupation: 'actress',
        catchPhrase: 'When it comes to life and love, why do we believe our worst reviews?'
    },
    {
        name: 'Jamie Dorman',
        occupation: 'actor',
        catchPhrase: "I guess I'm just lucky with my genes."
    }
]

Celebrity.create(celebrities)
.then(data => {
    console.log(`Success! ${data.length} ceebrities added to the collection`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
})
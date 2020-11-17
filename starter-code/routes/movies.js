const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

router.get('/movies', (req, res) => {
  Movie.find()
  .then(movie => {
      res.render('movies/index', { movie })
  })
  .catch(err => console.log(err))
})

router.get('/movies/new', (req, res) => {
  Celebrity.find()
  .then(celebs => {
    res.render('movies/new', {celebs})
  })
  .catch(err => console.log(err))
  
})

router.get('/movies/:id', (req, res) => {
  Movie.findById(req.params.id).populate('cast')
  .then(movie => {
      res.render('movies/show', { movie })
  })
  .catch(err => console.log(err))
})

// router.get('/movies/:id/edit', (req, res) => {
//   Movie.findById(req.params.id)
//   .then((movie) => {
//     Celebrity.find()
//     .then (celebs => {
//       res.render('movies/edit', { movie, celebs })
//     })
//   })
//   .catch(err => console.log(err))
// })

router.get('/movies/:id/edit', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  const celebs = await Celebrity.find();
  res.render('movies/edit', { movie, celebs })
})

router.post('/movies/:id/edit', (req, res) => {
  const { title, genre, plot, cast } = req.body
  console.log(req.body)
  Movie.findByIdAndUpdate(req.params.id, {
    title,
    genre,
    plot
  })
  .then((movie) => {
    console.log(`${movie.title} was updated`);
    res.redirect(`movies/${movie.id}`)
  })
  .catch(err => console.log(err))
})

router.post('/movies', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title,
    genre,
    plot,
    cast,
  })
  .then(movie => {
    console.log(`${movie.title} was added to the database`);
    res.redirect(`movies/${movie.id}`)
  })
  .catch(err => console.log(err))
})

module.exports = router;
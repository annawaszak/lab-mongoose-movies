const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

//render Celebrities page
router.get('/celebrities', (req, res) => {
    Celebrity.find()
    .then(celeb => {
        res.render('celebrities/index', { celeb })
    })
    .catch(err => console.log(err))
})

router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new')
})

//render Celebrity details Page
router.get('/celebrities/:id', (req, res) => {
    Celebrity.findById(req.params.id)
    .then(celeb => {
        res.render('celebrities/show', { celeb })
    })
    .catch(err => console.log(err))
})

router.get('/celebrities/delete/:id', (req, res) => {
    Celebrity.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/celebrities')
    })
    .catch(err => console.log(err))
})

router.get('/celebrities/edit/:id', (req, res) => {
    Celebrity.findById(req.params.id)
    .then (celeb => {
        res.render('celebrities/edit', { celeb })
    })
    .catch(err => console.log(err))

})

router.post('/celebrities/edit/:id', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.findByIdAndUpdate(req.params.id, {
        name,
        occupation,
        catchPhrase 
    })
    .then (celeb => {
        res.redirect(`/celebrities/${celeb.id}`)
    })
    .catch(err => console.log(err))

})

router.post('/celebrities', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({
        name,
        occupation,
        catchPhrase
    })
    .then(celeb => {
        console.log(`${celeb.name} was added to the database`);
        res.redirect(`celebrities/${celeb.id}`)
    })
    .catch(err => console.log(err))
})

module.exports = router;
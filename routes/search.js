const express = require('express');
const router = express.Router();
const movies = require('../data/movies');
const people = require('../data/people');


const queryRequired = (req, res, next) => {
    const searchTerm = req.query.query;
    if (!searchTerm) {
        res.json({msg: "Search term is required"})
    } else {
        //res.json("Searching....")
        next()
    }    
}

router.use(queryRequired);

router.get('/movie', (req, res, next) => {
    const searchTerm = req.query.query.toLowerCase();

    const results = movies.filter((movie) => {
        let overview = movie.overview.toLowerCase();
        let title = movie.title.toLowerCase();
        return overview.includes(searchTerm) || title.includes(searchTerm);
    })

    res.json({results})
})

router.get('/person', (req, res, next) => {
    const searchTerm = req.query.query.toLowerCase();

    const results = people.filter((person) => {
        let name = person.name.toLowerCase();
        return name.includes(searchTerm);
    })

    res.json({results})
})

module.exports = router;
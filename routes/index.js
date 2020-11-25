var express = require('express');
var router = express.Router();
const movies = require('../data/movies');
const apiKey = require('../data/apiKey');

/* GET home page. */
router.get('/most_popular', function(req, res, next) {
    let page = req.query.page;
    if (page === undefined) {page = 0};

    let results = movies.filter((movie) => {
        return movie.most_popular
    })

    const indexToStart = (page - 1) * 20;
    results = results.slice(indexToStart, indexToStart+19);

    res.json({
        page: page,
        results: results
    })
});

module.exports = router;

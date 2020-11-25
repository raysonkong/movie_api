const express = require('express');
const router = express.Router();
const movieDetails = require('../data/movieDetails');

const requireJSON = (req, res, next) => {
    if (!req.is('application/json')) {
        res.json({msg: "Content type must be application/json"});
    } else {
        //res.json('Header content type ok!');
        next();
    }
}

router.param(('movieId'), (req, res, next) => {
    console.log("Movie Id param hit");
    next();

})

router.get('/top_rated', (req, res, next) => {
    let page = req.query.page;

    if (!page) { page = 1};
    const results = movieDetails.sort((a,b) => {
        return b.vote_average - a.vote_average;
    })

    let indexToStart = (page - 1) * 20;
    res.json(results.slice(indexToStart, indexToStart+19));

})

router.get('/:movieId', (req, res, next) => {
    const movieId = req.params.movieId;
    const results = movieDetails.find((movie) => {
        return movie.id === Number(movieId);
    })

    if (!results) {
        res.json({
            msg: "Movie Id not found!",
            production_companies: []
        })
    } else {
        res.json(results);
    }
})

router.post("/:movieId/rating", requireJSON,(req, res, next) => {
    const movieId = req.params.movieId;
    //console.log("=== Content-Type is: ====")
    //console.log(req.get('content-type'));
    const userRating = req.body.value;
    if ((userRating < 0.5) || (userRating > 10)) {
        res.json({msg: "Rating must be between 0.5 and 10"})
    } else {
        res.json({
            status_message: "Thank you for submitting your request!",
            status_code: 200
        })
    }
})
router.delete("/:movieId/rating", requireJSON, (req, res, next) => {
    res.json({
        status_message: "Rating deleted",
        status_code: "200"
    })

})

module.exports = router;
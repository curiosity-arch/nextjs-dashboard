const express = require('express');
const router = express.Router();
const csv = require('csvtojson');
const path = require('path');
const { oneHotEncode, standardize } = require('../utils/preprocess');
const clusterData = require('../utils/clustering');

const csvFilePath = path.join(__dirname, '../movies_and_image_movies.csv');

let moviesData = [];
let clusters = [];

// Load and preprocess data on server start
(async () => {
    moviesData = await csv().fromFile(csvFilePath);

    // One-hot encode and standardize data
    oneHotEncode(moviesData, 'genre');
    oneHotEncode(moviesData, 'languages');

    const features = moviesData.map((movie) => ({
        rating_float: parseFloat(movie.rating_float || 0),
        users_rating: parseFloat(movie.users_rating || 0),
        votes: parseInt(movie.votes || 0),
        runtime: parseInt(movie.runtime || 0),
    }));

    const scaledFeatures = standardize(features);

    // Perform clustering
    clusters = clusterData(scaledFeatures, 6);
    moviesData.forEach((movie, index) => {
        movie.cluster = clusters[index];
    });
})();

router.post('/', (req, res) => {
    const { movieTitle } = req.body;

    const selectedMovie = moviesData.find((movie) => movie.title === movieTitle);
    if (!selectedMovie) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    const cluster = selectedMovie.cluster;
    const recommendations = moviesData.filter(
        (movie) => movie.cluster === cluster && movie.title !== movieTitle
    );

    res.json(recommendations.slice(0, 10));
});

module.exports = router;

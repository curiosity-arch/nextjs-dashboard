const express = require('express');
const router = express.Router();
const csv = require('csvtojson');
const path = require('path');

const csvFilePath = path.join(__dirname, './movies_and_image_movies.csv');

router.get('/', async (req, res) => {
    const movies = await csv().fromFile(csvFilePath);
    const titles = movies.map((movie) => movie.title);
    res.json(titles);
});

module.exports = router;

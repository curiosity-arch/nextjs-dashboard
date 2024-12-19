const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes
const movieRoutes = require('./movies');
const recommendRoutes = require('./recommend');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Load routes
app.use('/movies', movieRoutes);
app.use('/recommend', recommendRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const pool = require('./database/db');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/error');

const emitterRouter = require('./routes/Emitter');
const issuerRouter = require('./routes/Issuer');
const verifierRouter = require('./routes/Verifier');


app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

app.use('/emitter', emitterRouter(pool));
app.use('/issuer', issuerRouter(pool));
app.use('/verifier', verifierRouter(pool));

app.use(notFound);
app.use(errorHandler);

app.use(notFound);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
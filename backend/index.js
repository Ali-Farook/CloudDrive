const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const app = express();
const port = 5000;

connectToMongo();

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/note'));
app.use('/api', require('./routes/image'));

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`)
});
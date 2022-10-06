const express = require('express');
const bodyParser = require('body-parser');
const plansRoutes = require('./routes/plans.routes');

const app = express();

app.use(bodyParser.json());
app.use('/plans', plansRoutes);

const PORT = 3009;

app.listen(PORT, (err) => {
  console.log(`Server has started at ${PORT}`);
});
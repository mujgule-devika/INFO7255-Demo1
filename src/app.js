const express = require('express');
const bodyParser = require('body-parser');
const plansRoutes = require('./routes/plans.routes');

const app = express();

app.use(bodyParser.json());
app.set("etag", "strong")
app.use('/v1/plans', plansRoutes);

const PORT = process.env.PORT || 5009;

app.listen(PORT, (err) => {
  console.log(`Server has started at ${PORT}`);
});
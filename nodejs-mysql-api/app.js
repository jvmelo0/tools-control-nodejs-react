const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const toolRoute = require('./routes/toolsRoute');
const userRoute = require('./routes/usersRoute');
const categoryRoute = require('./routes/categoriesRoute');
const recordRoute = require('./routes/recordsRoute');

app.use(bodyParser.json());

app.use(cors())

app.use("/tool", toolRoute);
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/record", recordRoute);

module.exports = app;
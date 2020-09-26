const express = require('express');
const dotenv = require('dotenv');
const color = require('colors');
const cookieParser = require('cookie-parser');
// Routes file.
const receptions = require('./routes/reception');
const brands = require('./routes/brand');
const assuranceCompany = require('./routes/assurance-company');
const docTypes = require('./routes/doc-type');
const upload = require('./routes/upload');
const evaluation = require('./routes/evaluation');
const car = require('./routes/car');
const action = require('./routes/action');
const quoter = require('./routes/quoter');
const quotation = require('./routes/quotation');
const stage = require('./routes/stage');
const assingWork = require('./routes/assing-work');
const worker = require('./routes/worker');
const board = require('./routes/board');
const card = require('./routes/card');
const params = require('./routes/params');
const user = require('./routes/user');
const auth = require('./routes/auth');
const company = require('./routes/company');
const menu = require('./routes/menu');
const profile = require('./routes/profile');
const errorHandler = require('./middleware/error');
const dashboard = require('./routes/dashboard')

// config
dotenv.config({ path: './config/config.env' })

//db
const { connectMongoDB } = require('./db/conn');
connectMongoDB(process.env.MONGO_HOSTNAME);

const app = express();
app.use(express.json({ limit: '10mb' }));
const morgan = require('morgan');
app.use(morgan('tiny'));
app.use(cookieParser());

//Dashboard Controller
app.use('/api/v1/dashboard', dashboard);

//Profile Controller
app.use('/api/v1/profile', profile);

//Menu Controller
app.use('/api/v1/menu', menu);

//Company Controller
app.use('/api/v1/company', company);

//Auth Controller
app.use('/api/v1/auth', auth);

//User Controller
app.use('/api/v1/user', user);

//Params Controller
app.use('/api/v1/params', params);

//Reception Controller
app.use('/api/v1/card', card);

//Reception Controller
app.use('/api/v1/reception', receptions);

//Brand Controller
app.use('/api/v1/brand', brands);

//Assurance Company Controller
app.use('/api/v1/assurance-company', assuranceCompany);

//doc type Controller
app.use('/api/v1/doc-type', docTypes);

//upload doc
app.use('/api/v1/upload', upload);

//evaluations
app.use('/api/v1/evaluation', evaluation);

// Car
app.use('/api/v1/car', car);

// Actions
app.use('/api/v1/action', action);

// Quoters
app.use('/api/v1/quoter', quoter);

// Quotations
app.use('/api/v1/quotation', quotation);

// stages
app.use('/api/v1/stage', stage);

//assing-work
app.use('/api/v1/assing-work', assingWork);

// workers
app.use('/api/v1/worker', worker);

// workers
app.use('/api/v1/board', board);

app.use(errorHandler);

const port = process.env.PORT || 5000;
// app.listen(port, function () {
//   console.info(`Eleonor listening in port ${port}`.cyan.bold);
// });

const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync(process.env.CERTIFICATE_KEY_FILE),
  cert: fs.readFileSync(process.env.CERTIFICATE_PEM_FILE)
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(port, function () {
  console.info(`Eleonor listening on https in port ${port}`.cyan.bold);
});


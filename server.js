const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helpers = require('prettify');

// Grabbing our api from the distinct files
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
 
// Connecting to database
mongoose.connect('mongodb+srv://onwurahpius:' + process.env.MONGO_ATLAS_PW + '@cluster0.st1pm.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// Morgan logs our various requests on the terminal
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS handling. To allow for cross origin sharing
app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// Routes that handle requests.
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// Any request not handled by the routes is thrown as an error and the error message given
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404 ;
  next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
});






app.listen(process.env.PORT || 2000, ()=>{
  console.log('app is running');
});


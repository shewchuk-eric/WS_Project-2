const routes = require('express').Router();
const ordersController = require('../controllers/orders.js');


//routes.get('/', ordersController.awesomeFunction); // this code goes only to the first exported function regardless of the function named
//routes.get('/second', ordersController.anotherFunction); // giving a name allows drilling into file
//routes.get('/third', ordersController.thirdFunction);


module.exports = routes;


const orders = require('express').Router();
const ordersController = require('../controllers/orders.js');


orders.get('/', ordersController.listAllOrders); 
orders.post('/createOrder/', ordersController.createOrder);
orders.put('/updateOrder/:id', ordersController.updateOrder);
orders.delete('/cancelOrder/:id', ordersController.cancelOrder);
orders.patch('/updateOrderStatus/:id', ordersController.updateOrderStatus);


module.exports = orders;

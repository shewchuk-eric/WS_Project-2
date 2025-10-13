const customers = require('express').Router();
const customersController = require('../controllers/customers.js');


customers.get('/', customersController.listAllCustomers); 
customers.post('/writeNewCustomer', customersController.writeNewCustomer);
//customers.put('/updateCustomer/:id', customersController.updateCustomer);
//customers.delete('/deleteCustomer/:id', customersController.deleteCustomer);
//customers.patch('/lastOrderDate/:id', customersController.lastOrderDate);


module.exports = customers;
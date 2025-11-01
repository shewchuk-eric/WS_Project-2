const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { requireLogin, getToday } = require('../models/utilities');
const today = getToday();


const listAllOrders = async (req, res, next) => {
  let user = requireLogin(req, res, next);
  if (!user || user != 'shewchuk-eric') {
    res.status(403).json({ message: 'Forbidden. You do not have access to this resource.' });
    return;
  }
  const result = await mongodb.getDb().db('project_two').collection('orders').find({});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createOrder = async (req, res, next) => {
    if (!req.body.customerId) {
    res.status(400).json({ message: 'You must be signed in to order' });
    return;
  }
    if (!req.body.crust || !req.body.sauce || !req.body.cheese) {
    res.status(400).json({ message: 'Your order is incomplete' });
    return;
  }
  const newOrder = {
    customerId: req.body.customerId,
    crust: req.body.crust,
    sauce: req.body.sauce,
    cheese: req.body.cheese,
    vegToppings: req.body.vegToppings,
    meatToppings: req.body.meatToppings,
    orderStatus: "pending",
    orderDate: `${today}`
  };
  const response = await mongodb.getDb().db('project_two').collection('orders').insertOne(newOrder);
  if (response.acknowledged) {
    res.status(201).json('Order created');
  } else {
    res.status(500).json(response.error || 'Something went wrong with submitting the order.');
  } //updateOrderDate(req.body.customerId);
}

/* const updateOrderDate = async (req, res, customerId) => {
  const newDate = {
        lastOrderDate: `${today}`
    };
    const updateResponse = await mongodb.getDb().db('project_two').collection('customers').updateOne({ _id: customerId }, { $set: newDate });
    if (updateResponse.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(updateResponse.error || 'Some error occurred while updating the customer\'s last purchase date.');
    }
}; */

const updateOrder = async (req, res) => {
    if (!req.body.customerId) {
    res.status(400).json({ message: 'You must be signed in to order manage your orders.' });
    return;
  }
    if (!req.body.crust || !req.body.sauce || !req.body.cheese) {
    res.status(400).json({ message: 'Your order is incomplete' });
    return;
  }
  const orderId = new ObjectId(req.params.id);
  const updatedOrder = {
    customerId: req.body.customerId,
    crust: req.body.crust,
    sauce: req.body.sauce,
    cheese: req.body.cheese,
    vegToppings: req.body.vegToppings,
    meatToppings: req.body.meatToppings,
    orderStatus: "pending",
    orderDate: `${today}`
  };
  const response = await mongodb.getDb().db('project_two').collection('orders').replaceOne({ _id: orderId }, updatedOrder);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the order.');
  }
};

const cancelOrder = async (req, res) => {
  const orderId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('project_two').collection('orders').deleteOne({ _id: orderId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the order.');
  }
};

const updateOrderStatus = async (req, res) => {
  const orderId = new ObjectId(req.params.id);
  const status = {
    orderStatus: "complete"
  };
  const response = await mongodb.getDb().db('project_two').collection('orders').updateOne({ _id: orderId }, { $set: status });
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the order status.');
  }
};



module.exports = { listAllOrders, createOrder, updateOrder, cancelOrder, updateOrderStatus };
let username;

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
//const curDate = require('../models/getDate');
const { userSchema, requireLogin, getToday } = require('../models/utilities');
const today = getToday();


const listAllCustomers = async (req, res, next) => {
  let user = requireLogin(req, res, next);
  if (!user || user != 'shewchuk-eric') {
    res.status(403).json({ message: 'Forbidden. You do not have access to this resource.' });
    return;
  }
  const result = await mongodb.getDb().db('project_two').collection('customers').find({});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const writeNewCustomer = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    lastOrderDate: `${today}`
  };
  const response = await mongodb.getDb().db('project_two').collection('customers').insertOne(newUser);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Something went wrong.');
  }
};

const updateCustomer = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    lastOrderDate: req.body.lastOrderDate
  };
  const response = await mongodb.getDb().db('project_two').collection('customers').replaceOne({ _id: userId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteCustomer = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('project_two').collection('customers').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

const lastOrderDate = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const newDate = {
    lastOrderDate: `${today}`
  };
  const response = await mongodb.getDb().db('project_two').collection('customers').updateOne({ _id: userId }, { $set: newDate });
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};


module.exports = { listAllCustomers, writeNewCustomer, updateCustomer, deleteCustomer, lastOrderDate };
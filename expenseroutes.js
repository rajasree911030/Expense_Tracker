const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const expense = new Expense({ ...req.body, user: req.user._id });
    await expense.save();
    res.status(201).send(expense);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    res.send(expenses);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!expense) {
      return res.status(404).send();
    }
    res.send(expense);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).send();
    }
    res.send(expense);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

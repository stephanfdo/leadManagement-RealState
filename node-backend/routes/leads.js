const express = require('express');
const router = express.Router();
const { Lead } = require('../models');
const { Op } = require('sequelize');

// Create lead
router.post('/', async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all leads
router.get('/', async (req, res) => {
  try {
    const { type, location, minBudget, maxBudget } = req.query;
    const where = {};
    
    if (type) where.type = type;
    if (location) where.location = { [Op.iLike]: `%${location}%` };
    if (minBudget || maxBudget) {
      const priceField = type === 'seller' ? 'price' : 'budget';
      where[priceField] = {};
      if (minBudget) where[priceField][Op.gte] = minBudget;
      if (maxBudget) where[priceField][Op.lte] = maxBudget;
    }

    const leads = await Lead.findAll({ where });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update lead
router.put('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    
    await lead.update(req.body);
    res.json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete lead
router.delete('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    
    await lead.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
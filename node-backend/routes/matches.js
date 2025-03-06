const express = require('express');
const router = express.Router();
const { Lead } = require('../models');
const { generateMatches } = require('../utils/ai');

router.get('/:leadId', async (req, res) => {
  try {
    // Find the current lead
    const lead = await Lead.findByPk(req.params.leadId);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    // Fetch ALL leads
    const allLeads = await Lead.findAll();

    // Remove the current lead from all leads
    const candidates = allLeads.filter(candidate => candidate.id !== lead.id);

    // Generate matches using AI with all records
    const matches = await generateMatches(lead, candidates);
    
    res.json(matches);
  } catch (error) {
    console.error('Matches Route Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
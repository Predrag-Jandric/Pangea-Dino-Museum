const { getDinosaursFromDB } = require('../services/dinosaursService');

const getAllDinosaurs = async (req, res) => {
    try {
      const dinosaurs = await getDinosaursFromDB();
      res.json(dinosaurs);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Failed to fetch dinosaurs' });
    }
  };
  
  module.exports = { getAllDinosaurs };
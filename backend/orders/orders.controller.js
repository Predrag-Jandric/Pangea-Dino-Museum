import {addOrder} from './orders.service.js';

export const createOrder = async (req, res, next) => {
    try {
      const newOrder = req.body;
      const data = await addOrder(newOrder);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Failed to create order' });
    }
  };
  
import {addOrder} from './orders.service.js';

export const createOrder = async (req, res) => {
    try {
      const order = await addOrder();
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Failed to create order' });
    }
  };
  
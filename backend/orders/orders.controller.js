import {addOrder, addOrderItems} from './orders.service.js';

export const createOrder = async (req, res, next) => {
  const {newOrder, cart } = req.body;
    try {
      // create order
      const orderData = await addOrder(newOrder);
      // insert ordered items to DB with ID
      const orderItems = await addOrderItems(orderData.id, cart)
      res.status(201).json("orderData", orderData, "orderItems", orderItems);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Failed to create order' });
    }
  };
  
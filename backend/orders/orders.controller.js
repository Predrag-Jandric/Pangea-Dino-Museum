import { addOrder, addOrderItems, updateInStock } from "./orders.service.js";

export const createOrder = async (req, res, next) => {
  const { newOrder, cart } = req.body;

  const {first_name, last_name, email, address, total, user_id} = newOrder;

  if (!first_name || !last_name || !email || !address || !total || !user_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (isNaN(total)) {
    return res.status(400).json({ error: "Total must be a valid number" });
  }
 
  //not applicable because math isn't perfored, these entries are being replace, math/validation on frontend
  // let error = null;
  // cart.forEach(item => {
  //   if(item.quantity > item.inStock) {
  //     error = { error: "Quantity cannot be larger than inStock" };
  //   }
  // })
  
  // if(error) {
  //   return res.status(400).json(error);
  // }

  try {
    // create order
    const orderData = await addOrder(newOrder);
    // insert ordered items to DB with ID
    const orderItems = await addOrderItems(orderData.id, cart);
    // update inStock information
    const inStockData = await updateInStock(cart);

    res.status(201).json({inStockData: inStockData });
  } catch (error) {
    console.error('Error in creating order:', error);
    res
      .status(500)
      .json({ error: error.message || 'Failed to create order from functions' });
    }
};

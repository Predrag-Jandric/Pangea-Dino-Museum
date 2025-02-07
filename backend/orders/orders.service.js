import { createClient } from "@supabase/supabase-js";

//connect to database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const addOrder = async (newOrder) => {
  // add purhcase to database with customer information
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert(newOrder)
      .select()
      .single();

    // handle add purchase to DB error
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error adding order to DB:", error);
    throw new Error("Failed to add order to database");
  }
};
// add ordered items to DB using newly created orderId
export const addOrderItems = async (orderId, cart) => {
  try {
    const orderItems = cart.map((dino) => ({
      order_id: orderId,
      dino_id: dino.id,
      name: dino.name,
      price: dino.price,
      quantity: dino.quantity,
    }));

    const { data, error } = await supabase
      .from("order_items")
      .insert(orderItems)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding order items to DB:", error);
    throw new Error("Failed to add order items to database");
  }
};

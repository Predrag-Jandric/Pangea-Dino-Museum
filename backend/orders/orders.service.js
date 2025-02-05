import { createClient } from "@supabase/supabase-js";

//connect to database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const addOrder = async (newOrder) => {
  // add purhcase to database with customer information
  const { data, error } = await supabase
    .from("orders")
    .insert(newOrder)
    .select()
    .single();

  // handle add purchase to DB error
  if (error) {
    throw new Error("Error adding order to database");
  }
  return data;
};

// add ordered items to DB using newly created orderId
export const addOrderItems = async (orderId, cart) => {
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

  if (error) throw new Error("error adding ordered items to DB");
  return data;
};

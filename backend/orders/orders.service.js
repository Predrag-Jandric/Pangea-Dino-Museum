import { createClient } from '@supabase/supabase-js';

//connect to database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const addOrder = async (newOrder) => {
  // add order to DB
      // add purhcase to database with customer information
      const { data, error} = await supabase
      .from("orders")
      .insert(newOrder)
      .select()
      .single();

    // handle add purcahse to DB error
    if (error) {
      throw new Error("Error adding order to database");
    }
  return data;
};

import { createClient } from '@supabase/supabase-js';

//connect to database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const addOrder = async () => {
  // add order to DB
  return data;
};

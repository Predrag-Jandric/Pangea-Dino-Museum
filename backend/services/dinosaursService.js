const { createClient } = require('@supabase/supabase-js');

//connect to database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const getDinosaursFromDB = async () => {
  const { data, error } = await supabase.from("dinosaurs").select("*");
  
  if (error) {
    throw new Error("Error fetching dinosaurs from database");
  }
  return data;
};

module.exports = { getDinosaursFromDB };

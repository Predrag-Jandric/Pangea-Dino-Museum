import  {createClient}  from '@supabase/supabase-js';

//connect to database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export const fetchAllDinosaurs = async () => {
  const { data, error } = await supabase.from("dinosaurs").select("*");

  if (error) {
    throw new Error("Error fetching dinosaurs from database");
  }
  return data;
};

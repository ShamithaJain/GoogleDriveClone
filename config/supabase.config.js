require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Use the Service Role Key for secure file uploads
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // <-- FIXED

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials missing in .env file');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

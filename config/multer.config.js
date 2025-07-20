const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const multer = require('multer'); 
const storage = multer.memoryStorage();
const upload = multer({ storage });


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = {upload,supabase};


import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ckjpuzovketmtvbtkldt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNranB1em92a2V0bXR2YnRrbGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0OTk3MzcsImV4cCI6MjAxMjA3NTczN30.es591SA9h8Q5DoN3iHMjE5SsBXkxnZscpyM9QPRvmfk';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

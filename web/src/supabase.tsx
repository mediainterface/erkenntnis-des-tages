import { createClient } from '@supabase/supabase-js'

const projectUrl = 'https://rgqdcitvbekkcyyymoyz.supabase.co'
const anonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJncWRjaXR2YmVra2N5eXltb3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2MDgwOTYsImV4cCI6MjAyOTE4NDA5Nn0.aNWUfO43VyDuwOGZ7pszcHBCcaOj91jRGSxyCqa9rAc'

export const supabase = createClient(projectUrl, anonKey)


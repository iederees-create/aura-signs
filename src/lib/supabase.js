import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://maooygzjfpzxibujvkgb.supabase.co'
const supabaseKey = 'sb_publishable_PkwcCEKN-f3XiV1Thv7Ugw_i2uULq4g'

export const supabase = createClient(supabaseUrl, supabaseKey)

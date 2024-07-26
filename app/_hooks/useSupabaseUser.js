import { createClient } from "@/app/_lib/supabase/supabaseServer";

async function useSupabaseUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user };
}

export default useSupabaseUser;

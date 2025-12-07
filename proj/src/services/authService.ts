import { supabase } from "../supabaseClient";

export async function signUpWithEmail(email: string, password: string) {
  // sign up via Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return { success: false, message: error.message };
  return { success: true, data };
}

export async function signInWithEmail(email: string, password: string) {
  // sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { success: false, message: error.message };
  // data.session contains access_token, refresh_token, user...
  return { success: true, data };
}

export async function signOut() {
  await supabase.auth.signOut();
}

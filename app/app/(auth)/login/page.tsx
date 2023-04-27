"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

const Login = () => {
  const supabase = createBrowserSupabaseClient();

  const handleClick = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    console.log(data);
    console.log(error);
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleClick}>Login</button>
    </div>
  );
};

export default Login;

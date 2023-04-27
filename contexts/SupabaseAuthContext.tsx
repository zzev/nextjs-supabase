"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Session,
  SupabaseClient,
  User,
  createBrowserSupabaseClient,
} from "@supabase/auth-helpers-nextjs";

type SuapabaseAuthContextType = {
  supabase: SupabaseClient;
  session: null | Session;
  user?: User;
};

const SupabaseAuthContext = createContext<SuapabaseAuthContextType>(null!);

const useSupabaseAuth = () => {
  const context = useContext<SuapabaseAuthContextType>(SupabaseAuthContext);

  if (context === undefined) {
    throw new Error("useSupabaseAuth context was used outside of its Provider");
  }

  return context;
};

const SupabaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [session, setSession] = useState<null | Session>(null);
  const [user, setUser] = useState<undefined | User>(undefined);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(async (response) => {
      const {
        data: { session },
      } = response;

      setSession(session);
      setUser(session?.user);

      console.log(`useEffect 1: auth.getSession`);
      console.log(session);

      if (session) {
        console.log("Teams");
        const teams = await supabase.from("teams").select("*");
        console.log(teams);

        router.push("/");
      }
    });
  }, [router, supabase, supabase.auth]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user);

      console.log(`useEffect 2: auth.onAuthStateChange`);
      console.log(session);

      if (session) {
        router.push("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <SupabaseAuthContext.Provider value={{ supabase, user, session }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export { SupabaseAuthProvider, useSupabaseAuth };

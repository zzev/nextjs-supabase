"use client";

import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
};

export default Providers;

import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

export const revalidate = 0;

const Page = async () => {
  console.log("----> page.tsx headers() and cookies()");
  console.log(headers());
  console.log(cookies());
  console.log("<----");

  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  console.log("Teams");
  const teams = await supabase.from("teams").select("*");
  console.log(teams);

  return (
    <div>
      <div>/app/app/page.tsx</div>
      <div>App page</div>
    </div>
  );
};

export default Page;

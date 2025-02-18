import { redirect } from "next/navigation";
import { getMenu } from "~/server/queries/menus";
import { getUser } from "~/server/queries/user";

export async function GET() {
  // const searchParams = new URL(url).searchParams;
  // const token_hash = searchParams.get("token_hash");
  // const type = searchParams.get("type") as EmailOtpType;
  //
  // if (token_hash && type) {
  //   const supabase = await createClient();
  //   const { error } = await supabase.auth.verifyOtp({ type, token_hash });
  //   if (!error) redirect("/");
  // }

  const user = await getUser();
  if (!user) redirect("/error");

  const a = getMenu(new Date());

  return Response.json({
    message: "Super secret message",
    a,
  });
}

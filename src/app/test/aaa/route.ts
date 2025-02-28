import { redirect } from "next/navigation";
import { getWeeksInYear } from "~/lib/weeks";
import { getMenu, getMenusInRangeWithUserSelect } from "~/server/queries/menus";
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

  const week = getWeeksInYear(2025);
  const data = await getMenusInRangeWithUserSelect(
    user.id,
    week[7]!.start,
    week[7]!.end,
  );

  return Response.json({
    message: "Super secret message",
    week: week[7]?.start,
    data,
  });
}

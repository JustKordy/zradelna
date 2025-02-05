import { NextResponse } from "next/server";
import { createClient } from "~/lib/supabase/server";
import jwt from "jsonwebtoken";

const ALLOWED_TENANTS: string[] = [
  "534a8069-2967-42a0-a777-f1e42d3ba506", // SPŠE
  "f0d31621-d73b-4cf1-8188-27c60408b50c", // SOA
] as const;

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      // Check the tenant ID
      const providerToken = data.session.provider_token;
      if (!providerToken) throw new Error("Failed to get provider token");
      // Parse the JWT
      const tenantID = extractTenantID(providerToken);
      if (!tenantID) throw new Error("Tenant ID isn't present");
      // Check if the tenantID is allowed
      if (!ALLOWED_TENANTS.includes(tenantID))
        throw new Error("Wrong tenantID");

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

function extractTenantID(rawToken: string): string | undefined {
  const token = jwt.decode(rawToken) as { tid?: string } | null;
  return token?.tid;
}

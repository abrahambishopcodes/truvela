const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ORG_TYPES = new Set([
  "Newsroom or media",
  "Bank or fintech",
  "Telecom",
  "School or university",
  "NGO or public sector",
  "Other",
]);

// Placeholder: validates signups but does not store them yet.
// Wire this to a real store (database, Resend audience, Loops, etc.) before launch.
// Body: { email, audience?: "consumer" | "teams", orgType? (required for teams) }
export async function POST(request: Request) {
  let body: { email?: unknown; audience?: unknown; orgType?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, audience = "consumer", orgType } = body;
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }
  if (audience !== "consumer" && audience !== "teams") {
    return Response.json({ error: "Invalid audience" }, { status: 400 });
  }
  if (audience === "teams" && (typeof orgType !== "string" || !ORG_TYPES.has(orgType))) {
    return Response.json({ error: "Invalid organisation type" }, { status: 400 });
  }

  return Response.json({ ok: true });
}

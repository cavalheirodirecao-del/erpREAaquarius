import { neon } from "@neondatabase/serverless";

export default async function handler(request, response) {
  if (request.method === "GET") {
    if (!process.env.DATABASE_URL) {
      return response.status(503).json({ ok: false, error: "DATABASE_URL is not configured" });
    }
    try {
      const sql = neon(process.env.DATABASE_URL);
      const result = await sql.query("select 1 as ok");
      return response.status(200).json({ ok: result[0]?.ok === 1 });
    } catch {
      return response.status(503).json({ ok: false, error: "database unavailable" });
    }
  }
  return response.status(200).json({ service: "erp-rea-aquarius-api", status: "ready" });
}

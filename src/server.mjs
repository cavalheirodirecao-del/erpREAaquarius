import { createServer } from "node:http";
import { neon } from "@neondatabase/serverless";

const port = Number(process.env.PORT || 3000);
const databaseUrl = process.env.DATABASE_URL;
const sql = databaseUrl ? neon(databaseUrl) : null;

function json(response, status, body) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

const server = createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/health") {
    if (!sql) return json(response, 503, { ok: false, error: "DATABASE_URL is not configured" });
    try {
      const result = await sql.query("select 1 as ok");
      return json(response, 200, { ok: result[0]?.ok === 1 });
    } catch {
      return json(response, 503, { ok: false, error: "database unavailable" });
    }
  }

  if (request.method === "GET" && request.url === "/") {
    return json(response, 200, { service: "erp-rea-aquarius-api", status: "ready" });
  }

  return json(response, 404, { error: "not found" });
});

server.listen(port, () => console.log(`API listening on port ${port}`));

# ERP REA Aquarius

Minimal Neon/PostgreSQL API scaffold. Legacy binaries and reverse-engineering artifacts are intentionally excluded.

## Development

Set `DATABASE_URL` from Neon, run the SQL in `migrations/001_initial.sql` with a direct connection, then run:

```bash
npm install
npm run build
npm start
```

Health endpoint: `GET /health`.

# Basic hosting and integrations

## Vercel
Import mabrig1/GeoNexa-Africa into Vercel as a Next.js project. Deploy the feature branch as Preview until quality checks pass. Set server-only environment variables in Project Settings, not in source code.

## MongoDB Atlas
Create a least-privilege database user for the geonexa database. Add MONGODB_URI and MONGODB_DB_NAME to Vercel server environments. Allow only appropriate network access and monitor connections. The helper in lib/mongodb.ts is ready for future authenticated ticket storage; no production ticket endpoint has been enabled.

## OpenRouter
Create a key with strict spending limits. Set OPENROUTER_API_KEY and a supported OPENROUTER_MODEL in Vercel. The POST /api/ai/support route is disabled by default (ENABLE_PUBLIC_AI=false). **Do not enable publicly** until user authentication, persistent rate limiting, abuse detection and cost budgets are implemented. The route sends support questions to an external AI provider; do not submit private geological datasets or personal information.

## Required launch checks
- npm install and npm run build
- Confirm GitHub Actions succeeds
- Configure MongoDB secrets and restrict DB user privileges
- Configure OpenRouter billing limit and privacy review
- Add authentication, per-user rate limits and consent before enabling AI support
- Confirm no secrets are exposed in NEXT_PUBLIC_* variables

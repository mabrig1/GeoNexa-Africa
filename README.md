# GeoNexa Africa

Africa-focused evidence-first geoscience tools: EarthScan coordinate screening, GeoData earthquake lookup, GeoWater CSV preview, GeoMind workflow planning and GeoCare support guidance.

## Principles
- No claims of underground resource detection from imagery or AI chat alone.
- Geological sources, uncertainty, licensing and dataset provenance are essential.
- Qualified review before consequential drilling or mineral extraction decisions.
- Least privilege, private-by-default data and auditable scientific workflows.

## Stack
Next.js / TypeScript on Vercel. Future: geospatial scientific services and controlled agent orchestration.

## Current status
- EarthScan and GeoData include external geological/earthquake data query prototypes. Coverage and live data quality have not been fully validated.
- GeoWater validates CSV previews; it does not perform validated resistivity inversions.
- GeoMind offers deterministic workflow plans; **remote LLM inference remains disabled until configured**, authenticated and tested.
- A Kaggle notebook source and private hosted-LLM adapter are available as an integration preview. A Kaggle notebook is **not** a 24/7 production model API.

## Configure GeoMind cloud model (no local download)
Read [Kaggle → hosted GeoMind integration](docs/KAGGLE_GEOMIND_REMOTE_INFERENCE.md). Keep credentials in Vercel server-side environment variables, never in the Git repository or browser public assets. Use a preview environment first.

## Related documents
- [Agent governance](docs/AGENT_GOVERNANCE.md)
- [Scientific validation](docs/SCIENTIFIC_VALIDATION.md)
- [Open integrations](docs/OPEN_SOURCE_INTEGRATIONS.md)

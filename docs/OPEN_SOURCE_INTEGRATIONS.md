# Open-source geoscience integration plan

GeoNexa Africa should **integrate established scientific engines**, not copy complete applications.

| Upstream | Reusable capability | Integration | Licence consideration |
| --- | --- | --- | --- |
| [pyGIMLi](https://github.com/gimli-org/pyGIMLi) | ERT and geophysical inversion | Isolated Python scientific worker, uploaded survey inputs, reproducible output | Apache-2.0; retain notices |
| [GemPy](https://github.com/gempy-project/gempy) | 3D geological models, uncertainty | Separate Python modelling worker | EUPL-1.2; legal review before distributing modified code |
| [LoopStructural](https://github.com/Loop3D/LoopStructural) | Fault/fold modelling and model export | Optional specialist modelling adapter | Inspect exact pinned-version licence |
| [Welly](https://github.com/agilescientific/welly) | Well logs, quality checks | Borehole log import service | Inspect exact pinned-version licence |
| [Software Underground catalogue](https://github.com/softwareunderground/awesome-open-geoscience) | Discover additional open tools | Reference only | Each linked project has its own licence |

## Integration contract
Each worker receives a validated job with organization_id, project_id, input dataset versions, CRS, approved analysis type and resource budget. Workers return status, output artifact pointers, method/version, warnings and provenance. Workers never receive unrestricted database credentials.

## MVP feature sequence
1. Map and source catalogue: GeoJSON/GeoTIFF metadata, CRS and provenance, location search.
2. Borehole and field-data imports with validation and private organization workspaces.
3. pyGIMLi adapter for uploaded electrical resistivity survey data (no groundwater guarantees).
4. GemPy model creation from adequate field constraints, with uncertainty disclosure.
5. GeoMind supervised agents: discovery -> approved scientific tool -> validation -> report -> professional review.
6. GeoCare support tickets, scientific escalation and privacy/data-use policies.

## Scientific and legal guardrails
- Do not present modelled groundwater depth, mineral reserves or drill targets as verified facts.
- Require qualified review for consequential recommendations.
- Verify licence compatibility, attribution, versions and dataset rights before bundling code or redistributing data.
- Prefer invoking upstream packages as pinned dependencies instead of copying source code.
- No upstream code is copied by this planning document.
- Public datasets must be checked for licence and provenance before import.

## Acceptance tests
- Reject malformed CRS and invalid survey files.
- Prevent cross-tenant project access.
- Record every agent tool call and output provenance.
- Check deterministic numerical outputs against published benchmarks.
- Simulate worker timeout and partial failures.
- Require explicit reviewer approval before labelling reports as validated.

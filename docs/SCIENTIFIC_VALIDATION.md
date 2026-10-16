# Scientific validation and acceptance criteria
EarthScan v0 returns only a location-specific investigation checklist; it does not perform geology or groundwater inference.

## Required before predictive features
- Dataset source, licence, spatial extent, acquisition date and coordinate reference system.
- Ground-truth validation with geographically separated datasets.
- Recorded model and method versions.
- Explicit uncertainty and out-of-distribution warnings.
- Named human reviewer for consequential reports.

## API checks
POST /api/earthscan accepts finite numeric latitude [-90,90] and longitude [-180,180]. Invalid input returns HTTP 400. No geographic membership or subsurface inference is made.

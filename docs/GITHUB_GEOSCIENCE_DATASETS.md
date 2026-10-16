# GitHub geoscience dataset ingestion

## Selected licensed source
- Repository: https://github.com/fraxen/tectonicplates
- Content: Global tectonic plate boundaries and polygons in GeoJSON
- Original scientific work: Peter Bird (2003), *An updated digital model of plate boundaries*, DOI: 10.1029/2001GC000252
- Curated/conversion credits: Hugo Ahlenius / Nordpil and contributors
- Licence: Open Data Commons Attribution 1.0 (ODC-By 1.0), as stated in upstream LICENSE.md
- **Not a Nigerian lithology or groundwater dataset.** Tectonic boundaries cannot identify local aquifers, drilling sites or mineral reserves.

## Clone selected dataset
Run `bash scripts/fetch-geology-datasets.sh` from the project root. It performs a shallow sparse clone into `data/external/tectonicplates` with GeoJSON, README and licence. Review source changes and attribution before redistributing or bundling the dataset. Do not commit the full upstream Git history into this app.

## Next steps
- Validate GeoJSON geometry and coordinate reference systems.
- Review dataset version and store commit SHA in provenance metadata.
- Create server-side spatial ingestion to MongoDB geospatial collections with 2dsphere indexes.
- Add map layers only after verifying file sizes, licensing and geometry integrity.
- Source Nigerian geological maps separately from the relevant authority under an appropriate reuse licence.

This commit adds a reproducible dataset clone workflow, **not** a completed dataset import or live geological analysis.

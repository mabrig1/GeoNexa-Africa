# GeoWater CSV import — prototype

GeoWater currently parses **local browser CSV** containing two required columns:

- electrode_spacing_m: positive finite numeric values
- apparent_resistivity_ohm_m: positive finite numeric values

The interface rejects malformed data and limits files to 1 MB and 1000 measurements. Data are not uploaded to a server. The parser is intentionally simple and does not handle quoted CSV fields or locale-specific separators.

This does **not** implement resistivity inversion, groundwater detection, aquifer depth estimation or drilling recommendations. A scientific inversion requires survey geometry, electrode array, measurement error estimates and validation by a qualified geophysicist. Planned integration: pyGIMLi via an isolated Python worker.

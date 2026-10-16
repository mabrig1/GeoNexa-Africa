# GeoData: live public earthquake observations

GeoData queries the USGS Earthquake Catalog via its documented FDSN event query API. User coordinates are validated server-side. Search defaults: 100 km radius, last 365 days, maximum 100 events, descending time.

The endpoint returns a limited, normalized event list, upstream source URL and interpretation warning. No events returned does **not** mean zero seismic risk. This is an observed event catalog, not a geological or engineering hazard assessment.

Public USGS API: https://earthquake.usgs.gov/fdsnws/event/1/

Data is requested on demand and not copied into MongoDB. No GitHub dataset has yet been cloned or imported into production; the separate sparse-clone script supports an attributed tectonic boundaries dataset.

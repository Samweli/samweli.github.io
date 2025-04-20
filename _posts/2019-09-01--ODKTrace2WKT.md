---
layout: single
comments: true
title: Converting ODK location data to WKT in QGIS
published: true
---


![](https://raw.githubusercontent.com/samweli/jekyll-now/master/images/odktrace2wkt.png)

_Plugin interface_

## Loading ODK location data in QGIS

[Open Data Kit(ODK)](https://getodk.org/) is now widely used in collecting location data. One notable use case is the project 
called [Ramani Huria](https://ramanihuria.org/) (Open Map) which used ODK to map Dar es salaam city drains. 
One of the challenges in using ODK to collect linestring data is the format that it 
save the data into (geotrace), the format currently is not a standard that is directly supported in most GIS applications.

While ODK supports collecting point and line-based geographic data, the format it uses to store data is not
a widely accepted. 
This has made it difficult for teams to import and work with the data in tools like QGIS after data collection.

Ramani Huria team was faced with this problem and they wrote script that convert the data from geotrace 
to Well-Known text format which is widely used standard. 

The issue with scripts is they are not very user friendly. Recognizing the need for a more accessible solution, 
the Ramani Huria team tasked me with creating a QGIS plugin to simplify this conversion process for everyday users.

I developed a QGIS plugin that helps users to convert the ODK geotrace data into Well-Known text format by building upon the work that Ramani Huria had already started. 
Since the team already had a [script](https://github.com/ivangayton/ODK_geotrace_to_WKT/blob/master/lines_to_wkt.py) written in Python.

The plugin works on all QGIS 3 versions. See the following [how to use video](https://www.youtube.com/watch?v=GvxkoVP0-Dc) on plugin usage instructions.

The plugin is intended to make geospatial data workflows smoother and more accessible, particularly for 
community mapping teams and organizations using ODK in the field. By bridging the gap between mobile data collection 
and GIS analysis, it enables more people to benefit from the power of open mapping tools.

[Plugin repository](https://plugins.qgis.org/plugins/odktrace2wkt/)

[Source code](https://github.com/Samweli/odktrace2wkt)



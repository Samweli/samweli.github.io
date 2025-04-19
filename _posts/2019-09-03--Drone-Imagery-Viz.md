---
layout: single
comments: true
title: Visualizing Dar es salaam City Drone Imagery
published: true
---


![](https://raw.githubusercontent.com/samweli/jekyll-now/master/images/dar-drone-imagery-viz.png)

_Drone Imagery Map_

## Visualizing Dar es salaam drone imagery

At the end of 2017, The World Bank Tanzania, in collaboration with the Dar Rapid Transit ([DART](https://www.dart.go.tz/)) Agency, 
supported the collection of high-resolution drone imagery across Dar es Salaam. This initiative was part of a broader effort to 
support urban planning and development along the proposed Bus Rapid Transit (BRT) routes throughout the city.

The drone mapping activity successfully captured detailed imagery of all areas surrounding the planned BRT corridors. 
This rich dataset was expected to serve as a critical resource for planning and decision-making throughout
the BRT development process.

However, once the data was collected, the next challenge emerged—visualizing and accessing it effectively. 
The raw drone imagery, provided in GeoTIFF format, was extremely large in size. This made it difficult to load 
and interact with the data on a regular computer. Standard desktop machines often struggled to open the files, 
and even when they did, rendering the imagery was slow.

To make things more complicated, viewing GeoTIFFs typically requires specialized Geographic Information System (GIS) software,
which is often desktop-based and not very user-friendly for non-technical users. This meant that anyone wanting to interact 
with the data had to first install special GIS tools, creating a barrier for planners and the public alike.

These limitations highlighted the need for a more accessible, web-based solution—something that didn’t require 
powerful hardware or dedicated software installation, and could be used directly from a browser.

As a member of The World Bank Tanzania team supporting the DART project, 
I was tasked with developing a visualization tool for this imagery dataset. 
My goal was to make the drone imagery easily accessible to a wide range of users, 
from urban planners to city officials and community members.

Using [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/overview/) I built a lightweight, high-performance web application that could display the
large drone imagery efficiently, directly within a browser window.

The result was a high perfomance and easily accessible web map, it can be viewed [here](http://brt-viz.herokuapp.com/)

---
layout: single
comments: true
title: Using AI in Trash Detection
published: true
---

![](https://raw.githubusercontent.com/samweli/jekyll-now/master/images/trash-detector.png)

_Trash detection web application interface_

## Trash detection from mapping images

During the trash mapping activity [here](http://samweli.github.io/Trash-Map/), some of the collected trash images didn't 
contain waste. This was mostly because certain photos were taken at legal dump sites,
which weren’t clearly marked during data collection.

One of the main issues was that the data collection process didn’t include any form 
of tagging to specify whether an image contained waste, whether it was a legal or illegal dumping site,
or if there was any visible trash at all. This lack of metadata posed a challenge for filtering 
and interpreting the dataset effectively.

To solve this, I decided to build a simple web application that can automatically
detect whether an image contains trash. The purpose of this tool is to assist in 
post-processing the mapping data by tagging images based on the presence or absence of visible waste.
This step helps to clean up the dataset and make it more useful for further analysis, decision-making,
or public awareness campaigns.


The result application can be found [here](http://trash-detection.herokuapp.com/).

Once the tool was ready, I ran it on the full set of collected images. The results were visualized through an interactive [web app](http://dar-trash-viz.netlify.app). You can explore these insights by navigating to the
`Analysis` menu and selecting the `Trash Tagging` option. This section provides a breakdown of how many images 
were flagged as containing waste versus those that weren’t, as well as other related statistics.


In terms of performance, the tool achieved a rough accuracy of about 60%, meaning that 6 out of every 10 images were correctly tagged in
terms of trash presence. While this is far from perfect, it's a useful first step toward automating the cleanup and classification of 
large image datasets gathered in the field.

Going forward, I plan to improve the [tool](https://github.com/ResilientDar/trash-detector)’s accuracy and possibly incorporate manual review options or allow users to
contribute to labeling images. This could help create a more reliable and scalable system for waste detection in mapping projects.

If you're interested in contributing, testing the tool, or sharing feedback, feel free to get in touch!


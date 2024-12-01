---
layout: single
comments: true
title: Streamlining QGIS Development using Docker
published: true
---


![](https://raw.githubusercontent.com/samweli/jekyll-now/master/images/qgis_dev_splash.png)

_QGIS Dev Splash_

## QGIS Development with Docker
In recent years the QGIS Development team has been building and sharing official QGIS docker images
via the QGIS docker hub [here](https://hub.docker.com/r/qgis/qgis) this helps in providing an effective reuse of the QGIS application
and its components in different cases. 

Some of the cases where QGIS image can be used are running unreleased versions(nightly builds and master branch changes) of the QGIS application, 
enabling robust headless testing environment for QGIS and its related applications/plugins, support usage of older QGIS versions in OS environment that
only allow new QGIS application versions and facilitating setup and compilation for QGIS development.

This year on the GIS Day Tanzania that happened on 15 November, a  QGIS Hackathon session was hosted where various participants showed up to learn
about how the QGIS development is done and looking at contribution workflow. I had a chance to guide the participants and share about how to use the
Docker to when doing QGIS development. 

In this post I'm going to share the benefits of using the Docker approach when setting up development for QGIS and the guidelines in becoming a QGIS contributor.

The usual way of compiling QGIS source involves downloading and installing all the required dependencies and prerequisites for the corresponding OS in order
to be able to make together the QGIS source, component and libraries into a full functional application. 

The following are the required dependencies in ubuntu 22.04 for QGIS compilation.

| Ubuntu OS | Required dependencies |
|-----------|-----------------------|
| jammy     | bison build-essential ca-certificates ccache cmake cmake-curses-gui dh-python doxygen expect flex flip gdal-bin git graphviz grass-dev libdraco-dev libexiv2-dev libexpat1-dev libfcgi-dev libgdal-dev libgeos-dev libgsl-dev libpdal-dev libpq-dev libproj-dev libprotobuf-dev libqca-qt5-2-dev libqca-qt5-2-plugins libqscintilla2-qt5-dev libqt5opengl5-dev libqt5serialport5-dev libqt5sql5-sqlite libqt5svg5-dev libqt5webkit5-dev libqt5xmlpatterns5-dev libqwt-qt5-dev libspatialindex-dev libspatialite-dev libsqlite3-dev libsqlite3-mod-spatialite libyaml-tiny-perl libzip-dev libzstd-dev lighttpd locales ninja-build ocl-icd-opencl-dev opencl-headers pandoc pdal pkg-config poppler-utils protobuf-compiler pyqt5-dev pyqt5-dev-tools pyqt5.qsci-dev python3-all-dev python3-autopep8 python3-dev python3-gdal python3-jinja2 python3-lxml python3-mock python3-nose2 python3-owslib python3-plotly python3-psycopg2 python3-pygments python3-pyproj python3-pyqt5 python3-pyqt5.qsci python3-pyqt5.qtmultimedia python3-pyqt5.qtpositioning python3-pyqt5.qtserialport python3-pyqt5.qtsql python3-pyqt5.qtsvg python3-pyqt5.qtwebkit python3-pyqtbuild python3-sip python3-termcolor python3-yaml qt3d-assimpsceneimport-plugin qt3d-defaultgeometryloader-plugin qt3d-gltfsceneio-plugin qt3d-scene2d-plugin qt3d5-dev qtbase5-dev qtbase5-private-dev qtkeychain-qt5-dev qtmultimedia5-dev qtpositioning5-dev qttools5-dev qttools5-dev-tools sip-tools spawn-fcgi xauth xfonts-100dpi xfonts-75dpi xfonts-base xfonts-scalable xvfb              |

Users have to make sure the required dependencies are available to the system before starting compiling QGIS, the requirements and ways of installing can be different for each OS.
Due to multiple challenges that usually occur when fetching and installing these dependencies, the whole QGIS development setup becomes tedious and hard to deal with.

Talk about the docker approach, with benefits easy setup, platform independent create once run everywhere, show steps required.

Links to the juypter notebook

Making contribution to QGIS

Reach out where for more questions










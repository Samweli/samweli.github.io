---
layout: single
comments: true
title: Streamlining QGIS Development using Docker
published: false
---

![](../assets/images/qgis_dev_splash.png)

_QGIS dev splash image_

## QGIS Development with Docker

In recent years, the QGIS Development team has been building and sharing official 
QGIS Docker images via the QGIS Docker Hub. This initiative helps provide an effective,
reusable approach to running and setting up QGIS and its components across a wide variety of use cases.
Docker images are especially useful for those looking to run unreleased versions (nightly builds and master branch changes)
of QGIS, create robust headless testing environments, and facilitate the setup and compilation of QGIS development environments. 

## Docker images in action

In this post, I’m going to share the benefits of using Docker when setting up QGIS development, and provide
a practical guide to becoming a QGIS contributor.

## The Traditional way of compiling QGIS source

The usual approach to compiling QGIS from source involves downloading and installing various dependencies
and prerequisites for your operating system. You then need to manually configure the build tools and process to
compile QGIS from its source code. For more info about normal way of compilation [see](https://github.com/qgis/QGIS/blob/master/INSTALL.md) 

For example, on Ubuntu 22.04, you would need to install a long list of dependencies such as:

- **Build Tools**: `bison`, `build-essential`, `cmake`, `ccache`, `flex`, `git`
- **Geospatial Libraries**: `libgdal-dev`, `libgeos-dev`, `libproj-dev`, `libpq-dev`
- **Qt and PyQt5**: `libqt5opengl5-dev`, `libqt5serialport5-dev`, `python3-pyqt5`
- **Python Dependencies**: `python3-dev`, `python3-gdal`, `python3-lxml`, `python3-psycopg2`
- **Additional Dependencies**: `doxygen`, `graphviz`, `protobuf-compiler`, `libspatialindex-dev`, `qtbase5-dev`

This process involves not only installing the correct versions of all these packages but also managing 
potential conflicts between them. Additionally, maintaining these dependencies across different OS 
versions can be problematic, leading to frequent setup issues and the need for manual troubleshooting.

## Why use Docker?

There are several compelling reasons to use Docker for different tasks:

### 1. Running unreleased versions
Docker images allow you to easily run nightly builds or versions from the master branch of QGIS.
This is especially useful for testing new features or bug fixes that have not yet been officially released.

### 2. Headless testing environments
Docker enables the creation of headless environments for automated testing. This is 
important for continuous integration (CI) pipelines or for running QGIS in a server environment without a GUI.

### 3. Legacy QGIS versions
If you need to support older versions of QGIS in an operating system that only allows the latest versions,
Docker can help by creating isolated environments where specific versions of QGIS can run independently of
the system’s package manager.

### 4. Simplified compilation and development setup
The Docker approach makes it easier to set up a QGIS development environment, avoiding the challenges and
time-consuming tasks involved with manually installing all the required dependencies and configuring the system.


## Development setup benefits

With Docker, the complexity of setting up a QGIS development environment is drastically reduced. 
Docker containers allow you to package everything needed to run QGIS, including its dependencies, 
into a single environment. Here are some key benefits of using Docker for QGIS development:

### 1. Easy setup
Docker enables a "create once, run anywhere" approach. All the dependencies required to compile 
QGIS are bundled into the Docker image, huge thanks to QGIS development team for making this possible,
this makes it easy to start working on QGIS development without
worrying about compatibility or dependency issues.

The only thing you need to run a Docker container
is Docker itself, which is available on most platforms.

### 2. Platform independence
One of Docker’s greatest advantages is that it abstracts away the underlying operating system. 
Whether you’re using Linux, macOS, or Windows, Docker ensures that the QGIS development environment
will be the same across all platforms. Eliminating the need to configure each OS individually and 
ensures consistency. The main reason for this is that some operating systems doesn't support directly installation
of some QGIS dependencies hence not ensuring a standard one for all development configuration.

### 3. Reproducibility
Docker images ensure that you can share your development environment with others, making it easier for
collaborators or new contributors to get started. This reproducibility is essential in open-source projects like
QGIS, where contributors may come from a variety of environments. The docker environment setup specifically for this 
case includes a configuration file `docker-compose.yml` that can shared with the target QGIS repository tag/branch
/commit and that should be enough to make it work in any other environment given the prerequisite Docker images 
are available.

### 4. Headless and isolated environment
Docker allows you to run QGIS in a headless, isolated environment, which is ideal for continuous integration,
automated testing, and environments where you don’t need a graphical interface.

### 5. Simplified compilation
Instead of manually managing and installing dependencies, the Docker image for QGIS comes 
pre-configured with everything you need. This allows you to focus on development rather than spending
hours troubleshooting setup issues.

## Steps to use Docker images for QGIS development

### Prerequisites
Ensure that Docker, Docker Compose, Git, and an X11 server are installed and running on your system.
These tools are necessary to set up the QGIS development environment using Docker.

### 1. Clone QGIS repository
Clone the QGIS repository from GitHub to get the source code for building QGIS. 
This will provide you with the latest source code to configure and compile the application. 
QGIS official repository can be accessed from [here](https://github.com/qgis/QGIS). Users can select
what version to work on by checking out the corresponding QGIS version git tag.

### 2. Create Docker compose configuration
Create a `docker-compose.yml` file that defines the necessary services and environment. 
The file will include settings for the QGIS build dependencies and X11 forwarding for GUI applications.

The `docker-compose.yml` file should contain the below structure and content.

```yml
version: '3'

services:
  qgis-dev-live:
    image: qgis/qgis3-build-deps-22.04-qt5:latest
    volumes:
      - ..:/src/QGIS
      - build:/src/QGIS/build
    environment:
      - DISPLAY=${DISPLAY}
      - XAUTHORITY=${XAUTHORITY}
      - XDG_RUNTIME_DIR=/tmp
    network_mode: host
    working_dir: /src/QGIS/build
    command: bash

volumes:
  build:
```

Where `qgis/qgis3-build-deps-22.04-qt5:latest` is the image responsible for all the QGIS development dependencies and
recommended for use, other images can be fetched from here https://hub.docker.com/u/qgis?page=1&search=build-deps

### 3. Build the Docker environment
Use Docker Compose to build the development environment based on the `docker-compose.yml` configuration.
This will download the necessary Docker image and set up the environment for compiling QGIS.

Use the following command to run the build

```commandline
docker-compose up 
```

### 4. Start the development environment
Launch the Docker container with an interactive bash shell to begin development. 
This will provide you with a command-line interface inside the container to manage the build process.

Command to start interactive bash shell

```commandline

docker exec -it bash qgis-dev-live

```

### 5. Configure and build QGIS
Run CMake and Ninja commands inside the container to configure and compile QGIS. 
This will build QGIS from source with specific configuration options like enabling plugins and GRASS integration.

```commandline


```

### 6. Run QGIS from the build
After building, run the compiled QGIS application from the container to verify the installation. 
You can use the `qgis` command inside the container to launch the application.

```commandline


```

### Notes and troubleshooting
Be aware that the build process may take significant time depending on your system's resources. 
If you encounter issues, check your X11 configuration and Docker permissions for potential fixes.

For more info check this notebook [here](https://github.com/Samweli/qgis_gis_day_tz/blob/master/materials/linux/qgis_build_linux.ipynb)

## Reach out

If you have questions about using Docker for QGIS development or contributing to QGIS,
there are several places where you can get help:

- **QGIS Developer Mailing List**: The [QGIS Developer Mailing List](https://lists.osgeo.org/mailman/listinfo/qgis-developer)
  is a great place to ask questions and discuss development-related topics.
- **QGIS GitHub Repository**: The [QGIS GitHub](https://github.com/qgis/qgis) is where all the development happens,
  and you can submit issues, pull requests, and more.

## Conclusion

Using Docker to set up a QGIS development environment simplifies the process, especially for newcomers
who may struggle with the dependency management required for compiling QGIS from source. 
With Docker, you can create a consistent, reproducible environment for QGIS development 
that works across platforms and makes contributing to the QGIS project easier than ever.




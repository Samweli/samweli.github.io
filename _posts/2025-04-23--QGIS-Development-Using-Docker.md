---
layout: single
comments: true
title: Streamlining QGIS Development using Docker
published: false
---

![](../assets/images/qgis_dev_splash.png)

_QGIS dev splash image_

## QGIS Development using Docker

In recent years, the [QGIS Development team](https://github.com/qgis/QGIS) has been building and sharing official 
QGIS [Docker](https://www.docker.com) images via the [QGIS Docker Hub](https://hub.docker.com/r/qgis/qgis) . This work has provided an effective,
reusable approach to running and setting up QGIS and its components across a wide variety of use cases and environments.
For this instance the Docker images have been useful for those looking to run unreleased versions (nightly builds and master branch changes)
of QGIS, creating robust headless testing environments, facilitate the setup and compilation of QGIS development environments and 
 installing/using multiple QGIS versions in an operating system (**a topic for another blog post**!!). 


In this post, I’m going to share the benefits of using Docker when setting up QGIS development, and provide
a guide to becoming a QGIS contributor. I will touch on the normal way of setting up QGIS development
and explain its pros and cons compared to the Docker-based approach. The whole QGIS development workflow is 
a huge aspect containing various components, general practices and a number of tools, I'm not going to cover all of these here,
but I will address the high-level structure that anyone (even a beginner) can adopt and use for the development of core QGIS features.

## The traditional way of compiling QGIS Desktop

QGIS desktop core is mainly developed using C++, using the [Qt framework](https://www.qt.io/product/framework). The usual approach for compiling QGIS from source involves downloading and installing various dependencies
and prerequisites for your operating system. Necessary build tools are needed to be manually configured and processed in order to
compile QGIS from its source code. For more info about normal way of compilation [see](https://github.com/qgis/QGIS/blob/master/INSTALL.md) 

For example, on Ubuntu 22.04, you would need to install a list of dependencies such as:

- **Build Tools**: `bison`, `build-essential`, `cmake`, `ccache`, `flex`
- **Geospatial Libraries**: `libgdal-dev`, `libgeos-dev`, `libproj-dev`, `libpq-dev`
- **Qt and PyQt5**: `libqt5opengl5-dev`, `libqt5serialport5-dev`, `python3-pyqt5`
- **Python Dependencies**: `python3-dev`, `python3-gdal`, `python3-lxml`, `python3-psycopg2`
- **Additional Dependencies**: `doxygen`, `graphviz`, `protobuf-compiler`, `libspatialindex-dev`, `qtbase5-dev`

<div align="center">
  <img alt="a gif showing a long list of items" src="../assets/images/long_list.webp" />
  <p align="center">Long list ehh!!</p>
</div>

This process involves not only installing the correct versions of all these packages but also managing 
potential conflicts between them. Additionally, maintaining these dependencies across different OS 
versions can be problematic, leading to frequent setup issues and the need for manual troubleshooting.

It would have been nice if the dependencies fetch could only feature a few set of commands, this would help
especially the beginners to jumpstart the whole QGIS development setup and skip past all the issues that come with 
build tools.

## Why use Docker?

The Docker approach makes it easier to set up a QGIS development environment, avoiding the challenges and
time-consuming tasks involved with manually installing all the required dependencies and configuring the system.
Developer only needs to know how to use Docker in order to use the setup, no other extra skills are needed.

## Benefits

With Docker, the complexity of setting up a QGIS development environment is drastically reduced. 
Docker containers allow you to package everything needed to run QGIS, including its dependencies, 
into a single environment. Here are some key benefits of using Docker for QGIS development:

#### Easy setup
Docker enables a "create once, run anywhere" approach. All the dependencies required to compile 
QGIS are bundled into the Docker image, huge thanks to QGIS development team for making this possible,
this simplifies the whole process of dependencies fetching QGIS development without
worrying about compatibility or dependency issues.

The only thing you need to run a Docker container
is Docker itself, which is available on most platforms.

#### Platform independence
One of Docker’s greatest advantages is that it abstracts away the underlying operating system. 
Whether you’re using Linux, macOS, or Windows, Docker ensures that the QGIS development environment
will be the same across all platforms. Eliminating the need to configure each OS individually and 
ensures consistency. The main reason for this is that some operating systems doesn't support directly installation
of some QGIS dependencies hence not ensuring a standard one for all development configurations.

#### Reproducibility
Docker images ensure that you can share your development environment with others, making it easier for
collaborators or new contributors to get started. This reproducibility is essential in open-source projects like
QGIS, where contributors may come from a variety of environments. The docker environment setup specifically for this 
case includes a configuration file `docker-compose.yml` that can be shared with the target QGIS repository tag/branch
/commit and that should be enough to make it work in any other environment given the needed Docker images 
are available.

#### Headless and isolated environment
Docker allows you to run QGIS in a headless, isolated environment, which is ideal for continuous integration,
automated testing, and in environments where you don’t have graphical interface unit.

#### Simplified compilation
Instead of manually managing and installing dependencies, the Docker image for QGIS comes 
pre-configured with everything you need. This allows you to focus on development rather than spending
hours troubleshooting setup issues.

## Docker in action

Now that we have covered the rationale behind using Docker for setting up QGIS development, lets take a look 
at the actual work and the required steps to set Docker and spin up QGIS from it.

<div align="center">
  <img alt="a gif showing a team about to work" src="../assets/images/lets_do_this.gif" />
</div>


### Prerequisites
Running on a Linux environment, ensure that Docker, Docker Compose, Git, and an X11 server are installed and running on your system.
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
This will download the necessary Docker image with all build dependencies and set up the environment for compiling QGIS.

Use the following command to run the build

```commandline
docker-compose up 
```

### 4. Start the development environment
Configuring and build the QGIS source can be done by passing build commands directly
in Docker exec command or via an interactive bash shell.

For the later option, launch the Docker container with an interactive bash shell to begin development. 
This will provide you with a command-line interface inside the container to manage the build process.

Command to start interactive bash shell

```commandline

docker exec -it bash qgis-dev-live

```

### 5. Configure and build QGIS
Run CMake and Ninja commands inside the container to configure and compile QGIS. 
This will build QGIS from source with specific configuration options like enabling plugins and GRASS integration.

Make sure the shell is in the correct directory before running the build command

```commandline
 echo '[$(date)] Starting CMake configuration...' && \
    cmake ../QGIS -GNinja \
        -DWITH_STAGED_PLUGINS=ON \
        -DCMAKE_INSTALL_PREFIX=/usr \
        -DWITH_GRASS=ON \
        -DSUPPRESS_QT_WARNINGS=ON \
        -DENABLE_TESTS=OFF \
        -DWITH_QSPATIALITE=ON \
        -DWITH_QWTPOLAR=OFF \
        -DWITH_APIDOC=OFF \
        -DWITH_ASTYLE=OFF \
        -DWITH_DESKTOP=ON \
        -DWITH_BINDINGS=ON \
        -DDISABLE_DEPRECATED=ON && \
    echo '[$(date)] CMake configuration completed.' && \
    git config --global --add safe.directory /src/QGIS/QGIS && \
    echo '[$(date)] Starting QGIS build...' && \
    VERBOSE=1 ninja -v && \
    echo '[$(date)] QGIS build completed.' && \
    echo '[$(date)] Starting QGIS installation...' && \
    VERBOSE=1 ninja -v install && \
    echo '[$(date)] Installation completed.'"
    

```

The above series of commands can take a while to finish depending on how powerful the used PC.

### 6. Run QGIS from the build
After building, run the compiled QGIS application from the container to verify the setup. 
The xhost command is for allowing the Docker tool to control access to the X11 display
and the `qgis` command inside the container is used to launch the application.

```commandline
xhost +local:docker
```

```commandline
./output/bin/qgis
```

After running the above commands, hopefully the QGIS desktop application should start. 

For those using Linux distros there is a [Jupyter notebook](https://github.com/Samweli/qgis_gis_day_tz/blob/master/materials/linux/qgis_build_linux.ipynb) 
that contains all the commands involved in compiling and running QGIS source, the notebook was part of materials used
in the 2024 GIS Day hacking in Tanzania. Feel free to use it if you don't want to run commands in terminal.

## More benefits

Overall the availability of the QGIS Docker images brings other several compelling use cases apart for simplifying the development, 
here are some of the reasons:

#### Running unreleased versions
Docker images allow you to easily run nightly builds or versions from the master branch of QGIS.
This is especially useful for testing new features or bug fixes that have not yet been officially released.
pelines or for running QGIS in a server environment without a GUI.

#### Legacy QGIS versions
If you need to support older versions of QGIS in an operating system that only allows the latest versions,
Docker can help by creating isolated environments where specific versions of QGIS can run independently of
the system’s package manager.



### Notes and troubleshooting
Be aware that the build process may take significant time depending on your system's resources. 
If you encounter issues, check your X11 configuration and Docker permissions for potential fixes.


## Contributing to QGIS

Contributing to the QGIS is a great way to support the open-source community and improve one of the important GIS tools used
in the world.

The QGIS team welcomes any contribution from anywhere. QGIS itself is a team work consisting of different people from all 
over the world, any addition, edit or improvement in the code, documentation or corresponding QGIS project would be 
heavily appreciated.


Before starting contributing to the QGIS source here are important things go over first:

- Familiarize with C++ and [Qt framework](https://www.qt.io/product/framework);
- Review the QGIS coding standards; This will help in making sure reviewers can provide right feedback and 
  the suggested changes are easily reviewable.
- Create or find issue related to the problem; Tracking discussions will provide context for the target contribution.
- Run tests locally; It won't look good if reviewers find minor bugs when reviewing new changes. Always make sure to catch regressions and 
  new changes bugs that can be detected early by running unit tests.
- Documentation on new changes; The code, commit and changes details should be descriptive enough to provide enough information about the work
  that is about to be integrated.

Finally don't stress out, go ahead and make the pull request! Contributions don't have to be perfect and reviewers are 
always there to improve the changes.


For the full guide on QGIS development see the developers guideline found [here](https://docs.qgis.org/3.40/en/docs/developers_guide
) 


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




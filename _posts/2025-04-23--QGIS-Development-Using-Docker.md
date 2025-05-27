---
layout: single
comments: true
title: Streamlining QGIS Development using Docker
published: false
---

![](../assets/images/qgis_in_docker.png)

_QGIS with Docker image_

## QGIS Development using Docker

In recent years, the [QGIS Development team](https://github.com/qgis/QGIS) has been building and sharing official 
QGIS [Docker](https://www.docker.com) images via the [QGIS Docker Hub](https://hub.docker.com/r/qgis/qgis) . This work has provided an effective and
reusable approach to running and setting up QGIS and its components across a wide variety of use cases and environments.
These Docker images have been useful for those looking to run unreleased versions (nightly builds and master branch changes)
of QGIS, create robust headless testing environments, facilitate the setup and compilation of QGIS development environments and 
 install/use multiple QGIS versions in one operating system (**a topic for another blog post**!!). 


In this post, I’m going to share the benefits of using Docker when setting up QGIS development, and provide
a guide on how to start providing QGIS contributions. I will touch on the normal way of setting up QGIS development
and explain its difference compared to the suggested Docker-based approach.

The whole QGIS development workflow is 
a huge ecosystem containing various components, general practices and a number of tools **similar to many other
big open source projects**.
I'm not going to cover all of these here,
but I will address the high-level structure that anyone (even a beginner) can adopt and use for the development of core QGIS features.

## Compiling QGIS Desktop

QGIS desktop core is mainly developed using C++ and the [Qt framework](https://www.qt.io/product/framework). The usual approach for compiling QGIS from source involves
downloading and installing various dependencies
and tools for the operating system. Necessary build tools are needed to be manually configured and processed in order to
compile QGIS from its source code.

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

On top of that in some environments, developers may need to manually compile, install libraries and 
link them to QGIS by overriding the corresponding
default settings in the QGIS configuration files. This can happen if the required libraries versions aren't 
available via system packages — a challenging task that should be avoided, especially for new contributors.

It would have been nice if the dependencies fetch could only feature a few set of consistent steps, this would help
the beginners to easily grasp the whole QGIS development setup workflow and skip past all the issues that come dealing 
with build tools installation.

For more info about QGIS compilation [see](https://github.com/qgis/QGIS/blob/master/INSTALL.md). 

## Why use Docker?

The Docker approach makes it easier to set up a QGIS development environment, avoiding the challenges and
time-consuming tasks involved with manually installing all the required dependencies and configuring the system.
Developers only need to know how to use Docker in order to use the setup, no other extra skills are needed.

The main goal is to set up a workflow that intends to serve as a single, consistent process 
that operates reliably across all environments.

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

Now that we have seen the rationale behind using Docker for setting up QGIS development and its general 
benefits, lets take a look 
at the actual work and the required steps to set Docker and spin up QGIS from it.

<div align="center">
  <img alt="a gif showing a team about to work" src="../assets/images/lets_do_this.gif" />
</div>


### Prerequisites
Running on a Linux environment, ensure that Docker,
Docker Compose and [Git](https://git-scm.com/), 
are installed and running on your system.
These tools are necessary to set up the QGIS development environment using Docker.
Make sure to install the latest version of Docker Compose by following installation instructions from 
[here](https://docs.docker.com/compose/install/linux).

### 1. Clone QGIS repository
Clone the QGIS repository from GitHub to get the source code for building QGIS. 
This will provide you with the latest source code to configure and compile the application. 
QGIS official repository can be accessed from [here](https://github.com/qgis/QGIS). Users can select
what version to work on by checking out the corresponding QGIS version git tag.

```bash

git clone git@github.com:qgis/QGIS.git
```

After cloning is complete, you can switch to any QGIS released version branch or stay with the master. 

I recommend to select a released version branch or a final release tag and check it out because the included changes in the 
release branches tend to be more stable compared to the master branch changes.

See all QGIS repository branches - https://github.com/qgis/QGIS/branches

### 2. Create Docker compose configuration
After cloning the repository, change directory and get inside the QGIS root folder

```bash

 cd QGIS
```
Create a `docker-compose.yml` file that defines the necessary services and environment. 
The file will include settings for the QGIS build dependencies and X11 forwarding for GUI applications.

The `docker-compose.yml` file should contain the below structure and content. This file should
be located in the root of the QGIS directory.

```bash


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
    command: tail -f /dev/null

volumes:
  build:
```

Where `qgis/qgis3-build-deps-22.04-qt5:latest` is the image responsible for all the QGIS development dependencies and
recommended for use, other images can be fetched from here https://hub.docker.com/u/qgis?page=1&search=build-deps.

The `volumes` part contain information of where to mount and link the QGIS source and the build directory, while the `environment`
section defines all the necessary variable required to enable display configuration between the host and the Docker containers.

### 3. Build the Docker environment
Use Docker Compose to build the development environment based on the `docker-compose.yml` configuration.
This will download the necessary Docker image with all build dependencies and set up the environment for compiling QGIS.

In this step we assume all the Docker tools have already been installed in the system, if not see
this [page](https://www.docker.com/get-started/) on how to install the essential Docker tools.

Use the following commands to run the build and start the Docker container.

```bash

docker compose build qgis-dev-live
```

```bash

docker compose up 
```

If the above commands are successful, the following content will be displayed in the terminal.

```commandline

[+] Running 1/1
 ✔ Container qgis-qgis-dev-live-1  Started 

```

### 4. Start the development environment
Configuring and build the QGIS source can be done by passing build commands directly
in Docker exec command or via an interactive bash shell.

For the latter option, in order launch the Docker container with an interactive bash shell to begin development. 
Use the below command, this will provide you with a command-line interface inside the container 
to manage the build process.

Command to start interactive bash shell

```bash

docker compose exec -it qgis-dev-live bash

```

### 5. Configure and build QGIS
Run CMake and Ninja commands inside the container to configure and compile QGIS. 
This will build QGIS from source with specific configuration options like enabling plugins and
[GRASS](https://grass.osgeo.org/) integration.

At the time of writing this post the used QGIS docker image had one issue in linking the QScintilla2 library.
The following commands makes sure that the library symlinks are created in the folder that QGIS expects them to be.

**Note:** This should not be the usual way of doing this, once the upstream image is fixed this step will not be needed anymore.


```bash

docker compose run qgis-dev-live bash -c "\
  mkdir -p /usr/lib/x86_64-linux-gnu && \
  echo 'Checking for QScintilla2 libraries...' && \
  if [ -f /usr/lib/libqscintilla2_qt5.so ]; then \
    echo 'Found QScintilla2 libraries in /usr/lib - creating symlinks...' && \
    ln -sf /usr/lib/libqscintilla2_qt5.so /usr/lib/x86_64-linux-gnu/libqscintilla2_qt5.so && \
    [ -f /usr/lib/libqscintilla2_qt5.so.15 ] && ln -sf /usr/lib/libqscintilla2_qt5.so.15 /usr/lib/x86_64-linux-gnu/libqscintilla2_qt5.so.15 && \
    [ -f /usr/lib/libqscintilla2_qt5.so.15.0 ] && ln -sf /usr/lib/libqscintilla2_qt5.so.15.0 /usr/lib/x86_64-linux-gnu/libqscintilla2_qt5.so.15.0 && \
    [ -f /usr/lib/libqscintilla2_qt5.so.15.0.0 ] && ln -sf /usr/lib/libqscintilla2_qt5.so.15.0.0 /usr/lib/x86_64-linux-gnu/libqscintilla2_qt5.so.15.0.0 && \
    echo 'Created QScintilla2 symlinks' && \
    ls -la /usr/lib/x86_64-linux-gnu/libqscintilla2_qt5.so*; \
  else \
    echo 'QScintilla2 libraries not found in /usr/lib' && \
    echo 'Checking existing libraries in /usr/lib/x86_64-linux-gnu...' && \
    ls -la /usr/lib/x86_64-linux-gnu/libqscintilla2_qt5.so* || echo 'No QScintilla2 libraries found'; \
  fi
"
````

Now after fixing the library symlinks, we will now head over to the main part of the QGIS compilation.
In this step we will configure, build and install QGIS using [CMake](https://cmake.org/)(a meta build tool) and
[Ninja](https://github.com/ninja-build/ninja) (build tool).

The commands also mark the Git directory as safe globally, in order to avoid trust warnings when using
Git in the build.


```bash

  docker compose run qgis-dev-live bash -c "\
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
The passed CMake build flags and their meaning.

```yml

-GNinja: Use Ninja as the build system..
-DWITH_STAGED_PLUGINS=ON: Enable staged QGIS plugins(plugins that comes with QGIS).
-DCMAKE_INSTALL_PREFIX=/usr: Set installation path to /usr.
-DWITH_GRASS=ON: Enable GRASS GIS integration.
-DSUPPRESS_QT_WARNINGS=ON: Hide Qt deprecation warnings.
-DENABLE_TESTS=OFF: Skip building test code.
-DWITH_QSPATIALITE=ON: Enable support for SpatiaLite.
-DWITH_QWTPOLAR=OFF: Disable QwtPolar support (not needed).
-DWITH_APIDOC=OFF: Disable API documentation generation.
-DWITH_ASTYLE=OFF: Skip AStyle code formatting check.
-DWITH_DESKTOP=ON: Build the desktop QGIS application.
-DWITH_BINDINGS=ON: Build Python bindings.
-DDISABLE_DEPRECATED=ON: Disable deprecated code in the build.
```

Some of these flags can be removed or turned off if you want to boost the compile time or
if you don't want certain features in the final compiled QGIS. Checkout more configuration
flags [here](https://github.com/qgis/QGIS/blob/master/INSTALL.md#371-available-compilation-flags). 

Overall the above series of commands can take a while to finish depending on how powerful the used PC, 
after the build is done, installation process using Ninja shouldn't take too long.

### 6. Run QGIS from the build
After the build is successfully, run the compiled QGIS application from the container to verify 
the installation and open the compiled QGIS application.

Use the xhost command to allow the Docker container to control access to the X11 display
and enabling using the built QGIS binary `qgis` from inside the container to launch the application.

```bash

xhost +local:docker
```

```bash

docker compose run qgis-dev-live bash -c "./output/bin/qgis"
```

After running the above commands, hopefully the QGIS desktop application should start! 



### Notes and troubleshooting
Be aware that the build process may take significant time depending on your system's resources. 
If you encounter issues, check your X11 configuration and Docker permissions for potential fixes.

There is a [Jupyter notebook](https://github.com/Samweli/qgis_gis_day_tz/blob/master/materials/linux/qgis_build_linux.ipynb) 
that contains all the commands involved in compiling and running QGIS source, the notebook was part of materials used
in the 2024 GIS Day hacking in Tanzania. Feel free to use it if you don't want to run commands in terminal.



## More benefits

Overall the availability of the QGIS Docker images brings other several compelling use cases apart for simplifying the development, 
here are some examples:

#### Running unreleased versions
Docker images allow you to easily run nightly builds or versions from the master branch of QGIS.
This is especially useful for testing new features or bug fixes that have not yet been officially released 
or for running QGIS in a server environment without a GUI.

#### Legacy QGIS versions
If you need to support older versions of QGIS in an operating system that only allows the latest versions,
Docker can help by creating isolated environments where specific versions of QGIS can run independently of
the system’s package manager.

## Contributing to QGIS

Contributing to the QGIS is a great way to support the open-source community and improve one of the important GIS tools used
in the world.

The QGIS team welcomes any contribution from anywhere. QGIS itself is a team work consisting of different people from all 
over the world, any addition, edit or improvement in the code, documentation or any other QGIS project part would be 
heavily appreciated.


Before starting contributing to the QGIS source here are some of important things go over first:

- Familiarize with C++ and [Qt framework](https://www.qt.io/product/framework);
- Review the QGIS coding standards; This will help in making sure reviewers can provide right feedback and 
  the suggested changes are easily reviewable.
- Create or find issue related to the problem; Tracking discussions will provide context for the target contribution.
- Run tests locally; It won't look good if reviewers find minor bugs when reviewing new changes. Always make sure to catch regressions and 
  new changes bugs that can be detected early by running unit tests.
- Documentation on new changes; The code, commit and changes details should be descriptive enough to provide enough information about the 
  proposed work.

Finally, don't stress out, go ahead and make the pull request! Contributions don't have to be perfect and reviewers are 
always there to improve the new changes.


For the full guide on QGIS development see the developers guideline found [here](https://docs.qgis.org/3.40/en/docs/developers_guide
).


## Reach out

If you have questions about using Docker for QGIS development or general questions about contributing to QGIS,
there are several places where you can get help:

- **QGIS Developer Mailing List**: The [QGIS Developer Mailing List](https://lists.osgeo.org/mailman/listinfo/qgis-developer)
  is a great place to ask questions and discuss development-related topics.
- **QGIS GitHub Repository**: The [QGIS GitHub](https://github.com/qgis/qgis) is where all the development happens,
  and you can submit issues, pull requests, and more.

## Final thoughts

Using Docker to set up a QGIS development environment simplifies the process, especially for newcomers
who may struggle with the dependency management required for compiling QGIS from source. 
With Docker, you can create a consistent, reproducible environment for QGIS development 
that works across platforms and makes contributing to the QGIS project easier than ever.


Stay tuned — next, I’ll be sharing how to set up your daily development workflow,
including recompiling QGIS after making new changes while using Docker, debugging and testing locally!



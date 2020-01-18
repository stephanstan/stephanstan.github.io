# Docker Notes
## reference
[how to remove docker-images containers and volumes](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes)

[docker v17.12](https://docs.docker.com/v17.12/)

```
## List Docker CLI commands
docker
docker container --help

## Display Docker version and info
docker --version
docker version
docker info

## Execute Docker image
docker run hello-world

## List Docker images
docker image ls

## List Docker containers (running, all, all in quiet mode)
docker container ls
docker container ls --all
docker container ls -aq
```
[install jenkins on windows](https://jenkins.io/doc/book/installing/)

[local jenkins](http://localhost:8080/)

```

⇐ User Handbook overview
Index
Using Jenkins ⇒
Installing Jenkins 
Table of Contents
Prerequisites
Installation platforms
Docker
Installing Docker
Downloading and running Jenkins in Docker
On macOS and Linux
On Windows
Accessing the Jenkins/Blue Ocean Docker container
Accessing the Jenkins console log through Docker logs
Accessing the Jenkins home directory
WAR file
macOS
Linux
Debian/Ubuntu
Fedora
Windows
Other operating systems
OpenIndiana Hipster
Solaris, OmniOS, SmartOS, and other siblings
Post-installation setup wizard
Unlocking Jenkins
Customizing Jenkins with plugins
Creating the first administrator user
The procedures on this page are for new installations of Jenkins on a single/local machine.

Jenkins is typically run as a standalone application in its own process with the built-in Java servlet container/application server (Jetty).

Jenkins can also be run as a servlet in different Java servlet containers such as Apache Tomcat or GlassFish. However, instructions for setting up these types of installations are beyond the scope of this page.

Note: Although this page focuses on local installations of Jenkins, this content can also be used to help set up Jenkins in production environments.

Prerequisites
Minimum hardware requirements:

256 MB of RAM

1 GB of drive space (although 10 GB is a recommended minimum if running Jenkins as a Docker container)

Recommended hardware configuration for a small team:

1 GB+ of RAM

50 GB+ of drive space

Comprehensive hardware recommendations:

Hardware: see the Hardware Recommendations page

Software requirements:

Java: see the Java Requirements page

Web browser: see the Web Browser Compatibility page

Installation platforms
This section describes how to install/run Jenkins on different platforms and operating systems.

Docker
Docker is a platform for running applications in an isolated environment called a "container" (or Docker container). Applications like Jenkins can be downloaded as read-only "images" (or Docker images), each of which is run in Docker as a container. A Docker container is in effect a "running instance" of a Docker image. From this perspective, an image is stored permanently more or less (i.e. insofar as image updates are published), whereas containers are stored temporarily. Read more about these concepts in the Docker documentation’s Getting Started, Part 1: Orientation and setup page.

Docker’s fundamental platform and container design means that a single Docker image (for any given application like Jenkins) can be run on any supported operating system (macOS, Linux and Windows) or cloud service (AWS and Azure) which is also running Docker.

Installing Docker
To install Docker on your operating system, visit the Docker store website and click the Docker Community Edition box which is suitable for your operating system or cloud service. Follow the installation instructions on their website.

Jenkins can also run on Docker Enterprise Edition, which you can access through Docker EE on the Docker store website.

If you are installing Docker on a Linux-based operating system, ensure you configure Docker so it can be managed as a non-root user. Read more about this in Docker’s Post-installation steps for Linux page of their documentation. This page also contains information about how to configure Docker to start on boot.

Downloading and running Jenkins in Docker
There are several Docker images of Jenkins available.

The recommended Docker image to use is the jenkinsci/blueocean image (from the Docker Hub repository). This image contains the current Long-Term Support (LTS) release of Jenkins (which is production-ready) bundled with all Blue Ocean plugins and features. This means that you do not need to install the Blue Ocean plugins separately.

A new jenkinsci/blueocean image is published each time a new release of Blue Ocean is published. You can see a list of previously published versions of the jenkinsci/blueocean image on the tags page.

There are also other Jenkins Docker images you can use (accessible through jenkins/jenkins on Docker Hub). However, these do not come with Blue Ocean, which would need to be installed via the Manage Jenkins > Manage Plugins page in Jenkins. Read more about this in Getting started with Blue Ocean.

On macOS and Linux
Open up a terminal window.

Create a bridge network in Docker using the following docker network create command:

docker network create jenkins
Create the following volumes to share the Docker client TLS certificates needed to connect to the Docker daemon and persist the Jenkins data using the following docker volume create commands:

docker volume create jenkins-docker-certs
docker volume create jenkins-data
In order to execute Docker commands inside Jenkins nodes, download and run the docker:dind Docker image using the following docker container run command:

docker container run \
  --name jenkins-docker \
  --rm \
  --detach \
  --privileged \
  --network jenkins \
  --network-alias docker \
  --env DOCKER_TLS_CERTDIR=/certs \
  --volume jenkins-docker-certs:/certs/client \
  --volume jenkins-data:/var/jenkins_home \
  --publish 2376:2376 \
  docker:dind
( Optional ) Specifies the Docker container name to use for running the image. By default, Docker will generate a unique name for the container.
( Optional ) Automatically removes the Docker container (the instance of the Docker image) when it is shut down. This contains the Docker image cache used by Docker when invoked from the jenkinsci/blueocean container described below.
( Optional ) Runs the Docker container in the background. This instance can be stopped later by running docker container stop jenkins-docker and started again with docker container start jenkins-docker. See docker container for more container management commands.
Running Docker in Docker currently requires privileged access to function properly. This requirement may be relaxed with newer Linux kernel versions.
This corresponds with the network created in the earlier step.
Makes the Docker in Docker container available as the hostname docker within the jenkins network.
Enables the use of TLS in the Docker server. Due to the use of a privileged container, this is recommended, though it requires the use of the shared volume described below. This environment variable controls the root directory where Docker TLS certificates are managed.
Maps the /certs/client directory inside the container to a Docker volume named jenkins-docker-certs as created above.
Maps the /var/jenkins_home directory inside the container to the Docker volume named jenkins-data as created above. This will allow for other Docker containers controlled by this Docker container’s Docker daemon to mount data from Jenkins.
( Optional ) Exposes the Docker daemon port on the host machine. This is useful for executing docker commands on the host machine to control this inner Docker daemon.
The docker:dind image itself. This image can be downloaded before running by using the command: docker image pull docker:dind.
Note: If copying and pasting the command snippet above does not work, try copying and pasting this annotation-free version here:

docker container run --name jenkins-docker --rm --detach \
  --privileged --network jenkins --network-alias docker \
  --env DOCKER_TLS_CERTDIR=/certs \
  --volume jenkins-docker-certs:/certs/client \
  --volume jenkins-data:/var/jenkins_home \
  --publish 2376:2376 docker:dind
Download the jenkinsci/blueocean image and run it as a container in Docker using the following docker container run command:

docker container run \
  --name jenkins-blueocean \
  --rm \
  --detach \
  --network jenkins \
  --env DOCKER_HOST=tcp://docker:2376 \
  --env DOCKER_CERT_PATH=/certs/client \
  --env DOCKER_TLS_VERIFY=1 \
  --publish 8080:8080 \
  --publish 50000:50000 \
  --volume jenkins-data:/var/jenkins_home \
  --volume jenkins-docker-certs:/certs/client:ro \
  jenkinsci/blueocean
( Optional ) Specifies the Docker container name for this instance of the jenkinsci/blueocean Docker image. This makes it simpler to reference by subsequent docker container commands.
( Optional ) Automatically removes the Docker container (which is the instantiation of the jenkinsci/blueocean image below) when it is shut down. This keeps things tidy if you need to quit Jenkins.
( Optional ) Runs the jenkinsci/blueocean container in the background (i.e. "detached" mode) and outputs the container ID. If you do not specify this option, then the running Docker log for this container is output in the terminal window.
Connects this container to the jenkins network defined in the earlier step. This makes the Docker daemon from the previous step available to this Jenkins container through the hostname docker.
Specifies the environment variables used by docker, docker-compose, and other Docker tools to connect to the Docker daemon from the previous step.
Maps (i.e. "publishes") port 8080 of the jenkinsci/blueocean container to port 8080 on the host machine. The first number represents the port on the host while the last represents the container’s port. Therefore, if you specified -p 49000:8080 for this option, you would be accessing Jenkins on your host machine through port 49000.
( Optional ) Maps port 50000 of the jenkinsci/blueocean container to port 50000 on the host machine. This is only necessary if you have set up one or more JNLP-based Jenkins agents on other machines, which in turn interact with the jenkinsci/blueocean container (acting as the "master" Jenkins server, or simply "Jenkins master"). JNLP-based Jenkins agents communicate with the Jenkins master through TCP port 50000 by default. You can change this port number on your Jenkins master through the Configure Global Security page. If you were to change your Jenkins master’s TCP port for JNLP agents value to 51000 (for example), then you would need to re-run Jenkins (via this docker run …​ command) and specify this "publish" option with something like --publish 52000:51000, where the last value matches this changed value on the Jenkins master and the first value is the port number on the Jenkins master’s host machine through which the JNLP-based Jenkins agents communicate (to the Jenkins master) - i.e. 52000.
Maps the /var/jenkins_home directory in the container to the Docker volume with the name jenkins-data. Instead of mapping the /var/jenkins_home directory to a Docker volume, you could also map this directory to one on your machine’s local file system. For example, specifying the option
--volume $HOME/jenkins:/var/jenkins_home would map the container’s /var/jenkins_home directory to the jenkins subdirectory within the $HOME directory on your local machine, which would typically be /Users/<your-username>/jenkins or /home/<your-username>/jenkins. Note that if you change the source volume or directory for this, the volume from the docker:dind container above needs to be updated to match this.
Maps the /certs/client directory to the previously created jenkins-docker-certs volume. This makes the client TLS certificates needed to connect to the Docker daemon available in the path specified by the DOCKER_CERT_PATH environment variable.
The jenkinsci/blueocean Docker image itself. If this image has not already been downloaded, then this docker container run command will automatically download the image for you. Furthermore, if any updates to this image were published since you last ran this command, then running this command again will automatically download these published image updates for you.
Note: This Docker image could also be downloaded (or updated) independently using the docker image pull command:
docker image pull jenkinsci/blueocean
Note: If copying and pasting the command snippet above does not work, try copying and pasting this annotation-free version here:

docker container run --name jenkins-blueocean --rm --detach \
  --network jenkins --env DOCKER_HOST=tcp://docker:2376 \
  --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 \
  --volume jenkins-data:/var/jenkins_home \
  --volume jenkins-docker-certs:/certs/client:ro \
  --publish 8080:8080 --publish 50000:50000 jenkinsci/blueocean
Proceed to the Post-installation setup wizard.

On Windows
Open up a command prompt window.

Create a bridge network in Docker using the following docker network create command:

docker network create jenkins
Create the following volumes to share the Docker client TLS certificates needed to connect to the Docker daemon and persist the Jenkins data using the following docker volume create commands:

docker volume create jenkins-docker-certs
docker volume create jenkins-data
In order to execute Docker commands inside Jenkins nodes, download and run the docker:dind Docker image using the following docker container run command:

docker container run --name jenkins-docker --rm --detach ^
  --privileged --network jenkins --network-alias docker ^
  --env DOCKER_TLS_CERTDIR=/certs ^
  --volume jenkins-docker-certs:/certs/client ^
  --volume jenkins-data:/var/jenkins_home ^
  docker:dind
Download the jenkinsci/blueocean image and run it as a container in Docker using the following docker container run command:

docker container run --name jenkins-blueocean --rm --detach ^
  --network jenkins --env DOCKER_HOST=tcp://docker:2376 ^
  --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 ^
  --volume jenkins-data:/var/jenkins_home ^
  --volume jenkins-docker-certs:/certs/client:ro ^
  --publish 8080:8080 --publish 50000:50000 jenkinsci/blueocean
For an explanation of each of these options, refer to the macOS and Linux instructions above.

Proceed to the Post-installation setup wizard.

Accessing the Jenkins/Blue Ocean Docker container
If you have some experience with Docker and you wish or need to access the jenkinsci/blueocean container through a terminal/command prompt using the docker container exec command, you can add an option like --name jenkins-blueocean (with the docker container run above), which would give the jenkinsci/blueocean container the name "jenkins-blueocean".

This means you could access the container (through a separate terminal/command prompt window) with a docker container exec command like:

docker container exec -it jenkins-blueocean bash

Accessing the Jenkins console log through Docker logs
There is a possibility you may need to access the Jenkins console log, for instance, when Unlocking Jenkins as part of the Post-installation setup wizard.

If you did not specify the detached mode option --detach with the docker container run …​ command above, then the Jenkins console log is easily accessible through the terminal/command prompt window from which you ran this Docker command.

Otherwise, you can access the Jenkins console log through the Docker logs of the jenkinsci/blueocean container using the following command:

docker container logs <docker-container-name>

Your <docker-container-name> can be obtained using the docker container ls command. If you specified the
--name jenkins-blueocean option in the docker container run …​ command above (see also Accessing the Jenkins/Blue Ocean Docker container), you can simply use the docker container logs command:

docker container logs jenkins-blueocean
```

[jenkins tutorial current progress](https://jenkins.io/doc/tutorials/build-a-java-app-with-maven/)

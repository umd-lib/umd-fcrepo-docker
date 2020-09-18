# umd-fcrepo-docker

Docker images for the Fedora (fcrepo) applications.

## Quick Start

```bash
git clone git@github.com:umd-lib/umd-fcrepo-docker.git
cd umd-fcrepo-docker
```

## PostgreSQL

Uses the [PostgreSQL Docker base image](https://hub.docker.com/_/postgres/).

[Dockerfile](postgres/Dockerfile)

Create a persistant data volume, if needed:

```bash
docker volume create fcrepo-postgres-data
```

Build and run this image.

```bash
cd postgres
docker build -t docker.lib.umd.edu/fcrepo-postgres .
docker run -it --rm --name fcrepo-postgres \
    -p 5432:5432 \
    -v fcrepo-postgres-data:/var/lib/postgresql/data \
    docker.lib.umd.edu/fcrepo-postgres
```

## ActiveMQ

Built from the [OpenJDK 8 Docker base image](https://hub.docker.com/_/openjdk),
with [ActiveMQ 5.16.0](http://activemq.apache.org/activemq-5160-release).

[Dockerfile](activemq/Dockerfile)

Create a persistant data volume, if needed:

```bash
docker volume create fcrepo-activemq-data
```

Build and run this image.

```bash
cd activemq
docker build -t docker.lib.umd.edu/fcrepo-activemq .
docker run -it --rm --name fcrepo-activemq \
    -p 61616:61616 -p 61613:61613 -p 8161:8161 \
    -v fcrepo-activemq-data:/var/opt/activemq \
    docker.lib.umd.edu/fcrepo-activemq
```

The ActiveMQ web admin console will be at <http://localhost:8161/admin/>

* STOMP server and port: `localhost:61613`
* OpenWire server and port: `localhost:61616`

## Solr: fedora4 Core

[Dockerfile](solr/Dockerfile)

Uses the [Solr Docker base image](https://hub.docker.com/_/solr/), Solr version 6.

Create a persistant data volume, if needed:

```bash
docker volume create fcrepo-solr-fedora4-data
```

Build and run this image.

```bash
cd solr
docker build -t docker.lib.umd.edu/fcrepo-solr-fedora4 .
docker run -it --rm --name fcrepo-solr-fedora4 \
    -p 8983:8983 \
    -v fcrepo-solr-fedora4-data:/var/opt/solr \
    docker.lib.umd.edu/fcrepo-solr-fedora4
```

The Solr web admin console will be at <http://localhost:8983/solr/#/>

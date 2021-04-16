# Fuseki Image for umd-fcrepo-docker

Built from the [OpenJDK 8 Docker base image](https://hub.docker.com/_/openjdk),
with [Fuseki 2.3.1](https://jena.apache.org/download/index.cgi).

[Dockerfile](Dockerfile)

Create a persistant data volume, if needed:

```bash
docker volume create fcrepo-fuseki-data
```

Build and run this image.

```bash
cd fuseki
docker build -t docker.lib.umd.edu/fcrepo-fuseki .
docker run -it --rm --name fcrepo-fuseki \
    -p 3030:3030 \
    -v fcrepo-fuseki-data:/var/opt/fuseki \
    docker.lib.umd.edu/fcrepo-fuseki
```

The Fuseki admin console will be at <http://localhost:3030/>

There will be two datasets configured:

* fedora4
* fcrepo-audit

## Building a Plain Fuseki Image

This Dockerfile can also be used to build a plain Fuseki image (i.e.,
without the dataset configuration of Shiro configuration). To do this,
specify a build target of `fuseki`:

```bash
docker build --target fuseki -t fuseki .
docker run -it --rm -p 3030:3030 -v $(pwd)/data:/var/opt/fuseki fuseki
```



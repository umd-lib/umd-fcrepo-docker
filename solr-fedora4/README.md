# Solr (fedora4 Core) Image for umd-fcrepo-docker

[Dockerfile](Dockerfile)

Uses the [Solr Docker base image](https://hub.docker.com/_/solr/), Solr version 6.

Create a persistent data volume, if needed:

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

The Java heap size can be controlled by setting the environment variable
`SOLR_FEDORA4_HEAP_SIZE`. The default if it is not set is `1024m`.

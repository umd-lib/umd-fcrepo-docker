# umd-fcrepo-docker

Docker images for the Fedora (fcrepo) applications.

## Quick Start

```bash
git clone git@github.com:umd-lib/umd-fcrepo-docker.git
cd umd-fcrepo-docker
```

Build images:

```bash
docker build -t docker.lib.umd.edu/fcrepo-postgres postgres
docker build -t docker.lib.umd.edu/fcrepo-activemq activemq
docker build -t docker.lib.umd.edu/fcrepo-solr-fedora4 solr-fedora4
docker build -t docker.lib.umd.edu/fcrepo-fuseki fuseki
```

Deploy the stack:

```bash
docker stack deploy --with-registry-auth -c umd-fcrepo.yml umd-fcrepo
```

### Application URLs

* ActiveMQ admin console: <http://localhost:8161/admin>
* Solr admin console: <http://localhost:8983/solr/#/>
* Fuseki admin console: <http://localhost:3030/>

## Individual Images

Each of the images may also be built and run individually. See the README
files for each image for more information:

* [PostgreSQL](postgres/README.md)
* [ActiveMQ](activemq/README.md)
* [Solr (fedora4 Core)](solr-fedora4/README.md)
* [Fuseki](fuseki/README.md)

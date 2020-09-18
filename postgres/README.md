# PostgreSQL Image for umd-fcrepo-docker

Uses the [PostgreSQL Docker base image](https://hub.docker.com/_/postgres/).

[Dockerfile](Dockerfile)

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

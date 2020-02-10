# umd-fcrepo-docker

Docker images for the Fedora (fcrepo) applications.

## PostgreSQL

Uses the [PostgreSQL Docker base image](https://hub.docker.com/_/postgres/).

Create a persistant data volume, if needed:

```
docker volume create fcrepo-postgres-data
```

Build and run this image.

```
cd postgres
docker build -t umd-fcrepo-postgres .
docker run -p 5432:5432 -v fcrepo-postgres-data:/var/lib/postgresql/data umd-fcrepo-postgres
```
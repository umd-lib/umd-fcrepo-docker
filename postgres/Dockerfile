# Dockerfile for the generating the Postgres image
#
# To build:
#
# docker build -t docker.lib.umd.edu/fcrepo-postgres:<VERSION> -f Dockerfile .
#
# where <VERSION> is the Docker image version to create.
FROM postgres:13.0-alpine
ENV POSTGRES_PASSWORD=postgres

COPY fcrepo.sh /docker-entrypoint-initdb.d/

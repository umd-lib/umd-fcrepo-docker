# Dockerfile for the generating the Solr image
#
# To build:
#
# docker build -t docker.lib.umd.edu/fcrepo-solr-fedora4:<VERSION> -f Dockerfile .
#
# where <VERSION> is the Docker image version to create.
FROM solr:6.6.6-slim
USER root
COPY --chown=solr:solr . /opt/solr/server/solr/mycores/fedora4
RUN mkdir -p /var/opt/solr && chown solr:solr /var/opt/solr
VOLUME /var/opt/solr
USER solr
CMD ["bin/solr", "start", "-f"]

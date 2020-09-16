FROM solr:6
USER root
COPY --chown=solr:solr . /opt/solr/server/solr/mycores/fedora4
RUN mkdir -p /var/opt/solr && chown solr:solr /var/opt/solr
VOLUME /var/opt/solr
USER solr
CMD ["bin/solr", "start", "-f"]

# generic Fuseki image
FROM openjdk:8 AS fuseki

ENV FUSEKI_VERSION 2.3.1
ENV FUSEKI_HOME /opt/apache-jena-fuseki-${FUSEKI_VERSION}
ENV FUSEKI_BASE /var/opt/fuseki
ENV FUSEKI_DATA_DIR $FUSEKI_BASE/databases

RUN curl -Ls https://archive.apache.org/dist/jena/binaries/apache-jena-fuseki-${FUSEKI_VERSION}.tar.gz \
    | tar xvzf - --directory /opt

RUN mkdir -p "$FUSEKI_BASE"/{DB,logs}

VOLUME /var/opt/fuseki
EXPOSE 3030

WORKDIR $FUSEKI_HOME
CMD ["./fuseki", "run"]

# UMD-specific configuration
FROM fuseki

COPY configuration/* $FUSEKI_BASE/configuration/
COPY shiro.ini $FUSEKI_BASE/

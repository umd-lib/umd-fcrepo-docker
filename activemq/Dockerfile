# Dockerfile for the generating the ActiveMQ Docker image
#
# To build:
#
# docker build -t docker.lib.umd.edu/fcrepo-activemq:<VERSION> -f Dockerfile .
#
# where <VERSION> is the Docker image version to create.
FROM openjdk:8u265-jdk-buster

ENV ACTIVEMQ_VERSION 5.16.0
RUN curl -Ls http://archive.apache.org/dist/activemq/${ACTIVEMQ_VERSION}/apache-activemq-${ACTIVEMQ_VERSION}-bin.tar.gz \
    | tar xvzf - --directory /opt

ENV ACTIVEMQ_HOME /opt/apache-activemq-${ACTIVEMQ_VERSION}
ENV ACTIVEMQ_DATA /var/opt/activemq
ENV ACTIVEMQ_MAX_DISK 16G

COPY conf/ $ACTIVEMQ_HOME/conf/
COPY env $ACTIVEMQ_HOME/bin/env

COPY *.jar $ACTIVEMQ_HOME/lib/optional/

VOLUME /var/opt/activemq
EXPOSE 61613
EXPOSE 61616
EXPOSE 8161

WORKDIR $ACTIVEMQ_HOME
CMD ["bin/activemq", "console"]

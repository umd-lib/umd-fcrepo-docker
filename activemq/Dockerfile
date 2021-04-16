# Dockerfile for the generating the ActiveMQ Docker image
#
# To build:
#
# docker build -t docker.lib.umd.edu/fcrepo-activemq:<VERSION> -f Dockerfile .
#
# where <VERSION> is the Docker image version to create.
FROM maven:3.6.3-jdk-8-slim AS dependencies

RUN mkdir -p /var/jars
COPY pom.xml /var/jars
WORKDIR /var/jars

# fetch JARs required for running the Camel routes, but exclude the org.slf4j
# group to avoid a SLF4J conflict with ActiveMQ's own bundled SLF4J library; see
# also http://www.slf4j.org/codes.html#log4jDelegationLoop
RUN mvn dependency:copy-dependencies -DexcludeGroupIds=org.slf4j,ch.qos.logback

FROM openjdk:8u265-jdk-buster

ENV ACTIVEMQ_VERSION 5.16.0
RUN curl -Ls http://archive.apache.org/dist/activemq/${ACTIVEMQ_VERSION}/apache-activemq-${ACTIVEMQ_VERSION}-bin.tar.gz \
    | tar xvzf - --directory /opt

ENV ACTIVEMQ_HOME /opt/apache-activemq-${ACTIVEMQ_VERSION}
ENV ACTIVEMQ_DATA /var/opt/activemq
ENV ACTIVEMQ_MAX_DISK 16G

COPY --from=dependencies /var/jars/target/dependency/*.jar $ACTIVEMQ_HOME/lib/optional/

COPY conf/ $ACTIVEMQ_HOME/conf/
COPY env $ACTIVEMQ_HOME/bin/env

VOLUME /var/opt/activemq
VOLUME /var/log/fixity
EXPOSE 61613
EXPOSE 61616
EXPOSE 8161

WORKDIR $ACTIVEMQ_HOME
CMD ["bin/activemq", "console"]

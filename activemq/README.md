# ActiveMQ Image for umd-fcrepo-docker

Built from the [OpenJDK 8 Docker base image](https://hub.docker.com/_/openjdk),
with [ActiveMQ 5.16.0](http://activemq.apache.org/activemq-5160-release).

[Dockerfile](Dockerfile)

Create a persistant data volume, if needed:

```bash
docker volume create fcrepo-activemq-data
```

Build and run this image.

```bash
cd activemq
docker build -t docker.lib.umd.edu/fcrepo-activemq .
docker run -it --rm --name fcrepo-activemq \
    -p 61616:61616 -p 61613:61613 -p 8161:8161 \
    -v fcrepo-activemq-data:/var/opt/activemq \
    docker.lib.umd.edu/fcrepo-activemq
```

The ActiveMQ web admin console will be at <http://localhost:8161/admin/>

* STOMP server and port: `localhost:61613`
* OpenWire server and port: `localhost:61616`


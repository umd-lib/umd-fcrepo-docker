# umd-fcrepo-docker

Docker images for the Fedora (fcrepo) applications.

## External Requirements

* [umd-fcrepo-webapp] Docker image

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
docker build -t docker.lib.umd.edu/fcrepo-fixity fixity
docker build -t docker.lib.umd.edu/fcrepo-mail mail
```

Export environment variables (for the repository container):

```bash
export MODESHAPE_DB_PASSWORD=...  # default in the umd-fcrepo-docker stack is "fcrepo"
export LDAP_BIND_PASSWORD=...     # see the SSDR "Identities" document for this
export JWT_SECRET=...             # can be anything, but must be sufficiently long
                                  # one method to generate a random secret is:
                                  #   uuidgen | shasum -a256 | cut -d' ' -f1
```

Deploy the stack:

```bash
docker stack deploy --with-registry-auth -c umd-fcrepo.yml umd-fcrepo
```

### Fixity checking

The "docker.lib.umd.edu/fcrepo-fixity" image can be used to run fixity checking,
using the command:

```bash
docker run docker.lib.umd.edu/fcrepo-fixity:latest <SCRIPT_ARGS>
```

where <SCRIPT_ARGS> are the arguments to pass to the script.

For example, when running against the Docker stack on a Mac:

```bash
docker run docker.lib.umd.edu/fcrepo-fixity:latest --server host.docker.internal:61613
```

Multiple command line options can be provided to the script, i.e.:

```bash
docker run docker.lib.umd.edu/fcrepo-fixity:latest --server host.docker.internal:61613 --age P6M
```

### Email Notifications

This stack uses a debugging SMTP server implementation as the destination server
for outgoing fixity failure notification emails. This server uses the Python [aiosmtpd]
library, and does not actually deliver the emails. Instead, it just echoes the contents
(headers and body) to STDOUT. To monitor these emails, use:

```bash
docker service logs -f umd-fcrepo_mail
```

### Application URLs

* ActiveMQ admin console: <http://localhost:8161/admin>
* Solr admin console: <http://localhost:8983/solr/#/>
* Fuseki admin console: <http://localhost:3030/>
* Fedora repository REST API: <http://localhost:8080/rest/>
* Fedora repository login/user profile page: <http://localhost:8080/user/>

## Individual Images

Each of the images may also be built and run individually. See the README
files for each image for more information:

* [PostgreSQL](postgres/README.md)
* [ActiveMQ](activemq/README.md)
* [Solr (fedora4 Core)](solr-fedora4/README.md)
* [Fuseki](fuseki/README.md)
* [Mail](mail/README.md)

[umd-fcrepo-webapp]: https://github.com/umd-lib/umd-fcrepo-webapp
[aiosmtpd]: https://aiosmtpd.readthedocs.io/en/latest/README.html
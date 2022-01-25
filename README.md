# umd-fcrepo-docker

Docker images for the Fedora (fcrepo) applications.

## Prerequisites

These Docker images are defined in external repos, and must be built
separately before deploying the umd-fcrepo-docker stack.

* **docker.lib.umd.edu/fcrepo-fixity** (from [umd-fcrepo-fixity]):

    ```bash
    cd ~/git
    git clone git@github.com:umd-lib/umd-fcrepo-fixity.git
    cd umd-fcrepo-fixity
    docker build -t docker.lib.umd.edu/fcrepo-fixity .
    ```
  
* **docker.lib.umd.edu/fcrepo-messaging** (from [umd-fcrepo-messaging]):

    ```bash
    cd ~/git
    git clone git@github.com:umd-lib/umd-fcrepo-messaging.git
    cd umd-fcrepo-messaging
    docker build -t docker.lib.umd.edu/fcrepo-messaging .
    ```

* **docker.lib.umd.edu/fcrepo-solr-fedora4** (from [umd-fcrepo-solr]):

    ```bash
    cd ~/git
    git clone git@github.com:umd-lib/umd-fcrepo-solr.git
    cd umd-fcrepo-solr
    docker build -t docker.lib.umd.edu/fcrepo-solr-fedora4 .
    ```

* **docker.lib.umd.edu/fcrepo-webapp** (from [umd-fcrepo-webapp]):

    ```bash
    cd ~/git
    git clone git@github.com:umd-lib/umd-fcrepo-webapp.git
    cd umd-fcrepo-webapp
    docker build -t docker.lib.umd.edu/fcrepo-webapp .
    ```

## Quick Start

See the [umd-fcrepo Local Development Setup] instructions for information about
setting up umd-fcrepo using this repository, as well as options for setting up
[Plastron] and [Archelon].

### Fixity checking

The `docker.lib.umd.edu/fcrepo-fixity` image can be used to run fixity checking,
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
* Fedora repository REST API: <http://localhost:8080/fcrepo/rest/>
* Fedora repository login/user profile page: <http://localhost:8080/fcrepo/user/>

### Database Ports

The base stack starts 2 PostgreSQL containers, each containing a single
database:

| Container Name | Port | Database Name     |
|----------------|------|-------------------|
| modeshape-db   | 5432 | fcrepo_modeshape5 |
| audit-db       | 5433 | fcrepo_audit      |

These can be accessed from the host using the psql command-line tool:

```bash
# Modeshape database backing the repository
psql -U fcrepo -h localhost -p 5432 fcrepo_modeshape5

# audit database
# archelon user has read-only access to the history table
psql -U archelon -h localhost -p 5433 fcrepo_audit
# camel user has read/write access to the history table
psql -U camel -h localhost -p 5433 fcrepo_audit
```

Database initialization scripts:

* [modeshape-db](postgres-modeshape/init-modeshape-db.sh)
* [audit-db](postgres-audit/init-audit-db.sh)

## Individual Images

Each of the images may also be built and run individually. See the README
files for each image for more information:

* [Fuseki](fuseki/README.md)
* [Mail](mail/README.md)

[umd-fcrepo-fixity]: https://github.com/umd-lib/umd-fcrepo-fixity
[umd-fcrepo-messaging]: https://github.com/umd-lib/umd-fcrepo-messaging
[umd-fcrepo-solr]: https://github.com/umd-lib/umd-fcrepo-solr
[umd-fcrepo-webapp]: https://github.com/umd-lib/umd-fcrepo-webapp
[aiosmtpd]: https://aiosmtpd.readthedocs.io/en/latest/README.html
[umd-fcrepo Local Development Setup]: https://github.com/umd-lib/umd-fcrepo/blob/main/docs/umd-fcrepo-local-development-setup.md
[Plastron]: https://github.com/umd-lib/plastron
[Archelon]: https://github.com/umd-lib/archelon

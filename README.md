# umd-fcrepo-docker

Docker images for the Fedora (fcrepo) applications.

## Prerequisites

These Docker images are defined in external repos, and must be built
separately before deploying the umd-fcrepo-docker stack.

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

```bash
cd ~/git
git clone git@github.com:umd-lib/umd-fcrepo-docker.git
cd umd-fcrepo-docker
```

Build images:

```bash
docker build -t docker.lib.umd.edu/fcrepo-fuseki fuseki
docker build -t docker.lib.umd.edu/fcrepo-fixity fixity
docker build -t docker.lib.umd.edu/fcrepo-mail mail
```

Export environment variables:

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

For ease of deploying, you can create a `.env` file that exports the required
environment variables and, source that file when deploying:

```bash
source .env && docker stack deploy --with-registry-auth -c umd-fcrepo.yml umd-fcrepo
```

Any `.env` file will be ignored by Git.

### Deploying with Archelon and Plastron

This repository also contains Docker compose files for including Archelon and
the Plastron daemon in the deployed stack. These are kept separate from the main
umd-fcrepo.yml config to assist with development: You can deploy just the core
repository services via Docker, and run Archelon and/or Plastron locally.

To deploy the complete stack, including Archelon and Plastron, do the following:

1. Build the images:

    * **docker.lib.umd.edu/archelon** (from [archelon]):

        ```bash
        cd ~/git
        git clone git@github.com:umd-lib/archelon.git
        cd archelon
        docker build -t docker.lib.umd.edu/archelon .
        ```
    * **docker.lib.umd.edu/plastrond** (from [plastron]):

        ```bash
        cd ~/git
        git clone git@github.com:umd-lib/plastron.git
        cd plastron
        docker build -t docker.lib.umd.edu/plastrond .
        ```
2. Export environment variables:
    ```bash
    export MODESHAPE_DB_PASSWORD=...  # default in the umd-fcrepo-docker stack is "fcrepo"
    export LDAP_BIND_PASSWORD=...     # see the SSDR "Identities" document for this
    export JWT_SECRET=...             # can be anything, but must be sufficiently long
                                      # one method to generate a random secret is:
                                      #   uuidgen | shasum -a256 | cut -d' ' -f1
    export SECRET_KEY_BASE=...        # typically generated using "rails secret"
                                      # in the archelon repository
    ```
3. Deploy the umd-fcrepo stack with additional config files:

    ```bash
    cd ~/git/umd-fcrepo-docker
    docker stack deploy -c umd-fcrepo.yml -c archelon.yml -c plastrond.yml umd-fcrepo
    ```

⚠️ The [archelon_id](plastron/archelon_id)/[archelon_id.pub](plastron/archelon_id.pub)
keypair should **not** be used in production. It is included in this repository
merely as a development convenience.

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
* Archelon home page: <http://localhost:3000/> (if
  [deployed with Archelon])

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

If the stack is [deployed with Archelon], it will include an additional 
database:

| Container Name | Port | Database Name     |
|----------------|------|-------------------|
| archelon-db    | 5434 | archelon          |

```bash
# Archelon database backing the Archelon Rails app
psql -U archelon -h localhost -p 5434 archelon
```

Database initialization scripts:

* [modeshape-db](postgres-modeshape/init-modeshape-db.sh)
* [audit-db](postgres-audit/init-audit-db.sh)
* [archelon-db](postgres-archelon/init-archelon-db.sh)

## Individual Images

Each of the images may also be built and run individually. See the README
files for each image for more information:

* [Fuseki](fuseki/README.md)
* [Mail](mail/README.md)

[umd-fcrepo-messaging]: https://github.com/umd-lib/umd-fcrepo-messaging
[umd-fcrepo-solr]: https://github.com/umd-lib/umd-fcrepo-solr
[umd-fcrepo-webapp]: https://github.com/umd-lib/umd-fcrepo-webapp
[aiosmtpd]: https://aiosmtpd.readthedocs.io/en/latest/README.html
[archelon]: https://github.com/umd-lib/archelon
[plastron]: https://github.com/umd-lib/plastron
[deployed with Archelon]: README.md#deploying-with-archelon-and-plastron
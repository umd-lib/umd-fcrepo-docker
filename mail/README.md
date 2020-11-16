# SMTP Mail Server Image for umd-fcrepo-docker

Uses the [Python Docker base image](https://hub.docker.com/_/python/) and
the [aiosmtpd] Python library to run a dummy SMTP server that just echoes
the messages to STDOUT.

[Dockerfile](Dockerfile)

Build and run this image.

```bash
docker build -t docker.lib.umd.edu/fcrepo-mail .
docker run -it --rm --name fcrepo-mail \
    -p 8025:8025 \
    docker.lib.umd.edu/fcrepo-mail
```

To monitor emails when running this image:

```bash
docker log -f fcrepo-mail
```

[aiosmtpd]: https://aiosmtpd.readthedocs.io/en/latest/README.html

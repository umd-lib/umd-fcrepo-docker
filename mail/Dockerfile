# Dockerfile for a local debugging SMTP server
#
# To build:
#
# docker build -t docker.lib.umd.edu/fcrepo-mail:<VERSION> -f Dockerfile .
#
# where <VERSION> is the Docker image version to create.

FROM python:3.6.8-slim-stretch
ENV PYTHONUNBUFFERED 1
EXPOSE 8025
RUN pip install aiosmtpd
ENTRYPOINT [ "python", "-m", "aiosmtpd", "-l", "0.0.0.0:8025", "stdout" ]

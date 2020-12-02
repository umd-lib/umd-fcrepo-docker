#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<END
CREATE DATABASE fcrepo_modeshape5;

CREATE USER fcrepo WITH PASSWORD 'fcrepo';

GRANT ALL PRIVILEGES ON DATABASE fcrepo_modeshape5 TO fcrepo;
END

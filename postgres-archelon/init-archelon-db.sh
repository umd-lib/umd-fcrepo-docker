#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<END
CREATE DATABASE archelon;

CREATE USER archelon WITH CREATEDB PASSWORD 'archelon';

GRANT ALL PRIVILEGES ON DATABASE archelon TO archelon;
END

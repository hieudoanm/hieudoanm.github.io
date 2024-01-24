#!/bin/sh

host="localhost"
port=5432
username="username"
database="postgres"
environment="local"

pg_dump --host $host --port $port --user $username $database > "./sql/$environment.sql"

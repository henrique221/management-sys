#!/bin/bash
set -e
service mysql start
mysql < /mysql/burndown.sql
service mysql stop
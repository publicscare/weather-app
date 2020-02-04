#!/bin/bash
# read .env from  to load API keys
#
for var in $( cat src/.env)
do
heroku config:set $var
done

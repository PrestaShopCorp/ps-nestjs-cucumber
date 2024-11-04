#!/bin/bash
export NODE_ENV="test"
export APP_PORT="3001"

export DB_DATABASE='basket-test'
export DB_HOST='localhost'
export DB_USER='admin'
export DB_PASSWORD='admin'
export DB_PORT='5435'


cucumber-js --config ./test/acceptance/cucumber.js "$@"

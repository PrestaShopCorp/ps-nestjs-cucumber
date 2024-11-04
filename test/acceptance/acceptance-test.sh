#!/bin/bash
export NODE_ENV="test"
export APP_PORT="3001"

cucumber-js --config ./test/acceptance/cucumber.js "$@"

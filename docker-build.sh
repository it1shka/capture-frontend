#/bin/bash

docker build \
  -t capture-frontend:latest \
  -t capture-frontend:$(git rev-parse --short HEAD) \
  .
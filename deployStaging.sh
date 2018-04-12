CONTAINER_NAME=staging

# staging
export CONTAINER_NAME=$CONTAINER_NAME
export PORT=8001
docker-compose -p staging up -d --build
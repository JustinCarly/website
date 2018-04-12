CONTAINER_NAME=production
# production
export CONTAINER_NAME=$CONTAINER_NAME
export PORT=8080
docker-compose -p production up -d --build
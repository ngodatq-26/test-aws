docker rm -f food-recipe-backend
docker rmi -f mailnophone03/food-recipe-backend:latest
docker run -d -p 5500:5500 --env-file ./.env --name food-recipe-backend mailnophone03/food-recipe-backend:latest

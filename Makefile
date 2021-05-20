build:
	docker-compose --file docker-compose.yaml build
ps:
	docker-compose ps
images:
	docker-compose images
up:
	docker-compose --file docker-compose.yaml up --detach
logs:
	docker-compose logs
down:
	docker-compose --file docker-compose.yaml down --rmi all
restart:
	docker-compose --file docker-compose.yaml down
	@make up
makemigrations:
	docker-compose run --rm backend python manage.py makemigrations
migrate:
	docker-compose run --rm backend python manage.py migrate
runserver:
	docker-compose run --rm backend python manage.py runserver
createsuperuser:
	docker-compose run --rm backend python manage.py createsuperuser
check:
	docker-compose run --rm backend python manage.py check

build:
	docker-compose build
ps:
	docker-compose ps
up:
	docker-compose up -d
logs:
	docker-compose logs
down:
	docker-compose down
down.a:
	docker-compose down --rmi all
restart:
	@make down
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

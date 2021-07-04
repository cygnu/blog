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
destroy:
	docker-compose --file docker-compose.yaml down --rmi all --volumes
restart:
	docker-compose --file docker-compose.yaml down
	@make up
db:
	docker-compose exec db ash
backend:
	docker-compose exec backend sh
frontend:
	docker-compose exec frontend ash
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
npm:
	@make npm-install
npm-install:
	docker-compose exec frontend npm install
npm-build:
	docker-compose exec frontend npm run build
npm-dev:
	docker-compose exec frontend npm run dev
npm-watch:
	docker-compose exec frontend npm run watch
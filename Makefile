.ONESHELL:

init:
ifeq ("$(wildcard .env)", "")
	cp .env.example .env
endif
	yarn install
	docker compose up -d --build db
	sleep 30
	@make migrate
	@make seed

dev:
	@make up
	yarn dev
	prisma studio

deploy:
	yarn build
	@make migrate

##### Docker #####
up:
	docker compose up -d
build:
	docker compose build --no-cache --force-rm
remake:
	@make destroy
	@make init
stop:
	docker compose stop
down:
	docker compose down --remove-orphans
restart:
	@make down
	@make up
destroy:
	docker compose down --rmi all --volumes --remove-orphans
destroy-volumes:
	docker compose down --volumes --remove-orphans
ps:
	docker compose ps
logs:
	docker compose logs
logs-watch:
	docker compose logs --follow
log-db:
	docker compose logs db
log-db-watch:
	docker compose logs --follow db
db:
	docker compose exec db bash

##### Prisma #####
migrate:
	prisma generate
	prisma migrate dev
seed:
	prisma db seed

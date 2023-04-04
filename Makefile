.ONESHELL:

init:
	yarn install
	cp .env.example .env
	docker compose up -d --build db

dev:
	yarn dev
	prisma studio

deploy:
	yarn build
	yarn sls deploy

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
	prisma migrate dev

##### Terraform #####
tf-init:
	cd infra
	terraform init

tf-plan:
	cd infra
	terraform plan

tf-apply:
	cd infra
	terraform apply

tf-destroy:
	cd infra
	terraform destroy

tf-import:
	cd infra
	terraform import

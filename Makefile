app:
	docker-compose up

app-console:
	docker-compose run --rm app bin/rails console

app-bash:
	docker-compose run --rm app /bin/bash


app-build:
	docker-compose build

app-bundle:
	docker-compose run --rm app bash -c "bundle install"

app-setup: app-build
	docker-compose run --rm app bin/setup

stop-stop:
	docker-compose stop

app-kill:
	docker-compose kill

app-db-drop:
	docker-compose run --rm app bin/rails db:drop

app-db-prepare:
	docker-compose run --rm app bin/rails db:create
	docker-compose run --rm app bin/rails db:migrate

app-db-migrate:
	docker-compose run --rm app bin/rails db:migrate

test:
	docker-compose run --rm app bin/rails test

.PHONY: app test

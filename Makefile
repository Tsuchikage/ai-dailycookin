
build:
	docker-compose build

run:
	docker-compose up -d

dev_up:
	docker compose -f docker-compose-dev.yml up --build
PROJECT_NAME=payment-interface
DEV_COMPOSE=docker-compose.yml
PROD_COMPOSE=docker-compose.prod.yml

.PHONY: help
help:
	@echo ""
	@echo " $(PROJECT_NAME) --> Commandes disponibles :"
	@echo ""
	@echo " Developpement :"
	@echo "  make dev        --> Lancer le projet en mode DEV"
	@echo "  make dev-build  --> Build + lancer en DEV"
	@echo "  make dev-stop   --> Stopper les conteneurs DEV"
	@echo ""
	@echo " Production :"
	@echo "  make prod       --> Lancer le projet en PROD"
	@echo "  make prod-build --> Build + lancer en PROD"
	@echo "  make prod-stop  --> Stopper les conteneurs PROD"
	@echo ""
	@echo " Nettoyage :"
	@echo "  make clean      --> Stop + remove containers"
	@echo "  make prune      --> Nettoyage Docker complet"
	@echo ""


.PHONY: dev
dev:
	docker compose -f $(DEV_COMPOSE) up

.PHONY: dev-build
dev-build:
	docker compose -f $(DEV_COMPOSE) up --build

.PHONY: dev-stop
dev-stop:
	docker compose -f $(DEV_COMPOSE) down


.PHONY: prod
prod:
	docker compose -f $(PROD_COMPOSE) up -d

.PHONY: prod-build
prod-build:
	docker compose -f $(PROD_COMPOSE) up -d --build

.PHONY: prod-stop
prod-stop:
	docker compose -f $(PROD_COMPOSE) down

.PHONY: clean
clean:
	docker compose -f $(DEV_COMPOSE) down
	docker compose -f $(PROD_COMPOSE) down

.PHONY: prune
prune:
	docker system prune -af

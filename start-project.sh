#!/bin/bash

# =============================
# 📁 Garantir que o script rode na pasta onde ele está
# =============================
cd "$(dirname "$0")" || {
  echo "❌ Erro: não foi possível acessar o diretório do script."
  exit 1
}

# =============================
# 🎨 CORES
# =============================
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
CYAN="\033[0;36m"
RED="\033[0;31m"
NC="\033[0m" # Reset

# =============================
# 🏁 Início
# =============================
echo -e "${CYAN}==============================="
echo -e "   🚀 Iniciando o ambiente     "
echo -e "===============================${NC}"

# Pergunta o ambiente
echo -e "Escolha o ambiente (${GREEN}dev${NC}/${YELLOW}prod${NC}): "
read -r ENVIRONMENT

# Validação
if [[ "$ENVIRONMENT" != "dev" && "$ENVIRONMENT" != "prod" ]]; then
  echo -e "${RED}❌ Ambiente inválido. Use 'dev' ou 'prod'.${NC}"
  exit 1
fi

# Define o Dockerfile correto
if [ "$ENVIRONMENT" == "dev" ]; then
  export DOCKERFILE="Dockerfile.dev"
  ENV_FILE=".env.local"
else
  export DOCKERFILE="Dockerfile.prod"
  ENV_FILE=".env.prod"
fi

# Verifica se o arquivo .env existe
if [ ! -f "$ENV_FILE" ]; then
  echo -e "${RED}❌ Arquivo de ambiente '$ENV_FILE' não encontrado.${NC}"
  exit 1
fi

# Pergunta sobre volumes
echo -e "Deseja destruir os volumes antes de subir? (y/n): "
read -r DESTROY_VOLUMES

if [ "$DESTROY_VOLUMES" == "y" ]; then
  echo -e "${RED}🧨 Removendo containers e volumes antigos...${NC}"
  docker compose down -v --remove-orphans
  docker system prune -a --volumes -f
else
  echo -e "${YELLOW}➡️ Mantendo volumes existentes...${NC}"
  docker compose down --remove-orphans
fi

# Sobe containers com o arquivo correto
echo -e "${GREEN}🔧 Subindo containers (${ENVIRONMENT})...${NC}"

if [ "$ENVIRONMENT" == "prod" ]; then
  docker compose -f docker-compose.prod.yml --env-file "$ENV_FILE" up -d --build
else
  docker compose -f docker-compose.yml --env-file "$ENV_FILE" up -d --build
fi

# Aguarda container principal
echo -e "${CYAN}⏳ Aguardando container nextjs_app ficar pronto...${NC}"
sleep 10

if docker ps --format '{{.Names}}' | grep -q "nextjs_app"; then
  echo -e "${GREEN}✅ Container nextjs_app está rodando!${NC}"
else
  echo -e "${RED}❌ O container nextjs_app não iniciou corretamente.${NC}"
  exit 1
fi

# Executa migrações Prisma (apenas em dev)
if [ "$ENVIRONMENT" == "dev" ]; then
  echo -e "${CYAN}🧩 Verificando migrações Prisma...${NC}"
  docker exec -it nextjs_app npx prisma migrate dev
fi

# Mostra status final
docker ps

# Pergunta se o usuário quer ver os logs
echo -e "Deseja ver os logs do Next.js? (y/n): "
read -r SHOW_LOGS

if [ "$SHOW_LOGS" == "y" ]; then
  echo -e "${YELLOW}🪵 Exibindo logs do Next.js (Ctrl + C para sair)...${NC}"
  docker logs -f nextjs_app
else
  echo -e "${CYAN}ℹ️ Logs do Next.js podem ser vistos com:${NC} docker logs -f nextjs_app"
fi

echo -e "${GREEN}✅ Ambiente ${ENVIRONMENT} iniciado com sucesso!${NC}"

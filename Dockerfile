# Stage 1: builder — compila a aplicação React
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependências primeiro para aproveitar cache de camadas
COPY package*.json ./
RUN npm ci --no-audit

# Copia o código-fonte
COPY . .

# Variáveis de ambiente injetadas em build time
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# Build de produção (typecheck + vite build)
RUN npm run build

# Stage 2: runner — serve os arquivos estáticos com nginx
FROM nginx:alpine AS runner

# Remove configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos buildados
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
